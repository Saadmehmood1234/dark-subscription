import { createTransport } from "nodemailer";
import validator from "validator";

export async function sendVerificationEmail(
  email: string | null | undefined,
  token: string
) {
  if (!email || !validator.isEmail(email)) {
    throw new Error("Invalid email address for verification");
  }
  console.log("email", email);
  console.log("token", token);
  const verificationUrl = `${process.env.NEXTAUTH_URL}/auth/verify-email?token=${token}`;

  if (
    !validator.isURL(verificationUrl, {
      protocols: ["http", "https"],
      require_protocol: true,
      host_whitelist: [new URL(process.env.NEXTAUTH_URL!).hostname],
    })
  ) {
    throw new Error("Invalid verification URL");
  }

  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
    secure: true,
    tls: {
      rejectUnauthorized: true,
    },
  });

  const mailOptions = {
    from: `"Your App Name" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: "Verify your email address",
    html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Welcome to Our App!</h1>
          <p style="font-size: 16px;">Please click the button below to verify your email address:</p>
          <a href="${verificationUrl}" 
             style="display: inline-block; padding: 12px 24px; background-color: #4CAF50; 
                    color: white; text-decoration: none; border-radius: 4px; margin: 20px 0;">
            Verify Email
          </a>
          <p style="font-size: 14px; color: #666;">
            If you didn't request this, please ignore this email.
          </p>
        </div>
      `,
    text: `Please verify your email by visiting this URL: ${verificationUrl}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error("Failed to send verification email:", error);
    throw new Error("Failed to send verification email");
  }
}
