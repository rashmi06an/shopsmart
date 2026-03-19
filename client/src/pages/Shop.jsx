import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const categories = ['All', 'Apparel', 'Outerwear', 'Bottoms', 'Accessories', 'Footwear'];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
                const res = await axios.get(`${apiUrl}/api/products`);
                if (res.data.success) {
                    setProducts(res.data.data);
                    setFilteredProducts(res.data.data);
                }
                setLoading(false);
            } catch (err) {
                console.error('Error fetching products:', err);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        let result = products;
        if (activeCategory !== 'All') {
            result = result.filter(p => p.category === activeCategory);
        }
        if (searchQuery) {
            result = result.filter(p => 
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        setFilteredProducts(result);
    }, [activeCategory, searchQuery, products]);

    if (loading) return <Loader />;

    return (
        <div className="shop-page container section-padding">
            <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', fontWeight: '700' }}>The Collection</h1>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                    Explore our curated selection of sustainably crafted essentials. Designed for the modern wardrobe with a focus on longevity and ethical craft.
                </p>
            </header>

            <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '2rem', 
                marginBottom: '4rem',
                padding: '2rem',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '1.5rem',
                border: '1px solid var(--border-color)'
            }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`btn ${activeCategory === cat ? 'btn-primary' : ''}`}
                            style={{ 
                                padding: '0.625rem 1.5rem', 
                                fontSize: '0.875rem',
                                border: activeCategory === cat ? 'none' : '1px solid var(--border-color)',
                                backgroundColor: activeCategory === cat ? 'var(--accent-primary)' : 'var(--bg-primary)',
                                color: activeCategory === cat ? 'white' : 'var(--text-primary)'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div style={{ position: 'relative', maxWidth: '500px', margin: '0 auto', width: '100%' }}>
                    <Search size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                    <input 
                        type="text" 
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ 
                            width: '100%', 
                            padding: '1rem 1rem 1rem 3.5rem', 
                            borderRadius: '99px', 
                            border: '1px solid var(--border-color)',
                            backgroundColor: 'var(--bg-primary)',
                            color: 'var(--text-primary)',
                            outline: 'none',
                            fontSize: '1rem'
                        }}
                    />
                </div>
            </div>

            <motion.div layout className="products-grid">
                <AnimatePresence>
                    {filteredProducts.map(product => (
                        <motion.div
                            key={product.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredProducts.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem' }}>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>No items found matching your selection.</p>
                </div>
            )}
        </div>
    );
};

export default Shop;
