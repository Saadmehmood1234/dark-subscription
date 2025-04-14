"use client";

import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { sendConfirmationEmail } from "@/app/actions/sendMail.actions";
export default function SuccessContent({
  sessionId,
  orderId,
}: {
  sessionId?: string;
  orderId?: string;
}) {
  const [orderVerified, setOrderVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyPayment = async () => {

      if (!sessionId || !orderId) {
        console.warn("Missing sessionId or orderId");
        setLoading(false);
        return;
      }
      
      try {
        console.log("Starting verification...");
        const response = await fetch(
          `/api/verify-payment?session_id=${sessionId}&order_id=${orderId}`
        );
        const data = await response.json();
        console.log("Verification result:", data);

        if (data.success) {
          setOrderVerified(true);
          try {
            await sendConfirmationEmail({
              email: data.email,
              productName: data.productName,
              userName: data.userName || "Customer",
              orderId: orderId,
              websiteName: process.env.NEXT_PUBLIC_WEBSITE_NAME || "Our Site",
            });
          } catch (emailError) {
            console.error("Email failed:", emailError);
          }
        }
      } catch (error) {
        console.error("Verification failed:", {
          error,
          sessionId,
          orderId,
          time: new Date().toISOString(),
        });
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId, orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0C1B44] to-[#1A0C3D] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }
  if (!orderVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0C1B44] to-[#1A0C3D] flex items-center justify-center p-4">
        <div className="bg-[#0C1B44]/80 backdrop-blur-sm border-2 border-[#A92EDF]/30 rounded-2xl p-8 max-w-md w-full text-center">
          <h1 className="text-3xl font-bold mt-4 bg-gradient-to-r from-[#A92EDF] to-[#C27AFF] bg-clip-text text-transparent">
            Payment Verification Failed
          </h1>
          <p className="mt-2 text-gray-300">
            We couldn't verify your payment. Please check your orders or contact
            support.
          </p>
          <Link
            href="/profile"
            className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#A92EDF] hover:bg-[#8e5ea3] transition-colors"
          >
            View Your Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0C1B44] to-[#1A0C3D] flex items-center justify-center p-4">
      <div className="bg-[#0C1B44]/80 backdrop-blur-sm border-2 border-[#A92EDF]/30 rounded-2xl p-8 max-w-md w-full text-center">
        <div className="flex justify-center">
          <CheckCircle className="w-16 h-16 text-green-400" />
        </div>
        <h1 className="text-3xl font-bold mt-4 bg-gradient-to-r from-[#A92EDF] to-[#C27AFF] bg-clip-text text-transparent">
          Payment Successful!
        </h1>
        <p className="mt-2 text-gray-300">
          Thank you for your purchase. Your order is being processed.
        </p>
        <p className="mt-4 text-gray-300">
          A confirmation email has been sent to your registered email address.
        </p>

        {orderId && (
          <p className="mt-4 text-sm text-center text-gray-400">
            Order ID: {orderId}
          </p>
        )}

        <Link
          href="/profile"
          className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#A92EDF] hover:bg-[#8e5ea3] transition-colors"
        >
          View Your Orders
        </Link>
      </div>
    </div>
  );
}