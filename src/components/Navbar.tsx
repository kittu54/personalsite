"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";

const navLinks = [
  { label: "Work", href: "#work", id: "work" },
  { label: "About", href: "#about", id: "about" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Writing", href: "#writing", id: "writing" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export function smoothScrollTo(href: string) {
  const el = document.querySelector(href);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 56;
  window.scrollTo({ top, behavior: "smooth" });
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-8 h-8 flex items-center justify-center rounded-full border border-mist hover:border-stone transition-colors duration-300"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Sun icon (visible in dark mode) */}
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          "absolute text-ash transition-all duration-300",
          theme === "dark"
            ? "opacity-100 rotate-0 scale-100"
            : "opacity-0 rotate-90 scale-0"
        )}
      >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>

      {/* Moon icon (visible in light mode) */}
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          "absolute text-ash transition-all duration-300",
          theme === "light"
            ? "opacity-100 rotate-0 scale-100"
            : "opacity-0 -rotate-90 scale-0"
        )}
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const navContainerRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 50);
      if (window.scrollY < 200) setActiveSection(null);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.id);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              clearTimeout(debounceRef.current);
              debounceRef.current = setTimeout(
                () => setActiveSection(id),
                100
              );
            }
          });
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => {
      clearTimeout(debounceRef.current);
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  useEffect(() => {
    if (!activeSection || !navContainerRef.current) {
      setIndicatorStyle((s) => ({ ...s, opacity: 0 }));
      return;
    }
    const linkEl = linkRefs.current[activeSection];
    const container = navContainerRef.current;
    if (!linkEl || !container) return;

    const measure = () => {
      const cRect = container.getBoundingClientRect();
      const lRect = linkEl.getBoundingClientRect();
      setIndicatorStyle({
        left: lRect.left - cRect.left,
        width: lRect.width,
        opacity: 1,
      });
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [activeSection]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent, href: string) => {
      e.preventDefault();
      if (mobileOpen) setMobileOpen(false);
      smoothScrollTo(href);
    },
    [mobileOpen]
  );

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={cn(
          "sticky top-0 z-50 md:fixed md:left-0 md:right-0 transition-[background-color,border-color] duration-500 ease-out",
          scrolled
            ? "bg-cream border-b border-mist/60"
            : "bg-cream md:bg-transparent border-b border-transparent"
        )}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-6 h-12 sm:h-14 flex items-center justify-between">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="hover:opacity-70 transition-opacity leading-none"
          >
            <span
              className="text-ink text-lg sm:text-xl tracking-tight italic"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              dp.
            </span>
          </a>

          <div
            ref={navContainerRef}
            className="hidden md:flex items-center gap-7 relative"
          >
            <span
              className="absolute -bottom-[5px] h-px bg-ink/50 transition-all duration-300 ease-out pointer-events-none"
              style={{
                left: indicatorStyle.left,
                width: indicatorStyle.width,
                opacity: indicatorStyle.opacity,
              }}
            />
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                ref={(el) => {
                  linkRefs.current[link.id] = el;
                }}
                onClick={(e) => handleNavClick(e, link.href)}
                className={cn(
                  "text-[13px] transition-colors duration-300",
                  activeSection === link.id
                    ? "text-ink"
                    : "text-ash hover:text-ink"
                )}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden relative w-8 h-8 flex items-center justify-center -mr-1.5"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <span className="w-5 h-3.5 flex flex-col justify-between">
                <motion.span
                  className="block w-full h-[1px] bg-ink origin-center"
                  animate={
                    mobileOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.25 }}
                />
                <motion.span
                  className="block w-full h-[1px] bg-ink"
                  animate={{ opacity: mobileOpen ? 0 : 1 }}
                  transition={{ duration: 0.15 }}
                />
                <motion.span
                  className="block w-full h-[1px] bg-ink origin-center"
                  animate={
                    mobileOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }
                  }
                  transition={{ duration: 0.25 }}
                />
              </span>
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-cream flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col items-center gap-7">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={cn(
                    "text-xl font-medium",
                    activeSection === link.id ? "text-ink" : "text-ash"
                  )}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: i * 0.04, duration: 0.35 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
