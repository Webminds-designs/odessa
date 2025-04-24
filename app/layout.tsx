import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ JSON-LD Structured Data for the Entire Site
const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Odessa Jewellery",
  url: "https://www.odessajewellery.com",
  logo: "https://www.odessajewellery.com/images/odessa.png",
  sameAs: [
    "https://www.facebook.com/odessajewellery",
    "https://www.instagram.com/odessajewellery",
    "https://twitter.com/odessajewellery",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+447983637117",
    contactType: "customer service",
    availableLanguage: ["English"],
  },
};

// ✅ Next.js 15 Compatible Static SEO Metadata
export const metadata: Metadata = {
  title: "Odessa | Ethical & Sustainable Lab Grown Diamonds",
  description:
    "Odessa offers high-quality, ethical, and sustainable lab-grown diamonds. Shop premium IGI-certified diamonds and custom jewelry online.",
  icons: {
    icon: "/images/odessa.png",
    shortcut: "/images/odessa.png",
    apple: "/images/odessa.png",
  },
  openGraph: {
    title: "Odessa | Ethical & Sustainable Lab Grown Diamonds",
    description:
      "Shop premium IGI-certified diamonds and custom jewelry online.",
    url: "https://www.odessajewellery.com/",
    siteName: "Odessa Jewellery",
    images: [
      {
        url: "https://www.odessajewellery.com/images/odessa.png",
        width: 1200,
        height: 630,
        alt: "Odessa Lab Diamonds",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@odessa",
    creator: "@odessa",
    title: "Odessa | Ethical & Sustainable Lab Grown Diamonds",
    description:
      "Shop premium IGI-certified diamonds and custom jewelry online.",
    images: ["https://www.odessajewellery.com/images/odessa.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    "Odessa jewellery",
    "Lab grown diamonds",
    "Ethical diamonds",
    "Sustainable diamonds",
    "Eco-friendly diamonds",
    "Luxury diamond jewelry",
    "Online diamond store",
    "High-quality diamonds",
    "Certified diamonds",
    "Custom diamond jewelry",
    "IGI-certified diamonds",
    "Odessa",
    "jewellery",
    "diamonds",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Ensuring core metadata inside <head> */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Odessa Jewellery" />
        <link rel="icon" href="/images/odessa.png" />

        {/* ✅ Inject JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavBar />
        {children}
        <Toaster position="bottom-center" reverseOrder={false} />
      </body>
    </html>
  );
}
