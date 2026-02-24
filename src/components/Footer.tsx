"use client";

import { siteConfig } from "@/data/content";

export default function Footer() {
  return (
    <footer className="py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[11px] text-stone font-mono">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
        <p className="text-[11px] text-stone/50 font-mono">
          Crafted with intention
        </p>
      </div>
    </footer>
  );
}
