"use server";
import { dbConnect } from "@/lib/dbConnect";
import { Cart } from "@/model/AddToCart";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { Product } from "@/model/Product";
import { sanitizeCart, SanitizedCart } from "@/utils/sanitize";
import { DarkUser } from "@/model/User";

interface CartItemInput {
  product: string | mongoose.Types.ObjectId;
  quantity: number;
  price: number;
  subscriptionPlan?: "monthly" | "yearly";
}
export const addItemToCart = async (
  data: CartItemInput & { operation?: string }
) => {
  await dbConnect();
  const session = await getServerSession(authOptions);
  console.log("Test",session)
  if (!session?.user?.email) {
    return {
      success: false,
      message: "Signin to continue",
      status: 401,
    };
  }

  try {
    const productId = new mongoose.Types.ObjectId(data.product);
    const product = await Product.findById(productId).lean();

    if (!product) {
      return {
        success: false,
        message: "Product not found",
        status: 404,
      };
    }

    const userData = await DarkUser.findOne({ email: session.user.email });
    if (!userData) {
      return {
        success: false,
        message: "User not found",
        status: 404,
      };
    }
    let cart = await Cart.findOne({ customer: userData._id }).populate(
      "items.product"
    );

    if (!cart) {
      // Cart doesn't exist yet
      if (data.operation === "increment") {
        return {
          success: false,
          message: "Cart not found",
          status: 404,
        };
      }

      cart = new Cart({
        customer: userData._id,
        items: [
          {
            product: productId,
            quantity: data.quantity,
            price: data.price * data.quantity,
            subscriptionPlan: data.subscriptionPlan,
          },
        ],
        totalPrice: data.price * data.quantity,
      });
    } else {
      const existingItemIndex = cart.items.findIndex(
        (item: any) =>
          item.product._id.toString() === productId.toString() &&
          item.subscriptionPlan === data.subscriptionPlan
      );

      if (existingItemIndex >= 0) {
        if (data.operation === "increment") {
          cart.items[existingItemIndex].quantity += 1;
        } else if (data.operation === "decrement") {
          cart.items[existingItemIndex].quantity -= 1;

          if (cart.items[existingItemIndex].quantity <= 0) {
            cart.items.splice(existingItemIndex, 1);
          }
        } else {
          cart.items[existingItemIndex].quantity = data.quantity;
        }

        if (cart.items[existingItemIndex]) {
          cart.items[existingItemIndex].price =
            cart.items[existingItemIndex].quantity * data.price;
        }
      } else {
        if (data.operation === "increment") {
          return {
            success: false,
            message: "Item not found in cart",
            status: 404,
          };
        }

        cart.items.push({
          product: productId,
          quantity: data.quantity,
          price: data.price * data.quantity,
          subscriptionPlan: data.subscriptionPlan,
        });
      }

      cart.totalPrice = cart.items.reduce(
        (sum: any, item: any) => sum + item.price,
        0
      );
    }

    await cart.save();

    const populatedCart = await Cart.findById(cart._id)
      .populate("items.product")
      .lean();

    return {
      success: true,
      message: "Cart updated successfully",
      data: sanitizeCart(populatedCart),
      status: 200,
    };
  } catch (error) {
    console.error("❌ Error Adding to Cart:", error);
    return {
      success: false,
      message: "Server Error in Adding to Cart",
      status: 500,
    };
  }
};

export const getCartByCustomer = async (): Promise<{
  success: boolean;
  message: string;
  cart?: SanitizedCart;
  status: number;
}> => {
  await dbConnect();
  const session = await getServerSession(authOptions);
  console.log("session",session)
  if (!session?.user?.id) {
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
    let cart = await Cart.findOne({ customer: userData._id }).populate(
      "items.product"
    );
    if (!cart) {
      return {
        success: true,
        message: "No cart found for this customer",
        cart: {
          _id: "",
          customer: session.user.id,
          items: [],
          totalPrice: 0,
        },
        status: 200,
      };
    }

    return {
      success: true,
      message: "Cart fetched successfully",
      cart: sanitizeCart(cart),
      status: 200,
    };
  } catch (error) {
    console.error("Error fetching cart:", error);
    return {
      success: false,
      message: "Server error while fetching cart",
      status: 500,
    };
  }
};

export const deleteCartItem = async (
  productId: string
): Promise<{
  success: boolean;
  message: string;
  cart?: SanitizedCart;
  status: number;
}> => {
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

    const cart = await Cart.findOne({ customer: userData._id }).populate(
      "items.product"
    );

    if (!cart) {
      return {
        success: false,
        message: "Cart not found",
        status: 404,
      };
    }

    const itemToRemove = cart.items.find(
      (item: any) => item.product._id.toString() === productId
    );

    if (!itemToRemove) {
      return {
        success: false,
        message: "Item not found in cart",
        status: 404,
      };
    }

    cart.items = cart.items.filter(
      (item: any) => item.product._id.toString() !== productId
    );

    cart.totalPrice = cart.items.reduce(
      (sum: any, item: any) => sum + item.price,
      0
    );

    await cart.save();

    const updatedCart = await Cart.findById(cart._id).populate("items.product");

    return {
      success: true,
      message: "Item removed from cart",
      cart: sanitizeCart(updatedCart),
      status: 200,
    };
  } catch (error) {
    console.error("❌ Error deleting cart item:", error);
    return {
      success: false,
      message: "Internal Server Error",
      status: 500,
    };
  }
};
