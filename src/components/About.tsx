"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionTransition from "./SectionTransition";
import Timeline from "./Timeline";
import { principles } from "@/data/content";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionTransition id="about" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20" ref={ref}>
          <div>
            <motion.p
              className="font-mono text-[10px] text-stone tracking-[0.3em] uppercase mb-3"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              About
            </motion.p>
            <motion.h2
              className="text-3xl sm:text-4xl font-bold text-ink mb-8 leading-snug tracking-tight"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.08 }}
            >
              Building at the
              <br />
              intersection
            </motion.h2>
            <motion.div
              className="space-y-4 text-ash text-[15px] leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.16 }}
            >
              <p>
                I study Computer Science and Economics at the University of Kansas
                because the most interesting problems live where systems meet incentives.
                How do you build infrastructure that&apos;s technically sound and
                economically rational?
              </p>
              <p>
                I&apos;ve built agentic planning systems, compiler analysis passes,
                ML pipelines, and hardware-integrated capstone projects — the throughline
                is always the same: rigorous engineering, honest evaluation, and
                shipping things that work under pressure.
              </p>
              <p>
                3.72 GPA across a dual degree with a math minor. Production engineering
                experience. Research-grade econometrics. I care about the craft and
                the rigor equally.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-x-8 gap-y-6 mt-12"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.24 }}
            >
              {principles.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
                >
                  <h4 className="font-medium text-ink text-sm mb-1">
                    {p.title}
                  </h4>
                  <p className="text-xs text-ash leading-relaxed">
                    {p.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="lg:pt-12">
            <Timeline />
          </div>
        </div>
      </div>
    </SectionTransition>
  );
}
