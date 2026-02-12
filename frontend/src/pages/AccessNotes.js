import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import muLogo from "../assets/mu-logo.png";
import msbteLogo from "../assets/msbte-logo.png";

const AccessNotes = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedUniversity = (searchParams.get("uni") || "mu").toLowerCase();

  const universityData = {
    mu: [
      { id: 3, name: "Sem 3", subjects: 5, files: "20+"  },
      { id: 4, name: "Sem 4", subjects: 5, files: "10+"  }
    ],
    msbte: [
      { id: 4, name: "Sem 4", subjects: 3, files: 15 },
      { id: 5, name: "Sem 5", subjects: 3, files: 3 },
      { id: 6, name: "Sem 6", subjects: 5, files: 29 }
    ]
  };

  const currentFolders = universityData[selectedUniversity] || [];
  const isMuSelected = selectedUniversity === "mu";

  const openSemester = (semId) => {
    const semester = `sem${semId}`;
    navigate(`/subjects/${selectedUniversity}/${semester}`);
  };

  return (
    <div className="page-wrapper">
      <main className="page-container-wide">
        <div className="hero-card">
          <div className="card-icon">📚</div>
          <h1 className="hero-title">Access Your Notes</h1>
          <p className="hero-subtitle">
            Choose your university and semester to access study materials
          </p>
        </div>

        <div className="university-toggle">
          <button
            onClick={() => setSearchParams({ uni: "mu" })}
            className={`university-btn ${
              isMuSelected ? "active-mu" : "inactive"
            }`}
          >
            <img src={muLogo} alt="MU" className="toggle-logo" />
            Mumbai University
          </button>

          <button
            onClick={() => setSearchParams({ uni: "msbte" })}
            className={`university-btn ${
              !isMuSelected ? "active-msbte" : "inactive"
            }`}
          >
            <img src={msbteLogo} alt="MSBTE" className="toggle-logo" />
            MSBTE
          </button>
        </div>

        <div className="notes-container">
          <h2
            className="university-heading"
            style={{
              borderBottom: `3px solid ${
                isMuSelected ? "#4f46e5" : "#ea580c"
              }`
            }}
          >
            {isMuSelected ? (
              <>
                <img src={muLogo} alt="MU" className="uni-logo" />
                Mumbai University
              </>
            ) : (
              <>
                <img src={msbteLogo} alt="MSBTE" className="uni-logo" />
                MSBTE
              </>
            )}
          </h2>

          <div className="notes-grid">
            {currentFolders.map((folder) => (
              <div key={folder.id} className="notes-card">
                <h3 className="card-title">{folder.name}</h3>

                <p className="card-text">
                  {folder.subjects} Subjects • {folder.files} Files
                </p>

                <button
                  className={`notes-btn ${
                    isMuSelected ? "mu" : "msbte"
                  }`}
                  onClick={() => openSemester(folder.id)}
                >
                  View Notes →
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccessNotes;
