"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Lock } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import {
  resetPassword,
  sendPasswordResetEmail,
} from "@/app/actions/reset.action";

const formSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!token) {
      setError("Invalid reset token");
      return;
    }

    setLoading(true);
    setError(null);
    try {

      const formData = new FormData();
      formData.append("password", values.password);
      formData.append("confirmPassword", values.confirmPassword);
      formData.append("token", token);
      const response = await resetPassword(formData);

      if (!response.success) {
        throw new Error(response.error || "Something went wrong");
      }
      setSuccess(true);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex w-full justify-center items-center py-2 pb-24 bg-gradient-to-tr from-[#0E091C] via-[#1F133D] to-[#0B1027] min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex w-full flex-col items-center px-8 sm:px-6 lg:px-8 max-sm:px-2"
      >
        <div className="relative w-full max-w-md">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 bg-gradient-to-tr from-[#500150] via-[#42026d] to-[#031877] rounded-full blur-3xl opacity-30" />
          <motion.div className="bg-[#0C1B44]/90 backdrop-blur-sm border-2 border-[#A92EDF]/30 rounded-3xl p-8 max-sm:p-4 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-tr from-[#500150] via-[#42026d] to-[#031877] rounded-full blur-2xl opacity-20" />
            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-col gap-1 justify-center items-center">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-[#A92EDF] to-purple-500 bg-clip-text text-transparent">
                  Reset Password
                </h2>
                <h2 className="text-xl text-white text-center">
                  {success ? "Password updated!" : "Enter your new password"}
                </h2>
              </div>

              {success ? (
                <div className="text-center">
                  <p className="text-gray-300 mb-4">
                    Your password has been successfully updated.
                  </p>
                  <Link href="/auth/signin">
                    <Button className="w-full cursor-pointer bg-[#A92EDF] hover:bg-[#8e5ea3] text-white font-semibold py-4 rounded-xl transition-all">
                      Sign In
                    </Button>
                  </Link>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="w-full flex flex-col gap-4"
                >
                  <Input
                    label="New Password"
                    type="password"
                    icon={<Lock className="h-5 w-5 text-purple-500" />}
                    {...register("password")}
                    error={
                      errors.password
                        ? { message: errors.password.message }
                        : undefined
                    }
                    placeholder="********"
                  />
                  <Input
                    label="Confirm Password"
                    type="password"
                    icon={<Lock className="h-5 w-5 text-purple-500" />}
                    {...register("confirmPassword")}
                    error={
                      errors.confirmPassword
                        ? { message: errors.confirmPassword.message }
                        : undefined
                    }
                    placeholder="********"
                  />
                  {error && (
                    <p className="text-red-500 text-sm text-center">{error}</p>
                  )}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      type="submit"
                      className="w-full cursor-pointer bg-[#A92EDF] hover:bg-[#8e5ea3] text-white font-semibold py-4 rounded-xl transition-all"
                      disabled={loading}
                    >
                      {loading ? "Updating..." : "Update Password"}
                    </Button>
                  </motion.div>
                </form>
              )}

              <p className="text-gray-400 text-center">
                Remember your password?{" "}
                <Link
                  href="/auth/signin"
                  className="text-[#A92EDF] cursor-pointer hover:text-[#c645ff] transition-colors"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
