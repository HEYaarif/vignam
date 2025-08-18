'use client';
import HeroSection from "@/components/HeroSection";
import HeroVideo from "@/components/HeroVideo";
import Product from "@/components/Product";
import Manufacture from "@/components/Manufacture";

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      <HeroVideo />
      <Product />
      <div id="manufacture">
        <Manufacture />
      </div>
    </main>
  );
}
