import { motion } from "framer-motion";
import { Heart, Flower } from "lucide-react";
import { SectionBackground } from "@/components/SectionBackground";
import Hero from "@/pages/Hero";
import Events from "@/pages/Events";
import Location from "@/pages/Location";
import Wishes from "@/pages/Wishes";
import Gallery from "@/pages/Gallery";

// Animated Background Component
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Hearts - Slowed down and more hearts */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`heart-${i}`}
          initial={{
            opacity: 0,
            scale: 0,
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 100,
          }}
          animate={{
            opacity: [0, 0.8, 0.8, 0],
            scale: [0, 1, 1, 0.5],
            x: Math.random() * window.innerWidth,
            y: -100,
          }}
          transition={{
            duration: 8, // Increased duration
            repeat: Infinity,
            delay: i * 1.2, // Increased delay between each heart
            ease: "easeInOut", // Changed to smoother easing
          }}
          className="absolute"
        >
          <Heart
            className={`w-${Math.floor(Math.random() * 3) + 5} h-${
              Math.floor(Math.random() * 3) + 5
            } ${
              i % 4 === 0
                ? "text-rose-200"
                : i % 4 === 1
                  ? "text-pink-200"
                  : i % 4 === 2
                    ? "text-red-200"
                    : "text-rose-300"
            }`}
            fill="currentColor"
          />
        </motion.div>
      ))}

      {/* Flowers - More flowers and slower rotation */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`flower-${i}`}
          initial={{
            opacity: 0,
            rotate: 0,
            x: Math.random() * window.innerWidth,
            y: -100,
          }}
          animate={{
            opacity: [0, 0.7, 0.7, 0],
            rotate: 720, // Two full rotations
            x: `calc(${Math.random() * 100}vw + ${(Math.random() - 0.5) * 200}px)`,
            y: window.innerHeight + 100,
          }}
          transition={{
            duration: 10, // Increased duration
            repeat: Infinity,
            delay: i * 1.5, // Increased delay between each flower
            ease: "easeInOut",
          }}
          className="absolute"
        >
          <Flower
            className={`w-${Math.floor(Math.random() * 3) + 4} h-${
              Math.floor(Math.random() * 3) + 4
            } ${
              i % 3 === 0
                ? "text-rose-200"
                : i % 3 === 1
                  ? "text-pink-200"
                  : "text-red-200"
            }`}
          />
        </motion.div>
      ))}
    </div>
  );
};

// Main Invitation Content
export default function MainContent() {
  return (
    <div className="relative">
      <AnimatedBackground />
      <div className="relative z-10">
        {/* Each section with consistent background */}
        <section className="relative min-h-screen">
          <SectionBackground />
          <div className="relative z-10">
            <Hero />
          </div>
        </section>

        <section className="relative min-h-screen">
          <SectionBackground />
          <div className="relative z-10">
            <Events />
          </div>
        </section>

        <section className="relative min-h-screen">
          <SectionBackground />
          <div className="relative z-10">
            <Location />
          </div>
        </section>

        <section className="relative min-h-screen">
          <SectionBackground />
          <div className="relative z-10">
            <Wishes />
          </div>
        </section>

        <section className="relative min-h-screen">
          <SectionBackground />
          <div className="relative z-10">
            <Gallery />
          </div>
        </section>
      </div>
    </div>
  );
}
