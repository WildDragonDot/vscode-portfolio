"use client";
import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";

type LineType = "input" | "output" | "error" | "success" | "prompt" | "info";
type Line = { type: LineType; text: string };
type Step = null | "name" | "email" | "message";

const PROMPT = "visitor@chandan-portfolio:~$ ";
const PROMPT_USER = "visitor";
const PROMPT_HOST = "chandan";
const EJS_SERVICE  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  ?? "";
const EJS_TEMPLATE = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const EJS_KEY      = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  ?? "";

const lineColor: Record<LineType, string> = {
  input:   "text-vs-text",
  output:  "text-vs-muted",
  error:   "text-[#f44747]",
  success: "text-vs-cyan",
  prompt:  "text-[#dcdcaa]",
  info:    "text-[#569cd6]",
};

export default function Contact({ onToast }: { onToast?: (msg: string) => void }) {
  const [lines, setLines]       = useState<Line[]>([
    { type: "output", text: "Welcome to Chandan's contact terminal." },
    { type: "info",   text: 'Type "help" to see available commands.' },
    { type: "output", text: "" },
  ]);
  const [input, setInput]       = useState("");
  const [history, setHistory]   = useState<string[]>([]);
  const [histIdx, setHistIdx]   = useState(-1);
  const [step, setStep]         = useState<Step>(null);
  const [sending, setSending]   = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [lines]);
  useEffect(() => { inputRef.current?.focus(); }, []);

  const push = (...nl: Line[]) => setLines((p) => [...p, ...nl]);

  const handleCommand = async (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    push({ type: "input", text: PROMPT + cmd });

    if (step === "name") {
      if (!cmd.trim()) { push({ type: "error", text: "Name cannot be empty." }); return; }
      setFormData((p) => ({ ...p, name: cmd.trim() }));
      setStep("email");
      push({ type: "success", text: `Hello, ${cmd.trim()}!` }, { type: "prompt", text: "Enter your email address:" });
      return;
    }

    if (step === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cmd.trim())) {
        push({ type: "error", text: "Invalid email. Try again:" });
        return;
      }
      setFormData((p) => ({ ...p, email: cmd.trim() }));
      setStep("message");
      push({ type: "success", text: "Email saved." }, { type: "prompt", text: "Enter your message:" });
      return;
    }

    if (step === "message") {
      if (!cmd.trim()) { push({ type: "error", text: "Message cannot be empty." }); return; }
      const final = { ...formData, message: cmd.trim() };
      setFormData(final);
      setStep(null);
      setSending(true);
      push({ type: "info", text: "Sending message..." });
      try {
        await emailjs.send(EJS_SERVICE, EJS_TEMPLATE, {
          from_name:  final.name,
          from_email: final.email,
          message:    final.message,
          to_name:    "Chandan",
          reply_to:   final.email,
          time:       new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
        }, EJS_KEY);
        push(
          { type: "success", text: "Message sent successfully!" },
          { type: "output",  text: "Chandan will get back to you soon." },
          { type: "output",  text: "" }
        );
        onToast?.(`Message from ${final.name} sent!`);
      } catch {
        push(
          { type: "error", text: "Failed to send. Email directly:" },
          { type: "info",  text: "  chandanvishwakarma.tech@gmail.com" }
        );
      } finally {
        setSending(false);
      }
      return;
    }

    switch (trimmed) {
      case "help":
        push(
          { type: "output", text: "" },
          { type: "info",   text: "Available commands:" },
          { type: "output", text: "  contact  — Send email to Chandan" },
          { type: "output", text: "  email    — Copy email address" },
          { type: "output", text: "  resume   — Download resume PDF" },
          { type: "output", text: "  github   — Open GitHub" },
          { type: "output", text: "  linkedin — Open LinkedIn" },
          { type: "output", text: "  website  — Open cpdevs.com" },
          { type: "output", text: "  whoami   — About Chandan" },
          { type: "output", text: "  clear    — Clear terminal" },
          { type: "output", text: "" }
        );
        break;
      case "contact":
        setStep("name");
        setFormData({ name: "", email: "", message: "" });
        push(
          { type: "output", text: "" },
          { type: "info",   text: "Starting contact form — sends email directly to Chandan." },
          { type: "prompt", text: "Enter your name:" }
        );
        break;
      case "email":
        navigator.clipboard?.writeText("chandanvishwakarma.tech@gmail.com");
        push({ type: "success", text: "chandanvishwakarma.tech@gmail.com — copied!" });
        break;
      case "resume":
        window.open("/Chandan_Vishwakarma_Resume.pdf", "_blank");
        push({ type: "success", text: "Opening resume PDF..." });
        break;
      case "github":
        window.open("https://github.com/WildDragonDot", "_blank");
        push({ type: "success", text: "Opening GitHub..." });
        break;
      case "linkedin":
        window.open("https://www.linkedin.com/in/chandanvishwakarma007", "_blank");
        push({ type: "success", text: "Opening LinkedIn..." });
        break;
      case "website":
        window.open("https://cpdevs.com/", "_blank");
        push({ type: "success", text: "Opening cpdevs.com..." });
        break;
      case "whoami":
        push(
          { type: "output",  text: "" },
          { type: "success", text: "Chandan Vishwakarma" },
          { type: "output",  text: "Full Stack Developer | 5 years exp" },
          { type: "output",  text: "Technical Project Manager @ QuadbTech" },
          { type: "output",  text: "Varanasi, India" },
          { type: "output",  text: "" }
        );
        break;
      case "clear":
        setLines([]);
        break;
      case "":
        break;
      default:
        push({ type: "error", text: `Command not found: "${cmd}". Type "help".` });
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !sending) {
      const val = input;
      setHistory((p) => [val, ...p]);
      setHistIdx(-1);
      setInput("");
      handleCommand(val);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next);
      setInput(history[next] ?? "");
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? "" : history[next]);
    }
  };

  return (
    <div className="p-3 sm:p-6 font-mono max-w-3xl">
      <div className="flex items-center gap-1 text-[11px] text-vs-muted mb-5">
        <span>chandan-portfolio</span>
        <span className="text-vs-border mx-0.5">›</span>
        <span className="text-vs-text">contact.tsx</span>
      </div>
      <p className="text-vs-comment text-[12px] mb-5">{"// Contact Terminal — messages go directly to Chandan's inbox"}</p>

      <div
        className="bg-vs-bg2 border border-vs-border rounded-lg overflow-hidden cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-vs-bg3 border-b border-vs-border">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="ml-2 text-[11px] text-vs-muted">Terminal — contact@chandan</span>
          </div>
          {step && (
            <div className="flex items-center gap-1 text-[10px]">
              <span className={step === "name" ? "text-vs-accent" : "text-vs-cyan"}>name</span>
              <span className="text-vs-border">›</span>
              <span className={step === "email" ? "text-vs-accent" : step === "message" ? "text-vs-cyan" : "text-vs-border"}>email</span>
              <span className="text-vs-border">›</span>
              <span className={step === "message" ? "text-vs-accent" : "text-vs-border"}>message</span>
            </div>
          )}
        </div>

        {/* Output */}
        <div className="p-4 min-h-[200px] sm:min-h-[300px] max-h-[350px] sm:max-h-[400px] overflow-y-auto text-[12px] leading-6">
          {lines.map((line, i) => (
            <div key={i} className={lineColor[line.type]}>{line.text || "\u00A0"}</div>
          ))}
          <div className="flex items-center">
            <span className="text-vs-cyan text-[10px] sm:text-[12px] whitespace-nowrap">{PROMPT_USER}</span>
            <span className="text-vs-muted text-[10px] sm:text-[12px] whitespace-nowrap">@{PROMPT_HOST}:~$ </span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              disabled={sending}
              className="flex-1 bg-transparent outline-none text-vs-text caret-vs-accent ml-0.5 disabled:opacity-40"
              spellCheck={false}
              autoComplete="off"
            />
            {sending && <span className="text-vs-muted text-[10px] animate-pulse">sending...</span>}
          </div>
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Quick buttons */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-2">
        {[
          { label: "✉ Contact",   cmd: "contact"  },
          { label: "📧 Email",    cmd: "email"    },
          { label: "⬇ Resume",   cmd: "resume"   },
          { label: "⌥ GitHub",   cmd: "github"   },
          { label: "⌘ LinkedIn", cmd: "linkedin" },
        ].map(({ label, cmd }) => (
          <button
            key={cmd}
            onClick={() => { setInput(""); handleCommand(cmd); }}
            disabled={sending}
            className="px-3 py-2 bg-vs-bg2 border border-vs-border text-vs-muted text-[11px] rounded hover:border-vs-accent hover:text-vs-accent transition-colors text-left disabled:opacity-40"
          >
            {label}
          </button>
        ))}
      </div>

      {/* EmailJS config warning */}
      {(!EJS_SERVICE || !EJS_TEMPLATE || !EJS_KEY) && (
        <div className="mt-4 bg-[#dcdcaa]/5 border border-[#dcdcaa]/30 rounded-lg p-3 text-[11px]">
          <p className="text-[#dcdcaa] font-semibold mb-1">EmailJS not configured</p>
          <p className="text-vs-muted">Add these to <span className="text-vs-cyan">.env.local</span>:</p>
          <p className="text-vs-muted mt-1">NEXT_PUBLIC_EMAILJS_SERVICE_ID</p>
          <p className="text-vs-muted">NEXT_PUBLIC_EMAILJS_TEMPLATE_ID</p>
          <p className="text-vs-muted">NEXT_PUBLIC_EMAILJS_PUBLIC_KEY</p>
        </div>
      )}
    </div>
  );
}
