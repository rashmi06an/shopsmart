const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api/products', productRoutes);
app.use('/api', authRoutes);

app.use('/api/health', (req, res) => {
    res.status(200).json({
        status: 'UP',
        message: 'ShopSmart API is running',
        timestamp: new Date().toISOString()
    });
});

app.use(errorHandler);

module.exports = app;
