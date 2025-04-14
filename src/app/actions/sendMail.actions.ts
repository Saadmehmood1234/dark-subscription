"use server";

import nodemailer from "nodemailer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
interface EmailParams {
  productName: string;
  orderId: string;
  websiteName?: string;
}

export async function sendConfirmationEmail(params: EmailParams) {
  const session = await getServerSession(authOptions);
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    const email = session?.user?.email;
    const name  = session?.user?.name;
    const mailOptions = {
      from: `"${params.websiteName || "Your Website"}" <${
        process.env.EMAIL_USER
      }>`,
      to:email,
      subject: `Payment Successful - Your ${params.productName} Subscription is Confirmed!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0;">
          <h2 style="color: #4CAF50;">Payment Successful!</h2>
          <p>Dear ${name},</p>
          
          <p>Thank you for subscribing to <strong>${
            params.productName
          }</strong>. Your payment has been successfully processed.</p>
          
          <div style="background-color: #f9f9f9; padding: 15px; margin: 20px 0; border-left: 4px solid #4CAF50;">
            <h3 style="margin-top: 0;">Order Details</h3>
            <p><strong>Product:</strong> ${params.productName}</p>
            <p><strong>Order ID:</strong> ${params.orderId}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
          
          <p>You will receive your subscription ID and password within the next 24 hours.</p>
          
          <p>If you have any questions, please contact our support team.</p>
          
          <p>Best regards,<br/>
          <strong>${params.websiteName || "Your Website"} Team</strong></p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return { success: true, message: "Confirmation email sent successfully" };
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    return { success: false, message: "Failed to send confirmation email" };
  }
}
