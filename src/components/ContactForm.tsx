"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionTransition from "./SectionTransition";
import { siteConfig } from "@/data/content";

const links = [
  {
    label: "Email",
    href: `mailto:${siteConfig.email}`,
    display: siteConfig.email,
  },
  {
    label: "GitHub",
    href: siteConfig.github,
    display: "github.com/kittu54",
  },
  {
    label: "LinkedIn",
    href: siteConfig.linkedin,
    display: "linkedin.com/in/darshil-patel",
  },
  {
    label: "Instagram",
    href: siteConfig.instagram,
    display: "@darshiiil",
  },
];

export default function ContactForm() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionTransition id="contact" className="py-16 sm:py-24 md:py-28 px-5 sm:px-6">
      <div className="max-w-2xl mx-auto" ref={ref}>
        <motion.div
          className="text-center mb-10 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-[10px] text-stone tracking-[0.3em] uppercase mb-3">
            Contact
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-ink tracking-tight">
            Let&apos;s connect
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.12 }}
        >
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.label === "Email" ? undefined : "_blank"}
              rel={link.label === "Email" ? undefined : "noopener noreferrer"}
              className="group flex items-center justify-between px-4 py-4 sm:px-6 sm:py-5 rounded-2xl border border-mist bg-warm-white hover:border-stone/50 transition-all duration-300"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.15 + i * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -2 }}
            >
              <div>
                <p className="font-mono text-[10px] text-stone tracking-[0.15em] uppercase mb-1.5">
                  {link.label}
                </p>
                <p className="text-sm text-ink break-all sm:break-normal">{link.display}</p>
              </div>
              <span className="text-stone group-hover:text-ink group-hover:translate-x-0.5 transition-all duration-300">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="opacity-40 group-hover:opacity-100 transition-opacity"
                >
                  <path
                    d="M3 13L13 3M13 3H5M13 3V11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </SectionTransition>
  );
}
