import React, { useState, useEffect } from "react";
import { Check, ThumbsUp, ThumbsDown } from "lucide-react";
import "./EvaluateandReviewSetupSettings.scss";

const EvaluateandReviewSetupSettings = () => {
  const [settings, setSettings] = useState({
    objectives: "Set quarterly goals",
    frequency: "Monthly",
    scoring: "1-5 Scale",
    reviewPeriod: "Monthly",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.id]: e.target.value,
    });
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      alert("Settings saved successfully!");
      console.log("Saved settings:", settings);
      setSaving(false);
    }, 1500);
  };

  const settingCards = [
    {
      id: "objectives",
      title: "Evaluation Objectives",
      type: "dropdown",
      options: [
        "Set quarterly goals",
        "Set monthly goals",
        "Set weekly goals",
        "Set daily goals",
      ],
      description:
        "Set up Evaluation objectives like Yearly, Monthly, Weekly, Daily and based on the Time.",
      search: "evaluation objectives quarterly goals yearly monthly weekly daily time",
    },
    {
      id: "evaluationType",
      title: "Evaluation Type",
      type: "list",
      items: [
        "Self-evaluation",
        "Mentor Evaluation",
        "Supervised Evaluation",
      ],
      description:
        "Set up Evaluation type like Self-evaluation, Mentor Evaluation, Supervised Evaluation.",
      search: "evaluation type self evaluation mentor supervised",
    },
    {
      id: "frequency",
      title: "Evaluation Frequency",
      type: "dropdown",
      options: ["Daily", "Weekly", "Monthly", "Quarterly", "Yearly"],
      description:
        "Set up Evaluation frequency like Yearly, Monthly, Weekly, Daily and based on the Time.",
      search: "evaluation frequency yearly monthly weekly daily time",
    },
    {
      id: "scoring",
      title: "Scoring Method",
      type: "dropdown",
      options: [
        "1-5 Scale",
        "1-10 Scale",
        "Percentage",
        "Letter Grade (A-F)",
        "Pass/Fail",
      ],
      description:
        "Set up Scoring method like 1-5 Scale, 1-10 Scale, Percentage, Letter Grade (A-F), Pass/Fail.",
      search: "scoring method 1-5 scale 1-10 percentage letter grade pass fail",
    },
    {
      id: "reviewerRoles",
      title: "Reviewer Roles",
      type: "icons",
      icons: ["👍", "👎"],
      description:
        "Mentors, Industry experts, Incubator staff track resource use, milestone achievement, and program alignment.",
      search: "reviewer roles mentors industry experts incubator staff",
    },
    {
      id: "reviewPeriod",
      title: null,
      type: "dropdown",
      options: ["Daily", "Weekly", "Monthly", "Quarterly", "Yearly"],
      description:
        "Review the Startup based on the Evaluation objection, Review tools and methods and Evaluation Type at a certain fixed periods.",
      search: "review period monthly evaluation tools methods",
    },
  ];

  const filteredCards = settingCards.filter((card) =>
    card.search.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="evaluate-review-setup">
      {/* Page Title */}
      <h1 className="page-title">Evaluate and Review Setup Settings</h1>

      {/* Header Section */}
      <div className="header-section">
        <div className="search-section">
          <div className="search-container">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search for setting options..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="save-button"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="row">
        {filteredCards.length > 0 ? (
          filteredCards.map((card) => (
            <div key={card.id} className="setting-card">
              {card.title && (
                <div className="card-header">
                  <div className="check-circle">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="#ffffff"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3>{card.title}</h3>
                </div>
              )}

              {card.type === "dropdown" && (
                <select
                  id={card.id}
                  className="setting-dropdown"
                  value={settings[card.id] || ""}
                  onChange={handleChange}
                >
                  {card.options.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}

              {card.type === "list" && (
                <div className="evaluation-types">
                  {card.items.map((item, i) => (
                    <div key={i} className="evaluation-type-item">
                      <div className="star-symbol-outline">☆</div>
                      <span className="type-text">{item}</span>
                    </div>
                  ))}
                </div>
              )}

              {card.type === "icons" && (
                <div className="reviewer-icons">
                  <ThumbsUp className="reviewer-icon" strokeWidth={2.5} />
                  <ThumbsDown className="reviewer-icon" strokeWidth={2.5} />
                </div>
              )}

              <div className="card-description">{card.description}</div>
            </div>
          ))
        ) : (
          <div className="no-results">
            No matching settings found. Try different search terms.
          </div>
        )}
      </div>
    </div>
  );
};

export default EvaluateandReviewSetupSettings;
