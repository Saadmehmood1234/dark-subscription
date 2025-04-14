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
    <div className="min-h-screen bg-gradient-to-br from-[#0C1120] to-[#0C1B44] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#A92EDF] to-[#3B82F6]">
            Prime Flix Profile
          </h1>
          <p className="mt-3 text-lg text-[#B4C7F8]">
            Navigate your stellar account information
          </p>
        </div>

        <div className="relative">
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#A92EDF]/20 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute -bottom-10 -right-20 w-60 h-60 bg-[#031877]/20 rounded-full filter blur-3xl" />
          <div className="relative backdrop-blur-sm bg-[#0C1B44]/70 border border-[#A92EDF]/30 rounded-3xl overflow-hidden shadow-2xl">
            <div className="h-1 bg-gradient-to-r from-[#A92EDF] via-[#3B82F6] to-[#031877] w-full" />

            <UserProfile user={session.user} />

            <div className="h-px bg-gradient-to-r from-transparent via-[#A92EDF] to-transparent mx-8 my-6" />
            <div className="flex justify-center space-x-4 pb-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-[#3B82F6] rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
