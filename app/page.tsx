import Image from "next/image";
import Hero from "./components/Hero";
import Highlight from "./components/Highlight";
import ShopByShape from "./components/ShopByShape";

export default function Home() {
  return (
    <div className="p-8 pb-20 gap-16 sm:p-20">
      {/* <Hero /> */}
      {/* <Highlight /> */}
      <ShopByShape />
    </div>
  );
}
