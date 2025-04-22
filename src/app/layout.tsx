import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import { getServerSession } from "next-auth";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ReduxProvider } from "./StoreProvider";
import { authOptions } from "@/auth";
import Script from "next/script";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.primeflix.site"),
  title: {
    default: "Prime Flix - Premium Accounts at Affordable Prices",
    template: "%s | Prime Flix"
  },
  description: "Get verified premium accounts for Netflix, Amazon Prime, Tinder Gold, Spotify, and more at the cheapest prices. Instant delivery, 24/7 support, and lifetime replacements.",
  applicationName: "Prime Flix",
  referrer: "origin-when-cross-origin",
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
  creator: "Prime Flix Team",
  publisher: "Prime Flix",
  formatDetection: {
    email: true,
    address: false,
    telephone: true,
  },
  alternates: {
    canonical: "/",
  },
  themeColor: "#0E091C",
  category: "e-commerce",
  openGraph: {
    title: "Prime Flix - Premium Accounts at Low Costs",
    siteName: "Prime Flix",
    description: "Trusted marketplace for discounted Netflix, Amazon, Tinder, and other premium subscriptions.",
    url: "https://www.primeflix.site",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Prime Flix Premium Accounts Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prime Flix - Premium Accounts at Low Costs",
    description: "Trusted marketplace for discounted premium subscriptions.",
    creator: "@primeflix",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      new URL("/favicon.ico", "https://www.primeflix.site"),
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#A92EDF",
      },
    ],
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  other: {
    "msapplication-TileColor": "#0E091C",
    "msapplication-config": "/browserconfig.xml",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="bg-gradient-to-tr from-[#0E091C] via-[#1F133D] min-h-screen to-[#0B1027] overflow-x-hidden flex flex-col justify-between w-full pt-20">
          <SessionProviderWrapper session={session}>
            <ReduxProvider>
              <Navbar />
              {children}
              <Footer />
            </ReduxProvider>
          </SessionProviderWrapper>
          <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-MYTBDFD9E8`}
        />
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
