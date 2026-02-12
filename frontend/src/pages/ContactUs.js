import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });

    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/auth/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
    } catch (error) {
      console.log(error);
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
          <div className="card-icon">💬</div>
          <h1 className="hero-title">Get Help Fast</h1>
          <p className="hero-subtitle">
            Have questions about notes or need assistance? We're here to help.
          </p>
        </div>

        <div
          className="contact-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(380px, 450px) 1fr",
            gap: "2rem",
          }}
        >
          <div className="contact-card">
            <h2 className="card-title">Contact Info</h2>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <div>
                <h3 className="card-title">Email</h3>
                <p className="card-text">techshaho786@gmail.com</p>
              </div>

              <div>
                <h3 className="card-title">Phone</h3>
                <p className="card-text">+91 9773166286</p>
              </div>

              <div>
                <h3 className="card-title">Hours</h3>
                <p className="card-text">Mon-Sat: 9AM-8PM</p>
              </div>
            </div>
          </div>

          <div className="contact-card">
            <h2 className="card-title">Send Message</h2>

            <form onSubmit={handleSubmit}>
              <div className="contact-form-grid">
                <div>
                  <label className="card-text">Full Name</label>
                  <input
                    className="input-field"
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="card-text">Email</label>
                  <input
                    className="input-field"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div style={{ marginBottom: "2.5rem" }}>
                <label className="card-text">Message</label>
                <textarea
                  className="textarea-field"
                  rows="5"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
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
