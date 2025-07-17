import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// Optimized Background Image for Slider
const SliderImage = ({ src, isActive }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (isActive) {
      const img = new Image();
      img.onload = () => setLoaded(true);
      img.src = src;
    }
  }, [src, isActive]);

  return (
    <>
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      {loaded && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s]"
          style={{
            backgroundImage: `url(${src})`,
            transform: "scale(1.1)",
          }}
        />
      )}
    </>
  );
};

const BackgroundSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "/images/Saya/1.JPEG",
    "/images/Saya/2.JPEG",
    "/images/Saya/3.JPEG",
    "/images/Saya/8.JPEG",
    "/images/Saya/9.JPEG",
    "/images/Saya/10.JPEG",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 7000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <>
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="fixed inset-0"
        >
          <SliderImage src={images[currentIndex]} isActive={true} />
          <div className="absolute inset-0 bg-white/90" />
          <div className="absolute inset-0 bg-gray-100/50" />
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default BackgroundSlider;
