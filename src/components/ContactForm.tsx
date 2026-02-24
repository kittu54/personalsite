"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionTransition from "./SectionTransition";
import { siteConfig } from "@/data/content";

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7l-10 6L2 7" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

const iconMap: Record<string, React.FC> = {
  Email: MailIcon,
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  Instagram: InstagramIcon,
};

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
          {links.map((link, i) => {
            const Icon = iconMap[link.label];
            return (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.label === "Email" ? undefined : "_blank"}
                rel={link.label === "Email" ? undefined : "noopener noreferrer"}
                className="group flex items-center gap-4 px-4 py-4 sm:px-6 sm:py-5 rounded-2xl border border-mist bg-warm-white hover:border-stone/50 transition-all duration-300"
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.15 + i * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -2 }}
              >
                <div className="shrink-0 text-stone/50 group-hover:text-ink group-hover:scale-110 transition-all duration-300">
                  {Icon && <Icon />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[10px] text-stone tracking-[0.15em] uppercase mb-1">
                    {link.label}
                  </p>
                  <p className="text-sm text-ink truncate">{link.display}</p>
                </div>
                <span className="shrink-0 text-stone group-hover:text-ink group-hover:translate-x-0.5 transition-all duration-300">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="opacity-30 group-hover:opacity-100 transition-opacity"
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
            );
          })}
        </motion.div>
      </div>
    </SectionTransition>
  );
}
