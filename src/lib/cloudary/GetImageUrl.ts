import { v2 as cloudinary } from "cloudinary";

const getImageUrl = (publicId: string): string => {
  // Use Cloudinary's `url()` function to get the image URL using the `public_id`
  const imageUrl = cloudinary.url(publicId, {
    secure: true, // Use HTTPS
    transformation: [
      { quality: "auto", fetch_format: "auto" }, // Optional: Apply automatic quality and format
    ],
  });

  return imageUrl;
};

export default getImageUrl
