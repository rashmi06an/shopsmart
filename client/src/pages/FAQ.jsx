import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQ = () => {
    const faqs = [
        { q: "What is your return policy?", a: "We offer a 30-day no-questions-asked return policy for all unused items in their original packaging." },
        { q: "How long does shipping take?", a: "Standard shipping takes 3-5 business days. Express shipping is available for 1-2 day delivery." },
        { q: "Do you offer international shipping?", a: "Yes, we ship to over 100 countries globally. Shipping rates and times vary by location." },
        { q: "Are your products eco-friendly?", a: "We prioritize sustainability in our manufacturing process and use eco-friendly materials whenever possible." },
        { q: "How can I track my order?", a: "Once your order ships, you will receive an email with a tracking number and a link to track your package." }
    ];

    return (
        <div className="faq-page">
            <section className="hero" style={{ minHeight: '40vh', textAlign: 'center' }}>
                <div className="container" style={{ width: '100%' }}>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ fontSize: '4rem' }}
                    >
                        Frequently Asked Questions
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Find answers to common questions about our products and services.
                    </motion.p>
                </div>
            </section>

            <section className="section-padding">
                <div className="container" style={{ maxWidth: '800px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {faqs.map((faq, index) => (
                            <motion.details 
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                style={{ 
                                    backgroundColor: 'var(--bg-secondary)', 
                                    padding: '2rem', 
                                    borderRadius: '1.5rem', 
                                    border: '1px solid var(--border-color)',
                                    cursor: 'pointer'
                                }}
                            >
                                <summary style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 700, listStyle: 'none' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <HelpCircle size={20} color="var(--accent-primary)" />
                                        {faq.q}
                                    </span>
                                    <ChevronDown size={20} className="faq-chevron" />
                                </summary>
                                <p style={{ marginTop: '1.5rem', color: 'var(--text-secondary)', paddingLeft: '2.25rem' }}>
                                    {faq.a}
                                </p>
                            </motion.details>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section-padding" style={{ textAlign: 'center', borderTop: '1px solid var(--border-color)' }}>
                <div className="container">
                    <h3>Still have questions?</h3>
                    <p style={{ margin: '1rem 0 2rem' }}>Our concierge team is available 24/7 to help you with any inquiries.</p>
                    <button className="btn btn-primary" onClick={() => window.location.href='/contact'}>
                        Contact Support
                    </button>
                </div>
            </section>
        </div>
    );
};

export default FAQ;
