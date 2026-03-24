"use client";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

const experiences = [
  {
    role: "Technical Project Manager",
    badge: "TPM",
    company: "QuadbTech",
    period: "10/2023 – Present",
    location: "Ludhiana, Punjab, India",
    accent: "#007acc",
    accentText: "text-vs-accent",
    accentBg: "bg-vs-accent",
    status: "current",
    points: [
      { text: "Leading multiple cross-functional engineering teams, delivering projects such as Indonesia On Chain and Arctic with reliable, on-time production releases.", metric: null },
      { text: "Enhanced development visibility and accountability through improved sprint and release tracking.", metric: "+25% delivery transparency" },
      { text: "Optimized development and release processes for the Indonesia On Chain platform.", metric: "20% faster delivery cycle" },
    ],
  },
  {
    role: "Team Lead",
    badge: "TL",
    company: "QuadbTech",
    period: "06/2022 – 09/2023",
    location: "Ludhiana, Punjab, India",
    accent: "#4ec9b0",
    accentText: "text-vs-cyan",
    accentBg: "bg-vs-cyan",
    status: null,
    points: [
      { text: "Completed 3 high-impact projects, including OWR and Begods, managing a team of 10 developers.", metric: null },
      { text: "Achieved improvement in project delivery times by implementing agile methodologies.", metric: "+30% faster delivery" },
      { text: "Spearheaded the development of the OWR project — a robust multi-tenant store management system.", metric: null },
    ],
  },
  {
    role: "Full Stack Developer",
    badge: "FSD",
    company: "QuadbTech",
    period: "06/2020 – 05/2022",
    location: "Ludhiana, Punjab, India",
    accent: "#dcdcaa",
    accentText: "text-vs-yellow",
    accentBg: "bg-vs-yellow",
    status: null,
    points: [
      { text: "Developed and maintained web applications using React, Redux, and Node.js.", metric: null },
      { text: "Designed and implemented SaaS-type websites similar to Shopify, leading from concept to deployment.", metric: null },
      { text: "Integrated MongoDB and PostgreSQL databases, optimizing data management and reducing query response times.", metric: null },
      { text: "Created and deployed smart contracts on Ethereum, Solana, and ICP blockchains.", metric: null },
      { text: "Utilized PHP and MySQL for backend development across various projects.", metric: null },
    ],
  },
];

const stats = [
  { value: "+25%", label: "Delivery Transparency", sub: "Sprint & release tracking" },
  { value: "+20%", label: "Faster Delivery Cycle",  sub: "Indonesia On Chain" },
  { value: "+30%", label: "Project Delivery Time",  sub: "Agile methodologies" },
  { value: "30+",  label: "Production Projects",    sub: "Delivered on time" },
];

export default function Experience() {
  const [open, setOpen] = useState<number[]>([0]);
  const toggle = (i: number) => setOpen((p) => p.includes(i) ? p.filter((x) => x !== i) : [...p, i]);

  return (
    <div className="p-3 sm:p-6 font-mono max-w-3xl">

      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-[11px] text-vs-muted mb-5">
        <span>chandan-portfolio</span>
        <span className="text-vs-border mx-0.5">›</span>
        <span className="text-vs-text">experience.tsx</span>
      </div>

      <p className="text-vs-comment text-[12px] mb-5">{"// Work Experience — QuadbTech (2020 – Present)"}</p>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[19px] top-6 bottom-6 w-px bg-vs-border" />

        <div className="space-y-3">
          {experiences.map((exp, i) => (
            <div key={i} className="relative pl-10">
              {/* Timeline dot */}
              <div className={`absolute left-[14px] top-[18px] w-[11px] h-[11px] rounded-full border-2 ${
                exp.status === "current" ? "border-vs-accent bg-vs-accent animate-pulse" : "border-vs-border bg-vs-bg"
              }`} />

              <div className="bg-vs-bg2 border border-vs-border rounded-lg overflow-hidden">
                {/* Header */}
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between px-3 sm:px-4 py-3 hover:bg-white/[0.03] transition-colors text-left gap-2"
                >
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${exp.accentText} border border-current opacity-70 shrink-0`}>
                      {exp.badge}
                    </span>
                    <div className="min-w-0">
                      <p className="text-vs-text text-[12px] sm:text-[13px] font-semibold truncate">{exp.role}</p>
                      <a
                        href="https://quadbtech.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-[11px] ${exp.accentText} hover:underline`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {exp.company} ↗
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right hidden sm:block">
                      <p className="text-vs-muted text-[11px]">{exp.period}</p>
                      <p className="text-vs-muted text-[10px]">{exp.location}</p>
                    </div>
                    {open.includes(i)
                      ? <ChevronDown size={14} className="text-vs-muted shrink-0" />
                      : <ChevronRight size={14} className="text-vs-muted shrink-0" />}
                  </div>
                </button>

                {/* Body */}
                {open.includes(i) && (
                  <div className="px-4 pb-4 border-t border-vs-border">
                    <div className="mt-3 space-y-2">
                      {exp.points.map((pt, j) => (
                        <div key={j} className="flex flex-col gap-1 text-[12px] leading-relaxed">
                          <div className="flex gap-2">
                            <span className={`${exp.accentText} shrink-0 mt-0.5`}>▸</span>
                            <span className="text-vs-text flex-1">{pt.text}</span>
                          </div>
                          {pt.metric && (
                            <span className="text-vs-num text-[10px] bg-vs-bg3 px-2 py-0.5 rounded border border-vs-border self-start ml-4">
                              {pt.metric}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats grid */}
      <div className="mt-6 bg-vs-bg2 border border-vs-border rounded-lg p-4">
        <p className="text-vs-comment text-[11px] mb-3">{"// Key Metrics"}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="bg-vs-bg3 rounded border border-vs-border p-3 text-center">
              <p className="text-vs-cyan text-2xl font-bold">{s.value}</p>
              <p className="text-vs-text text-[11px] mt-1">{s.label}</p>
              <p className="text-vs-muted text-[10px]">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
