// src/pages/LandingPage.jsx
import config from "@/config/config";
import { formatEventDate } from "@/lib/formatEventDate";
import { motion } from "framer-motion";
import { Calendar, Clock, Heart } from "lucide-react";
import { useState, useEffect } from "react";

// Image preloader component
const OptimizedImage = ({ src, alt, className, style, onLoad }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
      if (onLoad) onLoad();
    };
    img.onerror = () => setImageError(true);
    img.src = src;
  }, [src, onLoad]);

  return (
    <div className="relative">
      {/* Blur placeholder */}
      {!imageLoaded && !imageError && (
        <div
          className={`${className} bg-gray-200`}
          style={{
            ...style,
            backgroundImage: `url("data:image/svg+xml,%3csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100' height='100' fill='%23f3f4f6'/%3e%3c/svg%3e")`,
            filter: "blur(5px)",
          }}
        />
      )}

      {/* Actual image */}
      {imageLoaded && (
        <img
          src={src}
          alt={alt}
          className={`${className} transition-opacity duration-500`}
          style={style}
          loading="eager"
        />
      )}

      {/* Error fallback */}
      {imageError && (
        <div
          className={`${className} bg-gray-100 flex items-center justify-center`}
        >
          <span className="text-gray-500 text-sm">Сурет жүктелмеді</span>
        </div>
      )}
    </div>
  );
};

const LandingPage = ({ onOpenInvitation }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative overflow-hidden"
    >
      {/* Simplified Background */}
      <div className="absolute inset-0">
        {/* Single Background Image */}
        <div
          className="absolute inset-0  bg-cover bg-center bg-no-repeat"
          style={{
            backgroundPosition: "center 25%",
          }}
        />

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 bg-gray-100/95
        backdrop-blur-[1.5px]"
        />

        {/* Decorative Overlay */}
        <div className="absolute inset-0 bg-gray-200/20" />
      </div>

      {/* Decorative Borders */}
      <div
        className="absolute inset-x-0 top-0 h-1 sm:h-2 
      bg-gray-300"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-1 sm:h-2 
      bg-gray-300"
      />

      {/* Floating Hearts */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            scale: 0,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            scale: [0, 1, 0],
            x: Math.random() * window.innerWidth,
            y: [0, -100],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            delay: i * 2,
            ease: "easeInOut",
          }}
        >
          <Heart className="w-8 h-8 text-gray-400" fill="currentColor" />
        </motion.div>
      ))}

      {/* Main Content */}
      <div
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 "
        style={{
          backgroundPosition: "center 25%",
        }}
      >
        {/* Gradient Overlay for Content Readability */}
        <div className="absolute inset-0 bg-gray-100/95 backdrop-blur-[1px]" />

        {/* Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 w-full max-w-md"
        >
          {/* Top Image with Gradient - Increased height and adjusted gradient */}
          <div className="relative w-full h-64 sm:h-72 mb-6 rounded-3xl overflow-hidden">
            <img
              src="/images/Saya/12.jpg"
              alt="Wedding"
              className="absolute inset-0 w-full h-full object-cover scale-105"
              style={{
                objectPosition: "center 25%",
              }}
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/30" />
          </div>{" "}
          {/* Main Content Card - Adjusted margin and background */}
          <div
            className="backdrop-blur-[6px] bg-white/40 p-8 sm:p-10 rounded-3xl border border-rose/40 
          shadow-[0_0px_0px_0_rgba(255,228,230,0.37)] 
          hover:shadow-[0_8px_0px_0_rgba(255,228,230,0.5)] 
          transition-all duration-500 -mt-16"
          >
            {/* Top Decorative Elements */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-px w-16 bg-gray-400"
              />
              <Heart className="w-5 h-5 text-gray-500" fill="currentColor" />
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-px w-16 bg-gray-400"
              />
            </div>

            {/* Content Wrapper with Enhanced Animations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative"
            >
              {/* Enhanced Date and Time Container */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex flex-col gap-4 mb-6 sm:mb-8 items-center"
              >
                <div className="inline-flex flex-col items-center space-y-1 bg-white/90 px-6 py-3 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                  <Calendar className="w-6 h-6 text-gray-400" />
                  <p className="text-gray-700 font-medium tracking-wide">
                    {formatEventDate(config.data.date)}
                  </p>
                </div>

                <div className="inline-flex flex-col items-center space-y-1 bg-white/90 px-6 py-3 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                  <Clock className="w-6 h-6 text-gray-400" />
                  <p className="text-gray-700 font-medium tracking-wide">
                    {config.data.time}
                  </p>
                </div>
              </motion.div>

              {/* Couple Names - Enhanced */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center space-y-4 my-8"
              >
                <div className="space-y-3">
                  <h1 className="text-5xl sm:text-2xl font-Toy text-gray-900 leading-tight tracking-wide">
                    {config.data.groomName}
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="inline-block text-gray-600 mx-3"
                    >
                      ♥
                    </motion.span>
                    {config.data.brideName}
                  </h1>
                  <div className="h-0.5 w-24 mx-auto bg-gray-400" />
                </div>
              </motion.div>

              {/* Enhanced Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-8"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onOpenInvitation}
                  className="group relative w-full bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 text-white px-8 py-4 rounded-2xl font-medium shadow-xl hover:shadow-gray-400/40 transition-all duration-300 hover:from-gray-700 hover:via-gray-800 hover:to-gray-900"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 text-lg">
                    <span>Шақыруды ашу</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      ❤
                    </motion.span>
                  </span>
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
          {/* Decorative Bottom Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute -bottom-4 inset-x-0 h-8 bg-gradient-to-t from-white/20 to-transparent blur-sm"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LandingPage;
