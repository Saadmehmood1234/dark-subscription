"use client";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Facebook,
  Twitter,
  MessageCircle,
  Instagram,
} from "lucide-react";
import Link from "next/link";
export default function ContactPage() {
  return (
    <main
      className="min-h-screen text-white bg-gradient-to-b from-[#0D071A] to-[#1A0C3D]"
      style={{
        background: `
background-color: #37005c;
background-image: url("https://www.transparenttextures.com/patterns/asfalt-light.png");
/* This is mostly intended for prototyping; please download the pattern and re-host for production environments. Thank you! */
  `,
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="max-w-6xl mx-auto py-20 px-6">
        <section className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#A92EDF] to-purple-500 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl text-[#B4ACD9] max-w-3xl mx-auto leading-relaxed">
            Have questions, feedback, or need assistance? Our team is ready to
            support you.
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-[#1E1433] rounded-xl p-8 border border-[#2A1E3A] hover:border-[#A92EDF] transition-all">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="bg-gradient-to-r from-[#A92EDF] to-purple-500 bg-clip-text text-transparent">
                Get In Touch
              </span>
            </h2>

            <ul className="space-y-6">
              <li className="flex items-start">
                <Mail className="text-[#A92EDF] mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Email</h3>
                  <a
                    href="mailto:support@primeflix.site"
                    className="text-[#B4ACD9] hover:text-white transition-colors"
                  >
                    support@primeflix.site
                  </a>
                </div>
              </li>

              <li className="flex items-start">
                <Phone className="text-[#A92EDF] mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg">Phone</h3>
                  <p className="text-[#B4ACD9]">+91-XXXXXXXXXX</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="bg-[#1E1433] rounded-xl p-8 border border-[#2A1E3A] hover:border-[#A92EDF] transition-all">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="bg-gradient-to-r from-[#A92EDF] to-purple-500 bg-clip-text text-transparent">
                Business Hours
              </span>
            </h2>

            <div className="flex items-start mb-6">
              <Clock
                className="text-[#A92EDF] mr-4 mt-1 flex-shrink-0"
                size={32}
              />
              <div>
                <ul className="space-y-3 text-3xl">
                  <li className="text-[#B4ACD9]">24X7</li>
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-[#2A1E3A]">
              <h3 className="font-bold text-lg mb-4">Stay Connected</h3>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="text-[#B4ACD9] hover:text-[#A92EDF] transition-colors"
                >
                  <Facebook className="w-6 h-6" />
                </Link>
                <Link
                  href="#"
                  className="text-[#B4ACD9] hover:text-[#A92EDF] transition-colors"
                >
                  <Twitter className="w-6 h-6" />
                </Link>
                <Link
                  href="#"
                  className="text-[#B4ACD9] hover:text-[#A92EDF] transition-colors"
                >
                  <Instagram className="w-6 h-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <section className="bg-[#1E1433] rounded-xl p-8 border border-[#2A1E3A]">
          <h2 className="text-2xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#A92EDF] to-purple-500 bg-clip-text text-transparent">
              Send Us a Message
            </span>
          </h2>

          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-[#B4ACD9] mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full bg-[#160A25] border border-[#2A1E3A] rounded-lg px-4 py-3 focus:border-[#A92EDF] focus:ring-1 focus:ring-[#A92EDF] outline-none transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-[#B4ACD9] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-[#160A25] border border-[#2A1E3A] rounded-lg px-4 py-3 focus:border-[#A92EDF] focus:ring-1 focus:ring-[#A92EDF] outline-none transition-all"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-[#B4ACD9] mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="w-full bg-[#160A25] border border-[#2A1E3A] rounded-lg px-4 py-3 focus:border-[#A92EDF] focus:ring-1 focus:ring-[#A92EDF] outline-none transition-all"
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-[#B4ACD9] mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full bg-[#160A25] border border-[#2A1E3A] rounded-lg px-4 py-3 focus:border-[#A92EDF] focus:ring-1 focus:ring-[#A92EDF] outline-none transition-all"
                placeholder="Your message here..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-[#A92EDF] to-purple-600 hover:from-[#A92EDF]/90 hover:to-purple-600/90 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-all shadow-lg hover:shadow-[#A92EDF]/20"
            >
              Send Message
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
