import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/LogIn';
import Register from '../pages/Register';
import Home from '../pages/Home';
import PrivateRoute from '../components/privateRoute/PrivateRoute';
import { AuthProvider } from '../components/authContext/AuthContext';

function AppRoutes() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} /> 
          <Route path="/register" element={<Register />} /> 
          {/* Rutas privadas */}
          <Route 
            path="/home" 
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default AppRoutes;
