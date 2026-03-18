import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ThemeToggle from './ThemeToggle';
import { motion } from 'framer-motion';

const Navbar = () => {
    const { cartCount } = useCart();

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
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
