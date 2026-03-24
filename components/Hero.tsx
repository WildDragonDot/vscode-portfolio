"use client";
import { useEffect, useState } from "react";

// Static floating particles — no Math.random() to avoid hydration mismatch
const PARTICLES = [
  { x: 10, y: 20, size: 1.5, opacity: 0.3, dur: 8  },
  { x: 25, y: 60, size: 1,   opacity: 0.2, dur: 12 },
  { x: 40, y: 15, size: 2,   opacity: 0.15,dur: 10 },
  { x: 55, y: 75, size: 1.5, opacity: 0.25,dur: 9  },
  { x: 70, y: 35, size: 1,   opacity: 0.2, dur: 14 },
  { x: 85, y: 55, size: 2,   opacity: 0.1, dur: 11 },
  { x: 15, y: 85, size: 1,   opacity: 0.3, dur: 7  },
  { x: 90, y: 10, size: 1.5, opacity: 0.2, dur: 13 },
  { x: 60, y: 90, size: 1,   opacity: 0.15,dur: 9  },
  { x: 35, y: 45, size: 2,   opacity: 0.1, dur: 15 },
  { x: 78, y: 70, size: 1,   opacity: 0.25,dur: 8  },
  { x: 5,  y: 50, size: 1.5, opacity: 0.2, dur: 11 },
];

type Token = { t: string; c: string };
type Line  = { num: number; tokens: Token[]; indent?: number };

const codeLines: Line[] = [
  { num: 1,  tokens: [{ t: "import", c: "text-vs-keyword" }, { t: " type ", c: "text-vs-text" }, { t: "{ Developer }", c: "text-vs-cyan" }, { t: " from ", c: "text-vs-text" }, { t: '"./types"', c: "text-vs-string" }] },
  { num: 2,  tokens: [] },
  { num: 3,  tokens: [{ t: "const ", c: "text-vs-keyword" }, { t: "chandan", c: "text-vs-func" }, { t: ": ", c: "text-vs-text" }, { t: "Developer", c: "text-vs-cyan" }, { t: " = {", c: "text-vs-text" }] },
  { num: 4,  tokens: [{ t: "  name", c: "text-vs-blue" }, { t: ":    ", c: "text-vs-text" }, { t: '"Chandan Vishwakarma"', c: "text-vs-string" }, { t: ",", c: "text-vs-text" }] },
  { num: 5,  tokens: [{ t: "  role", c: "text-vs-blue" }, { t: ":    ", c: "text-vs-text" }, { t: '"Technical Project Manager & Full Stack Dev"', c: "text-vs-string" }, { t: ",", c: "text-vs-text" }] },
  { num: 6,  tokens: [{ t: "  exp", c: "text-vs-blue" }, { t: ":     ", c: "text-vs-text" }, { t: '"~6 years"', c: "text-vs-string" }, { t: ",", c: "text-vs-text" }] },
  { num: 7,  tokens: [{ t: "  projects", c: "text-vs-blue" }, { t: ": ", c: "text-vs-text" }, { t: "30", c: "text-vs-num" }, { t: ",", c: "text-vs-text" }] },
  { num: 8,  tokens: [{ t: "  location", c: "text-vs-blue" }, { t: ": ", c: "text-vs-text" }, { t: '"Varanasi, India"', c: "text-vs-string" }, { t: ",", c: "text-vs-text" }] },
  { num: 9,  tokens: [{ t: "  email", c: "text-vs-blue" }, { t: ":    ", c: "text-vs-text" }, { t: '"chandanvishwakarma.tech@gmail.com"', c: "text-vs-string" }, { t: ",", c: "text-vs-text" }] },
  { num: 10, tokens: [{ t: "  web", c: "text-vs-blue" }, { t: ":     ", c: "text-vs-text" }, { t: '"https://cpdevs.com/"', c: "text-[#4ec9b0] underline decoration-dotted" }, { t: ",", c: "text-vs-text" }] },
  { num: 11, tokens: [{ t: "  stack", c: "text-vs-blue" }, { t: ":    [", c: "text-vs-text" }] },
  { num: 12, tokens: [{ t: '    "React"', c: "text-vs-string" }, { t: ", ", c: "text-vs-text" }, { t: '"Next.js"', c: "text-vs-string" }, { t: ", ", c: "text-vs-text" }, { t: '"Node.js"', c: "text-vs-string" }, { t: ",", c: "text-vs-text" }] },
  { num: 13, tokens: [{ t: '    "Blockchain"', c: "text-vs-string" }, { t: ", ", c: "text-vs-text" }, { t: '"TypeScript"', c: "text-vs-string" }, { t: ", ", c: "text-vs-text" }, { t: '"AWS"', c: "text-vs-string" }] },
  { num: 14, tokens: [{ t: "  ],", c: "text-vs-text" }] },
  { num: 15, tokens: [{ t: "  current", c: "text-vs-blue" }, { t: ":  ", c: "text-vs-text" }, { t: '"Technical Project Manager @ QuadbTech"', c: "text-vs-string" }] },
  { num: 16, tokens: [{ t: "}", c: "text-vs-text" }] },
  { num: 17, tokens: [] },
  { num: 18, tokens: [{ t: "// 🚀 Open to exciting opportunities", c: "text-vs-comment italic" }] },
  { num: 19, tokens: [{ t: "// 📧 chandanvishwakarma.tech@gmail.com", c: "text-vs-comment italic" }] },
];

export default function Hero() {
  const [visible, setVisible] = useState(0);
  const [hoveredLine, setHoveredLine] = useState<number | null>(null);

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i++;
      setVisible(i);
      if (i >= codeLines.length) clearInterval(t);
    }, 70);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="p-3 sm:p-6 min-h-full font-mono relative overflow-hidden">
      {/* Floating particles background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-vs-accent"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
              animation: `float ${p.dur}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
        {/* Gradient orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-vs-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#4ec9b0]/5 rounded-full blur-3xl" />
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-[11px] text-vs-muted mb-5">
        <span className="hover:text-vs-text cursor-pointer">chandan-portfolio</span>
        <span className="text-vs-border mx-0.5">›</span>
        <span className="text-vs-text">home.tsx</span>
      </div>

      {/* Intro text */}
      <div className="mb-4 sm:mb-6">
        <p className="text-vs-comment text-xs sm:text-sm mb-1">{"// Hi there 👋, my name is"}</p>
        <h1 className="text-[2rem] sm:text-[2.8rem] font-bold text-vs-text glow-blue leading-none tracking-tight">
          Chandan Vishwakarma<span className="text-vs-accent">.</span>
        </h1>
        <h2 className="text-base sm:text-xl text-vs-cyan mt-1.5 flex items-center gap-0">
          Technical Project Manager & Full Stack Developer<span className="cursor-blink ml-0.5" />
        </h2>
        <p className="text-vs-muted text-xs sm:text-sm mt-2 max-w-md leading-relaxed">
          6 years building scalable web apps, leading teams, and shipping blockchain solutions.
        </p>
      </div>

      {/* Code editor panel */}
      <div className="bg-vs-bg2 rounded-lg border border-vs-border overflow-hidden w-full max-w-[640px] shadow-card">

        {/* Editor top bar */}
        <div className="flex items-center justify-between px-3 py-2 bg-vs-bg3 border-b border-vs-border">
          <div className="flex items-center gap-2 text-[11px] text-vs-muted">
            <span className="text-vs-blue">●</span>
            <span className="text-vs-text">developer.ts</span>
            <span className="text-vs-border hidden sm:inline">—</span>
            <span className="hidden sm:inline">TypeScript</span>
          </div>
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>
        </div>

        {/* Code lines — scrollable on mobile */}
        <div className="py-3 text-[11px] sm:text-[13px] leading-[1.65] overflow-x-auto">
          {codeLines.map((line, idx) => (
            <div
              key={line.num}
              onMouseEnter={() => setHoveredLine(line.num)}
              onMouseLeave={() => setHoveredLine(null)}
              className={`flex transition-all duration-100 ${
                idx < visible ? "opacity-100" : "opacity-0"
              } ${hoveredLine === line.num ? "bg-white/[0.04]" : ""}`}
            >
              {/* Line number */}
              <span className="w-8 sm:w-10 text-right pr-3 sm:pr-4 text-vs-lineNum text-[10px] sm:text-[11px] shrink-0 select-none leading-[1.65]">
                {line.num}
              </span>
              {/* Tokens */}
              <span className="pr-4 whitespace-nowrap">
                {line.tokens.map((tok, ti) => (
                  <span key={ti} className={tok.c}>{tok.t}</span>
                ))}
                {/* Blinking cursor on last visible line */}
                {idx === visible - 1 && visible < codeLines.length && (
                  <span className="animate-blink text-vs-accent">▋</span>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Open to Work badge */}
      <div className="flex flex-wrap items-center gap-2 mt-4 mb-1">
        <span className="flex items-center gap-1.5 px-3 py-1 bg-green-500/10 border border-green-500/40 text-green-400 text-[11px] rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shrink-0" />
          Open to Work
        </span>
        <span className="text-vs-muted text-[11px]">— Available for full-time & freelance</span>
      </div>

      {/* CTA */}
      <div className="flex flex-wrap gap-2 mt-3">
        <a
          href="/Chandan_Vishwakarma_Resume.pdf"
          download
          className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-green-600 hover:bg-green-500 text-white text-[12px] rounded transition-colors shadow-glow"
        >
          <span>⬇</span> Download Resume
        </a>
        <a
          href="https://github.com/WildDragonDot"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-vs-accent hover:bg-vs-accentHov text-white text-[12px] rounded transition-colors shadow-glow"
        >
          <span>⌥</span> GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/chandanvishwakarma007"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-vs-accent text-vs-accent hover:bg-vs-accent hover:text-white text-[12px] rounded transition-colors"
        >
          <span>⌘</span> LinkedIn
        </a>
        <a
          href="https://cpdevs.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-vs-border text-vs-muted hover:text-vs-text hover:border-vs-accent text-[12px] rounded transition-colors"
        >
          <span>⌃</span> Website
        </a>
      </div>
    </div>
  );
}
