import React from "react";

const Disclaimer = () => {
  return (
    <div className="page-wrapper">
      <main className="page-container-main">

        <div
          style={{
            background: "white",
            padding: "3rem 3.5rem",
            borderRadius: "24px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            lineHeight: "1.8",
          }}
        >

          <h1
            style={{
              textAlign: "center",
              marginBottom: "2rem",
              fontSize: "2rem",
              fontWeight: "600",
              color: "#1e293b",
            }}
          >
            Disclaimer & Terms of Use
          </h1>

          <p style={{ marginBottom: "1.2rem", color: "#475569" }}>
            NotesHub is an independent educational platform created to help students
            access study materials in an organized and user-friendly manner. While
            we aim to provide accurate and helpful academic resources, we do not
            guarantee that all content on this platform is completely error-free or
            updated at all times.
          </p>

          <p style={{ marginBottom: "1.2rem", color: "#475569" }}>
            The materials provided on NotesHub may include notes, previous question
            papers, subject references, or academic resources collected from various
            public and educational sources. These materials are shared only for
            learning and reference purposes.
          </p>

          <p style={{ marginBottom: "1.2rem", color: "#475569" }}>
            NotesHub is not officially affiliated with any university, board, or
            academic institution unless explicitly stated. All university names,
            logos, and academic references belong to their respective owners.
          </p>

          <p style={{ marginBottom: "1.2rem", color: "#475569" }}>
            We do not claim ownership of copyrighted academic content unless clearly
            mentioned. If any organization or individual believes that their
            copyrighted content has been shared improperly, they may contact us for
            prompt review and removal if required.
          </p>

          <p style={{ marginBottom: "1.2rem", color: "#475569" }}>
            NotesHub will not be held responsible for:
          </p>

          <ul
            style={{
              paddingLeft: "1.5rem",
              marginBottom: "1.5rem",
              color: "#475569",
            }}
          >
            <li>Any academic loss caused by incorrect or outdated information</li>
            <li>Loss of data, results, marks, or exam-related misunderstandings</li>
            <li>Technical interruptions, website downtime, or service delays</li>
            <li>Any reliance placed on the materials available on this platform</li>
          </ul>

          <p style={{ marginBottom: "1.2rem", color: "#475569" }}>
            Students are strongly advised to verify important academic information
            such as syllabus updates, exam schedules, and official notices directly
            from their university or institute websites.
          </p>

          <p style={{ marginTop: "2rem", color: "#475569" }}>
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
