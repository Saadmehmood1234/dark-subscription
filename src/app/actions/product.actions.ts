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
    const products = await Product.find({ category });
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
    const product = await Product.findOne({ title });

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
      product: [],
    };
  }
}

export const filterProducts = async (search: string) => {
  try {
    const query = search.toLowerCase().trim();
    
    // Early return if empty query
    if (!query) {
      return {
        products: [],
        success: true,
        message: "Empty search query"
      };
    }

    const products = await Product.find({}).select("title description category price slug");
    
    const filteredProducts = products.filter((product) => {
      // Check if any field matches (OR condition instead of AND)
      return (
        product.title?.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query)
      );
    });

    return {
      products: JSON.stringify(filteredProducts), // Cleaner serialization
      success: true,
      message: "Successfully filtered products",
    };
  } catch (error) {
    console.error("Error in filterProducts:", error);
    return {
      success: false,
      message: "Server error while filtering products",
      products: [],
      status: 500
    };
  }
};


export const getProductNames = async()=>{
  try {
    await dbConnect();
    const products = await Product.find({}).select("title category slug");
    console.log(products,"pro")
    return {
      message:"product got",
      products:JSON.stringify(products),
      success:true
    }
  } catch (error:any) {
    return{
      message:error.message,
      success:false
    }
  }
}