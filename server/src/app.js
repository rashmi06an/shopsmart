const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Routes
app.use('/api/products', productRoutes);

// Health check
app.use('/api/health', (req, res) => {
    res.status(200).json({
        status: 'UP',
        message: 'ShopSmart API is running',
        timestamp: new Date().toISOString()
    });
});

// Error Handler
app.use(errorHandler);

module.exports = app;
