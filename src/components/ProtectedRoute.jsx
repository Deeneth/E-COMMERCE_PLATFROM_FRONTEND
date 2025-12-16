import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children, adminOnly = false }) {
    const { isAuthenticated, isAdmin, loading } = useAuth();

    if (loading) {
        return <div style={{textAlign: 'center', padding: '2rem'}}>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (adminOnly && !isAdmin) {
        return <div style={{textAlign: 'center', padding: '2rem'}}>Access denied. Admin only.</div>;
    }

    return children;
}

export default ProtectedRoute;