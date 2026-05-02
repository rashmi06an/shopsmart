import React, { useMemo, useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');
    const [sortBy, setSortBy] = useState('default');
    const [maxPrice, setMaxPrice] = useState(250);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
                const res = await axios.get(`${apiUrl}/api/products`);
                setProducts(res.data.data || []);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const categories = useMemo(() => ['All', ...new Set(products.map((p) => p.category))], [products]);

    const filteredProducts = useMemo(() => {
        let result = [...products];

        if (activeCategory !== 'All') {
            result = result.filter((p) => p.category === activeCategory);
        }

        result = result.filter((p) => p.price <= Number(maxPrice));

        if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
        if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);

        return result;
    }, [products, activeCategory, sortBy, maxPrice]);

    if (loading) return <Loader />;

    return (
        <div className="container section-padding">
            <h1 className="shop-title">Products</h1>

            <div className="shop-layout">
                <aside className="filter-panel">
                    <h3>Filters</h3>
                    <label>Category</label>
                    <select value={activeCategory} onChange={(e) => setActiveCategory(e.target.value)}>
                        {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>

                    <label>Max Price: ${maxPrice}</label>
                    <input type="range" min="20" max="250" step="5" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />

                    <label>Sort By</label>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="default">Default</option>
                        <option value="price-asc">Price low to high</option>
                        <option value="price-desc">Price high to low</option>
                    </select>
                </aside>

                <section>
                    <div className="products-grid">
                        {filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
                    </div>
                    {!filteredProducts.length && <p>No products found for this filter.</p>}
                </section>
            </div>
        </div>
    );
};

export default Shop;
