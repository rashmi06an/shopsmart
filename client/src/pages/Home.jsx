import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Truck, ShieldCheck, Headphones, Star } from 'lucide-react';
import heroImage from '../assets/hero-premium.png';

const Home = () => {
    const navigate = useNavigate();

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


    return (
        <div className="home-page">
            <section className="hero" style={{ overflow: 'hidden' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', alignItems: 'center', gap: '4rem', padding: '4rem 0' }}>
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="hero-content"
                    >
                        <h1 className="hero-title" style={{ fontSize: '4.5rem', lineHeight: '1.1' }}>
                            Redefine Your <span className="hero-accent">Modern</span> Style.
                        </h1>
                        <p className="hero-subtitle" style={{ fontSize: '1.25rem', marginTop: '1.5rem' }}>
                            Curated essentials for the conscious wardrobe. Experience the intersection of ethical craft and timeless design.
                        </p>
                        <div style={{ marginTop: '2.5rem' }}>
                            <button className="btn btn-primary" onClick={() => navigate('/shop')} style={{ padding: '1.25rem 2.5rem', fontSize: '1.125rem' }}>
                                Shop Collection <ArrowRight size={22} style={{ marginLeft: '0.75rem' }} />
                            </button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        style={{ position: 'relative' }}
                    >
                        <div style={{ 
                            position: 'relative', 
                            borderRadius: '3rem', 
                            overflow: 'hidden',
                            boxShadow: 'var(--card-shadow)',
                            aspectRatio: '1/1'
                        }}>
                            <img 
                                src={heroImage} 
                                alt="Premium Collection" 
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                        <div style={{ 
                            position: 'absolute', 
                            bottom: '-2rem', 
                            right: '-2rem', 
                            backgroundColor: 'var(--bg-primary)', 
                            padding: '1.5rem 2rem', 
                            borderRadius: '1.5rem',
                            border: '1px solid var(--border-color)',
                            boxShadow: 'var(--card-shadow)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem'
                        }}>
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#22c55e' }}></div>
                            <span style={{ fontWeight: '600' }}>New Season Live</span>
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

            {/* Featured Section (Placeholder for home page highlights) */}
            <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <div className="container">
                    <div className="section-title" style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2>Crafted for You</h2>
                        <p>Essential pieces that define your unique aesthetic.</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <button className="btn" onClick={() => navigate('/shop')} style={{ border: '1px solid var(--border-color)' }}>
                            Explore Full Catalog
                        </button>
                    </div>
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
