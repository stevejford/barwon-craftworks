import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import productsRouter from './routes/products.js';
import ordersRouter from './routes/orders.js';
import customersRouter from './routes/customers.js';
import checkoutRouter from './routes/checkout.js';
import webhooksRouter from './routes/webhooks.js';
import contactRouter from './routes/contact.js';
import adminRouter from './routes/admin.js';
import uploadRouter from './routes/upload.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

// Stripe webhooks need raw body — must be before express.json()
app.use('/api/webhooks/stripe', express.raw({ type: 'application/json' }));

// Middleware
app.use(cors({
    origin: [process.env.FRONTEND_URL || 'http://localhost:3001', 'http://localhost:3001'],
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/customers', customersRouter);
app.use('/api/checkout', checkoutRouter);
app.use('/api/webhooks', webhooksRouter);
app.use('/api/contact', contactRouter);
app.use('/api/admin', adminRouter);
app.use('/api/upload', uploadRouter);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`🔧 Barwon Craftworks API running on port ${PORT}`);
});
