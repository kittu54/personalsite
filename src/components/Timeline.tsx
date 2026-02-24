"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { timeline } from "@/data/content";

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.85], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative pl-8">
      <div className="absolute left-[3px] top-0 bottom-0 w-px bg-mist">
        <motion.div
          className="absolute left-0 top-0 w-full bg-stone/60 origin-top"
          style={{ height: lineHeight }}
        />
      </div>

      <div className="space-y-10">
        {timeline.map((event, i) => (
          <TimelineItem key={event.year} event={event} index={i} />
        ))}
      </div>
    </div>
  );
}

function TimelineItem({
  event,
  index,
}: {
  event: (typeof timeline)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0, x: -16 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute -left-[32px] top-[5px] w-[7px] h-[7px] rounded-full border border-stone bg-cream" />
      <p className="font-mono text-[10px] text-stone tracking-[0.15em] mb-1.5">
        {event.year}
      </p>
      <h4 className="text-[15px] font-medium text-ink mb-1 leading-snug">
        {event.title}
      </h4>
      <p className="text-sm text-ash leading-relaxed">{event.description}</p>
    </motion.div>
  );
}
