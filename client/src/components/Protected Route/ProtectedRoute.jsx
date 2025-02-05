import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Authorization/Auth'; // Adjust the import path as needed

const ProtectedRoute = ({ element: Component }) => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? Component : <Navigate to="/login" />;
};

export default ProtectedRoute;
