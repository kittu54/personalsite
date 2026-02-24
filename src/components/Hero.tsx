"use client";

import {
  Suspense,
  useState,
  useEffect,
  useCallback,
  useRef,
  lazy,
} from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "./MagneticButton";
import ScrollCue from "./ScrollCue";
import { siteConfig } from "@/data/content";
import { useMousePosition } from "@/hooks/useMousePosition";

const Hero3D = lazy(() => import("./Hero3D"));

export default function Hero() {
  const mouse = useMousePosition();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const y = useTransform(scrollY, [0, 600], [0, 80]);
  const scale = useTransform(scrollY, [0, 600], [1, 0.96]);

  const [introComplete, setIntroComplete] = useState(false);
  const [skipIntro, setSkipIntro] = useState(false);
  const checkedRef = useRef(false);

  useEffect(() => {
    if (checkedRef.current) return;
    checkedRef.current = true;
    const seen = sessionStorage.getItem("intro-seen");
    if (seen) {
      setSkipIntro(true);
      setIntroComplete(true);
    }
  }, []);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
    sessionStorage.setItem("intro-seen", "true");
  }, []);

  const textDelay = skipIntro ? 0.1 : 0;

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-6"
    >
      <Suspense fallback={<div className="absolute inset-0 -z-10" />}>
        <Hero3D
          mouse={{ x: mouse.normalizedX, y: mouse.normalizedY }}
          skipIntro={skipIntro}
          onIntroComplete={handleIntroComplete}
        />
      </Suspense>

      {introComplete && (
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.p
            className="font-mono text-[11px] text-stone tracking-[0.25em] uppercase mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: textDelay,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {siteConfig.role}
          </motion.p>

          <motion.h1
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl italic leading-[1.2] tracking-[-0.01em] text-ink"
            style={{ fontFamily: "var(--font-serif)" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.2,
              delay: textDelay + 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {siteConfig.headline}
          </motion.h1>

          <motion.p
            className="mt-5 text-[14px] sm:text-[15px] text-ash max-w-lg mx-auto leading-[1.7] px-2 sm:px-0"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: textDelay + 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {siteConfig.subtext}
          </motion.p>

          <motion.div
            className="mt-10 flex items-center justify-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: textDelay + 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <MagneticButton as="a" href="#work" variant="primary">
              View Work
            </MagneticButton>
            <MagneticButton
              as="a"
              href={siteConfig.resumeUrl}
              variant="secondary"
              download="Darshil_Patel_Resume.pdf"
            >
              Resume
            </MagneticButton>
          </motion.div>
        </div>
      )}

      <motion.div
        className="absolute bottom-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: introComplete ? 1 : 0 }}
        transition={{ delay: skipIntro ? 0.8 : 0.6, duration: 1 }}
      >
        <ScrollCue />
      </motion.div>
    </motion.div>
  );
}
