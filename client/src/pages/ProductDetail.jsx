import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Loader from '../components/Loader';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
                const res = await axios.get(`${apiUrl}/api/products/${id}`);
                if (res.data.success) {
                    setProduct(res.data.data);
                }
                setLoading(false);
            } catch (err) {
                console.error('Error fetching product:', err);
                setError('Product not found.');
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <Loader />;
    if (error) return <div className="container">{error}</div>;

    return (
        <div className="container">
            <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', margin: '2rem 0' }}>
                <ArrowLeft size={20} />
                Back to Products
            </button>
            
            <div className="product-detail">
                <div className="detail-image-wrapper">
                    <img src={product.image} alt={product.name} className="detail-image" />
                </div>
                
                <div className="detail-info">
                    <span className="detail-category">{product.category}</span>
                    <h1>{product.name}</h1>
                    <div className="detail-price">${product.price.toFixed(2)}</div>
                    <p className="detail-description">{product.description}</p>
                    
                    <div style={{ marginBottom: '2rem' }}>
                        <p style={{ color: product.stock > 0 ? 'var(--success)' : 'var(--danger)', fontWeight: 600 }}>
                            {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                        </p>
                    </div>
                    
                    <button 
                        className="btn-add-cart" 
                        style={{ padding: '1rem', width: 'auto', minWidth: '250px' }}
                        onClick={() => addToCart(product)}
                        disabled={product.stock <= 0}
                    >
                        <ShoppingCart size={20} />
                        Add to Shopping Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
