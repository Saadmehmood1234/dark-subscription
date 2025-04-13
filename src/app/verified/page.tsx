"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function VerifiedPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      signIn(undefined, { callbackUrl: "/" });
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="text-center p-8">
      <h1 className="text-2xl font-bold mb-4">Email Verified Successfully!</h1>
      <p>You'll be redirected to your account shortly.</p>
    </div>
  );
}
