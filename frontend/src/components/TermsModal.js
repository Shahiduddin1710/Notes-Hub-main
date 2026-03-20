import { useState } from "react";

export default function TermsModal({ onAccept, onDecline }) {
  const [choice, setChoice] = useState("");

  const isAccepted = choice === "accept";

  const handleAccept = async () => {
    try {
      const token = localStorage.getItem("token");

      await fetch("http://localhost:8000/api/terms/accept-terms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        user.termsAccepted = true;
        localStorage.setItem("user", JSON.stringify(user));
      }

      if (onAccept) onAccept();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDecline = () => {
    if (onDecline) onDecline();
  };

  return (
    <div className="terms-overlay">
      <div className="terms-box">
        <h2>NotesHub - Terms & Conditions & Privacy Policy</h2>

        <div className="terms-text">
          <p>
            Welcome to <strong>NotesHub</strong>. By accessing, registering, or
            using this platform, you agree to be legally bound by the following
            Terms & Conditions and Privacy Policy. If you do not agree, please
            discontinue use of the platform.
          </p>

          <h4>Purpose of NotesHub</h4>
          <p>
            NotesHub is an educational content-sharing platform created to help
            students access personal study notes, solved previous year question
            papers, and educational reference materials. All content is provided
            strictly for educational and self-learning purposes only.
          </p>

          <h4>No University or Board Affiliation</h4>
          <p>
            NotesHub is NOT associated, affiliated, endorsed, or owned by any
            university, education board, or government or private educational
            institution. References to universities, boards, courses, or
            examinations are used only for identification and informational
            purposes. All official content rights remain with their respective
            institutions.
          </p>

          <h4>User Responsibility</h4>
          <p>
            Users are solely responsible for how they use the content available
            on NotesHub. NotesHub does not guarantee academic results or exam
            outcomes. Users must not misuse, redistribute, or commercially
            exploit any content from the platform.
          </p>

          <h4>Content Accuracy Disclaimer</h4>
          <p>
            NotesHub does not guarantee that all content is accurate, complete,
            or up to date. Study material may be based on personal understanding
            and shared experiences. Users are advised to cross-verify information
            with official academic sources.
          </p>

          <h4>Account & Access Policy</h4>
          <p>
            Users must register and verify their email to access NotesHub. Users
            are responsible for maintaining the security of their account
            credentials. NotesHub reserves the right to restrict or terminate
            access if misuse or policy violation is detected.
          </p>

          <h4>Downloads & Usage Rights</h4>
          <p>
            Content may be viewed and downloaded only for personal educational
            use. Uploading illegal, misleading, or copyrighted material without
            permission is prohibited. Violations may result in immediate account
            suspension.
          </p>

          <h4>Limitation of Liability</h4>
          <p>
            NotesHub shall not be responsible for academic loss or
            misunderstanding, errors or omissions in study material, or platform
            unavailability or technical issues. All services are provided on an
            <strong> “AS IS”</strong> and <strong>“AS AVAILABLE”</strong> basis.
          </p>

          <h4>Changes to Terms</h4>
          <p>
            NotesHub reserves the right to update or modify these Terms &
            Conditions at any time. Continued use of the platform indicates
            acceptance of the revised terms.
          </p>

          <h4>Privacy Policy</h4>
          <p>
            NotesHub respects user privacy and is committed to protecting
            personal information.
          </p>

          <h4>Information We Collect</h4>
          <p>
            We collect only essential information required for account access
            and platform functionality, such as email address for authentication
            and account-related details provided during registration. No
            unnecessary personal data is collected.
          </p>

          <h4>Data Protection</h4>
          <p>
            User information is kept private and used only for platform
            functionality. NotesHub does not sell, rent, or share user data with
            third parties. Reasonable security practices are followed to protect
            stored information.
          </p>

          <h4>Contact</h4>
          <p>
            NotesHub does not guarantee dedicated customer support. Users may
            contact the platform through available channels for critical
            concerns.
          </p>

          <p>
            By selecting <strong>“Accept”</strong>, you confirm that you have
            read, understood, and agreed to the Terms & Conditions and Privacy
            Policy of NotesHub.
          </p>
        </div>

        <div className="terms-radio">
          <label>
            <input
              type="radio"
              name="terms"
              value="accept"
              onChange={(e) => setChoice(e.target.value)}
            />
            I Accept the Terms & Conditions
          </label>

          <label>
            <input
              type="radio"
              name="terms"
              value="decline"
              onChange={(e) => setChoice(e.target.value)}
            />
            I Do Not Accept
          </label>
        </div>

        <button
          className="terms-btn"
          disabled={!choice}
          onClick={isAccepted ? handleAccept : handleDecline}
          style={{
            opacity: choice ? 1 : 0.5,
            cursor: choice ? "pointer" : "not-allowed",
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
