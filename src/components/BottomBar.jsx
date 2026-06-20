// src/components/bottom-bar/BottomBar.jsx
import React from "react";
import { motion } from "framer-motion";
import { Home, CalendarHeart, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import config from "@/config/config";

const BottomBar = () => {
  const [active, setActive] = React.useState("home");

  const menuItems = [
    { id: "home", icon: Home, label: config.data.texts.navHome, href: "#home" },
    {
      id: "event",
      icon: CalendarHeart,
      label: config.data.texts.navEvent,
      href: "#event",
    },
    {
      id: "location",
      icon: MapPin,
      label: config.data.texts.navLocation,
      href: "#location",
    },
  ];

  React.useEffect(() => {
    const onScroll = () => {
      const current = [...menuItems].reverse().find((item) => {
        const section = document.querySelector(item.href);
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top <= 140;
      });

      if (current?.id && current.id !== active) {
        setActive(current.id);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [active]);

  return (
    <motion.div
      className="fixed left-1/2 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-[90] w-full max-w-[430px] -translate-x-1/2 px-4"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, type: "spring", stiffness: 90, damping: 16 }}
    >
      <div className="glass relative overflow-hidden rounded-[28px] px-3 py-2.5">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/50 via-white/10 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 -bottom-6 h-12 bg-gradient-to-r from-gray-300/20 via-gray-300/20 to-gray-300/20 blur-xl" />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-y-3 -left-1/3 w-1/3 rounded-full bg-white/40 blur-xl"
          animate={{ x: [0, 420, 0] }}
          transition={{ duration: 8, ease: "linear", repeat: Infinity }}
        />

        <nav className="relative flex items-center justify-between gap-1">
          {menuItems.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              onClick={() => setActive(item.id)}
              className={cn(
                "relative flex flex-1 flex-col items-center justify-center rounded-2xl px-2 py-2 transition-all duration-300",
                active === item.id ? "text-gray-900" : "text-gray-600",
              )}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.96 }}
            >
              {active === item.id && (
                <motion.span
                  layoutId="iphone-active-pill"
                  className="absolute inset-0 rounded-2xl border border-white/70 bg-white/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_6px_18px_rgba(15,23,42,0.12)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              <item.icon
                className={cn(
                  "relative z-10 mb-0.5 h-[18px] w-[18px] transition-all duration-300 sm:mb-1 sm:h-5 sm:w-5",
                  active === item.id
                    ? "stroke-gray-800 drop-shadow-[0_1px_2px_rgba(0,0,0,0.12)]"
                    : "stroke-gray-500",
                )}
              />
              <span
                className={cn(
                  "relative z-10 line-clamp-1 text-[10px] font-body font-medium tracking-wide transition-all duration-300 sm:text-xs",
                  active === item.id
                    ? "scale-105 font-semibold text-gray-800"
                    : "scale-100",
                )}
              >
                {item.label}
              </span>
            </motion.a>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};

export default BottomBar;
