"use server";

import nodemailer from "nodemailer";
import type { SendMailOptions } from "nodemailer";
import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";

interface EmailParams {
  productName: string;
  orderId: string;
  websiteName?: string;
}

export async function sendConfirmationEmail(params: EmailParams) {
  try {
    const session = await getServerSession(authOptions);

    const email = session?.user?.email;
    const name = session?.user?.name || "Customer";

    if (!email) {
      return {
        success: false,
        message: "User email address is unavailable.",
      };
    }

    const smtpEmail = process.env.SMTP_EMAIL;
    const smtpPassword = process.env.SMTP_PASSWORD;
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || 465);

    if (!smtpEmail || !smtpPassword || !smtpHost) {
      console.error("Missing SMTP environment variables");

      return {
        success: false,
        message: "Email service is not configured.",
      };
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpEmail,
        pass: smtpPassword,
      },
      tls: {
        rejectUnauthorized: true,
      },
    });

    const websiteName = params.websiteName || "PrimeFlix";

    const mailOptions: SendMailOptions = {
      from: `"${websiteName}" <${smtpEmail}>`,
      to: email,
      subject: `Payment Successful - Your ${params.productName} Subscription is Confirmed!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px;">
          <h2 style="color: #16a34a; margin-bottom: 16px;">
            Payment Successful!
          </h2>

          <p>Dear ${name},</p>

          <p>
            Thank you for subscribing to
            <strong>${params.productName}</strong>.
            Your payment has been successfully processed.
          </p>

          <div style="background-color: #f9fafb; padding: 16px; margin: 20px 0; border-left: 4px solid #16a34a; border-radius: 6px;">
            <h3 style="margin-top: 0;">Order Details</h3>

            <p>
              <strong>Product:</strong>
              ${params.productName}
            </p>

            <p>
              <strong>Order ID:</strong>
              ${params.orderId}
            </p>

            <p>
              <strong>Date:</strong>
              ${new Date().toLocaleDateString("en-IN")}
            </p>
          </div>

          <p>
            You will receive your subscription details within the next
            24 hours.
          </p>

          <p>
            If you have any questions, please contact our support team.
          </p>

          <p>
            Best regards,<br />
            <strong>${websiteName} Team</strong>
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return {
      success: true,
      message: "Confirmation email sent successfully.",
    };
  } catch (error) {
    console.error("Error sending confirmation email:", error);

    return {
      success: false,
      message: "Failed to send confirmation email.",
    };
  }
}