import { Router } from 'express';
import pool from '../db.js';

const router = Router();

// GET /api/orders — admin: list all orders
router.get('/', async (req, res) => {
    try {
        const { status } = req.query;
        let query = `
            SELECT o.*, c.name as customer_name, c.email as customer_email,
            json_agg(json_build_object('product_name', p.name, 'quantity', oi.quantity, 'price', oi.price_at_purchase)) as items
            FROM orders o
            LEFT JOIN customers c ON o.customer_id = c.id
            LEFT JOIN order_items oi ON oi.order_id = o.id
            LEFT JOIN products p ON oi.product_id = p.id
        `;
        const params = [];

        if (status && status !== 'all') {
            params.push(status);
            query += ` WHERE o.status = $${params.length}`;
        }

        query += ' GROUP BY o.id, c.name, c.email ORDER BY o.created_at DESC';

        const { rows } = await pool.query(query, params);
        res.json(rows);
    } catch (err) {
        console.error('Error fetching orders:', err);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

// GET /api/orders/:id — admin: single order detail
router.get('/:id', async (req, res) => {
    try {
        const { rows: orderRows } = await pool.query(
            `SELECT o.*, c.name as customer_name, c.email as customer_email, c.phone as customer_phone
             FROM orders o LEFT JOIN customers c ON o.customer_id = c.id WHERE o.id = $1`,
            [req.params.id]
        );
        if (orderRows.length === 0) return res.status(404).json({ error: 'Order not found' });

        const { rows: items } = await pool.query(
            `SELECT oi.*, p.name as product_name, p.image_url
             FROM order_items oi LEFT JOIN products p ON oi.product_id = p.id WHERE oi.order_id = $1`,
            [req.params.id]
        );

        res.json({ ...orderRows[0], items });
    } catch (err) {
        console.error('Error fetching order:', err);
        res.status(500).json({ error: 'Failed to fetch order' });
    }
});

// PUT /api/orders/:id — admin: update order status
router.put('/:id', async (req, res) => {
    try {
        const { status, notes } = req.body;
        const { rows } = await pool.query(
            `UPDATE orders SET status = $1, notes = COALESCE($2, notes), updated_at = NOW()
             WHERE id = $3 RETURNING *`,
            [status, notes, req.params.id]
        );
        if (rows.length === 0) return res.status(404).json({ error: 'Order not found' });
        res.json(rows[0]);
    } catch (err) {
        console.error('Error updating order:', err);
        res.status(500).json({ error: 'Failed to update order' });
    }
});

export default router;
