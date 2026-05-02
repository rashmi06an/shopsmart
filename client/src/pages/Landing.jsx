import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Truck, ShieldCheck, Headphones, Star } from 'lucide-react';
import heroImage from '../assets/hero-premium.png';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="home-page">
            <section className="hero" style={{ overflow: 'hidden' }}>
                <div className="container grid-responsive hero-container">
                    <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                        <h1 className="hero-title">Redefine Your <span className="hero-accent">Modern</span> Style.</h1>
                        <p className="hero-subtitle">Curated essentials for the conscious wardrobe. Experience ethical craft and timeless design.</p>
                        <div style={{ marginTop: '2rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                            <button className="btn btn-primary" onClick={() => navigate('/login')}>Login <ArrowRight size={18} /></button>
                            <button className="btn" onClick={() => navigate('/login')}>Sign Up</button>
                        </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }}>
                        <div style={{ borderRadius: '1.5rem', overflow: 'hidden', boxShadow: 'var(--card-shadow)', aspectRatio: '1/1' }}>
                            <img src={heroImage} alt="Premium collection" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="section-padding">
                <div className="container features-grid grid-responsive">
                    <div className="feature-item"><Truck className="feature-icon" size={32} /><h3>Global Shipping</h3><p>Fast delivery with live tracking.</p></div>
                    <div className="feature-item"><ShieldCheck className="feature-icon" size={32} /><h3>Secure Checkout</h3><p>Protected transactions and data.</p></div>
                    <div className="feature-item"><Headphones className="feature-icon" size={32} /><h3>24/7 Support</h3><p>Always available to help.</p></div>
                </div>
            </section>

            <section className="section-padding">
                <div className="container">
                    <div className="section-title"><h2>What Our Clients Say</h2></div>
                    <div className="features-grid grid-responsive">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="feature-item" style={{ textAlign: 'center' }}>
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.25rem', marginBottom: '0.75rem', color: '#fbbf24' }}>
                                    {[1, 2, 3, 4, 5].map((star) => <Star key={star} size={16} fill="#fbbf24" />)}
                                </div>
                                <p style={{ fontStyle: 'italic' }}>"Excellent quality and minimal aesthetic. Highly recommended!"</p>
                                <h4 style={{ marginTop: '0.75rem' }}>Alex Rivera</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Landing;
