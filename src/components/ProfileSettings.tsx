"use client";

import { User } from "next-auth";
import { useState } from "react";
import { motion } from "framer-motion";
import { updateUserProfile } from "@/app/actions/profile.actions";

interface ProfileSettingsProps {
  user: User;
}

export default function ProfileSettings({ user }: ProfileSettingsProps) {
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    image: null as File | null,
  });
  const [previewImage, setPreviewImage] = useState(user.image || "");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, image: file }));

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPreviewImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      await updateUserProfile(formDataToSend);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">
        {isEditing ? "Edit Profile" : "Profile Settings"}
      </h2>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-[#1A2C5F] text-white rounded-lg px-4 py-3 border border-[#A92EDF] focus:ring-2 focus:ring-[#A92EDF] focus:outline-none"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#1A2C5F] text-white rounded-lg px-4 py-3 border border-[#A92EDF] focus:ring-2 focus:ring-[#A92EDF] focus:outline-none cursor-not-allowed"
                required
                disabled
              />
            </div>

            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Profile Image
              </label>
              <div className="flex items-center gap-4">
                <motion.label
                  className="bg-[#1A2C5F] text-white rounded-lg px-4 py-3 border border-[#A92EDF] cursor-pointer hover:bg-[#1A2C5F]/80 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Choose File
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </motion.label>
                {formData.image && (
                  <span className="text-sm text-gray-400">
                    {formData.image.name}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <motion.button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setPreviewImage(user.image || "");
                setFormData({
                  name: user.name || "",
                  email: user.email || "",
                  image: null,
                });
              }}
              className="px-6 py-2 border border-[#A92EDF] cursor-pointer rounded-full text-sm font-medium text-white bg-transparent hover:bg-[#A92EDF]/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 rounded-full cursor-pointer text-sm font-medium text-white bg-gradient-to-r from-[#A92EDF] to-[#A92EDF] hover:from-[#A92EDF]/90 hover:to-[#A92EDF]/90"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                "Save Changes"
              )}
            </motion.button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="py-3 border-b border-[#1A2C5F]">
              <dt className="text-sm font-medium text-gray-400">Name</dt>
              <dd className="mt-1 text-lg text-white">{user.name}</dd>
            </div>
            <div className="py-3 border-b border-[#1A2C5F]">
              <dt className="text-sm font-medium text-gray-400">Email</dt>
              <dd className="mt-1 text-lg text-white">{user.email}</dd>
            </div>
          </div>

          <div className="flex justify-start pt-6">
            <motion.button
              onClick={() => setIsEditing(true)}
              className="px-8 py-3 cursor-pointer rounded-full text-lg font-medium text-white bg-gradient-to-r from-[#A92EDF] to-[#A92EDF] hover:from-[#A92EDF]/90 hover:to-[#A92EDF]/90"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Edit Profile
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
}