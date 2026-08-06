"use client";
import React, { useEffect, FormEvent, useState } from "react";
import { CheckCircle2, LoaderCircle, Mail, TriangleAlert } from "lucide-react";
import SocialLink from "./SocialLink";
import { subscribeToNewsletter } from "@/app/actions/newsletter.actions";
type FormStatus = "idle" | "loading" | "success" | "error";
const companyLinks = [
  { name: "About", url: "/about" },
  { name: "Contact Us", url: "/contact" },
];

const legalLinks = [
  { name: "Privacy Policy", url: "/privacy" },
  { name: "Terms of Service", url: "/terms" },
  { name: "Cookie Policy", url: "/cookies" },
];

const supportLinks = [
  { name: "Refund Policy", url: "/refunds" },
  { name: "FAQ", url: "/#faq" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState("");
  useEffect(() => {
    if (status !== "success") return;

    const timeout = window.setTimeout(() => {
      setStatus("idle");
      setFeedback("");
    }, 6000);

    return () => window.clearTimeout(timeout);
  }, [status]);

  const handleSubscribe = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status === "loading") return;

    setStatus("loading");
    setFeedback("");

    try {
      const response = await subscribeToNewsletter(email);

      if (!response.success) {
        setStatus("error");
        setFeedback(response.message);
        return;
      }

      setStatus("success");
      setFeedback(response.message);
      setEmail("");
    } catch (error) {
      console.error("Newsletter form error:", error);

      setStatus("error");
      setFeedback("We couldn't subscribe you right now. Please try again.");
    }
  };

  return (
    <footer className="w-full bg-linear-to-tr from-[#160A25] via-[#180A25] to-[#0D0F29] border-t border-gray-800">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8">
          <div className="md:col-span-2 lg:col-span-1">
            <h2 className="text-2xl font-bold bg-linear-to-r from-[#A92EDF] to-purple-500 bg-clip-text text-transparent">
              PrimeFlix
            </h2>
            <p className="text-gray-400 mt-4 text-sm leading-relaxed">
              Your trusted source for premium digital subscriptions at wholesale
              prices. Serving over 50,000 satisfied customers since 2022.
            </p>

            <div className="mt-6">
              <h4 className="text-white font-medium mb-3 text-sm">Follow Us</h4>
              <SocialLink />
            </div>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                    aria-label={`Learn more about ${link.name}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Support</h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                    aria-label={`${link.name} support`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                    aria-label={`View ${link.name}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-1 lg:col-span-1 w-full">
            <h3 className="text-white font-semibold mb-4 text-lg">
              Join Our Newsletter
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Get exclusive deals and updates straight to your inbox
            </p>
            <form
              onSubmit={handleSubscribe}
              className="mt-5 space-y-3"
              noValidate
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>

              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-white/30" />

                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);

                    if (status === "error" || status === "success") {
                      setStatus("idle");
                      setFeedback("");
                    }
                  }}
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  aria-describedby={
                    feedback ? "newsletter-feedback" : undefined
                  }
                  className="min-h-12 w-full rounded-xl border border-white/10 bg-black/15 py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-white/25 hover:border-white/20 focus:border-purple-400/60 focus:ring-4 focus:ring-purple-400/10"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl cursor-pointer bg-linear-to-r from-[#A92EDF] to-purple-600 hover:from-[#8e25c9] hover:to-purple-500 px-5 text-sm font-semibold text-white shadow-lg shadow-purple-950/25 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "loading" ? (
                  <>
                    <LoaderCircle className="size-4 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  <>
                    Subscribe
                    <Mail className="size-4" />
                  </>
                )}
              </button>
            </form>

            {feedback && (
              <div
                id="newsletter-feedback"
                role={status === "error" ? "alert" : "status"}
                aria-live="polite"
                className={[
                  "mt-3 flex items-start gap-2 rounded-xl border px-3 py-2.5 text-xs leading-5",
                  status === "success"
                    ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200"
                    : "border-red-400/20 bg-red-400/10 text-red-200",
                ].join(" ")}
              >
                {status === "success" ? (
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
                ) : (
                  <TriangleAlert className="mt-0.5 size-4 shrink-0" />
                )}

                <span>{feedback}</span>
              </div>
            )}
          </div>
        </div>
        <div className="border-t mb-8 sm:mb-4 border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} PrimeFlix. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <a
                href="/sitemap.xml"
                className="text-gray-400 hover:text-purple-400 text-sm"
              >
                Sitemap
              </a>
              <a
                href="/affiliates"
                className="text-gray-400 hover:text-purple-400 text-sm"
              >
                Affiliate Program
              </a>
            </div>
          </div>
          <p className="text-gray-500 text-xs mt-4 text-center">
            PrimeFlix is not affiliated with Netflix, Spotify, or other
            trademark owners. All product names, logos, and brands are property
            of their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
