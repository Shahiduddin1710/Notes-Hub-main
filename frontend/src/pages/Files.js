import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Files = () => {
  const { university, semester, subject } = useParams();

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/notes/${university}/${semester}/${subject}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await res.json();

        if (data.success) {
          const validFiles = data.notes.filter(
            file => !file.name.includes("emptyFolderPlaceholder")
          );

          setFiles(validFiles);

          if (validFiles.length === 0) {
            setError("This section will upload soon");
          }
        }
      } catch (err) {
        setError("Failed to load files");
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [university, semester, subject, token]);

  if (loading) return <h2>Loading Files...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="page-wrapper">
      <main className="page-container-wide">

        <div className="hero-card">
          <h1 className="hero-title">
            {subject.toUpperCase()} Files
          </h1>
        </div>

        <div className="notes-grid">
          {files.map((file, index) => (
            <div key={index} className="notes-card">
              <h3 className="card-title">{file.name}</h3>

              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`notes-btn ${
                  university === "msbte" ? "msbte" : "mu"
                }`}
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
