"use client";
import { contactUs } from "@/app/actions/contact.actions";
import { motion } from "framer-motion";
import {
  Mail,
  User,
  AlertCircle,
  MessageSquare,
  ShieldCheck,
  X,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

type ContactPropType = {
  setIsOpen: (value: boolean) => void;
};

const ContactSupportForm = ({ setIsOpen }: ContactPropType) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const onSubmit = async (data: any) => {
    try {
      console.log(data);
      const res = await contactUs(data);
      if (!res.success) {
        setError("Error in Sending The message");
        setMessage("");
        return;
      }
      setMessage("Message Sent Successfully");
      setError("");
      reset();
    } catch (error: any) {
      setError("Error in Sending the Message");
      setMessage("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative max-w-2xl mx-auto p-6 sm:p-8 bg-gradient-to-br from-[#0C1B44] to-[#1A0C3D] rounded-3xl border-2 border-[#A92EDF]/30 shadow-2xl"
    >
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-4 right-4 text-gray-300 hover:text-red-400 transition"
      >
        <X size={24} className="cursor-pointer"/>
      </button>

      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-[#A92EDF] to-[#A92EDF] bg-clip-text text-transparent">
          Request a service
        </h2>
        <p className="text-gray-400 mt-2">
          We'll get back to you within 24 hours
        </p>

        {message && <p className="text-xl text-green-500">{message}</p>}
        {error && <p className="text-xl text-red-500">{error}</p>}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <label className="block text-gray-300 mb-2">Your Name</label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C27AFF]"
                size={20}
              />
              <input
                {...register("name", { required: true })}
                className="w-full pl-10 pr-4 py-3 bg-[#0C1B44] rounded-lg border border-[#A92EDF]/30 focus:border-[#C27AFF] focus:outline-none"
                placeholder="Saad Mehmood"
              />
            </div>
            {errors.name && (
              <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                <AlertCircle size={16} /> Name is required
              </p>
            )}
          </div>

          <div className="relative">
            <label className="block text-gray-300 mb-2">Email Address</label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C27AFF]"
                size={20}
              />
              <input
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
                className="w-full pl-10 pr-4 py-3 bg-[#0C1B44] rounded-lg border border-[#A92EDF]/30 focus:border-[#C27AFF] focus:outline-none"
                placeholder="saad@gmail.com"
              />
            </div>
            {errors.email && (
              <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                <AlertCircle size={16} /> Valid email is required
              </p>
            )}
          </div>
        </div>
        <div className="relative">
          <label className="block text-gray-300 mb-2">Subject</label>
          <div className="relative">
            <select
              {...register("subject", { required: true })}
              className="w-full pl-4 pr-4 py-3 bg-[#0C1B44] rounded-lg border border-[#A92EDF]/30 focus:border-[#C27AFF] focus:outline-none appearance-none"
            >
              <option value="">Select an issue</option>
              <option value="billing">Billing Issue</option>
              <option value="technical">Technical Support</option>
              <option value="account">Account Help</option>
              <option value="other">Other</option>
            </select>
            <AlertCircle
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C27AFF]"
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
          <label className="block text-gray-300 mb-2">Message</label>
          <div className="relative">
            <MessageSquare
              className="absolute left-3 top-4 text-[#C27AFF]"
              size={20}
            />
            <textarea
              {...register("message", { required: true })}
              className="w-full pl-10 pr-4 py-3 bg-[#0C1B44] rounded-lg border border-[#A92EDF]/30 focus:border-[#C27AFF] focus:outline-none min-h-[150px]"
              placeholder="Describe your issue in detail..."
            />
          </div>
          {errors.message && (
            <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
              <AlertCircle size={16} /> Message is required
            </p>
          )}
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-[#A92EDF] hover:bg-[#8e5ea3] py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
        >
          Send Message
        </motion.button>
        <div className="flex flex-wrap justify-center gap-6 text-gray-400 mt-8">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-green-400" size={18} />
            <span className="text-sm">Secure Form</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle className="text-blue-400" size={18} />
            <span className="text-sm">24/7 Support</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-yellow-400">✓</span>
            <span className="text-sm">Quick Response</span>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default ContactSupportForm;
