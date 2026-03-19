import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import { motion } from 'framer-motion';

const Navbar = () => {
    const { cartCount } = useCart();
    const { user, logout } = useAuth();

    return (
        <motion.nav 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="navbar"
        >
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', height: '100%' }}>
                <Link to="/" className="nav-logo">
                    SHOPSMART
                </Link>

                <div className="nav-links">
                    <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                        Home
                    </NavLink>
                    <NavLink to="/shop" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                        Shop
                    </NavLink>
                    <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                        About
                    </NavLink>
                    <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                        Contact
                    </NavLink>
                    <NavLink to="/faq" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                        FAQ
                    </NavLink>
                </div>

                <div className="nav-actions">
                    <ThemeToggle />
                    <Link to="/cart" className="cart-icon-wrapper">
                        <ShoppingCart size={24} color="var(--text-primary)" />
                        {cartCount > 0 && (
                            <motion.span 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="cart-count"
                            >
                                {cartCount}
                            </motion.span>
                        )}
                    </Link>

                    {user ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
                                <User size={20} />
                                <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>{user.name.split(' ')[0]}</span>
                            </div>
                            <button onClick={logout} style={{ display: 'flex', alignItems: 'center', color: 'var(--text-primary)', background: 'none', border: 'none', cursor: 'pointer' }}>
                                <LogOut size={20} />
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" style={{ 
                            marginLeft: '1rem', 
                            padding: '0.5rem 1.25rem', 
                            borderRadius: '99px', 
                            backgroundColor: 'var(--text-primary)', 
                            color: 'var(--bg-primary)',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            textDecoration: 'none'
                        }}>
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
