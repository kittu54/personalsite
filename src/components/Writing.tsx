"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionTransition from "./SectionTransition";
import GlassCard from "./GlassCard";
import { blogPosts } from "@/data/content";

export default function Writing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <SectionTransition id="writing" className="py-16 sm:py-24 md:py-28 px-5 sm:px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          className="mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-[10px] text-stone tracking-[0.3em] uppercase mb-3">
            Writing
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-ink tracking-tight">
            Notes &amp; thinking
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {blogPosts.map((post, i) => (
            <motion.a
              key={post.slug}
              href={`/writing/${post.slug}`}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="block"
            >
              <GlassCard className="h-full">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-[10px] text-stone">
                      {post.date}
                    </span>
                    <span className="w-0.5 h-0.5 rounded-full bg-stone" />
                    <span className="font-mono text-[10px] text-stone">
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-base font-medium text-ink mb-3 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-sm text-ash leading-relaxed flex-1">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 pt-4 border-t border-mist">
                    <span className="text-[11px] font-mono text-stone group-hover:text-ink transition-colors duration-300">
                      Read →
                    </span>
                  </div>
                </div>
              </GlassCard>
            </motion.a>
          ))}
        </div>
      </div>
    </SectionTransition>
  );
}
