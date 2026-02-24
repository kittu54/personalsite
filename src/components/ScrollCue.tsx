"use client";

import { motion } from "framer-motion";

export default function ScrollCue() {
  return (
    <motion.div
      className="flex flex-col items-center gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
    >
      <span className="text-[10px] font-mono text-stone tracking-[0.25em] uppercase">
        Scroll
      </span>
      <motion.div className="relative w-[1px] h-6 bg-mist overflow-hidden rounded-full">
        <motion.div
          className="absolute top-0 left-0 w-full bg-ash rounded-full"
          animate={{ height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
}
