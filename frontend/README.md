# Frontend - Product Management System

## Overview

This is the React frontend for the Product Management System, providing a clean and modern interface for managing products.

## Features

- User authentication with JWT
- Product listing and details
- Create, edit, and delete products
- Image upload and preview
- Form validation
- Responsive design
- Protected routes

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

The app will be available at `http://localhost:3000`

## Components

### Pages
- `Login.js` - User authentication
- `ProductList.js` - Display all products
- `ProductDetail.js` - Single product view with edit/delete options
- `CreateProduct.js` - Create new product form
- `EditProduct.js` - Edit existing product form

### Components
- `Navbar.js` - Navigation component
- `ProtectedRoute.js` - Route protection wrapper

### Context
- `AuthContext.js` - Authentication state management

## Styling

The application uses custom CSS without any external frameworks. All styles are in `src/index.css`.

## API Integration

Uses Axios for HTTP requests with automatic JWT token handling.

## Features Details

### Authentication
- Login/logout functionality
- JWT token storage in localStorage
- Automatic token inclusion in API requests
- Protected routes for admin functions

### Product Management
- View all products in a grid layout
- Product details with image display
- Create new products with image upload
- Edit existing products
- Delete products with confirmation

### Form Validation
- Real-time validation feedback
- Server-side error handling
- Image file validation (type and size)
- Required field validation

### Image Upload
- Preview before upload
- File type and size validation
- Support for JPEG, JPG, PNG, GIF
- Maximum file size: 5MB

## Development

### Available Scripts
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### Proxy Configuration

The app is configured to proxy API requests to `http://localhost:5000` in `package.json`.

## Browser Support

Supports all modern browsers as specified in `package.json`.
