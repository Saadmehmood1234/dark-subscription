"use server";
import { DarkUser } from "@/model/User";
import { stripe } from "@/lib/stripe";
import { Order } from "@/model/Order";
import mongoose from "mongoose";
import type { Stripe } from "stripe";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { sendConfirmationEmail } from "./sendMail.actions";

interface CartItem {
  product: {
    id: string;
    title: string;
    price: number;
  };
  quantity: number;
}

interface OrderResponse {
  success: boolean;
  id: string;
  message: string;
  totalAmount: number;
}

export async function orderProduct(
  items: CartItem[],
  method: string
): Promise<OrderResponse> {
  const session = await mongoose.startSession();
  session.startTransaction();
  const userSession = await getServerSession(authOptions);

  try {
    const totalAmount = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const findUser = await DarkUser.findOne({
      email: userSession?.user?.email,
    }).session(session);

    if (!findUser) {
      throw new Error("User not found");
    }

    
    const newOrder = new Order({
      userId: findUser._id,
      products: items.map((item) => ({
        productId: new mongoose.Types.ObjectId(item.product.id),
        quantity: item.quantity,
      })),
      totalAmount,
      paymentMethod: method,
      paymentStatus: "processing",
      status: "processing",
    });

    const savedOrder = await newOrder.save({ session });

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.product.title,
          },
          unit_amount: Math.round(item.product.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&order_id=${savedOrder._id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel?order_id=${savedOrder._id}`,
      metadata: {
        orderId: savedOrder._id.toString(),
        userId: findUser._id.toString(),
      },
    } as Stripe.Checkout.SessionCreateParams);

    if (!stripeSession.id) {
      throw new Error("Failed to create Stripe session");
    }

    savedOrder.paymentId = stripeSession.id;
    await savedOrder.save({ session });
    await session.commitTransaction();

    return {
      success: true,
      id: savedOrder._id.toString(),
      message: "Order created successfully",
      totalAmount,
    };
  } catch (error) {
    await session.abortTransaction();
    console.error("Order creation error:", error);
    return {
      success: false,
      id: "",
      message:
        error instanceof Error ? error.message : "Failed to create order",
      totalAmount: 0,
    };
  } finally {
    session.endSession();
  }
}