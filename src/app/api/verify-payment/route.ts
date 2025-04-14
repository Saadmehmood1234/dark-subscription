import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { Order } from "@/model/Order";

export async function GET(request: Request) {
  // const { searchParams } = new URL(request.url);
  // const sessionId = searchParams.get("session_id");
  // const orderId = searchParams.get("order_id");
  const orderId="test"
  const sessionId="tejds"
  if (!sessionId || !orderId) {
    return NextResponse.json(
      { success: false, error: "Missing parameters" },
      { status: 400 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        { paymentStatus: "paid", status: "completed" },
        { new: true }
      )
        .populate("userId")
        .populate("products.productId");

      if (updatedOrder) {
        return NextResponse.json({
          success: true,
          email: updatedOrder.userId.email,
          productName: updatedOrder.products[0]?.productId?.title || "Subscription",
        });
      }
    }
    return NextResponse.json(
      { success: false, error: "Payment not verified" },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}