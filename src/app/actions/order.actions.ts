"use server";

import { dbConnect } from "@/lib/dbConnect";
import { Order } from "@/model/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";

export const orderProduct = async (products: any[], paymentMethod: string) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return {
      success: false,
      message: "User not authenticated",
      status: 401,
    };
  }

  try {
    console.log("Data received for order:", products, paymentMethod);
    await dbConnect();
    if (!products || products.length === 0) {
      throw new Error("No products in order");
    }
    const totalAmount = products.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    const orderData = {
      userId: new mongoose.Types.ObjectId(session.user.id),
      products: products.map((item) => ({
        productId: new mongoose.Types.ObjectId(item.product._id),
        quantity: item.quantity,
      })),
      totalAmount,
      paymentMethod,
      status: "pending",
      paymentStatus: "pending",
    };

    const newOrder = new Order(orderData);
    const savedOrder = await newOrder.save();
    // revalidatePath("/orders");
    return {
      success: true,
      message: "Order created successfully",
      orderId: savedOrder._id.toString(),
      totalAmount,
    };
  } catch (error) {
    console.error("Error creating order:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to create order",
    };
  }
};

// async function updateProductStock(products: any[]) {
//   const Product =
//     mongoose.models?.Product ||
//     mongoose.model(
//       "Product",
//       new mongoose.Schema({
//         stock: Number,
//       })
//     );

//   for (const item of products) {
//     await Product.findByIdAndUpdate(item.product._id, {
//       $inc: { stock: -item.quantity },
//     });
//   }
// }
