import React, { useState } from 'react';
import { productAPI } from './services/api';
import { useAuth } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        image: '',
        stock: '',
        category: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { isAdmin } = useAuth();
    const navigate = useNavigate();

    if (!isAdmin) {
        return <div style={{textAlign: 'center', padding: '2rem'}}>Access denied. Admin only.</div>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await productAPI.createProduct({
                ...formData,
                price: Number(formData.price),
                stock: Number(formData.stock)
            });
            setSuccess('Product added successfully!');
            setFormData({
                name: '',
                description: '',
                price: '',
                image: '',
                stock: '',
                category: ''
            });
            setTimeout(() => navigate('/products'), 2000);
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to add product');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div style={{ maxWidth: '500px', margin: '2rem auto', padding: '2rem' }}>
            <h2>Add New Product</h2>
            
            {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
            {success && <div style={{ color: 'green', marginBottom: '1rem' }}>{success}</div>}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '0.5rem' }}
                    />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <textarea
                        name="description"
                        placeholder="Product Description"
                        value={formData.description}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem', minHeight: '80px' }}
                    />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '0.5rem' }}
                    />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <input
                        type="url"
                        name="image"
                        placeholder="Image URL"
                        value={formData.image}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem' }}
                    />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <input
                        type="number"
                        name="stock"
                        placeholder="Stock Quantity"
                        value={formData.stock}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.5rem' }}
                    />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={formData.category}
                        onChange={handleChange}
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
                        cursor: 'pointer'
                    }}
                >
                    {loading ? 'Adding...' : 'Add Product'}
                </button>
            </form>
        </div>
    );
}

export default AddProduct;