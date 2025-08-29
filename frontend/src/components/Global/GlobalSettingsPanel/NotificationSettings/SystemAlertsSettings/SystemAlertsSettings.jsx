import React, { useState, useEffect, useRef } from 'react';
import './SystemAlertsSettings.scss';


const initialAlertsConfig = {
    userProfileManagement: {
        title: 'User & Profile Management',
        items: [
            { id: 1, name: 'New User Registration (Startup, Mentor, Admin)', status: 'critical', details: 'Detailed info for new user registration alert.', timestamp: '2025-08-23 00:01:00' },
            { id: 2, name: 'User Profile Update', status: 'information', details: 'Notification about changes to user profile information.', timestamp: '2025-08-22 18:30:00' },
            { id: 3, name: 'Account Activated/Deactivated', status: 'warning', details: 'Alert for changes in user account status.', timestamp: '2025-08-22 10:45:00' },
        ],
    },
    applicationProgramFlow: {
        title: 'Application & Program Flow',
        items: [
            { id: 4, name: 'Application Submitted', status: 'information', details: 'Confirmation of a new application submission.', timestamp: '2025-08-21 09:00:00' },
            { id: 5, name: 'Application Approved/Rejected', status: 'warning', details: 'Status update on a submitted application.', timestamp: '2025-08-20 15:20:00' },
            { id: 6, name: 'Startup Stage Progression/Regression', status: 'critical', details: 'Critical alert for changes in a startup\'s lifecycle stage.', timestamp: '2025-08-19 23:55:00' },
            { id: 7, name: 'Program Enrollment/Completion', status: 'information', details: 'Notification of successful program enrollment or completion.', timestamp: '2025-08-19 08:10:00' },
        ],
    },
    documentManagement: {
        title: 'Document Management',
        items: [
            { id: 8, name: 'Document Uploaded', status: 'information', details: 'Notification for a new document upload.', timestamp: '2025-08-18 12:00:00' },
            { id: 9, name: 'Document Approved/Rejected', status: 'warning', details: 'Status update on a document approval request.', timestamp: '2025-08-17 11:30:00' },
            { id: 10, name: 'Document Due Date Approaching', status: 'critical', details: 'Warning that a document deadline is near.', timestamp: '2025-08-16 17:00:00' },
            { id: 11, name: 'Document Overdue', status: 'critical', details: 'Critical alert for a document past its due date.', timestamp: '2025-08-15 09:00:00' },
        ],
    },
    mentorshipConnections: {
        title: 'Mentorship & Connections',
        items: [
            { id: 12, name: 'Mentor Assigned to Startup', status: 'information', details: 'Notification that a mentor has been assigned to a startup.', timestamp: '2025-08-14 14:00:00' },
            { id: 13, name: 'Mentorship Session Scheduled/Completed', status: 'information', details: 'Update on the status of a mentorship session.', timestamp: '2025-08-13 10:00:00' },
            { id: 14, name: 'New Message Received (if enabled)', status: 'warning', details: 'Alert for a new message in the system.', timestamp: '2025-08-12 16:30:00' },
            { id: 15, name: 'Connection Request Received/Accepted/Declined', status: 'warning', details: 'Alert for changes in connection requests.', timestamp: '2025-08-11 11:00:00' },
        ],
    },
    evaluationReviews: {
        title: 'Evaluation & Reviews',
        items: [
            { id: 16, name: 'Evaluation Initiated', status: 'information', details: 'Notification that an evaluation process has started.', timestamp: '2025-08-10 09:00:00' },
            { id: 17, name: 'Evaluation Completed', status: 'information', details: 'Alert that an evaluation has been finalized.', timestamp: '2025-08-09 13:00:00' },
            { id: 18, name: 'Review Due', status: 'warning', details: 'Reminder that a review deadline is approaching.', timestamp: '2025-08-08 17:00:00' },
        ],
    },
    paymentSubscription: {
        title: 'Payment & Subscription',
        items: [
            { id: 19, name: 'Subscription Payment Due', status: 'critical', details: 'Critical alert for an upcoming subscription payment.', timestamp: '2025-08-07 10:00:00' },
            { id: 20, name: 'Subscription Payment Successful/Failed', status: 'warning', details: 'Status update on a subscription payment transaction.', timestamp: '2025-08-06 14:00:00' },
            { id: 21, name: 'Subscription Plan Changed', status: 'information', details: 'Notification that the subscription plan has been updated.', timestamp: '2025-08-05 18:00:00' },
        ],
    },
    platformMaintenance: {
        title: 'Platform & Maintenance Alert',
        items: [
            { id: 22, name: 'System Downtime/Maintenance Notification', status: 'critical', details: 'Alert for planned or unplanned system downtime.', timestamp: '2025-08-04 22:00:00' },
            { id: 23, name: 'Critical Error Alert via SMS', status: 'warning', details: 'Urgent alert for system errors delivered via SMS.', timestamp: '2025-08-03 15:00:00' },
        ],
    },
    notificationChannel: {
        title: 'Notification Channel',
        items: [
            { id: 24, name: 'Send via Email', status: 'warning', details: 'Configurable setting to send alerts via email.', timestamp: '2025-08-02 09:00:00' },
            { id: 25, name: 'Send via SMS', status: 'critical', details: 'Configurable setting to send alerts via SMS.', timestamp: '2025-08-01 11:00:00' },
            { id: 26, name: 'Send via In-App Notification', status: 'information', details: 'Configurable setting to send alerts as in-app notifications.', timestamp: '2025-07-31 16:00:00' },
        ],
    },
};

const SystemAlertsSettings = () => {
    const [alertsConfig, setAlertsConfig] = useState(initialAlertsConfig);
    const [isPaused, setIsPaused] = useState(false);
    const [pauseDuration, setPauseDuration] = useState('1hr');
    const [isMuted, setIsMuted] = useState(false);
    const [muteTime, setMuteTime] = useState({ start: '10:00', end: '07:00' });
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [openModalDetails, setOpenModalDetails] = useState(null);
    
   
    const dropdownRefs = useRef({});

    useEffect(() => {
        
        const handleClickOutside = (event) => {
           
            if (openDropdownId) {
                const container = dropdownRefs.current[openDropdownId];
                if (container && !container.contains(event.target)) {
                    setOpenDropdownId(null);
                }
            }
        };

        
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openDropdownId]);

    const handleDropdownToggle = (id, event) => {
        event.stopPropagation();
        setOpenDropdownId(openDropdownId === id ? null : id);
    };

    const modifyAlerts = (blockKey, newStatus, disabled = false) => {
        setAlertsConfig(prevConfig => {
            const updatedAlertsConfig = { ...prevConfig };
            updatedAlertsConfig[blockKey].items = updatedAlertsConfig[blockKey].items.map(item => ({
                ...item,
                status: newStatus,
                disabled: disabled
            }));
            return updatedAlertsConfig;
        });
        setOpenDropdownId(null);
    };

    const updateIndividualAlertStatus = (blockKey, itemId, newStatus, disabled = false) => {
        setAlertsConfig(prevConfig => {
            const updatedAlertsConfig = { ...prevConfig };
            updatedAlertsConfig[blockKey].items = updatedAlertsConfig[blockKey].items.map(item =>
                item.id === itemId ? { ...item, status: newStatus, disabled: disabled } : item
            );
            return updatedAlertsConfig;
        });
        setOpenDropdownId(null);
    };
    
    const handleOpenModal = (alertDetails) => {
        setOpenModalDetails(alertDetails);
        setOpenDropdownId(null);
    };

    const handleCloseModal = () => {
        setOpenModalDetails(null);
    };

    const handleResolveAlert = () => {
        
        alert('Alert has been resolved!');
        handleCloseModal();
    };
    
    const renderAlertBlock = (blockKey, data) => (
        <div className="alert-block" key={blockKey}>
            <div className="alert-block-header">
                <h3>{data.title}</h3>
                <div 
                    className="custom-dropdown-container" 
                    ref={el => dropdownRefs.current[`custom-${blockKey}`] = el}
                >
                    <button 
                        className="custom-button" 
                        onClick={(e) => handleDropdownToggle(`custom-${blockKey}`, e)} 
                    >
                        CUSTOM <span className="arrow-icon">▼</span>
                    </button>
                    {openDropdownId === `custom-${blockKey}` && (
                        <div className="dropdown-menu active">
                            <a onClick={() => modifyAlerts(blockKey, 'information')}>Configure All</a>
                            <a onClick={() => modifyAlerts(blockKey, 'disabled', true)}>Disable All</a>
                        </div>
                    )}
                </div>
            </div>
            <div className="alert-items">
                {data.items.map(item => (
                    <div className={`alert-item ${item.disabled ? 'disabled-alert' : ''}`} key={item.id}>
                        <span>{item.name}</span>
                        <div 
                            className="alert-status-group" 
                            ref={el => dropdownRefs.current[`item-${item.id}`] = el}
                        >
                            <div className={`alert-status alert-${item.status} ${item.disabled ? 'disabled' : ''}`}>
                                {item.status.charAt(0).toUpperCase()}
                            </div>
                            <button
                                className="status-dropdown-icon"
                                onClick={(e) => handleDropdownToggle(`item-${item.id}`, e)}
                                disabled={item.disabled}
                            >
                                ▼
                            </button>
                            {openDropdownId === `item-${item.id}` && (
                                <div className="dropdown-menu item-level-dropdown active">
                                    <a onClick={() => handleOpenModal(item)}>View Details</a>
                                    <div className="dropdown-divider"></div>
                                    <a onClick={() => updateIndividualAlertStatus(blockKey, item.id, 'critical')}>Set Critical</a>
                                    <a onClick={() => updateIndividualAlertStatus(blockKey, item.id, 'warning')}>Set Warning</a>
                                    <a onClick={() => updateIndividualAlertStatus(blockKey, item.id, 'information')}>Set Info</a>
                                    <div className="dropdown-divider"></div>
                                    <a onClick={() => updateIndividualAlertStatus(blockKey, item.id, 'disabled', true)}>Disable</a>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="system-alerts-container">
            <h1>System Alerts</h1>
            <div className="alert-legend">
                <div className="legend-item">
                    <span className="legend-dot critical"></span><span className="legend-abbr">Critical (C)</span>
                </div>
                <div className="legend-item">
                    <span className="legend-dot warning"></span><span className="legend-abbr">Warning (W)</span>
                </div>
                <div className="legend-item">
                    <span className="legend-dot information"></span><span className="legend-abbr">Information (I)</span>
                </div>
            </div>
            <div className="alert-grid">
                {Object.entries(alertsConfig).map(([key, data]) => renderAlertBlock(key, data))}

                <div className="pause-mute-section">
                    <div className="pause-alerts-row">
                        <span className="pause-label">Pause All Alerts</span>
                        <label className="toggle-switch">
                            <input type="checkbox" checked={isPaused} onChange={() => setIsPaused(!isPaused)} />
                            <span className="slider"></span>
                        </label>
                        <select
                            className="pause-duration-select"
                            value={pauseDuration}
                            onChange={(e) => setPauseDuration(e.target.value)}
                            disabled={!isPaused}
                        >
                            <option value="1hr">1 Hour</option>
                            <option value="2hr">2 Hours</option>
                            <option value="4hr">4 Hours</option>
                            <option value="12hr">12 Hours</option>
                            <option value="24hr">24 Hours</option>
                            <option value="tomorrow">Until Tomorrow</option>
                        </select>
                    </div>
                    <div className="mute-alerts-row">
                        <span className="mute-label">Mute Alerts</span>
                        <label className="toggle-switch">
                            <input type="checkbox" checked={isMuted} onChange={() => setIsMuted(!isMuted)} />
                            <span className="slider"></span>
                        </label>
                        <div className="mute-time-range">
                            <input
                                type="time"
                                value={muteTime.start}
                                onChange={(e) => setMuteTime({ ...muteTime, start: e.target.value })}
                                disabled={!isMuted}
                            />
                            <span className="mute-to-label">to</span>
                            <input
                                type="time"
                                value={muteTime.end}
                                onChange={(e) => setMuteTime({ ...muteTime, end: e.target.value })}
                                disabled={!isMuted}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {openModalDetails && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Alert Details: {openModalDetails.name}</h2>
                            <button className="close-button" onClick={handleCloseModal}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <p><strong>Status:</strong> <span className={`alert-status alert-${openModalDetails.status}`}>{openModalDetails.status.charAt(0).toUpperCase()}</span></p>
                            <p><strong>Description:</strong> {openModalDetails.details}</p>
                            <p><strong>Event Timestamp:</strong> {openModalDetails.timestamp}</p>
                            <p className="modal-note">This is a placeholder for more detailed information about the alert. In a real application, this would fetch dynamic data from an API.</p>
                        </div>
                        <div className="modal-footer">
                            <button className="button-secondary" onClick={handleResolveAlert}>Resolve</button>
                            <button className="button-primary" onClick={handleCloseModal}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SystemAlertsSettings;