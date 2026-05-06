import React, { useMemo, useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import About from './pages/About';
import Shop from './pages/Shop';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

const ToastContext = createContext();
export const useToast = () => useContext(ToastContext);

const AppShell = () => {
    const [toasts, setToasts] = useState([]);

    const showToast = (message, type = 'success') => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => setToasts((prev) => prev.filter((toast) => toast.id !== id)), 2500);
    };

    const toastApi = useMemo(() => ({ showToast }), []);

    return (
        <ToastContext.Provider value={toastApi}>
            <Router>
                <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', transition: 'background-color 0.5s ease, color 0.5s ease' }}>
                    <Navbar />
                    <main style={{ flex: 1 }}>
                        <Routes>
                            <Route path="/" element={<Landing />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                            <Route path="/products" element={<ProtectedRoute><Shop /></ProtectedRoute>} />
                            <Route path="/shop" element={<Navigate to="/products" replace />} />
                            <Route path="/product/:id" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />
                            <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/faq" element={<FAQ />} />
                            <Route path="/about" element={<About />} />
                        </Routes>
                    </main>
                    <Footer />

                    <div className="toast-wrap">
                        {toasts.map((toast) => (
                            <div key={toast.id} className={`toast toast-${toast.type}`}>{toast.message}</div>
                        ))}
                    </div>
                </div>
            </Router>
        </ToastContext.Provider>
    );
};

function App() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <CartProvider>
                    <AppShell />
                </CartProvider>
            </ThemeProvider>
        </AuthProvider>
    );
}

export default App;
// this is frontend