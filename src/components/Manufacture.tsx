"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";

const allProducts = [
  {
    title: "Spherical Joint",
    details: [
      "Material: Steel, Stainless Steel",
      "Load Capacity: Up to 10,000 N",
      "Thread: M8 to M30",
      "Bearing Type: Ball or Plain",
    ],
    image: "/images/custom.jpg",
  },
  {
    title: "Mounting Plate",
    details: [
      "Material: Steel, Aluminum",
      "Hole Diameter: 6 mm to 12 mm",
      "Vibration Damping: Rubber Inserts",
      "Mounting Style: Horizontal, Vertical",
    ],
    image: "/images/motor.jpg",
  },
  {
    title: "Multi-Pin Enclosure",
    details: [
      "Material: Plastic, Metal",
      "Pin Count: 2 to 50+ Pins",
      "Waterproof Rating: IP65/IP67",
      "Locking: Screw or Clip",
    ],
    image: "/images/steel.jpg",
  },
  {
    title: "Connector Housing",
    details: [
      "Material: Nylon, ABS",
      "Heat Resistance: Up to 120°C",
      "Locking: Snap-fit",
      "Applications: Automotive, Industrial",
    ],
    image: "/images/custom.jpg",
  },
  {
    title: "Gear Assembly",
    details: [
      "Material: Alloy Steel",
      "Torque: Up to 200 Nm",
      "Types: Spur, Helical",
      "Surface Finish: Polished",
    ],
    image: "/images/motor.jpg",
  },
  {
    title: "Hydraulic Coupling",
    details: [
      "Pressure: Up to 350 bar",
      "Material: Brass, Stainless Steel",
      "Seal: NBR, Viton",
      "Applications: Machinery",
    ],
    image: "/images/steel.jpg",
  },
];

export default function ProductsSection() {
  const [index, setIndex] = useState(0);
  const { ref, inView } = useInView({ threshold: 1.0 });

  useEffect(() => {
    if (inView && index + 3 < allProducts.length) {
      setIndex((prev) => prev + 3);
    }
  }, [inView]);

  const visibleProducts = allProducts.slice(index, index + 3);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-white px-5 py-1">
      <div className="mb-6">
        <span className="bg-blue-600 text-white text-sm px-4 py-2 rounded-full">
          Manufacture
        </span>
      </div>

      <h2 className="text-4xl md:text-6xl font-bold text-center mb-12 text-black">
        The Most Popular <br />{" "}
        <span className="italic text-slate-600">Details</span> We Produce
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-7xl relative overflow-hidden">
        <AnimatePresence mode="wait">
          {visibleProducts.map((product) => (
            <motion.div
              key={product.title}
              initial={{ y: 300, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }} 
              exit={{ y: -300, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="border rounded-2xl shadow-md p-8 bg-gray-50 flex flex-col justify-between relative h-[400px] w-full"
            >
              <h3 className="text-2xl font-semibold mb-4 text-black">
                {product.title}
              </h3>

              <ul className="text-base text-gray-600 mb-8 space-y-1">
                {product.details.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>

              <div className="flex justify-end">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={260}
                  height={260}
                  className="object-contain"
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div ref={ref} className="h-1 mt-1"></div>
    </section>
  );
}
