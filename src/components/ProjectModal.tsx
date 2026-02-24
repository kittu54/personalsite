"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/data/content";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    document.body.style.overflow = project ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed z-50 bg-cream overflow-y-auto
              top-12 left-0 right-0 bottom-0 rounded-t-2xl
              sm:top-6 sm:left-6 sm:right-6 sm:bottom-6 sm:rounded-2xl sm:border sm:border-mist
              md:top-10 md:left-10 md:right-10 md:bottom-10
              lg:top-12 lg:left-24 lg:right-24 lg:bottom-12
              xl:left-40 xl:right-40"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label={`Project: ${project.title}`}
          >
            <div className="p-5 sm:p-8 md:p-10 lg:p-14">
              <div className="flex items-start justify-between gap-3 mb-6 sm:mb-10">
                <div className="min-w-0">
                  <p className="font-mono text-[9px] sm:text-[10px] text-stone tracking-[0.3em] uppercase mb-2">
                    {project.id}
                  </p>
                  <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-ink leading-tight tracking-tight">
                    {project.title}
                  </h2>
                  <p className="mt-1.5 sm:mt-2 text-[13px] sm:text-base text-ash">
                    {project.tagline}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="shrink-0 w-9 h-9 rounded-full border border-mist flex items-center justify-center text-ash hover:text-ink hover:border-stone transition-colors"
                  aria-label="Close"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path
                      d="M1 1L11 11M11 1L1 11"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <p className="text-[13px] sm:text-base text-charcoal leading-relaxed mb-6 sm:mb-10 max-w-3xl">
                {project.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-10">
                {[
                  { label: "Problem", text: project.problem },
                  { label: "Approach", text: project.approach },
                  { label: "Result", text: project.result },
                ].map((section) => (
                  <div key={section.label}>
                    <h3 className="font-mono text-[10px] text-stone tracking-[0.2em] uppercase mb-3">
                      {section.label}
                    </h3>
                    <p className="text-charcoal text-[13px] sm:text-sm leading-relaxed">
                      {section.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 mb-6 sm:mb-8">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-[10px] font-mono bg-warm-white border border-mist text-ash rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 sm:gap-8 mb-6 sm:mb-8">
                {project.metrics.map((metric) => (
                  <p key={metric} className="text-sm font-mono text-ash">
                    {metric}
                  </p>
                ))}
              </div>

              <div className="flex gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-mist">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-ash hover:text-ink transition-colors duration-300 font-mono"
                  >
                    GitHub →
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-ash hover:text-ink transition-colors duration-300 font-mono"
                  >
                    Live Demo →
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
