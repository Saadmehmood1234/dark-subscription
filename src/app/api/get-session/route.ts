import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("orderId");

  if (!orderId) {
    return NextResponse.json(
      { error: "Order ID is required" },
      { status: 400 }
    );
  }
  try {
    const sessions = await stripe.checkout.sessions.list({
      limit: 1,
      expand: ["data.payment_intent"],
    });

    if (sessions.data.length === 0 || !sessions.data[0].id) {
      throw new Error("Session not found");
    }

    return NextResponse.json({
      sessionId: sessions.data[0].id,
    });
  } catch (error) {
    console.error("Error retrieving session:", error);
    return NextResponse.json(
      { error: "Failed to retrieve session" },
      { status: 500 }
    );
  }
}
