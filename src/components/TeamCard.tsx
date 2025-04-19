// components/TeamCard.tsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface TeamMember {
  name: string;
  role: string;
  image?: string;
}

export default function TeamCard({ member }: { member: TeamMember }) {
  const [imageError, setImageError] = useState(false);
  const [avatarColor, setAvatarColor] = useState("");
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  useEffect(() => {
    const colors = [
      "from-[#5E2AB3] to-[#A92EDF]",
      "from-[#2563EB] to-[#1E40AF]",
    ];
    const hash = member.name
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    setAvatarColor(colors[hash % colors.length]);
  }, [member.name]);

  return (
    <div className="bg-[#1E1433] rounded-xl overflow-hidden border border-[#2A1E3A] hover:border-[#A92EDF] transition-all group h-full flex flex-col">
      <div className="relative aspect-square">
        {member.image && !imageError ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <div
            className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${avatarColor} animate-pulse`}
          >
            <div className="relative">
              <div className="flex items-center justify-center w-full h-full">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center shadow-lg">
                    <span className="text-4xl font-bold text-white">
                      {initials}
                    </span>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white/30 border border-white/50 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-white/50 animate-ping absolute"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
          <div>
            <h3 className="text-xl font-bold">{member.name}</h3>
            {/* <p className="text-[#B4ACD9]">{member.role}</p> */}
          </div>
        </div>
      </div>

      <div className="p-6 group-hover:hidden flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold mb-1">{member.name}</h3>
          {/* <p className="text-[#B4ACD9]">{member.role}</p> */}
        </div>
        <div className="mt-4 text-xs text-[#B4ACD9]/50">
          {!member.image && (
            <span className="animate-pulse">✨ Generated avatar</span>
          )}
        </div>
      </div>
    </div>
  );
}
