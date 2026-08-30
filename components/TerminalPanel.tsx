"use client";
import { useState, useRef, useEffect } from "react";
import { TabId } from "@/app/page";
import { X, Minus, ChevronUp, Terminal as TermIcon, AlertCircle, Cpu, Bug, Copy, Check } from "lucide-react";

type PanelTab = "terminal" | "problems" | "output" | "debug";

type TerminalLine = {
  type: "input" | "output" | "error" | "success" | "info" | "prompt";
  text: string;
};

const PROMPT_USER = "chandan";
const PROMPT_HOST = "portfolio";

const HELP_TEXT = [
  "Available shell commands:",
  "  help             - Show this help message",
  "  whoami           - Display Chandan's profile summary",
  "  skills           - List core technical competencies",
  "  projects         - List featured production projects",
  "  experience       - Show current role & career timeline",
  "  cat bio.txt      - Print short biography",
  "  contact          - Navigate to contact page",
  "  open <tab>       - Open a tab (home, about, experience, skills, projects, blog, contact)",
  "  theme <dark|light> - Switch UI color theme",
  "  date             - Display current local date & time",
  "  clear            - Clear terminal output",
  "  exit             - Close bottom terminal panel",
];

const PROBLEMS_DATA = [
  { file: "experience.tsx", line: 10, msg: "Warning: High level of full-stack excellence detected.", type: "info" },
  { file: "projects.tsx", line: 6, msg: "Info: 58+ projects delivered on time across Web2 & Web3.", type: "info" },
];

const OUTPUT_LOGS = [
  "[12:00:01] [next] ▲ Next.js 16 (Turbopack) ready on http://localhost:3000",
  "[12:00:02] [typescript] TypeScript language server 5.x initialized (0 errors)",
  "[12:00:02] [eslint] ESLint rule checker running in background",
  "[12:00:03] [git] Switched to branch 'main', working tree clean",
  "[12:00:04] [portfolio] Chandan Vishwakarma — Technical Project Manager & Full Stack Dev",
  "[12:00:05] [build] Compiled client & server bundles in 297ms (optimal)",
];

export default function TerminalPanel({
  open,
  onClose,
  onNavigate,
  onThemeChange,
}: {
  open: boolean;
  onClose: () => void;
  onNavigate: (tab: TabId) => void;
  onThemeChange?: (theme: "dark" | "light") => void;
}) {
  const [activePanel, setActivePanel] = useState<PanelTab>("terminal");
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "info", text: "VS Code Integrated Terminal [zsh 5.9]" },
    { type: "output", text: 'Type "help" to view available commands.' },
    { type: "output", text: "" },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && activePanel === "terminal") {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [open, activePanel]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines, activePanel]);

  if (!open) return null;

  const push = (...newLines: TerminalLine[]) => setLines((p) => [...p, ...newLines]);

  const handleCommand = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) {
      push({ type: "prompt", text: `${PROMPT_USER}@${PROMPT_HOST}:~$ ` });
      return;
    }

    push({ type: "prompt", text: `${PROMPT_USER}@${PROMPT_HOST}:~$ ${trimmed}` });
    const parts = trimmed.split(" ");
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(" ").toLowerCase();

    switch (cmd) {
      case "help":
        HELP_TEXT.forEach((h) => push({ type: "output", text: h }));
        break;

      case "whoami":
        push(
          { type: "success", text: "Chandan Vishwakarma" },
          { type: "output", text: "Role: Technical Project Manager & Full Stack Developer (~6 yrs exp)" },
          { type: "output", text: "Current: QuadbTech, Ludhiana / Varanasi, India" },
          { type: "output", text: "Specialization: React, Next.js, Node.js, Web3/ICP Blockchain, AWS, Team Leadership" }
        );
        break;

      case "skills":
        push(
          { type: "info", text: "Frontend: React, Next.js, TypeScript, Tailwind CSS, Redux" },
          { type: "info", text: "Backend: Node.js, Express, PHP, REST APIs, WebSockets" },
          { type: "info", text: "Database: PostgreSQL, MongoDB, MySQL, Redis" },
          { type: "info", text: "Blockchain: ICP (Motoko), Ethereum, Solana, Smart Contracts, NFTs" },
          { type: "info", text: "DevOps & Cloud: AWS, Google Cloud, Docker, CI/CD, Digital Ocean" }
        );
        break;

      case "projects":
        push(
          { type: "success", text: "Featured Projects (58+ total):" },
          { type: "output", text: "  1. OWR — Multi-tenant E-Commerce SaaS (React, Node, PostgreSQL, Redis)" },
          { type: "output", text: "  2. Indonesia On Chain — Web3 LMS & NFT Certificates on ICP" },
          { type: "output", text: "  3. Begods — NFT Collector & Trading platform on ICP (EXTv2)" },
          { type: "output", text: "  4. BlockseBlock — 3-role Hackathon Management Platform" },
          { type: "output", text: "  5. SipNPlay — ICP HTML5 Tokenized Gaming Platform" },
          { type: "info", text: 'Type "open projects" to explore all details.' }
        );
        break;

      case "experience":
        push(
          { type: "success", text: "Career Timeline @ QuadbTech:" },
          { type: "output", text: "  • 10/2023 – Present: Technical Project Manager / Engineering Team Lead" },
          { type: "output", text: "  • 06/2022 – 09/2023: Team Lead (Led 10+ devs on OWR & Begods)" },
          { type: "output", text: "  • 06/2020 – 05/2022: Full Stack Developer (React, Node, Smart Contracts)" }
        );
        break;

      case "cat":
        if (arg === "bio.txt" || arg === "bio") {
          push(
            { type: "output", text: "Chandan Vishwakarma is a results-driven Technical Project Manager and Full Stack Developer." },
            { type: "output", text: "Passionate about high-impact SaaS platforms, scalable architectures, blockchain solutions, and leading agile engineering teams to deliver on time." }
          );
        } else {
          push({ type: "error", text: `cat: ${arg || "filename"}: No such file or directory. Try: cat bio.txt` });
        }
        break;

      case "contact":
        onNavigate("contact");
        push({ type: "success", text: "Navigated to contact.tsx" });
        break;

      case "open": {
        const validTabs: TabId[] = ["home", "about", "experience", "skills", "projects", "testimonials", "blog", "contact"];
        if (validTabs.includes(arg as TabId)) {
          onNavigate(arg as TabId);
          push({ type: "success", text: `Opened ${arg}.tsx` });
        } else {
          push({ type: "error", text: `Unknown tab "${arg}". Valid tabs: ${validTabs.join(", ")}` });
        }
        break;
      }

      case "theme":
        if (arg === "dark" || arg === "light") {
          onThemeChange?.(arg);
          push({ type: "success", text: `Theme changed to ${arg}` });
        } else {
          push({ type: "error", text: 'Usage: theme <dark|light>' });
        }
        break;

      case "date":
        push({ type: "output", text: new Date().toString() });
        break;

      case "clear":
        setLines([]);
        return;

      case "exit":
        onClose();
        return;

      default:
        push({ type: "error", text: `zsh: command not found: ${cmd}. Type "help" for a list of commands.` });
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const val = input;
      setHistory((p) => [val, ...p]);
      setHistIdx(-1);
      setInput("");
      handleCommand(val);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next);
      setInput(history[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? "" : history[next]);
    }
  };

  const copyOutput = () => {
    const text = lines.map((l) => l.text).join("\n");
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const getLineClass = (type: TerminalLine["type"]) => {
    switch (type) {
      case "input":
      case "prompt":
        return "text-[#dcdcaa]";
      case "success":
        return "text-vs-cyan font-medium";
      case "error":
        return "text-[#f44747]";
      case "info":
        return "text-vs-blue";
      default:
        return "text-vs-text";
    }
  };

  return (
    <div
      className={`border-t border-vs-border bg-vs-bg2 flex flex-col font-mono text-[12px] shrink-0 transition-all duration-200 z-30 ${
        isExpanded ? "h-[360px]" : "h-[220px]"
      }`}
    >
      {/* Tab bar / header */}
      <div className="flex items-center justify-between px-3 py-1 bg-vs-bg3 border-b border-vs-border select-none">
        <div className="flex items-center gap-1 sm:gap-4 overflow-x-auto">
          <button
            onClick={() => setActivePanel("terminal")}
            className={`flex items-center gap-1.5 px-2 py-1 rounded text-[11px] uppercase tracking-wider transition-colors ${
              activePanel === "terminal" ? "text-vs-text font-bold border-b-2 border-vs-accent" : "text-vs-muted hover:text-vs-text"
            }`}
          >
            <TermIcon size={13} />
            <span>Terminal</span>
          </button>

          <button
            onClick={() => setActivePanel("problems")}
            className={`flex items-center gap-1.5 px-2 py-1 rounded text-[11px] uppercase tracking-wider transition-colors ${
              activePanel === "problems" ? "text-vs-text font-bold border-b-2 border-vs-accent" : "text-vs-muted hover:text-vs-text"
            }`}
          >
            <AlertCircle size={13} className="text-vs-cyan" />
            <span>Problems</span>
            <span className="bg-vs-bg px-1.5 py-0.2 rounded-full text-[9px] text-vs-muted">2</span>
          </button>

          <button
            onClick={() => setActivePanel("output")}
            className={`flex items-center gap-1.5 px-2 py-1 rounded text-[11px] uppercase tracking-wider transition-colors ${
              activePanel === "output" ? "text-vs-text font-bold border-b-2 border-vs-accent" : "text-vs-muted hover:text-vs-text"
            }`}
          >
            <Cpu size={13} />
            <span>Output</span>
          </button>

          <button
            onClick={() => setActivePanel("debug")}
            className={`flex items-center gap-1.5 px-2 py-1 rounded text-[11px] uppercase tracking-wider transition-colors ${
              activePanel === "debug" ? "text-vs-text font-bold border-b-2 border-vs-accent" : "text-vs-muted hover:text-vs-text"
            }`}
          >
            <Bug size={13} />
            <span>Debug Console</span>
          </button>
        </div>

        {/* Panel controls */}
        <div className="flex items-center gap-1">
          {activePanel === "terminal" && (
            <button
              onClick={copyOutput}
              title="Copy terminal output"
              className="p-1 text-vs-muted hover:text-vs-text transition-colors rounded"
            >
              {copied ? <Check size={12} className="text-vs-cyan" /> : <Copy size={12} />}
            </button>
          )}
          <button
            onClick={() => setIsExpanded((p) => !p)}
            title={isExpanded ? "Collapse panel" : "Expand panel"}
            className="p-1 text-vs-muted hover:text-vs-text transition-colors rounded"
          >
            {isExpanded ? <Minus size={12} /> : <ChevronUp size={12} />}
          </button>
          <button
            onClick={onClose}
            title="Close panel (⌘J)"
            className="p-1 text-vs-muted hover:text-vs-text transition-colors rounded"
          >
            <X size={12} />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-3" onClick={() => activePanel === "terminal" && inputRef.current?.focus()}>
        {activePanel === "terminal" && (
          <div className="space-y-0.5 leading-relaxed">
            {lines.map((l, idx) => (
              <div key={idx} className={`${getLineClass(l.type)} whitespace-pre-wrap break-all`}>
                {l.text || "\u00A0"}
              </div>
            ))}
            <div className="flex items-center gap-1 pt-1">
              <span className="text-vs-cyan font-semibold">{PROMPT_USER}</span>
              <span className="text-vs-muted">@{PROMPT_HOST}:~$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                className="flex-1 bg-transparent text-vs-text outline-none caret-vs-accent ml-1 font-mono text-[12px]"
                autoFocus
                spellCheck={false}
              />
            </div>
            <div ref={bottomRef} />
          </div>
        )}

        {activePanel === "problems" && (
          <div className="space-y-2">
            <p className="text-vs-muted text-[11px] mb-2">No errors detected in workspace. 2 informational diagnostics found:</p>
            {PROBLEMS_DATA.map((p, i) => (
              <div key={i} className="flex items-start gap-2 p-2 bg-vs-bg3 rounded border border-vs-border">
                <AlertCircle size={14} className="text-vs-cyan shrink-0 mt-0.5" />
                <div className="text-[11px]">
                  <span className="text-vs-text font-semibold">{p.msg}</span>
                  <span className="text-vs-muted ml-2">[{p.file}:{p.line}]</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activePanel === "output" && (
          <div className="space-y-1 text-[11px] text-vs-muted">
            <p className="text-vs-cyan font-semibold mb-2">[Next.js Turbopack dev-server output stream]</p>
            {OUTPUT_LOGS.map((log, i) => (
              <div key={i} className="font-mono text-vs-text/80">{log}</div>
            ))}
          </div>
        )}

        {activePanel === "debug" && (
          <div className="text-[11px] text-vs-muted space-y-2">
            <p className="text-vs-keyword">{"// Debug session active"}</p>
            <p className="text-vs-func">{"> Chandan.getStatus()"}</p>
            <p className="text-vs-string">&quot;Ready for new full-time / freelance opportunities&quot;</p>
            <p className="text-vs-func">{"> Chandan.getOpenToWork()"}</p>
            <p className="text-vs-cyan">true</p>
          </div>
        )}
      </div>
    </div>
  );
}
