import React, { useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../App';
import { User, Lock, ArrowRight } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const { login, isAuthenticated } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();
    const location = useLocation();

    if (isAuthenticated) {
        return <Navigate to="/home" replace />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const apiUrl = import.meta.env.VITE_API_URL || '';
            const res = await axios.post(`${apiUrl}/api/login`, { email, password });
            login(res.data);
            showToast('Login successful');
            navigate(location.state?.from || '/home', { replace: true });
        } catch (error) {
            showToast(error.response?.data?.message || 'Login failed', 'error');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container login-wrap">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="login-card">
                <h2>Welcome Back</h2>
                <p>Login to continue shopping smarter.</p>

                <form onSubmit={handleSubmit} className="login-form">
                    <label>Email</label>
                    <div className="input-wrap">
                        <User size={18} />
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="name@example.com" />
                    </div>

                    <label>Password</label>
                    <div className="input-wrap">
                        <Lock size={18} />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Enter password" />
                    </div>

                    <button className="btn btn-primary" type="submit" disabled={submitting}>
                        {submitting ? 'Signing in...' : 'Login'} <ArrowRight size={18} />
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;
