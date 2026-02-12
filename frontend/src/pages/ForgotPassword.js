import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../auth/AuthLayout";
import { sendResetOtp } from "../services/auth.service";
import Message from "../components/Message";

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

      setMessage({
        type: "success",
        text: res.data.message || "OTP sent successfully",
      });

      setTimeout(() => {
        navigate(`/verify-otp?email=${email}`);
      }, 1200);
    } catch (err) {
      setMessage({
        type: "error",
        text:
          err.response?.data?.message ||
          "Failed to send OTP. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Forgot password">
      <Message type={message?.type} text={message?.text} />

<form onSubmit={submit} className="auth-form">
  <input
    type="email"
    placeholder="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
  />

  <button disabled={loading}>
    {loading ? "Sending OTP..." : "Send OTP"}
  </button>
</form>
    </AuthLayout>
  );
}