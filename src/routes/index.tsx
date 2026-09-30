import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { lazy, Suspense, useEffect, useRef } from "react";

import { Preloader } from "@/components/portfolio/Preloader";
import { Cursor } from "@/components/portfolio/Cursor";
import { Particles } from "@/components/portfolio/Particles";
import {
  TechSection,
  ProjectsSection,
  TimelineSection,
  ContactSection,
} from "@/components/portfolio/Sections";
import { scrollProgress } from "@/components/portfolio/HeroScene";

const HeroScene = lazy(() =>
  import("@/components/portfolio/HeroScene").then((m) => ({ default: m.HeroScene })),
);

const TITLE = "Malik Kashif Farooq — AI/ML Engineer & Full Stack Developer";
const DESC =
  "Interactive 3D portfolio of Malik Kashif Farooq: AI/ML engineering, RAG chatbots, clinic platforms and full stack product work.";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = heroRef.current;
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      scrollProgress.current = Math.max(0, Math.min(1, window.scrollY / (total || 1)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-background md:cursor-none">
      <Preloader />
      <Cursor />
      <Particles />

      <header className="fixed top-0 right-0 left-0 z-50">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <span className="font-display text-sm font-bold tracking-[0.3em] uppercase">MKF</span>
          <div className="hidden gap-8 text-xs tracking-[0.25em] text-muted-foreground uppercase sm:flex">
            <a href="#stack" className="transition-colors hover:text-foreground">
              Stack
            </a>
            <a href="#projects" className="transition-colors hover:text-foreground">
              Projects
            </a>
            <a href="#career" className="transition-colors hover:text-foreground">
              Career
            </a>
            <a href="#contact" className="transition-colors hover:text-foreground">
              Contact
            </a>
          </div>
        </nav>
      </header>

      {/* Hero: 200vh scroll track driving the 3D camera transition */}
      <div ref={heroRef} className="relative h-[220vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <div className="absolute inset-0">
            <Suspense fallback={<div className="h-full w-full bg-background" />}>
              <HeroScene />
            </Suspense>
          </div>
          <div aria-hidden className="grid-fade pointer-events-none absolute inset-0" />

          <div className="pointer-events-none relative z-10 flex h-full flex-col justify-center px-6">
            <div className="mx-auto w-full max-w-6xl">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.6, duration: 0.6 }}
                className="font-display text-sm tracking-[0.4em] text-accent uppercase"
              >
                Hello! I'm
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.75, duration: 0.7 }}
                className="mt-4 max-w-2xl text-5xl leading-[0.95] font-bold sm:text-7xl"
              >
                MALIK KASHIF <span className="text-gradient">FAROOQ</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.95, duration: 0.6 }}
                className="mt-6 max-w-md font-display text-base tracking-[0.2em] text-muted-foreground uppercase"
              >
                An AI/ML Engineer & Full Stack Developer
              </motion.p>
            </div>
          </div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[10px] tracking-[0.4em] text-muted-foreground uppercase"
          >
            Scroll
          </motion.div>
        </div>
      </div>

      <main className="relative z-10">
        <TechSection />
        <ProjectsSection />
        <TimelineSection />
        <ContactSection />
      </main>
    </div>
  );
}
