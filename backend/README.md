# Backend API - Product Management System

## Overview

This is the backend API for the Product Management System, built with Node.js, Express, and MongoDB.

## Features

- JWT-based authentication
- Product CRUD operations
- Image upload functionality
- Input validation
- Error handling
- CORS support

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/product-management
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=7d
   ```

3. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register admin user
- `POST /api/auth/login` - Login admin user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (requires auth)
- `PUT /api/products/:id` - Update product (requires auth)
- `DELETE /api/products/:id` - Delete product (requires auth)

## Models

### User
```javascript
{
  username: String (required, unique),
  password: String (required, hashed),
  isAdmin: Boolean (default: true)
}
```

### Product
```javascript
{
  name: String (required),
  price: Number (required, min: 0),
  category: String (required),
  inStock: Boolean (default: true),
  image: String (optional)
}
```

## File Upload

- Images are stored in `uploads/` directory
- Supported formats: JPEG, JPG, PNG, GIF
- Maximum file size: 5MB
- Served at `/uploads` endpoint

## Security

- JWT tokens for authentication
- Password hashing with bcrypt
- Input validation with express-validator
- Protected routes middleware
