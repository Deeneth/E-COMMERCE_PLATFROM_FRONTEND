import React, { useState, useEffect } from 'react';
import { orderAPI } from './services/api';
import { useAuth } from './context/AuthContext';

function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            fetchOrders();
        }
    }, [isAuthenticated]);

    const fetchOrders = async () => {
        try {
            const data = await orderAPI.getUserOrders();
            setOrders(data);
        } catch (error) {
            setError('Failed to fetch orders');
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'pending': return '#f39c12';
            case 'confirmed': return '#3498db';
            case 'shipped': return '#9b59b6';
            case 'delivered': return '#27ae60';
            default: return '#95a5a6';
        }
    };

    const getStatusIcon = (status) => {
        switch(status) {
            case 'pending': return '⏳';
            case 'confirmed': return '✅';
            case 'shipped': return '🚚';
            case 'delivered': return '📦';
            default: return '❓';
        }
    };

    if (!isAuthenticated) {
        return (
            <div style={{
                minHeight: '60vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f8f9fa'
            }}>
                <div style={{
                    textAlign: 'center',
                    padding: '3rem',
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}>
                    <h2>🔒 Login Required</h2>
                    <p>Please login to view your orders</p>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div style={{
                minHeight: '60vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        width: '50px',
                        height: '50px',
                        border: '4px solid #f3f3f3',
                        borderTop: '4px solid #007bff',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 1rem'
                    }}></div>
                    <p>Loading your orders...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{
                minHeight: '60vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{
                    textAlign: 'center',
                    padding: '2rem',
                    color: '#e74c3c',
                    backgroundColor: '#fdf2f2',
                    borderRadius: '8px',
                    border: '1px solid #fecaca'
                }}>
                    <h3>❌ Error</h3>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#333',
            padding: '2rem 1rem'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{
                    textAlign: 'center',
                    marginBottom: '3rem'
                }}>
                    <h1 style={{
                        fontSize: '2.5rem',
                        color: 'white',
                        marginBottom: '0.5rem'
                    }}>My Orders</h1>
                    <p style={{ color: '#ccc', fontSize: '1.1rem' }}>Track and manage your orders</p>
                </div>
                
                {orders.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '4rem 2rem',
                        backgroundColor: 'white',
                        borderRadius: '16px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
                    }}>
                        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</div>
                        <h3 style={{ color: '#333', marginBottom: '1rem' }}>No Orders Yet</h3>
                        <p style={{ color: '#666', marginBottom: '2rem' }}>Start shopping to see your orders here!</p>
                        <button 
                            onClick={() => window.location.href = '/products'}
                            style={{
                                backgroundColor: '#007bff',
                                color: 'white',
                                border: 'none',
                                padding: '12px 24px',
                                borderRadius: '8px',
                                fontSize: '1rem',
                                cursor: 'pointer'
                            }}
                        >
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gap: '1.5rem'
                    }}>
                        {orders.map(order => (
                            <div key={order._id} style={{
                                backgroundColor: 'white',
                                borderRadius: '16px',
                                padding: '2rem',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                                border: '1px solid #ddd',
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.3)';
                            }}>
                                
                                {/* Order Header */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    marginBottom: '1.5rem',
                                    paddingBottom: '1rem',
                                    borderBottom: '2px solid #f0f0f0'
                                }}>
                                    <div>
                                        <h3 style={{
                                            color: '#333',
                                            fontSize: '1.3rem',
                                            marginBottom: '0.5rem'
                                        }}>Order #{order._id.slice(-8).toUpperCase()}</h3>
                                        <p style={{
                                            color: '#666',
                                            margin: '0.25rem 0',
                                            fontSize: '0.95rem'
                                        }}>{new Date(order.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}</p>
                                        <div style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            backgroundColor: getStatusColor(order.status),
                                            color: 'white',
                                            padding: '0.5rem 1rem',
                                            borderRadius: '20px',
                                            fontSize: '0.85rem',
                                            fontWeight: 'bold',
                                            marginTop: '0.5rem'
                                        }}>
                                            <span style={{ marginRight: '0.5rem' }}>{getStatusIcon(order.status)}</span>
                                            {order.status.toUpperCase()}
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <p style={{
                                            color: '#666',
                                            fontSize: '0.9rem',
                                            margin: '0 0 0.5rem 0'
                                        }}>Total Amount</p>
                                        <h2 style={{
                                            color: '#28a745',
                                            fontSize: '2rem',
                                            margin: 0,
                                            fontWeight: 'bold'
                                        }}>₹{order.totalAmount.toLocaleString()}</h2>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <h4 style={{
                                        color: '#333',
                                        marginBottom: '1rem',
                                        fontSize: '1.1rem'
                                    }}>Items Ordered</h4>
                                    <div style={{
                                        display: 'grid',
                                        gap: '0.75rem'
                                    }}>
                                        {order.items.map((item, index) => (
                                            <div key={index} style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                padding: '1rem',
                                                backgroundColor: '#f8f9fa',
                                                borderRadius: '12px',
                                                border: '1px solid #e9ecef'
                                            }}>
                                                <div style={{ flex: 1 }}>
                                                    <h5 style={{
                                                        color: '#333',
                                                        margin: '0 0 0.25rem 0',
                                                        fontSize: '1rem'
                                                    }}>{item.name}</h5>
                                                    <p style={{
                                                        color: '#666',
                                                        margin: 0,
                                                        fontSize: '0.9rem'
                                                    }}>₹{item.price} × {item.quantity}</p>
                                                </div>
                                                <div style={{
                                                    backgroundColor: '#007bff',
                                                    color: 'white',
                                                    padding: '0.5rem 1rem',
                                                    borderRadius: '8px',
                                                    fontWeight: 'bold'
                                                }}>
                                                    ₹{(item.price * item.quantity).toLocaleString()}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Shipping Address */}
                                {order.shippingAddress && (
                                    <div style={{
                                        backgroundColor: '#f8f9fa',
                                        padding: '1.5rem',
                                        borderRadius: '12px',
                                        border: '1px solid #e9ecef'
                                    }}>
                                        <h4 style={{
                                            color: '#333',
                                            marginBottom: '1rem',
                                            fontSize: '1.1rem'
                                        }}>Shipping Address</h4>
                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                            gap: '1rem'
                                        }}>
                                            <div>
                                                <p style={{ margin: '0.25rem 0', color: '#333' }}>
                                                    <strong>{order.shippingAddress.name}</strong>
                                                </p>
                                                <p style={{ margin: '0.25rem 0', color: '#666' }}>
                                                    {order.shippingAddress.phone}
                                                </p>
                                            </div>
                                            <div>
                                                <p style={{ margin: '0.25rem 0', color: '#666' }}>
                                                    {order.shippingAddress.address}
                                                </p>
                                                <p style={{ margin: '0.25rem 0', color: '#666' }}>
                                                    {order.shippingAddress.city} - {order.shippingAddress.pincode}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}

export default Orders;