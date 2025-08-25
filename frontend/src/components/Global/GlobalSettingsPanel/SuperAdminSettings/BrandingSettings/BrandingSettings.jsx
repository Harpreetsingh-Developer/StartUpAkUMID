import React, { useState, useEffect } from 'react';
import { useLogo } from './LogoContext';
import './BrandingSettings.scss';

const BrandingSettings = () => {
  const { logoUrl, updateLogo, resetLogo } = useLogo();
  const [selectedPrimaryColor, setSelectedPrimaryColor] = useState('rgba(14, 165, 233, 0.75)');
  const [selectedSecondaryColor, setSelectedSecondaryColor] = useState('#403F64');
  const [selectedFont, setSelectedFont] = useState('Poppins');
  const [highContrastFonts, setHighContrastFonts] = useState(false);
  const [logoFile, setLogoFile] = useState(null);
  const [faviconFile, setFaviconFile] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('success');

  // Color options for primary and secondary colors
  const primaryColorOptions = [
    { name: 'Light Blue', value: 'rgba(14, 165, 233, 0.75)' },
    { name: 'Ocean Blue', value: 'rgba(59, 130, 246, 0.8)' },
    { name: 'Royal Blue', value: 'rgba(37, 99, 235, 0.75)' },
    { name: 'Teal', value: 'rgba(20, 184, 166, 0.75)' },
    { name: 'Indigo', value: 'rgba(99, 102, 241, 0.75)' }
  ];

  const secondaryColorOptions = [
    { name: 'Purple', value: '#403F64' },
    { name: 'Dark Purple', value: '#6366f1' },
    { name: 'Charcoal', value: '#374151' },
    { name: 'Navy', value: '#1e293b' },
    { name: 'Slate', value: '#475569' }
  ];

  const fontOptions = [
    { name: 'Poppins', value: 'Poppins' },
    { name: 'Sans-Serif', value: 'sans-serif' },
    { name: 'Serif', value: 'serif' },
    { name: 'Monospace', value: 'monospace' },
    { name: 'Cursive', value: 'cursive' }
  ];

  // Theme Manager Functions
  const initializeTheme = () => {
    const savedTheme = localStorage.getItem('umid-theme');
    
    if (savedTheme) {
      const theme = JSON.parse(savedTheme);
      applyTheme(theme.primaryColor, theme.secondaryColor, theme.font);
    }
  };

  const applyTheme = (primaryColor, secondaryColor, fontFamily) => {
    const root = document.documentElement;
    
    // Update primary color
    root.style.setProperty('--primary-color', primaryColor);
    
    // Update secondary color
    root.style.setProperty('--secondary-color', secondaryColor);
    
    // Update font family
    const fontValue = fontFamily === 'Poppins' ? 'Poppins, sans-serif' : fontFamily;
    root.style.setProperty('--font-family', fontValue);
    
    // Apply font globally
    document.body.style.fontFamily = fontValue;
  };

  const getCurrentTheme = () => {
    const savedTheme = localStorage.getItem('umid-theme');
    return savedTheme ? JSON.parse(savedTheme) : null;
  };

  const resetTheme = () => {
    const root = document.documentElement;
    
    // Reset to default values
    root.style.setProperty('--primary-color', 'rgba(14, 165, 233, 0.75)');
    root.style.setProperty('--secondary-color', '#403F64');
    root.style.setProperty('--font-family', 'Poppins, sans-serif');
    
    // Clear localStorage
    localStorage.removeItem('umid-theme');
    
    // Apply font globally
    document.body.style.fontFamily = 'Poppins, sans-serif';
  };

  // Function to update CSS variables
  const updateTheme = (primaryColor, secondaryColor, fontFamily) => {
    const root = document.documentElement;
    
    // Update primary color
    root.style.setProperty('--primary-color', primaryColor);
    
    // Update secondary color
    root.style.setProperty('--secondary-color', secondaryColor);
    
    // Update font family
    const fontValue = fontFamily === 'Poppins' ? 'Poppins, sans-serif' : fontFamily;
    root.style.setProperty('--font-family', fontValue);
    
    // Apply font globally
    document.body.style.fontFamily = fontValue;
  };

  // Function to save theme to localStorage
  const saveThemeToStorage = (theme) => {
    localStorage.setItem('umid-theme', JSON.stringify(theme));
  };

  // Function to load theme from localStorage
  const loadThemeFromStorage = () => {
    const savedTheme = localStorage.getItem('umid-theme');
    if (savedTheme) {
      const theme = JSON.parse(savedTheme);
      setSelectedPrimaryColor(theme.primaryColor);
      setSelectedSecondaryColor(theme.secondaryColor);
      setSelectedFont(theme.font);
      setHighContrastFonts(theme.highContrastFonts !== undefined ? theme.highContrastFonts : false);
      updateTheme(theme.primaryColor, theme.secondaryColor, theme.font);
    }
  };

  // Function to show notification
  const showNotificationPopup = (message, type = 'success') => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
    
    // Auto hide after 3 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  // Function to update website logo
  const updateWebsiteLogo = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          // Update logo using context
          updateLogo(e.target.result);
        } catch (error) {
          console.error('Error updating logo:', error);
          showNotificationPopup('Error updating logo. Please try again.', 'error');
        }
      };
      reader.onerror = () => {
        showNotificationPopup('Error reading file. Please try again.', 'error');
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to update website favicon
  const updateWebsiteFavicon = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // Update favicon
        const favicon = document.querySelector('link[rel="icon"]') || document.querySelector('link[rel="shortcut icon"]');
        if (favicon) {
          favicon.href = e.target.result;
        } else {
          const newFavicon = document.createElement('link');
          newFavicon.rel = 'icon';
          newFavicon.href = e.target.result;
          document.head.appendChild(newFavicon);
        }
        
        // Store favicon data in localStorage
        localStorage.setItem('umid-favicon', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to apply high contrast fonts
  const applyHighContrastFonts = (enabled) => {
    const root = document.documentElement;
    
    if (enabled) {
      // Apply high contrast font settings
      root.style.setProperty('--font-weight-normal', '600');
      root.style.setProperty('--font-weight-medium', '700');
      root.style.setProperty('--font-weight-semibold', '800');
      root.style.setProperty('--font-weight-bold', '900');
      root.style.setProperty('--text-primary', '#000000');
      root.style.setProperty('--text-secondary', '#1a1a1a');
      
      // Add high contrast class to body
      document.body.classList.add('high-contrast');
    } else {
      // Reset to normal font settings
      root.style.setProperty('--font-weight-normal', '400');
      root.style.setProperty('--font-weight-medium', '500');
      root.style.setProperty('--font-weight-semibold', '600');
      root.style.setProperty('--font-weight-bold', '700');
      root.style.setProperty('--text-primary', '#1e293b');
      root.style.setProperty('--text-secondary', '#64748b');
      
      // Remove high contrast class from body
      document.body.classList.remove('high-contrast');
    }
  };

  // Load saved theme and assets on component mount
  useEffect(() => {
    loadThemeFromStorage();
    
    // Load saved favicon
    const savedFavicon = localStorage.getItem('umid-favicon');
    if (savedFavicon) {
      const favicon = document.querySelector('link[rel="icon"]') || document.querySelector('link[rel="shortcut icon"]');
      if (favicon) {
        favicon.href = savedFavicon;
      } else {
        const newFavicon = document.createElement('link');
        newFavicon.rel = 'icon';
        newFavicon.href = savedFavicon;
        document.head.appendChild(newFavicon);
      }
    }
    
    // Apply high contrast fonts setting
    applyHighContrastFonts(highContrastFonts);
  }, []);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        showNotificationPopup('Please select a valid image file.', 'error');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showNotificationPopup('File size must be less than 5MB.', 'error');
        return;
      }
      
      setLogoFile(file);
      updateWebsiteLogo(file);
      showNotificationPopup('Logo uploaded successfully!', 'success');
    }
  };

  const handleFaviconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFaviconFile(file);
      updateWebsiteFavicon(file);
      showNotificationPopup('Favicon uploaded successfully!', 'success');
    }
  };

  const handlePrimaryColorChange = (color) => {
    setSelectedPrimaryColor(color);
    updateTheme(color, selectedSecondaryColor, selectedFont);
  };

  const handleSecondaryColorChange = (color) => {
    setSelectedSecondaryColor(color);
    updateTheme(selectedPrimaryColor, color, selectedFont);
  };

  const handleFontChange = (font) => {
    setSelectedFont(font);
    updateTheme(selectedPrimaryColor, selectedSecondaryColor, font);
  };

  const handleHighContrastFontsChange = (enabled) => {
    setHighContrastFonts(enabled);
    applyHighContrastFonts(enabled);
  };

  const handleSave = () => {
    const theme = {
      primaryColor: selectedPrimaryColor,
      secondaryColor: selectedSecondaryColor,
      font: selectedFont,
      highContrastFonts,
      logoFile: logoFile?.name,
      faviconFile: faviconFile?.name
    };
    
    saveThemeToStorage(theme);
    
    // Handle save logic here
    console.log('Saving branding settings:', theme);
    
    // Show success notification
    showNotificationPopup('Branding settings saved successfully! The changes have been applied throughout the application.', 'success');
  };

  const handleReset = () => {
    // Reset to default values
    const defaultPrimaryColor = 'rgba(14, 165, 233, 0.75)';
    const defaultSecondaryColor = '#403F64';
    const defaultFont = 'Poppins';
    
    setSelectedPrimaryColor(defaultPrimaryColor);
    setSelectedSecondaryColor(defaultSecondaryColor);
    setSelectedFont(defaultFont);
    setHighContrastFonts(false);
    setLogoFile(null);
    setFaviconFile(null);
    
    // Update theme with default values
    updateTheme(defaultPrimaryColor, defaultSecondaryColor, defaultFont);
    
    // Reset high contrast fonts
    applyHighContrastFonts(false);
    
    // Reset logo using context
    resetLogo();
    
    // Reset favicon
    const favicon = document.querySelector('link[rel="icon"]') || document.querySelector('link[rel="shortcut icon"]');
    if (favicon) {
      favicon.href = '/favicon.ico'; // Set to default favicon
    }
    
    // Clear localStorage
    localStorage.removeItem('umid-theme');
    localStorage.removeItem('umid-favicon');
    
    // Show reset notification
    showNotificationPopup('Branding settings have been reset to default values.', 'info');
  };

  return (
    <div className="branding-settings">
      <div className="settings-grid">
        {/* Upload Logo */}
        <div className="setting-card">
          <h3>Upload Logo</h3>
          <div className="file-input-container">
            <input
              type="file"
              id="logo-upload"
              accept="image/*"
              onChange={handleLogoChange}
              className="file-input"
            />
            <label htmlFor="logo-upload" className="file-label">
              Choose File
            </label>
            <span className="file-name">
              {logoFile ? logoFile.name : 'No file chosen'}
            </span>
          </div>
          <p className="description">
            Upload your organization's logo to be displayed in the header and emails.
          </p>
        </div>

        {/* Upload Favicon */}
        <div className="setting-card">
          <h3>Upload Favicon</h3>
          <div className="file-input-container">
            <input
              type="file"
              id="favicon-upload"
              accept=".ico,.png"
              onChange={handleFaviconChange}
              className="file-input"
            />
            <label htmlFor="favicon-upload" className="file-label">
              Choose File
            </label>
            <span className="file-name">
              {faviconFile ? faviconFile.name : 'No file chosen'}
            </span>
          </div>
          <p className="description">
            Favicon appears in browser tabs. Upload a .ico or .png file (32x32 recommended)
          </p>
        </div>

        {/* Primary Theme Color */}
        <div className="setting-card">
          <h3>Primary Theme Color</h3>
          <div className="color-options">
            {primaryColorOptions.map((color) => (
              <div
                key={color.value}
                className={`color-option ${selectedPrimaryColor === color.value ? 'selected' : ''}`}
                onClick={() => handlePrimaryColorChange(color.value)}
                style={{ backgroundColor: color.value }}
                title={color.name}
              >
                {selectedPrimaryColor === color.value && <div className="checkmark">✓</div>}
              </div>
            ))}
          </div>
          <p className="description">
            This color will be applied to buttons, highlights, and key actions throughout the platform.
          </p>
        </div>

        {/* Secondary Theme Color */}
        <div className="setting-card">
          <h3>Secondary Theme Color</h3>
          <div className="color-options">
            {secondaryColorOptions.map((color) => (
              <div
                key={color.value}
                className={`color-option ${selectedSecondaryColor === color.value ? 'selected' : ''}`}
                onClick={() => handleSecondaryColorChange(color.value)}
                style={{ backgroundColor: color.value }}
                title={color.name}
              >
                {selectedSecondaryColor === color.value && <div className="checkmark">✓</div>}
              </div>
            ))}
          </div>
          <p className="description">
            This color is used for hover states, outlines, and secondary UI elements throughout the platform.
          </p>
        </div>

        {/* Font Style */}
        <div className="setting-card">
          <h3>Font Style</h3>
          <select
            value={selectedFont}
            onChange={(e) => handleFontChange(e.target.value)}
            className="font-select"
          >
            {fontOptions.map((font) => (
              <option key={font.value} value={font.value}>
                {font.name}
              </option>
            ))}
          </select>
          <p className="description">
            Choose a font style that will be applied throughout the entire platform.
          </p>
        </div>

        {/* High Contrast Fonts */}
        <div className="setting-card">
          <h3>High Contrast</h3>
          <div className="toggle-container">
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={highContrastFonts}
                onChange={(e) => handleHighContrastFontsChange(e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <p className="description">
            Enable high contrast fonts for better readability and accessibility throughout the platform.
          </p>
        </div>
      </div>

      <div className="save-button-container">
        <button className="reset-button" onClick={handleReset}>
          Reset
        </button>
        <button className="save-button" onClick={handleSave}>
          Save
        </button>
      </div>

      {/* Notification Popup */}
      {showNotification && (
        <div className={`notification-popup ${notificationType}`}>
          <div className="notification-content">
            <div className="notification-icon">
              {notificationType === 'success' ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
            <div className="notification-message">
              {notificationMessage}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandingSettings;
