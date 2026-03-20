import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../App";
import "../App.css";
import "./pages.css";

const NotesIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const SupportIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="page-wrapper">
      <main className="page-container-main">
        <div className="hero-card">
          <h1 className="hero-title">
            Welcome back,<br />
            <span className="highlight-text">{user?.name || "Student"}</span>
          </h1>
          <p className="hero-subtitle">
            Your go-to spot for Mumbai University &amp; MSBTE notes. Let's crush those exams.
          </p>
        </div>

        <div className="card-grid">
          <div className="dashboard-card" onClick={() => navigate("/access-notes")}>
            <div className="dash-card-icon dash-icon-indigo">
              <NotesIcon />
            </div>
            <h2 className="card-title">Access Notes</h2>
            <p className="card-text">All your study materials, organized by semester and subject.</p>
          </div>

          <div className="dashboard-card" onClick={() => navigate("/contact")}>
            <div className="dash-card-icon dash-icon-blue">
              <SupportIcon />
            </div>
            <h2 className="card-title">Get Help</h2>
            <p className="card-text">Quick support whenever you're stuck or need assistance.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;