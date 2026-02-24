"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function GlassCard({ children, className, onClick }: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(0, { stiffness: 250, damping: 25 });
  const rotateY = useSpring(0, { stiffness: 250, damping: 25 });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouse = (e: React.MouseEvent) => {
    if (isTouch || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
    rotateX.set(((y - rect.height / 2) / rect.height) * -4);
    rotateY.set(((x - rect.width / 2) / rect.width) * 4);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const background = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, var(--t-glass-highlight), transparent 60%)`;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      style={isTouch ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={cn(
        "group relative rounded-2xl border border-mist bg-warm-white p-5 sm:p-6 cursor-pointer transition-all duration-500 hover:border-stone/60 shadow-[var(--t-card-shadow)] hover:shadow-[var(--t-card-shadow-hover)]",
        className
      )}
    >
      {!isTouch && (
        <motion.div
          style={{ background }}
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      )}
      <div className="relative" style={isTouch ? undefined : { transform: "translateZ(12px)" }}>
        {children}
      </div>
    </motion.div>
  );
}
