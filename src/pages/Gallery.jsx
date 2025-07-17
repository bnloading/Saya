import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import SectionSeparator from "@/components/SectionSeparator";

// Loading component with better performance
const ImageLoader = ({ src, alt, className, style, onClick }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Preload image
    const img = new Image();
    img.onload = () => setLoaded(true);
    img.onerror = () => setError(true);
    // Start loading immediately
    img.src = src;
  }, [src]);

  return (
    <div className="relative overflow-hidden">
      {/* Fast placeholder with base64 blur */}
      {!loaded && !error && (
        <div
          className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='20' height='20' fill='%23e5e7eb'/%3e%3c/svg%3e")`,
            backgroundSize: "20px 20px",
          }}
        >
          <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Optimized image */}
      {loaded && (
        <img
          src={src}
          alt={alt}
          className={`${className} transition-all duration-300`}
          style={style}
          onClick={onClick}
          loading="eager"
          decoding="async"
        />
      )}

      {error && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-500">
          <span className="text-xs">Сурет жүктелмеді</span>
        </div>
      )}
    </div>
  );
};

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    {
      id: 1,
      src: "/images/Saya/11.jpg",
      alt: "Сурет-1",
      description: "Сурет-1",
      style: { objectFit: "cover", aspectRatio: "16/9" },
    },
    {
      id: 2,
      src: "/images/Saya/2.JPEG",
      alt: "Сурет-2",
      description: "Сурет-2",
      style: { objectFit: "cover", aspectRatio: "16/9" },
    },
    {
      id: 3,
      src: "/images/Saya/3.JPEG",
      alt: "Сурет-3",
      description: "Сурет-3",
      style: { objectFit: "cover", aspectRatio: "16/9" },
    },
    {
      id: 4,
      src: "/images/Saya/8.JPEG",
      alt: "Сурет-4",
      description: "Сурет-4",
      style: { objectFit: "cover", aspectRatio: "16/9" },
    },
    {
      id: 5,
      src: "/images/Saya/9.JPEG",
      alt: "Сурет-5",
      description: "Сурет-5",
      style: { objectFit: "cover", aspectRatio: "16/9" },
    },
    {
      id: 6,
      src: "/images/Saya/12.jpg",
      alt: "Сурет-6",
      description: "Сурет-6",
      style: { objectFit: "contain", maxHeight: "100%", width: "100%" },
    },
    {
      id: 7,
      src: "/images/Saya/13.jpg",
      alt: "Сурет-7",
      description: "Сурет-7",
      style: { objectFit: "cover", aspectRatio: "16/9" },
    },
  ];

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  return (
    <>
      <section
        id="gallery"
        className="min-h-screen relative overflow-hidden py-20 bg-gray-100"
      >
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4 mb-16"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block text-gray-600 font-medium"
            >
              Сәттер жинағы
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-serif text-gray-800"
            >
              Фотогалерея
            </motion.h2>
          </motion.div>

          {/* Carousel */}
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-2xl">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="relative w-full"
              >
                <div
                  className="relative"
                  style={{
                    paddingTop: currentIndex === 5 ? "100%" : "56.25%", // Adjust container height for image 6
                  }}
                >
                  <ImageLoader
                    src={images[currentIndex].src}
                    alt={images[currentIndex].alt}
                    className={`absolute inset-0 w-full h-full transition-all duration-300 ${
                      currentIndex === 5 ? "object-contain" : "object-cover"
                    }`}
                    onClick={() => openModal(images[currentIndex])}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                    <p className="text-white text-center">
                      {images[currentIndex].description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Thumbnails */}
            <div className="flex justify-center gap-2 mt-4">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentIndex === index ? "bg-gray-500 w-4" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {isModalOpen && selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
            >
              <motion.div className="relative max-w-5xl w-full h-[80vh] flex items-center justify-center">
                <ImageLoader
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className={`max-h-full w-auto rounded-lg ${
                    selectedImage.id === 6 ? "object-contain" : "object-cover"
                  }`}
                />
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                >
                  <X className="w-6 h-6 text-gray-800" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Section Separator */}
      <SectionSeparator variant="elegant" />
    </>
  );
}
