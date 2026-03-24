"use client";
import { useEffect, useState } from "react";

const BOOT_LINES = [
  { text: "Visual Studio Code v1.89.0", delay: 0,    color: "text-vs-text" },
  { text: "Loading extensions...", delay: 300,  color: "text-vs-muted" },
  { text: "✓ ESLint activated", delay: 600,  color: "text-vs-cyan" },
  { text: "✓ Prettier activated", delay: 800,  color: "text-vs-cyan" },
  { text: "✓ TypeScript language server started", delay: 1000, color: "text-vs-cyan" },
  { text: "✓ Tailwind CSS IntelliSense ready", delay: 1200, color: "text-vs-cyan" },
  { text: "Opening workspace: chandan-portfolio...", delay: 1500, color: "text-vs-muted" },
  { text: "✓ Git initialized — branch: main", delay: 1700, color: "text-vs-cyan" },
  { text: "Resolving modules...", delay: 1900, color: "text-vs-muted" },
  { text: "✓ node_modules ready (109 packages)", delay: 2100, color: "text-vs-cyan" },
  { text: "Starting dev server on http://localhost:3000", delay: 2400, color: "text-vs-yellow" },
  { text: "✓ Compiled successfully in 338ms", delay: 2700, color: "text-[#4ec9b0]" },
  { text: "", delay: 2900, color: "" },
  { text: "Welcome, Chandan Vishwakarma 👋", delay: 3000, color: "text-white font-semibold" },
];

const PROGRESS_STEPS = [
  { label: "Initializing...",       pct: 10  },
  { label: "Loading extensions...", pct: 30  },
  { label: "Starting LSP...",       pct: 55  },
  { label: "Opening workspace...",  pct: 75  },
  { label: "Compiling...",          pct: 90  },
  { label: "Ready!",                pct: 100 },
];

export default function SplashScreen({ onDone }: { onDone: () => void }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [progress, setProgress]         = useState(0);
  const [progressLabel, setProgressLabel] = useState(PROGRESS_STEPS[0].label);
  const [fadeOut, setFadeOut]           = useState(false);
  const [cursorOn, setCursorOn]         = useState(true);

  // Blinking cursor
  useEffect(() => {
    const t = setInterval(() => setCursorOn((p) => !p), 530);
    return () => clearInterval(t);
  }, []);

  // Reveal boot lines one by one
  useEffect(() => {
    const timers = BOOT_LINES.map((_, i) =>
      setTimeout(() => setVisibleLines(i + 1), BOOT_LINES[i].delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // Progress bar
  useEffect(() => {
    const timers = PROGRESS_STEPS.map((step, i) =>
      setTimeout(() => {
        setProgress(step.pct);
        setProgressLabel(step.label);
      }, i * 550)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // Fade out after all lines shown
  useEffect(() => {
    const t = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onDone, 600);
    }, 3600);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#0d0d0d] flex flex-col items-center justify-center px-4 transition-opacity duration-500 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* VS Code logo area */}
      <div className="mb-5 sm:mb-8 flex flex-col items-center gap-2 sm:gap-3">
        {/* Animated logo */}
        <div className="relative w-10 h-10 sm:w-16 sm:h-16">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path
              d="M75 5 L95 20 L95 80 L75 95 L5 55 L5 45 Z"
              fill="none"
              stroke="#007acc"
              strokeWidth="4"
              style={{
                strokeDasharray: 300,
                strokeDashoffset: 300,
                animation: "dash 1.5s ease-out forwards",
              }}
            />
            <path
              d="M30 30 L50 70 L70 30"
              fill="none"
              stroke="#007acc"
              strokeWidth="6"
              strokeLinecap="round"
              style={{
                strokeDasharray: 100,
                strokeDashoffset: 100,
                animation: "dash 1s 0.5s ease-out forwards",
              }}
            />
          </svg>
          <div className="absolute inset-0 rounded-full border border-[#007acc]/20 animate-ping" style={{ animationDuration: "2s" }} />
        </div>

        <div className="text-center">
          <p className="text-white text-lg sm:text-2xl font-bold font-mono tracking-tight">
            Visual Studio Code
          </p>
          <p className="text-vs-muted text-[10px] sm:text-xs font-mono mt-0.5">
            chandan-portfolio — workspace
          </p>
        </div>
      </div>

      {/* Terminal window — full width on mobile */}
      <div className="w-full max-w-xl bg-[#1a1a1a] border border-[#3c3c3c] rounded-lg overflow-hidden shadow-2xl">
        {/* Terminal title bar */}
        <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#2d2d2d] border-b border-[#3c3c3c]">
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#28c840]" />
          <span className="ml-2 text-[10px] sm:text-[11px] text-vs-muted font-mono">Terminal — zsh</span>
        </div>

        {/* Terminal body */}
        <div className="p-3 sm:p-4 font-mono text-[11px] sm:text-[12px] min-h-[160px] sm:min-h-[200px] overflow-hidden">
          {/* Prompt line */}
          <div className="flex items-center gap-1 mb-2 sm:mb-3 flex-wrap">
            <span className="text-[#4ec9b0]">chandan</span>
            <span className="text-vs-muted">@</span>
            <span className="text-[#569cd6]">portfolio</span>
            <span className="text-vs-muted">:</span>
            <span className="text-[#dcdcaa]">~</span>
            <span className="text-vs-muted">$</span>
            <span className="text-white ml-1">code .</span>
          </div>

          {/* Boot lines */}
          <div className="space-y-0.5">
            {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
              <div
                key={i}
                className={`${line.color} leading-5 slide-left truncate`}
                style={{ animationDelay: `${i * 20}ms` }}
              >
                {line.text || "\u00A0"}
              </div>
            ))}
            {visibleLines < BOOT_LINES.length && (
              <span
                className="inline-block w-2 h-3.5 bg-vs-accent align-middle"
                style={{ opacity: cursorOn ? 1 : 0, transition: "opacity 0.1s" }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-xl mt-3 sm:mt-4">
        <div className="flex justify-between text-[10px] text-vs-muted font-mono mb-1.5">
          <span>{progressLabel}</span>
          <span>{progress}%</span>
        </div>
        <div className="h-[3px] bg-[#3c3c3c] rounded-full overflow-hidden">
          <div
            className="h-full bg-vs-accent rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Bottom hint */}
      <p className="mt-4 sm:mt-6 text-[10px] text-vs-muted font-mono opacity-50">
        Tap anywhere to skip...
      </p>

      <style>{`
        @keyframes dash {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}
