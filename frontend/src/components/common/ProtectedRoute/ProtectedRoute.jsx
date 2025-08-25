import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../../config/api';

const ProtectedRoute = ({ children, requiredRole }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-session`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const userRole = data.data.user.role;
        
        // Check if user has the required role
        if (requiredRole && userRole !== requiredRole) {
          // User doesn't have the required role, redirect to appropriate login
          navigate(`/login/${userRole}`, { replace: true });
          return;
        }

        // Update localStorage with fresh user data
        localStorage.setItem('role', userRole);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        
        setIsAuthenticated(true);
      } else {
        // User not authenticated, redirect to role selection
        localStorage.removeItem('role');
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        navigate('/', { replace: true });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      // On error, redirect to role selection
      localStorage.removeItem('role');
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      navigate('/', { replace: true });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px'
      }}>
        Loading...
      </div>
    );
  }

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
