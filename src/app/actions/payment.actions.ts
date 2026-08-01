"use server";

import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { dbConnect } from "@/lib/dbConnect";
import { DarkUser } from "@/model/User";
import { Order } from "@/model/Order";
import { Product } from "@/model/Product";
import { sendConfirmationEmail } from "./sendMail.actions";

const UPI_ID = process.env.UPI_ID || "9773834796@axl";
const UPI_PAYEE_NAME = process.env.UPI_PAYEE_NAME || "PrimeFlix";

interface CheckoutItem {
  productId: string;
  quantity: number;
}

interface PaymentResponse {
  success: boolean;
  orderId?: string;
  totalAmount?: number;
  upiUri?: string;
  upiId?: string;
  payeeName?: string;
  paymentStatus?: "processing" | "verification_pending" | "paid" | "failed";
  productName?: string;
  error?: string;
}

async function getAuthenticatedUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;
  return DarkUser.findOne({ email: session.user.email });
}

export async function createQrOrder(request: {
  items: CheckoutItem[];
}): Promise<PaymentResponse> {
  if (!Array.isArray(request.items) || request.items.length === 0) {
    return { success: false, error: "Your cart is empty" };
  }

  await dbConnect();

  try {
    const user = await getAuthenticatedUser();
    if (!user) return { success: false, error: "Please sign in to continue" };

    const quantities = new Map<string, number>();
    for (const item of request.items) {
      if (
        !mongoose.isValidObjectId(item.productId) ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1
      ) {
        return { success: false, error: "Your cart contains an invalid item" };
      }
      quantities.set(
        item.productId,
        (quantities.get(item.productId) || 0) + item.quantity
      );
    }

    const products = await Product.find({
      _id: { $in: [...quantities.keys()] },
    }).lean();

    if (products.length !== quantities.size) {
      return { success: false, error: "One or more products are unavailable" };
    }

    const orderItems = products.map((product: any) => {
      const quantity = quantities.get(product._id.toString())!;
      if (quantity > product.stock) {
        throw new Error(`${product.title} does not have enough stock`);
      }
      return { productId: product._id, quantity };
    });

    const totalAmount = Number(
      products
        .reduce(
          (sum: number, product: any) =>
            sum + Number(product.price) * quantities.get(product._id.toString())!,
          0
        )
        .toFixed(2)
    );

    if (!Number.isFinite(totalAmount) || totalAmount <= 0) {
      return { success: false, error: "The order total is invalid" };
    }

    const order = await Order.create({
      userId: user._id,
      products: orderItems,
      totalAmount,
      paymentMethod: "upi_qr",
      paymentStatus: "processing",
      status: "processing",
    });

    const params = new URLSearchParams({
      pa: UPI_ID,
      pn: UPI_PAYEE_NAME,
      am: totalAmount.toFixed(2),
      cu: "INR",
      tn: `${UPI_PAYEE_NAME} order ${order._id}`,
      tr: order._id.toString(),
    });

    return {
      success: true,
      orderId: order._id.toString(),
      totalAmount,
      upiUri: `upi://pay?${params.toString()}`,
      upiId: UPI_ID,
      payeeName: UPI_PAYEE_NAME,
      paymentStatus: "processing",
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unable to create order";
    console.error("QR order creation failed:", message);
    return { success: false, error: message };
  }
}

export async function submitPaymentReference(
  orderId: string,
  reference: string
): Promise<PaymentResponse> {
  const normalizedReference = reference.trim().toUpperCase();
  if (!mongoose.isValidObjectId(orderId)) {
    return { success: false, error: "Invalid order ID" };
  }
  if (!/^[A-Z0-9]{8,30}$/.test(normalizedReference)) {
    return { success: false, error: "Enter a valid 8-30 character UTR/reference" };
  }

  await dbConnect();

  try {
    const user = await getAuthenticatedUser();
    if (!user) return { success: false, error: "Please sign in to continue" };

    const duplicate = await Order.findOne({
      paymentId: normalizedReference,
      _id: { $ne: orderId },
    }).select("_id");
    if (duplicate) {
      return { success: false, error: "This payment reference has already been submitted" };
    }

    const order = await Order.findOne({ _id: orderId, userId: user._id });
    if (!order) return { success: false, error: "Order not found" };
    if (order.paymentStatus === "paid") {
      return { success: true, orderId, paymentStatus: "paid" };
    }
    if (order.paymentStatus === "failed") {
      return { success: false, error: "This payment was rejected. Contact support." };
    }

    order.paymentId = normalizedReference;
    order.paymentStatus = "verification_pending";
    order.paymentSubmittedAt = new Date();
    await order.save();

    return { success: true, orderId, paymentStatus: "verification_pending" };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unable to submit reference";
    return { success: false, error: message };
  }
}

export async function getQrPaymentStatus(orderId: string): Promise<PaymentResponse> {
  if (!mongoose.isValidObjectId(orderId)) {
    return { success: false, error: "Invalid order ID" };
  }

  await dbConnect();

  try {
    const user = await getAuthenticatedUser();
    if (!user) return { success: false, error: "Please sign in to continue" };

    const order: any = await Order.findOne({ _id: orderId, userId: user._id })
      .populate("products.productId", "title")
      .exec();
    if (!order) return { success: false, error: "Order not found" };

    const productName = order.products
      .map((item: any) => item.productId?.title)
      .filter(Boolean)
      .join(", ");

    if (order.paymentStatus === "paid" && !order.confirmationEmailSentAt) {
      const emailResult = await sendConfirmationEmail({
        productName: productName || "your purchase",
        orderId,
        websiteName: process.env.NEXT_PUBLIC_WEBSITE_NAME || "PrimeFlix",
      });
      if (emailResult.success) {
        order.confirmationEmailSentAt = new Date();
        await order.save();
      }
    }

    return {
      success: true,
      orderId,
      productName,
      paymentStatus: order.paymentStatus,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unable to check payment";
    return { success: false, error: message };
  }
}
