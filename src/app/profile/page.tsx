import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ShieldCheck } from "lucide-react";

import { authOptions } from "@/auth";
import UserProfile from "@/components/UserProfile";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/signin");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0D0715] pb-28 pt-28 text-white md:pb-16 md:pt-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -left-48 top-16 size-105 rounded-full bg-purple-600/10 blur-[140px]" />
        <div className="absolute -right-48 bottom-0 size-105 rounded-full bg-blue-600/10 blur-[140px]" />
        <div className="absolute left-1/2 top-0 h-px w-[90%] -translate-x-1/2 bg-linear-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="mb-8 sm:mb-10">
          {/* <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-400/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-purple-200">
            <ShieldCheck className="size-3.5" />
            Secure account
          </div> */}

          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Your account
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/50 sm:text-base">
            Manage your profile information, review previous orders and keep
            your account details up to date.
          </p>
        </section>

        <UserProfile user={session.user} />
      </div>
    </main>
  );
}