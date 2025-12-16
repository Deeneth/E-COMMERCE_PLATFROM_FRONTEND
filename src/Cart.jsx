import { useState, useEffect } from 'react';

function Cart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(cart);
    }, []);

    const removeItem = (id) => {
        const updatedCart = cartItems.filter(item => item._id !== id);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity <= 0) {
            removeItem(id);
            return;
        }
        const updatedCart = cartItems.map(item => 
            item._id === id ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cart');
    };

    if (cartItems.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <h2>Your Cart</h2>
                <p>The cart is empty!</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h2>Your Cart</h2>
            {cartItems.map(item => (
                <div key={item._id} style={{
                    border: '1px solid #ccc', 
                    padding: '1rem', 
                    margin: '1rem 0',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div style={{ flex: 1 }}>
                        <h3>{item.name}</h3>
                        <p>Price: ₹{item.price}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span>Quantity:</span>
                            <button 
                                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                style={{ padding: '0.25rem 0.5rem' }}
                            >
                                -
                            </button>
                            <span>{item.quantity}</span>
                            <button 
                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                style={{ padding: '0.25rem 0.5rem' }}
                            >
                                +
                            </button>
                        </div>
                        <p><strong>Subtotal: ₹{item.price * item.quantity}</strong></p>
                    </div>
                    <button 
                        onClick={() => removeItem(item._id)} 
                        style={{
                            backgroundColor: '#dc3545', 
                            color: 'white',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Remove
                    </button>
                </div>
            ))}
            
            <div style={{ 
                marginTop: '2rem', 
                padding: '1rem', 
                backgroundColor: '#f8f9fa',
                borderRadius: '8px'
            }}>
                <h3>Total: ₹{getTotalPrice()}</h3>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button 
                        onClick={clearCart}
                        style={{
                            backgroundColor: '#6c757d',
                            color: 'white',
                            border: 'none',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Clear Cart
                    </button>
                    <button 
                        onClick={() => window.location.href = '/checkout'}
                        style={{
                            backgroundColor: '#28a745',
                            color: 'white',
                            border: 'none',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Cart;