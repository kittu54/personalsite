"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionTransition from "./SectionTransition";
import { experience } from "@/data/content";

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionTransition id="experience" className="py-16 sm:py-24 md:py-28 px-5 sm:px-6">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          className="mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-[10px] text-stone tracking-[0.3em] uppercase mb-3">
            Experience
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight">
            Where I&apos;ve worked
          </h2>
        </motion.div>

        <div className="space-y-12">
          {experience.map((role, i) => (
            <motion.div
              key={role.title + role.company}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }}
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-ink">
                    {role.title}
                  </h3>
                  <p className="text-sm text-ash">{role.company}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] text-stone">
                    {role.location}
                  </span>
                  <span className="font-mono text-[11px] text-stone/50">
                    ·
                  </span>
                  <span className="font-mono text-[11px] text-stone">
                    {role.dates}
                  </span>
                </div>
              </div>

              <ul className="space-y-2.5 pl-4 border-l border-mist">
                {role.bullets.map((bullet, j) => (
                  <motion.li
                    key={j}
                    className="text-[14px] text-ash leading-relaxed relative pl-3"
                    initial={{ opacity: 0, x: -8 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.12 + j * 0.04 }}
                  >
                    <span className="absolute -left-[3px] top-[9px] w-[5px] h-[5px] rounded-full bg-stone/40" />
                    {bullet}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionTransition>
  );
}
