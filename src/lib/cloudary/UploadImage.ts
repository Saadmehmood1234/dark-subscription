// import { v2 as cloudinary } from "cloudinary";
// import { NextResponse } from "next/server";
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });
// export const UploadImageOnCloudinary = async (image: File): Promise<string | NextResponse> => {
//   if (!image) {
//     return NextResponse.json(
//       { error: "No image file provided." },
//       { status: 400 }
//     );
//   }

//   if (image.size > 5 * 1024 * 1024) {
//     return NextResponse.json(
//       { error: "File size too large. Maximum size is 5MB." },
//       { status: 400 }
//     );
//   }

//   if (!image.type.startsWith("image/")) {
//     return NextResponse.json(
//       { error: "Invalid file type. Only images are allowed." },
//       { status: 400 }
//     );
//   }

//   try {
//     // Convert the image to a Buffer
//     const buffer = Buffer.from(await image.arrayBuffer());

//     // Upload image to Cloudinary
//     const imageUrl = await new Promise<string>((resolve, reject) => {
//       const uploadStream = cloudinary.uploader.upload_stream(
//         {
//           folder: "event_uploads", // Optional folder name in Cloudinary
//           resource_type: "image",
//           transformation: [
//             { quality: "auto", fetch_format: "auto" },
//             { width: 1200, height: 675, crop: "fill", gravity: "auto" },
//           ],
//         },
//         (error: any, result: any) => {
//           if (error) {
//             console.error("Cloudinary upload error:", error);
//             reject(new Error("Image upload failed."));
//           } else if (result?.secure_url) {
//             resolve(result.secure_url);
//           } else {
//             reject(new Error("Unexpected Cloudinary response."));
//           }
//         }
//       );

//       // End the stream with the buffer
//       uploadStream.end(buffer);
//     });

//     return imageUrl; // Return the uploaded image URL
//   } catch (error) {
//     console.error("Error uploading image:", error);
//     return NextResponse.json(
//       { error: "Failed to upload image. Please try again later." },
//       { status: 500 }
//     );
//   }
// };

// export default UploadImageOnCloudinary;
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const UploadImageOnCloudinary = async (
  image: File
): Promise<{ publicId?: string; error?: string; status?: number }> => {
  if (!image) {
    return { error: "No image file provided.", status: 400 };
  }

  if (image.size > 5 * 1024 * 1024) {
    return { error: "File size too large. Maximum size is 5MB.", status: 400 };
  }

  if (!image.type.startsWith("image/")) {
    return { error: "Invalid file type. Only images are allowed.", status: 400 };
  }

  try {
    const buffer = Buffer.from(await image.arrayBuffer());

    const publicId = await new Promise<string>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "profile_uploads",
          resource_type: "image",
          transformation: [
            { quality: "auto", fetch_format: "auto" },
            { width: 500, height: 500, crop: "fill", gravity: "face" },
          ],
        },
        (error: any, result: any) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(new Error("Image upload failed."));
          } else if (result?.public_id) {
            resolve(result.public_id);
          } else {
            reject(new Error("Unexpected Cloudinary response."));
          }
        }
      );

      uploadStream.end(buffer);
    });

    return { publicId };
  } catch (error) {
    console.error("Error uploading image:", error);
    return { 
      error: "Failed to upload image. Please try again later.", 
      status: 500 
    };
  }
};
