import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import { Toaster } from "react-hot-toast";
import { DefaultSeo } from "next-seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// SEO Configuration
const SEO = {
  title: "Odessa | Ethical & Sustainable Lab Grown Diamonds",
  description:
    "Odessa offers high-quality, ethical, and sustainable lab-grown diamonds. Shop premium IGI-certified diamonds and custom jewelry online.",
  canonical: "https://www.odessajewellery.com/",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.odessajewellery.com/",
    title: "Odessa | Ethical & Sustainable Lab Grown Diamonds",
    description:
      "Odessa offers high-quality, ethical, and sustainable lab-grown diamonds. Shop premium IGI-certified diamonds and custom jewelry online.",
    images: [
      {
        url: "https://www.odessajewellery.com/images/odessa.png",
        width: 1200,
        height: 630,
        alt: "Odessa Lab Diamonds",
      },
    ],
  },
  twitter: {
    handle: "@odessa",
    site: "@odessa",
    cardType: "summary_large_image",
  },
  additionalMetaTags: [
    {
      name: "keywords",
      content:
        "Lab grown diamonds, Ethical diamonds, Sustainable diamonds, Eco-friendly diamonds, Lab created diamonds, Conflict-free diamonds, Affordable diamond jewelry, Luxury lab grown diamonds, High quality lab diamonds, IGI certified diamonds, Cushion brilliant cut diamond, Pear cut diamond, Asscher cut diamond, Emerald cut diamond, Princess cut diamond, Unique diamond cuts, Custom diamond jewelry, Custom-designed diamonds, Handcrafted diamond pieces, Exquisite diamond jewelry, Timeless elegance diamonds, Sparkling diamond jewelry, Shimmering diamond collection, Premium diamond collection, Designer lab grown diamonds, Contemporary diamond styles, Modern diamond designs, Modern lab diamond cuts, Tailored diamond craftsmanship, Next-generation diamond jewelry, Innovative diamond technology, High clarity diamonds, F color diamonds, VS1 clarity diamond, Online diamond shop, Online diamond jewelry store, Online lab diamond store, Designer ethical diamonds, Ethical lab grown jewelry, Sustainable luxury jewelry, Eco-chic diamonds, Affordable luxury diamonds, Diamond quality assurance, Lab diamond trends, Modern diamond aesthetics, Exquisite lab grown designs, Custom lab diamond designs, Unique lab diamond jewelry, Odessa diamonds, Odessa lab diamonds, Diamonds, Labgrown, Ethical, Sustainable, Luxury, Jewelry, Cushion, Brilliant, Pear, Asscher, Emerald, Princess, Unique, Custom, Handcrafted, Elegant, Sparkle, Quality, Designer, Modern, Affordable, Timeless, Exclusive, Innovative, Cut, Clarity, Color, Style, Collection, Trendy, Chic, Exquisite, Tailored, Creative, Refined, Artisanal, Premium, Certified, Odessa, Brilliance, Radiant, Flawless, Gem, Eco, Green, Pure, Sparkling, Dazzle, Shimmer, Polished, Jewellery",
    },
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
        <DefaultSeo {...SEO} />
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
