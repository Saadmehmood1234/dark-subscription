"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

// Correct dynamic import without the suspense option
const ErrorContent = dynamic(() => import("@/components/AuthErrorPage"));

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<div>Loading error details...</div>}>
      <ErrorContent />
    </Suspense>
  );
}
