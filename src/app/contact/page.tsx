"use client";

import { FormEvent, useState } from "react";
import {
  Mail,
  Phone,
  Clock,
  CheckCircle2,
  LoaderCircle,
} from "lucide-react";
import Link from "next/link";
import SocialLink from "@/components/SocialLink";

type FormStatus = "idle" | "sending" | "success" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const subject = String(formData.get("subject") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !subject || !message) {
      setStatus("error");
      setErrorMessage("Please complete all fields before sending.");
      return;
    }

    try {
      setStatus("sending");
      setErrorMessage("");

      // Replace this with your actual API request.
      // Example:
      //
      // const response = await fetch("/api/contact", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ name, email, subject, message }),
      // });
      //
      // if (!response.ok) {
      //   throw new Error("Failed to send message");
      // }

      await new Promise((resolve) => setTimeout(resolve, 1000));

      form.reset();
      setStatus("success");
    } catch (error) {
      console.error("Contact form error:", error);

      setStatus("error");
      setErrorMessage("We couldn't send your message. Please try again.");
    }
  };

  return (
    <main
      className="min-h-screen bg-[#100719] text-white"
      style={{
        backgroundImage: `
          linear-gradient(to bottom, rgba(13, 7, 26, 0.9), rgba(26, 12, 61, 0.95)),
          url("https://www.transparenttextures.com/patterns/asfalt-light.png")
        `,
      }}
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <section className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <span className="inline-flex rounded-full border border-purple-400/20 bg-purple-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-purple-200">
            Customer support
          </span>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            How can we help?
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/55 sm:text-lg">
            Have a question about your subscription or order? Send us a message
            and our support team will get back to you.
          </p>
        </section>

        <div className="mb-8 grid gap-6 md:grid-cols-2">
          <ContactInformation />

          <BusinessHours />
        </div>

        <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/4.5 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <div className="grid lg:grid-cols-[0.75fr_1.25fr]">
            <div className="border-b border-white/10 bg-purple-500/6 p-6 sm:p-8 lg:border-b-0 lg:border-r">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-purple-300">
                Send a message
              </span>

              <h2 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
                Tell us what you need help with
              </h2>

              <p className="mt-4 text-sm leading-6 text-white/50">
                Provide as much detail as possible so our team can understand
                your request and respond quickly.
              </p>

              <div className="mt-8 space-y-4 text-sm text-white/55">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-purple-300" />
                  <span>Support available 24 hours a day</span>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-purple-300" />
                  <span>Help with orders and subscriptions</span>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-purple-300" />
                  <span>Your information remains private</span>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 lg:p-10">
              {status === "success" && (
                <div
                  role="status"
                  aria-live="polite"
                  className="mb-6 flex items-start gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4"
                >
                  <div className="grid size-9 shrink-0 place-items-center rounded-full bg-emerald-400/15">
                    <CheckCircle2 className="size-5 text-emerald-300" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-emerald-100">
                      Message sent successfully
                    </h3>

                    <p className="mt-1 text-sm leading-5 text-emerald-100/65">
                      Thank you for contacting us. Our support team will get
                      back to you as soon as possible.
                    </p>
                  </div>
                </div>
              )}

              {status === "error" && (
                <div
                  role="alert"
                  className="mb-6 rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-200"
                >
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    id="name"
                    name="name"
                    label="Name"
                    type="text"
                    placeholder="Enter your name"
                    autoComplete="name"
                  />

                  <FormField
                    id="email"
                    name="email"
                    label="Email address"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </div>

                <FormField
                  id="subject"
                  name="subject"
                  label="Subject"
                  type="text"
                  placeholder="How can we help?"
                />

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-white/70"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    placeholder="Describe your question or issue..."
                    className="w-full resize-none rounded-xl border border-white/10 bg-black/15 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 hover:border-white/20 focus:border-purple-400/60 focus:ring-4 focus:ring-purple-400/10"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex cursor-pointer min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#932AD2] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-950/25 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple-900/30 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {status === "sending" ? (
                    <>
                      <LoaderCircle className="size-4 animate-spin" />
                      Sending message...
                    </>
                  ) : (
                    <>
                      <Mail className="size-4" />
                      Send message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  type: string;
  placeholder: string;
  autoComplete?: string;
}

const FormField = ({
  id,
  name,
  label,
  type,
  placeholder,
  autoComplete,
}: FormFieldProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-white/70"
      >
        {label}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-black/15 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 hover:border-white/20 focus:border-purple-400/60 focus:ring-4 focus:ring-purple-400/10"
      />
    </div>
  );
};

const ContactInformation = () => {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/4.5 p-6 backdrop-blur-xl sm:p-8">
      <h2 className="text-xl font-semibold text-white">Get in touch</h2>

      <div className="mt-7 space-y-6">
        <div className="flex items-start gap-4">
          <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-purple-400/10 text-purple-300">
            <Mail className="size-5" />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Email support</h3>

            <a
              href="mailto:mehmoodsaad347@gmail.com"
              className="mt-1 block text-sm text-white/50 transition hover:text-purple-200"
            >
              support@primeflix.site
            </a>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-purple-400/10 text-purple-300">
            <Phone className="size-5" />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Phone support</h3>

            <p className="mt-1 text-sm text-white/50">+91-9773834796</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const BusinessHours = () => {

  return (
    <section className="rounded-3xl border border-white/10 bg-white/4.5 p-6 backdrop-blur-xl sm:p-8">
      <h2 className="text-xl font-semibold text-white">Support availability</h2>

      <div className="mt-7 flex items-start gap-4">
        <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-purple-400/10 text-purple-300">
          <Clock className="size-5" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Available 24/7</h3>

          <p className="mt-1 text-sm leading-6 text-white/50">
            Our support team is available throughout the week.
          </p>
        </div>
      </div>

      <div className="mt-7 border-t border-white/10 pt-6">
        <h3 className="text-sm font-semibold text-white pl-2 mb-2">Follow us</h3>

       <SocialLink/>
      </div>
    </section>
  );
};
