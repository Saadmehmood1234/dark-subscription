"use server";
import { dbConnect } from "@/lib/dbConnect";
import { Category } from "@/model/Category";
import { Group } from "@/model/Group";
import { Product } from "@/model/Product";

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

export const getCategory = async () => {
  try {
    await dbConnect();
    const categoryData = await Category.find();
    console.log(categoryData);

    if (!categoryData || categoryData.length === 0) {
      return {
        success: false,
        message: "No Data available in group",
        status: 400,
      };
    }

    return {
      success: true,
      message: "Category fetched successfully",
      data: categoryData.map((category) => ({
        title: category.title,
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
