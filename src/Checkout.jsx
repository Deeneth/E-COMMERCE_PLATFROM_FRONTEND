import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderAPI } from './services/api';
import { useAuth } from './context/AuthContext';

function Checkout() {
    const [cartItems, setCartItems] = useState([]);
    const [shippingAddress, setShippingAddress] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
        pincode: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(cart);
    }, [isAuthenticated, navigate]);

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const handleInputChange = (e) => {
        setShippingAddress({
            ...shippingAddress,
            [e.target.name]: e.target.value
        });
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const orderData = {
                items: cartItems.map(item => ({
                    productId: item._id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity
                })),
                shippingAddress
            };

            const response = await orderAPI.createOrder(orderData);
            
            // Clear cart after successful order
            localStorage.removeItem('cart');
            
            alert('Order placed successfully!');
            navigate('/orders');
            
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <h2>Your cart is empty</h2>
                <button onClick={() => navigate('/products')}>Continue Shopping</button>
            </div>
        );
    }

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h2>Checkout</h2>
            
            {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {/* Order Summary */}
                <div>
                    <h3>Order Summary</h3>
                    {cartItems.map(item => (
                        <div key={item._id} style={{ 
                            border: '1px solid #ddd', 
                            padding: '1rem', 
                            marginBottom: '1rem',
                            borderRadius: '4px'
                        }}>
                            <h4>{item.name}</h4>
                            <p>Price: ₹{item.price}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p><strong>Subtotal: ₹{item.price * item.quantity}</strong></p>
                        </div>
                    ))}
                    <div style={{ 
                        backgroundColor: '#f8f9fa', 
                        padding: '1rem', 
                        borderRadius: '4px',
                        marginTop: '1rem'
                    }}>
                        <h3>Total: ₹{getTotalPrice()}</h3>
                    </div>
                </div>

                {/* Shipping Form */}
                <div>
                    <h3>Shipping Address</h3>
                    <form onSubmit={handlePlaceOrder}>
                        <div style={{ marginBottom: '1rem' }}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={shippingAddress.name}
                                onChange={handleInputChange}
                                required
                                style={{ width: '100%', padding: '0.5rem' }}
                            />
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                value={shippingAddress.phone}
                                onChange={handleInputChange}
                                required
                                style={{ width: '100%', padding: '0.5rem' }}
                            />
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <textarea
                                name="address"
                                placeholder="Address"
                                value={shippingAddress.address}
                                onChange={handleInputChange}
                                required
                                style={{ width: '100%', padding: '0.5rem', minHeight: '80px' }}
                            />
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                value={shippingAddress.city}
                                onChange={handleInputChange}
                                required
                                style={{ width: '100%', padding: '0.5rem' }}
                            />
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <input
                                type="text"
                                name="pincode"
                                placeholder="Pincode"
                                value={shippingAddress.pincode}
                                onChange={handleInputChange}
                                required
                                style={{ width: '100%', padding: '0.5rem' }}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                backgroundColor: '#28a745',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '1rem'
                            }}
                        >
                            {loading ? 'Placing Order...' : `Place Order - ₹${getTotalPrice()}`}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Checkout;