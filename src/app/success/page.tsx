"use client";
import { Suspense, useEffect, useState } from "react";
import SuccessContent from "@/components/SuccessContent";
import { useSearchParams } from "next/navigation";
export default function SuccessPage() {
  const [sessionId, setSessionId] = useState<string | null>();
  const [orderId, setOrderId] = useState<string | null>();
  const searchParams = useSearchParams();
  useEffect(() => {
    setSessionId(searchParams.get("session_id"));
    setOrderId(searchParams.get("order_id"));
  }, []);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {sessionId && orderId && (
        <SuccessContent sessionId={sessionId} orderId={orderId} />
      )}
    </Suspense>
  );
}
