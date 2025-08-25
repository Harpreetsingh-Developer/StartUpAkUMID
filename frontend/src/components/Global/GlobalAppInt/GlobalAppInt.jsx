import React from "react";
import "./GlobalAppInt.scss";
import icons from "../../../constants/icons";


const integrations = [
  {
    
    name: "EMailMyBoost",
    icon: (
      <img
        src={icons.MailMyBoostIcon}
        alt="Mail"
        className="integration-icon"
      />
    ),
    description:
      "Email My Boost is a smart notification system integrated into your incubation management platform, designed to keep stakeholders informed with real-time progress reports. Startups, mentors, and admins receive automated email summaries highlighting key milestones, pending tasks, and performance metrics ensuring transparency and accountability without manual follow-ups.",
    url: "https://emailmyboost.com",
  },
  {
    name: "Microsoft Teams",
    icon: (
      <img
        src={icons.TeamIcon}
        alt="Teams"
        className="integration-icon"
      />
    ),
    description:
      "Microsoft Teams is seamlessly integrated into your incubation management platform, enabling real-time collaboration between startups, mentors, and admins. With chat, video calls, and file sharing, Teams keeps communication centralized ensuring quick feedback, virtual meetings, and document collaboration without switching apps.",
    url: "https://teams.microsoft.com",
  },
  {
    name: "Google Calender",
    icon: (
      <img
        src={icons.CalendarIcon}
        alt="Calendar"
        className="integration-icon"
      />
    ),
    description:
      "With Google Calendar, you can quickly schedule meetings and events and get reminders about upcoming activities, so you always know what’s next. Calendar is designed for teams, so it’s easy to share your schedule with others and create multiple calendars that you and your team can use together.",
    url: "https://calendar.google.com",
  },
  {
    name: "360*FLOW",
    icon: (
      <img
        src={icons.Look360Icon}
        alt="360"
        className="integration-icon"
      />
    ),
    description:
      "360° Flow is a unified management system built into your incubation platform, providing end-to-end visibility across departments, clients, and stakeholders. Streamline operations, track interactions, and automate workflows—all from a single dashboard for seamless collaboration.",
    url: "https://360flow.com",
  },
  {
    name: "LinkedIn",
    icon: (
      <img
        src={icons.LinkedinIcon}
        alt="LinkedIn"
        className="integration-icon"
      />
    ),
    description:
      "LinkedIn is a professional networking platform connecting startups, students, and colleges for career opportunities. It enables startups to post internships and jobs, while students build profiles and network with industry professionals.",
    url: "https://linkedin.com",
  },
  {
    name: "Google Meet",
    icon: (
      <img
        src={icons.GoogleMeetIcon}
        alt="Google Meet"
        className="integration-icon"
      />
    ),
    description:
      "Google Meet is a video conferencing platform designed for secure and reliable virtual meetings. It supports high-quality video and audio, screen sharing, and real-time captions for accessibility. Integrated with Google Workspace, it enables seamless scheduling and collaboration for startups and colleges.",
    url: "https://meet.google.com",
  },
];



const AppIntegrationPanel = () => (
  <div className="app-integration-container">
    <div className="sticky-header">
      <h1>APP INTEGRATION</h1>
    </div>
    <div className="integration-panel">
      {integrations.map((app, idx) => (
        <div className="integration-card" key={idx}>
          <div className="integration-header">
            <span className="integration-icon-wrap">
              {typeof app.icon === "string" ? (
                <span className="integration-emoji">{app.icon}</span>
              ) : (
                app.icon
              )}
            </span>
            <span className="integration-title">{app.name}</span>
          </div>
          <hr className="integration-line" /> 
          <div className="integration-desc">{app.description}</div>
          <button
            className="view-details-btn"
            onClick={() => window.open(app.url, "_blank")}
          >
            VIEW DETAILS
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default AppIntegrationPanel;