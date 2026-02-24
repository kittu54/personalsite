"use client";

import { useEffect, useState, Suspense, lazy } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedProjects from "@/components/FeaturedProjects";
import About from "@/components/About";
import Experience from "@/components/Experience";
import ToolboxConstellation from "@/components/ToolboxConstellation";
import Writing from "@/components/Writing";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

const FlowField = lazy(() => import("@/components/FlowField"));

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <SmoothScroll>
      {mounted && (
        <Suspense fallback={null}>
          <FlowField />
        </Suspense>
      )}
      <Navbar />
      <main>
        <Hero />
        <FeaturedProjects />
        <About />
        <Experience />
        <ToolboxConstellation />
        <Writing />
        <ContactForm />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
