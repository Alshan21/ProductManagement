import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/products');
      setProducts(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center">Loading products...</div>;
  }

  if (error) {
    return (
      <div className="alert alert-error">
        {error}
        <button onClick={fetchProducts} className="btn btn-secondary ml-10">
          Retry
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center">
        <h3>No products found</h3>
        <p>Start by creating your first product.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Products</h2>
      <div className="product-grid">
        {products.map(product => (
          <div key={product._id} className="product-card">
            {product.image && (
              <img 
                src={`http://localhost:5000${product.image}`} 
                alt={product.name}
                className="product-image"
              />
            )}
            <div className="product-title">{product.name}</div>
            <div className="product-price">${product.price.toFixed(2)}</div>
            <div className="product-category">Category: {product.category}</div>
            <div className={`product-stock ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </div>
            <div className="d-flex gap-10 mt-20">
              <Link to={`/products/${product._id}`} className="btn btn-primary">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
