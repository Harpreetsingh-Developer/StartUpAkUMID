import React, { useState } from 'react';
import icons from '../../../../../constants/icons';
import './AddIncubationCenterModal.scss';

const AddIncubationCenterModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    centerName: '',
    region: '',
    email: '',
    phone: '',
    plan: '',
    superAdmins: [],
    autoRenewal: false
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      centerName: '',
      region: '',
      email: '',
      phone: '',
      plan: '',
      superAdmins: [],
      autoRenewal: false
    });
  };

  const handleCancel = () => {
    setFormData({
      centerName: '',
      region: '',
      email: '',
      phone: '',
      plan: '',
      superAdmins: [],
      autoRenewal: false
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="add-incubation-center-modal-overlay">
      <div className="add-incubation-center-modal">
        <div className="add-incubation-center-modal__header">
          <h2 className="add-incubation-center-modal__title">ADD INCUBATION CENTER</h2>
          <div className="search-container">
            <img src={icons.SearchIcon} alt="Search" className="search-icon" />
            <input
              type="text"
              placeholder="Search....."
              className="search-input"
            />
          </div>
        </div>

        <form className="add-incubation-center-modal__form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Center Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. IC 1"
                value={formData.centerName}
                onChange={(e) => handleInputChange('centerName', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Region/ City</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. Bengaluru"
                value={formData.region}
                onChange={(e) => handleInputChange('region', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                placeholder="e.g. ic@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone</label>
              <input
                type="tel"
                className="form-input"
                placeholder="e.g. +91....."
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Plan</label>
              <div className="plan-select-container">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Choose Plan"
                  value={formData.plan}
                  onChange={(e) => handleInputChange('plan', e.target.value)}
                  required
                />
                <button type="button" className="select-button">
                  Select
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Assign Super Admin(s)</label>
              <select
                className="form-select"
                value={formData.superAdmins}
                onChange={(e) => handleInputChange('superAdmins', e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="admin1">Admin 1</option>
                <option value="admin2">Admin 2</option>
                <option value="admin3">Admin 3</option>
              </select>
            </div>
          </div>

          <div className="auto-renewal-section">
            <label className="form-label">Auto-Renewal</label>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={formData.autoRenewal}
                onChange={(e) => handleInputChange('autoRenewal', e.target.checked)}
                className="toggle-switch__input"
              />
              <span className={`toggle-switch__slider ${formData.autoRenewal ? 'enabled' : 'disabled'}`}></span>
            </label>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="save-button"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddIncubationCenterModal; 