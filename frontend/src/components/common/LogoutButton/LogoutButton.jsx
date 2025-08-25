import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../../services/authService';
import './LogoutButton.scss';

const LogoutButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    try {
      await AuthService.logout();
      // Redirect to role selection page
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if logout fails, redirect to role selection
      navigate('/', { replace: true });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      className="logout-button" 
      onClick={handleLogout}
      disabled={isLoading}
      title="Logout"
    >
      {isLoading ? (
        <div className="logout-spinner"></div>
      ) : (
        <>
          <svg 
            className="logout-icon" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16,17 21,12 16,7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span className="logout-text">Logout</span>
        </>
      )}
    </button>
  );
};

export default LogoutButton;
