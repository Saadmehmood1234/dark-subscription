"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Home,
  LogIn,
  LogOut,
  Menu,
  MessageCircle,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

import CartIcon from "./CartIcon";
import SearchInput from "./SearchInput";
import SignOutButton from "./SignOutButton";

const mobileNavigation = [
  {
    label: "Home",
    href: "/",
    icon: Home,
    requiresAuth: false,
  },
  {
    label: "Cart",
    href: "/cart",
    icon: ShoppingCart,
    requiresAuth: true,
  },
  {
    label: "Account",
    href: "/profile",
    icon: User,
    requiresAuth: true,
  },
];

const menuNavigation = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Contact support",
    href: "/contact",
    icon: MessageCircle,
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  const isLoading = status === "loading" || !mounted;
  const isAuthenticated = Boolean(session);

  const isActiveRoute = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#100719]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:h-18 lg:px-8">
          <Link
            href="/"
            aria-label="PrimeFlix home"
            className="shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
          >
            <span className="text-2xl font-bold tracking-tight text-[#C27AFF] sm:text-3xl">
              Prime<span className="text-white">Flix</span>
            </span>
          </Link>
          <div className="hidden min-w-0 flex-1 justify-center md:flex">
            <div className="w-full max-w-xl">
              {isLoading ? (
                <div className="h-11 animate-pulse rounded-xl bg-white/7" />
              ) : (
                <SearchInput />
              )}
            </div>
          </div>

          <div className="ml-auto hidden shrink-0 items-center gap-3 md:flex">
            {isLoading ? (
              <>
                <div className="size-11 animate-pulse rounded-full bg-white/7" />
                <div className="h-11 w-24 animate-pulse rounded-xl bg-white/7" />
              </>
            ) : isAuthenticated ? (
              <>
                <CartIcon />

                <Link
                  href="/profile"
                  aria-label="Open profile"
                  className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 py-1.5 pl-1.5 pr-3 transition hover:border-purple-400/25 hover:bg-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                >
                  <div className="relative size-9 overflow-hidden rounded-full bg-white/10">
                    <Image
                      src={
                        session?.user?.image ||
                        "/default-profile.png"
                      }
                      alt={session?.user?.name || "Profile"}
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  </div>

                  <div className="max-w-28 text-left">
                    <p className="truncate text-xs font-semibold text-white">
                      {session?.user?.name || "My account"}
                    </p>

                    <p className="truncate text-[11px] text-white/40">
                      View profile
                    </p>
                  </div>
                </Link>

                <SignOutButton compact />
              </>
            ) : (
              <Link
                href="/auth/signin"
                className="inline-flex px-3 py-2 items-center justify-center gap-2 rounded-xl bg-[#A92EDF] text-sm font-semibold text-white shadow-lg shadow-purple-950/25 transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
              >
                <LogIn className="size-4" />
                Sign in
              </Link>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={
              isMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            className="ml-auto grid size-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 md:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMenuOpen ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.16 }}
                >
                  <X className="size-5 cursor-pointer" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.16 }}
                >
                  <Menu className="size-5 cursor-pointer" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        <div className="border-t border-white/7 px-4 py-3 md:hidden">
          {isLoading ? (
            <div className="h-11 animate-pulse rounded-xl bg-white/7" />
          ) : (
            <SearchInput />
          )}
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setIsMenuOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/65 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile menu"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{
              duration: 0.22,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed inset-x-4 top-32 z-50 overflow-hidden rounded-3xl border border-white/10 bg-[#180D27]/98 p-3 shadow-2xl shadow-black/50 backdrop-blur-2xl md:hidden"
          >
            <div className="space-y-1">
              {menuNavigation.map(({ label, href, icon: Icon }) => {
                const isActive = isActiveRoute(href);

                return (
                  <Link
                    key={href}
                    href={href}
                    className={[
                      "flex min-h-14 items-center gap-3 rounded-2xl px-4 text-sm font-medium transition",
                      isActive
                        ? "bg-purple-400/12 text-purple-200"
                        : "text-white/65 hover:bg-white/5 hover:text-white",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "grid size-9 place-items-center rounded-xl",
                        isActive
                          ? "bg-purple-400/15 text-purple-300"
                          : "bg-white/5 text-white/45",
                      ].join(" ")}
                    >
                      <Icon className="size-4.5" />
                    </span>

                    {label}
                  </Link>
                );
              })}
            </div>

            <div className="my-3 h-px bg-white/8" />

            {isLoading ? (
              <div className="h-12 animate-pulse rounded-2xl bg-white/7" />
            ) : isAuthenticated ? (
              <div className="space-y-2">
                <Link
                  href="/profile"
                  className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/4 p-3 transition hover:bg-white/7"
                >
                  <div className="relative size-11 shrink-0 overflow-hidden rounded-xl bg-white/10">
                    <Image
                      src={
                        session?.user?.image ||
                        "/default-profile.png"
                      }
                      alt={session?.user?.name || "Profile"}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-white">
                      {session?.user?.name || "My account"}
                    </p>

                    <p className="truncate text-xs text-white/40">
                      {session?.user?.email}
                    </p>
                  </div>
                </Link>

                <SignOutButton fullWidth />
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#A92EDF] px-5 text-sm font-semibold text-white"
              >
                <LogIn className="size-4" />
                Sign in to your account
              </Link>
            )}
          </motion.nav>
        )}
      </AnimatePresence>

      <nav
        aria-label="Primary mobile navigation"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#100719]/95 px-3 pb-[max(0.65rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl md:hidden"
      >
        <div className="mx-auto grid max-w-md grid-cols-3">
          {mobileNavigation.map(
            ({ label, href, icon: Icon, requiresAuth }) => {
              const destination =
                requiresAuth && !isAuthenticated
                  ? "/auth/signin"
                  : href;

              const visibleLabel =
                !isAuthenticated && label === "Account"
                  ? "Sign in"
                  : label;

              const isActive =
                isAuthenticated || !requiresAuth
                  ? isActiveRoute(href)
                  : pathname === "/auth/signin" &&
                    label === "Account";

              return (
                <Link
                  key={label}
                  href={destination}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "group relative flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl px-2 text-[11px] font-medium transition",
                    isActive
                      ? "text-purple-200"
                      : "text-white/40 hover:text-white/70",
                  ].join(" ")}
                >
                  {isActive && (
                    <motion.span
                      layoutId="mobile-active-navigation"
                      className="absolute inset-x-2 inset-y-0 rounded-2xl bg-purple-400/10"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}

                  <Icon
                    className={[
                      "relative size-5",
                      isActive
                        ? "text-purple-300"
                        : "text-white/40",
                    ].join(" ")}
                  />

                  <span className="relative">
                    {visibleLabel}
                  </span>
                </Link>
              );
            },
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;