import { Router } from 'express';
import pool from '../db.js';

const router = Router();

// GET /api/customers — admin: list all customers
router.get('/', async (req, res) => {
    try {
        const { rows } = await pool.query(`
            SELECT c.*,
                COUNT(o.id) as total_orders,
                COALESCE(SUM(o.total), 0) as total_spent,
                MAX(o.created_at) as last_order_at
            FROM customers c
            LEFT JOIN orders o ON o.customer_id = c.id
            GROUP BY c.id
            ORDER BY c.created_at DESC
        `);
        res.json(rows);
    } catch (err) {
        console.error('Error fetching customers:', err);
        res.status(500).json({ error: 'Failed to fetch customers' });
    }
});

// GET /api/customers/:id — single customer with orders
router.get('/:id', async (req, res) => {
    try {
        const { rows: custRows } = await pool.query('SELECT * FROM customers WHERE id = $1', [req.params.id]);
        if (custRows.length === 0) return res.status(404).json({ error: 'Customer not found' });

        const { rows: orders } = await pool.query(
            'SELECT * FROM orders WHERE customer_id = $1 ORDER BY created_at DESC',
            [req.params.id]
        );

        res.json({ ...custRows[0], orders });
    } catch (err) {
        console.error('Error fetching customer:', err);
        res.status(500).json({ error: 'Failed to fetch customer' });
    }
});

export default router;
