import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    return (
        <div className="contact-page">
            <section className="hero" style={{ minHeight: '40vh', textAlign: 'center' }}>
                <div className="container" style={{ width: '100%' }}>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ fontSize: '4rem' }}
                    >
                        Get In Touch
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        We'd love to hear from you. Our team is always here to help.
                    </motion.p>
                </div>
            </section>

            <section className="section-padding">
                <div className="container">
                    <div className="cart-container" style={{ gridTemplateColumns: 'minmax(300px, 1fr) 2fr' }}>
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="cart-summary" 
                            style={{ position: 'sticky', top: '120px' }}
                        >
                            <h3 className="summary-title">Contact Information</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                    <div style={{ backgroundColor: 'var(--accent-primary)', padding: '0.75rem', borderRadius: '1rem', color: 'white' }}>
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Email</h4>
                                        <p style={{ fontSize: '1rem', fontWeight: 600 }}>concierge@shopsmart.com</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                    <div style={{ backgroundColor: 'var(--accent-primary)', padding: '0.75rem', borderRadius: '1rem', color: 'white' }}>
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Phone</h4>
                                        <p style={{ fontSize: '1rem', fontWeight: 600 }}>+1 (888) SMART-SHOP</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                    <div style={{ backgroundColor: 'var(--accent-primary)', padding: '0.75rem', borderRadius: '1rem', color: 'white' }}>
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h4 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Studio</h4>
                                        <p style={{ fontSize: '1rem', fontWeight: 600 }}>77 Design Avenue, Suite 100<br/>San Francisco, CA 94103</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            style={{ backgroundColor: 'var(--bg-secondary)', padding: '4rem', borderRadius: '2rem', border: '1px solid var(--border-color)' }}
                        >
                            <h2 style={{ marginBottom: '2rem' }}>Send Us a Message</h2>
                            <form style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} onSubmit={e => e.preventDefault()}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontWeight: 600, fontSize: '0.875rem' }}>First Name</label>
                                    <input type="text" placeholder="John" style={inputStyle} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontWeight: 600, fontSize: '0.875rem' }}>Last Name</label>
                                    <input type="text" placeholder="Doe" style={inputStyle} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', gridColumn: 'span 2' }}>
                                    <label style={{ fontWeight: 600, fontSize: '0.875rem' }}>Email Address</label>
                                    <input type="email" placeholder="john@example.com" style={inputStyle} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', gridColumn: 'span 2' }}>
                                    <label style={{ fontWeight: 600, fontSize: '0.875rem' }}>Message</label>
                                    <textarea placeholder="How can we help you?" style={{ ...inputStyle, height: '150px', resize: 'none' }}></textarea>
                                </div>
                                <button className="btn btn-primary" style={{ gridColumn: 'span 2', justifyContent: 'center' }}>
                                    Send Message <Send size={18} />
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const inputStyle = {
    padding: '1rem',
    borderRadius: '0.75rem',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    outline: 'none',
    transition: 'border-color 0.3s ease'
};

export default Contact;
