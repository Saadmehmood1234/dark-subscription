import { ReactNode } from "react";
import { Suspense } from "react";
export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <Suspense>
        <div className="flex-1 h-screen overflow-x-auto bg-gray-100">
          {children}
        </div>
      </Suspense>
    </div>
  );
}
