import Image from "next/image";
import Hero from "./components/Hero";
import Highlight from "./components/Highlight";
import ShopByShape from "./components/ShopByShape";
import NewCollection from "./components/NewCollection";

export default function Home() {
  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-30 sm:p-20">
      <Hero />
      <Highlight />
      <ShopByShape />
      <NewCollection />
    </div>
  );
}
