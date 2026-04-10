import { Router } from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import pool from '../db.js';
import { sendOrderConfirmation, sendNewOrderAlert } from '../emails/index.js';

dotenv.config();

const router = Router();

const stripeKey = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const isStripeLive = stripeKey && !stripeKey.includes('PLACEHOLDER');
let stripe = null;
if (isStripeLive) {
    stripe = new Stripe(stripeKey);
}

// Generate order number like ORD-7242
function generateOrderNumber() {
    const num = Math.floor(Math.random() * 9000) + 1000;
    return `ORD-${num}`;
}

// POST /api/webhooks/stripe — Stripe sends payment events here
router.post('/stripe', async (req, res) => {
    if (!isStripeLive) {
        console.log('⚠️  Stripe webhook received but Stripe not configured');
        return res.json({ received: true });
    }

    let event;
    try {
        const sig = req.headers['stripe-signature'];
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            // Get or create customer
            const customerEmail = session.customer_details?.email || session.metadata?.customerEmail || '';
            const customerName = session.customer_details?.name || session.metadata?.customerName || 'Guest';

            let customerId;
            const { rows: existingCustomer } = await client.query(
                'SELECT id FROM customers WHERE email = $1', [customerEmail]
            );

            if (existingCustomer.length > 0) {
                customerId = existingCustomer[0].id;
            } else {
                const { rows: newCustomer } = await client.query(
                    'INSERT INTO customers (name, email) VALUES ($1, $2) RETURNING id',
                    [customerName, customerEmail]
                );
                customerId = newCustomer[0].id;
            }

            // Create order
            const orderNumber = generateOrderNumber();
            const total = (session.amount_total / 100).toFixed(2);
            const shippingAddress = session.shipping_details
                ? JSON.stringify(session.shipping_details.address)
                : null;

            const { rows: orderRows } = await client.query(
                `INSERT INTO orders (order_number, customer_id, status, total, stripe_session_id, stripe_payment_intent_id, shipping_address)
                 VALUES ($1, $2, 'processing', $3, $4, $5, $6) RETURNING *`,
                [orderNumber, customerId, total, session.id, session.payment_intent, shippingAddress]
            );

            // Get line items from Stripe session
            const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

            // For each line item, try to match to a product and create order_item
            for (const item of lineItems.data) {
                const productName = item.description;
                const { rows: productRows } = await client.query(
                    'SELECT id FROM products WHERE name = $1 LIMIT 1', [productName]
                );
                const productId = productRows.length > 0 ? productRows[0].id : null;

                await client.query(
                    `INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase)
                     VALUES ($1, $2, $3, $4)`,
                    [orderRows[0].id, productId, item.quantity, (item.amount_total / 100).toFixed(2)]
                );

                // Decrease stock
                if (productId) {
                    await client.query(
                        'UPDATE products SET stock = GREATEST(stock - $1, 0), updated_at = NOW() WHERE id = $2',
                        [item.quantity, productId]
                    );
                }
            }

            await client.query('COMMIT');

            // Send emails (non-blocking)
            sendOrderConfirmation({
                orderNumber,
                customerName,
                customerEmail,
                total,
                items: lineItems.data
            }).catch(err => console.error('Email send error:', err));

            sendNewOrderAlert({
                orderNumber,
                customerName,
                customerEmail,
                total,
                items: lineItems.data
            }).catch(err => console.error('Maker alert error:', err));

            console.log(`✅ Order ${orderNumber} created from Stripe session ${session.id}`);
        } catch (err) {
            await client.query('ROLLBACK');
            console.error('Error processing webhook:', err);
        } finally {
            client.release();
        }
    }

    res.json({ received: true });
});

export default router;
