import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { Order } from "@/model/Order";

export async function POST(request: NextRequest) {
  const { sessionId, orderId } = await request.json();
  // const { searchParams } = new URL(request.url);
  // const sessionId = searchParams.get("session_id");
  // const orderId = searchParams.get("order_id");
  console.log({ sessionId, orderId });
  if (!sessionId || !orderId) {
    return NextResponse.json(
      { success: false, error: "Missing parameters" },
      { status: 400 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status === "paid") {
      const order = await Order.findById(orderId)
        .populate("userId")
        .populate("products.productId");

      if (!order) {
        return NextResponse.json(
          { success: false, error: "order is not found" },
          { status: 400 }
        );
      }
      order.paymentStatus="paid";
      order.status="delivered";

      await order.save();
      if (order) {
        return NextResponse.json({
          success: true,
          email: order.userId.email,
          productName:
          order.products[0]?.productId?.title || "Subscription",
        });
      }
    }
    return NextResponse.json(
      { success: false, error: "Payment not verified" },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Server error" },
      { status: 500 }
    );
  }
}
