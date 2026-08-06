"use client";

import {
  Camera,
  CheckCircle2,
  LoaderCircle,
  Mail,
  Pencil,
  UserRound,
  X,
} from "lucide-react";
import type { User } from "next-auth";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import { updateUserProfile } from "@/app/actions/profile.actions";

interface ProfileSettingsProps {
  user: User;
}

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const ProfileSettings = ({ user }: ProfileSettingsProps) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: user.name || "",
    image: null as File | null,
  });

  const [previewImage, setPreviewImage] = useState(
    user.image || "",
  );

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    return () => {
      if (previewImage.startsWith("blob:")) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const resetForm = () => {
    if (previewImage.startsWith("blob:")) {
      URL.revokeObjectURL(previewImage);
    }

    setFormData({
      name: user.name || "",
      image: null,
    });

    setPreviewImage(user.image || "");
    setIsEditing(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      toast.error("Profile image must be smaller than 5 MB.");
      event.target.value = "";
      return;
    }

    if (previewImage.startsWith("blob:")) {
      URL.revokeObjectURL(previewImage);
    }

    setFormData((current) => ({
      ...current,
      image: file,
    }));

    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const name = formData.name.trim();

    if (name.length < 2) {
      toast.error("Name must contain at least 2 characters.");
      return;
    }

    setIsSaving(true);

    const toastId = toast.loading("Saving your profile...");

    try {
      const payload = new FormData();

      payload.append("name", name);

      if (formData.image) {
        payload.append("image", formData.image);
      }

      const response = await updateUserProfile(payload);

      if (!response.success) {
        toast.error(
          response.message || "Unable to update your profile.",
          { id: toastId },
        );
        return;
      }

      toast.success(
        response.message || "Profile updated successfully.",
        { id: toastId },
      );

      setIsEditing(false);
      setFormData({
        name,
        image: null,
      });

      if (response.data?.imageUrl) {
        setPreviewImage(response.data.imageUrl);
      }

      router.refresh();
    } catch (error) {
      console.error("Profile update error:", error);

      toast.error("Unable to update your profile.", {
        id: toastId,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-white/8 pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-purple-300">
            Personal information
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-white">
            Profile settings
          </h2>

          {/* <p className="mt-2 max-w-xl text-sm leading-6 text-white/45">
            Keep your name and profile picture up to date. Your email
            address is connected to your sign-in account.
          </p> */}
        </div>

        {!isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="inline-flex cursor-pointer min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-semibold text-white transition hover:border-purple-400/25 hover:bg-purple-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
          >
            <Pencil className="size-4" />
            Edit profile
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="mt-7">
          <div className="grid gap-8 xl:grid-cols-[180px_minmax(0,1fr)]">
            <div>
              <p className="mb-3 text-sm font-medium text-white/65">
                Profile picture
              </p>

              <div className="relative mx-auto size-36 overflow-hidden rounded-3xl border border-white/12 bg-white/5 xl:mx-0">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Profile preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-purple-500/30 to-blue-500/20 text-4xl font-semibold">
                    {formData.name.charAt(0).toUpperCase() || "U"}
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  aria-label="Choose profile image"
                  className="absolute cursor-pointer inset-x-2 bottom-2 flex min-h-10 items-center justify-center gap-2 rounded-xl border border-white/10 bg-black/55 px-3 text-xs font-semibold text-white backdrop-blur-md transition hover:bg-black/75"
                >
                  <Camera className="size-4" />
                  Change photo
                </button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
                className="hidden"
              />

              <p className="mt-3 text-center text-xs leading-5 text-white/30 xl:text-left">
                JPG, PNG or WebP. Maximum 5 MB.
              </p>
            </div>

            <div className="space-y-5">
              <FormField
                id="name"
                label="Full name"
                icon={UserRound}
              >
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(event) =>
                    setFormData((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                  required
                  minLength={2}
                  maxLength={80}
                  autoComplete="name"
                  className="w-full rounded-xl border border-white/10 bg-black/15 px-11 py-3 text-sm text-white outline-none transition placeholder:text-white/25 hover:border-white/20 focus:border-purple-400/60 focus:ring-4 focus:ring-purple-400/10"
                />
              </FormField>

              <FormField
                id="email"
                label="Email address"
                icon={Mail}
              >
                <input
                  id="email"
                  type="email"
                  value={user.email || ""}
                  disabled
                  className="w-full cursor-not-allowed rounded-xl border border-white/8 bg-white/2.5 px-11 py-3 text-sm text-white/45 outline-none"
                />
              </FormField>
{/* 
              <p className="-mt-2 text-xs leading-5 text-white/30">
                Your email address is managed by your authentication
                provider and cannot be changed here.
              </p> */}
            </div>
          </div>

          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-white/8 pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={resetForm}
              disabled={isSaving}
              className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 text-sm font-semibold text-white/65 transition hover:bg-white/8 hover:text-white disabled:opacity-50"
            >
              <X className="size-4" />
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#A72CE2] cursor-pointer px-6 text-sm font-semibold text-white shadow-lg shadow-purple-950/30 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? (
                <>
                  <LoaderCircle className="size-4 animate-spin" />
                  Saving changes...
                </>
              ) : (
                <>
                  <CheckCircle2 className="size-4" />
                  Save changes
                </>
              )}
            </button>
          </div>
        </form>
      ) : (
        <div className="mt-7 space-y-4">
          <ProfileValue
            icon={UserRound}
            label="Full name"
            value={user.name || "Not provided"}
          />

          <ProfileValue
            icon={Mail}
            label="Email address"
            value={user.email || "Not provided"}
            verified
          />
        </div>
      )}
    </div>
  );
};

interface FormFieldProps {
  id: string;
  label: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

const FormField = ({
  id,
  label,
  icon: Icon,
  children,
}: FormFieldProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-white/65"
      >
        {label}
      </label>

      <div className="relative">
        <Icon className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-white/30" />
        {children}
      </div>
    </div>
  );
};

interface ProfileValueProps {
  icon: React.ElementType;
  label: string;
  value: string;
  verified?: boolean;
}

const ProfileValue = ({
  icon: Icon,
  label,
  value,
  verified,
}: ProfileValueProps) => {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-white/8 bg-white/2.5 p-4 sm:p-5">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-purple-400/10 text-purple-300">
        <Icon className="size-5" />
      </span>

      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wider text-white/35">
          {label}
        </p>

        <div className="mt-1.5 flex flex-wrap items-center gap-2">
          <p className="break-all text-sm font-medium text-white sm:text-base">
            {value}
          </p>

          {verified && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-2 py-1 text-[10px] font-semibold text-emerald-300">
              <CheckCircle2 className="size-3" />
              Verified
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;