"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  as?: "button" | "a";
  download?: boolean | string;
}

export default function MagneticButton({
  children,
  className,
  onClick,
  href,
  variant = "primary",
  as = "button",
  download,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouse = (e: React.MouseEvent) => {
    if (isTouch || !ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    setPosition({
      x: (e.clientX - left - width / 2) * 0.12,
      y: (e.clientY - top - height / 2) * 0.12,
    });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const variants = {
    primary: "bg-ink text-cream border border-transparent hover:border-stone/20",
    secondary: "bg-transparent text-ink border border-stone/40 hover:border-ink/40",
    ghost: "bg-transparent text-ash hover:text-ink",
  };

  const Component = as === "a" ? motion.a : motion.button;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 180, damping: 18, mass: 0.1 }}
      className="inline-block"
    >
      <Component
        href={href}
        onClick={onClick}
        download={download ? (typeof download === "string" ? download : "") : undefined}
        className={cn(
          "relative inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 rounded-full text-sm font-medium tracking-wide transition-all duration-300",
          variants[variant],
          className
        )}
        whileTap={{ scale: 0.97 }}
      >
        {children}
      </Component>
    </motion.div>
  );
}
