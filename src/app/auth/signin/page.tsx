"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Mail, Lock } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
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
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/");
      }
    } catch (error) {
      setError("An unexpected error occurred");
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
          <motion.div
            className="bg-[#0C1B44]/90 backdrop-blur-sm border-2 border-[#A92EDF]/30 rounded-3xl p-8  max-sm:p-4 shadow-2xl relative overflow-hidden"
            
          >
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-tr from-[#500150] via-[#42026d] to-[#031877] rounded-full blur-2xl opacity-20" />
            <div className="flex flex-col items-center   gap-4">
              <div className="flex flex-col gap-1 justify-center items-center">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-[#A92EDF] to-purple-500 bg-clip-text text-transparent">
                Sign In
              </h2>
              <h2 className="text-3xl text-white text-center">Welcome Back</h2>
              </div>
             
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full flex flex-col gap-2"
              >
                <Input
                  label="Email"
                  icon={<Mail className="h-5 w-5 text-purple-500" />}
                  {...register("email")}
                  error={
                    errors.email ? { message: errors.email.message } : undefined
                  }
                  placeholder="example@gmail.com"
                />
                <Input
                  label="Password"
                  type="password"
                  icon={<Lock className="h-5 w-5 text-purple-500" />}
                  {...register("password")}
                  error={
                    errors.password
                      ? { message: errors.password.message }
                      : undefined
                  }
                  placeholder="*****"
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
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>
                </motion.div>
              </form>
              <div className="w-full flex items-center space-x-4">
                <div className="flex-1 h-px bg-[#A92EDF]/20" />
                <span className="text-gray-400 text-sm">OR</span>
                <div className="flex-1 h-px bg-[#A92EDF]/20" />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className="w-full cursor-pointer flex items-center justify-center space-x-2 bg-[#0C1B44] border-2 border-[#A92EDF]/20 text-white py-3 rounded-xl transition-all"
              >
                <FaGoogle className="text-xl" />
                <span>Google</span>
              </motion.button>
              <p className="text-gray-400 text-center">
                Don't have an account?{" "}
                <button
                  onClick={() => router.push("/auth/signup")}
                  className="text-[#A92EDF] hover:text-[#c645ff] cursor-pointer transition-colors"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
