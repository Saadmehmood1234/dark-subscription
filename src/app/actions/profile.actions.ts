"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";

import { authOptions } from "@/auth";
import { DarkUser } from "@/model/User";
import { deleteImageFromCloudinary } from "@/lib/cloudary/DeleteImage";
import { UploadImageOnCloudinary } from "@/lib/cloudary/UploadImage";
import getImageUrl from "@/lib/cloudary/GetImageUrl";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const updateUserProfile = async (formData: FormData) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return {
        success: false,
        message: "Please sign in to continue.",
        status: 401,
      };
    }

    const user = await DarkUser.findById(session.user.id);

    if (!user) {
      return {
        success: false,
        message: "User account not found.",
        status: 404,
      };
    }

    const name = String(formData.get("name") || "").trim();
    const imageFile = formData.get("image");

    if (name.length < 2 || name.length > 80) {
      return {
        success: false,
        message: "Name must contain between 2 and 80 characters.",
        status: 400,
      };
    }

    const updateData: Record<string, unknown> = {};

    if (name !== user.name) {
      updateData.name = name;
    }

    if (imageFile instanceof File && imageFile.size > 0) {
      if (!ALLOWED_IMAGE_TYPES.includes(imageFile.type)) {
        return {
          success: false,
          message: "Only JPG, PNG and WebP images are supported.",
          status: 400,
        };
      }

      if (imageFile.size > MAX_IMAGE_SIZE) {
        return {
          success: false,
          message: "Profile image must be smaller than 5 MB.",
          status: 400,
        };
      }

      const uploadResult = await UploadImageOnCloudinary(imageFile);

      if (uploadResult.error || !uploadResult.publicId) {
        return {
          success: false,
          message: uploadResult.error || "Profile image upload failed.",
          status: uploadResult.status || 500,
        };
      }

      updateData.profilePublicId = uploadResult.publicId;
      updateData.image = getImageUrl(uploadResult.publicId);

      if (user.profilePublicId) {
        await deleteImageFromCloudinary(user.profilePublicId).catch((error) => {
          console.error("Failed to remove previous profile image:", error);
        });
      }
    }

    if (Object.keys(updateData).length === 0) {
      return {
        success: true,
        message: "Your profile is already up to date.",
        data: {
          name: user.name,
          email: user.email,
          imageUrl: user.image,
        },
        status: 200,
      };
    }

    const updatedUser = await DarkUser.findByIdAndUpdate(
      session.user.id,
      {
        $set: updateData,
      },
      {
        new: true,
        runValidators: true,
      },
    ).lean();

    if (!updatedUser) {
      return {
        success: false,
        message: "Unable to update your profile.",
        status: 500,
      };
    }

    revalidatePath("/profile");

    return {
      success: true,
      message: "Profile updated successfully.",
      data: {
        name: String(updatedUser.name || ""),
        email: String(updatedUser.email || ""),
        imageUrl: String(updatedUser.image || ""),
      },
      status: 200,
    };
  } catch (error) {
    console.error("Profile update error:", error);

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to update your profile.",
      status: 500,
    };
  }
};
