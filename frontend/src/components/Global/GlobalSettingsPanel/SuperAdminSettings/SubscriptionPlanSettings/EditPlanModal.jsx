import React, { useState, useEffect } from 'react';
import './EditPlanModal.scss';

const EditPlanModal = ({ isOpen, onClose, onSave, onDelete, planData }) => {
  const [formData, setFormData] = useState({
    planName: '',
    planType: '',
    price: '',
    maxUsers: '',
    features: '',
    description: ''
  });

  // Update form data when planData changes
  useEffect(() => {
    if (planData) {
      setFormData({
        planName: planData.name || '',
        planType: planData.planType || 'Monthly',
        price: planData.price === 'Custom' ? '' : (planData.price || ''),
        maxUsers: planData.maxUsers || '',
        features: Array.isArray(planData.features) ? planData.features.join('\n') : (planData.features || ''),
        description: planData.description || ''
      });
    }
  }, [planData]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPlan = {
      ...planData,
      name: formData.planName,
      planType: formData.planType,
      price: formData.price === '' ? 'Custom' : parseInt(formData.price),
      maxUsers: formData.maxUsers,
      features: formData.features.split('\n').filter(feature => feature.trim() !== ''),
      description: formData.description
    };
    onSave(updatedPlan);
  };

  const handleCancel = () => {
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      onDelete(planData.id);
      onClose();
    }
  };

  if (!isOpen || !planData) return null;

  return (
    <div className="edit-plan-modal-overlay">
      <div className="edit-plan-modal">
        <div className="edit-plan-modal__header">
          <h2 className="edit-plan-modal__title">EDIT PLAN</h2>
        </div>

        <form className="edit-plan-modal__form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Plan Name</label>
            <input
              type="text"
              className="form-input"
              value={formData.planName}
              onChange={(e) => handleInputChange('planName', e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Plan Type</label>
            <select
              className="form-select"
              value={formData.planType}
              onChange={(e) => handleInputChange('planType', e.target.value)}
              required
            >
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Yearly">Yearly</option>
              <option value="2 Years">2 Years</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Price</label>
            <input
              type="text"
              className="form-input"
              value={formData.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
              placeholder="e.g. 499"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Max Users</label>
            <input
              type="number"
              className="form-input"
              value={formData.maxUsers}
              onChange={(e) => handleInputChange('maxUsers', e.target.value)}
              placeholder="e.g. 1000"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Features</label>
            <textarea
              className="form-textarea"
              value={formData.features}
              onChange={(e) => handleInputChange('features', e.target.value)}
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Plan Description</label>
            <textarea
              className="form-textarea"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows="3"
              required
            />
          </div>

          <div className="info-box">
            <div className="info-box__icon">✓</div>
            <div className="info-box__text">
              You can define pricing logic using values like user count, storage, support level, and more.
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

export default EditPlanModal; 