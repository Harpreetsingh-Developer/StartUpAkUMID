

import React, { useState, useEffect } from 'react';
import './AddStartupSettings.scss';


import userIcon from '/src/assets/icons/Person.png';
import checkIcon from '/src/assets/icons/Checkmark.png';
import calendarIcon from '/src/assets/icons/Calendar.png';

const getStatusDotClass = (status) => {
  if (status === 'active') return 'status-dot active';
  if (status === 'pending') return 'status-dot pending';
  if (status === 'inactive') return 'status-dot inactive';
  return 'status-dot';
};

const StartupCard = ({ startup, onModify, onDelete }) => (
  <div className="startup-card">
    <div className="card-header">
      <h3 className="startup-name">{startup.name}</h3>
      <div className="status-indicator">
        <span className={getStatusDotClass(startup.status)}></span>
        <span className="status-text">{startup.status}</span>
      </div>
    </div>
    <div className="expertise-tag">
      <span>{startup.expertise}</span>
    </div>
    <div className="details-row">
      <div className="detail-item" title="Members">
        <img src={userIcon} alt="Members" className="icon" />
        <span>{startup.members}</span>
      </div>
      <div className="detail-item" title="Progress">
        <img src={checkIcon} alt="Progress" className="icon" />
        <span>{startup.progress}</span>
      </div>
      <div className="detail-item" title="Date">
        <img src={calendarIcon} alt="Date" className="icon" />
        <span>{startup.date}</span>
      </div>
    </div>
    <div className="card-actions">
      <button className="modify-btn" onClick={() => onModify(startup.id)}>
        Modify
      </button>
      <button className="delete-btn" onClick={() => onDelete(startup.id)}>
        Delete
      </button>
    </div>
  </div>
);

const SearchBar = ({ onSearch, onAdd }) => (
  <div className="search-bar">
    <input
      type="text"
      placeholder="Search for startups..."
      onChange={(e) => onSearch(e.target.value)}
    />
    <button className="add-btn" onClick={onAdd}>
      + Add Startup
    </button>
  </div>
);

const AddStartupSettings = () => {
  const [startups, setStartups] = useState([
    {
      id: 1,
      name: 'STARTUP #1',
      expertise: 'Web Development',
      members: 90,
      progress: '0/2',
      date: '13th July 2025',
      status: 'active',
    },
    {
      id: 2,
      name: 'STARTUP #2',
      expertise: 'Mobile Apps',
      members: 85,
      progress: '1/2',
      date: '10th August 2025',
      status: 'active',
    },
    {
      id: 3,
      name: 'STARTUP #3',
      expertise: 'AI/ML Solutions',
      members: 70,
      progress: '0/1',
      date: '5th September 2025',
      status: 'pending',
    },
    {
      id: 4,
      name: 'STARTUP #4',
      expertise: 'FinTech',
      members: 110,
      progress: '2/2',
      date: '20th July 2025',
      status: 'pending',
    },
    {
      id: 5,
      name: 'STARTUP #5',
      expertise: 'E-commerce',
      members: 60,
      progress: '0/1',
      date: '1st August 2025',
      status: 'active',
    },
    {
      id: 6,
      name: 'STARTUP #6',
      expertise: 'BioTech',
      members: 150,
      progress: '0/3',
      date: '15th July 2025',
      status: 'inactive',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStartups, setFilteredStartups] = useState(startups);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStartup, setCurrentStartup] = useState(null);

  useEffect(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = startups.filter(
      (startup) =>
        startup.name.toLowerCase().includes(lowercasedSearchTerm) ||
        startup.expertise.toLowerCase().includes(lowercasedSearchTerm) ||
        startup.date.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredStartups(filtered);
  }, [startups, searchTerm]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleAddStartup = () => {
    const newId = startups.length > 0 ? Math.max(...startups.map((s) => s.id)) + 1 : 1;
    const newStartup = {
      id: newId,
      name: `NEW STARTUP #${newId}`,
      expertise: 'New Sector',
      members: 50,
      progress: '0/0',
      date: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      status: 'pending',
    };
    setStartups((prevStartups) => [...prevStartups, newStartup]);
    alert(`Added ${newStartup.name}!`);
  };

  const handleModifyStartup = (id) => {
    const startupToEdit = startups.find((startup) => startup.id === id);
    if (startupToEdit) {
      setCurrentStartup({ ...startupToEdit });
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentStartup(null);
  };

  const handleModalInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentStartup((prev) => ({
      ...prev,
      [name]: name === 'members' ? parseInt(value) || 0 : value,
    }));
  };

  const handleSaveModifiedStartup = (e) => {
    e.preventDefault();
    if (currentStartup) {
      setStartups((prevStartups) =>
        prevStartups.map((startup) =>
          startup.id === currentStartup.id ? { ...currentStartup } : startup
        )
      );
      alert(`Startup "${currentStartup.name}" updated successfully!`);
      handleCloseModal();
    }
  };

  const handleDeleteStartup = (id) => {
    if (window.confirm(`Are you sure you want to delete Startup with ID: ${id}?`)) {
      setStartups((prevStartups) => prevStartups.filter((startup) => startup.id !== id));
      alert(`Deleted Startup with ID: ${id}`);
    }
  };

  return (
    <div className="add-startup-settings">
      <div className="header-section">
        <h1>Startup Management</h1>
        <SearchBar onSearch={handleSearch} onAdd={handleAddStartup} />
      </div>

      <div className="startup-grid">
        {filteredStartups.length > 0 ? (
          filteredStartups.map((startup) => (
            <StartupCard
              key={startup.id}
              startup={startup}
              onModify={handleModifyStartup}
              onDelete={handleDeleteStartup}
            />
          ))
        ) : (
          <p className="no-startups-found">No startups found matching your search.</p>
        )}
      </div>

      {/* Modification Modal */}
      {isModalOpen && currentStartup && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">Modify Startup: {currentStartup.name}</h2>
            <form onSubmit={handleSaveModifiedStartup}>
              <div className="form-group">
                <label htmlFor="name">Startup Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={currentStartup.name}
                  onChange={handleModalInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="expertise">Expertise</label>
                <input
                  type="text"
                  id="expertise"
                  name="expertise"
                  value={currentStartup.expertise}
                  onChange={handleModalInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="members">Members</label>
                <input
                  type="number"
                  id="members"
                  name="members"
                  value={currentStartup.members}
                  onChange={handleModalInputChange}
                  min="0"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="progress">Progress</label>
                <input
                  type="text"
                  id="progress"
                  name="progress"
                  value={currentStartup.progress}
                  onChange={handleModalInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  type="text"
                  id="date"
                  name="date"
                  value={currentStartup.date}
                  onChange={handleModalInputChange}
                  placeholder="e.g., 1st Jan 2026"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={currentStartup.status}
                  onChange={handleModalInputChange}
                  required
                >
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="submit" className="save-button">
                  Save Changes
                </button>
                <button type="button" onClick={handleCloseModal} className="cancel-button">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddStartupSettings;