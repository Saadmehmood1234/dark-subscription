"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import {
  resetPassword,
  sendPasswordResetEmail,
} from "@/app/actions/reset.action";

// Custom schema to allow either a valid email or valid phone
const formSchema = z.object({
  identifier: z
    .string()
    .min(1, "Email or phone is required")
    .refine(
      (val) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || /^[0-9]{10,15}$/.test(val),
      {
        message: "Please enter a valid email or phone number",
      }
    ),
});

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: "",
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
   
    setLoading(true);
    setError(null);
    try {
  
      const formData = new FormData();
      formData.append("identifier", values.identifier);
      const response = await sendPasswordResetEmail(formData);

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
    <section className="flex w-full justify-center items-center py-2 pb-24 bg-linear-to-tr from-[#0E091C] via-[#1F133D] to-[#0B1027] min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex w-full flex-col items-center px-8 sm:px-6 lg:px-8 max-sm:px-2"
      >
        <div className="relative w-full max-w-md">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 bg-linear-to-tr from-[#500150] via-[#42026d] to-[#031877] rounded-full blur-3xl opacity-30" />
          <motion.div className="bg-[#0C1B44]/90 backdrop-blur-sm border-2 border-[#A92EDF]/30 rounded-3xl p-8 max-sm:p-4 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-linear-to-tr from-[#500150] via-[#42026d] to-[#031877] rounded-full blur-2xl opacity-20" />
            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-col gap-1 justify-center items-center">
                <h2 className="text-4xl font-bold bg-linear-to-r from-[#A92EDF] to-purple-500 bg-clip-text text-transparent">
                  Forgot Password
                </h2>
                <h2 className="text-xl text-white text-center">
                  {success
                    ? "Check your inbox"
                    : "Enter your email or phone to reset password"}
                </h2>
              </div>

              {success ? (
                <div className="text-center">
                  <p className="text-gray-300 mb-4">
                    We've sent a password reset link to your registered contact.
                  </p>
                  <Button
                    onClick={() => router.push("/auth/signin")}
                    className="w-full cursor-pointer bg-[#A92EDF] hover:bg-[#8e5ea3] text-white font-semibold py-4 rounded-xl transition-all"
                  >
                    Back to Sign In
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="w-full flex flex-col gap-4"
                >
                  <Input
                    label=""
                    icon={<Mail className="h-5 w-5 text-purple-500" />}
                    {...register("identifier")}
                    error={
                      errors.identifier
                        ? { message: errors.identifier.message }
                        : undefined
                    }
                    placeholder="Enter email or phone number"
                  />
                  {error && (
                    <p className="text-red-500 text-sm text-center">{error}</p>
                  )}
                  <motion.div
                    
                  >
                    <button
                      type="submit"
                      className="w-full cursor-pointer bg-[#A92EDF] hover:bg-[#8e5ea3] text-white font-semibold py-4 rounded-xl transition-all"
                    >
                      {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                  </motion.div>
                </form>
              )}

              <p className="text-gray-400 text-center">
                Remember your password?{" "}
                <Link
                  href="/auth/signin"
                  className="text-[#A92EDF] hover:text-[#c645ff] cursor-pointer transition-colors"
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
