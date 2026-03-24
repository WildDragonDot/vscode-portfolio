"use client";
import { useState } from "react";
import { ExternalLink, Calendar, Tag } from "lucide-react";

const projects = [
  {
    name: "OWR",
    file: "owr.ts",
    period: "04/2023 – 06/2025",
    desc: "Multi-tenant store management system for merchants",
    tags: ["React", "Tailwind CSS", "Redis", "Node.js", "PostgreSQL"],
    accent: "text-vs-accent",
    border: "border-vs-accent",
    dotBg: "bg-vs-accent",
    metrics: [
      { v: "+30%", l: "Merchant Presence" },
      { v: "+30%", l: "User Engagement" },
    ],
    points: [
      "Increased merchant digital presence by 30% by developing a multi-tenant store management system for online store creation.",
      "Resulted in 30% increase in user engagement by implementing React for intuitive, responsive UI.",
      "Created reusable components using Tailwind CSS, ensuring consistent design and faster development across the platform.",
      "Applied Redis caching to optimize product data retrieval, reducing page load times and improving user experience.",
    ],
    code: `const owr = new MultiTenantStore({
  merchants: "unlimited",
  ui: "React + Tailwind",
  cache: "Redis",
  db: "PostgreSQL",
});`,
  },
  {
    name: "Indonesia On Chain",
    file: "indonesia-on-chain.ts",
    period: "04/2024 – 06/2024",
    desc: "Online course platform with blockchain certification",
    tags: ["React", "ICP Blockchain", "Google Cloud", "Node.js", "NFT"],
    accent: "text-vs-cyan",
    border: "border-vs-cyan",
    dotBg: "bg-vs-cyan",
    metrics: [
      { v: "+150/mo", l: "Course Uploads" },
      { v: "+30%",    l: "User Satisfaction" },
    ],
    points: [
      "Increased course uploads by 150 courses/month by developing an online platform for instructors.",
      "Increased user satisfaction by 30% by implementing React for a responsive UI, enhancing course navigation ease.",
      "Integrated ICP Blockchain for issuing NFT certificates to users upon course completion.",
      "Applied Google Cloud for video storage and streaming, enabling efficient and scalable delivery.",
    ],
    code: `const platform = new LearningPlatform({
  blockchain: "ICP",
  certificates: "NFT",
  storage: "Google Cloud",
  ui: "React",
});`,
  },
  {
    name: "UniqArt",
    file: "uniqart.ts",
    period: "04/2023 – 06/2023",
    desc: "NFT marketplace for trading digital assets",
    tags: ["React", "Near Blockchain", "Google Cloud", "NFT", "Web3"],
    accent: "text-vs-purple",
    border: "border-vs-purple",
    dotBg: "bg-[#c586c0]",
    metrics: [
      { v: "+25%", l: "User Engagement" },
      { v: "Near", l: "Blockchain" },
    ],
    points: [
      "Developed an NFT marketplace allowing users to create, buy, sell, and trade NFTs on the Near Blockchain.",
      "Improved user engagement by 25% by implementing React for a responsive and user-friendly interface.",
      "Integrated Near Blockchain for secure and efficient NFT transactions.",
      "Leveraged Google Cloud for scalable hosting and deployment.",
    ],
    code: `const marketplace = new NFTMarketplace({
  chain: "Near Blockchain",
  actions: ["create","buy","sell","trade"],
  hosting: "Google Cloud",
  ui: "React",
});`,
  },
];

export default function Projects() {
  const [active, setActive] = useState(0);
  const p = projects[active];

  return (
    <div className="p-3 sm:p-6 font-mono max-w-4xl">

      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-[11px] text-vs-muted mb-5">
        <span>chandan-portfolio</span>
        <span className="text-vs-border mx-0.5">›</span>
        <span className="text-vs-text">projects.tsx</span>
      </div>

      <p className="text-vs-comment text-[12px] mb-5">{"// Featured Projects — 30+ production projects delivered"}</p>

      <div className="flex gap-4 flex-col lg:flex-row">

        {/* Project tabs (left) — horizontal scroll on mobile */}
        <div className="flex flex-row lg:flex-col gap-1 lg:w-52 shrink-0 overflow-x-auto pb-1 lg:pb-0 lg:overflow-visible">
          {projects.map((proj, i) => (
            <button
              key={proj.name}
              onClick={() => setActive(i)}
              className={`text-left px-3 py-2.5 rounded border text-[12px] transition-all shrink-0 ${
                active === i
                  ? `${proj.border} bg-vs-bg2 ${proj.accent}`
                  : "border-transparent text-vs-muted hover:text-vs-text hover:bg-vs-bg2"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${active === i ? proj.dotBg : "bg-vs-border"} shrink-0`} />
                <span className="truncate">{proj.name}</span>
              </div>
              <p className="text-[10px] text-vs-muted mt-0.5 pl-3.5 truncate hidden lg:block">{proj.period}</p>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <div className={`flex-1 bg-vs-bg2 border ${p.border} rounded-lg overflow-hidden`} key={active}>

          {/* File tab */}
          <div className="flex items-center justify-between px-4 py-2 bg-vs-bg3 border-b border-vs-border text-[11px]">
            <div className="flex items-center gap-2 text-vs-muted">
              <span className={p.accent}>●</span>
              <span className="text-vs-text">{p.file}</span>
            </div>
            <ExternalLink size={13} className="text-vs-muted hover:text-white cursor-pointer" />
          </div>

          <div className="p-4">
            {/* Title + desc */}
            <div className="mb-4">
              <h3 className={`text-xl font-bold ${p.accent}`}>{p.name}</h3>
              <p className="text-vs-muted text-[11px] flex items-center gap-1 mt-1">
                <Calendar size={11} /> {p.period}
              </p>
              <p className="text-vs-text text-[12px] mt-1">{p.desc}</p>
            </div>

            {/* Metrics */}
            <div className="flex gap-2 mb-4">
              {p.metrics.map((m) => (
                <div key={m.l} className="bg-vs-bg3 border border-vs-border rounded px-3 py-2 text-center min-w-[80px]">
                  <p className="text-vs-cyan font-bold text-lg leading-none">{m.v}</p>
                  <p className="text-vs-muted text-[10px] mt-1">{m.l}</p>
                </div>
              ))}
            </div>

            {/* Two column: points + code */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Points */}
              <div className="space-y-2">
                {p.points.map((pt, i) => (
                  <div key={i} className="flex gap-2 text-[12px] leading-relaxed">
                    <span className={`${p.accent} shrink-0 mt-0.5`}>▸</span>
                    <span className="text-vs-text">{pt}</span>
                  </div>
                ))}
              </div>

              {/* Code snippet — hidden on mobile */}
              <div className="hidden md:block bg-vs-bg rounded border border-vs-border overflow-hidden">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-vs-bg3 border-b border-vs-border text-[10px] text-vs-muted">
                  <span className={p.accent}>●</span>
                  <span>snippet.ts</span>
                </div>
                <pre className="p-3 text-[11px] text-vs-cyan leading-relaxed overflow-x-auto">
                  {p.code}
                </pre>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-vs-border">
              <Tag size={11} className="text-vs-muted mt-0.5 shrink-0" />
              {p.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 bg-vs-bg3 border border-vs-border text-vs-muted text-[10px] rounded-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 30+ more projects */}
      <div className="mt-4 bg-vs-bg2 border border-vs-border rounded-lg p-4">
        <p className="text-vs-comment text-[11px] mb-3">{"// 30+ production projects delivered — see more on GitHub"}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {["Arctic", "Begods", "SaaS Store Builder", "NFT Launchpad", "DeFi Dashboard",
            "E-Commerce Platform", "Real-time Chat App", "Admin Dashboard", "Blockchain Explorer", "API Gateway"].map((name) => (
            <span key={name} className="px-2.5 py-1 bg-vs-bg3 border border-vs-border text-vs-muted text-[11px] rounded-sm hover:border-vs-accent hover:text-vs-accent transition-colors cursor-default">
              {name}
            </span>
          ))}
          <span className="px-2.5 py-1 bg-vs-bg3 border border-dashed border-vs-border text-vs-muted text-[11px] rounded-sm">
            +20 more...
          </span>
        </div>
        <a
          href="https://github.com/WildDragonDot"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-vs-accent hover:bg-vs-accentHov text-white text-[12px] rounded transition-colors"
        >
          <span>⌥</span> View All on GitHub
        </a>
      </div>
    </div>
  );
}
