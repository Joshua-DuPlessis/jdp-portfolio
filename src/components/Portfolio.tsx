"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * OG layout preserved: About | Projects | Contact
 * Changes:
 * - Removed dark/light toggle & any theme commands
 * - Pruned projects (removed Incident Bot + Dashboards and Menu / SKU Data Model)
 * - Contact page: zoomable map + clean connect icons
 * - About page restored to original, structured sections with bullets
 */

const links = [
  { label: "GitHub", href: "https://github.com/Joshua-DuPlessis" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/joshuadup/" },
  { label: "Email", href: "mailto:joshua1duplessis@gmail.com" },
];

const pages = ["About", "Projects", "Contact"] as const;
type Page = typeof pages[number];

const swipe = {
  enter: (d: number) => ({ x: d > 0 ? 12 : -12, opacity: 0.01 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d < 0 ? 12 : -12, opacity: 0 }),
};

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
      "Led inventory audit; delivered six-figure monthly savings.",
    ],
  },
  {
    company: "RLabs × AWS × Skywalk, Cape Town",
    role: "Cloud & Software Engineering Apprentice",
    period: "2022 – 2023",
    bullets: [
      "Completed AWS Cloud Practitioner & Developer – Associate.",
      "Worked on CI/CD, automated testing, cloud deployments.",
      "Transformed and routed data with JS/SQL in Java-based apps & Retool workflows.",
    ],
  },
  {
    company: "Freelance & Side Projects, Cape Town",
    role: "Developer & DevOps",
    period: "2023 – 2025",
    bullets: [
      "Delivered websites and data-backed services for small businesses.",
      "Built serverless transcription app on AWS (Lambda, API Gateway, S3).",
      "Cloud-first projects for retail e-commerce clients.",
    ],
  },
];

export default function Portfolio() {
  const [page, setPage] = useState<Page>("About");
  const [dir, setDir] = useState(1);

  function go(next: Page) {
    const i = pages.indexOf(page);
    const j = pages.indexOf(next);
    setDir(j > i ? 1 : -1);
    setPage(next);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        const i = pages.indexOf(page);
        go(pages[(i + 1) % pages.length]);
      }
      if (e.key === "ArrowLeft") {
        const i = pages.indexOf(page);
        go(pages[(i - 1 + pages.length) % pages.length]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [page]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="max-w-3xl mx-auto px-6 pt-10 pb-6 flex items-center justify-between select-none">
        <div className="flex flex-col">
          <span className="uppercase tracking-[0.18em] text-xs text-zinc-500">Joshua Du Plessis</span>
          <h1 className="mt-1 text-2xl sm:text-3xl tracking-tight">Developer · Data Analyst</h1>
        </div>
        <nav className="flex items-center gap-4 text-sm">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="opacity-80 hover:opacity-100 transition">
              {l.label}
            </a>
          ))}
        </nav>
      </header>

      {/* Tabs */}
      <div className="max-w-3xl mx-auto px-6">
        <div className="flex gap-4 mb-8 border-b border-zinc-200">
          {pages.map((p) => (
            <button
              key={p}
              onClick={() => go(p)}
              className={`text-sm tracking-wide pb-2 border-b-2 transition-colors ${
                p === page ? "border-zinc-900 opacity-100" : "border-transparent opacity-70 hover:opacity-100"
              }`}
              aria-current={p === page ? "page" : undefined}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 pb-24 relative">
        <AnimatePresence custom={dir} mode="popLayout">
          {/* ABOUT (restored) */}
          {page === "About" && (
            <motion.section
              key="about"
              custom={dir}
              initial="enter"
              animate="center"
              exit="exit"
              variants={swipe}
              transition={{ type: "spring", stiffness: 220, damping: 26, mass: 0.8 }}
              className="mt-2"
            >
              <p className="uppercase tracking-[0.18em] text-xs text-zinc-500">Profile</p>
              <h2 className="mt-2 text-3xl sm:text-4xl leading-tight tracking-tight">
                Results-oriented and systems-focused.
              </h2>
              <p className="mt-4 text-[0.98rem] leading-7 text-zinc-700">
                I turn underperforming store systems into stable, accountable operations. I blend web development and data analytics
                with hands-on store operations and technical support. I’ve delivered workflow automation; integrated POS, loyalty and delivery
                channels; and built dashboards that improved margins, response times, and stock control.
              </p>

              <div className="mt-10 space-y-7">
                {experience.map((job) => (
                  <article key={job.company} className="rounded-2xl border border-zinc-200 p-5">
                    <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="font-medium">{job.role}</h3>
                      <span className="mx-2 select-none opacity-40">·</span>
                      <span className="text-zinc-600">{job.company}</span>
                      <span className="ml-auto text-sm text-zinc-500">{job.period}</span>
                    </header>
                    <ul className="mt-3 list-disc list-inside text-sm leading-6 text-zinc-700">
                      {job.bullets.map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                  </article>
                ))}
              </div>
            </motion.section>
          )}

          {/* PROJECTS (pruned) */}
          {page === "Projects" && (
            <motion.section
              key="projects"
              custom={dir}
              initial="enter"
              animate="center"
              exit="exit"
              variants={swipe}
              transition={{ type: "spring", stiffness: 220, damping: 26, mass: 0.8 }}
              className="mt-2"
            >
              <p className="uppercase tracking-[0.18em] text-xs text-zinc-500">Selected Work</p>
              <h2 className="mt-2 text-3xl sm:text-4xl leading-tight tracking-tight">
                Practical automation, measurable impact.
              </h2>

              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: "Serverless Transcription App",
                    tags: ["AWS Lambda", "API Gateway", "S3"],
                    desc: "Pay-per-use transcription pipeline with a simple web front-end.",
                  },
                  {
                    title: "SEC EDGAR Pipeline (WIP)",
                    tags: ["Python", "ETL", "Viz"],
                    desc: "Ingest → transform → visualize filings; foundation for analytics products.",
                  },
                ].map((p) => (
                  <li key={p.title} className="rounded-2xl border border-zinc-200 p-5 hover:shadow-sm transition-shadow">
                    <h3 className="font-medium">{p.title}</h3>
                    <p className="mt-2 text-sm text-zinc-700">{p.desc}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span key={t} className="rounded-full border border-zinc-300 px-2.5 py-0.5 text-xs">
                          {t}
                        </span>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </motion.section>
          )}

          {/* CONTACT (map + icons) */}
          {page === "Contact" && (
            <motion.section
              key="contact"
              custom={dir}
              initial="enter"
              animate="center"
              exit="exit"
              variants={swipe}
              transition={{ type: "spring", stiffness: 220, damping: 26, mass: 0.8 }}
              className="mt-2"
            >
              <p className="uppercase tracking-[0.18em] text-xs text-zinc-500">Contact</p>
              <h2 className="mt-2 text-3xl sm:text-4xl leading-tight tracking-tight">Let’s connect.</h2>

              <p className="mt-3 text-sm text-zinc-600">Cape Town, South Africa</p>

              {/* Map embed (zoomable, no API key required) */}
              <div className="mt-6 rounded-2xl border border-zinc-200 overflow-hidden shadow-sm">
                <iframe
                  title="Cape Town, South Africa — Map"
                  src="https://www.google.com/maps?q=Cape%20Town%2C%20South%20Africa&output=embed&z=11"
                  loading="lazy"
                  width="100%"
                  height="360"
                  style={{ border: 0, display: "block" }}
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Connect icons */}
              <div className="mt-8 flex items-center justify-between border-t border-zinc-200 pt-6">
                 <p className="mt-2 text-sm text-zinc-600">
            <span aria-hidden>🤝</span> Prefer an intro?{" "}
            <span className="font-medium text-zinc-800">Reach out</span>{" "}
            <span aria-hidden>👉</span>
          </p>

                
                <div className="flex items-center gap-4">
                  <a
                    href="mailto:joshua1duplessis@gmail.com"
                    aria-label="Email"
                    className="opacity-80 hover:opacity-100"
                    title="Email"
                  >
                    <IconMail />
                  </a>
                  <a
                    href="https://github.com/Joshua-DuPlessis"
                    aria-label="GitHub"
                    className="opacity-80 hover:opacity-100"
                    title="GitHub"
                  >
                    <IconGitHub />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/joshuadup/"
                    aria-label="LinkedIn"
                    className="opacity-80 hover:opacity-100"
                    title="LinkedIn"
                  >
                    <IconLinkedIn />
                  </a>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Footer (no theme commands) */}
      <footer className="max-w-3xl mx-auto px-6 pb-12 text-xs opacity-50">
        <div>© {new Date().getFullYear()} Joshua Du Plessis — Use ← / → to navigate</div>
      </footer>
    </div>
  );
}

/** Simple icons */
function IconMail(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden {...props}>
      <path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z"/>
    </svg>
  );
}
function IconGitHub(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden {...props}>
      <path fill="currentColor" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.2-3.37-1.2-.46-1.16-1.12-1.47-1.12-1.47-.92-.63.07-.62.07-.62 1.02.07 1.56 1.05 1.56 1.05.9 1.55 2.37 1.1 2.95.84.09-.65.35-1.1.63-1.35-2.22-.25-4.56-1.11-4.56-4.93 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.29.1-2.68 0 0 .85-.27 2.77 1.02A9.6 9.6 0 0 1 12 7.5c.86 0 1.73.12 2.54.35 1.92-1.29 2.77-1.02 2.77-1.02.55 1.39.2 2.42.1 2.68.64.7 1.03 1.59 1.03 2.68 0 3.83-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/>
    </svg>
  );
}
function IconLinkedIn(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden {...props}>
      <path fill="currentColor" d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.5 8.5h4V23h-4V8.5Zm7.5 0h3.8v1.98h.06c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.15V23h-4v-6.56c0-1.56-.03-3.56-2.17-3.56s-2.5 1.7-2.5 3.44V23h-4V8.5Z"/>
    </svg>
  );
}
