import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0C1B44] to-[#1A0C3D] flex items-center justify-center p-4">
      <div className="bg-[#0C1B44]/80 backdrop-blur-sm border-2 border-red-500/30 rounded-2xl p-8 max-w-md w-full text-center">
        <div className="flex justify-center">
          <AlertTriangle className="w-16 h-16 text-red-400" />
        </div>
        <h1 className="text-3xl font-bold mt-4 bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
          Payment Not Completed
        </h1>
        <p className="mt-2 text-gray-300">
          Your payment was canceled or failed to process. Don't worry - your
          cart has been saved.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#A92EDF] hover:bg-[#8e5ea3] transition-colors"
          >
            Return Home
          </Link>
          <Link
            href="/checkout"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-white bg-transparent hover:bg-[#0C1B44] transition-colors"
          >
            Try Again
          </Link>
        </div>

        <p className="mt-6 text-sm text-gray-400">
          Need help?{" "}
          <a
            href="mailto:support@yourdomain.com"
            className="text-[#A92EDF] hover:text-[#C27AFF] transition-colors"
          >
            Contact our support team
          </a>
        </p>

        <p className="mt-4 text-xs text-gray-500">
          If this was a mistake, you might want to check your payment method
          details.
        </p>
      </div>
    </div>
  );
}
