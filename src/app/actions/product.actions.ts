"use server";
import { dbConnect } from "@/lib/dbConnect";
import { Product } from "@/model/Product";
import mongoose from "mongoose";
export async function getProduct() {
  try {
    await dbConnect();
    const products = await Product.find().lean();
    if (!products || products.length === 0) {
      return {
        success: false,
        message: "Could not find products",
        status: 400,
        data: [],
      };
    }
    const formattedProducts = products.map((product) => ({
      id: (product._id as mongoose.Types.ObjectId).toString(),
      title: product.title,
      description: product.description,
      price: product.price,
      discount: product.discount,
      category: product.category,
      stock: product.stock,
      originalPrice: product.originalPrice,
      logoImage: product.logoImage,
      features: product.features,
      images: product.images,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }));

    return {
      data: formattedProducts,
      success: true,
      message: "Products fetched successfully",
      status: 200,
    };
  } catch (error: any) {
    console.error("Error in getProduct:", error);
    return {
      success: false,
      message: "Server Error while fetching products",
      status: 500,
      data: [],
    };
  }
}

export async function getProductByCategoryName(category: string) {
  try {
    await dbConnect();
    const products = await Product.find({ category })
    if (!products || products.length === 0) {
      return {
        success: false,
        message: "Could not find products",
        status: 400,
        data: [],
      };
    }
   
    const formattedProducts = products.map((product) => ({
      id: (product._id as mongoose.Types.ObjectId).toString(),
      title: product.title,
      description: product.description,
      price: product.price,
      discount: product.discount,
      category: product.category,
      stock: product.stock,
      originalPrice: product.originalPrice,
      logoImage: product.logoImage,
      features: product.features,
      images: product.images,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }));

    return {
      data: formattedProducts,
      success: true,
      message: "Products fetched successfully",
      status: 200,
    };
  } catch (error: any) {
    console.error("Error in getProduct:", error);
    return {
      success: false,
      message: "Server Error while fetching products",
      status: 500,
      data: [],
    };
  }
}

export async function getProductByName(title: string) {
  try {
    await dbConnect();
    const product = await Product.findOne({ title })
   
    return {
      product: JSON.stringify(product),
      success: true,
      message: "Products fetched successfully",
      status: 200,
    };
  } catch (error: any) {
    console.error("Error in getProduct:", error);
    return {
      success: false,
      message: "Server Error while fetching products",
      status: 500,
      data: [],
    };
  }
}
