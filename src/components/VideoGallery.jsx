import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import SectionSeparator from "@/components/SectionSeparator";

// Optimized Image Component for VideoGallery
const OptimizedSlideImage = ({ src, isActive }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isActive) {
      const img = new Image();
      img.onload = () => setLoaded(true);
      img.onerror = () => setError(true);
      img.src = src;
    }
  }, [src, isActive]);

  if (error) {
    return (
      <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-500">
        Сурет жүктелмеді
      </div>
    );
  }

  return (
    <>
      {/* Fast loading placeholder */}
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Optimized background image */}
      {loaded && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-300"
          style={{
            backgroundImage: `url(${src})`,
          }}
        />
      )}
    </>
  );
};

const VideoGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const images = [
    "/images/Saya/1.JPEG",
    "/images/Saya/2.JPEG",
    "/images/Saya/3.JPEG",
    "/images/Saya/4.JPEG",
    "/images/Saya/5.JPEG",
    "/images/Saya/6.JPEG",
    "/images/Saya/7.JPEG",
    "/images/Saya/8.JPEG",
    "/images/Saya/9.JPEG",
    "/images/Saya/10.JPEG",

    "/images/Saya/12.jpg",
    "/images/Saya/13.jpg",
  ];

  // Auto slide functionality
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(timer);
  }, [isPlaying, images.length]);

  // Manual navigation functions
  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <section
        id="video-gallery"
        className="min-h-screen relative overflow-hidden bg-gray-100 p-6"
      >
        {/* Background Image with padding and border radius */}
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-6 rounded-3xl overflow-hidden shadow-2xl"
          >
            <OptimizedSlideImage src={images[currentIndex]} isActive={true} />
            {/* Subtle gradient overlay for elegance */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/5" />
          </motion.div>
        </AnimatePresence>

        {/* Manual Navigation Controls */}
        <div className="absolute inset-y-0 left-0 flex items-center z-20">
          <button
            onClick={prevImage}
            className="ml-8 p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        <div className="absolute inset-y-0 right-0 flex items-center z-20">
          <button
            onClick={nextImage}
            className="mr-8 p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Play/Pause Control */}
        <div className="absolute top-6 right-6 z-20">
          <button
            onClick={togglePlayPause}
            className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-gray-700" />
            ) : (
              <Play className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </div>

        {/* Elegant progress indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-500 hover:scale-125 ${
                  currentIndex === index
                    ? "w-8 bg-white/90"
                    : "w-2 bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section Separator */}
      <SectionSeparator variant="elegant" />
    </>
  );
};

export default VideoGallery;
