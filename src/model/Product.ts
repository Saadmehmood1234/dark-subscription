import mongoose, { Schema, model, models } from "mongoose";

export const productSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    logoImage: { type: String, required: true },
    category: { type: String, required: true },
    group: { type: String, required: true },
    stock: { type: Number, required: true },
    features: { type: [String], required: true },
    images: { type: [String], required: true },
    slug:{
      type:String
    }
  },
  { timestamps: true }
);



export const Product = models?.Product || model("Product", productSchema);
