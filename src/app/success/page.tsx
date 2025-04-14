"use client";
import { Suspense } from "react";
import SuccessContent from "@/components/SuccessContent";
import { useSearchParams } from "next/navigation";
export default function SuccessPage() {


  const searchParams = useSearchParams();
  console.log("Pathname:", searchParams);
  const sessionId = searchParams.get("session_id");
  const orderId = searchParams.get("order_id");
  console.log("Search Params:", searchParams);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent sessionId={sessionId!} orderId={orderId!} />
    </Suspense>
  );
}
