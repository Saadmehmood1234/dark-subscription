"use client";

import { signOut } from "next-auth/react";
import { LoaderCircle, LogOut } from "lucide-react";
import { useState } from "react";

interface SignOutButtonProps {
  compact?: boolean;
  fullWidth?: boolean;
}

const SignOutButton = ({
  compact = false,
  fullWidth = false,
}: SignOutButtonProps) => {
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);

      await signOut({
        callbackUrl: "/",
      });
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={isSigningOut}
      aria-label="Sign out"
      className={[
        "inline-flex items-center justify-center gap-2 rounded-full cursor-pointer border border-red-400/15 bg-red-400/5 px-3 py-3 text-sm font-medium text-red-200 transition",
        "hover:border-red-400/30 hover:bg-red-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400",
        "disabled:cursor-not-allowed disabled:opacity-60",
        fullWidth ? "w-full" : "",
        compact ? "px-3" : "",
      ].join(" ")}
    >
      {isSigningOut ? (
        <LoaderCircle className="size-3 animate-spin" />
      ) : (
        <LogOut className="size-4" />
      )}

      {!compact && (
        <span>
          {isSigningOut ? "Signing out..." : "Sign out"}
        </span>
      )}
    </button>
  );
};

export default SignOutButton;