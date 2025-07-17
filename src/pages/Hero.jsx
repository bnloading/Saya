import { motion, AnimatePresence } from "framer-motion";
import { Heart, Calendar, Clock, X } from "lucide-react";
import { useEffect, useState } from "react";
import config from "@/config/config";
import { formatEventDate } from "@/lib/formatEventDate";
import { safeBase64 } from "@/lib/base64";
import SectionSeparator from "@/components/SectionSeparator";

// Fast Image Loader for Hero
const FastImage = ({ src, alt, className, onClick }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setLoaded(true);
    img.onerror = () => setError(true);
    img.src = src;
  }, [src]);

  return (
    <>
      {!loaded && !error && (
        <div className={`${className} bg-gray-300 animate-pulse`} />
      )}
      {loaded && (
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          src={src}
          alt={alt}
          className={className}
          onClick={onClick}
          loading="eager"
        />
      )}
      {error && (
        <div
          className={`${className} bg-gray-200 flex items-center justify-center`}
        >
          <span className="text-gray-500 text-xs">Сурет жүктелмеді</span>
        </div>
      )}
    </>
  );
};

export default function Hero() {
  const [guestName, setGuestName] = useState("");
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const guestParam = urlParams.get("guest");

    if (guestParam) {
      try {
        const decodedName = safeBase64.decode(guestParam);
        setGuestName(decodedName);
      } catch (error) {
        console.error("Error decoding guest name:", error);
        setGuestName("");
      }
    }
  }, []);

  const CountdownTimer = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft() {
      const difference = +new Date(targetDate) - +new Date();
      let timeLeft = {};

      if (difference > 0) {
        timeLeft = {
          күн: Math.floor(difference / (1000 * 60 * 60 * 24)),
          сағ: Math.floor((difference / (1000 * 60 * 60)) % 24),
          мин: Math.floor((difference / 1000 / 60) % 60),
          сек: Math.floor((difference / 1000) % 60),
        };
      }
      return timeLeft;
    }

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
      return () => clearInterval(timer);
    }, [targetDate]);

    return (
      <div className="flex justify-center items-center space-x-2 mt-8 w-full overflow-x-auto">
        {Object.entries(timeLeft).map(([interval, value], index) => (
          <div key={interval} className="flex items-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center p-2 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-100 min-w-[60px]"
            >
              <span className="text-lg sm:text-xl font-bold text-gray-800">
                {String(value).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs text-gray-700 capitalize">
                {interval}
              </span>
            </motion.div>
            {index < Object.entries(timeLeft).length - 1 && (
              <span className="mx-1 text-gray-400">:</span>
            )}
          </div>
        ))}
      </div>
    );
  };

  const FloatingHearts = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              scale: 0,
              x: Math.random() * window.innerWidth,
              y: window.innerHeight,
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0.5],
              x: Math.random() * window.innerWidth,
              y: -100,
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeOut",
            }}
            className="absolute"
          >
            <Heart
              className={`w-${Math.floor(Math.random() * 2) + 8} h-${Math.floor(Math.random() * 2) + 8} ${
                i % 3 === 0
                  ? "text-gray-500"
                  : i % 3 === 1
                    ? "text-gray-600"
                    : "text-gray-700"
              }`}
              fill="currentColor"
            />
          </motion.div>
        ))}
      </div>
    );
  };

  const ImageModal = ({ isOpen, onClose, imageSrc }) => {
    if (!isOpen) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          className="relative max-w-5xl w-full h-[80vh] flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={imageSrc}
            alt="Enlarged photo"
            className="max-h-full max-w-full object-contain rounded-lg"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <>
      <section
        id="home"
        className="min-h-screen flex flex-col items-center justify-center px-4 py-16 sm:py-20 text-center relative overflow-hidden bg-gray-100"
      >
        {/* Animated Background Patterns */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/bg-pattern.png')] opacity-5 animate-fade-in" />
          <div className="absolute inset-0 bg-gradient-to-tr from-gray-100/20 to-gray-100/20" />

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-b from-gray-200/20 to-transparent rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-t from-gray-200/20 to-transparent rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4" />

          {/* Floating Particles */}
          <div className="absolute inset-0 opacity-30">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-gray-300/50 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${15 + Math.random() * 10}s`,
                }}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 relative z-10 w-full max-w-4xl mx-auto"
        >
          {/* Add family name before the couple's photo */}

          {/* Couple's Photo with Gallery */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            {/* Main Photo */}
            <div
              className="relative mx-auto w-70 h-70 sm:w-80 sm:h-80 rounded-full overflow-hidden border-8 border-white shadow-2xl group cursor-pointer "
              onClick={() => setIsImageModalOpen(true)}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-500/20 group-hover:opacity-75 transition-opacity  " />
              <FastImage
                src={config.data.shareImages.couplePhoto}
                alt={`${config.data.groomName} & ${config.data.brideName}`}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                onClick={() => setIsImageModalOpen(true)}
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-gray-600 text-sm font-medium">
                    Үлкейту
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative Frame */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute -inset-2 border-4 border-gray-100/50 rounded-full -z-10"
            />
          </motion.div>

          {/* Save the Date Banner */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block mx-auto relative"
          >
            <span className="absolute inset-0 bg-gray-200 blur-md opacity-50" />
            <span className="relative px-6 py-2 text-sm bg-gray-50 text-gray-600 rounded-full border border-gray-200 shadow-sm">
              Біздің бақытты күнімізбен бөлісіңіз!
            </span>
          </motion.div>
          <h1 className="font-custom text-3xl text-gray-900">
            Құрметті қонақтар!
          </h1>

          {/* Names and Message section with updated font */}

          {/* Event Details Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="relative max-w-md mx-auto"
          >
            <div className="absolute inset-0 bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl" />
            <div className="relative px-6 py-8 rounded-2xl border border-gray-100">
              {/* Decorative elements */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-40 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
              </div>

              <div className="space-y-6 text-center">
                {/* Date and Time */}

                {/* Guest Section */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 }}
                  className="space-y-1 py-1"
                >
                  <p className="text-gray-800 font-montserrat  text-lg">
                    Cіздерді балаларымыз
                    <div className="space-y-4">
                      <motion.h2
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-4xl sm:text-4xl font-Toy text-black leading-relaxed tracking-wide font-bold"
                      >
                        {config.data.groomName}
                        <span className="inline-block mx-4">
                          <Heart
                            className="w-8 h-8 sm:w-12 sm:h-12 text-red-500 inline"
                            fill="currentColor"
                          />
                        </span>
                        {config.data.brideName}
                      </motion.h2>
                    </div>
                    Үйлену тойына арналған салтанатты дастарханымыздың қадірлі
                    қонағы болуға шақырамыз!
                  </p>
                  <p className="text-2xl text-gray-700 font-cormorant font-semibold">
                    {guestName ? guestName : ""}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Countdown Timer */}
          <CountdownTimer targetDate={config.data.date} />

          <FloatingHearts />
        </motion.div>

        {/* Add the modal component to your JSX */}
        <AnimatePresence>
          {isImageModalOpen && (
            <ImageModal
              isOpen={isImageModalOpen}
              onClose={() => setIsImageModalOpen(false)}
              imageSrc={config.data.shareImages.couplePhoto}
            />
          )}
        </AnimatePresence>
      </section>

      {/* Section Separator */}
      <SectionSeparator variant="elegant" />
    </>
  );
}
