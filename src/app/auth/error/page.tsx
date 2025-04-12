
import dynamic from "next/dynamic";
import { Suspense } from "react";
const AuthErrorPageClient = dynamic(
  () => import("@/components/AuthErrorPage"),
  {
    ssr: false,
  }
);

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthErrorPageClient />
    </Suspense>
  );
}
