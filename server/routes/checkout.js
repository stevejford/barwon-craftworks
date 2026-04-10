import { Router } from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

// Initialize Stripe — will work once real key is added
const stripeKey = process.env.STRIPE_SECRET_KEY;
const isStripeLive = stripeKey && !stripeKey.includes('PLACEHOLDER');
let stripe = null;
if (isStripeLive) {
    stripe = new Stripe(stripeKey);
}

// POST /api/checkout — create Stripe Checkout Session
router.post('/', async (req, res) => {
    try {
        const { items, customerEmail, customerName } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ error: 'No items in cart' });
        }

        // If Stripe is not configured, return a placeholder response
        if (!isStripeLive) {
            console.log('⚠️  Stripe not configured — returning placeholder checkout URL');
            return res.json({
                url: `${process.env.FRONTEND_URL}/order-success?session_id=placeholder_session&demo=true`,
                sessionId: 'placeholder_session',
                message: 'Stripe is not configured yet. Add your STRIPE_SECRET_KEY to .env to enable real payments.'
            });
        }

        // Build line items for Stripe
        const lineItems = items.map(item => ({
            price_data: {
                currency: 'aud',
                product_data: {
                    name: item.name,
                    description: item.description || '',
                    images: item.image_url ? [item.image_url] : []
                },
                unit_amount: Math.round(item.price * 100) // Stripe uses cents
            },
            quantity: item.quantity
        }));

        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            customer_email: customerEmail || undefined,
            metadata: {
                customerName: customerName || '',
                customerEmail: customerEmail || ''
            },
            shipping_address_collection: {
                allowed_countries: ['AU', 'NZ', 'GB', 'US', 'CA', 'JP']
            },
            success_url: `${process.env.FRONTEND_URL}/order-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/pens`
        });

        res.json({ url: session.url, sessionId: session.id });
    } catch (err) {
        console.error('Checkout error:', err);
        res.status(500).json({ error: 'Failed to create checkout session' });
    }
});

export default router;
