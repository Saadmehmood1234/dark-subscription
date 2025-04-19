"use client";
import { Truck, Wifi, Download, Mail } from "lucide-react";

export default function ShippingPolicy() {
  return (
    <main className="min-h-screen text-white bg-gradient-to-b from-[#0D071A] to-[#1A0C3D]">
      <div className="max-w-5xl mx-auto py-16 px-6">
        <section className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Truck className="text-[#A92EDF] w-12 h-12" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-[#A92EDF] to-purple-500 bg-clip-text text-transparent">
            Digital Delivery Policy
          </h1>
          <p className="text-xl text-[#B4ACD9] max-w-3xl mx-auto">
            How PrimeFlix delivers content to your devices
          </p>
        </section>
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <section className="bg-[#1E1433] rounded-xl p-8 border border-[#2A1E3A]">
            <div className="flex items-center mb-6">
              <Wifi className="text-[#A92EDF] mr-3 w-8 h-8" />
              <h2 className="text-2xl font-semibold">Instant Access</h2>
            </div>

            <div className="text-[#B4ACD9] space-y-4">
              <p>
                PrimeFlix is a digital streaming service with no physical
                shipping. All content is delivered instantly through our
                platform.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-[#A92EDF] mr-2">•</span>
                  <span>Available immediately after subscription</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#A92EDF] mr-2">•</span>
                  <span>Accessible on all your devices</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#A92EDF] mr-2">•</span>
                  <span>No waiting time or delivery delays</span>
                </li>
              </ul>
            </div>
          </section>
          <section className="bg-[#1E1433] rounded-xl p-8 border border-[#2A1E3A]">
            <div className="flex items-center mb-6">
              <Download className="text-[#A92EDF] mr-3 w-8 h-8" />
              <h2 className="text-2xl font-semibold">Offline Viewing</h2>
            </div>

            <div className="text-[#B4ACD9] space-y-4">
              <p>
                Many titles are available for download to watch offline through
                our mobile apps.
              </p>
              <div className="bg-[#160A25] p-4 rounded-lg border border-[#2A1E3A] mt-2">
                <p className="text-sm">
                  <strong>Note:</strong> Download availability varies by title
                  and region due to licensing restrictions.
                </p>
              </div>
            </div>
          </section>
        </div>
        <section className="bg-[#1E1433] rounded-xl p-8 border border-[#2A1E3A] text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Mail className="text-[#A92EDF] mr-3 w-8 h-8" />
            <h2 className="text-2xl font-semibold">
              Need Help Accessing Content?
            </h2>
          </div>

          <div className="text-[#B4ACD9] space-y-4">
            <p>
              If you're experiencing any issues with content delivery or
              playback, our support team is available to assist you.
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
          </div>
        </section>
        <section className="mt-12 text-center text-[#B4ACD9]">
          <p>
            For technical requirements, visit our{" "}
            <a href="#" className="text-[#A92EDF] hover:underline">
              Help Center
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
