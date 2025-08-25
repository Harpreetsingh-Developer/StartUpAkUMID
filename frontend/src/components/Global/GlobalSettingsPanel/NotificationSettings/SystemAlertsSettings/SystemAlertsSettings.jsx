import React, { useState } from 'react';
import './SystemAlertsSettings.scss';

const SystemAlertsSettings = () => {
  const [alertSettings, setAlertSettings] = useState({
    pauseAllAlerts: true,
    muteAlertsFrom: true,
    muteStartTime: "10:00 PM",
    muteEndTime: "07:00 AM",
    pauseUntil: "until tomorrow"
  });

  const alertCategories = [
    {
      title: "User & Profile Management",
      alerts: [
        { name: "New User Registration (Startup, Mentor, Admin)", level: "C", color: "#EF4444" },
        { name: "User Profile Update", level: "I", color: "#10B981" },
        { name: "Account Activated/Deactivated", level: "W", color: "#F59E0B" }
      ]
    },
    {
      title: "Application & Program Flow",
      alerts: [
        { name: "Application Submitted", level: "I", color: "#10B981" },
        { name: "Application Approved/Rejected", level: "W", color: "#F59E0B" },
        { name: "Startup Stage Progression/Regression", level: "C", color: "#EF4444" },
        { name: "Program Enrollment/Completion", level: "I", color: "#10B981" }
      ]
    },
    {
      title: "Document Management",
      alerts: [
        { name: "Document Uploaded", level: "I", color: "#10B981" },
        { name: "Document Approved/Rejected", level: "W", color: "#F59E0B" },
        { name: "Document Due Date Approaching", level: "C", color: "#EF4444" },
        { name: "Document Overdue", level: "C", color: "#EF4444" }
      ]
    },
    {
      title: "Mentorship & Connections",
      alerts: [
        { name: "Mentor Assigned to Startup", level: "I", color: "#10B981" },
        { name: "Mentorship Session Scheduled/Completed", level: "I", color: "#10B981" },
        { name: "New Message Received (if enabled)", level: "W", color: "#F59E0B" },
        { name: "Connection Request Received/Accepted/Declined", level: "W", color: "#F59E0B" }
      ]
    },
    {
      title: "Evaluation & Reviews",
      alerts: [
        { name: "Evaluation Initiated", level: "I", color: "#10B981" },
        { name: "Evaluation Completed", level: "I", color: "#10B981" },
        { name: "Review Due", level: "W", color: "#F59E0B" }
      ]
    },
    {
      title: "Payment & Subscription",
      alerts: [
        { name: "Subscription Payment Due", level: "C", color: "#EF4444" },
        { name: "Subscription Payment Successful/Failed", level: "W", color: "#F59E0B" },
        { name: "Subscription Plan Changed", level: "I", color: "#10B981" }
      ]
    },
    {
      title: "Platform & Maintenance Alert",
      alerts: [
        { name: "System Downtime/Maintenance Notification", level: "C", color: "#EF4444" },
        { name: "Critical Error Alert via SMS", level: "W", color: "#F59E0B" }
      ]
    },
    {
      title: "Notification Channel",
      alerts: [
        { name: "Send via Email", level: "W", color: "#F59E0B" },
        { name: "Send via SMS", level: "C", color: "#EF4444" },
        { name: "Send via In-App Notification", level: "I", color: "#10B981" }
      ]
    }
  ];

  const handleToggleChange = (setting) => {
    setAlertSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleDropdownChange = (setting, value) => {
    setAlertSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  return (
    <div className="system-alerts-container">
      <h1 className="page-title">System Alerts</h1>
      
      {/* Legend */}
      <div className="alert-legend">
        <div className="legend-item">
          <div className="legend-circle critical">C</div>
          <span>Critical (C)</span>
        </div>
        <div className="legend-item">
          <div className="legend-circle warning">W</div>
          <span>Warning (W)</span>
        </div>
        <div className="legend-item">
          <div className="legend-circle information">I</div>
          <span>Information (I)</span>
        </div>
      </div>

      {/* Alert Categories Grid */}
      <div className="alert-categories">
        {alertCategories.map((category, index) => (
          <div key={index} className="alert-card">
            <div className="card-header">
              <h3 className="card-title">{category.title}</h3>
              <button className="custom-button">
                CUSTOM
                <i className="chevron-down">▼</i>
              </button>
            </div>
            <div className="alert-list">
              {category.alerts.map((alert, alertIndex) => (
                <div key={alertIndex} className="alert-item">
                  <span className="alert-name">{alert.name}</span>
                  <div className="alert-level-control" style={{ backgroundColor: alert.color }}>
                    <span className="level-letter">{alert.level}</span>
                    <i className="chevron-down">▼</i>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Global Alert Settings Panel */}
      <div className="global-settings-panel">
        <h3 className="panel-title">Global Alert Settings</h3>
        
        <div className="setting-item">
          <div className="setting-header">
            <label>Pause All Alerts</label>
            <div className="toggle-switch">
              <input
                type="checkbox"
                checked={alertSettings.pauseAllAlerts}
                onChange={() => handleToggleChange('pauseAllAlerts')}
              />
              <span className="slider"></span>
            </div>
          </div>
          <select
            value={alertSettings.pauseUntil}
            onChange={(e) => handleDropdownChange('pauseUntil', e.target.value)}
            className="settings-dropdown"
          >
            <option value="until tomorrow">until tomorrow</option>
            <option value="until next week">until next week</option>
            <option value="until next month">until next month</option>
            <option value="indefinitely">indefinitely</option>
          </select>
        </div>

        <div className="setting-item">
          <div className="setting-header">
            <label>Mute Alerts from</label>
            <div className="toggle-switch">
              <input
                type="checkbox"
                checked={alertSettings.muteAlertsFrom}
                onChange={() => handleToggleChange('muteAlertsFrom')}
              />
              <span className="slider"></span>
            </div>
          </div>
          <div className="time-settings">
            <select
              value={alertSettings.muteStartTime}
              onChange={(e) => handleDropdownChange('muteStartTime', e.target.value)}
              className="settings-dropdown"
            >
              <option value="10:00 PM">10:00 PM</option>
              <option value="11:00 PM">11:00 PM</option>
              <option value="12:00 AM">12:00 AM</option>
            </select>
            <span className="time-separator">to</span>
            <select
              value={alertSettings.muteEndTime}
              onChange={(e) => handleDropdownChange('muteEndTime', e.target.value)}
              className="settings-dropdown"
            >
              <option value="07:00 AM">07:00 AM</option>
              <option value="08:00 AM">08:00 AM</option>
              <option value="09:00 AM">09:00 AM</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemAlertsSettings;
