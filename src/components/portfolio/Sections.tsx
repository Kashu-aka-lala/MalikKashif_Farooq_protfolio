import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

const TECH = [
  { name: "Python", tag: "AI" },
  { name: "PyTorch", tag: "DL" },
  { name: "LangChain", tag: "LLM" },
  { name: "Next.js", tag: "Web" },
  { name: "TailwindCSS", tag: "UI" },
  { name: "Supabase", tag: "BaaS" },
  { name: "PostgreSQL", tag: "DB" },
  { name: "WebRTC", tag: "RTC" },
];

const PROJECTS = [
  {
    title: "WiseChirp",
    kicker: "RAG Document Chatbot",
    body: "Retrieval-augmented chatbot built with LangChain, FAISS and Hugging Face, reaching 85% response relevance.",
    stack: ["LangChain", "FAISS", "Hugging Face"],
  },
  {
    title: "Yashfeen Homeopathy Workspace",
    kicker: "Clinic EMR & Billing Platform",
    body: "Patient records, prescriptions and automated PDF invoicing for a busy clinic.",
    stack: ["Next.js", "TypeScript", "TailwindCSS", "Supabase"],
  },
  {
    title: "AIRSENSE",
    kicker: "IoT Air Quality Monitor",
    body: "Real-time pollution forecasting that predicts AQI values from live sensor streams.",
    stack: ["Scikit-learn", "Streamlit", "IoT"],
  },
  {
    title: "Bereket Foods HR System",
    kicker: "HR Management & Geo-Fencing",
    body: "Attendance and HR operations with geo-fenced network access restrictions.",
    stack: ["Next.js", "PostgreSQL", "Geo-fencing"],
  },
];

const TIMELINE = [
  {
    when: "Jan 2026 — Present",
    what: "Full Stack Developer",
    where: "Bereket Foods International Pvt. Ltd.",
  },
  {
    when: "2026",
    what: "BS in Artificial Intelligence",
    where: "National University of Modern Languages (NUML)",
  },
  {
    when: "2024 — 2026",
    what: "Chairperson, IEEE Student Branch",
    where: "NUML — led 100+ members and organized AI/ML seminars",
  },
  {
    when: "May 2024 — Dec 2025",
    what: "AI/ML Engineer",
    where: "Wise Tech Pakistan — deployed models with 25% accuracy improvements",
  },
  {
    when: "Jul 2022 — Dec 2023",
    what: "Junior IT Technician",
    where: "Master Developers",
  },
];

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <p className="font-display text-xs tracking-[0.4em] text-accent uppercase">{eyebrow}</p>
      <h2 className="mt-3 text-4xl font-bold sm:text-5xl">
        <span className="text-gradient">{title}</span>
      </h2>
    </motion.div>
  );
}

export function TechSection() {
  return (
    <section id="stack" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionTitle eyebrow="Toolkit" title="Tech Stack" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {TECH.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            whileHover={{ scale: 1.05 }}
            data-cursor
            className="glass-panel neon-border group flex h-32 flex-col items-center justify-center rounded-2xl"
          >
            <span className="font-display text-lg font-semibold">{t.name}</span>
            <span className="mt-2 text-xs tracking-[0.3em] text-muted-foreground uppercase">
              {t.tag}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="mt-14 flex flex-wrap justify-center gap-4">
        <a
          href="#projects"
          className="rounded-full px-8 py-3 font-display text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
          style={{ background: "var(--gradient-violet)", boxShadow: "var(--glow-strong)" }}
        >
          Explore Projects
        </a>
        <a
          href="#contact"
          className="glass-panel neon-border rounded-full px-8 py-3 font-display text-sm font-semibold"
        >
          Hire Me
        </a>
      </div>
    </section>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle eyebrow="Selected Work" title="Projects" />
      </div>
      <div className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-8 lg:px-[max(1.5rem,calc((100vw-72rem)/2))]">
        {PROJECTS.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            data-cursor
            className="glass-panel neon-border w-[85vw] shrink-0 snap-center rounded-3xl p-8 sm:w-[26rem]"
          >
            <p className="font-display text-xs tracking-[0.3em] text-accent uppercase">
              {p.kicker}
            </p>
            <h3 className="mt-4 text-2xl font-bold">{p.title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
      <p className="mx-auto mt-2 max-w-6xl px-6 text-xs tracking-widest text-muted-foreground uppercase">
        Scroll sideways →
      </p>
    </section>
  );
}

export function TimelineSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.4"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });
  const height = useTransform(progress, (v) => `${v * 100}%`);
  const top = useTransform(progress, (v) => `${v * 100}%`);

  return (
    <section id="career" ref={ref} className="relative mx-auto max-w-4xl px-6 py-28">
      <SectionTitle eyebrow="Journey" title="Career & Experience" />
      <div className="relative pl-10">
        <div className="absolute top-0 left-3 h-full w-px bg-border" />
        <motion.div
          style={{ height, background: "var(--gradient-violet)" }}
          className="absolute top-0 left-3 w-px"
        />
        <motion.div
          style={{ top, boxShadow: "var(--glow-strong)", background: "var(--neon)" }}
          className="absolute left-3 h-3 w-3 -translate-x-1/2 rounded-full"
        />
        <div className="space-y-12">
          {TIMELINE.map((item, i) => (
            <motion.div
              key={item.what + i}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <span className="absolute top-2 -left-[1.82rem] h-2 w-2 rounded-full bg-primary" />
              <p className="font-display text-xs tracking-[0.3em] text-accent uppercase">
                {item.when}
              </p>
              <h3 className="mt-2 text-xl font-semibold">{item.what}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.where}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="relative mx-auto max-w-4xl px-6 py-28 text-center">
      <SectionTitle eyebrow="Let's build" title="Hire Me" />
      <p className="mx-auto max-w-xl text-muted-foreground">
        Available for AI/ML engineering and full stack product work. Tell me what you're
        building and I'll tell you how I'd ship it.
      </p>
      <a
        href="mailto:hello@example.com"
        className="mt-10 inline-block rounded-full px-10 py-4 font-display text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
        style={{ background: "var(--gradient-violet)", boxShadow: "var(--glow-strong)" }}
      >
        Start a conversation
      </a>
      <p className="mt-16 text-xs tracking-[0.3em] text-muted-foreground uppercase">
        © {new Date().getFullYear()} Malik Kashif Farooq
      </p>
    </section>
  );
}
