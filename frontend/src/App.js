import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import CreateProduct from './pages/CreateProduct';
import EditProduct from './pages/EditProduct';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/products" />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route 
              path="/products/create" 
              element={
                <ProtectedRoute>
                  <CreateProduct />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/products/:id/edit" 
              element={
                <ProtectedRoute>
                  <EditProduct />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
