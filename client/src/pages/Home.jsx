import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ShoppingBag, Truck, ShieldCheck, Headphones, ArrowRight, Star } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
                const res = await axios.get(`${apiUrl}/api/products`);
                if (res.data.success) {
                    setProducts(res.data.data);
                }
                setLoading(false);
            } catch (err) {
                console.error('Error fetching products:', err);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    if (loading) return <Loader />;

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="hero-content"
                    >
                        <h1 className="hero-title">
                            Redefine Your <span className="hero-accent">Modern</span> Style.
                        </h1>
                        <p className="hero-subtitle">
                            Curated essentials for the conscious wardrobe. Experience the intersection of ethical craft and timeless design.
                        </p>
                        <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem' }}>
                            <button className="btn btn-primary" onClick={() => window.location.href='/shop'}>
                                Shop Collection <ArrowRight size={20} />
                            </button>
                            <button className="btn" style={{ border: '1px solid var(--border-color)' }} onClick={() => window.location.href='/shop'}>
                                View Lookbook
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="section-padding">
                <div className="container">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                        className="features-grid"
                    >
                        <motion.div variants={itemVariants} className="feature-item">
                            <Truck className="feature-icon" size={40} />
                            <h3>Global Shipping</h3>
                            <p>Premium delivery services to over 100 countries with real-time tracking.</p>
                        </motion.div>
                        <motion.div variants={itemVariants} className="feature-item">
                            <ShieldCheck className="feature-icon" size={40} />
                            <h3>Secure Checkout</h3>
                            <p>Military-grade encryption for all your transactions and personal data.</p>
                        </motion.div>
                        <motion.div variants={itemVariants} className="feature-item">
                            <Headphones className="feature-icon" size={40} />
                            <h3>24/7 Support</h3>
                            <p>Our dedicated concierge team is always here to assist with your needs.</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Products Section */}
            <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <div className="container">
                    <div className="section-title" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2>The Season's Best</h2>
                        <p>Essential pieces crafted for longevity and effortless style.</p>
                    </div>
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-100px' }}
                        variants={containerVariants}
                        className="products-grid"
                    >
                        {products.map(product => (
                            <motion.div key={product.id} variants={itemVariants}>
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="section-padding">
                <div className="container">
                    <div className="section-title">
                        <h2>What Our Clients Say</h2>
                    </div>
                    <div className="features-grid">
                        {[1, 2, 3].map(i => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="feature-item"
                                style={{ textAlign: 'center' }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.25rem', marginBottom: '1.5rem', color: '#fbbf24' }}>
                                    {[1, 2, 3, 4, 5].map(star => <Star key={star} size={20} fill="#fbbf24" />)}
                                </div>
                                <p style={{ fontStyle: 'italic', marginBottom: '1.5rem' }}>
                                    "The quality of the products is unmatched. The minimal design language perfectly fits my lifestyle. Highly recommended!"
                                </p>
                                <h4 style={{ color: 'var(--text-primary)' }}>Alex Rivera</h4>
                                <span style={{ fontSize: '0.875rem', color: 'var(--accent-primary)' }}>Verified Customer</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="section-padding" style={{ borderTop: '1px solid var(--border-color)' }}>
                <div className="container">
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ 
                            backgroundColor: 'var(--bg-primary)', 
                            padding: '4rem', 
                            borderRadius: '3rem', 
                            textAlign: 'center',
                            border: '1px solid var(--border-color)',
                            boxShadow: 'var(--card-shadow)'
                        }}
                    >
                        <h2 style={{ marginBottom: '1rem' }}>Join the Inner Circle</h2>
                        <p style={{ marginBottom: '2.5rem', maxWidth: '500px', margin: '0 auto 2.5rem' }}>Subscribe to receive exclusive early access to new collections and member-only events.</p>
                        <form style={{ display: 'flex', gap: '1rem', maxWidth: '500px', margin: '0 auto' }} onSubmit={e => e.preventDefault()}>
                            <input 
                                type="email" 
                                placeholder="Email address" 
                                style={{ 
                                    flex: 1, 
                                    padding: '1rem 1.5rem', 
                                    borderRadius: '99px', 
                                    border: '1px solid var(--border-color)',
                                    backgroundColor: 'var(--bg-secondary)',
                                    color: 'var(--text-primary)',
                                    outline: 'none'
                                }} 
                            />
                            <button className="btn btn-primary" type="submit">Subscribe</button>
                        </form>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;
