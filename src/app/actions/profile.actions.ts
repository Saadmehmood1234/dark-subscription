"use server";
import { DarkUser } from "@/model/User";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { deleteImageFromCloudinary } from "@/lib/cloudary/DeleteImage";
import { UploadImageOnCloudinary } from "@/lib/cloudary/UploadImage";
import getImageUrl from "@/lib/cloudary/GetImageUrl";

const ALLOWED_FIELDS = ["name", "email", "bio", "website", "username"];

export const updateUserProfile = async (formData: FormData) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return { success: false, message: "Signin to continue", status: 401 };
    }

    const findUser = await DarkUser.findById(session.user?.id);
    if (!findUser) {
      return { success: false, message: "User not found", status: 404 };
    }
    const profileData: Record<string, any> = {};
    for (const key of ALLOWED_FIELDS) {
      const value = formData.get(key);
      if (value !== null) {
        profileData[key] = value;
      }
    }
    
    const imageFile = formData.get("image") as File | null;

    const updateData: { [key: string]: any } = {};
    for (const key of ALLOWED_FIELDS) {
      if (profileData[key] !== undefined && profileData[key] !== findUser[key]) {
        updateData[key] = profileData[key];
      }
    }

    if (imageFile && imageFile.size > 0) {
      const uploadResult = await UploadImageOnCloudinary(imageFile);
      
      if (uploadResult.error) {
        return { 
          success: false, 
          message: uploadResult.error, 
          status: uploadResult.status || 400 
        };
      }

      if (!uploadResult.publicId) {
        return { 
          success: false, 
          message: "Image upload failed", 
          status: 500 
        };
      }
      if (findUser.profilePublicId) {
        await deleteImageFromCloudinary(findUser.profilePublicId).catch(err => {
          console.error("Failed to delete old image:", err);
        });
      }

      updateData.profilePublicId = uploadResult.publicId;
      updateData.imageUrl = getImageUrl(uploadResult.publicId);
    }

    if (Object.keys(updateData).length === 0) {
      return { success: true, message: "No changes detected", status: 200 };
    }

    const updatedUser = await DarkUser.findByIdAndUpdate(
      session.user?.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return { success: false, message: "Update failed", status: 500 };
    }

    return {
      success: true,
      message: "Profile updated successfully",
      data: {
        name: updatedUser.name,
        email: updatedUser.email,
        imageUrl: updatedUser.imageUrl,
      },
      status: 200
    };

  } catch (error) {
    console.error("Profile update error:", error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : "Update failed",
      status: 500 
    };
  }
};