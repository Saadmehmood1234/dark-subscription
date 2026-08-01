"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import QRCode from "qrcode";
import {
  createQrOrder,
  submitPaymentReference,
} from "@/app/actions/payment.actions";

interface CartItem {
  product: {
    _id?: string;
    id?: string;
    title: string;
    images: string[];
  };
  quantity: number;
  price: number;
}

interface CheckoutModalProps {
  cartItems: CartItem[];
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({
  cartItems,
  isOpen,
  onClose,
}: CheckoutModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [upiUri, setUpiUri] = useState("");
  const [upiId, setUpiId] = useState("");
  const [payeeName, setPayeeName] = useState("");
  const [amount, setAmount] = useState(0);
  const [reference, setReference] = useState("");
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  const getProductId = (item: CartItem) => item.product._id || item.product.id || "";

  if (!isOpen) return null;

  const handleGenerateQr = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      const result = await createQrOrder({
        items: cartItems.map((item) => ({
          productId: getProductId(item),
          quantity: item.quantity,
        })),
      });

      if (
        !result.success ||
        !result.orderId ||
        !result.upiUri ||
        !result.upiId ||
        !result.payeeName ||
        !result.totalAmount
      ) {
        throw new Error(result.error || "Unable to generate payment QR");
      }

      const dataUrl = await QRCode.toDataURL(result.upiUri, {
        width: 320,
        margin: 2,
        errorCorrectionLevel: "M",
      });

      setOrderId(result.orderId);
      setQrDataUrl(dataUrl);
      setUpiUri(result.upiUri);
      setUpiId(result.upiId);
      setPayeeName(result.payeeName);
      setAmount(result.totalAmount);
    } catch (paymentError: unknown) {
      setError(
        paymentError instanceof Error
          ? paymentError.message
          : "Unable to generate payment QR"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReferenceSubmit = async () => {
    if (!orderId) return;
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await submitPaymentReference(orderId, reference);
      if (!result.success) {
        throw new Error(result.error || "Unable to submit payment reference");
      }
      window.location.assign(`/success?order_id=${encodeURIComponent(orderId)}`);
    } catch (paymentError: unknown) {
      setError(
        paymentError instanceof Error
          ? paymentError.message
          : "Unable to submit payment reference"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 bg-linear-to-br from-[#0C1B44] to-[#1A0C3D] rounded-3xl border-2 border-[#A92EDF]/30 shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          disabled={isProcessing || isSubmitting}
          aria-label="Close checkout"
          className="absolute top-4 right-4 text-gray-300 hover:text-red-400 disabled:opacity-50"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-[#C27AFF]">Pay PrimeFlix</h2>
          <p className="text-gray-400 mt-2">Scan the UPI QR and submit your UTR</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/30 border border-red-500 rounded-lg text-red-200">
            {error}
          </div>
        )}

        {!qrDataUrl ? (
          <>
            <div className="space-y-2">
              {cartItems.map((item) => (
                <div
                  key={getProductId(item)}
                  className="flex items-center justify-between border-b border-[#A92EDF]/30 py-3"
                >
                  <div className="flex items-center gap-4">
                    {item.product.images?.[0] && (
                      <img
                        src={item.product.images[0]}
                        alt=""
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    )}
                    <div>
                      <p className="font-semibold text-sm text-gray-200">
                        {item.product.title}
                      </p>
                      <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-medium text-[#C27AFF]">₹{item.price.toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-between py-4 border-b border-[#A92EDF]/30">
              <span className="text-lg font-semibold text-gray-300">Total</span>
              <span className="text-xl font-bold text-[#C27AFF]">₹{total.toFixed(2)}</span>
            </div>

            <button
              type="button"
              onClick={handleGenerateQr}
              disabled={isProcessing || cartItems.length === 0}
              className="w-full mt-6 bg-[#A92EDF] hover:bg-[#8e5ea3] text-white py-3 rounded-xl font-semibold disabled:opacity-60"
            >
              {isProcessing ? "Generating QR…" : "Generate UPI QR"}
            </button>
          </>
        ) : (
          <div className="text-center">
            <div className="mx-auto max-w-sm rounded-2xl bg-white p-4">
              <img
                src={qrDataUrl}
                alt="PrimeFlix UPI payment QR code"
                className="mx-auto w-full max-w-[320px]"
              />
            </div>
            <p className="mt-4 text-2xl font-bold text-white">Pay exactly ₹{amount.toFixed(2)}</p>
            <p className="mt-1 text-gray-300">{payeeName} · {upiId}</p>
            <a
              href={upiUri}
              className="mt-4 inline-flex rounded-lg border border-[#C27AFF] px-5 py-2 text-[#C27AFF] hover:bg-[#C27AFF]/10"
            >
              Open UPI app
            </a>

            <div className="mt-6 text-left">
              <label htmlFor="payment-reference" className="block text-sm text-gray-300">
                UTR / transaction reference
              </label>
              <input
                id="payment-reference"
                type="text"
                inputMode="text"
                autoComplete="off"
                value={reference}
                onChange={(event) => setReference(event.target.value.replace(/\s/g, ""))}
                placeholder="Enter reference after payment"
                maxLength={30}
                className="mt-2 w-full rounded-lg border border-[#A92EDF]/30 bg-[#0C1B44] px-4 py-3 text-white outline-none focus:border-[#C27AFF]"
              />
              <p className="mt-2 text-xs text-gray-400">
                Your order will be confirmed after the payment is checked by an admin.
              </p>
              <button
                type="button"
                onClick={handleReferenceSubmit}
                disabled={isSubmitting || reference.trim().length < 8}
                className="w-full mt-4 bg-[#A92EDF] hover:bg-[#8e5ea3] text-white py-3 rounded-xl font-semibold disabled:opacity-60"
              >
                {isSubmitting ? "Submitting…" : "I have paid — submit reference"}
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
