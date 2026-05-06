const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
            callback(null, true);
            return;
        }
        callback(new Error('Not allowed by CORS'));
    },
    credentials: true
}));
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api/products', productRoutes);
app.use('/api', authRoutes);

app.get(['/', '/api'], (req, res) => {
    res.status(200).json({
        success: true,
        message: 'ShopSmart backend is live'
    });
});

app.use('/api/health', (req, res) => {
    res.status(200).json({
        status: 'UP',
        message: 'ShopSmart API is running',
        timestamp: new Date().toISOString()
    });
});

app.use(errorHandler);

module.exports = app;
// this is frontend