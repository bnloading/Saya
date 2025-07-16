import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

const SectionSeparator = ({ variant = "default" }) => {
  const variants = {
    default: {
      icon: <Heart className="w-6 h-6 text-gray-500" fill="currentColor" />,
      decoration: "❦",
      color: "text-gray-500",
    },
    elegant: {
      icon: <Sparkles className="w-6 h-6 text-gray-500" />,
      decoration: "✦",
      color: "text-gray-500",
    },
    simple: {
      icon: null,
      decoration: "◆",
      color: "text-gray-400",
    },
  };

  const currentVariant = variants[variant] || variants.default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="flex items-center justify-center py-16 relative bg-gray-300/30"
    >
      <div className="flex items-center gap-6">
        {/* Left decorative line */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "4rem" }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="h-px bg-gradient-to-r from-transparent via-gray-300 to-gray-300"
        />

        {/* Left decoration */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`${currentVariant.color} text-2xl font-serif`}
        >
          {currentVariant.decoration}
        </motion.div>

        {/* Center icon */}
        {currentVariant.icon && (
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.6,
              type: "spring",
              stiffness: 200,
            }}
            whileHover={{ scale: 1.1 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gray-400 rounded-full blur-md opacity-50" />
            <div className="relative bg-gray-100 rounded-full p-3 shadow-lg border border-gray-200">
              {currentVariant.icon}
            </div>
          </motion.div>
        )}

        {/* Center decoration for simple variant */}
        {!currentVariant.icon && (
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className={`${currentVariant.color} text-3xl`}
          >
            {currentVariant.decoration}
          </motion.div>
        )}

        {/* Right decoration */}
        <motion.div
          initial={{ scale: 0, rotate: 180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`${currentVariant.color} text-2xl font-serif`}
        >
          {currentVariant.decoration}
        </motion.div>

        {/* Right decorative line */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "4rem" }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="h-px bg-gradient-to-l from-transparent via-gray-300 to-gray-300"
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
            viewport={{ once: true }}
            transition={{
              duration: 2,
              delay: 1 + i * 0.2,
              repeat: Infinity,
              repeatDelay: 3,
            }}
            className="absolute"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
          >
            <div className="w-1 h-1 bg-gray-400 rounded-full" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SectionSeparator;
