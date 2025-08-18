"use client";
import { useState } from "react";
import Image from "next/image";

const products = [
  {
    id: 1,
    title: "Custom Brackets",
    icon: "➡️",
    img: "/images/custom.jpg",
  },
  {
    id: 2,
    title: "Steel Adapters",
    icon: "⚙️",
    img: "/images/steel.jpg",
  },
  {
    id: 3,
    title: "Motor Mounts",
    icon: "🔩",
    img: "/images/motor.jpg",
  },
  {
    id: 4,
    title: "Enclosures",
    icon: "📦",
    img: "/images/custom.jpg",
  },
];

export default function ProductShowcase() {
  const [active, setActive] = useState(products[0]);

  return (
    <section className="w-full px-6 py-8 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        <div>
          <h2 className="text-5xl font-bold leading-tight text-black">
            Revolutionizing <br /> Manufacturing with <br /> Speed and{" "}
            <span className="italic text-slate-500">Precision</span>
          </h2>

          <div className="mt-8 space-y-4">
            {products.map((product, index) => (
              <button
                key={product.id}
               onMouseEnter={() => setActive(product)}
                className={`flex items-center justify-between w-full px-4 py-2 border-b text-left transition ${
                  active.id === product.id
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span>
                    {String(index + 1).padStart(2, "0")}. {product.title}
                  </span>
                </div>
                <span>{product.icon}</span>
              </button>
            ))}
          </div>

          <div className="mt-10">
            <Image
              src={active.img}
              alt={active.title}
              width={500}
              height={300}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-3">
            <Image
              src="/images/ceo.png"
              alt="CEO"
              width={50}
              height={50}
              className="rounded-full"
            />
            <div>
              <h4 className="font-bold text-black">Ayrton Senna</h4>
              <p className="text-sm text-gray-500">
                CEO & Senior Partner at Forge
              </p>
            </div>
          </div>
          <p className="mt-6 text-gray-700 leading-relaxed">
            At Forge, we believe that getting custom CNC parts should be fast,
            reliable, and effortless. That’s why we built a fully streamlined
            platform that turns your CAD files into production-ready parts —
            delivered in as fast as one day. Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus beatae unde, numquam ipsam quo praesentium!
          </p>
          <p className="mt-4 text-gray-700 leading-relaxed">
            We operate high-performance CNC machines backed by in-house
            automation and a trusted network of suppliers. From prototypes to
            small production runs, our system is built to deliver precise,
            high-quality parts with speed. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia suscipit officia porro doloremque veniam nam inventore laborum debitis!
          </p>
          <p className="mt-44 text-gray-700 font-medium">
            Every detail matters — we craft each part with care, accuracy, and a
            finish that feels just right.
          </p>

        </div>
      </div>
    </section>
  );
}
