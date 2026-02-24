"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import SectionTransition from "./SectionTransition";
import { siteConfig } from "@/data/content";

export default function ContactForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovering, setIsHovering] = useState(false);
  const [chargeLevel, setChargeLevel] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const clearCharge = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const handleHoverStart = useCallback(() => {
    setIsHovering(true);
    clearCharge();
    let level = 0;
    intervalRef.current = setInterval(() => {
      level += 3;
      if (level >= 100) {
        setChargeLevel(100);
        clearCharge();
      } else {
        setChargeLevel(level);
      }
    }, 16);
  }, [clearCharge]);

  const handleHoverEnd = useCallback(() => {
    setIsHovering(false);
    setChargeLevel(0);
    clearCharge();
  }, [clearCharge]);

  useEffect(() => clearCharge, [clearCharge]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:${siteConfig.email}?subject=Portfolio Contact from ${formData.name}&body=${formData.message}`;
  };

  return (
    <SectionTransition id="contact" className="py-28 px-6">
      <div className="max-w-2xl mx-auto" ref={ref}>
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-[10px] text-stone tracking-[0.3em] uppercase mb-3">
            Contact
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight">
            Let&apos;s build something
          </h2>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-5"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="name"
                className="block text-[10px] font-mono text-stone tracking-[0.15em] uppercase mb-2"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 bg-warm-white border border-mist rounded-xl text-ink text-sm placeholder:text-stone/60 focus:border-stone focus:outline-none transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-[10px] font-mono text-stone tracking-[0.15em] uppercase mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 bg-warm-white border border-mist rounded-xl text-ink text-sm placeholder:text-stone/60 focus:border-stone focus:outline-none transition-colors"
                placeholder="you@email.com"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-[10px] font-mono text-stone tracking-[0.15em] uppercase mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full px-4 py-3 bg-warm-white border border-mist rounded-xl text-ink text-sm placeholder:text-stone/60 focus:border-stone focus:outline-none transition-colors resize-none"
              placeholder="What's on your mind?"
            />
          </div>

          <div className="flex justify-center pt-2">
            <motion.button
              type="submit"
              className="relative px-8 py-3.5 bg-ink text-cream rounded-full text-sm font-medium tracking-wide overflow-hidden border border-transparent hover:border-stone/30 transition-colors duration-500"
              onHoverStart={handleHoverStart}
              onHoverEnd={handleHoverEnd}
              whileTap={{ scale: 0.97 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-stone/20 via-ash/10 to-stone/20 opacity-0"
                animate={
                  isHovering
                    ? { opacity: 1, x: `${chargeLevel - 100}%` }
                    : { opacity: 0, x: "-100%" }
                }
                transition={{ duration: 0.02 }}
              />
              <span className="relative z-10">Send Message</span>
            </motion.button>
          </div>
        </motion.form>

        <motion.div
          className="flex items-center justify-center gap-8 mt-14 pt-8 border-t border-mist"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {[
            { label: "GitHub", href: siteConfig.github },
            { label: "LinkedIn", href: siteConfig.linkedin },
            { label: "Email", href: `mailto:${siteConfig.email}` },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-stone hover:text-ink transition-colors duration-300 font-mono"
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      </div>
    </SectionTransition>
  );
}
