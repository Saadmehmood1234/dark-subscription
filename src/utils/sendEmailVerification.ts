import { createTransport } from "nodemailer";
import validator from "validator";

export async function sendVerificationEmail(
  email: string | null | undefined,
  token: string
) {
  if (!email || !validator.isEmail(email)) {
    throw new Error("Invalid email address for verification");
  }
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
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 8px; overflow: hidden;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white;">
    <h1 style="margin: 0; font-weight: 300; font-size: 28px;">Welcome to PrimeFlix</h1>
    <p style="opacity: 0.9; margin: 10px 0 0; font-size: 16px;">Complete your registration</p>
  </div>
  
  <div style="padding: 30px;">
    <p style="font-size: 16px; line-height: 1.6; color: #555;">Thank you for joining us! Please verify your email address to get started:</p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="${verificationUrl}" 
         style="display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                color: white; text-decoration: none; border-radius: 30px; font-weight: 500; letter-spacing: 0.5px;
                box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3); transition: all 0.3s ease;">
        Verify Email Address
      </a>
    </div>
    
    <p style="font-size: 14px; line-height: 1.6; color: #888;">
      If you didn't create an account with us, please ignore this email or contact support if you have questions.
    </p>
  </div>
  
  <div style="background: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #999; border-top: 1px solid #eee;">
    <p style="margin: 0;">© ${new Date().getFullYear()} Your App Name. All rights reserved.</p>
  </div>
</div>
      `,
    text: `Please verify your email by visiting this URL: ${verificationUrl}`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Failed to send verification email:", error);
    throw new Error("Failed to send verification email");
  }
}
