import { NextResponse } from "next/server";
import { verifyPaymentAndUpdateOrder } from "@/app/actions/payment.actions";

export async function POST(request: Request) {
  const { orderId } = await request.json();

  if (!orderId) {
    return NextResponse.json(
      { success: false, error: "Missing order ID" },
      { status: 400 }
    );
  }

  try {
    const result = await verifyPaymentAndUpdateOrder(orderId);

    if (result.success) {
      return NextResponse.json({
        success: true,
        order: result.order,
        product: result.product,
      });
    }

    return NextResponse.json(
      { success: false, error: result.error || "Payment verification failed" },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Server error" },
      { status: 500 }
    );
  }
}
