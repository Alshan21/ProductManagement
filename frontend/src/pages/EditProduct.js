import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProduct = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    inStock: true
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [existingImage, setExistingImage] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [submitError, setSubmitError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setFetchLoading(true);
      const response = await axios.get(`/api/products/${id}`);
      const product = response.data;
      
      setFormData({
        name: product.name,
        price: product.price.toString(),
        category: product.category,
        inStock: product.inStock
      });
      
      if (product.image) {
        setExistingImage(product.image);
        setImagePreview(`http://localhost:5000${product.image}`);
      }
      
      setSubmitError('');
    } catch (err) {
      setSubmitError('Product not found');
      console.error('Error fetching product:', err);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, image: 'Only image files are allowed' }));
        return;
      }
      
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: 'Image size must be less than 5MB' }));
        return;
      }

      setImageFile(file);
      setErrors(prev => ({ ...prev, image: '' }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    
    if (!formData.price.trim()) {
      newErrors.price = 'Product price is required';
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }
    
    if (!formData.category.trim()) {
      newErrors.category = 'Product category is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setSubmitError('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('inStock', formData.inStock);
      
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      const response = await axios.put(`/api/products/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      navigate(`/products/${response.data._id}`);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update product';
      if (error.response?.data?.errors) {
        const serverErrors = {};
        error.response.data.errors.forEach(err => {
          if (err.param) {
            serverErrors[err.param] = err.msg;
          }
        });
        setErrors(serverErrors);
      } else {
        setSubmitError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return <div className="text-center">Loading product...</div>;
  }

  if (submitError && !formData.name) {
    return (
      <div className="alert alert-error">
        {submitError}
        <button 
          onClick={() => navigate('/products')} 
          className="btn btn-secondary ml-10"
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Edit Product</h2>
      
      {submitError && (
        <div className="alert alert-error">
          {submitError}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Product Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            className={`form-control ${errors.name ? 'error' : ''}`}
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
          />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="price">Price *</label>
          <input
            type="number"
            id="price"
            name="price"
            step="0.01"
            min="0"
            className={`form-control ${errors.price ? 'error' : ''}`}
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter product price"
          />
          {errors.price && <div className="error">{errors.price}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="category">Category *</label>
          <input
            type="text"
            id="category"
            name="category"
            className={`form-control ${errors.category ? 'error' : ''}`}
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter product category"
          />
          {errors.category && <div className="error">{errors.category}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="inStock">
            <input
              type="checkbox"
              id="inStock"
              name="inStock"
              checked={formData.inStock}
              onChange={handleChange}
            />
            {' '}In Stock
          </label>
        </div>
        
        <div className="form-group">
          <label htmlFor="image">Product Image (optional)</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className={`form-control ${errors.image ? 'error' : ''}`}
          />
          {errors.image && <div className="error">{errors.image}</div>}
          <small className="text-muted">
            Leave empty to keep current image. Accepted formats: JPEG, JPG, PNG, GIF. Max size: 5MB
          </small>
        </div>
        
        {(imagePreview || existingImage) && (
          <div className="form-group">
            <label>Current Image</label>
            <img 
              src={imagePreview || `http://localhost:5000${existingImage}`} 
              alt="Product preview" 
              className="product-image"
              style={{ maxWidth: '200px', maxHeight: '200px' }}
            />
          </div>
        )}
        
        <div className="d-flex gap-10">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Product'}
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => navigate(`/products/${id}`)}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
