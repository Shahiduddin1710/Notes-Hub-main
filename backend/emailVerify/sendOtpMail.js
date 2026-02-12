import nodemailer from "nodemailer";
import "dotenv/config";

export const sendOtpMail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: `NotesHub <${process.env.MAIL_USER}>`,
    to: email,
    subject: "Password Reset OTP – NotesHub",
    html: `
      <div style="background:#f1f5f9;padding:30px;font-family:Arial,sans-serif">
        <div style="max-width:500px;margin:auto;background:#ffffff;padding:30px;border-radius:10px">

          <!-- HEADER (TEXT ONLY) -->
          <div style="text-align:center;margin-bottom:20px">
            <h2 style="color:#0A58CA;margin:0">NotesHub</h2>
          </div>

          <p style="color:#0f172a;font-size:15px">
            You requested to reset your password for your <b>NotesHub</b> account.
          </p>

          <p style="margin-top:20px">Your One-Time Password (OTP) is:</p>

          <!-- OTP BOX -->
          <div style="
            text-align:center;
            font-size:32px;
            font-weight:bold;
            letter-spacing:6px;
            color:#2563eb;
            margin:20px 0;
          ">
            ${otp}
          </div>

          <p style="font-size:14px;color:#334155">
            This OTP is valid for <b>10 minutes</b>.
          </p>

          <p style="font-size:14px;color:#334155">
            If you did not request this, you can safely ignore this email.
          </p>

          <hr style="margin:25px 0;border:none;border-top:1px solid #e5e7eb"/>

          <p style="font-size:12px;color:#64748b;text-align:center">
            © ${new Date().getFullYear()} NotesHub. All rights reserved.
          </p>

        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
