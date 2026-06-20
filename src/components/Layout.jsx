import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, PauseCircle, PlayCircle } from "lucide-react";
import config from "@/config/config";
import BottomBar from "@/components/BottomBar";

const Layout = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const audioRef = useRef(null);
  const wasPlayingRef = useRef(false);
  const audioConfig = config.data.audio;

  // First useEffect to handle initial setup and auto-play attempt
  useEffect(() => {
    if (!audioConfig?.src) {
      return undefined;
    }

    // Create audio element
    audioRef.current = new Audio(audioConfig.src);
    audioRef.current.loop = audioConfig.loop;
    audioRef.current.preload = "auto";

    const interactionEvents = ["click", "touchstart", "keydown"];
    let firstInteractionHandler = null;
    const removeInteractionListeners = (handler) => {
      interactionEvents.forEach((eventName) => {
        document.removeEventListener(eventName, handler);
      });
    };

    // Try to autoplay
    const attemptAutoplay = async () => {
      if (!audioConfig.autoplay) {
        return;
      }

      try {
        await audioRef.current.play();
        setIsPlaying(true);
        wasPlayingRef.current = true;
        setShowToast(true);
        setTimeout(() => setShowToast(false), audioConfig.toastDuration);
      } catch (error) {
        console.log("Autoplay failed, waiting for user interaction");
        // Retry on the first real user interaction for browsers that block autoplay.
        firstInteractionHandler = async () => {
          try {
            await audioRef.current.play();
            setIsPlaying(true);
            wasPlayingRef.current = true;
            setShowToast(true);
            setTimeout(() => setShowToast(false), audioConfig.toastDuration);
            removeInteractionListeners(firstInteractionHandler);
          } catch (err) {
            console.error("Playback failed after interaction:", err);
          }
        };

        interactionEvents.forEach((eventName) => {
          document.addEventListener(eventName, firstInteractionHandler, {
            passive: true,
          });
        });
      }
    };

    attemptAutoplay();

    return () => {
      removeInteractionListeners(firstInteractionHandler);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioConfig]);

  // Second useEffect to handle visibility and focus changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        wasPlayingRef.current = isPlaying;
        if (audioRef.current && isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      } else {
        if (audioRef.current && wasPlayingRef.current) {
          audioRef.current.play().catch(console.error);
          setIsPlaying(true);
        }
      }
    };

    const handleWindowBlur = () => {
      wasPlayingRef.current = isPlaying;
      if (audioRef.current && isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    const handleWindowFocus = () => {
      if (audioRef.current && wasPlayingRef.current) {
        audioRef.current.play().catch(console.error);
        setIsPlaying(true);
      }
    };

    // Audio event listeners
    const handlePlay = () => {
      setIsPlaying(true);
      setShowToast(true);
      setTimeout(() => setShowToast(false), audioConfig.toastDuration);
    };

    const handlePause = () => {
      setIsPlaying(false);
      setShowToast(false);
    };

    if (audioRef.current) {
      audioRef.current.addEventListener("play", handlePlay);
      audioRef.current.addEventListener("pause", handlePause);
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("focus", handleWindowFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("focus", handleWindowFocus);

      if (audioRef.current) {
        audioRef.current.removeEventListener("play", handlePlay);
        audioRef.current.removeEventListener("pause", handlePause);
      }
    };
  }, [audioConfig.toastDuration, isPlaying]);

  // Toggle music function
  const toggleMusic = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause();
          wasPlayingRef.current = false;
        } else {
          await audioRef.current.play();
          wasPlayingRef.current = true;
        }
      } catch (error) {
        console.error("Playback error:", error);
      }
    }
  };

  // Handle page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-[#f1f5f9] via-[#f3f4f6] to-[#eef2f6] flex items-center justify-center">
      <motion.div
        className="romantic-bg mx-auto w-full max-w-[430px] min-h-screen relative overflow-hidden border border-white/40 shadow-[0_20px_60px_rgba(150,110,180,0.25)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Floating colour blobs for depth */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="aurora-blob h-56 w-56 -left-10 -top-10"
            style={{ background: "rgba(203,213,225,0.55)" }}
          />
          <div
            className="aurora-blob h-64 w-64 -right-16 top-1/3"
            style={{
              background: "rgba(226,232,240,0.5)",
              animationDelay: "3s",
            }}
          />
          <div
            className="aurora-blob h-60 w-60 left-1/4 bottom-0"
            style={{
              background: "rgba(203,213,225,0.5)",
              animationDelay: "6s",
            }}
          />
        </div>

        {/* Music Control Button with Status Indicator */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMusic}
          className="glass-pill fixed top-4 right-4 z-50 p-3 rounded-full text-gray-600"
        >
          {isPlaying ? (
            <div className="relative">
              <PauseCircle className="w-6 h-6 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
          ) : (
            <PlayCircle className="w-6 h-6 text-gray-600" />
          )}
        </motion.button>

        <main className="relative z-10 h-full w-full pb-[100px]">
          {children}
        </main>
        <BottomBar />
        {/* Music Info Toast */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50"
            >
              <div className="glass-pill text-gray-800 transform -translate-x-1/2 px-4 py-2 rounded-full flex items-center space-x-2">
                <Music className="w-4 h-4 animate-pulse text-gray-600" />
                <span className="text-sm whitespace-nowrap">
                  {config.data.audio.title}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Layout;
