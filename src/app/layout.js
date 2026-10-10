import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CategoriesBar from "@/components/categories/CategoriesBar";
import MarqueeSlider from "@/components/banner/MarqueeSlider";
import Footer from "@/components/Footer";
import NextTopLoader from "nextjs-toploader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "বাজার দর",
  description: "আজকের বাজারের দাম এক নজরে",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextTopLoader
          color="#0f8a46"
        />
        <Navbar />
        <CategoriesBar />
        <MarqueeSlider />
        {children}
        <Footer />
      </body>
    </html>
  );
}
