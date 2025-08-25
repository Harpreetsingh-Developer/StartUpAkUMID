import React from "react";
import "./Annoucement.scss";

const Announcement = React.memo(function Announcement({
  announcements = [],
  className = "",
}) {
  if (announcements.length === 0) return null;

  return (
    <div
      className={`announcement-bar ${className}`}
      aria-live="polite"
      role="status"
    >
      <span className="announcement-label">📢 Announcement:</span>
      <div className="announcement-content-wrapper">
        <div
          className="announcement-content"
          style={{
            minWidth: "100%",
            animation: "marquee 20s linear infinite"
          }}
        >
          {announcements.map((msg, idx) => (
            <span key={idx} className="announcement-message">
              {msg}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});

export default Announcement;