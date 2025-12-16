import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productAPI } from './services/api';
import { useAuth } from './context/AuthContext';
import './prod.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAdmin } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await productAPI.getAllProducts();
      setProducts(data);
    } catch (error) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{textAlign: 'center', padding: '2rem'}}>Loading products...</div>;
  if (error) return <div style={{textAlign: 'center', padding: '2rem', color: 'red'}}>{error}</div>;

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem'}}>
        <h2>Products</h2>
        {isAdmin && (
          <Link 
            to="/add-product" 
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#28a745',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px'
            }}
          >
            Add Product
          </Link>
        )}
      </div>
      
      <div className="grid">
        {products.length === 0 ? (
          <div style={{textAlign: 'center', padding: '2rem'}}>No products found</div>
        ) : (
          products.map((item) => (
            <div className="card" key={item._id}>
              <img className="product-img" src={item.image || '/placeholder.jpg'} alt={item.name} />
              <div className="card-body">
                <p className="title">{item.name}</p>
                <p className="desc">{item.description}</p>
                <p className="price">₹{item.price}</p>
                <Link className="btn" to={`/product/${item._id}`}>View</Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Products;
