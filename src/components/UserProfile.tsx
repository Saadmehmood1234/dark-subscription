"use client";

import { useEffect, useState } from "react";
import type { User } from "next-auth";
import { AnimatePresence, motion } from "framer-motion";
import {
  Mail,
  Package,
  Settings,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import ProfileSettings from "./ProfileSettings";
import OrderHistory from "./OrderHistory";
import { getUserOrder } from "@/app/actions/order.actions";
import type { Order } from "@/lib/types";

interface UserProfileProps {
  user: User & {
    id?: string;
  };
}

type ActiveTab = "profile" | "orders";

const UserProfile = ({ user }: UserProfileProps) => {
  const [activeTab, setActiveTab] =
    useState<ActiveTab>("profile");

  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [ordersLoaded, setOrdersLoaded] = useState(false);
  const [ordersError, setOrdersError] = useState<string | null>(null);

  useEffect(() => {
    if (activeTab !== "orders" || ordersLoaded) {
      return;
    }

    let isMounted = true;

    const fetchOrders = async () => {
      try {
        setLoadingOrders(true);
        setOrdersError(null);

        const response = await getUserOrder();

        if (!isMounted) return;

        if (response.success && response.orders) {
          setOrders(response.orders);
        } else {
          setOrders([]);
          setOrdersError(
            response.message || "Unable to load your orders.",
          );
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);

        if (isMounted) {
          setOrders([]);
          setOrdersError("Unable to load your orders right now.");
        }
      } finally {
        if (isMounted) {
          setLoadingOrders(false);
          setOrdersLoaded(true);
        }
      }
    };

    fetchOrders();

    return () => {
      isMounted = false;
    };
  }, [activeTab, ordersLoaded]);

  const retryOrders = () => {
    setOrdersLoaded(false);
    setOrdersError(null);
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] shadow-2xl shadow-black/20 backdrop-blur-xl">
      <div className="grid min-h-155 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="border-b border-white/10 bg-white/2.5 p-5 sm:p-6 lg:border-b-0 lg:border-r lg:p-7">
          <div className="flex items-center gap-4 lg:flex-col lg:items-start">
            <div className="relative size-16 shrink-0 overflow-hidden rounded-2xl border border-white/15 bg-linear-to-br from-purple-500/30 to-blue-500/20 shadow-xl shadow-black/20 lg:size-24">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name || "Profile"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-white lg:text-3xl">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
            </div>

            <div className="min-w-0 lg:mt-4">
              <h2 className="truncate text-lg font-semibold text-white lg:text-xl">
                {user.name || "PrimeFlix user"}
              </h2>

              <div className="mt-1 flex min-w-0 items-center gap-1.5 text-sm text-white/45">
                <Mail className="size-3.5 shrink-0" />
                <span className="truncate">
                  {user.email}
                </span>
              </div>
            </div>
          </div>

          {/* <div className="mt-5 hidden rounded-2xl border border-emerald-400/15 bg-emerald-400/6 p-3 lg:block">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-emerald-300" />

              <div>
                <p className="text-xs font-semibold text-emerald-100">
                  Account protected
                </p>

                <p className="mt-1 text-xs leading-5 text-emerald-100/50">
                  Your profile and order information are securely managed.
                </p>
              </div>
            </div>
          </div> */}

          <nav
            aria-label="Account sections"
            className="mt-7 hidden space-y-2 lg:block"
          >
            <SidebarButton
              label="Profile settings"
              description="Personal information"
              icon={Settings}
              active={activeTab === "profile"}
              onClick={() => setActiveTab("profile")}
            />

            <SidebarButton
              label="My orders"
              description="Order history and invoices"
              icon={Package}
              active={activeTab === "orders"}
              onClick={() => setActiveTab("orders")}
            />
          </nav>
          <div className="mt-5 grid grid-cols-2 gap-2 lg:hidden">
            <MobileTabButton
              label="Profile"
              icon={UserRound}
              active={activeTab === "profile"}
              onClick={() => setActiveTab("profile")}
            />

            <MobileTabButton
              label="Orders"
              icon={Package}
              active={activeTab === "orders"}
              onClick={() => setActiveTab("orders")}
            />
          </div>
        </aside>

        <section className="min-w-0 p-5 sm:p-7 lg:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
            >
              {activeTab === "profile" ? (
                <ProfileSettings user={user} />
              ) : (
                <OrderHistory
                  orders={orders}
                  user={user}
                  loading={loadingOrders}
                  error={ordersError}
                  onRetry={retryOrders}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
};

interface SidebarButtonProps {
  label: string;
  description: string;
  icon: React.ElementType;
  active: boolean;
  onClick: () => void;
}

const SidebarButton = ({
  label,
  description,
  icon: Icon,
  active,
  onClick,
}: SidebarButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={[
        "flex w-full items-center cursor-pointer gap-3 rounded-2xl border p-3.5 text-left transition",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400",
        active
          ? "border-purple-400/25 bg-purple-400/10"
          : "border-transparent text-white/55 hover:border-white/8 hover:bg-white/5 hover:text-white",
      ].join(" ")}
    >
      <span
        className={[
          "grid size-10 shrink-0 place-items-center rounded-xl transition",
          active
            ? "bg-purple-400/15 text-purple-300"
            : "bg-white/5 text-white/40",
        ].join(" ")}
      >
        <Icon className="size-4.5" />
      </span>

      <span className="min-w-0">
        <span
          className={[
            "block text-sm font-semibold",
            active ? "text-white" : "",
          ].join(" ")}
        >
          {label}
        </span>

        <span className="mt-0.5 block truncate text-xs text-white/35">
          {description}
        </span>
      </span>
    </button>
  );
};

interface MobileTabButtonProps {
  label: string;
  icon: React.ElementType;
  active: boolean;
  onClick: () => void;
}

const MobileTabButton = ({
  label,
  icon: Icon,
  active,
  onClick,
}: MobileTabButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        "flex min-h-11 items-center justify-center gap-2 rounded-xl border text-sm font-medium transition",
        active
          ? "border-purple-400/30 bg-purple-400/12 text-purple-200"
          : "border-white/8 bg-white/3 text-white/45",
      ].join(" ")}
    >
      <Icon className="size-4" />
      {label}
    </button>
  );
};

export default UserProfile;