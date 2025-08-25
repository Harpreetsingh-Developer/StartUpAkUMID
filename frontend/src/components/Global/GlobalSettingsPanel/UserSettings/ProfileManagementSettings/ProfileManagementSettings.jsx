import React, { useState } from 'react';
import GlobalLayout from '../../../../../layouts/GlobalLayout/GlobalLayout';
import './ProfileManagementSettings.scss';

const ProfileManagementSettings = () => {
  const [formData, setFormData] = useState({
    startupName: '',
    tagline: '',
    description: '',
    expertise: '',
    estimatedBudget: '$2,000',
    location: '',
    founded: '2022',
    numberOfEmployees: '10'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = () => {
    console.log('Profile data saved:', formData);
    // Here you would typically send the data to your backend
    alert('Profile saved successfully!');
  };

  return (
    <GlobalLayout>
      <div className="profile-management-container">
        <div className="profile-form">
          <h1 className="profile-title">Profile Management</h1>
          
          <div className="form-content">
            {/* Logo Section */}
            <div className="logo-section">
              <div className="logo-placeholder">
                <span>LOGO</span>
              </div>
            </div>

            {/* Main Form Fields */}
            <div className="form-fields">
              {/* Startup Name */}
              <div className="form-group">
                <div className="field-header">
                  <label className="field-label">STARTUP NAME</label>
                  <i className="edit-icon">✏️</i>
                </div>
                <input
                  type="text"
                  name="startupName"
                  value={formData.startupName}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter startup name"
                />
              </div>

              {/* Tagline */}
              <div className="form-group">
                <div className="field-header">
                  <label className="field-label">TAGLINE</label>
                  <i className="edit-icon">✏️</i>
                </div>
                <input
                  type="text"
                  name="tagline"
                  value={formData.tagline}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Tagline"
                />
              </div>

              {/* Description */}
              <div className="form-group">
                <div className="field-header">
                  <label className="field-label">DESCRIPTION</label>
                  <i className="edit-icon">✏️</i>
                </div>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="A brief description of the company"
                  rows="4"
                />
              </div>

              {/* First Row: Expertise, Budget, Location */}
              <div className="form-row">
                <div className="form-group">
                  <div className="field-header">
                    <label className="field-label">EXPERTISE</label>
                    <i className="edit-icon">✏️</i>
                  </div>
                  <input
                    type="text"
                    name="expertise"
                    value={formData.expertise}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Industry"
                  />
                </div>

                <div className="form-group">
                  <div className="field-header">
                    <label className="field-label">ESTIMATED BUDGET</label>
                    <i className="edit-icon">✏️</i>
                  </div>
                  <input
                    type="text"
                    name="estimatedBudget"
                    value={formData.estimatedBudget}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="$2,000"
                  />
                </div>

                <div className="form-group">
                  <div className="field-header">
                    <label className="field-label">LOCATION</label>
                    <i className="edit-icon">✏️</i>
                  </div>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Location"
                  />
                </div>
              </div>

              {/* Second Row: Founded, Number of Employees */}
              <div className="form-row">
                <div className="form-group">
                  <div className="field-header">
                    <label className="field-label">FOUNDED</label>
                    <i className="edit-icon">✏️</i>
                  </div>
                  <input
                    type="text"
                    name="founded"
                    value={formData.founded}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="2022"
                  />
                </div>

                <div className="form-group">
                  <div className="field-header">
                    <label className="field-label">NUMBER OF EMPLOYEES</label>
                    <i className="edit-icon">✏️</i>
                  </div>
                  <div className="select-container">
                    <select
                      name="numberOfEmployees"
                      value={formData.numberOfEmployees}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="1-5">1-5</option>
                      <option value="6-10">6-10</option>
                      <option value="11-25">11-25</option>
                      <option value="26-50">26-50</option>
                      <option value="51-100">51-100</option>
                      <option value="100+">100+</option>
                    </select>
                    <i className="dropdown-icon">▼</i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="form-actions">
            <button onClick={handleSave} className="save-button">
              Save
            </button>
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
};

export default ProfileManagementSettings;
