import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import heroImage from '../assets/hero-premium.png';

const Home = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [health, setHealth] = useState('Checking...');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || '';
                const [productsRes, healthRes] = await Promise.all([
                    axios.get(`${apiUrl}/api/products`),
                    axios.get(`${apiUrl}/api/health`)
                ]);
                setProducts(productsRes.data.data || []);
                setHealth(healthRes.data.status || 'UP');
            } catch (error) {
                setHealth('DOWN');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const featured = useMemo(() => products.slice(0, 8), [products]);
    const categories = useMemo(() => [...new Set(products.map((p) => p.category))], [products]);

    if (loading) return <Loader />;

    return (
        <div className="container section-padding">
            <section className="hero-banner hero-banner-split">
                <div>
                    <h1>Big Sale - Up to 50% Off</h1>
                    <p>Discover curated products with fast delivery and clean design.</p>
                    <button className="btn btn-primary" onClick={() => navigate('/products')}>Shop Now</button>
                </div>
                <div className="hero-banner-image-wrap">
                    <img src={heroImage} alt="ShopSmart offer" className="hero-banner-image" />
                </div>
            </section>

            <section className="stats-grid">
                <div className="stat-card"><h3>{products.length}</h3><p>Total Products</p></div>
                <div className="stat-card"><h3>{categories.length}</h3><p>Categories</p></div>
                <div className="stat-card"><h3>{Math.max(1, Math.floor(products.length / 4))}</h3><p>Deals Available</p></div>
                <div className="stat-card"><h3>{health}</h3><p>Backend Health</p></div>
            </section>

            <section>
                <div className="section-row">
                    <h2>Featured Products</h2>
                    <button className="btn" onClick={() => navigate('/products')}>View all</button>
                </div>
                <div className="products-grid">
                    {featured.map((product) => (
                        <motion.div key={product.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </div>
            </section>

            <section>
                <h2>Categories</h2>
                <div className="category-grid">
                    {categories.map((category) => (
                        <button key={category} className="category-tile" onClick={() => navigate('/products')}>
                            {category}
                        </button>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
