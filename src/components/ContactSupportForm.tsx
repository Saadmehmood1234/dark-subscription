"use client";
import { contactUs } from "@/app/actions/contact.actions";
import { motion } from "framer-motion";
import { Mail, User, AlertCircle, MessageSquare, ShieldCheck, X, Clock, Check } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";


type FormData = {
  name?: string;
  email?: string;
  subject: string;
  message: string;
  recaptcha?: string;
};

type ContactPropType = {
  setIsOpen: (value: boolean) => void;
};

const ContactSupportForm = ({ setIsOpen }: ContactPropType) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    try {
      if (!recaptchaToken) {
        setError("Please complete the CAPTCHA");
        return;
      }

      const res = await contactUs({ ...data });
      
      if (!res.success) {
        setError(res.message || "Error sending your message");
        setTimeout(() => setError(""), 3000);
        return;
      }

      setMessage("Message sent successfully!");
      reset();
      setTimeout(() => {
        setMessage("");
        setIsOpen(false);
      }, 2000);
    } catch (error) {
      setError("Failed to send message. Please try again.");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="relative max-w-2xl mx-auto p-6 sm:p-8 bg-gradient-to-br from-[#0C1B44] to-[#1A0C3D] rounded-3xl border-2 border-[#A92EDF]/30 shadow-2xl"
      aria-modal="true"
      role="dialog"
    >
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-4 right-4 text-gray-300 hover:text-red-400 transition"
        aria-label="Close contact form"
      >
        <X size={24} />
      </button>

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#A92EDF] to-[#7B1FA2] bg-clip-text text-transparent">
          Contact Support
        </h1>
        <p className="text-gray-400 mt-2">
          We typically respond within 1 business day
        </p>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 bg-green-900/30 text-green-400 rounded-lg flex items-center justify-center gap-2"
          >
            <Check size={18} />
            {message}
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 bg-red-900/30 text-red-400 rounded-lg flex items-center justify-center gap-2"
          >
            <AlertCircle size={18} />
            {error}
          </motion.div>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <label htmlFor="name" className="block text-gray-300 mb-2">
              Your Name (Optional)
            </label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C27AFF]"
                size={20}
              />
              <input
                id="name"
                {...register("name")}
                className="w-full pl-10 pr-4 py-3 bg-[#0C1B44]/70 rounded-lg border border-[#A92EDF]/30 focus:border-[#C27AFF] focus:outline-none backdrop-blur-sm"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div className="relative">
            <label htmlFor="email" className="block text-gray-300 mb-2">
              Email (Optional)
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C27AFF]"
                size={20}
              />
              <input
                id="email"
                {...register("email", {
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                })}
                className="w-full pl-10 pr-4 py-3 bg-[#0C1B44]/70 rounded-lg border border-[#A92EDF]/30 focus:border-[#C27AFF] focus:outline-none backdrop-blur-sm"
                placeholder="your@email.com"
                type="email"
              />
            </div>
            {errors.email && (
              <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                <AlertCircle size={16} /> Please enter a valid email
              </p>
            )}
          </div>
        </div>

        <div className="relative">
          <label htmlFor="subject" className="block text-gray-300 mb-2">
            Subject *
          </label>
          <div className="relative">
            <select
              id="subject"
              {...register("subject", { required: true })}
              className="w-full pl-4 pr-10 py-3 bg-[#0C1B44]/70 rounded-lg border border-[#A92EDF]/30 focus:border-[#C27AFF] focus:outline-none backdrop-blur-sm appearance-none"
            >
              <option value="">Select an issue</option>
              <option value="billing">Billing/Payment</option>
              <option value="technical">Technical Support</option>
              <option value="account">Account Access</option>
              <option value="refund">Refund Request</option>
              <option value="other">Other Inquiry</option>
            </select>
            <AlertCircle
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C27AFF] pointer-events-none"
              size={20}
            />
          </div>
          {errors.subject && (
            <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
              <AlertCircle size={16} /> Please select a subject
            </p>
          )}
        </div>

        <div className="relative">
          <label htmlFor="message" className="block text-gray-300 mb-2">
            Message *
          </label>
          <div className="relative">
            <MessageSquare
              className="absolute left-3 top-4 text-[#C27AFF]"
              size={20}
            />
            <textarea
              id="message"
              {...register("message", { 
                required: true,
                minLength: 20
              })}
              className="w-full pl-10 pr-4 py-3 bg-[#0C1B44]/70 rounded-lg border border-[#A92EDF]/30 focus:border-[#C27AFF] focus:outline-none min-h-[150px] backdrop-blur-sm"
              placeholder="Please describe your issue in detail (minimum 20 characters)..."
            />
          </div>
          {errors.message && (
            <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
              <AlertCircle size={16} /> 
              {errors.message.type === "required" 
                ? "Message is required" 
                : "Please provide more details (min 20 chars)"}
            </p>
          )}
        </div>

        {/* <div className="flex justify-center">
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
            onChange={setRecaptchaToken}
          />
        </div> */}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-[#A92EDF] to-[#7B1FA2] hover:from-[#8e25c9] hover:to-[#6a1b99] py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-70"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
          {!isSubmitting && <Mail size={18} />}
        </motion.button>

        <div className="flex flex-wrap justify-center gap-6 text-gray-400 mt-8 text-sm">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-green-400" size={16} />
            <span>256-bit SSL Encryption</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="text-blue-400" size={16} />
            <span>24/7 Support</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="text-yellow-400" size={16} />
            <span>Guaranteed Response</span>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default ContactSupportForm;