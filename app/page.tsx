"use client";

// import Hero from "./components/Hero";
import Highlight from "./components/Highlight";
import ShopByShape from "./components/ShopByShape";
import HeroContent from "./components/HeroContent";
import Footer from "./components/Footer";
import Contact from "./components/Contanct";
import NewCollection from "./components/NewCollection";
import dynamic from "next/dynamic";
// import NavBar from "./components/NavBar";

const Hero = dynamic(() => import("./components/Hero"), { ssr: false });

export default function Home() {
  return (
    <div>
      <Hero />
      <HeroContent />
      <div className="w-full h-screen"></div>
      <div className="w-full lg:h-[500px]"></div>
      <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-30 sm:p-20 bg-primary">
        <Highlight />
        <ShopByShape />
        <NewCollection />
        <div className="w-full h-0.5 "></div>
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
