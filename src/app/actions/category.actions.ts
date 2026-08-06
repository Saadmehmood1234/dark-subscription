"use server";
import { dbConnect } from "@/lib/dbConnect";
import { CategoryModel } from "@/model/Category";
import { Types } from "mongoose";
import { Group } from "@/model/Group";

type CategoryLean = {
  _id: Types.ObjectId;
  title: string;
  logoImage: string;
  status: "active" | "inactive";
  slug: string;
};

export const getCategory = async () => {
  try {
    await dbConnect();

    const categoryData = await CategoryModel.find({
      status: "active",
    })
      .select("_id title logoImage status slug")
      .sort({ createdAt: -1 })
      .lean<CategoryLean[]>();

    if (categoryData.length === 0) {
      return {
        success: false,
        message: "No categories available",
        data: [],
        status: 404,
      };
    }

    return {
      success: true,
      message: "Categories fetched successfully",
      data: categoryData.map((category) => ({
        id: category._id.toString(),
        title: category.title,
        logoImage: category.logoImage,
        status: category.status,
        slug: category.slug,
      })),
      status: 200,
    };
  } catch (error) {
    console.error("Category fetch error:", error);

    return {
      success: false,
      message: "Failed to fetch categories",
      data: [],
      status: 500,
    };
  }
};

export const getGroup = async () => {
  try {
    await dbConnect();
    const groupData = await Group.find();
    if (!groupData) {
      return {
        success: false,
        message: "No Data available in group",
        status: 400,
      };
    }
    return {
      sucess: true,
      message: "group Fetched Successfully",
      data: groupData.map((group) => ({
        title: group.title,
        logoImage: group.logoImage,
      })),
      status: 200,
    };
  } catch (error: any) {
    return {
      success: false,
      message: "Server error in getting the group",
      status: 500,
    };
  }
};

export const getGroupNames = async () => {
  try {
    await dbConnect();
    const groups = await Group.find({});
    return {
      message: "groups got",
      categories: JSON.stringify(groups),
      success: true,
    };
  } catch (error: any) {
    return {
      message: error.message,
      success: false,
    };
  }
};
