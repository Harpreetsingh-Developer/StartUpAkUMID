import React, { useState } from 'react';
import './AiChatBotSettings.scss';

const AiChatBotSettings = () => {
  const [enableAiChatbot, setEnableAiChatbot] = useState(true);
  const [chatbotAccessibility, setChatbotAccessibility] = useState(true);
  const [allowAttachments, setAllowAttachments] = useState(true);
  const [searchFunctionality, setSearchFunctionality] = useState(true);
  
  // Sub-options for chatbot accessibility
  const [allowForStartups, setAllowForStartups] = useState(true);
  const [allowForMentors, setAllowForMentors] = useState(true);
  const [allowForAdmins, setAllowForAdmins] = useState(true);

  // Notification states
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('success');

  // Function to show notification
  const showNotificationPopup = (message, type = 'success') => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
    
    // Auto hide after 3 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving AI Chatbot settings:', {
      enableAiChatbot,
      chatbotAccessibility,
      allowAttachments,
      searchFunctionality,
      allowForStartups,
      allowForMentors,
      allowForAdmins
    });
    
    // Show success notification
    showNotificationPopup('AI Chatbot settings saved successfully!', 'success');
  };

  const handleReset = () => {
    // Reset to default values
    setEnableAiChatbot(true);
    setChatbotAccessibility(true);
    setAllowAttachments(true);
    setSearchFunctionality(true);
    setAllowForStartups(true);
    setAllowForMentors(true);
    setAllowForAdmins(true);
    
    // Show reset notification
    showNotificationPopup('AI Chatbot settings have been reset to default values.', 'info');
  };

  return (
    <div className="ai-chatbot-settings">
      <div className="settings-grid">
        {/* Enable AI Chatbot */}
        <div className="setting-card">
          <div className="card-header">
            <h3>Enable AI Chatbot</h3>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={enableAiChatbot}
                onChange={(e) => setEnableAiChatbot(e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <p className="description">
            Enable AI Chart integrates AI-driven analytics to visualize startup performance metrics. 
            It generates dynamic charts for project status, resource use, and progress tracking. 
            Accessible via the incubator's platform, it aids data-driven decision-making.
          </p>
        </div>

        {/* Chatbot Accessibility */}
        <div className="setting-card">
          <div className="card-header">
            <h3>Chatbot Accessibility</h3>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={chatbotAccessibility}
                onChange={(e) => setChatbotAccessibility(e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <div className="sub-options">
            <label className="checkbox-option">
              <input
                type="checkbox"
                checked={allowForStartups}
                onChange={(e) => setAllowForStartups(e.target.checked)}
              />
              <span className="checkmark"></span>
              Allow AI Chatbot for Startups
            </label>
            <label className="checkbox-option">
              <input
                type="checkbox"
                checked={allowForMentors}
                onChange={(e) => setAllowForMentors(e.target.checked)}
              />
              <span className="checkmark"></span>
              Allow AI Chatbot for Mentors
            </label>
            <label className="checkbox-option">
              <input
                type="checkbox"
                checked={allowForAdmins}
                onChange={(e) => setAllowForAdmins(e.target.checked)}
              />
              <span className="checkmark"></span>
              Allow AI Chatbot for Admins (IC)
            </label>
          </div>
        </div>

        {/* Allow Attachments */}
        <div className="setting-card">
          <div className="card-header">
            <h3>Allow Attachments</h3>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={allowAttachments}
                onChange={(e) => setAllowAttachments(e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <p className="description">
            This feature enables users to seamlessly share relevant supporting documents, 
            presentations, or visual aids by attaching files (such as PDFs, Word documents, 
            images, etc.) directly within the ongoing chat interface.
          </p>
        </div>

        {/* Search Functionality */}
        <div className="setting-card">
          <div className="card-header">
            <h3>Search Functionality</h3>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={searchFunctionality}
                onChange={(e) => setSearchFunctionality(e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          <p className="description">
            This function allows users to efficiently locate specific past conversations 
            or responses within their AI chatbot interactions. Users can input keywords 
            or phrases to quickly retrieve relevant information from their chat history 
            with the AI.
          </p>
        </div>
      </div>

      <div className="save-button-container">
        <button className="reset-button" onClick={handleReset}>
          Reset
        </button>
        <button className="save-button" onClick={handleSave}>
          Save
        </button>
      </div>

      {/* Notification Popup */}
      {showNotification && (
        <div className={`notification-popup ${notificationType}`}>
          <div className="notification-content">
            <div className="notification-icon">
              {notificationType === 'success' ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
            <div className="notification-message">
              {notificationMessage}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiChatBotSettings;
