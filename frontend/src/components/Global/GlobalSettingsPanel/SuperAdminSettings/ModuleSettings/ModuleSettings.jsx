import React, { useState } from 'react';
import icons from '../../../../../constants/icons';
import './ModuleSettings.scss';

const ModuleSettings = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [modules, setModules] = useState([
    {
      id: 'onboarding',
      name: 'Onboarding',
      description: 'Manage onboarding stages and startup journeys. Track user progress through different onboarding steps. Ensure a smooth start for every new user or startup.',
      enabled: false
    },
    {
      id: 'automation',
      name: 'Automation',
      description: 'Trigger actions like emails, tasks, and alerts automatically. Reduces manual workload and increases consistency. Set up smart workflows for routine processes.',
      enabled: true
    },
    {
      id: 'mentorship',
      name: 'Mentorship',
      description: 'Assign mentors to startups or team members. Track mentorship meetings and feedback sessions. Improve guidance quality with structured oversight.',
      enabled: false
    },
    {
      id: 'funding',
      name: 'Funding',
      description: 'Monitor funding rounds and investor details. Track fundraising stages and associated documents. Streamline investor interactions and timelines.',
      enabled: true
    },
    {
      id: 'event-management',
      name: 'Event Management',
      description: 'Plan and organize events within your ERP. Create schedules, send invites, and manage RSVPs. Keep your community engaged and informed.',
      enabled: false
    },
    {
      id: 'reports-analytics',
      name: 'Reports & Analytics',
      description: 'Generate charts, metrics, and dashboards. Track key performance indicators over time. Make informed decisions based on real-time data.',
      enabled: true
    }
  ]);

  const handleToggle = (moduleId) => {
    setModules(prevModules =>
      prevModules.map(module =>
        module.id === moduleId
          ? { ...module, enabled: !module.enabled }
          : module
      )
    );
  };

  const handleSave = () => {
    // Handle save functionality
    console.log('Saving module settings:', modules);
    // Here you would typically make an API call to save the settings
  };

  const filteredModules = modules.filter(module =>
    module.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    module.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="module-settings">
      <div className="module-settings__header">
        <div className="module-settings__search">
        </div>
      </div>

      <div className="module-settings__content">
        <div className="modules-grid">
          {filteredModules.map((module) => (
            <div key={module.id} className="module-card">
              <div className="module-card__header">
                <h3 className="module-card__title">{module.name}</h3>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={module.enabled}
                    onChange={() => handleToggle(module.id)}
                    className="toggle-switch__input"
                  />
                  <span className={`toggle-switch__slider ${module.enabled ? 'enabled' : 'disabled'}`}></span>
                </label>
              </div>
              <p className="module-card__description">{module.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="module-settings__footer">
        <button className="save-button" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default ModuleSettings;
