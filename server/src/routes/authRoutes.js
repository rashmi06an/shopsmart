const express = require('express');

const router = express.Router();

router.post('/login', (req, res) => {
    const { email, password } = req.body || {};

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Email and password are required.'
        });
    }

    if (password.length < 4) {
        return res.status(401).json({
            success: false,
            message: 'Invalid credentials.'
        });
    }

    return res.status(200).json({
        success: true,
        token: `mock-jwt-${Date.now()}`,
        user: {
            name: email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').trim() || 'ShopSmart User',
            email
        }
    });
});

module.exports = router;
