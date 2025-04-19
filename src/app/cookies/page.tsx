"use client";
import { Cookie, Settings, BarChart2, Shield } from "lucide-react";

export default function CookiePolicy() {
  return (
    <main className="min-h-screen text-white bg-gradient-to-b from-[#0D071A] to-[#1A0C3D]">
      <div className="max-w-4xl mx-auto py-16 px-6">
        <section className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Cookie className="text-[#A92EDF] w-12 h-12" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#A92EDF] to-purple-500 bg-clip-text text-transparent">
            Cookie Policy
          </h1>
          <p className="text-xl text-[#B4ACD9] max-w-3xl mx-auto">
            PrimeFlix uses cookies to enhance your browsing experience. This
            policy outlines how we use cookies on our platform.
          </p>
        </section>
        <div className="space-y-10">
          <section className="bg-[#1E1433] rounded-xl p-8 border border-[#2A1E3A]">
            <div className="flex items-center mb-4">
              <Cookie className="text-[#A92EDF] mr-3 w-6 h-6" />
              <h2 className="text-2xl font-semibold">What Are Cookies?</h2>
            </div>
            <p className="text-[#B4ACD9]">
              Cookies are small text files stored on your device to collect
              standard internet log information and visitor behavior
              information.
            </p>
          </section>
          <section className="bg-[#1E1433] rounded-xl p-8 border border-[#2A1E3A]">
            <div className="flex items-center mb-4">
              <Settings className="text-[#A92EDF] mr-3 w-6 h-6" />
              <h2 className="text-2xl font-semibold">How We Use Cookies</h2>
            </div>
            <ul className="space-y-3 text-[#B4ACD9]">
              <li className="flex items-start">
                <span className="text-[#A92EDF] mr-2">•</span>
                <span>To remember your preferences and settings</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#A92EDF] mr-2">•</span>
                <span>To understand how you use our website</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#A92EDF] mr-2">•</span>
                <span>To improve site functionality and user experience</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#A92EDF] mr-2">•</span>
                <span>To deliver personalized content and recommendations</span>
              </li>
            </ul>
          </section>
          <section className="bg-[#1E1433] rounded-xl p-8 border border-[#2A1E3A]">
            <div className="flex items-center mb-4">
              <Shield className="text-[#A92EDF] mr-3 w-6 h-6" />
              <h2 className="text-2xl font-semibold">Managing Cookies</h2>
            </div>
            <p className="text-[#B4ACD9] mb-4">
              You can set your browser not to accept cookies. However, in a few
              cases, some of our website features may not function as a result.
            </p>
            <p className="text-[#B4ACD9]">Most browsers allow you to:</p>
            <ul className="space-y-2 mt-2 text-[#B4ACD9]">
              <li className="flex items-start">
                <span className="text-[#A92EDF] mr-2">•</span>
                <span>See what cookies are stored and delete them</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#A92EDF] mr-2">•</span>
                <span>Block cookies from specific sites</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#A92EDF] mr-2">•</span>
                <span>Block all cookies</span>
              </li>
            </ul>
          </section>
          <section className="bg-[#1E1433] rounded-xl p-8 border border-[#2A1E3A] text-center">
            <div className="flex justify-center mb-4">
              <BarChart2 className="text-[#A92EDF] w-8 h-8" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">
              Need More Information?
            </h2>
            <p className="text-[#B4ACD9] mb-4">
              For more details about our cookie usage or privacy practices,
              please contact us.
            </p>
            <a
              href="mailto:privacy@primeflix.site"
              className="inline-block bg-gradient-to-r from-[#A92EDF] to-purple-600 hover:from-[#A92EDF]/90 hover:to-purple-600/90 text-white font-medium py-2 px-6 rounded-lg transition-all"
            >
              Contact Privacy Team
            </a>
          </section>
        </div>
      </div>
    </main>
  );
}
