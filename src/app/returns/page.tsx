"use client";
import { RefreshCw, HelpCircle, Mail } from "lucide-react";

export default function ReturnsPolicy() {
  return (
    <main className="min-h-screen text-white bg-gradient-to-b from-[#0D071A] to-[#1A0C3D]">
      <div className="max-w-5xl mx-auto py-16 px-6">
        <section className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <RefreshCw className="text-[#A92EDF] w-12 h-12" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-[#A92EDF] to-purple-500 bg-clip-text text-transparent">
            Returns Policy
          </h1>
          <p className="text-xl text-[#B4ACD9] max-w-3xl mx-auto">
            Our policy for digital content and subscription services
          </p>
        </section>
        <div className="grid md:grid-cols-2 gap-8">
          <section className="bg-[#1E1433] rounded-xl p-8 border border-[#2A1E3A]">
            <div className="flex items-center mb-6">
              <HelpCircle className="text-[#A92EDF] mr-3 w-8 h-8" />
              <h2 className="text-2xl font-semibold">Digital Content Policy</h2>
            </div>

            <div className="text-[#B4ACD9] space-y-4">
              <p>
                PrimeFlix provides digital streaming content, which means
                traditional returns don't apply to our service.
              </p>
              <div className="bg-[#160A25] p-4 rounded-lg border border-[#2A1E3A] mt-2">
                <p className="text-sm">
                  <strong>Please note:</strong> Once you access our content, we
                  cannot offer returns or refunds except under special
                  circumstances.
                </p>
              </div>
            </div>
          </section>

          {/* Support Section */}
          <section className="bg-[#1E1433] rounded-xl p-8 border border-[#2A1E3A]">
            <div className="flex items-center mb-6">
              <Mail className="text-[#A92EDF] mr-3 w-8 h-8" />
              <h2 className="text-2xl font-semibold">Need Assistance?</h2>
            </div>

            <div className="text-[#B4ACD9] space-y-4">
              <p>
                If you're experiencing any issues with our service, our support
                team is ready to help.
              </p>
              <div className="mt-6">
                <a
                  href="mailto:support@primeflix.site"
                  className="inline-flex items-center bg-gradient-to-r from-[#A92EDF] to-purple-600 hover:from-[#A92EDF]/90 hover:to-purple-600/90 text-white font-medium py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-[#A92EDF]/20"
                >
                  <Mail className="mr-2 w-5 h-5" />
                  Contact Support
                </a>
              </div>
              <p className="text-sm text-[#B4ACD9]/70 mt-2">
                Typical response time: 24-48 hours
              </p>
            </div>
          </section>
        </div>
        <section className="mt-12 text-center text-[#B4ACD9]">
          <p className="mb-2">
            For subscription-related inquiries, please see our{" "}
            <a href="#" className="text-[#A92EDF] hover:underline">
              Refund Policy
            </a>
          </p>
          <p>
            For technical issues, visit our{" "}
            <a href="#" className="text-[#A92EDF] hover:underline">
              Help Center
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
