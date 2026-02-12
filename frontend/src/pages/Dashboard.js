import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../App";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="page-wrapper">
      <main className="page-container-main">
        <div className="hero-card">
          <h1 className="hero-title">
            Welcome back,
            <br />
            <span className="highlight-text">{user?.name || "Student"}</span>
          </h1>

          <p className="hero-subtitle">
            Your go-to spot for Mumbai University & MSBTE notes. Let's crush those exams
          </p>
        </div>

        <div className="card-grid">
          <div className="dashboard-card" onClick={() => navigate("/access-notes")}>
            <div className="card-icon">📚</div>

            <h2 className="card-title">Access Notes</h2>

            <p className="card-text">All your study materials</p>
          </div>

          <div className="dashboard-card" onClick={() => navigate("/contact")}>
            <div className="card-icon">💬</div>

            <h2 className="card-title">Get Help</h2>

            <p className="card-text">Quick support when stuck</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
