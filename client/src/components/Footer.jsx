import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-section">
                        <Link to="/" className="footer-logo">SHOPSMART</Link>
                        <p className="footer-description">
                            Redefining modern style through sustainable, ethically crafted apparel. Quality basics for a conscious life.
                        </p>
                        <div className="social-links">
                            <a href="#" className="social-icon"><Facebook size={20} /></a>
                            <a href="#" className="social-icon"><Twitter size={20} /></a>
                            <a href="#" className="social-icon"><Instagram size={20} /></a>
                        </div>
                    </div>

                    <div className="footer-section">
                        <h4 style={{ marginBottom: '1.5rem' }}>Quick Links</h4>
                        <ul className="footer-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                            <li><Link to="/faq">FAQ</Link></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4 style={{ marginBottom: '1.5rem' }}>Support</h4>
                        <ul className="footer-links">
                            <li><a href="#">Shipping Policy</a></li>
                            <li><a href="#">Returns & Exchanges</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms of Service</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4 style={{ marginBottom: '1.5rem' }}>Subscribe</h4>
                        <p style={{ marginBottom: '1rem', fontSize: '0.875rem' }}>Get the latest updates on new collections and exclusive offers.</p>
                        <form className="footer-newsletter" onSubmit={e => e.preventDefault()}>
                            <input 
                                type="email" 
                                placeholder="Your email" 
                                className="newsletter-input"
                            />
                            <button className="btn btn-primary newsletter-btn">Join</button>
                        </form>
                    </div>
                </div>

                <div className="footer-bottom flex-responsive">
                    <p style={{ fontSize: '0.875rem' }}>&copy; {new Date().getFullYear()} ShopSmart Inc. All rights reserved.</p>
                    <div className="footer-contact-info">
                        <span className="contact-item"><Phone size={14} /> +1 (888) SMART</span>
                        <span className="contact-item"><Mail size={14} /> hello@shopsmart.com</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
