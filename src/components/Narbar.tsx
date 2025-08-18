'use client';
import React from 'react';

export default function Navbar() {
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-4 flex items-center justify-between bg-white">
      <div className="text-sm md:text-base text-gray-800 font-semibold">⚙ Forge</div>

      <ul className="hidden md:flex gap-8 text-[13px] text-gray-700 underline">
        <li 
          className="hover:text-black cursor-pointer"
          onClick={() => scrollToSection("manufacture")}
        >
          Manufacture
        </li>

        <li className="hover:text-black cursor-pointer">Tool library</li>
        <li className="hover:text-black cursor-pointer">Get in touch</li>
      </ul>

      <div className="text-[12px] text-gray-600">Canada, Montreal</div>
    </nav>
  );
}
