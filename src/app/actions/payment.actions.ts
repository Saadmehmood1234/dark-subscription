"use server";
import axios from "axios";
import { dbConnect } from "@/lib/dbConnect";
import { Order } from "@/model/Order";
import { Product } from "@/model/Product";
interface PaymentRequest {
  orderId: string;
  amount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

interface PaymentResponse {
  success: boolean;
  paymentLink?: string;
  error?: string;
}

export async function createPaymentLink(
  request: PaymentRequest
): Promise<PaymentResponse> {
  try {
    const cashfreeEndpoint =
      process.env.CASHFREE_TEST_MODE === "true"
        ? "https://sandbox.cashfree.com/pg/orders"
        : "https://api.cashfree.com/pg/orders";

    const validCustomerId = request.customerEmail
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .substring(0, 50);
    console.log("Using Cashfree headers:", {
      clientId: process.env.CASHFREE_APP_ID,
      clientSecret: process.env.CASHFREE_SECRET_KEY,
      endpoint: cashfreeEndpoint,
    });
    const response = await axios.post(
      cashfreeEndpoint,
      {
        order_id: request.orderId,
        order_amount: request.amount,
        order_currency: "INR",
        customer_details: {
          customer_id: validCustomerId,
          customer_name: request.customerName,
          customer_email: request.customerEmail,
          customer_phone: request.customerPhone,
        },
        order_meta: {
          return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/status?order_id=${request.orderId}`,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-client-id": process.env.CASHFREE_APP_ID,
          "x-client-secret": process.env.CASHFREE_SECRET_KEY,
          "x-api-version": "2023-08-01",
        },
      }
    );

    return {
      success: true,
      paymentLink: response.data.payment_link,
    };
  } catch (error: any) {
    console.error(
      "Payment creation failed:",
      error.response?.data || error.message
    );
    return {
      success: false,
      error: error.response?.data?.message || "Payment creation failed",
    };
  }
}
interface PaymentResponse {
  success: boolean;
  order?: any;
  product?: any;
  error?: string;
}

export async function verifyPaymentAndUpdateOrder(
  orderId: string
): Promise<PaymentResponse> {
  await dbConnect();

  if (!orderId) {
    return { success: false, error: "Missing order ID" };
  }

  try {
    // First verify payment with Cashfree
    const cashfreeEndpoint =
      process.env.CASHFREE_TEST_MODE === "true"
        ? `https://sandbox.cashfree.com/pg/orders/${orderId}/payments`
        : `https://api.cashfree.com/pg/orders/${orderId}/payments`;

    const response = await axios.get(cashfreeEndpoint, {
      headers: {
        "x-client-id": process.env.CASHFREE_APP_ID,
        "x-client-secret": process.env.CASHFREE_SECRET_KEY,
        "x-api-version": "2022-09-01",
      },
    });

    const payment = response.data[0]; // Get the first payment object

    if (payment.payment_status === "SUCCESS") {
      // Update order in database
      const order = await Order.findById(orderId);
      const productId = order?.products[0]?.productId;
      const product = await Product.findById(productId).select("title");

      if (!order) {
        return { success: false, error: "Order not found" };
      }

      // Update order status
      order.paymentStatus = "paid";
      order.status = "processing";
      await order.save();

      return {
        success: true,
        order,
        product,
      };
    }

    return {
      success: false,
      error: payment.payment_message || "Payment not verified",
    };
  } catch (error: any) {
    console.error(
      "Payment verification failed:",
      error.response?.data || error.message
    );
    return {
      success: false,
      error: error.response?.data?.message || "Payment verification failed",
    };
  }
}
