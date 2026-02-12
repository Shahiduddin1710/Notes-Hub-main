import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import handlebars from "handlebars";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const verifyMail = async (token, email) => {
  try {
    const cleanEmail = String(email).trim();
    if (!cleanEmail) {
      throw new Error("Recipient email missing");
    }


    const verifyLink = `http://localhost:8000/api/auth/verify/${token}`;



    const source = fs.readFileSync(
      path.join(__dirname, "template.hbs"),
      "utf-8"
    );

    const template = handlebars.compile(source);

    
    const htmlToSend = template({
      verifyLink,
    });

    
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Notes Hub" <${process.env.MAIL_USER}>`,
      to: cleanEmail,
      subject: "Verify Your Email",
      html: htmlToSend,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("✅ EMAIL SENT SUCCESSFULLY");
    console.log("Message ID:", info.messageId);

  } catch (err) {
    console.error("❌ EMAIL FAILED:", err.message);
    throw err;
  }
};
