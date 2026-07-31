"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";

function VerifyEmailContent() {
  const params = useSearchParams();
  const token = params.get("token");
  const [message, setMessage] = useState("Verifying your email...");
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      setMessage("No verification token found.");
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await axios.post("/api/auth/verify-email", { token });
        setMessage("Email verified successfully! Redirecting...");
        setTimeout(() => router.push("/auth/signin"), 3000);
      } catch (error) {
        setMessage(
          "Invalid or expired token. Please request a new verification email."
        );
      }
    };
    
    verifyEmail();
  }, [token, router]);

  return (
    <section className="flex justify-center items-center min-h-screen bg-linear-to-tr from-[#0E091C] via-[#1F133D] to-[#0B1027]">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-[#0C1B44]/90 backdrop-blur-sm border-2 border-[#A92EDF]/30 rounded-3xl p-8 shadow-2xl relative overflow-hidden w-full max-w-md"
      >
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-linear-to-tr from-[#500150] via-[#42026d] to-[#031877] rounded-full blur-2xl opacity-20" />
        <div className="text-center space-y-6">
          <h1 className="text-2xl font-semibold text-white">{message}</h1>
          {message.includes("Verifying") && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="w-full flex justify-center">
                <div className="w-16 h-16 border-t-4 border-[#A92EDF] rounded-full animate-spin" />
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen bg-linear-to-tr from-[#0E091C] via-[#1F133D] to-[#0B1027]">
          <div className="text-white">Loading verification...</div>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
