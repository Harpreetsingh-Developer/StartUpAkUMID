import React from 'react';
import './CustomPopup.scss';

const CustomPopup = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  type = 'info',
  showCloseButton = true,
  size = 'medium' 
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getPopupClass = () => {
    let baseClass = 'custom-popup';
    if (type) baseClass += ` custom-popup--${type}`;
    if (size) baseClass += ` custom-popup--${size}`;
    return baseClass;
  };

  return (
    <div className="custom-popup-overlay" onClick={handleBackdropClick}>
      <div className={getPopupClass()}>
        <div className="custom-popup__header">
          <h3 className="custom-popup__title">{title}</h3>
          {showCloseButton && (
            <button 
              className="custom-popup__close-btn"
              onClick={onClose}
              aria-label="Close popup"
            >
              ×
            </button>
          )}
        </div>
        <div className="custom-popup__content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CustomPopup;
