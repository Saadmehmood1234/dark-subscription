"use client";

import type { User } from "next-auth";
import {
  ArrowLeft,
  CalendarDays,
  ChevronRight,
  Package,
  ReceiptText,
  RefreshCw,
  ShoppingBag,
} from "lucide-react";
import { useState } from "react";

import type { Order } from "@/lib/types";
import DownloadOrderInvoice from "./Download";

interface OrderHistoryProps {
  orders: Order[];
  loading: boolean;
  user: User;
  error?: string | null;
  onRetry?: () => void;
}

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const OrderHistory = ({
  orders,
  loading,
  user,
  error,
  onRetry,
}: OrderHistoryProps) => {
  const [selectedOrder, setSelectedOrder] =
    useState<Order | null>(null);

  if (loading) {
    return <OrderHistorySkeleton />;
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-red-400/15 bg-red-400/5 px-6 py-12 text-center">
        <Package className="mx-auto size-8 text-red-300" />

        <h2 className="mt-4 text-lg font-semibold text-white">
          We could not load your orders
        </h2>

        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-white/45">
          {error}
        </p>

        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            <RefreshCw className="size-4" />
            Try again
          </button>
        )}
      </div>
    );
  }

  if (selectedOrder) {
    return (
      <OrderDetails
        order={selectedOrder}
        user={user}
        onBack={() => setSelectedOrder(null)}
      />
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-3 border-b border-white/8 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-purple-300">
            Purchases
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-white">
            Order history
          </h2>

          <p className="mt-2 text-sm text-white/45">
            Review your subscriptions and download invoices.
          </p>
        </div>

        {orders.length > 0 && (
          <p className="text-sm text-white/35">
            {orders.length} {orders.length === 1 ? "order" : "orders"}
          </p>
        )}
      </div>

      {orders.length === 0 ? (
        <div className="py-16 text-center">
          <div className="mx-auto grid size-16 place-items-center rounded-2xl border border-white/8 bg-white/5">
            <ShoppingBag className="size-7 text-white/35" />
          </div>

          <h3 className="mt-5 text-lg font-semibold text-white">
            No orders yet
          </h3>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-white/40">
            When you purchase a subscription, it will appear here with
            its status and invoice.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-6 space-y-3 md:hidden">
            {orders.map((order) => (
              <button
                key={order.id}
                type="button"
                onClick={() => setSelectedOrder(order)}
                className="flex w-full cursor-pointer items-center gap-3 rounded-2xl border border-white/8 bg-white/2.5 p-4 text-left transition hover:border-purple-400/20 hover:bg-white/5"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-purple-400/10 text-purple-300">
                  <ReceiptText className="size-5" />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-white">
                    Order #{order.id.slice(0, 8).toUpperCase()}
                  </span>

                  <span className="mt-1 block text-xs text-white/40">
                    {formatDate(order.createdAt)}
                  </span>

                  <span className="mt-2 flex items-center justify-between gap-3">
                    <OrderStatus status={order.status} />

                    <span className="text-sm font-semibold text-white">
                      {formatCurrency(order.totalAmount)}
                    </span>
                  </span>
                </span>

                <ChevronRight className="size-5 shrink-0 text-white/30" />
              </button>
            ))}
          </div>

          <div className="mt-6 hidden overflow-hidden rounded-2xl border border-white/8 md:block">
            <table className="w-full">
              <thead className="bg-white/[0.035]">
                <tr className="text-left">
                  <TableHeading>Order</TableHeading>
                  <TableHeading>Date</TableHeading>
                  <TableHeading>Status</TableHeading>
                  <TableHeading>Total</TableHeading>
                  <TableHeading align="right">Action</TableHeading>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/7">
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="transition hover:bg-white/2.5"
                  >
                    <td className="px-5 py-4 text-sm font-semibold text-white">
                      #{order.id.slice(0, 8).toUpperCase()}
                    </td>

                    <td className="px-5 py-4 text-sm text-white/50">
                      {formatDate(order.createdAt)}
                    </td>

                    <td className="px-5 py-4">
                      <OrderStatus status={order.status} />
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-white">
                      {formatCurrency(order.totalAmount)}
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedOrder(order)}
                        className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-purple-300 transition hover:text-purple-200"
                      >
                        View details
                        <ChevronRight className="size-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

interface OrderDetailsProps {
  order: Order;
  user: User;
  onBack: () => void;
}

const OrderDetails = ({
  order,
  user,
  onBack,
}: OrderDetailsProps) => {
  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="inline-flex border border-gray-700 rounded-xl px-3 py-2 cursor-pointer items-center gap-2 text-sm font-medium text-white/45 transition hover:text-white"
      >
        <ArrowLeft className="size-4" />
        Back to orders
      </button>

      <div className="mt-5 flex flex-col gap-3 border-b border-white/8 pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-white/35">
            Order details
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-white">
            #{order.id.slice(0, 8).toUpperCase()}
          </h2>
        </div>

        <OrderStatus status={order.status} />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <OrderSummaryCard
          icon={CalendarDays}
          label="Order date"
          value={formatDate(order.createdAt)}
        />

        <OrderSummaryCard
          icon={Package}
          label="Items"
          value={`${order.products.length} ${
            order.products.length === 1 ? "item" : "items"
          }`}
        />

        <OrderSummaryCard
          icon={ReceiptText}
          label="Total amount"
          value={formatCurrency(order.totalAmount)}
        />
      </div>

      <div className="mt-8">
        <h3 className="text-base font-semibold text-white">
          Products
        </h3>

        <div className="mt-4 space-y-3">
          {order.products.map((item: any, index: number) => (
            <div
              key={`${item.product?.id || index}-${index}`}
              className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/2.5 p-4"
            >
              <div className="size-14 shrink-0 overflow-hidden rounded-xl bg-white p-2 sm:size-16">
                <img
                  src={
                    item.product?.logoImage ||
                    "/product-placeholder.png"
                  }
                  alt={item.product?.title || "Product"}
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h4 className="truncate text-sm font-semibold text-white">
                  {item.product?.title || "Product"}
                </h4>

                {item.product?.category && (
                  <p className="mt-1 truncate text-xs text-white/35">
                    {item.product.category}
                  </p>
                )}

                <p className="mt-1 text-xs text-white/45">
                  Quantity: {item.quantity}
                </p>
              </div>

              <p className="shrink-0 text-sm font-semibold text-white">
                {formatCurrency(
                  Number(item.product?.price || item.price || 0),
                )}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-end border-t border-white/8 pt-6">
        <DownloadOrderInvoice order={order} user={user} />
      </div>
    </div>
  );
};

const OrderStatus = ({ status }: { status: string }) => {
  const normalizedStatus = status.toLowerCase();

  const styles: Record<string, string> = {
    delivered:
      "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
    completed:
      "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
    processing:
      "border-blue-400/20 bg-blue-400/10 text-blue-300",
    pending:
      "border-amber-400/20 bg-amber-400/10 text-amber-300",
    cancelled:
      "border-red-400/20 bg-red-400/10 text-red-300",
    failed:
      "border-red-400/20 bg-red-400/10 text-red-300",
  };

  return (
    <span
      className={[
        "inline-flex w-fit rounded-full border px-2.5 py-1 text-[11px] font-semibold capitalize",
        styles[normalizedStatus] ||
          "border-white/10 bg-white/5 text-white/50",
      ].join(" ")}
    >
      {normalizedStatus}
    </span>
  );
};

const OrderSummaryCard = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) => {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/2.5 p-4">
      <Icon className="size-5 text-purple-300" />

      <p className="mt-4 text-xs uppercase tracking-wider text-white/30">
        {label}
      </p>

      <p className="mt-1.5 text-sm font-semibold text-white">
        {value}
      </p>
    </div>
  );
};

const TableHeading = ({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) => {
  return (
    <th
      className={[
        "px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-white/35",
        align === "right" ? "text-right" : "text-left",
      ].join(" ")}
    >
      {children}
    </th>
  );
};

const OrderHistorySkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="h-4 w-24 rounded bg-white/7" />
      <div className="mt-3 h-7 w-44 rounded bg-white/8" />

      <div className="mt-8 space-y-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-20 rounded-2xl border border-white/6 bg-white/3"
          />
        ))}
      </div>
    </div>
  );
};

const formatDate = (value: string | Date) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Unknown date";
  }

  return dateFormatter.format(date);
};

const formatCurrency = (value: number) => {
  return currencyFormatter.format(Number(value) || 0);
};

export default OrderHistory;