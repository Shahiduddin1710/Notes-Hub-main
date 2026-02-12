import { Link } from "react-router-dom";
import AuthLayout from "../auth/AuthLayout";
import Message from "../components/Message";

export default function VerifyEmailSent() {
  return (
    <AuthLayout
      title="Verify your email"
      subtitle="We have sent a verification link to your email address"
      footer={
        <div style={{ textAlign: "center" }}>
          <Message
            type="success"
            text="Please check your inbox. After verification, you can login."
          />

          <Link className="link" to="/">
            Back to login
          </Link>
        </div>
      }
    />
  );
}