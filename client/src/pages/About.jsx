import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Heart, Award, Shield, Globe } from 'lucide-react';

const About = () => {
    return (
        <div className="about-page">
            <section className="hero" style={{ minHeight: '60vh', textAlign: 'center' }}>
                <div className="container" style={{ width: '100%' }}>
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ fontSize: 'clamp(3rem, 10vw, 5rem)', marginBottom: '1.5rem' }}
                    >
                        Fashion with <span className="hero-accent">Purpose</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.25rem' }}
                    >
                        ShopSmart is a modern apparel studio dedicated to sustainable fashion. We believe that true style is timeless, ethical, and built to last.
                    </motion.p>
                </div>
            </section>

            <section className="section-padding" style={{ borderTop: '1px solid var(--border-color)' }}>
                <div className="container">
                    <div className="cart-container" style={{ alignItems: 'center' }}>
                        <motion.div 
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80" alt="Our Studio" style={{ width: '100%', borderRadius: '1.5rem', boxShadow: 'var(--card-shadow)' }} />
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            style={{ padding: '1rem' }}
                        >
                            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1.5rem' }}>The ShopSmart Label</h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                What started as a vision for better basics has evolved into a full-scale fashion collective. Our journey is defined by a commitment to fair-trade manufacturing and organic materials. We partner exclusively with family-owned mills that prioritize worker welfare and environmental stewardship.
                            </p>
                            <p style={{ marginBottom: '1.5rem' }}>
                                From our signature GOTS-certified organic cotton to our recycled wool blends, every garment is a testament to the fact that you don't have to choose between looking good and doing good.
                            </p>
                            <p>
                                Based in San Francisco and shipping globally, we are building a community of conscious consumers who are ready to slow down fashion and invest in pieces that tell a story.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <div className="container">
                    <div className="section-title">
                        <h2>Our Principles</h2>
                    </div>
                    <div className="features-grid">
                        <ValueCard icon={<Target />} title="Intentionality" text="Every product in our catalog is there for a reason. We avoid clutter and focus on what truly adds value to your space." />
                        <ValueCard icon={<Award />} title="Excellence" text="We maintain a zero-compromise policy on quality. If a product doesn't meet our rigorous 50-point inspection, it doesn't make the cut." />
                        <ValueCard icon={<Shield />} title="Transparency" text="We are open about our supply chain. We believe you have a right to know where your products come from and how they are made." />
                        <ValueCard icon={<Globe />} title="Sustainability" text="From plastic-free packaging to carbon-neutral shipping, we are committed to minimizing our environmental footprint." />
                    </div>
                </div>
            </section>

            <section className="section-padding">
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2 style={{ marginBottom: '2rem' }}>Join Our Community</h2>
                    <p style={{ maxWidth: '600px', margin: '0 auto 3rem' }}>
                        Be part of a growing movement of people who value quality and conscious consumption. Follow us for behind-the-scenes looks at our design process and exclusive member stories.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                        <button className="btn btn-primary">Our Story Video</button>
                        <button className="btn" style={{ border: '1px solid var(--border-color)' }}>Annual Report 2025</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

const ValueCard = ({ icon, title, text }) => (
    <motion.div 
        whileHover={{ y: -10 }}
        className="feature-item" 
        style={{ textAlign: 'center', padding: '2.5rem' }}
    >
        <div style={{ color: 'var(--accent-primary)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
            {React.cloneElement(icon, { size: 40 })}
        </div>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>{title}</h3>
        <p style={{ fontSize: '0.95rem' }}>{text}</p>
    </motion.div>
);

export default About;
