import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
          <AlertTriangle className="h-6 w-6 text-red-600" />
        </div>
        <h1 className="mt-3 text-2xl font-bold text-gray-900">
          Payment Not Completed
        </h1>
        <p className="mt-2 text-gray-600">
          Your payment was canceled or failed to process. Please try again.
        </p>
        <div className="mt-6 space-x-4">
          <Link
            href="/" // Home page
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Return Home
          </Link>
          <Link
            href="/checkout" // Your checkout page
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Try Again
          </Link>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Need help?{" "}
          <a
            href="mailto:support@yourdomain.com"
            className="text-blue-600 hover:text-blue-500"
          >
            Contact support
          </a>
          .
        </p>
      </div>
    </div>
  );
}
