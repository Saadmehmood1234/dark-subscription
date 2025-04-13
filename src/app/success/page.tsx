import { Suspense } from "react";
import SuccessContent from "@/components/SuccessContent";

export default function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string; order_id?: string };
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent 
        sessionId={searchParams.session_id} 
        orderId={searchParams.order_id} 
      />
    </Suspense>
  );
}