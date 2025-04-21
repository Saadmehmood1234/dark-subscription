"use server";
import { createTransport } from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import { DarkUser } from "@/model/User";
import { PasswordResetToken } from "@/model/ResetPassword";
import { hash } from "bcryptjs";
import { dbConnect } from "@/lib/dbConnect";
import nodemailer from "nodemailer";

export async function sendPasswordResetEmail(formData: FormData) {
  const identifier = formData.get("identifier") as string;

  try {
    await dbConnect();
    if (!identifier) {
      return {
        success: false,
        error: "Please provide either email or phone number",
      };
    }
    const user = await DarkUser.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });
    if (!user) {
      return { success: true };
    }
    const email = user.email;
    const token = uuidv4();
    const expiresAt = new Date(Date.now() + 3600000);
    await PasswordResetToken.findOneAndUpdate(
      { userId: user._id },
      { token, expiresAt, userId: user._id },
      { upsert: true, new: true }
    );
    const resetLink = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Password Reset Request",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #A92EDF;">Password Reset Request</h2>
          <p>You requested a password reset for your account. Click the button below to set a new password:</p>
          <a href="${resetLink}" 
             style="display: inline-block; padding: 12px 24px; background-color: #A92EDF; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 16px 0;">
            Reset Password
          </a>
          <p>This link will expire in 1 hour. If you didn't request this, please ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #eaeaea; margin: 24px 0;">
          <p style="font-size: 12px; color: #666;">
            If the button doesn't work, copy and paste this link into your browser:<br>
            ${resetLink}
          </p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Password reset error:", error);
    return {
      success: false,
      error: "Failed to send reset email. Please try again later.",
    };
  }
}

export async function resetPassword(formData: FormData) {
  const token = formData.get("token") as string;
  const password = formData.get("password") as string;

  try {
    await dbConnect();

    const resetToken = await PasswordResetToken.findOne({ token })
      .populate("userId")
      .exec();

    if (!resetToken || new Date() > resetToken.expiresAt) {
      return {
        success: false,
        error: "Invalid or expired token. Please request a new password reset.",
      };
    }
    const hashedPassword = await hash(password, 12);
    await DarkUser.findByIdAndUpdate(resetToken.userId._id, {
      password: hashedPassword,
    });
    await PasswordResetToken.deleteOne({ _id: resetToken._id });
    return { success: true };
  } catch (error) {
    console.error("Password reset error:", error);
    return {
      success: false,
      error: "Failed to reset password. Please try again.",
    };
  }
}
