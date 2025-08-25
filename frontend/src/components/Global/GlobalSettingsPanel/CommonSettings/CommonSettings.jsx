import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import icons from '../../../../constants/icons';
import './CommonSettings.scss';

// Import SuperAdminSettings components
import RoleAndAccessSettings from '../SuperAdminSettings/RoleAndAccessControlSettings/RoleAndAccessSettings';
import AdminManagementSettings from '../SuperAdminSettings/AdminManagementSettings/AdminManagementSettings';
import ModuleSettings from '../SuperAdminSettings/ModuleSettings/ModuleSettings';
import SubscriptionPlanSettings from '../SuperAdminSettings/SubscriptionPlanSettings/SubscriptionPlanSettings';
import BrandingSettings from '../SuperAdminSettings/BrandingSettings/BrandingSettings';
import OnboardingStagesSettings from '../SuperAdminSettings/OnboardingStagesSettings/OnboardingStagesSettings';

// Import AdminSettings components
import OnboardingStagesSettingsAdmin from '../AdminSettings/OnboardingStagesSettings/OnboardingStagesSettings';
import HierarchySettings from '../AdminSettings/HierarchySettings/HierarchySettings';
import EvaluateandReviewSetupSettings from '../AdminSettings/EvaluateandReviewSetupSettings/EvaluateandReviewSetupSettings';
import AddStartupSettings from '../AdminSettings/AddStartupSettings/AddStartupSettings';
import AutomationSettings from '../AdminSettings/AutomationSettings/AutomationSettings';

// Import MessagingSettings components
import ChatLogsandArchiving from '../MessagingSettings/ChatLogsandArchiving/ChatLogsandArchiving';
import AiChatBotSettings from '../MessagingSettings/AiChatBotSettings/AiChatBotSettings';

// Import NotificationSettings components
import SystemAlertsSettings from '../NotificationSettings/SystemAlertsSettings/SystemAlertsSettings';
import EvaluationorStageAlertsSettings from '../NotificationSettings/EvaluationorStageAlertsSettings/EvaluationorStageAlertsSettings';
import CheckList from '../NotificationSettings/CheckList/CheckList';

// Import UserSettings components
import TeamMembersSettings from '../UserSettings/TeamMembersSettings/TeamMembersSettings';
import ProfileManagementSettings from '../UserSettings/ProfileManagementSettings/ProfileManagementSettings';
import DocumentUploadViewSettings from '../UserSettings/DocumentUploadViewSettings/DocumentUploadViewSettings';
import StartupGraphSettings from '../UserSettings/StartupGraphSettings/StartupGraphSettings';
import StageHistorySettings from '../UserSettings/StageHistorySettings/StageHistorySettings';

// Import CustomizeSettings components
import FieldBuilderSettings from '../CustomizeSettings/FieldBuilderSettings/FieldBuilderSettings';
import EventWorkshopSettings from '../CustomizeSettings/EventWorkshopSettings/EventWorkshopSettings';

// Import MiscellaneousSettings components
import FeedbackSystemSettings from '../MiscellaneousSettings/FeedbackSystemSettings/FeedbackSystemSettings';
import SecuritySettings from '../MiscellaneousSettings/SecuritySettings/SecuritySettings';
import SupportTicketSettings from '../MiscellaneousSettings/SupportTicketSettings/SupportTicketSettings';

const CommonSettingsLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('role-access');
  const [searchQuery, setSearchQuery] = useState('');

  // Update active item based on current location
  useEffect(() => {
    const pathSegments = location.pathname.split('/');
    const currentPath = pathSegments[pathSegments.length - 1];
    
    // Simple mapping for common paths
    const pathToKeyMap = {
      'branding': 'branding',
      'role-access': 'role-access',
      'admin-management': 'admin-management',
      'module-settings': 'module-settings',
      'subscription-plan': 'subscription-plan',
      'document-payment': 'document-payment',
      'add-startups': 'add-startups',
      'onboarding-stages': 'onboarding-stages',
      'onboarding-stages-admin': 'onboarding-stages-admin',
      'hierarchy-settings': 'hierarchy-settings',
      'automation': 'automation',
      'evaluate-review': 'evaluate-review',
      'profile-management': 'profile-management',
      'team-members': 'team-members',
      'document-upload-view': 'document-upload-view',
      'startup-graph': 'startup-graph',
      'stage-history': 'stage-history',
      'ai-chatbot': 'ai-chatbot',
      'chat-logs-archiving': 'chat-logs-archiving',
      'system-alerts': 'system-alerts',
      'evaluation-stage-alerts': 'evaluation-stage-alerts',
      'check-list': 'check-list',
      'reminder-customization': 'reminder-customization',
      'field-builder': 'field-builder',
      'event-workshop': 'event-workshop',
      'feedback-system': 'feedback-system',
      'security': 'security',
      'support-ticket': 'support-ticket'
    };
    
    if (pathToKeyMap[currentPath]) {
      setActiveItem(pathToKeyMap[currentPath]);
    } else if (currentPath === 'settings') {
      setActiveItem('role-access'); // Default to first option (Role & Access Control)
    }
  }, [location.pathname]);

  const settingsCategories = [
    {
      id: 'super-admin',
      label: 'Super Admin',
      icon: icons.SuperAdminIcon,
      items: [
        { key: 'role-access', label: 'Role & Access Control', path: '/global/settings/role-access', tagline: 'Manage user roles, permissions, and access control settings' },
        { key: 'admin-management', label: 'Admin (IC) Management', path: '/global/settings/admin-management', tagline: 'Configure admin accounts and institutional management' },
        { key: 'module-settings', label: 'Module Enable/Disable', path: '/global/settings/module-settings', tagline: 'Enable or disable platform modules and features' },
        { key: 'subscription-plan', label: 'Subscription Plan', path: '/global/settings/subscription-plan', tagline: 'Manage subscription plans and billing configurations' },
        { key: 'branding', label: 'Branding', path: '/global/settings/branding', tagline: 'Customize the platform\'s branding such as logo, theme, and UI appearance' }
      ]
    },
    {
      id: 'admin',
      label: 'Admin',
      icon: icons.AdminIcon,
      items: [
        { key: 'add-startups', label: 'Add Startups', path: '/global/settings/add-startups', tagline: 'Configure startup onboarding and registration settings' },
        { key: 'onboarding-stages-admin', label: 'Onboarding Stages', path: '/global/settings/onboarding-stages-admin', tagline: 'Configure startup onboarding workflow and stages' },
        { key: 'hierarchy-settings', label: 'Hierarchy Settings', path: '/global/settings/hierarchy-settings', tagline: 'Configure organizational hierarchy and structure' },
        { key: 'automation', label: 'Automation', path: '/global/settings/automation', tagline: 'Configure automation workflows and processes' },
        { key: 'evaluate-review', label: 'Evaluate & Review Setup', path: '/global/settings/evaluate-review', tagline: 'Set up evaluation criteria and review processes' }
      ]
    },
    {
      id: 'user',
      label: 'User',
      icon: icons.UserIcon1,
      items: [
        { key: 'profile-management', label: 'Profile Management', path: '/global/settings/profile-management', tagline: 'Configure user profile settings and customization options' },
        { key: 'team-members', label: 'Team Members', path: '/global/settings/team-members', tagline: 'Manage team member settings and collaboration features' },
        { key: 'document-upload-view', label: 'Document Upload/View', path: '/global/settings/document-upload-view', tagline: 'Configure document upload permissions and viewing settings' },
        { key: 'startup-graph', label: 'Startup Graph', path: '/global/settings/startup-graph', tagline: 'Configure startup progress visualization and graph display settings' },
        { key: 'stage-history', label: 'Stage History', path: '/global/settings/stage-history', tagline: 'Set up stage history tracking and archival settings' }
      ]
    },
    {
      id: 'message-setting',
      label: 'Message Setting',
      icon: icons.MessagingIcon,
      items: [
        { key: 'ai-chatbot', label: 'AI Chat Bot Settings', path: '/global/settings/ai-chatbot', tagline: 'Configure AI chatbot responses and conversation settings' },
        { key: 'chat-logs-archiving', label: 'Chat Logs & Archiving', path: '/global/settings/chat-logs-archiving', tagline: 'Manage chat log retention and archiving policies' }
      ]
    },
    {
      id: 'notification',
      label: 'Notification',
      icon: icons.NotificationIcon,
      items: [
        { key: 'system-alerts', label: 'System Alerts Settings', path: '/global/settings/system-alerts', tagline: 'Configure system-wide alert notifications and delivery methods' },
        { key: 'evaluation-stage-alerts', label: 'Evaluation/Stage Alerts Settings', path: '/global/settings/evaluation-stage-alerts', tagline: 'Set up evaluation and stage transition notifications' },
        { key: 'check-list', label: 'Check List', path: '/global/settings/check-list', tagline: 'Configure checklist settings and notification preferences' }
      ]
    },
    {
      id: 'customize-setting',
      label: 'Customize Setting',
      icon: icons.CustomizeIcon,
      items: [
        { key: 'field-builder', label: 'Field Builder', path: '/global/settings/field-builder', tagline: 'Create and customize form fields and data collection' },
        { key: 'event-workshop', label: 'Event & Workshop Setup', path: '/global/settings/event-workshop', tagline: 'Configure event and workshop management settings' }
      ]
    },
    {
      id: 'miscellaneous-setting',
      label: 'Miscellaneous Setting',
      icon: icons.MiscellaneousIcon,
      items: [
        { key: 'feedback-system', label: 'Feedback System', path: '/global/settings/feedback-system', tagline: 'Set up feedback collection and management system' },
        { key: 'security', label: 'Security (2FA, Privacy)', path: '/global/settings/security', tagline: 'Configure security settings including 2FA and privacy controls' },
        { key: 'support-ticket', label: 'Support Ticket Setup', path: '/global/settings/support-ticket', tagline: 'Configure support ticket system and workflow settings' }
      ]
    }
  ];

  const handleItemClick = (item) => {
    setActiveItem(item.key);
    navigate(item.path);
  };

  // Get current setting details
  const getCurrentSetting = () => {
    for (const category of settingsCategories) {
      const item = category.items.find(item => item.key === activeItem);
      if (item) {
        return item;
      }
    }
    return { label: 'Settings Overview', tagline: 'Manage and configure platform settings' };
  };

  const currentSetting = getCurrentSetting();

  // Render the appropriate component based on active item
  const renderActiveComponent = () => {
    switch (activeItem) {
      case 'role-access':
        return <RoleAndAccessSettings />;
      case 'admin-management':
        return <AdminManagementSettings />;
      case 'module-settings':
        return <ModuleSettings />;
      case 'subscription-plan':
        return <SubscriptionPlanSettings />;
      case 'branding':
        return <BrandingSettings />;
      case 'onboarding-stages':
        return <OnboardingStagesSettings />;
      
      // Admin Settings
      case 'onboarding-stages-admin':
        return <OnboardingStagesSettingsAdmin />;
      case 'hierarchy-settings':
        return <HierarchySettings />;
      case 'automation':
        return <AutomationSettings />;
      case 'evaluate-review':
        return <EvaluateandReviewSetupSettings />;
      case 'add-startups':
        return <AddStartupSettings />;
      
      // Messaging Settings
      case 'ai-chatbot':
        return <AiChatBotSettings />;
      case 'chat-logs-archiving':
        return <ChatLogsandArchiving />;
      
      // Notification Settings
      case 'system-alerts':
        return <SystemAlertsSettings />;
      case 'evaluation-stage-alerts':
        return <EvaluationorStageAlertsSettings />;
      case 'check-list':
        return <CheckList />;
      
      // User Settings
      case 'team-members':
        return <TeamMembersSettings />;
      case 'profile-management':
        return <ProfileManagementSettings />;
      case 'document-upload-view':
        return <DocumentUploadViewSettings />;
      case 'startup-graph':
        return <StartupGraphSettings />;
      case 'stage-history':
        return <StageHistorySettings />;
      
      // Customize Settings
      case 'field-builder':
        return <FieldBuilderSettings />;
      case 'event-workshop':
        return <EventWorkshopSettings />;
      
      // Miscellaneous Settings
      case 'feedback-system':
        return <FeedbackSystemSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'support-ticket':
        return <SupportTicketSettings />;
      
      default:
        return children;
    }
  };

  return (
    <div className="common-settings-layout">
      <aside className="settings-navbar">
        <div className="settings-navbar__list">
          {settingsCategories.map(category => (
            <div key={category.id} className="settings-category">
              <div className="settings-category__header">
                <img 
                  src={category.icon} 
                  alt={category.label}
                  className="settings-category__icon"
                />
                <span className="settings-category__label">{category.label}</span>
              </div>
              <ul className="settings-category__items">
                {category.items.map(item => (
                  <li key={item.key} className="settings-category__item">
                    <button
                      className={`settings-category__button${activeItem === item.key ? ' active' : ''}`}
                      onClick={() => handleItemClick(item)}
                    >
                      <img 
                        src={activeItem === item.key ? icons.SelectedListIcon : icons.ListIcon}
                        alt="arrow"
                        className={`settings-category__arrow${activeItem === item.key ? ' active' : ''}`}
                      />
                      <span className={`settings-category__text${activeItem === item.key ? ' active' : ''}`}>{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </aside>
      <main className="settings-main">
        <header className="settings-header">
          <div className="settings-header__content">
            <div className="settings-header__info">
              <h1 className="settings-header__title">{currentSetting.label.toUpperCase()}</h1>
              <p className="settings-header__tagline">{currentSetting.tagline}</p>
            </div>
            <div className="settings-header__search">
              <input
                type="text"
                placeholder="Search for setting options...."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="settings-header__search-input"
              />
              <img 
                src={icons.SearchIcon}
                alt="search"
                className="settings-header__search-icon"
              />
            </div>
          </div>
        </header>
        <div className="settings-content">
          {renderActiveComponent()}
        </div>
      </main>
    </div>
  );
};

export default CommonSettingsLayout;