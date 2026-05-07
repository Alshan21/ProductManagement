import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    inStock: true
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const navigate = useNavigate();

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

      const response = await axios.post('/api/products', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      navigate(`/products/${response.data._id}`);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to create product';
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

  return (
    <div className="card">
      <h2>Create New Product</h2>
      
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
            Accepted formats: JPEG, JPG, PNG, GIF. Max size: 5MB
          </small>
        </div>
        
        {imagePreview && (
          <div className="form-group">
            <label>Image Preview</label>
            <img 
              src={imagePreview} 
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
            {loading ? 'Creating...' : 'Create Product'}
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => navigate('/products')}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
