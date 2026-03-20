import React, { useState } from "react";
import "../App.css";
import "./pages.css";

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.77a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const MessageIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/auth/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        showToast("Message sent successfully!", "success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        showToast(data.message || "Something went wrong", "error");
      }
    } catch {
      showToast("Mail sending failed", "error");
    }
    setLoading(false);
  };

  return (
    <div className="page-wrapper">
      <main className="page-container-main">
        {toast.show && (
          <div className={`toast ${toast.type}`}>{toast.message}</div>
        )}

        <div className="hero-card">
          <div className="dash-card-icon dash-icon-blue" style={{ marginBottom: "1rem" }}>
            <MessageIcon />
          </div>
          <h1 className="hero-title">Get in Touch</h1>
          <p className="hero-subtitle">
            Have questions about notes or need assistance? We're here to help.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-card">
            <h2 className="card-title" style={{ marginBottom: "1.5rem" }}>Contact Info</h2>
            <div className="contact-info-list">
              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <MailIcon />
                </div>
                <div>
                  <p className="contact-info-label">Email</p>
                  <p className="contact-info-value">techshaho786@gmail.com</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <PhoneIcon />
                </div>
                <div>
                  <p className="contact-info-label">Phone</p>
                  <p className="contact-info-value">+91 9773166286</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <ClockIcon />
                </div>
                <div>
                  <p className="contact-info-label">Hours</p>
                  <p className="contact-info-value">Mon–Sat: 9AM – 8PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-card">
            <h2 className="card-title" style={{ marginBottom: "1.5rem" }}>Send a Message</h2>
            <form onSubmit={handleSubmit}>
              <div className="contact-form-grid">
                <div className="input-group">
                  <label className="input-label">Full Name</label>
                  <input
                    className="input-field"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">Email</label>
                  <input
                    className="input-field"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="input-group" style={{ marginBottom: "1.5rem" }}>
                <label className="input-label">Message</label>
                <textarea
                  className="textarea-field"
                  rows="5"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactUs;