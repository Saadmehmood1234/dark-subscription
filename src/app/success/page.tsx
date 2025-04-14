"use client";
import { Suspense, useEffect, useState } from "react";
import SuccessContent from "@/components/SuccessContent";
import { useSearchParams } from "next/navigation";
export default function SuccessPage() {
  const [sessionId, setSessionId] = useState<string | null>();
  const [orderId, setOrderId] = useState<string | null>();
  const searchParams = useSearchParams();
  useEffect(() => {
   
    console.log("Pathname:", searchParams);
    setSessionId(searchParams.get("session_id"));
    setOrderId(searchParams.get("order_id"));
    console.log("Search Params:", searchParams);
  }, []);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent sessionId={sessionId!} orderId={orderId!} />
    </Suspense>
  );
}
