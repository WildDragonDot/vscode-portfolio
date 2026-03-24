"use client";
import { useEffect, useRef, useState } from "react";

const groups = [
  {
    name: "Frontend",
    comment: "UI & Styling",
    color: "bg-[#569cd6]",
    textColor: "text-[#569cd6]",
    skills: [
      { name: "React / Next.js",     level: 95 },
      { name: "TypeScript",          level: 88 },
      { name: "Tailwind CSS / SCSS", level: 90 },
      { name: "Redux",               level: 85 },
    ],
  },
  {
    name: "Backend",
    comment: "Server & APIs",
    color: "bg-[#4ec9b0]",
    textColor: "text-[#4ec9b0]",
    skills: [
      { name: "Node.js / Express", level: 92 },
      { name: "PHP",               level: 78 },
      { name: "RESTful APIs",      level: 93 },
      { name: "WebSockets",        level: 80 },
    ],
  },
  {
    name: "Database",
    comment: "Data Storage",
    color: "bg-[#dcdcaa]",
    textColor: "text-[#dcdcaa]",
    skills: [
      { name: "PostgreSQL / MySQL", level: 85 },
      { name: "MongoDB",            level: 88 },
      { name: "Redis",              level: 80 },
      { name: "MS Access",          level: 70 },
    ],
  },
  {
    name: "Blockchain",
    comment: "Web3 & Smart Contracts",
    color: "bg-[#c586c0]",
    textColor: "text-[#c586c0]",
    skills: [
      { name: "Ethereum / Solana", level: 82 },
      { name: "ICP / Motoko",      level: 78 },
      { name: "Smart Contracts",   level: 80 },
      { name: "NFT Development",   level: 85 },
    ],
  },
  {
    name: "DevOps & Cloud",
    comment: "Infrastructure",
    color: "bg-[#ce9178]",
    textColor: "text-[#ce9178]",
    skills: [
      { name: "AWS / Google Cloud", level: 78 },
      { name: "Docker / CI/CD",     level: 80 },
      { name: "Digital Ocean",      level: 75 },
      { name: "GitHub",             level: 92 },
    ],
  },
  {
    name: "Tools",
    comment: "Dev Tooling",
    color: "bg-[#4fc1ff]",
    textColor: "text-[#4fc1ff]",
    skills: [
      { name: "VS Code / Vim",      level: 95 },
      { name: "Postman / Insomnia", level: 90 },
      { name: "Figma",              level: 72 },
      { name: "Jira / Notion",      level: 88 },
    ],
  },
];

const tags = [
  "React", "Redux", "Express", "Node.js", "SCSS", "PHP", "Next.js", "Tailwind CSS",
  "Bootstrap", "PostgreSQL", "MySQL", "MongoDB", "MS Access", "EJS", "AWS",
  "Google Cloud", "Digital Ocean", "GitHub", "CI/CD", "Docker", "WebSockets",
  "REST APIs", "Redis", "Webpack", "TypeScript", "C", "C++", "Core Java",
  "Motoko", "JavaScript", "ICP", "Data Analysis", "Project Management",
  "Problem Solving", "Agile", "Scrum",
];

function Bar({ name, level, color }: { name: string; level: number; color: string }) {
  const [w, setW] = useState(0);
  const [showTip, setShowTip] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setW(level); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [level]);

  const label = level >= 90 ? "Expert" : level >= 80 ? "Advanced" : level >= 70 ? "Proficient" : "Intermediate";
  const labelColor = level >= 90 ? "text-vs-cyan" : level >= 80 ? "text-vs-accent" : level >= 70 ? "text-vs-yellow" : "text-vs-muted";

  return (
    <div
      ref={ref}
      className="mb-3 last:mb-0 relative"
      onMouseEnter={() => setShowTip(true)}
      onMouseLeave={() => setShowTip(false)}
    >
      <div className="flex justify-between text-[11px] mb-1">
        <span className="text-vs-text">{name}</span>
        <span className="text-vs-muted">{level}%</span>
      </div>
      <div className="skill-bar">
        <div className={`skill-bar-fill ${color}`} style={{ width: `${w}%` }} />
      </div>
      {/* IntelliSense tooltip — desktop only */}
      {showTip && (
        <div className="absolute right-0 bottom-6 intellisense px-3 py-2 z-10 pointer-events-none min-w-[140px] hidden md:block">
          <p className="text-vs-text text-[11px] font-semibold">{name}</p>
          <p className={`text-[10px] mt-0.5 ${labelColor}`}>{label}</p>
          <div className="flex items-center gap-1 mt-1">
            <div className="flex-1 h-1 bg-vs-border rounded-full overflow-hidden">
              <div className={`h-full ${color} rounded-full`} style={{ width: `${level}%` }} />
            </div>
            <span className="text-[10px] text-vs-muted">{level}%</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Skills() {
  return (
    <div className="p-3 sm:p-6 font-mono max-w-4xl">

      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-[11px] text-vs-muted mb-5">
        <span>chandan-portfolio</span>
        <span className="text-vs-border mx-0.5">›</span>
        <span className="text-vs-text">skills.tsx</span>
      </div>

      <p className="text-vs-comment text-[12px] mb-5">{"// Technical Skills & Proficiency"}</p>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 mb-5">
        {groups.map((g) => (
          <div key={g.name} className="bg-vs-bg2 border border-vs-border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-vs-border">
              <span className={`w-2 h-2 rounded-full ${g.color} shrink-0`} />
              <span className={`text-[12px] font-semibold ${g.textColor}`}>{g.name}</span>
              <span className="text-vs-comment text-[10px] ml-auto">{"// "}{g.comment}</span>
            </div>
            {g.skills.map((s) => (
              <Bar key={s.name} name={s.name} level={s.level} color={g.color} />
            ))}
          </div>
        ))}

        {/* Soft skills card */}
        <div className="bg-vs-bg2 border border-vs-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-vs-border">
            <span className="w-2 h-2 rounded-full bg-vs-accent shrink-0" />
            <span className="text-[12px] font-semibold text-vs-accent">Leadership</span>
            <span className="text-vs-comment text-[10px] ml-auto">{"// Soft Skills"}</span>
          </div>
          {[
            { name: "Project Management", level: 92 },
            { name: "Team Leadership",    level: 90 },
            { name: "Agile / Scrum",      level: 88 },
            { name: "Problem Solving",    level: 93 },
          ].map((s) => (
            <Bar key={s.name} name={s.name} level={s.level} color="bg-vs-accent" />
          ))}
        </div>
      </div>

      {/* All tags */}
      <div className="bg-vs-bg2 border border-vs-border rounded-lg p-4">
        <p className="text-vs-comment text-[11px] mb-3">{"// All Technologies"}</p>
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 bg-vs-bg3 border border-vs-border text-vs-muted text-[11px] rounded-sm hover:border-vs-accent hover:text-vs-accent transition-colors cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
