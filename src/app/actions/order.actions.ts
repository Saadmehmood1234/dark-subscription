"use server";
import { DarkUser } from "@/model/User";
import { dbConnect } from "@/lib/dbConnect";
import { Order } from "@/model/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";

// export const orderProduct = async (products: any[], paymentMethod: string) => {
//   await dbConnect();

//   const session = await getServerSession(authOptions);

//   if (!session?.user?.email) {
//     return {
//       success: false,
//       message: "Signin to continue",
//       status: 401,
//     };
//   }

//   try {
//     console.log("Data received for order:", products, paymentMethod);

//     if (!products || products.length === 0) {
//       throw new Error("No products in order");
//     }

//     const totalAmount = products.reduce((sum, item) => {
//       return sum + item.price * item.quantity;
//     }, 0);

//     // FIX: Use email to find the user instead of user.id
//     const userData = await DarkUser.findOne({ email: session.user.email });
//     if (!userData) {
//       return {
//         success: false,
//         message: "User not found",
//         status: 404,
//       };
//     }

//     const orderData = {
//       userId: new mongoose.Types.ObjectId(userData._id), // Use userData._id
//       products: products.map((item) => ({
//         productId: new mongoose.Types.ObjectId(item.product._id),
//         quantity: item.quantity,
//       })),
//       totalAmount,
//       paymentMethod,
//       status: "pending",
//       paymentStatus: "pending",
//     };

//     const newOrder = new Order(orderData);
//     const savedOrder = await newOrder.save();

//     return {
//       success: true,
//       message: "Order created successfully",
//       orderId: savedOrder._id.toString(),
//       totalAmount,
//     };
//   } catch (error) {
//     console.error("❌ Error creating order:", error);
//     return {
//       success: false,
//       message:
//         error instanceof Error ? error.message : "Failed to create order",
//     };
//   }
// };

export const getUserOrder = async () => {
  await dbConnect();

  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return {
      success: false,
      message: "Signin to continue",
      status: 401,
    };
  }

  try {
    const userData = await DarkUser.findOne({ email: session.user.email });
    if (!userData) {
      return {
        success: false,
        message: "User not found",
        status: 404,
      };
    }

    const orders = await Order.find({
      userId: new mongoose.Types.ObjectId(userData._id),
    }).populate({
      path: "products.productId",
      select: "title logoImage price category", 
    });

    if (!orders || orders.length === 0) {
      return {
        success: false,
        message: "No orders found",
        status: 404,
      };
    }

    console.log("Orders fetched successfully:", orders);

    return {
      success: true,
      message: "Orders fetched successfully",
      orders: orders.map((order) => ({
        id: order._id.toString(),
        products: order.products
          .filter((item:any) => item.productId) 
          .map((item:any) => ({
            product: {
              id: item.productId._id.toString(),
              title: item.productId.title,
              logoImage: item.productId.logoImage,
              price: item.productId.price,
              category: item.productId.category,
            },
            quantity: item.quantity,
          })),
        totalAmount: order.totalAmount,
        paymentMethod: order.paymentMethod,
        status: order.status,
        paymentStatus: order.paymentStatus,
        createdAt: order.createdAt,
      })),
    };
  } catch (error) {
    console.error("❌ Error in getUserOrder:", error);
    return {
      success: false,
      message: "Server Error in fetching orders",
      status: 500,
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
