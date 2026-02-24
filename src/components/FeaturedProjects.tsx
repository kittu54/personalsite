"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import GlassCard from "./GlassCard";
import ProjectModal from "./ProjectModal";
import SectionTransition from "./SectionTransition";
import { projects, type Project } from "@/data/content";

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
    >
      <GlassCard onClick={onClick} className="h-full">
        <div className="flex flex-col h-full min-h-[220px]">
          <p className="font-mono text-[10px] text-stone tracking-[0.2em] uppercase mb-4">
            {project.id}
          </p>

          <h3 className="text-xl font-semibold text-ink mb-2 leading-snug">
            {project.title}
          </h3>
          <p className="text-sm text-ash leading-relaxed mb-5 flex-1">
            {project.tagline}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.stack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-[10px] font-mono bg-mist text-ash rounded-md"
              >
                {tech}
              </span>
            ))}
            {project.stack.length > 4 && (
              <span className="px-2 py-0.5 text-[10px] font-mono text-stone">
                +{project.stack.length - 4}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-mist">
            {project.metrics.slice(0, 2).map((metric) => (
              <span key={metric} className="text-[11px] font-mono text-stone">
                {metric}
              </span>
            ))}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

export default function FeaturedProjects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <SectionTransition id="work" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={headerRef}
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-[10px] text-stone tracking-[0.3em] uppercase mb-3">
            Featured Work
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight">
            Selected projects
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onClick={() => setSelected(project)}
            />
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </SectionTransition>
  );
}
