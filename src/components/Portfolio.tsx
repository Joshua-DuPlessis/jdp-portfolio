'use client';

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "GitHub", href: "https://github.com/Joshua-DuPlessis" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/joshuadup/" },
  { label: "Email", href: "mailto:joshua1duplessis@gmail.com" },
];

const experience = [
  {
    company: "Smart Foods Holdco, Cape Town",
    role: "Developer & Data Analyst",
    period: "Sep 2023 – Present",
    bullets: [
      "Improved store systems across POS, payments, delivery, loyalty, inventory, and data flows.",
      "Built Retool dashboards (Plotly.js) on PostgreSQL; cut awareness time from hours to minutes.",
      "Orchestrated WhatsApp bot workflows; improved incident resolution by 50–90%.",
      "Standardised multi-source data model across POS, delivery, inventory; authored SQL/Python ELT jobs.",
      "Led inventory audit; delivered six-figure monthly savings."
    ],
  },
  {
    company: "RLabs × AWS × Skywalk, Cape Town",
    role: "Cloud & Software Engineering Apprentice",
    period: "2022 – 2023",
    bullets: [
      "Completed AWS Cloud Practitioner & Developer Associate.",
      "Worked on CI/CD, automated testing, cloud deployments.",
      "Transformed and routed data with JS/SQL in Java-based apps & Retool workflows."
    ],
  },
  {
    company: "Freelance & Side Projects, Cape Town",
    role: "Developer & DevOps",
    period: "2023 – 2025",
    bullets: [
      "Delivered websites and data-backed services for small businesses.",
      "Built serverless transcription app on AWS (Lambda, API Gateway, S3).",
      "Cloud-first projects for retail e-commerce clients."
    ],
  },
];

const projects = [
  {
    title: "Incident Bot + Dashboards",
    tags: ["Retool", "WhatsApp", "PostgreSQL"],
    desc: "MessageBird→WhatsApp bot orchestration with Retool Workflows; 50–90% faster incident resolution.",
  },
  {
    title: "Menu/SKU Data Model",
    tags: ["POS", "Reporting", "Ops"],
    desc: "Redesigned menu & SKU schema improving clarity of reporting and contributing to margin gains.",
  },
  {
    title: "Serverless Transcription App",
    tags: ["AWS Lambda", "API Gateway", "S3"],
    desc: "Lightweight, pay-per-use transcription pipeline with simple web front-end.",
  },
  {
    title: "SEC EDGAR Pipeline (WIP)",
    tags: ["Python", "ETL", "Viz"],
    desc: "Ingest → transform → visualize filings; foundation for analytics products.",
  },
];

const skills = [
  "SQL (PostgreSQL/MySQL)",
  "JavaScript (Retool, Plotly.js, Node.js basics)",
  "Python (data workflows, automation)",
  "Retool Workflows (SQL/Python/JS)",
  "REST/JSON APIs",
  "AWS (Lambda, API Gateway, S3)",
  "Git/GitHub & CI/CD",
  "Observability (alerts, logs, runbooks)",
];

function Dot() {
  return <span className="mx-2 opacity-50">•</span>;
}

function useDarkMode() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem("theme") : null;
    const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = stored ? stored === "dark" : !!prefersDark;
    setEnabled(initial);
  }, []);
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle("dark", enabled);
      localStorage.setItem("theme", enabled ? "dark" : "light");
    }
  }, [enabled]);
  return [enabled, setEnabled] as const;
}

const pages = ["About", "Projects", "Contact"] as const;
type Page = typeof pages[number];

const swipe = {
  enter: (direction: number) => ({ x: direction > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction < 0 ? 60 : -60, opacity: 0 }),
};

export default function Portfolio() {
  const [dark, setDark] = useDarkMode();
  const [page, setPage] = useState<Page>("About");
  const [direction, setDirection] = useState(1);

  function go(next: Page) {
    const i = pages.indexOf(page);
    const j = pages.indexOf(next);
    setDirection(j > i ? 1 : -1);
    setPage(next);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setDark((d) => !d);
      }
      if (e.key === "ArrowRight") {
        const i = pages.indexOf(page);
        go(pages[(i + 1) % pages.length]);
      }
      if (e.key === "ArrowLeft") {
        const i = pages.indexOf(page);
        go(pages[(i - 1 + pages.length) % pages.length]);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [page]);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <header className="max-w-4xl mx-auto px-6 pt-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-medium">Joshua Du Plessis</span>
          <Dot />
          <span className="opacity-70">Systems • Dev • Data</span>
        </div>
        <div className="flex items-center gap-2">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="opacity-80 hover:opacity-100 underline-offset-4 hover:underline px-2">
              {l.label}
            </a>
          ))}
          <nav className="ml-2 hidden sm:flex items-center gap-1 rounded-xl border border-zinc-300 dark:border-zinc-700 p-1">
            {pages.map((p) => (
              <button key={p} onClick={() => go(p)}
                className={`px-3 py-1 text-sm rounded-lg transition ${p===page?"bg-zinc-900 text-white dark:bg-white dark:text-zinc-900":"hover:bg-zinc-100 dark:hover:bg-zinc-800"}`}>
                {p}
              </button>
            ))}
          </nav>
          <button onClick={() => setDark(!dark)} className="rounded-xl border px-3 py-1 text-sm border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 ml-1">
            {dark ? "Light" : "Dark"}
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pb-24 relative overflow-hidden">
        <AnimatePresence custom={direction} mode="popLayout">
          {page === "About" && (
            <motion.section key="about" custom={direction} initial="enter" animate="center" exit="exit" variants={swipe} transition={{ type: "spring", stiffness: 260, damping: 26 }} className="mt-12">
              <h1 className="text-3xl md:text-5xl font-semibold leading-tight">Results‑oriented, systems‑focused.</h1>
              <p className="mt-4 max-w-2xl opacity-80">
                I turn underperforming store systems into stable, accountable operations. I blend web development and data analytics with hands‑on store operations and technical support. Experienced in automation, POS/loyalty/delivery integrations, and dashboards that improve margins and responsiveness.
              </p>
              <div className="mt-10 space-y-6">
                {experience.map((job) => (
                  <div key={job.company}>
                    <div className="font-medium">{job.role} <Dot /> {job.company}</div>
                    <div className="opacity-60 text-sm">{job.period}</div>
                    <ul className="mt-2 list-disc list-inside space-y-1 text-sm opacity-80">
                      {job.bullets.map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {page === "Projects" && (
            <motion.section key="projects" custom={direction} initial="enter" animate="center" exit="exit" variants={swipe} transition={{ type: "spring", stiffness: 260, damping: 26 }} className="mt-12">
              <h2 className="text-2xl md:text-4xl font-semibold">Selected Projects</h2>
              <ul className="mt-6 grid md:grid-cols-2 gap-4">
                {projects.map((p) => (
                  <li key={p.title} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 hover:shadow-md transition-shadow">
                    <div className="font-medium">{p.title}</div>
                    <div className="mt-1 text-sm opacity-70">{p.desc}</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span key={t} className="text-xs rounded-full border px-2 py-0.5 border-zinc-300 dark:border-zinc-700">{t}</span>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </motion.section>
          )}

          {page === "Contact" && (
            <motion.section key="contact" custom={direction} initial="enter" animate="center" exit="exit" variants={swipe} transition={{ type: "spring", stiffness: 260, damping: 26 }} className="mt-12">
              <h2 className="text-2xl md:text-4xl font-semibold">Get in touch</h2>
              <p className="mt-4 opacity-80">Cape Town, South Africa • (068)-434-2873 • joshua1duplessis@gmail.com</p>
              <div className="mt-6 flex gap-3">
                <a className="rounded-xl border px-4 py-2 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800" href="mailto:joshua1duplessis@gmail.com">Email</a>
                <a className="rounded-xl border px-4 py-2 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800" href="https://www.github.com/Joshua-DuPlessis">GitHub</a>
                <a className="rounded-xl border px-4 py-2 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800" href="https://www.linkedin.com/in/joshuadup/">LinkedIn</a>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      <footer className="max-w-4xl mx-auto px-6 pb-10 opacity-60 text-sm">
        <div>© {new Date().getFullYear()} Joshua Du Plessis — Press ← / → to slide pages.</div>
      </footer>
    </div>
  );
}
