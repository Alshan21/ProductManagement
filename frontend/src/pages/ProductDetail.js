import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/products/${id}`);
      setProduct(response.data);
      setError('');
    } catch (err) {
      setError('Product not found');
      console.error('Error fetching product:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      setDeleteLoading(true);
      await axios.delete(`/api/products/${id}`);
      navigate('/products');
    } catch (err) {
      setError('Failed to delete product');
      console.error('Error deleting product:', err);
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center">Loading product...</div>;
  }

  if (error || !product) {
    return (
      <div className="alert alert-error">
        {error || 'Product not found'}
        <Link to="/products" className="btn btn-secondary ml-10">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="d-flex justify-content-between align-items-center mb-20">
        <h2>Product Details</h2>
        <Link to="/products" className="btn btn-secondary">
          Back to Products
        </Link>
      </div>

      <div className="product-detail">
        {product.image && (
          <div className="text-center mb-20">
            <img 
              src={`http://localhost:5000${product.image}`} 
              alt={product.name}
              className="product-image"
              style={{ maxWidth: '400px' }}
            />
          </div>
        )}

        <div className="product-info">
          <h3 className="product-title">{product.name}</h3>
          <div className="product-price">${product.price.toFixed(2)}</div>
          <div className="product-category">Category: {product.category}</div>
          <div className={`product-stock ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </div>
          
          <div className="mt-20">
            <small className="text-muted">
              Created: {new Date(product.createdAt).toLocaleDateString()}
              {product.updatedAt && product.updatedAt !== product.createdAt && 
                ` | Updated: ${new Date(product.updatedAt).toLocaleDateString()}`
              }
            </small>
          </div>
        </div>

        {isAuthenticated && (
          <div className="product-actions mt-20">
            <div className="d-flex gap-10">
              <Link 
                to={`/products/${product._id}/edit`} 
                className="btn btn-primary"
              >
                Edit Product
              </Link>
              <button 
                onClick={handleDelete} 
                className="btn btn-danger"
                disabled={deleteLoading}
              >
                {deleteLoading ? 'Deleting...' : 'Delete Product'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
