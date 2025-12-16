import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { productAPI } from './services/api';

function Pdc() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const products = await productAPI.getAllProducts();
            const foundProduct = products.find(p => p._id === id);
            setProduct(foundProduct);
        } catch (error) {
            setError('Failed to fetch product');
            console.error('Error fetching product:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = () => {
        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingItem = existingCart.find(item => item._id === product._id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            existingCart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(existingCart));
        alert('Product added to cart!');
    };

    if (loading) return <div style={{textAlign: 'center', padding: '2rem'}}>Loading product...</div>;
    if (error) return <div style={{textAlign: 'center', padding: '2rem', color: 'red'}}>{error}</div>;
    if (!product) return <h2>Product not found!</h2>;

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h1>{product.name}</h1>
            <img 
                src={product.image || '/placeholder.jpg'} 
                alt={product.name} 
                style={{ width: '300px', height: '300px', objectFit: 'cover' }} 
            />
            <p>{product.description}</p>
            <h2>₹{product.price}</h2>
            <p>Stock: {product.stock}</p>
            <p>Category: {product.category}</p>
            <div style={{ marginTop: '1rem' }}>
                <button 
                    onClick={handleAddToCart}
                    style={{
                        padding: '0.75rem 1.5rem',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        marginRight: '1rem',
                        cursor: 'pointer'
                    }}
                >
                    Add to Cart
                </button>
                <button 
                    onClick={() => {
                        // Add to cart and redirect to checkout
                        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
                        const existingItem = existingCart.find(item => item._id === product._id);
                        
                        if (existingItem) {
                            existingItem.quantity += 1;
                        } else {
                            existingCart.push({ ...product, quantity: 1 });
                        }
                        localStorage.setItem("cart", JSON.stringify(existingCart));
                        window.location.href = '/checkout';
                    }}
                    style={{
                        padding: '0.75rem 1.5rem',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Buy Now
                </button>
            </div>
        </div>
    );
}

export default Pdc