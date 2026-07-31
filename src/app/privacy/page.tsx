"use client";
import { Shield, Lock, Cookie, CreditCard, User, Terminal, AlertCircle } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen text-white bg-linear-to-b from-[#0D071A] to-[#1A0C3D]">
      <div className="max-w-5xl mx-auto py-16 px-6">
        {/* Header Section */}
        <section className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Shield className="text-[#A92EDF] w-12 h-12" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-linear-to-r from-[#A92EDF] to-purple-500 bg-clip-text text-transparent">
            Privacy Policy & Terms of Service
          </h1>
          <p className="text-xl text-[#B4ACD9]">
            <strong>Effective Date:</strong> April 19, 2025
          </p>
        </section>

        {/* Privacy Policy Section */}
        <section className="bg-[#1E1433] rounded-xl p-8 border border-[#2A1E3A] mb-10">
          <div className="flex items-center mb-6">
            <Lock className="text-[#A92EDF] mr-3 w-8 h-8" />
            <h2 className="text-3xl font-semibold">Privacy Policy</h2>
          </div>
          
          <p className="text-lg text-[#B4ACD9] mb-6">
            At PrimeFlix, we prioritize your privacy. This policy outlines how we collect, use, and protect your information.
          </p>

          <div className="space-y-6">
            <div className="flex items-start">
              <User className="text-[#A92EDF] mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Information We Collect</h3>
                <ul className="text-[#B4ACD9] space-y-2">
                  <li className="flex items-start">
                    <span className="text-[#A92EDF] mr-2">•</span>
                    <span>Personal Information (Name, email address, payment details)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#A92EDF] mr-2">•</span>
                    <span>Usage Data (Viewing history, preferences, device information)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex items-start">
              <Terminal className="text-[#A92EDF] mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">How We Use Your Information</h3>
                <p className="text-[#B4ACD9]">
                  To personalize your streaming experience, process transactions, communicate updates, and improve our platform.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Lock className="text-[#A92EDF] mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Data Protection</h3>
                <p className="text-[#B4ACD9]">
                  We implement robust security measures to safeguard your data against unauthorized access, alteration, or disclosure.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Cookie className="text-[#A92EDF] mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Cookies</h3>
                <p className="text-[#B4ACD9]">
                  PrimeFlix uses cookies to enhance user experience. You can manage cookie preferences through your browser settings.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <CreditCard className="text-[#A92EDF] mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Third-Party Services</h3>
                <p className="text-[#B4ACD9]">
                  We may share information with trusted partners for payment processing and analytics, ensuring they adhere to strict confidentiality agreements.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Shield className="text-[#A92EDF] mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Your Rights</h3>
                <p className="text-[#B4ACD9]">
                  You have the right to access, modify, or delete your personal data. Contact us at{' '}
                  <a href="mailto:privacy@primeflix.site" className="text-[#A92EDF] hover:underline">
                    privacy@primeflix.site
                  </a>{' '}
                  for any requests.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Terms of Service Section */}
        <section className="bg-[#1E1433] rounded-xl p-8 border border-[#2A1E3A]">
          <div className="flex items-center mb-6">
            <AlertCircle className="text-[#A92EDF] mr-3 w-8 h-8" />
            <h2 className="text-3xl font-semibold">Terms of Service</h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-start">
              <User className="text-[#A92EDF] mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Account Responsibility</h3>
                <p className="text-[#B4ACD9]">
                  Users are responsible for maintaining the confidentiality of their account credentials.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Terminal className="text-[#A92EDF] mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Content Usage</h3>
                <p className="text-[#B4ACD9]">
                  Content is for personal, non-commercial use only.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <AlertCircle className="text-[#A92EDF] mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Prohibited Activities</h3>
                <p className="text-[#B4ACD9]">
                  Unauthorized distribution or commercial exploitation of content is prohibited.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Lock className="text-[#A92EDF] mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Termination</h3>
                <p className="text-[#B4ACD9]">
                  We reserve the right to suspend or terminate accounts violating our policies.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#2A1E3A]">
              <p className="text-[#B4ACD9]">
                For detailed terms, please visit our{' '}
                <a href="#" className="text-[#A92EDF] hover:underline">
                  Terms of Service
                </a>{' '}
                page.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}