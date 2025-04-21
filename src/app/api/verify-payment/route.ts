import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { Order } from "@/model/Order";
import { dbConnect } from "@/lib/dbConnect";
import { DarkUser } from "@/model/User";
import { Product } from "@/model/Product";
export async function POST(request: NextRequest) {
  await dbConnect();
  const { sessionId, orderId } = await request.json();
  if (!sessionId || !orderId) {
    return NextResponse.json(
      { success: false, error: "Missing parameters" },
      { status: 400 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status === "paid") {
      const order = await Order.findById(orderId);
      const productId = order?.products[0]?.productId;
      const product = await Product.findById(productId).select("title");

      // .populate("userId")
      // .populate("products.productId");

      if (!order) {
        
        return NextResponse.json(
          { success: false, error: "order is not found" },
          { status: 400 }
        );
      }
      order.paymentStatus = "paid";
      order.status = "processing";

      await order.save();
      return NextResponse.json({
        success: true,
        product,
      });
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
