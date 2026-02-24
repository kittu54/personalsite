"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence, LayoutGroup } from "framer-motion";
import SectionTransition from "./SectionTransition";
import { skillCategories } from "@/data/content";

export default function ToolboxConstellation() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const filteredSkills = activeCategory
    ? skillCategories.filter((c) => c.name === activeCategory)
    : skillCategories;

  const allSkills = filteredSkills.flatMap((c) =>
    c.skills.map((s) => ({ skill: s, category: c.name }))
  );

  return (
    <SectionTransition id="skills" className="py-16 sm:py-24 md:py-28 px-5 sm:px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          className="mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-[10px] text-stone tracking-[0.3em] uppercase mb-3">
            Toolbox
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-ink tracking-tight">
            Skills &amp; systems
          </h2>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-1.5 sm:gap-2 mb-8 sm:mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-3.5 py-1.5 text-xs font-mono rounded-full border transition-all duration-300 ${
              activeCategory === null
                ? "bg-ink text-cream border-ink"
                : "bg-transparent text-ash border-mist hover:border-stone hover:text-ink"
            }`}
          >
            All
          </button>
          {skillCategories.map((cat) => (
            <button
              key={cat.name}
              onClick={() =>
                setActiveCategory(activeCategory === cat.name ? null : cat.name)
              }
              className={`px-3.5 py-1.5 text-xs font-mono rounded-full border transition-all duration-300 ${
                activeCategory === cat.name
                  ? "bg-ink text-cream border-ink"
                  : "bg-transparent text-ash border-mist hover:border-stone hover:text-ink"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </motion.div>

        <LayoutGroup>
          <motion.div className="flex flex-wrap gap-2.5" layout>
            <AnimatePresence mode="popLayout">
              {allSkills.map(({ skill, category }) => (
                <motion.div
                  key={`${category}-${skill}`}
                  layout
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{
                    opacity: { duration: 0.15 },
                    layout: { type: "spring", stiffness: 350, damping: 30 },
                  }}
                >
                  <div className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg border border-mist bg-warm-white text-[12px] sm:text-[13px] text-charcoal font-mono hover:border-stone hover:text-ink transition-all duration-300 cursor-default shadow-[var(--t-card-shadow)]">
                    {skill}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </SectionTransition>
  );
}
