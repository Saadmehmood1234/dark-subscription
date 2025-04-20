"use server";
import { dbConnect } from "@/lib/dbConnect";
import { Category } from "@/model/Category";
import { Product } from "@/model/Product";

export const getCategory = async () => {
  try {
    await dbConnect();
    const categoryData = await Category.find();
    if (!categoryData) {
      return {
        success: false,
        message: "No Data available in category",
        status: 400,
      };
    }
    return {
      sucess: true,
      message: "Category Fetched Successfully",
      data: categoryData.map((category) => ({
        title: category.title,
        logoImage: category.logoImage,
      })),
      status: 200,
    };
  } catch (error: any) {
    return {
      success: false,
      message: "Server error in getting the Category",
      status: 500,
    };
  }
};

export const getCatgoryNames = async () => {
  try {
    const categories = await Category.find({});
    return {
      message: "categories got",
      categories: JSON.stringify(categories),
    };
  } catch (error: any) {
    return {
      message: error.message,
      success: false,
    };
  }
};
