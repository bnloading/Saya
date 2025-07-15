import { motion } from "framer-motion";

export const SectionBackground = () => {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[url('/images/bg-pattern.png')] opacity-5 animate-fade-in" />
      <div className="absolute inset-0 bg-gradient-to-tr from-rose-100/20 to-pink-100/20" />
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-b from-rose-200/20 to-transparent rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-t from-pink-200/20 to-transparent rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4" />
    </div>
  );
};
