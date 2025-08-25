import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './GlobalIncubationHeader.scss';
import GlobalIncubationCards from '../GlobalIncubationCards/GlobalIncubationCards';

const DROPDOWN_OPTIONS = [
  { label: 'Active Incubation Centers', value: 'active' },
  { label: 'Expiring Incubation Centers', value: 'expiring' },
  { label: 'Expired Incubation Centers', value: 'expired' },
  { label: 'All Incubation Centers', value: 'all' }
];

function GlobalIncubationHeader({ data }) {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selected, setSelected] = useState(DROPDOWN_OPTIONS[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // State for view mode: 'grid' or 'list'
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  const filteredData = data
    .filter(item => {
      if (selected.value === 'all') return true;
      return item.planStatus === selected.value;
    })
    .filter(item => {
      const query = searchTerm.toLowerCase();
      return (
        item.name.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        item.expertise.toLowerCase().includes(query) ||
        item.planStatus.toLowerCase().includes(query)
      );
    });

  return (
    <>
      <div className="incubation-header-row">
        <div className="incubation-header-title-dropdown" ref={dropdownRef}>
          <div
            className="incubation-header-title"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {selected.label}{' '}
            <span
              className={`incubation-header-dropdown-arrow${dropdownOpen ? ' rotated' : ''}`}
              style={{
                display: 'inline-block',
                transition: 'transform 0.3s',
                transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            >
              ▼
            </span>
          </div>
          {dropdownOpen && (
            <div className="incubation-header-dropdown-menu">
              {DROPDOWN_OPTIONS.map(option => (
                <div
                  key={option.value}
                  className={`incubation-header-dropdown-item${
                    selected.value === option.value ? ' selected' : ''
                  }`}
                  onClick={() => {
                    setSelected(option);
                    setDropdownOpen(false);
                  }}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="incubation-header-btn-container" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginLeft: "30px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* Buttons to toggle view mode */}
            <button
              className={`incubation-header-view-btn ${viewMode === 'grid' ? 'selected' : ''}`}
              onClick={() => setViewMode('grid')}
              style={{ marginLeft: '10px' }}
            >
              Grid View
            </button>
            <button
              className={`incubation-header-view-btn ${viewMode === 'list' ? 'selected' : ''}`}
              onClick={() => setViewMode('list')}
              style={{ marginLeft: '10px' }}
            >
              List View
            </button>
            <button
              className="incubation-header-btn incubation-header-btn--chat"
              onClick={() => {
                // You can implement AI Chat Bot modal or navigation here
                alert("AI Chat Bot coming soon!");
              }}
              style={{ marginLeft: '10px' }}
            >
              AI Chat Bot
            </button>
            <button
              className="incubation-header-btn incubation-header-btn--onboarding"
              onClick={() => {
                // Navigate to onboarding page
                navigate('/global/incubations/onboard');
              }}
              style={{ marginLeft: '10px' }}
            >
              On Boarding
            </button>
          </div>
        </div>
        <div className="sub-heading"><h1>Here you can find all the campus</h1></div>
        <div className="incubation-header-searchbar-container">
          <input
            type="text"
            placeholder="Search by name, location, or expertise..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>
      {/* Apply view mode class to the cards wrapper */}
      <div className={`incubation-cards-wrapper ${viewMode === 'list' ? 'list-view' : 'grid-view'}`}>
        {filteredData.length > 0 ? (
          filteredData.map((item, idx) => (
            <GlobalIncubationCards key={idx} {...item} viewMode={viewMode} />
          ))
        ) : (
          <p className="no-results">No matching incubation centers found.</p>
        )}
      </div>
    </>
  );
}

export default GlobalIncubationHeader;