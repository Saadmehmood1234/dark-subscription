// app/auth/error/page.tsx
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamically import the actual client component
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
