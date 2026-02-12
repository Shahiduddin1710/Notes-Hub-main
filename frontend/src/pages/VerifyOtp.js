import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthLayout from "../auth/AuthLayout";
import { verifyOtp } from "../services/auth.service";
import Message from "../components/Message";

export default function VerifyOtp() {
  const [params] = useSearchParams();
  const email = params.get("email");

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await verifyOtp(email, otp);

      setMessage({
        type: "success",
        text: "OTP verified successfully",
      });

      setTimeout(() => {
        navigate(`/reset-password?email=${email}`);
      }, 1200);
    } catch (err) {
      setMessage({
        type: "error",
        text:
          err.response?.data?.message ||
          "Invalid or expired OTP",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Verify OTP">
      <Message type={message?.type} text={message?.text} />

      <form onSubmit={submit}>
        <input
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        <button disabled={loading}>
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>
    </AuthLayout>
  );
}