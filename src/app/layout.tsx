import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ReduxProvider } from "./StoreProvider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Prime Flix - Buy Premium Accounts at Affordable Prices | Netflix, Amazon, Tinder & More",
  description:
    "Get verified premium accounts for Netflix, Amazon Prime, Tinder Gold, Spotify, and more at the cheapest prices. Instant delivery, 24/7 support, and lifetime replacements.",
  keywords: [
    "cheap Netflix premium",
    "buy Amazon Prime account",
    "Tinder Gold subscription",
    "Spotify Premium discount",
    "premium accounts store",
    "affordable streaming accounts",
    "Prime Flix",
    "legitimate premium accounts",
  ],
  openGraph: {
    title: "Prime Flix - Premium Accounts at Low Costs",
    description:
      "Trusted marketplace for discounted Netflix, Amazon, Tinder, and other premium subscriptions.",
    type: "website",
    url: "https://yourwebsite.com",
    images: [
      {
        url: "https://yourwebsite.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Prime Flix Premium Accounts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prime Flix - Premium Accounts at Low Costs",
    description: "Trusted marketplace for discounted premium subscriptions.",
    images: ["https://yourwebsite.com/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [
    {
      name: "Prime Flix Team",
      url: "https://yourwebsite.com",
    },
  ],
  metadataBase: new URL("https://yourwebsite.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="bg-gradient-to-tr from-[#0E091C] via-[#1F133D] min-h-screen to-[#0B1027] flex flex-col justify-between w-full pt-20">
          <ReduxProvider>
            <Navbar />
            {children}
            <Footer />
          </ReduxProvider>
        </div>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#0C1B44",
              color: "#fff",
              border: "1px solid #A92EDF",
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: "#A92EDF",
                secondary: "#fff",
              },
            },
            error: {
              style: {
                border: "1px solid #ff4d4f",
              },
              iconTheme: {
                primary: "#ff4d4f",
                secondary: "#fff",
              },
            },
            loading: {
              duration: Infinity,
            },
          }}
        />
      </body>
    </html>
  );
}
