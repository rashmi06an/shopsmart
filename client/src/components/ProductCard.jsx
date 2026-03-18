import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <motion.div 
            whileHover={{ y: -8, boxShadow: 'var(--card-shadow)' }}
            className="product-card"
        >
            <Link to={`/product/${product.id}`} className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" />
            </Link>
            <div className="product-info">
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {product.category}
                </span>
                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                    <h3 className="product-name" style={{ margin: '0.5rem 0' }}>{product.name}</h3>
                </Link>
                <div className="product-price">${product.price.toFixed(2)}</div>
                <motion.button 
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-primary"
                    style={{ width: '100%', borderRadius: '0.5rem', marginTop: '1rem', fontSize: '0.875rem' }}
                    onClick={() => addToCart(product)}
                >
                    <ShoppingCart size={16} />
                    Add to Cart
                </motion.button>
            </div>
        </motion.div>
    );
};

export default ProductCard;
