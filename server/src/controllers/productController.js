const products = require('../data/products.json');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res, next) => {
    try {
        const product = products.find(p => p.id === parseInt(req.params.id));
        
        if (!product) {
            const error = new Error(`Product not found with id of ${req.params.id}`);
            error.statusCode = 404;
            throw error;
        }
        
        res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProducts,
    getProductById
};
