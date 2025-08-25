import React, { useState } from 'react';
import './ChatLogsandArchiving.scss';

const ChatLogsandArchiving = () => {
  const [showArchived, setShowArchived] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('success');

  // Sample conversation data with archive status
  const [conversations, setConversations] = useState([
    {
      id: 1,
      type: 'B/w IC1 and Mentor',
      dateTime: '17/04/2022 9:14 PM',
      isArchived: false
    },
    {
      id: 2,
      type: 'B/w Mentor and Startup',
      dateTime: '17/04/2022 9:14 PM',
      isArchived: false
    },
    {
      id: 3,
      type: 'B/w SuperAdmin and IC2',
      dateTime: '17/04/2022 9:14 PM',
      isArchived: false
    },
    {
      id: 4,
      type: 'B/w IC1 and Mentor',
      dateTime: '17/04/2022 9:14 PM',
      isArchived: false
    },
    {
      id: 5,
      type: 'B/w Mentor and Startup',
      dateTime: '17/04/2022 9:14 PM',
      isArchived: false
    }
  ]);

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

  const handleArchive = (id) => {
    setConversations(prevConversations => 
      prevConversations.map(conv => 
        conv.id === id ? { ...conv, isArchived: true } : conv
      )
    );
    showNotificationPopup('Conversation archived successfully!', 'success');
  };

  const handleUnarchive = (id) => {
    setConversations(prevConversations => 
      prevConversations.map(conv => 
        conv.id === id ? { ...conv, isArchived: false } : conv
      )
    );
    showNotificationPopup('Conversation unarchived successfully!', 'success');
  };

  const handleDelete = (id) => {
    setConversations(prevConversations => 
      prevConversations.filter(conv => conv.id !== id)
    );
    showNotificationPopup('Conversation deleted successfully!', 'success');
  };

  const handleShowArchived = () => {
    setShowArchived(!showArchived);
  };

  const handleBackToMain = () => {
    setShowArchived(false);
  };

  // Filter conversations based on current view
  const activeConversations = conversations.filter(conv => !conv.isArchived);
  const archivedConversations = conversations.filter(conv => conv.isArchived);

  const currentConversations = showArchived ? archivedConversations : activeConversations;

  return (
    <div className="chat-logs-archiving">
      {/* Header Section */}
      <div className="section-header">
        <h2 className="section-title">
          {showArchived ? 'Archived Conversations' : 'Active Conversations'}
        </h2>
        {showArchived && (
          <button 
            className="back-button"
            onClick={handleBackToMain}
          >
            ← Back to Active
          </button>
        )}
      </div>

      <div className="logs-container">
        {/* Table Header */}
        <div className="table-header">
          <div className="header-cell conversation-type">Conversation Type</div>
          <div className="header-cell date-time">Date and Time</div>
          <div className="header-cell actions">Actions</div>
        </div>

        {/* Table Body */}
        <div className="table-body">
          {currentConversations.length > 0 ? (
            currentConversations.map((conversation) => (
              <div key={conversation.id} className="table-row">
                <div className="cell conversation-type">
                  {conversation.type}
                </div>
                <div className="cell date-time">
                  {conversation.dateTime}
                </div>
                <div className="cell actions">
                  {showArchived ? (
                    <button 
                      className="action-button unarchive-button"
                      onClick={() => handleUnarchive(conversation.id)}
                    >
                      Unarchive
                    </button>
                  ) : (
                    <>
                      <button 
                        className="action-button archive-button"
                        onClick={() => handleArchive(conversation.id)}
                      >
                        Archive
                      </button>
                      <button 
                        className="action-button delete-button"
                        onClick={() => handleDelete(conversation.id)}
                      >
                        DELETE
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <div className="empty-message">
                {showArchived ? 'No archived conversations found.' : 'No active conversations found.'}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Show Archived Button - only show when viewing active conversations */}
      {!showArchived && archivedConversations.length > 0 && (
        <div className="show-archived-container">
          <button 
            className="show-archived-button"
            onClick={handleShowArchived}
          >
            Show Archived ({archivedConversations.length})
          </button>
        </div>
      )}

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

export default ChatLogsandArchiving;
