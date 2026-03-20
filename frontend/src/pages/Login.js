import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import AuthLayout from "../auth/AuthLayout";
import { login as loginService } from "../services/auth.service";
import Message from "../components/Message";
import { useAuth } from "../App";
import "../auth/auth.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { login } = useAuth();

  const infoMessage =
    params.get("verified") ? "Email verified! You can now log in." :
    params.get("reset") ? "Password updated! Please log in." : null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await loginService(form);
      login(res.data.user, res.data.accessToken);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Login failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout subtitle="Access shared notes" footer={<Link className="link" to="/signup">Create account</Link>}>
      {infoMessage && <Message type="success" text={infoMessage} />}
      <Message type={message?.type} text={message?.text} />
      <form onSubmit={submit}>
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <div className="auth-forgot-row">
          <Link to="/forgot-password">Forgot password?</Link>
        </div>
        <button disabled={loading}>{loading ? "Signing in..." : "Continue"}</button>
      </form>
    </AuthLayout>
  );
}