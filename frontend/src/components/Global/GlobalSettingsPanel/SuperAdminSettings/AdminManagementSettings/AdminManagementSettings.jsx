import React, { useState } from 'react';
import icons from '../../../../../constants/icons';
import AddIncubationCenterModal from './AddIncubationCenterModal';
import EditIncubationCenterModal from './EditIncubationCenterModal';
import './AdminManagementSettings.scss';

const AdminManagementSettings = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    plan: 'All Plans',
    region: 'All Regions',
    status: 'All Status',
    billing: 'All Billing'
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [incubationCenters, setIncubationCenters] = useState([
    {
      id: 'ic1',
      name: 'IC 1',
      plan: 'Pro Plan',
      status: 'Active',
      region: 'Bengaluru',
      phone: '+91 9999999999',
      email: 'ic1@example.com',
      startDate: '1 Jul 2025',
      endDate: '31 Jul 2025',
      billing: 'Monthly',
      autoRenewal: true,
      superAdmins: ['Aaron Patel', 'Priya Gupta']
    },
    {
      id: 'ic2',
      name: 'IC 2',
      plan: 'Starter Plan',
      status: 'Pending',
      region: 'Mumbai',
      phone: '+91 9999999999',
      email: 'ic2@example.com',
      startDate: '1 Jul 2025',
      endDate: '30 Jun 2026',
      billing: 'Yearly',
      autoRenewal: false,
      superAdmins: ['Vijay Shah', 'Priya Gupta']
    },
    {
      id: 'ic3',
      name: 'IC 3',
      plan: 'Free Plan',
      status: 'Inactive',
      region: 'Delhi',
      phone: '+91 9999999999',
      email: 'ic3@example.com',
      startDate: '1 Jul 2025',
      endDate: '-',
      billing: '-',
      autoRenewal: false,
      superAdmins: []
    }
  ]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleAutoRenewalToggle = (centerId) => {
    setIncubationCenters(prev =>
      prev.map(center =>
        center.id === centerId
          ? { ...center, autoRenewal: !center.autoRenewal }
          : center
      )
    );
  };

  const handleRemoveAdmin = (centerId, adminName) => {
    setIncubationCenters(prev =>
      prev.map(center =>
        center.id === centerId
          ? { ...center, superAdmins: center.superAdmins.filter(admin => admin !== adminName) }
          : center
      )
    );
  };

  const handleAssignAdmin = (centerId) => {
    console.log('Assign admin to:', centerId);
    // Handle assign admin functionality
  };

  const handleEditCenter = (centerId) => {
    const center = incubationCenters.find(c => c.id === centerId);
    if (center) {
      setSelectedCenter(center);
      setIsEditModalOpen(true);
    }
  };

  const handleDeleteCenter = (centerId) => {
    if (window.confirm('Are you sure you want to delete this incubation center?')) {
      setIncubationCenters(prev => prev.filter(center => center.id !== centerId));
      console.log('Deleted center:', centerId);
    }
  };

  const handleAddCenter = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedCenter(null);
  };

  const handleSaveNewCenter = (formData) => {
    const newCenter = {
      id: `ic${Date.now()}`,
      name: formData.centerName,
      plan: formData.plan,
      status: 'Active',
      region: formData.region,
      phone: formData.phone,
      email: formData.email,
      startDate: '1 Jul 2025',
      endDate: '31 Jul 2025',
      billing: 'Monthly',
      autoRenewal: formData.autoRenewal,
      superAdmins: formData.superAdmins
    };

    setIncubationCenters(prev => [...prev, newCenter]);
    setIsAddModalOpen(false);
    console.log('Created new center:', newCenter);
  };

  const handleSaveEditedCenter = (updatedCenter) => {
    setIncubationCenters(prev =>
      prev.map(center =>
        center.id === updatedCenter.id ? updatedCenter : center
      )
    );
    setIsEditModalOpen(false);
    setSelectedCenter(null);
    console.log('Updated center:', updatedCenter);
  };

  const handleSave = () => {
    console.log('Saving admin management settings:', incubationCenters);
    // Handle save functionality
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'status-active';
      case 'Pending':
        return 'status-pending';
      case 'Inactive':
        return 'status-inactive';
      default:
        return '';
    }
  };

  const filteredCenters = incubationCenters.filter(center =>
    center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    center.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
    center.superAdmins.some(admin => admin.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="admin-management-settings">
      

      <div className="admin-management-settings__controls">
        <div className="filters-section">
          <select
            className="filter-dropdown"
            value={filters.plan}
            onChange={(e) => handleFilterChange('plan', e.target.value)}
          >
            <option value="All Plans">All Plans</option>
            <option value="Free Plan">Free Plan</option>
            <option value="Starter Plan">Starter Plan</option>
            <option value="Pro Plan">Pro Plan</option>
          </select>

          <select
            className="filter-dropdown"
            value={filters.region}
            onChange={(e) => handleFilterChange('region', e.target.value)}
          >
            <option value="All Regions">All Regions</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
          </select>

          <select
            className="filter-dropdown"
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="All Status">All Status</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Inactive">Inactive</option>
          </select>

          <select
            className="filter-dropdown"
            value={filters.billing}
            onChange={(e) => handleFilterChange('billing', e.target.value)}
          >
            <option value="All Billing">All Billing</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>
        </div>

        <div className="search-section">
          <div className="search-container">
            <img src={icons.SearchIcon} alt="Search" className="search-icon" />
            <input
              type="text"
              placeholder="Search for centers, regions or admin....."
              value={searchQuery}
              onChange={handleSearch}
              className="search-input"
            />
          </div>
        </div>

        <button className="add-center-button" onClick={handleAddCenter}>
          + Add Incubation Center
        </button>
      </div>

      <div className="admin-management-settings__content">
        <div className="centers-grid">
          {filteredCenters.map((center) => (
            <div key={center.id} className="center-card">
              <div className="center-card__header">
                <div className="center-card__title-section">
                  <h3 className="center-card__title">{center.name}</h3>
                  <span className="center-card__plan">{center.plan}</span>
                </div>
                <span className={`center-card__status ${getStatusColor(center.status)}`}>
                  {center.status}
                </span>
              </div>

              <div className="center-card__details">
                <div className="detail-row">
                  <span className="detail-label">Region:</span>
                  <span className="detail-value">{center.region}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Phone:</span>
                  <span className="detail-value">{center.phone}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Start:</span>
                  <span className="detail-value">{center.startDate}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">{center.email}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">End:</span>
                  <span className="detail-value">{center.endDate}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Billing:</span>
                  <span className="detail-value">{center.billing}</span>
                </div>
              </div>

              <div className="center-card__auto-renewal">
                <span className="auto-renewal-label">Auto-Renewal</span>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={center.autoRenewal}
                    onChange={() => handleAutoRenewalToggle(center.id)}
                    className="toggle-switch__input"
                  />
                  <span className={`toggle-switch__slider ${center.autoRenewal ? 'enabled' : 'disabled'}`}></span>
                </label>
              </div>

              <div className="center-card__admins">
                <span className="admins-label">Super Admin(s):</span>
                <div className="admins-tags">
                  {center.superAdmins.length > 0 ? (
                    center.superAdmins.map((admin, index) => (
                      <span key={index} className="admin-tag">
                        {admin}
                        <button
                          className="admin-tag__remove"
                          onClick={() => handleRemoveAdmin(center.id, admin)}
                        >
                          ×
                        </button>
                      </span>
                    ))
                  ) : (
                    <span className="no-admins">None</span>
                  )}
                </div>
              </div>

              <div className="center-card__actions">
                <button
                  className="action-button assign-button"
                  onClick={() => handleAssignAdmin(center.id)}
                >
                  Assign Admin
                </button>
                <button
                  className="action-button edit-button"
                  onClick={() => handleEditCenter(center.id)}
                >
                  Edit
                </button>
                <button
                  className="action-button delete-button"
                  onClick={() => handleDeleteCenter(center.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="admin-management-settings__footer">
        <button className="save-button" onClick={handleSave}>
          Save
        </button>
      </div>

      <AddIncubationCenterModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        onSave={handleSaveNewCenter}
      />

      <EditIncubationCenterModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSave={handleSaveEditedCenter}
        onDelete={handleDeleteCenter}
        centerData={selectedCenter}
      />
    </div>
  );
};

export default AdminManagementSettings;
