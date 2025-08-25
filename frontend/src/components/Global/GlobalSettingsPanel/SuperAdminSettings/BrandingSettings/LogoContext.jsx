import React, { createContext, useContext, useState, useEffect } from 'react';
import icons from '../../../../../constants/icons';

const LogoContext = createContext();

export const useLogo = () => {
  const context = useContext(LogoContext);
  if (!context) {
    // Return a fallback context if LogoProvider is not available
    return {
      logoUrl: icons.CompanyLogo,
      updateLogo: () => {},
      resetLogo: () => {}
    };
  }
  return context;
};

export const LogoProvider = ({ children }) => {
  const [logoUrl, setLogoUrl] = useState(icons.CompanyLogo);

  useEffect(() => {
    // Load saved logo from localStorage on mount
    try {
      const savedLogo = localStorage.getItem('umid-logo');
      if (savedLogo) {
        setLogoUrl(savedLogo);
      }
    } catch (error) {
      console.error('Error loading logo from localStorage:', error);
    }
  }, []);

  const updateLogo = (newLogoUrl) => {
    try {
      setLogoUrl(newLogoUrl);
      localStorage.setItem('umid-logo', newLogoUrl);
    } catch (error) {
      console.error('Error updating logo:', error);
    }
  };

  const resetLogo = () => {
    try {
      setLogoUrl(icons.CompanyLogo);
      localStorage.removeItem('umid-logo');
    } catch (error) {
      console.error('Error resetting logo:', error);
    }
  };

  const value = {
    logoUrl,
    updateLogo,
    resetLogo
  };

  return (
    <LogoContext.Provider value={value}>
      {children}
    </LogoContext.Provider>
  );
}; 