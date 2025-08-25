import React, { useState } from 'react';
import './CheckList.scss';

const CheckList = () => {
  const [settings, setSettings] = useState({
    reminderTriggers: {
      enabled: true,
      pendingTasks: true,
      submissionDeadlines: true,
      overdueItems: true
    },
    reminderFrequency: {
      enabled: true,
      dailyReminders: true,
      dailyTime: '10:00',
      dailyPeriod: 'AM',
      weeklyReminders: true,
      weeklyDay: 'Monday',
      daysBeforeDeadline: 5,
      daysAfterOverdue: 2
    },
    recipientRoles: {
      startups: true,
      mentors: true,
      admins: true
    },
    reminderChannels: {
      enabled: true,
      email: true,
      sms: true,
      inApp: true
    },
    customMessageTemplate: {
      selectedTemplate: 'Pending Task Reminder Template',
      message: `Hi {RecipientName},
You have a task '{TaskName}' due on {DueDate}.
Please complete it soon.`
    }
  });

  const handleToggle = (section, key) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: !prev[section][key]
      }
    }));
  };

  const handleInputChange = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const handleNestedChange = (section, subsection, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...prev[section][subsection],
          [key]: value
        }
      }
    }));
  };

  return (
    <div className="reminder-customization-container">
      <h1 className="page-title">Reminder Customization</h1>
      
      <div className="settings-grid">
        {/* Reminder Triggers */}
        <div className="settings-card">
          <div className="card-header">
            <h3 className="card-title">Reminder Triggers</h3>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.reminderTriggers.enabled}
                onChange={() => handleToggle('reminderTriggers', 'enabled')}
              />
              <span className="slider"></span>
            </label>
          </div>
          <div className="card-content">
            <label className="checkbox-item">
              <input
                type="checkbox"
                checked={settings.reminderTriggers.pendingTasks}
                onChange={() => handleToggle('reminderTriggers', 'pendingTasks')}
              />
              <span className="checkmark"></span>
              Enable reminders for pending tasks
            </label>
            <label className="checkbox-item">
              <input
                type="checkbox"
                checked={settings.reminderTriggers.submissionDeadlines}
                onChange={() => handleToggle('reminderTriggers', 'submissionDeadlines')}
              />
              <span className="checkmark"></span>
              Enable reminders for upcoming submission deadlines
            </label>
            <label className="checkbox-item">
              <input
                type="checkbox"
                checked={settings.reminderTriggers.overdueItems}
                onChange={() => handleToggle('reminderTriggers', 'overdueItems')}
              />
              <span className="checkmark"></span>
              Enable reminders for overdue items
            </label>
          </div>
        </div>

        {/* Reminder Frequency */}
        <div className="settings-card">
          <div className="card-header">
            <h3 className="card-title">Reminder Frequency</h3>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.reminderFrequency.enabled}
                onChange={() => handleToggle('reminderFrequency', 'enabled')}
              />
              <span className="slider"></span>
            </label>
          </div>
          <div className="card-content">
            <label className="checkbox-item">
              <input
                type="checkbox"
                checked={settings.reminderFrequency.dailyReminders}
                onChange={() => handleToggle('reminderFrequency', 'dailyReminders')}
              />
              <span className="checkmark"></span>
              Send daily reminders
              <div className="time-input-group">
                <input
                  type="text"
                  value={settings.reminderFrequency.dailyTime}
                  onChange={(e) => handleNestedChange('reminderFrequency', 'dailyTime', e.target.value)}
                  className="time-input"
                />
                <select
                  value={settings.reminderFrequency.dailyPeriod}
                  onChange={(e) => handleNestedChange('reminderFrequency', 'dailyPeriod', e.target.value)}
                  className="period-select"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </label>
            <label className="checkbox-item">
              <input
                type="checkbox"
                checked={settings.reminderFrequency.weeklyReminders}
                onChange={() => handleToggle('reminderFrequency', 'weeklyReminders')}
              />
              <span className="checkmark"></span>
              Send weekly reminders on
              <select
                value={settings.reminderFrequency.weeklyDay}
                onChange={(e) => handleNestedChange('reminderFrequency', 'weeklyDay', e.target.value)}
                className="day-select"
              >
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
            </label>
            <label className="checkbox-item">
              <input type="checkbox" defaultChecked />
              <span className="checkmark"></span>
              Send <input
                type="number"
                value={settings.reminderFrequency.daysBeforeDeadline}
                onChange={(e) => handleNestedChange('reminderFrequency', 'daysBeforeDeadline', parseInt(e.target.value))}
                className="number-input"
              /> days before the deadline
            </label>
            <label className="checkbox-item">
              <input type="checkbox" defaultChecked />
              <span className="checkmark"></span>
              Send <input
                type="number"
                value={settings.reminderFrequency.daysAfterOverdue}
                onChange={(e) => handleNestedChange('reminderFrequency', 'daysAfterOverdue', parseInt(e.target.value))}
                className="number-input"
              /> days after an item is overdue
            </label>
          </div>
        </div>

        {/* Recipient Roles */}
        <div className="settings-card">
          <div className="card-header">
            <h3 className="card-title">Recipient Roles</h3>
          </div>
          <div className="card-content">
            <label className="checkbox-item">
              <input
                type="checkbox"
                checked={settings.recipientRoles.startups}
                onChange={() => handleToggle('recipientRoles', 'startups')}
              />
              <span className="checkmark"></span>
              Send reminders to Startups
            </label>
            <label className="checkbox-item">
              <input
                type="checkbox"
                checked={settings.recipientRoles.mentors}
                onChange={() => handleToggle('recipientRoles', 'mentors')}
              />
              <span className="checkmark"></span>
              Send reminders to Mentors
            </label>
            <label className="checkbox-item">
              <input
                type="checkbox"
                checked={settings.recipientRoles.admins}
                onChange={() => handleToggle('recipientRoles', 'admins')}
              />
              <span className="checkmark"></span>
              Send reminders to Admins (IC)
            </label>
          </div>
        </div>

        {/* Reminder Channels */}
        <div className="settings-card">
          <div className="card-header">
            <h3 className="card-title">Reminder Channels</h3>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.reminderChannels.enabled}
                onChange={() => handleToggle('reminderChannels', 'enabled')}
              />
              <span className="slider"></span>
            </label>
          </div>
          <div className="card-content">
            <label className="checkbox-item">
              <input
                type="checkbox"
                checked={settings.reminderChannels.email}
                onChange={() => handleToggle('reminderChannels', 'email')}
              />
              <span className="checkmark"></span>
              Send via Email
            </label>
            <label className="checkbox-item">
              <input
                type="checkbox"
                checked={settings.reminderChannels.sms}
                onChange={() => handleToggle('reminderChannels', 'sms')}
              />
              <span className="checkmark"></span>
              Send via SMS
            </label>
            <label className="checkbox-item">
              <input
                type="checkbox"
                checked={settings.reminderChannels.inApp}
                onChange={() => handleToggle('reminderChannels', 'inApp')}
              />
              <span className="checkmark"></span>
              Send via In-App Notification
            </label>
          </div>
        </div>

        {/* Custom Message Templates */}
        <div className="settings-card template-card">
          <div className="card-header">
            <h3 className="card-title">Custom Message Templates</h3>
            <select
              value={settings.customMessageTemplate.selectedTemplate}
              onChange={(e) => handleNestedChange('customMessageTemplate', 'selectedTemplate', e.target.value)}
              className="template-select"
            >
              <option value="Pending Task Reminder Template">Pending Task Reminder Template</option>
              <option value="Deadline Reminder Template">Deadline Reminder Template</option>
              <option value="Overdue Item Template">Overdue Item Template</option>
            </select>
          </div>
          <div className="card-content">
            <textarea
              value={settings.customMessageTemplate.message}
              onChange={(e) => handleNestedChange('customMessageTemplate', 'message', e.target.value)}
              className="message-textarea"
              placeholder="Enter your custom message template..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckList;
