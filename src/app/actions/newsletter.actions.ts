"use server";

import { dbConnect } from "@/lib/dbConnect";
import { NewsletterSubscriber } from "@/model/NewsletterSubscriber";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const subscribeToNewsletter = async (email: string) => {
  try {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      return {
        success: false,
        message: "Please enter your email address.",
      };
    }

    if (!emailPattern.test(normalizedEmail)) {
      return {
        success: false,
        message: "Please enter a valid email address.",
      };
    }

    await dbConnect();

    const existingSubscriber =
      await NewsletterSubscriber.findOne({
        email: normalizedEmail,
      });

    if (existingSubscriber) {
      if (existingSubscriber.isActive) {
        return {
          success: true,
          message: "You are already subscribed to our newsletter.",
        };
      }

      existingSubscriber.isActive = true;
      existingSubscriber.subscribedAt = new Date();

      await existingSubscriber.save();

      return {
        success: true,
        message: "Your newsletter subscription has been restored.",
      };
    }

    await NewsletterSubscriber.create({
      email: normalizedEmail,
    });

    return {
      success: true,
      message: "Thanks for subscribing! Watch your inbox for updates.",
    };
  } catch (error: unknown) {
    console.error("Newsletter subscription error:", error);

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      return {
        success: true,
        message: "You are already subscribed to our newsletter.",
      };
    }

    return {
      success: false,
      message: "We couldn't subscribe you right now. Please try again.",
    };
  }
};