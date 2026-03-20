import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../App.css";
import "./pages.css";

const DotsLoader = () => (
  <div className="dots-loader-wrap">
    <p className="dots-loader-label">Loading Files</p>
    <div className="dots-loader">
      <span className="dot" />
      <span className="dot" />
      <span className="dot" />
    </div>
  </div>
);

const ClockIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const AlertIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const BackIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const Files = () => {
  const { university, semester, subject, subSubject } = useParams();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const token = localStorage.getItem("token");

  const apiUrl = subSubject
    ? `http://localhost:8000/api/notes/${university}/${semester}/${subject}/${subSubject}`
    : `http://localhost:8000/api/notes/${university}/${semester}/${subject}`;

  const displayTitle = subSubject
    ? subSubject.toUpperCase().replace(/-/g, " ")
    : subject.toUpperCase().replace(/-/g, " ");

  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true);
      setStatus(null);
      try {
        const res = await fetch(apiUrl, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();

        if (data.success) {
          const validFiles = data.notes.filter(
            file => !file.name.includes("emptyFolderPlaceholder")
          );
          if (validFiles.length === 0) {
            setStatus("empty");
          } else {
            setFiles(validFiles);
          }
        } else {
          setStatus("empty");
        }
      } catch (err) {
        setStatus("error");
      } finally {
        setLoading(false);
      }
    };
    fetchFiles();
  }, [apiUrl, token]);

  if (loading) return <DotsLoader />;

  if (status === "empty") return (
    <div className="page-wrapper">
      <main className="page-container-wide">
        <div className="hero-card">
          <button className="subjects-back-btn" onClick={() => navigate(-1)}>
            <BackIcon /> Go Back
          </button>
          <h1 className="hero-title">{displayTitle} Files</h1>
        </div>
        <div className="files-status-card">
          <div className="files-status-icon files-status-icon--soon">
            <ClockIcon />
          </div>
          <h3 className="files-status-title">Files Coming Soon</h3>
          <p className="files-status-desc">
            The files for <strong>{displayTitle}</strong> will be uploaded soon. Check back later!
          </p>
        </div>
      </main>
    </div>
  );

  if (status === "error") return (
    <div className="page-wrapper">
      <main className="page-container-wide">
        <div className="hero-card">
          <button className="subjects-back-btn" onClick={() => navigate(-1)}>
            <BackIcon /> Go Back
          </button>
          <h1 className="hero-title">{displayTitle} Files</h1>
        </div>
        <div className="files-status-card">
          <div className="files-status-icon files-status-icon--error">
            <AlertIcon />
          </div>
          <h3 className="files-status-title">Failed to Load</h3>
          <p className="files-status-desc">
            Something went wrong while loading files. Please try again later.
          </p>
          <button
            className="notes-btn mu"
            style={{ marginTop: "1rem", alignSelf: "center" }}
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </main>
    </div>
  );

  return (
    <div className="page-wrapper">
      <main className="page-container-wide">
        <div className="hero-card">
          <button className="subjects-back-btn" onClick={() => navigate(-1)}>
            <BackIcon /> Go Back
          </button>
          <h1 className="hero-title">{displayTitle} Files</h1>
          <p className="hero-subtitle">{files.length} file{files.length !== 1 ? "s" : ""} available</p>
        </div>

        <div className="notes-grid">
          {files.map((file, index) => (
            <div key={index} className="notes-card">
              <h3 className="card-title">{file.name}</h3>
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`notes-btn ${university === "msbte" ? "msbte" : "mu"}`}
              >
                Open →
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Files;