import { Router } from 'express';
import pool from '../db.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = Router();

// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), 'uploads', 'print-quotes');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB per file
    fileFilter: (req, file, cb) => {
        const allowed = ['.stl', '.step', '.stp', '.obj', '.3mf', '.iges', '.igs'];
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowed.includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Accepted: STL, STEP, OBJ, 3MF, IGES'));
        }
    }
});

// POST /api/print-quote — submit a quote request
router.post('/', upload.array('files', 10), async (req, res) => {
    try {
        const data = JSON.parse(req.body.data || '{}');
        const fileNames = (req.files || []).map(f => f.originalname).join(', ');
        const filePaths = (req.files || []).map(f => f.filename).join(', ');

        const { rows } = await pool.query(
            `INSERT INTO print_quotes 
             (name, email, phone, company, material, colour, quantity, infill, layer_height, finish, post_processing, dimensions, application, notes, deadline, priority, file_names, file_paths, status)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, 'new')
             RETURNING *`,
            [
                data.name || '',
                data.email || '',
                data.phone || '',
                data.company || '',
                data.material || '',
                data.colour || '',
                data.quantity || 1,
                data.infill || '30',
                data.layerHeight || '0.2',
                data.finish || 'standard',
                JSON.stringify(data.postProcessing || []),
                data.dimensions || '',
                data.application || '',
                data.notes || '',
                data.deadline || null,
                data.priority || 'standard',
                fileNames,
                filePaths
            ]
        );

        res.status(201).json({ success: true, quote: rows[0] });
    } catch (err) {
        console.error('Error submitting print quote:', err);
        res.status(500).json({ error: 'Failed to submit quote request' });
    }
});

// GET /api/print-quote — admin: list all quotes
router.get('/', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM print_quotes ORDER BY created_at DESC');
        res.json(rows);
    } catch (err) {
        console.error('Error fetching print quotes:', err);
        res.status(500).json({ error: 'Failed to fetch quotes' });
    }
});

// PUT /api/print-quote/:id — admin: update quote status
router.put('/:id', async (req, res) => {
    try {
        const { status, admin_notes, quoted_price } = req.body;
        const { rows } = await pool.query(
            `UPDATE print_quotes SET status = $1, admin_notes = $2, quoted_price = $3, updated_at = NOW() WHERE id = $4 RETURNING *`,
            [status, admin_notes || '', quoted_price || null, req.params.id]
        );
        if (rows.length === 0) return res.status(404).json({ error: 'Quote not found' });
        res.json(rows[0]);
    } catch (err) {
        console.error('Error updating print quote:', err);
        res.status(500).json({ error: 'Failed to update quote' });
    }
});

export default router;
