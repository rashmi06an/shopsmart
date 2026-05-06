import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../App';
import Loader from '../components/Loader';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { showToast } = useToast();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || '';
                const res = await axios.get(`${apiUrl}/api/products/${id}`);
                if (res.data.success) {
                    setProduct(res.data.data);
                }
                setLoading(false);
            } catch (err) {
                setError('Product not found.');
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <Loader />;
    if (error) return <div className="container">{error}</div>;

    return (
        <div className="container section-padding">
            <button onClick={() => navigate('/products')} className="back-btn">
                <ArrowLeft size={20} /> Back to Products
            </button>

            <div className="product-detail grid-responsive">
                <div className="detail-image-wrapper">
                    <img src={product.image} alt={product.name} className="detail-image" />
                </div>

                <div className="detail-info">
                    <span className="detail-category">{product.category}</span>
                    <h1>{product.name}</h1>
                    <div className="detail-price">${product.price.toFixed(2)}</div>
                    <p className="detail-description">{product.description}</p>

                    <div className="qty-row">
                        <label>Quantity</label>
                        <div className="quantity-control">
                            <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
                            <span>{quantity}</span>
                            <button onClick={() => setQuantity((q) => q + 1)}>+</button>
                        </div>
                    </div>

                    <button
                        className="btn btn-primary detail-add-cart-btn"
                        onClick={() => {
                            for (let i = 0; i < quantity; i += 1) addToCart(product);
                            showToast(`${quantity} item(s) added to cart`);
                        }}
                    >
                        <ShoppingCart size={20} /> Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
