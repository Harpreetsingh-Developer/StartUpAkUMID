import React, { useState, useEffect } from 'react';
import icons from '../../../../../constants/icons';
import './EditIncubationCenterModal.scss';

const EditIncubationCenterModal = ({ isOpen, onClose, onSave, onDelete, centerData }) => {
  const [formData, setFormData] = useState({
    centerName: '',
    region: '',
    email: '',
    phone: '',
    plan: '',
    status: '',
    superAdmins: [],
    autoRenewal: false
  });

  // Update form data when centerData changes
  useEffect(() => {
    if (centerData) {
      setFormData({
        centerName: centerData.name || '',
        region: centerData.region || '',
        email: centerData.email || '',
        phone: centerData.phone || '',
        plan: centerData.plan || '',
        status: centerData.status || '',
        superAdmins: centerData.superAdmins || [],
        autoRenewal: centerData.autoRenewal || false
      });
    }
  }, [centerData]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedCenter = {
      ...centerData,
      name: formData.centerName,
      region: formData.region,
      email: formData.email,
      phone: formData.phone,
      plan: formData.plan,
      status: formData.status,
      superAdmins: formData.superAdmins,
      autoRenewal: formData.autoRenewal
    };
    onSave(updatedCenter);
  };

  const handleCancel = () => {
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this incubation center?')) {
      onDelete(centerData.id);
      onClose();
    }
  };

  if (!isOpen || !centerData) return null;

  return (
    <div className="edit-incubation-center-modal-overlay">
      <div className="edit-incubation-center-modal">
        <div className="edit-incubation-center-modal__header">
          <h2 className="edit-incubation-center-modal__title">EDIT INCUBATION CENTER</h2>
          <div className="search-container">
            <img src={icons.SearchIcon} alt="Search" className="search-icon" />
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
            />
          </div>
        </div>

        <form className="edit-incubation-center-modal__form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Center Name</label>
              <input
                type="text"
                className="form-input"
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
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                required
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Inactive">Inactive</option>
              </select>
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
                <option value="admin1">Aarav Patel, Priya...</option>
                <option value="admin2">Admin 2</option>
                <option value="admin3">Admin 3</option>
              </select>
            </div>

            <div className="form-group">
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
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="delete-button"
              onClick={handleDelete}
            >
              Delete
            </button>
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

export default EditIncubationCenterModal; 