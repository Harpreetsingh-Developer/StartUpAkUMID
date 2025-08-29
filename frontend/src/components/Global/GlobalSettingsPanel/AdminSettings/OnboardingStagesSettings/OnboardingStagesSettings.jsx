import React, { useState } from 'react';
import './OnboardingStagesSettings.scss';


const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9"></path>
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
  </svg>
);

const SaveIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
    <polyline points="17 21 17 13 7 13 7 21"></polyline>
    <polyline points="7 3 7 8 15 8"></polyline>
  </svg>
);

const MoreOptionsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="1"></circle>
    <circle cx="19" cy="12" r="1"></circle>
    <circle cx="5" cy="12" r="1"></circle>
  </svg>
);

const ExpandIcon = ({ isExpanded }) => (
  <div className={`expand-icon-wrapper ${isExpanded ? 'expanded' : ''}`}>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  </div>
);

const SearchIcon = () => (
  <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const Timeline = ({ stages, currentStage }) => (
  <div className="timeline-container">
    {stages.map((stage, index) => (
      <div key={index} className={`timeline-stage ${stage === currentStage ? 'active-stage' : ''}`}>
        <div className="stage-dot"></div>
        <div className="stage-name">{stage}</div>
        {index < stages.length - 1 && <div className="stage-line"></div>}
      </div>
    ))}
  </div>
);

const OnboardingFlow = ({ flow, onUpdateFlow, onDeleteFlow, onProgressStatus, onRegressStatus }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(flow.name);
  const [editedDescription, setEditedDescription] = useState(flow.description);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const toggleExpand = () => {
    if (flow.stages) {
      setIsExpanded(!isExpanded);
    }
  };

  const handleEditClick = (event) => {
    event.stopPropagation();
    setIsEditing(true);
  };

  const handleSaveClick = (event) => {
    event.stopPropagation();
    onUpdateFlow(flow.id, { name: editedName, description: editedDescription });
    setIsEditing(false);
  };

  const handleCancelEdit = (event) => {
    event.stopPropagation();
    setIsEditing(false);
    setEditedName(flow.name);
    setEditedDescription(flow.description);
  };

  const handleMoreOptionsClick = (event) => {
    event.stopPropagation();
    setShowMoreMenu(!showMoreMenu);
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    onDeleteFlow(flow.id);
    setShowMoreMenu(false);
  };

  const isLastStage = flow.stages && flow.status === flow.stages[flow.stages.length - 1];
  const isFirstStage = flow.stages && flow.status === flow.stages[0];

  return (
    <div className="onboarding-flow-container">
      <div className="flow-row" onClick={toggleExpand}>
        <div className="flow-name-cell">
          {flow.stages && <ExpandIcon isExpanded={isExpanded} />}
          {isEditing ? (
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span>{flow.name}</span>
          )}
        </div>
        <div className="flow-description-cell">
          {isEditing ? (
            <input
              type="text"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span>{flow.description}</span>
          )}
        </div>
        <div className="flow-status-cell">
           {flow.status ? <span className={`status-badge ${flow.status.toLowerCase().replace(/\s/g, '-')}`}>{flow.status}</span> : '-'}
        </div>
        <div className="flow-actions-cell">
          {isEditing ? (
            <>
              <button className="icon-button save-button" onClick={handleSaveClick}>
                <SaveIcon />
              </button>
              <button className="icon-button cancel-button" onClick={handleCancelEdit}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </>
          ) : (
            <div className="actions-group">
              <button className="icon-button edit-button" onClick={handleEditClick}>
                <EditIcon />
              </button>
              <div className="more-options-wrapper">
                <button className="icon-button more-options-button" onClick={handleMoreOptionsClick}>
                  <MoreOptionsIcon />
                </button>
                {showMoreMenu && (
                  <div className="more-options-menu">
                    <button onClick={handleDeleteClick}>Delete</button>
                    <button onClick={() => alert('Duplicate')}>Duplicate</button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {isExpanded && flow.stages && (
        <div className="flow-expanded-content">
          <Timeline stages={flow.stages} currentStage={flow.status} />
          <div className="progress-buttons">
            <button
              className="progress-button prev"
              onClick={() => onRegressStatus(flow.id, flow.status, flow.stages)}
              disabled={isFirstStage}
            >
              Move to Previous Stage
            </button>
            <button
              className="progress-button next"
              onClick={() => onProgressStatus(flow.id, flow.status, flow.stages)}
              disabled={isLastStage}
            >
              Move to Next Stage
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const OnboardingStages = () => {
  const initialOnboardingFlows = [
    { id: 1, name: 'Default Flow', description: 'Default onboarding process for new users.', stages: null, status: null },
    { id: 2, name: 'Startup', description: 'Onboarding Startup', stages: ['Startup Basic Details', 'Startup Idea', 'Incubation Expectation', 'Document Uploads', 'Founder & Team Details', 'Prototype Details', 'Funding Info', 'Additional Info'], status: 'Incubation Expectation' },
    { id: 3, name: 'Mentor', description: 'Onboarding Mentor', stages: ['Sourced', 'Screening', 'Test', 'Face to Face Interview', 'HR Round', 'Pre-Boarding', 'Hired'], status: 'Face to Face Interview' },
  ];

  const [onboardingFlows, setOnboardingFlows] = useState(initialOnboardingFlows);
  const [searchTerm, setSearchTerm] = useState('');

  const handleUpdateFlow = (id, updatedData) => {
    setOnboardingFlows(prevFlows =>
      prevFlows.map(flow =>
        flow.id === id ? { ...flow, ...updatedData } : flow
      )
    );
  };

  const handleDeleteFlow = (id) => {
    if (window.confirm(`Are you sure you want to delete flow with ID: ${id}?`)) {
      setOnboardingFlows(prevFlows => prevFlows.filter(flow => flow.id !== id));
      alert(`Flow with ID: ${id} deleted successfully.`);
    }
  };

  const handleProgressStatus = (id, currentStatus, stages) => {
    const currentStageIndex = stages.indexOf(currentStatus);
    const nextStageIndex = currentStageIndex + 1;

    if (nextStageIndex < stages.length) {
      const nextStatus = stages[nextStageIndex];
      handleUpdateFlow(id, { status: nextStatus });
    }
  };

  const handleRegressStatus = (id, currentStatus, stages) => {
    const currentStageIndex = stages.indexOf(currentStatus);
    const prevStageIndex = currentStageIndex - 1;

    if (prevStageIndex >= 0) {
      const prevStatus = stages[prevStageIndex];
      handleUpdateFlow(id, { status: prevStatus });
    }
  };

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const filteredFlows = onboardingFlows.filter(flow =>
    flow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flow.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="onboarding-stages-container">
      <h1 className="main-title">ONBOARDING STAGES</h1>
      <div className="search-bar-container">
        <SearchIcon />
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="onboarding-table">
        <div className="table-header">
          <div className="header-cell flow-header-cell">Onboarding Flows</div>
          <div className="header-cell description-header-cell">Description</div>
          <div className="header-cell status-header-cell">Status</div>
          <div className="header-cell action-header-cell">Action</div>
        </div>
        <div className="table-body">
          {filteredFlows.map((flow) => (
            <OnboardingFlow
              key={flow.id}
              flow={flow}
              onUpdateFlow={handleUpdateFlow}
              onDeleteFlow={handleDeleteFlow}
              onProgressStatus={handleProgressStatus}
              onRegressStatus={handleRegressStatus}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OnboardingStages;