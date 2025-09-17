import React, { useState, useRef, useEffect } from "react";
import "./AdminProfile.scss";

const AdminProfile = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [showActionsDropdown, setShowActionsDropdown] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: "Veer Sankara", role: "Lead App Developer", avatar: "https://via.placeholder.com/40" },
    { id: 2, name: "Dhanushanth", role: "Front-end Developer", avatar: "https://via.placeholder.com/40" },
    { id: 3, name: "Bose Chandrananth", role: "Developer", avatar: "https://via.placeholder.com/40" },
    { id: 4, name: "John Doe", role: "QA Engineer", avatar: "https://via.placeholder.com/40" },
    { id: 5, name: "Jane Smith", role: "Designer", avatar: "https://via.placeholder.com/40" },
  ]);
  const [showViewAll, setShowViewAll] = useState(false);
  const [showPraiseModal, setShowPraiseModal] = useState(false);
  const [showPraiseDetailModal, setShowPraiseDetailModal] = useState(false);
  const [selectedPraiseType, setSelectedPraiseType] = useState("");
  const [newPraiseType, setNewPraiseType] = useState("");
  const [newPraiseDescription, setNewPraiseDescription] = useState("");
  const [selectedPraise, setSelectedPraise] = useState(null);
  const [praises, setPraises] = useState([
    { type: "Touch Garden Medal", icon: "heart", description: "Awarded for fostering a supportive and positive team environment." },
    { type: "Puzzle Solver Medal", icon: "star", description: "Recognizes exceptional problem-solving and innovative thinking." },
    { type: "Hentry Maker Medal", icon: "gem", description: "Honors the creation of valuable and high-quality work." },
  ]);
  const [userData, setUserData] = useState({
    name: "Hardeep Kumar",
    designation: "Full Stack Developer",
    email: "xyz@solutions.gmail.com",
    phone: "+91 92737447193",
    meta: {
      designation: "Lead Engineer",
      department: "Engineering",
      reportingTo: "Veer Sankara John",
      employeeNo: "5552277",
    },
  });
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [isDeactivated, setIsDeactivated] = useState(false);
  const [goalsProgress, setGoalsProgress] = useState(32);
  const [goalsMax, setGoalsMax] = useState(40);
  const [showGoalsModal, setShowGoalsModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupTitle, setPopupTitle] = useState("");
  const [popupAction, setPopupAction] = useState(null);

  const dropdownRef = useRef(null);
  const tabRefs = useRef([]);
  const indicatorRef = useRef(null);

  const tabs = ["About", "Job", "Time", "Finances", "Docs", "Goals", "Reviews", "Onboarding"];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowActionsDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const activeIndex = tabs.findIndex((tab) => tab.toLowerCase() === activeTab);
    if (tabRefs.current[activeIndex] && indicatorRef.current) {
      const tabEl = tabRefs.current[activeIndex];
      const left = tabEl.offsetLeft + tabEl.offsetWidth / 2 - 10;
      indicatorRef.current.style.left = `${left}px`;
    }
  }, [activeTab]);

  // Event handlers
  const handleTabClick = (tab) => {
    setActiveTab(tab.toLowerCase());
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(userData.phone);
    alert("Phone number copied to clipboard!");
  };

  const handleProfilePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) setProfilePhoto(URL.createObjectURL(file));
  };

  const handleTeamAvatarChange = (id, event) => {
    const file = event.target.files[0];
    if (file) {
      const updatedTeam = teamMembers.map((member) =>
        member.id === id ? { ...member, avatar: URL.createObjectURL(file) } : member
      );
      setTeamMembers(updatedTeam);
    }
  };

  const handleViewProfile = () => {
    setShowActionsDropdown(false);
    setShowViewModal(true);
  };

  const handleEditProfile = () => {
    setShowActionsDropdown(false);
    setEditedData({ ...userData, meta: { ...userData.meta } });
    setShowEditModal(true);
  };

  const handleDeactivateUser = () => {
    setShowActionsDropdown(false);
    setPopupTitle("Confirm Deactivation");
    setPopupMessage("Are you sure you want to deactivate this user?");
    setPopupAction(() => confirmDeactivate);
    setShowPopup(true);
  };

  const confirmDeactivate = () => {
    setIsDeactivated(true);
    setShowPopup(false);
  };

  const handleSaveEdit = () => {
    setUserData(editedData);
    setShowEditModal(false);
    setPopupTitle("Success");
    setPopupMessage("Profile updated successfully!");
    setPopupAction(() => () => setShowPopup(false));
    setShowPopup(true);
  };

  const handleGivePraise = (praise = null) => {
    setSelectedPraiseType(praise?.type || "");
    setNewPraiseType("");
    setNewPraiseDescription(praise?.description || "");
    setSelectedPraise(praise);
    setShowPraiseModal(true);
  };

  const handleSubmitPraise = () => {
    const finalPraiseType = newPraiseType.trim() || selectedPraiseType.trim();
    const finalDescription = newPraiseDescription.trim() || "";
    if (finalPraiseType) {
      const iconMap = {
        "Touch Garden Medal": "heart",
        "Puzzle Solver Medal": "star",
        "Hentry Maker Medal": "gem",
      };
      const newIcon = iconMap[finalPraiseType] || "star";
      setPraises([...praises, { type: finalPraiseType, icon: newIcon, description: finalDescription }]);
      setSelectedPraiseType("");
      setNewPraiseType("");
      setNewPraiseDescription("");
      setShowPraiseModal(false);
      setPopupTitle("Success");
      setPopupMessage(`Praise "${finalPraiseType}" created successfully!`);
      setPopupAction(() => () => setShowPopup(false));
      setShowPopup(true);
    } else {
      alert("Please enter or select a praise type.");
    }
  };

  const handlePraiseTypeChange = (e) => {
    const value = e.target.value;
    setSelectedPraiseType(value);
    if (value !== "new") {
      setNewPraiseType("");
      const praise = praises.find((p) => p.type === value);
      setNewPraiseDescription(praise?.description || "");
    }
  };

  const handleNewPraiseTypeChange = (e) => {
    setNewPraiseType(e.target.value);
  };

  const handleNewPraiseDescriptionChange = (e) => {
    setNewPraiseDescription(e.target.value);
  };

  const handleUpdateGoals = () => {
    setEditedData({ progress: goalsProgress, max: goalsMax });
    setShowGoalsModal(true);
  };

  const handleSaveGoals = () => {
    if (editedData.progress >= 0 && editedData.max > 0 && editedData.progress <= editedData.max) {
      setGoalsProgress(editedData.progress);
      setGoalsMax(editedData.max);
      setShowGoalsModal(false);
      setPopupTitle("Success");
      setPopupMessage("Goals updated successfully!");
      setPopupAction(() => () => setShowPopup(false));
      setShowPopup(true);
    } else {
      alert("Please enter valid progress and max values (progress ≤ max).");
    }
  };

  const getIcon = (key) => {
    const icons = {
      heart: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#2563eb"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      ),
      star: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#2563eb"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
      gem: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#2563eb"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 3v6l2 2-2 2v6l2 2 2-2 2 2h2l2-2 2 2-2-2 2-2 2 2V9l-2-2 2-2V3l-2-2-2 2-2-2h-2l-2 2-2-2-2 2Z" />
        </svg>
      ),
    };
    return icons[key] || null;
  };

  const renderTabContent = () => {
    if (activeTab === "about") {
      return (
        <>
          <div className="left-panel">
            <div className="about-card">
              <h3>About</h3>
              <p>
                Resourceful software developer with expertise in web and mobile applications. Passionate about designing scalable solutions and optimizing performance. A strong believer in clean code practices.
              </p>
              <h4>Why I Love My Job :)</h4>
              <p>
                I thrive on solving problems and creating impactful solutions. Collaborating with a dynamic team and exploring new technologies keeps me motivated daily.
              </p>
            </div>
            <div className="timeline-card">
              <h3>Timeline</h3>
              <ul className="timeline-list">
                <li>
                  <div className="icon-wrapper">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#2563eb" 
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 21v-8a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2Z" />
                      <path d="M7 11.75c-.88-.43-2.6-.96-3.83-2.88a1.27 1.27 0 0 1 1.76-1.76c2.92 2.37 4.13 .78 6.09-.96" />
                      <path d="M15.5 13.5c-.8-.88-2.61-2.1-3.69-4.2a1.27 1.27 0 0 1 1.76-1.76c2.45 2.58 4.2 .98 5.73-1.6" />
                      <path d="M2.5 18H22" />
                    </svg>
                  </div>
                  <div className="timeline-content">
                    <h4>Work Anniversary - 3 Years</h4>
                    <span>Jan 31, 2025</span>
                  </div>
                </li>
                <li>
                  <div className="icon-wrapper">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#2563eb" 
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                      <polyline points="16 7 22 7 22 13" />
                    </svg>
                  </div>
                  <div className="timeline-content">
                    <h4>Pay Increase</h4>
                    <span>Feb 20, 2025</span>
                  </div>
                </li>
                <li>
                  <div className="icon-wrapper">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#2563eb" // Explicitly set color
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18.75 3a.75.75 0 0 0-.75.75V8a.75.75 0 0 0 1.5 0V3.75a.75.75 0 0 0-.75-.75Z" />
                      <path d="M12.75 3a.75.75 0 0 0-.75.75V8a.75.75 0 0 0 1.5 0V3.75a.75.75 0 0 0-.75-.75Z" />
                      <path d="M6.75 3a.75.75 0 0 0-.75.75V8a.75.75 0 0 0 1.5 0V3.75a.75.75 0 0 0-.75-.75Z" />
                      <circle cx="12" cy="18" r="6" />
                      <path d="M12 18V9" />
                    </svg>
                  </div>
                  <div className="timeline-content">
                    <h4>Praise - Superstar Worker</h4>
                    <span>Jan 23, 2025</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="right-panel">
            <div className="team-card">
              <div className="card-header">
                <h3>Reporting Team</h3>
                <button className="view-all-btn" onClick={() => setShowViewAll(!showViewAll)}>
                  {showViewAll ? "Show Less" : "View All"}
                </button>
              </div>
              <ul className={`team-list ${showViewAll ? "view-all-mode" : ""}`}>
                {teamMembers.slice(0, showViewAll ? teamMembers.length : 3).map((member) => (
                  <li key={member.id}>
                    <div
                      className="team-member-avatar"
                      onClick={() => document.getElementById(`team-avatar-${member.id}`).click()}
                    >
                      <img src={member.avatar} alt={member.name} />
                      <input
                        type="file"
                        id={`team-avatar-${member.id}`}
                        style={{ display: "none" }}
                        onChange={(e) => handleTeamAvatarChange(member.id, e)}
                        accept="image/*"
                      />
                    </div>
                    <div className="team-member-details">
                      <span className="name">{member.name}</span>
                      <span className="role">{member.role}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="praise-card">
              <div className="card-header">
                <h3>Praise</h3>
                <button className="give-praise-btn" onClick={handleGivePraise}>
                  + Give Praise
                </button>
              </div>
              <div className="praise-list">
                {praises.map((praise, index) => (
                  <div key={index} className="praise-item" onClick={() => { setSelectedPraise(praise); setShowPraiseDetailModal(true); }}>
                    <div className="praise-icon">{getIcon(praise.icon)}</div>
                    <div className="praise-details">
                      <span className="praise-type">{praise.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="goals-card">
              <div className="card-header">
                <h3>Goals</h3>
                <button className="update-goals-btn" onClick={handleUpdateGoals}>
                  Update Goals
                </button>
              </div>
              <div className="goals-content">
                <div className="goals-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 3v18h18" />
                    <path d="m18 10-5 5-4-4-3 3" />
                  </svg>
                </div>
                <div className="goals-details">
                  <p className="goals-text">Digital Transformation of All Boarding Process</p>
                  <span className="goals-status">In Progress</span>
                </div>
                <div className="goals-progress-info">
                  <span className="goals-count">{goalsProgress}/{goalsMax}</span>
                  <span className="goals-percentage">
                    ↑ {(goalsProgress / goalsMax * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
              <progress value={goalsProgress} max={goalsMax}></progress>
            </div>
          </div>
        </>
      );
    }
    return <div className="placeholder-content">Content for {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} is coming soon...</div>;
  };

  return (
    <div className="profile-container">
      {isDeactivated ? (
        <div className="deactivated-message">This user has been deactivated.</div>
      ) : (
        <>
          <div className="profile-header">
            <div className="profile-info">
              <div className="avatar-container" onClick={() => document.getElementById("profilePhotoInput").click()}>
                <div className="avatar-placeholder">
                  {profilePhoto ? (
                    <img src={profilePhoto} alt="Profile" className="profile-photo" />
                  ) : (
                    <span className="initials">HK</span>
                  )}
                </div>
                <input
                  type="file"
                  id="profilePhotoInput"
                  style={{ display: "none" }}
                  onChange={handleProfilePhotoChange}
                  accept="image/*"
                />
              </div>
              <div className="contact-details">
                <h2>{userData.name}</h2>
                <p className="designation">{userData.designation}</p>
                <div className="contact-links">
                  <span className="contact-item">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <a href={`mailto:${userData.email}`}>{userData.email}</a>
                  </span>
                  <span className="contact-item">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2.02 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <a href={`tel:${userData.phone}`} onClick={handleCopyPhone}>
                      {userData.phone}
                    </a>
                  </span>
                </div>
              </div>
            </div>
            <div className="profile-meta">
              <div>
                <strong>Designation</strong>
                <p>{userData.meta.designation}</p>
              </div>
              <div>
                <strong>Department</strong>
                <p>{userData.meta.department}</p>
              </div>
              <div>
                <strong>Reporting To</strong>
                <p>{userData.meta.reportingTo}</p>
              </div>
              <div>
                <strong>Employee No</strong>
                <p>{userData.meta.employeeNo}</p>
              </div>
            </div>
            <div className="profile-actions" ref={dropdownRef}>
              <button className="active-btn" onClick={() => setShowActionsDropdown(!showActionsDropdown)}>
                Actions
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {showActionsDropdown && (
                <div className="actions-dropdown">
                  <ul>
                    <li onClick={handleViewProfile}>View Profile</li>
                    <li onClick={handleEditProfile}>Edit Profile</li>
                    <li onClick={handleDeactivateUser}>Deactivate User</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="profile-tabs">
            {tabs.map((tab, index) => (
              <button
                key={tab}
                ref={(el) => (tabRefs.current[index] = el)}
                className={`tab-button ${activeTab === tab.toLowerCase() ? "active" : ""}`}
                onClick={() => handleTabClick(tab)}
              >
                {tab}
              </button>
            ))}
            <div className="active-tab-indicator-wrapper">
              <div className="active-tab-indicator" ref={indicatorRef}></div>
            </div>
          </div>
          <div className="profile-body">{renderTabContent()}</div>
        </>
      )}

      {showPraiseModal && (
        <div className="modal-overlay" onClick={() => setShowPraiseModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Give Praise</h3>
            <label>
              Praise Type:
              <select
                value={selectedPraiseType}
                onChange={handlePraiseTypeChange}
                style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
              >
                <option value="">-- Select or Enter New Praise Type --</option>
                {praises.map((praise, index) => (
                  <option key={index} value={praise.type}>
                    {praise.type}
                  </option>
                ))}
                <option value="new">Create New Praise Type</option>
              </select>
              {selectedPraiseType === "new" && (
                <input
                  type="text"
                  placeholder="Enter new praise type"
                  value={newPraiseType}
                  onChange={handleNewPraiseTypeChange}
                  style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
                />
              )}
            </label>
            {selectedPraiseType === "new" && (
              <label>
                Description:
                <textarea
                  placeholder="Enter description for the praise type"
                  value={newPraiseDescription}
                  onChange={handleNewPraiseDescriptionChange}
                  rows={2}
                  style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
                />
              </label>
            )}
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowPraiseModal(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleSubmitPraise}>
                Submit Praise
              </button>
            </div>
          </div>
        </div>
      )}

      {showPraiseDetailModal && selectedPraise && (
        <div className="modal-overlay" onClick={() => setShowPraiseDetailModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedPraise.type}</h3>
            <p>{selectedPraise.description}</p>
            <div className="modal-actions">
              <button className="btn-primary" onClick={() => setShowPraiseDetailModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showViewModal && (
        <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
          <div className="modal-view-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>View Profile</h3>
              <button className="close-btn" onClick={() => setShowViewModal(false)}>
                ×
              </button>
            </div>
            <div className="modal-section">
              <h4>Personal Information</h4>
              <p>
                <strong>Name:</strong> {userData.name}
              </p>
              <p>
                <strong>Designation:</strong> {userData.designation}
              </p>
              <p>
                <strong>Email:</strong> {userData.email}
              </p>
              <p>
                <strong>Phone:</strong> {userData.phone}
              </p>
            </div>
            <div className="modal-section">
              <h4>Meta Information</h4>
              <p>
                <strong>Designation:</strong> {userData.meta.designation}
              </p>
              <p>
                <strong>Department:</strong> {userData.meta.department}
              </p>
              <p>
                <strong>Reporting To:</strong> {userData.meta.reportingTo}
              </p>
              <p>
                <strong>Employee No:</strong> {userData.meta.employeeNo}
              </p>
            </div>
            <div className="modal-actions">
              <button className="btn-primary" onClick={() => setShowViewModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Edit Profile</h3>
            <label>
              Name:
              <input
                value={editedData.name || ""}
                onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
              />
            </label>
            <label>
              Designation:
              <input
                value={editedData.designation || ""}
                onChange={(e) => setEditedData({ ...editedData, designation: e.target.value })}
              />
            </label>
            <label>
              Email:
              <input
                value={editedData.email || ""}
                onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
              />
            </label>
            <label>
              Phone:
              <input
                value={editedData.phone || ""}
                onChange={(e) => setEditedData({ ...editedData, phone: e.target.value })}
              />
            </label>
            <h4>Meta</h4>
            <label>
              Designation:
              <input
                value={editedData.meta?.designation || ""}
                onChange={(e) =>
                  setEditedData({
                    ...editedData,
                    meta: { ...editedData.meta, designation: e.target.value },
                  })
                }
              />
            </label>
            <label>
              Department:
              <input
                value={editedData.meta?.department || ""}
                onChange={(e) =>
                  setEditedData({
                    ...editedData,
                    meta: { ...editedData.meta, department: e.target.value },
                  })
                }
              />
            </label>
            <label>
              Reporting To:
              <input
                value={editedData.meta?.reportingTo || ""}
                onChange={(e) =>
                  setEditedData({
                    ...editedData,
                    meta: { ...editedData.meta, reportingTo: e.target.value },
                  })
                }
              />
            </label>
            <label>
              Employee No:
              <input
                value={editedData.meta?.employeeNo || ""}
                onChange={(e) =>
                  setEditedData({
                    ...editedData,
                    meta: { ...editedData.meta, employeeNo: e.target.value },
                  })
                }
              />
            </label>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowEditModal(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleSaveEdit}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeactivateModal && (
        <div className="modal-overlay" onClick={() => setShowDeactivateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Confirm Deactivation</h3>
            <p>Are you sure you want to deactivate this user?</p>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowDeactivateModal(false)}>
                No
              </button>
              <button className="btn-primary" onClick={confirmDeactivate}>
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {showGoalsModal && (
        <div className="modal-overlay" onClick={() => setShowGoalsModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Update Goals</h3>
            <label>
              Current Progress:
              <input
                type="number"
                min="0"
                value={editedData.progress || goalsProgress}
                onChange={(e) =>
                  setEditedData({ ...editedData, progress: parseInt(e.target.value) || 0 })
                }
              />
            </label>
            <label>
              Max:
              <input
                type="number"
                min="1"
                value={editedData.max || goalsMax}
                onChange={(e) => setEditedData({ ...editedData, max: parseInt(e.target.value) || 1 })}
              />
            </label>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowGoalsModal(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleSaveGoals}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showPopup && (
        <div className="modal-overlay" onClick={() => setShowPopup(false)}>
          <div className="modal-content popup" onClick={(e) => e.stopPropagation()}>
            <h3>{popupTitle}</h3>
            <p>{popupMessage}</p>
            <div className="modal-actions">
              <button className="btn-primary" onClick={() => {
                if (popupAction) popupAction();
                setShowPopup(false);
              }}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;