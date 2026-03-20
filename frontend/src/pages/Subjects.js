import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../App.css";
import "./pages.css";

const BackIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const Subjects = () => {
  const { university, semester } = useParams();
  const navigate = useNavigate();
  const [activeParent, setActiveParent] = useState(null);

  const subjectsData = {
    mu: {
      sem3: ["aoa", "coa", "maths", "dsgt", "genai"],
      sem4: ["syllabus", "cth", "os", "dbms", "web-technologies", "oe-ibs", "lab-experiments", "assignments"]
    },
    msbte: {
      sem4: ["important-questions", "microproject", "syllabus"],
      sem5: ["microproject", "answers", "manual"],
      sem6: ["eti", "important-answers", "manual", "mgt", "microproject"]
    }
  };

  const nestedSubjects = {
    "lab-experiments": ["dbms", "os", "web-tech"],
    "assignments": ["cth", "dbms", "os", "web-tech", "ibs"]
  };

  const subjects = subjectsData[university]?.[semester] || [];
  const isMu = university === "mu";

  const handleSubjectClick = (subject) => {
    if (nestedSubjects[subject]) {
      setActiveParent(subject);
    } else {
      navigate(`/notes/${university}/${semester}/${subject}`);
    }
  };

  const handleSubClick = (sub) => {
    navigate(`/notes/${university}/${semester}/${activeParent}/${sub}`);
  };

  const displayList = activeParent ? nestedSubjects[activeParent] : subjects;

  return (
    <div className="page-wrapper">
      <main className="page-container-main">
        <div className="hero-card">
          {activeParent && (
            <button
              className="subjects-back-btn"
              onClick={() => setActiveParent(null)}
            >
              <BackIcon />
              Back to {semester.toUpperCase()} Subjects
            </button>
          )}
          <h1 className="hero-title">
            {activeParent
              ? activeParent.toUpperCase().replace(/-/g, " ")
              : `${semester.toUpperCase()} Subjects`}
          </h1>
          <p className="hero-subtitle">
            {activeParent
              ? `Select a subject inside ${activeParent.replace(/-/g, " ")}.`
              : "Select a subject to view available files and notes."}
          </p>
        </div>

        <div className="notes-grid">
          {displayList.map((item, index) => (
            <div key={index} className="notes-card">
              <h3 className="card-title">
                {item.toUpperCase().replace(/-/g, " ")}
              </h3>
              {nestedSubjects[item] && !activeParent && (
                <p className="card-text" style={{ marginBottom: 0 }}>
                  {nestedSubjects[item].length} subjects
                </p>
              )}
              <button
                className={`notes-btn ${isMu ? "mu" : "msbte"}`}
                onClick={() =>
                  activeParent ? handleSubClick(item) : handleSubjectClick(item)
                }
              >
                {nestedSubjects[item] && !activeParent ? "View →" : "Open →"}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Subjects;