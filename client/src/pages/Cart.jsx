import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../App';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    const { showToast } = useToast();

    if (cart.length === 0) {
        return (
            <div className="container empty-cart">
                <ShoppingBag size={64} className="empty-cart-icon" />
                <h2>Your cart is empty</h2>
                <p className="empty-cart-text">Looks like you haven't added anything to your cart yet.</p>
                <Link to="/products" className="btn btn-primary start-shopping-btn">Start Shopping</Link>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="container section-padding">
                <h1 className="cart-title">Your Cart</h1>

                <div className="cart-container">
                    <div className="cart-items">
                        {cart.map((item) => (
                            <div key={item.id} className="cart-item">
                                <img src={item.image} alt={item.name} className="cart-item-image" />
                                <div className="cart-item-info">
                                    <h3 className="cart-item-name">{item.name}</h3>
                                    <p className="cart-item-price">${item.price.toFixed(2)}</p>
                                </div>
                                <div className="cart-item-actions">
                                    <div className="quantity-control">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}><Minus size={16} /></button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={16} /></button>
                                    </div>
                                    <button className="btn-remove" onClick={() => removeFromCart(item.id)}><Trash2 size={20} /></button>
                                </div>
                            </div>
                        ))}
                        <div className="cart-actions-footer">
                            <button onClick={() => { clearCart(); showToast('Cart cleared'); }} className="btn-clear-cart">Clear Entire Cart</button>
                        </div>
                    </div>

                    <div className="cart-summary">
                        <h3 className="summary-title">Order Summary</h3>
                        <div className="summary-row"><span>Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
                        <div className="summary-row"><span>Shipping</span><span>$0.00</span></div>
                        <div className="summary-row"><span>Tax</span><span>${(cartTotal * 0.08).toFixed(2)}</span></div>
                        <div className="summary-total"><span>Total</span><span>${(cartTotal * 1.08).toFixed(2)}</span></div>
                        <button className="btn btn-primary" onClick={() => showToast('Checkout coming soon')}>Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
