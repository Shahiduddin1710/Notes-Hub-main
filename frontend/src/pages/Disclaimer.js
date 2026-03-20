import React from "react";
import "../App.css";
import "./pages.css";

const ShieldIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const Disclaimer = () => {
  return (
    <div className="page-wrapper">
      <main className="page-container-main">
        <div className="hero-card">
          <div className="dash-card-icon dash-icon-violet" style={{ marginBottom: "1rem" }}>
            <ShieldIcon />
          </div>
          <h1 className="hero-title">Disclaimer &amp; Terms of Use</h1>
          <p className="hero-subtitle">
            Please read this carefully before using NotesHub.
          </p>
        </div>

        <div className="disclaimer-card">
          <p>
            NotesHub is an independent educational platform created to help students
            access study materials in an organized and user-friendly manner. While
            we aim to provide accurate and helpful academic resources, we do not
            guarantee that all content on this platform is completely error-free or
            updated at all times.
          </p>

          <p>
            The materials provided on NotesHub may include notes, previous question
            papers, subject references, or academic resources collected from various
            public and educational sources. These materials are shared only for
            learning and reference purposes.
          </p>

          <p>
            NotesHub is not officially affiliated with any university, board, or
            academic institution unless explicitly stated. All university names,
            logos, and academic references belong to their respective owners.
          </p>

          <p>
            We do not claim ownership of copyrighted academic content unless clearly
            mentioned. If any organization or individual believes that their
            copyrighted content has been shared improperly, they may contact us for
            prompt review and removal if required.
          </p>

          <p>NotesHub will not be held responsible for:</p>

          <ul>
            <li>Any academic loss caused by incorrect or outdated information</li>
            <li>Loss of data, results, marks, or exam-related misunderstandings</li>
            <li>Technical interruptions, website downtime, or service delays</li>
            <li>Any reliance placed on the materials available on this platform</li>
          </ul>

          <p>
            Students are strongly advised to verify important academic information
            such as syllabus updates, exam schedules, and official notices directly
            from their university or institute websites.
          </p>

          <p>
            By using NotesHub, you acknowledge and agree to this disclaimer policy
            and accept that the platform is intended purely as a supportive
            educational tool.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Disclaimer;