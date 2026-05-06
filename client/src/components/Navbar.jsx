import React from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Menu, X, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import { motion } from 'framer-motion';

const Navbar = () => {
    const { cartCount } = useCart();
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const [search, setSearch] = React.useState('');

    const onSearchSubmit = (e) => {
        e.preventDefault();
        if (location.pathname !== '/products') {
            navigate('/products');
        }
    };

    const onLogout = () => {
        logout();
        navigate('/login');
    };

    const isAuthPage = location.pathname === '/login';

    return (
        <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} className="navbar">
            <div className="container nav-main">
                <Link to={user ? '/home' : '/'} className="nav-logo">ShopSmart</Link>

                {!isAuthPage && user && (
                    <form className="nav-search" onSubmit={onSearchSubmit}>
                        <Search size={16} />
                        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products" aria-label="Search products" />
                    </form>
                )}

                <div className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                    <NavLink to={user ? '/home' : '/'} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
                    <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>About</NavLink>
                    <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Contact</NavLink>
                    {user && <NavLink to="/products" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Products</NavLink>}
                    <a href="/api" target="_blank" rel="noreferrer" className="nav-link">Backend API</a>
                </div>

                <div className="nav-actions">
                    <ThemeToggle />
                    {user && (
                        <Link to="/cart" className="cart-icon-wrapper" aria-label="Cart">
                            <ShoppingCart size={22} color="var(--text-primary)" />
                            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                        </Link>
                    )}

                    {user ? (
                        <div className="nav-user hide-on-mobile">
                            <User size={18} />
                            <span>{user.name.split(' ')[0]}</span>
                            <button onClick={onLogout} aria-label="Logout"><LogOut size={18} /></button>
                        </div>
                    ) : (
                        <div className="hide-on-mobile" style={{ display: 'flex', gap: '0.5rem' }}>
                            <Link to="/login" className="btn">Login</Link>
                            <Link to="/login" className="btn btn-primary">Sign Up</Link>
                        </div>
                    )}

                    <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle Menu">
                        {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;