import { useNavigate, useSearchParams } from "react-router-dom";
import muLogo from "../assets/mu-logo.png";
import msbteLogo from "../assets/msbte-logo.png";
import "./pages.css";

const BookOpenIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const AccessNotes = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedUniversity = (searchParams.get("uni") || "mu").toLowerCase();

  const universityData = {
    mu: [
      { id: 3, name: "Sem 3", subjects: 5, files: "20+" },
      { id: 4, name: "Sem 4", subjects: 5, files: "30+" },
    ],
    msbte: [
      { id: 4, name: "Sem 4", subjects: 3, files: 15 },
      { id: 5, name: "Sem 5", subjects: 3, files: 3 },
      { id: 6, name: "Sem 6", subjects: 5, files: 29 },
    ],
  };

  const currentFolders = universityData[selectedUniversity] || [];
  const isMuSelected = selectedUniversity === "mu";

  const openSemester = (semId) => {
    navigate(`/subjects/${selectedUniversity}/sem${semId}`);
  };

  return (
    <div className="page-wrapper">
      <main className="page-container">

        <div className="hero-card" style={{ textAlign: "center" }}>
          <div className="dash-card-icon dash-icon-indigo" style={{ margin: "0 auto 1rem" }}>
            <BookOpenIcon />
          </div>
          <h1 className="hero-title">Access Your Notes</h1>
          <p className="hero-subtitle">
            Choose your university and semester to access study materials.
          </p>
        </div>

        <div className="university-toggle">
          <button
            onClick={() => setSearchParams({ uni: "mu" })}
            className={`university-btn ${isMuSelected ? "active-mu" : "inactive"}`}
          >
            <img src={muLogo} alt="MU" className="toggle-logo" />
            Mumbai University
          </button>

          <button
            onClick={() => setSearchParams({ uni: "msbte" })}
            className={`university-btn ${!isMuSelected ? "active-msbte" : "inactive"}`}
          >
            <img src={msbteLogo} alt="MSBTE" className="toggle-logo" />
            MSBTE
          </button>
        </div>

        <div className="notes-container">
          <h2
            className="university-heading"
            style={{
              borderBottom: `3px solid ${isMuSelected ? "#4f46e5" : "#ea580c"}`,
              justifyContent: "flex-start",
              textAlign: "left",
            }}
          >
            <img
              src={isMuSelected ? muLogo : msbteLogo}
              alt={isMuSelected ? "MU" : "MSBTE"}
              className="toggle-logo"
            />
            {isMuSelected ? "Mumbai University" : "MSBTE"}
          </h2>

          <div className="notes-grid">
            {currentFolders.map((folder) => (
              <div key={folder.id} className="notes-card">
                <h3 style={{ margin: "0 0 4px", fontWeight: 700, fontSize: "1rem", color: "#0f172a" }}>
                  {folder.name}
                </h3>
                <p style={{ margin: 0, fontSize: "0.875rem", color: "#64748b" }}>
                  {folder.subjects} Subjects &bull; {folder.files} Files
                </p>
                <button
                  onClick={() => openSemester(folder.id)}
                  className={`notes-btn ${isMuSelected ? "mu" : "msbte"}`}
                  style={{ width: "100%", textAlign: "center", marginTop: 14 }}
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
