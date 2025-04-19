"use server";

import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

export async function createRazorpayOrder(
  amount: number,
  currency: string = "INR"
) {
  try {
    const options = {
      amount: amount * 100,
      currency,
    };

    const order = await razorpay.orders.create(options);
    return { success: true, order };
  } catch (error) {
    console.error("Razorpay error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
