import { Router } from 'express';
import pool from '../db.js';

const router = Router();

// GET /api/products — list all active products (storefront)
router.get('/', async (req, res) => {
    try {
        const { category, status } = req.query;
        let query = 'SELECT * FROM products';
        const conditions = [];
        const params = [];

        if (status && status !== 'all') {
            params.push(status);
            conditions.push(`status = $${params.length}`);
        } else if (!status) {
            conditions.push("status = 'active'");
        }

        if (category && category !== 'all') {
            params.push(category);
            conditions.push(`LOWER(category) = LOWER($${params.length})`);
        }

        if (conditions.length) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        query += ' ORDER BY created_at DESC';

        const { rows } = await pool.query(query, params);
        res.json(rows);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// GET /api/products/:id — single product
router.get('/:id', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Product not found' });
        res.json(rows[0]);
    } catch (err) {
        console.error('Error fetching product:', err);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});

// POST /api/products — admin: create product
router.post('/', async (req, res) => {
    try {
        const { name, category, price, description, image_url, stock, status } = req.body;
        const { rows } = await pool.query(
            `INSERT INTO products (name, category, price, description, image_url, stock, status)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING *`,
            [name, category, price, description || '', image_url || '', stock || 0, status || 'active']
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        console.error('Error creating product:', err);
        res.status(500).json({ error: 'Failed to create product' });
    }
});

// PUT /api/products/:id — admin: update product
router.put('/:id', async (req, res) => {
    try {
        const { name, category, price, description, image_url, stock, status } = req.body;
        const { rows } = await pool.query(
            `UPDATE products SET name = $1, category = $2, price = $3, description = $4,
             image_url = $5, stock = $6, status = $7, updated_at = NOW()
             WHERE id = $8 RETURNING *`,
            [name, category, price, description, image_url, stock, status, req.params.id]
        );
        if (rows.length === 0) return res.status(404).json({ error: 'Product not found' });
        res.json(rows[0]);
    } catch (err) {
        console.error('Error updating product:', err);
        res.status(500).json({ error: 'Failed to update product' });
    }
});

// DELETE /api/products/:id — admin: soft-delete (archive)
router.delete('/:id', async (req, res) => {
    try {
        const { rows } = await pool.query(
            "UPDATE products SET status = 'archived', updated_at = NOW() WHERE id = $1 RETURNING *",
            [req.params.id]
        );
        if (rows.length === 0) return res.status(404).json({ error: 'Product not found' });
        res.json({ message: 'Product archived', product: rows[0] });
    } catch (err) {
        console.error('Error archiving product:', err);
        res.status(500).json({ error: 'Failed to archive product' });
    }
});

export default router;
