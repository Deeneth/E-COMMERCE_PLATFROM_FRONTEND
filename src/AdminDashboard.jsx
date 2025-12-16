import React, { useState, useEffect } from 'react';
import { productAPI } from './services/api';
import { useAuth } from './context/AuthContext';
import { Link } from 'react-router-dom';

function AdminDashboard() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { isAdmin } = useAuth();

    useEffect(() => {
        if (isAdmin) {
            fetchProducts();
        }
    }, [isAdmin]);

    const fetchProducts = async () => {
        try {
            const data = await productAPI.getAllProducts();
            setProducts(data);
        } catch (error) {
            setError('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await productAPI.deleteProduct(id);
                setProducts(products.filter(p => p._id !== id));
            } catch (error) {
                alert('Failed to delete product');
            }
        }
    };

    if (!isAdmin) {
        return <div style={{textAlign: 'center', padding: '2rem'}}>Access denied. Admin only.</div>;
    }

    if (loading) return <div style={{textAlign: 'center', padding: '2rem'}}>Loading...</div>;

    return (
        <div style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2>Admin Dashboard</h2>
                <Link 
                    to="/add-product"
                    style={{
                        backgroundColor: '#28a745',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        textDecoration: 'none',
                        borderRadius: '4px'
                    }}
                >
                    Add New Product
                </Link>
            </div>

            {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

            <div style={{ display: 'grid', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gap: '1rem', fontWeight: 'bold', padding: '1rem', backgroundColor: '#f8f9fa' }}>
                    <div>Name</div>
                    <div>Price</div>
                    <div>Stock</div>
                    <div>Category</div>
                    <div>Actions</div>
                </div>

                {products.map(product => (
                    <div key={product._id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gap: '1rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '4px' }}>
                        <div>{product.name}</div>
                        <div>₹{product.price}</div>
                        <div>{product.stock}</div>
                        <div>{product.category}</div>
                        <div>
                            <button 
                                onClick={() => handleDelete(product._id)}
                                style={{
                                    backgroundColor: '#dc3545',
                                    color: 'white',
                                    border: 'none',
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    marginRight: '0.5rem'
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {products.length === 0 && (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                    No products found. <Link to="/add-product">Add your first product</Link>
                </div>
            )}
        </div>
    );
}

export default AdminDashboard;