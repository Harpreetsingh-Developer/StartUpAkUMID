import React, { useState } from 'react';
import './AutomationSettings.scss';

import mailIcon from '/src/assets/icons/mail.png';
import eyeIcon from '/src/assets/icons/look-360.png';
import moreIcon from '/src/assets/icons/SettingsIcons/MiscellaneousIcon.png';
import downArrowIcon from '/src/assets/icons/Search.png';
import plusIcon from '/src/assets/icons/Checkmark.png';

const AutomationSettings = () => {
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [activeTab, setActiveTab] = useState('taskScheduling');

  const tasks = [
    {
      id: 1,
      name: 'Document submission',
      status: 'Overdue',
      dueDate: '12 Mar 2025',
      dueText: 'Overdue by 2nd days',
      owner: {
        name: 'TANSI NARULA',
        avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
      },
      statusClass: 'overdue'
    },
    {
      id: 2,
      name: 'Exit interview',
      status: 'Skipped',
      dueDate: '-',
      dueText: '',
      owner: {
        name: 'SANTHOSH',
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
      },
      statusClass: 'skipped'
    },
    {
      id: 3,
      name: 'Relieving letter generation',
      status: 'Waiting for another task',
      dueDate: '-',
      dueText: '',
      owner: {
        name: 'JOHNSON',
        avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
      },
      statusClass: 'waiting'
    },
    {
      id: 4,
      name: 'Relieving letter generation',
      status: 'Pending',
      dueDate: '12 Mar 2025',
      dueText: '30 days left',
      owner: {
        name: 'JESY',
        avatar: 'https://randomuser.me/api/portraits/women/4.jpg'
      },
      statusClass: 'pending'
    },
    {
      id: 5,
      name: 'Relieving letter generation',
      status: 'Completed',
      dueDate: '-',
      dueText: '',
      owner: {
        name: 'SHEETAL H',
        avatar: 'https://randomuser.me/api/portraits/men/5.jpg'
      },
      statusClass: 'completed'
    },
    {
      id: 6,
      name: 'Relieving letter generation',
      status: 'To be triggered in 10d',
      dueDate: '12 Mar 2025',
      dueText: 'Overdue by 130 days',
      owner: {
        name: 'Shree',
        avatar: 'https://randomuser.me/api/portraits/women/6.jpg'
      },
      statusClass: 'triggered'
    }
  ];

  const handleTaskSelection = (taskId) => {
    setSelectedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleSelectAll = () => {
    if (selectedTasks.length === tasks.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(tasks.map(task => task.id));
    }
  };

  const handleRemind = () => {
    console.log('Reminding selected tasks:', selectedTasks);
  };

  const handleSkip = () => {
    console.log('Skipping selected tasks:', selectedTasks);
  };

  const handleImportTasks = () => {
    console.log('Importing tasks from task list');
  };

  const handleAddNewTask = () => {
    console.log('Adding new task');
  };

  const getStatusClass = (status) => {
    const statusMap = {
      'Overdue': 'overdue',
      'Skipped': 'skipped',
      'Waiting For Another Task': 'waiting',
      'Pending': 'pending',
      'Completed': 'completed',
      'To be triggered in 10d': 'triggered'
    };
    return statusMap[status] || 'default';
  };

  return (
    <div className="automation-settings">
      <div className="automation-container">
        {/* Tabbed Header */}
        <div className="tab-header">
          <button 
            className={`tab-button ${activeTab === 'workflowAutomation' ? 'active' : ''}`}
            onClick={() => setActiveTab('workflowAutomation')}
          >
            Workflow Automation
          </button>
          <button 
            className={`tab-button ${activeTab === 'taskScheduling' ? 'active' : ''}`}
            onClick={() => setActiveTab('taskScheduling')}
          >
            Task Scheduling
          </button>
        </div>

        {/* Task Scheduling Section */}
        <div className="task-scheduling-section">
          {/* Section Header with Action Buttons */}
          <div className="section-header">
            <div className="section-title">
              <h2 className="page-title">TASK SCHEDULING</h2>
              <p className="page-description">
                Add tasks that needs to be completed as a part of exit process
              </p>
            </div>
            <div className="section-actions">
              <button className="import-btn" onClick={handleImportTasks}>
                <span className="btn-icon">↓</span>
                Import from task list
              </button>
              <button className="add-task-btn" onClick={handleAddNewTask}>
                <span className="btn-icon">+</span>
                Add new tasks
              </button>
            </div>
          </div>

          {/* Task Summary */}
          <div className="task-summary">
            <div className="summary-left">
              <div className="progress-indicator">
                <div className="progress-circle">
                  <span className="progress-text">6</span>
                </div>
                <span className="progress-label">6 of 7 tasks pending</span>
              </div>
              <div className="summary-item">
                <div className="summary-icon person-icon">👤</div>
                <span>2 due on employee (1 overdue)</span>
              </div>
              <div className="summary-item">
                <div className="summary-icon team-icon">🏢</div>
                <span>1 due on Org team</span>
              </div>
            </div>
            <div className="summary-right">
              <button className="remind-btn" onClick={handleRemind}>
                Remind
              </button>
              <button className="skip-btn" onClick={handleSkip}>
                Skip
              </button>
            </div>
          </div>

          {/* Tasks Table */}
          <div className="tasks-table-container">
            <table className="tasks-table">
              <thead>
                <tr>
                  <th className="checkbox-header">
                    <input 
                      type="checkbox" 
                      checked={selectedTasks.length === tasks.length}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>Tasks</th>
                  <th>Status</th>
                  <th>Due date</th>
                  <th>Owner</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id} className="task-row">
                    <td className="checkbox-cell">
                      <input 
                        type="checkbox" 
                        checked={selectedTasks.includes(task.id)}
                        onChange={() => handleTaskSelection(task.id)}
                      />
                    </td>
                    <td className="task-name">
                      <span className="task-link">{task.name}</span>
                    </td>
                    <td className="status-cell">
                      <span className={`status-badge ${getStatusClass(task.status)}`}>
                        {task.status}
                      </span>
                    </td>
                    <td className="due-date-cell">
                      <div className="due-date">{task.dueDate}</div>
                      {task.dueText && (
                        <div className={`due-text ${getStatusClass(task.status)}`}>
                          {task.dueText}
                        </div>
                      )}
                    </td>
                    <td className="owner-cell">
                      <div className="owner-info">
                        <img 
                          src={task.owner.avatar} 
                          alt={task.owner.name} 
                          className="owner-avatar"
                        />
                        <span className="owner-name">{task.owner.name}</span>
                      </div>
                    </td>
                    <td className="actions-cell">
                      <div className="action-buttons-row">
                        <button className="action-btn" title="Mail">
                          <span className="btn-icon">✉</span>
                        </button>
                        <button className="action-btn" title="Wrong/Cross">
                          <span className="btn-icon">❌</span>
                        </button>
                        <button className="action-btn" title="View">
                          <span className="btn-icon">👁</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom Action */}
          <div className="bottom-action">
            <button className="add-new-task-btn" onClick={handleAddNewTask}>
              + Add new tasks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomationSettings;
