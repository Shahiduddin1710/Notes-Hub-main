import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../auth/AuthLayout";
import { sendResetOtp } from "../services/auth.service";
import Message from "../components/Message";
import "../auth/auth.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await sendResetOtp({ email });
      setMessage({ type: "success", text: res.data.message || "OTP sent to your email." });
      setTimeout(() => navigate(`/verify-otp?email=${email}`), 1200);
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Failed to send OTP. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout subtitle="Enter your email to receive an OTP" footer={<Link className="link" to="/login">Back to login</Link>}>
      <Message type={message?.type} text={message?.text} />
      <form onSubmit={submit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button disabled={loading}>{loading ? "Sending..." : "Send OTP"}</button>
      </form>
    </AuthLayout>
  );
}