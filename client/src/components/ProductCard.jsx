import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../App';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { showToast } = useToast();

    return (
        <motion.div whileHover={{ y: -6 }} className="product-card">
            <Link to={`/product/${product.id}`} className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" />
            </Link>
            <div className="product-info">
                <span className="product-category-tag">{product.category}</span>
                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                    <h3 className="product-name">{product.name}</h3>
                </Link>
                <div className="product-rating"><Star size={14} fill="currentColor" /> {product.rating || 4.5}</div>
                <div className="product-price">${product.price.toFixed(2)}</div>
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-primary"
                    style={{ width: '100%', marginTop: '0.75rem' }}
                    onClick={() => { addToCart(product); showToast('Added to cart'); }}
                >
                    <ShoppingCart size={16} /> Add to Cart
                </motion.button>
            </div>
        </motion.div>
    );
};

export default ProductCard;
