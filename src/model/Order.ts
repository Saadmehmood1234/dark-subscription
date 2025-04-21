import mongoose, { Schema, model, models } from "mongoose";

interface IOrderItem {
  productId: mongoose.Types.ObjectId;
  quantity: number;
}

interface IOrder {
  userId: mongoose.Types.ObjectId;
  products: IOrderItem[];
  totalAmount: number;
  status: "processing" | "delivered" | "cancelled";
  paymentStatus: "processing" | "paid" | "failed";
  paymentMethod: string;
  paymentId?: string;
  orderEmail?: string;
  credentials?: Array<{
    product: string;
    email: string;
    password: string;
    text: string;
  }>;
  createdAt?: Date;
  updatedAt?: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "DarkUser", required: true },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["processing", "delivered", "cancelled"],
      default: "processing",
    },
    paymentStatus: {
      type: String,
      enum: ["processing", "paid", "failed"],
      default: "processing",
    },
    paymentMethod: { type: String, required: true },
    orderEmail: String,
    paymentId: String,
    credentials: [
      {
        product: String,
        email: String,
        password: String,
        text: String,
      },
    ],
  },
  { timestamps: true }
);

export const Order = models?.Order || model<IOrder>("Order", orderSchema);