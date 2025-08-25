import React, { useState } from 'react';
import './CreatePlanModal.scss';

const CreatePlanModal = ({ isOpen, onClose, onCreatePlan }) => {
  const [formData, setFormData] = useState({
    planName: '',
    planType: '',
    price: '',
    maxUsers: '',
    features: '',
    description: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreatePlan(formData);
    setFormData({
      planName: '',
      planType: '',
      price: '',
      maxUsers: '',
      features: '',
      description: ''
    });
  };

  const handleCancel = () => {
    setFormData({
      planName: '',
      planType: '',
      price: '',
      maxUsers: '',
      features: '',
      description: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="create-plan-modal-overlay">
      <div className="create-plan-modal">
        <div className="create-plan-modal__header">
          <h2 className="create-plan-modal__title">CREATE PLAN</h2>
        </div>

        <form className="create-plan-modal__form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Plan Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Pro Starter"
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
              <option value="">Select</option>
              <option value="basic">Basic</option>
              <option value="premium">Premium</option>
              <option value="enterprise">Enterprise</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Price</label>
            <input
              type="number"
              className="form-input"
              placeholder="e.g. 499"
              value={formData.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Max Users</label>
            <input
              type="number"
              className="form-input"
              placeholder="e.g. 50"
              value={formData.maxUsers}
              onChange={(e) => handleInputChange('maxUsers', e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Features</label>
            <textarea
              className="form-textarea"
              placeholder="e.g. Unlimited messages, 24/7 support, Custom branding..."
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
              placeholder="Write a short description for this plan. This will be visible to the users."
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
              className="cancel-button"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="create-plan-button"
            >
              Create Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePlanModal; 