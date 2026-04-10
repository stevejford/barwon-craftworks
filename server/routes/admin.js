import { Router } from 'express';
import pool from '../db.js';

const router = Router();

// GET /api/admin/stats — dashboard aggregates
router.get('/stats', async (req, res) => {
    try {
        const [revenueResult, ordersResult, customersResult, activePrintsResult] = await Promise.all([
            pool.query("SELECT COALESCE(SUM(total), 0) as total_revenue FROM orders WHERE status != 'cancelled'"),
            pool.query('SELECT COUNT(*) as total_orders FROM orders'),
            pool.query('SELECT COUNT(*) as total_customers FROM customers'),
            pool.query("SELECT COUNT(*) as active_prints FROM orders WHERE status = 'processing'")
        ]);

        res.json({
            totalRevenue: parseFloat(revenueResult.rows[0].total_revenue),
            totalOrders: parseInt(ordersResult.rows[0].total_orders),
            totalCustomers: parseInt(customersResult.rows[0].total_customers),
            activePrints: parseInt(activePrintsResult.rows[0].active_prints)
        });
    } catch (err) {
        console.error('Error fetching admin stats:', err);
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
});

// GET /api/admin/recent-orders — last 5 orders for dashboard
router.get('/recent-orders', async (req, res) => {
    try {
        const { rows } = await pool.query(`
            SELECT o.*, c.name as customer_name, c.email as customer_email
            FROM orders o
            LEFT JOIN customers c ON o.customer_id = c.id
            ORDER BY o.created_at DESC
            LIMIT 5
        `);
        res.json(rows);
    } catch (err) {
        console.error('Error fetching recent orders:', err);
        res.status(500).json({ error: 'Failed to fetch recent orders' });
    }
});

// GET /api/admin/inventory-alerts — low stock products
router.get('/inventory-alerts', async (req, res) => {
    try {
        const { rows } = await pool.query(`
            SELECT id, name, stock, category FROM products
            WHERE status = 'active' AND stock <= 5
            ORDER BY stock ASC
        `);
        res.json(rows);
    } catch (err) {
        console.error('Error fetching inventory alerts:', err);
        res.status(500).json({ error: 'Failed to fetch inventory alerts' });
    }
});

export default router;
