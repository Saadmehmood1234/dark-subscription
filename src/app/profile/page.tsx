import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { redirect } from "next/navigation";
import UserProfile from "@/components/UserProfile";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/signup");
  }
  return (
    <div className="min-h-screen bg-linear-to-br from-[#0C1120] to-[#0C1B44] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-[#A92EDF] to-[#3B82F6]">
            Prime Flix Profile
          </h1>
          <p className="mt-3 text-lg text-[#B4C7F8]">
            Navigate your stellar account information
          </p>
        </div>

        <div className="relative">
          <div className="relative backdrop-blur-sm bg-[#0C1B44]/70 border border-[#A92EDF]/30 rounded-3xl overflow-hidden shadow-2xl">

            <UserProfile user={session.user} />

          </div>
        </div>
      </div>
    </div>
  );
}
