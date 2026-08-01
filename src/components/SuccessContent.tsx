"use client";

import { CheckCircle, Clock3, XCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type VerificationState = "loading" | "pending" | "success" | "failed";

export default function SuccessContent({ orderId }: { orderId?: string }) {
  const [state, setState] = useState<VerificationState>("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!orderId) {
      setMessage("The order ID is missing.");
      setState("failed");
      return;
    }

    let stopped = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const checkPayment = async () => {
      try {
        const response = await fetch("/api/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId }),
          cache: "no-store",
        });
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.error || "Payment status could not be checked");
        }
        if (stopped) return;

        if (data.paymentStatus === "paid") {
          setState("success");
          return;
        }
        if (data.paymentStatus === "failed") {
          setMessage("The submitted payment could not be verified. Please contact support.");
          setState("failed");
          return;
        }

        setState("pending");
        timer = setTimeout(checkPayment, 5000);
      } catch (error: unknown) {
        if (stopped) return;
        setMessage(error instanceof Error ? error.message : "Payment status could not be checked");
        setState("failed");
      }
    };

    void checkPayment();
    return () => {
      stopped = true;
      if (timer) clearTimeout(timer);
    };
  }, [orderId]);

  if (state === "loading") {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#0C1B44] to-[#1A0C3D] flex items-center justify-center">
        <div className="text-white">Checking your payment…</div>
      </div>
    );
  }

  if (state === "pending") {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#0C1B44] to-[#1A0C3D] flex items-center justify-center p-4">
        <div className="bg-[#0C1B44]/80 border-2 border-amber-400/30 rounded-2xl p-8 max-w-md w-full text-center">
          <Clock3 className="w-16 h-16 text-amber-300 mx-auto" />
          <h1 className="text-3xl font-bold mt-4 text-amber-200">Payment submitted</h1>
          <p className="mt-3 text-gray-300">
            Your UTR is waiting for admin verification. This page updates automatically.
          </p>
          {orderId && <p className="mt-4 text-sm text-gray-400">Order ID: {orderId}</p>}
          <Link href="/profile" className="mt-6 inline-flex px-6 py-3 rounded-md text-white bg-[#A92EDF]">
            View your orders
          </Link>
        </div>
      </div>
    );
  }

  if (state === "failed") {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#0C1B44] to-[#1A0C3D] flex items-center justify-center p-4">
        <div className="bg-[#0C1B44]/80 border-2 border-red-500/30 rounded-2xl p-8 max-w-md w-full text-center">
          <XCircle className="w-16 h-16 text-red-400 mx-auto" />
          <h1 className="text-3xl font-bold mt-4 text-red-300">Payment not confirmed</h1>
          <p className="mt-3 text-gray-300">{message}</p>
          <Link href="/profile" className="mt-6 inline-flex px-6 py-3 rounded-md text-white bg-[#A92EDF]">
            View your orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0C1B44] to-[#1A0C3D] flex items-center justify-center p-4">
      <div className="bg-[#0C1B44]/80 border-2 border-[#A92EDF]/30 rounded-2xl p-8 max-w-md w-full text-center">
        <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
        <h1 className="text-3xl font-bold mt-4 text-[#C27AFF]">Payment confirmed!</h1>
        <p className="mt-2 text-gray-300">Thank you. Your PrimeFlix order is being processed.</p>
        {orderId && <p className="mt-4 text-sm text-gray-400">Order ID: {orderId}</p>}
        <Link href="/profile" className="mt-6 inline-flex px-6 py-3 rounded-md text-white bg-[#A92EDF]">
          View your orders
        </Link>
      </div>
    </div>
  );
}
