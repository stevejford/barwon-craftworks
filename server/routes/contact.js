import { Router } from 'express';
import pool from '../db.js';
import { sendContactNotification } from '../emails/index.js';

const router = Router();

// POST /api/contact — save inquiry + send notification
router.post('/', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Name, email, and message are required' });
        }

        const { rows } = await pool.query(
            `INSERT INTO inquiries (name, email, subject, message)
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [name, email, subject || 'General Inquiry', message]
        );

        // Send notification email to maker (non-blocking)
        sendContactNotification({
            name,
            email,
            subject: subject || 'General Inquiry',
            message
        }).catch(err => console.error('Contact notification error:', err));

        res.status(201).json({ message: 'Inquiry received. I\'ll be in touch soon.', inquiry: rows[0] });
    } catch (err) {
        console.error('Error saving inquiry:', err);
        res.status(500).json({ error: 'Failed to save inquiry' });
    }
});

// GET /api/contact — admin: list inquiries
router.get('/', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM inquiries ORDER BY created_at DESC');
        res.json(rows);
    } catch (err) {
        console.error('Error fetching inquiries:', err);
        res.status(500).json({ error: 'Failed to fetch inquiries' });
    }
});

// PUT /api/contact/:id — admin: update inquiry status
router.put('/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const { rows } = await pool.query(
            'UPDATE inquiries SET status = $1 WHERE id = $2 RETURNING *',
            [status, req.params.id]
        );
        if (rows.length === 0) return res.status(404).json({ error: 'Inquiry not found' });
        res.json(rows[0]);
    } catch (err) {
        console.error('Error updating inquiry:', err);
        res.status(500).json({ error: 'Failed to update inquiry' });
    }
});

export default router;
