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
            <header className="shop-header">
                <h1 className="shop-title">The Collection</h1>
                <p className="shop-subtitle">
                    Explore our curated selection of sustainably crafted essentials. Designed for the modern wardrobe with a focus on longevity and ethical craft.
                </p>
            </header>

            <div className="shop-controls">
                <div className="category-filters">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="search-container">
                    <Search size={18} className="search-icon" />
                    <input 
                        type="text" 
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
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
