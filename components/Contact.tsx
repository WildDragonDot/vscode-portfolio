"use client";
import { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { Terminal as TerminalIcon, Send, Mail, Check, Copy, MessageSquare, Phone, Globe } from "lucide-react";

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
  const [mode, setMode] = useState<"visual" | "terminal">("visual");

  // Terminal state
  const [lines, setLines] = useState<Line[]>([
    { type: "output", text: "Welcome to Chandan's contact terminal." },
    { type: "info",   text: 'Type "help" to see available commands or "contact" to start interactive mail.' },
    { type: "output", text: "" },
  ]);
  const [input, setInput]       = useState("");
  const [history, setHistory]   = useState<string[]>([]);
  const [histIdx, setHistIdx]   = useState(-1);
  const [step, setStep]         = useState<Step>(null);
  const [sending, setSending]   = useState(false);
  const [terminalForm, setTerminalForm] = useState({ name: "", email: "", message: "" });
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  // Visual form state
  const [vName, setVName]       = useState("");
  const [vEmail, setVEmail]     = useState("");
  const [vSubject, setVSubject] = useState("");
  const [vMessage, setVMessage] = useState("");
  const [vStatus, setVStatus]   = useState<"idle" | "sending" | "success" | "error">("idle");
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    if (mode === "terminal") {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [lines, mode]);

  const push = (...nl: Line[]) => setLines((p) => [...p, ...nl]);

  const handleTerminalCommand = async (cmd: string) => {
    const trimmed = cmd.trim();
    const lower = trimmed.toLowerCase();
    push({ type: "input", text: PROMPT + cmd });

    if (step === "name") {
      if (!trimmed) { push({ type: "error", text: "Name cannot be empty." }); return; }
      setTerminalForm((p) => ({ ...p, name: trimmed }));
      setStep("email");
      push({ type: "success", text: `Hello, ${trimmed}!` }, { type: "prompt", text: "Enter your email address:" });
      return;
    }

    if (step === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
        push({ type: "error", text: "Invalid email address. Try again:" });
        return;
      }
      setTerminalForm((p) => ({ ...p, email: trimmed }));
      setStep("message");
      push({ type: "success", text: "Email saved." }, { type: "prompt", text: "Enter your message:" });
      return;
    }

    if (step === "message") {
      if (!trimmed) { push({ type: "error", text: "Message cannot be empty." }); return; }
      const final = { ...terminalForm, message: trimmed };
      setTerminalForm(final);
      setStep(null);
      setSending(true);
      push({ type: "info", text: "Sending message..." });

      if (EJS_SERVICE && EJS_TEMPLATE && EJS_KEY) {
        try {
          await emailjs.send(EJS_SERVICE, EJS_TEMPLATE, {
            name:       final.name,
            from_name:  final.name,
            email:      final.email,
            from_email: final.email,
            title:      "Terminal Portfolio Contact",
            message:    final.message,
            to_name:    "Chandan",
            reply_to:   final.email,
            time:       new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
          }, EJS_KEY);
          push(
            { type: "success", text: "Message sent successfully!" },
            { type: "output",  text: "Chandan will get back to you soon." }
          );
          onToast?.(`Message from ${final.name} sent!`);
        } catch {
          push(
            { type: "error", text: "Email service temporarily unavailable. Direct email:" },
            { type: "info",  text: "  chandanvishwakarma.tech@gmail.com" }
          );
        }
      } else {
        // Mailto fallback
        window.location.href = `mailto:chandanvishwakarma.tech@gmail.com?subject=Contact from ${encodeURIComponent(final.name)}&body=${encodeURIComponent(final.message + "\n\nReply to: " + final.email)}`;
        push(
          { type: "success", text: "Opening your default email client with draft prepared..." },
          { type: "info",    text: "Direct email: chandanvishwakarma.tech@gmail.com" }
        );
        onToast?.("Opening email client...");
      }
      setSending(false);
      return;
    }

    switch (lower) {
      case "help":
        push(
          { type: "info",   text: "Available terminal commands:" },
          { type: "output", text: "  contact  — Send message directly to Chandan" },
          { type: "output", text: "  email    — Copy email address" },
          { type: "output", text: "  resume   — Download resume PDF" },
          { type: "output", text: "  github   — Open GitHub profile" },
          { type: "output", text: "  linkedin — Open LinkedIn profile" },
          { type: "output", text: "  website  — Open chandandev.online" },
          { type: "output", text: "  whoami   — About Chandan" },
          { type: "output", text: "  clear    — Clear terminal buffer" },
          { type: "output", text: "  gui      — Switch to Visual Form" }
        );
        break;
      case "gui":
      case "form":
        setMode("visual");
        break;
      case "contact":
        setStep("name");
        setTerminalForm({ name: "", email: "", message: "" });
        push(
          { type: "info",   text: "Starting direct email dispatch:" },
          { type: "prompt", text: "Enter your name:" }
        );
        break;
      case "email":
        navigator.clipboard?.writeText("chandanvishwakarma.tech@gmail.com");
        push({ type: "success", text: "chandanvishwakarma.tech@gmail.com copied to clipboard!" });
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
        window.open("https://chandandev.online/", "_blank");
        push({ type: "success", text: "Opening chandandev.online..." });
        break;
      case "whoami":
        push(
          { type: "success", text: "Chandan Vishwakarma" },
          { type: "output",  text: "Technical Project Manager & Full Stack Developer (~6 yrs exp)" },
          { type: "output",  text: "Location: Varanasi, Uttar Pradesh, India" },
          { type: "output",  text: "Email: chandanvishwakarma.tech@gmail.com" }
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
      handleTerminalCommand(val);
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

  const handleVisualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vName || !vEmail || !vMessage) return;

    setVStatus("sending");
    if (EJS_SERVICE && EJS_TEMPLATE && EJS_KEY) {
      try {
        await emailjs.send(EJS_SERVICE, EJS_TEMPLATE, {
          name:       vName,
          from_name:  vName,
          email:      vEmail,
          from_email: vEmail,
          title:      vSubject || "New Portfolio Contact",
          subject:    vSubject || "New Portfolio Contact",
          message:    vMessage,
          to_name:    "Chandan",
          reply_to:   vEmail,
          time:       new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
        }, EJS_KEY);
        setVStatus("success");
        onToast?.(`Thanks ${vName}, your message was delivered!`);
        setVName("");
        setVEmail("");
        setVSubject("");
        setVMessage("");
      } catch {
        setVStatus("error");
      }
    } else {
      // Direct mailto fallback
      const mailtoUrl = `mailto:chandanvishwakarma.tech@gmail.com?subject=${encodeURIComponent(vSubject || `Message from ${vName}`)}&body=${encodeURIComponent(`Name: ${vName}\nEmail: ${vEmail}\n\nMessage:\n${vMessage}`)}`;
      window.location.href = mailtoUrl;
      setVStatus("success");
      onToast?.("Opening your email client to complete dispatch!");
    }
  };

  const copyEmail = () => {
    navigator.clipboard?.writeText("chandanvishwakarma.tech@gmail.com");
    setCopiedEmail(true);
    onToast?.("Email copied to clipboard!");
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="p-3 sm:p-6 font-mono max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-[11px] text-vs-muted mb-5">
        <span>chandan-portfolio</span>
        <span className="text-vs-border mx-0.5">›</span>
        <span className="text-vs-text">contact.tsx</span>
      </div>

      {/* Header with Mode Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <p className="text-vs-comment text-[12px]">{"// Get in Touch — Open for full-time roles & consulting"}</p>
          <p className="text-vs-muted text-[11px] mt-0.5">Feel free to send a message or connect directly across channels</p>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center bg-vs-bg2 border border-vs-border rounded p-0.5 self-start sm:self-auto">
          <button
            onClick={() => setMode("visual")}
            className={`flex items-center gap-1.5 px-3 py-1 text-[11px] rounded transition-all ${
              mode === "visual" ? "bg-vs-accent text-white font-semibold shadow-sm" : "text-vs-muted hover:text-vs-text"
            }`}
          >
            <Mail size={12} />
            <span>Form View</span>
          </button>
          <button
            onClick={() => setMode("terminal")}
            className={`flex items-center gap-1.5 px-3 py-1 text-[11px] rounded transition-all ${
              mode === "terminal" ? "bg-vs-accent text-white font-semibold shadow-sm" : "text-vs-muted hover:text-vs-text"
            }`}
          >
            <TerminalIcon size={12} />
            <span>Terminal CLI</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Column: Direct Contact Info & Quick Cards */}
        <div className="space-y-3">
          <div className="bg-vs-bg2 border border-vs-border rounded-lg p-4">
            <p className="text-vs-comment text-[11px] mb-3">{"// Direct Coordinates"}</p>
            <div className="space-y-3 text-[12px]">
              <div>
                <p className="text-vs-muted text-[10px] uppercase">Email</p>
                <div className="flex items-center justify-between gap-2 mt-0.5">
                  <a
                    href="mailto:chandanvishwakarma.tech@gmail.com"
                    className="text-vs-cyan hover:underline truncate text-[11px]"
                  >
                    chandanvishwakarma.tech@gmail.com
                  </a>
                  <button
                    onClick={copyEmail}
                    title="Copy email"
                    className="text-vs-muted hover:text-vs-text p-1 rounded bg-vs-bg3 border border-vs-border"
                  >
                    {copiedEmail ? <Check size={11} className="text-vs-cyan" /> : <Copy size={11} />}
                  </button>
                </div>
              </div>

              <div>
                <p className="text-vs-muted text-[10px] uppercase">Location</p>
                <p className="text-vs-text text-[11px] mt-0.5">Varanasi & Ludhiana, India (IST UTC+5:30)</p>
              </div>

              <div>
                <p className="text-vs-muted text-[10px] uppercase">Availability</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 text-[11px] font-semibold">Open to Work / Freelance</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links Cards */}
          <div className="bg-vs-bg2 border border-vs-border rounded-lg p-4 space-y-2">
            <p className="text-vs-comment text-[11px] mb-2">{"// Social & Profiles"}</p>
            <a
              href="https://www.linkedin.com/in/chandanvishwakarma007"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2 rounded bg-vs-bg3 hover:bg-vs-border text-vs-text text-[11px] transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-vs-blue font-bold">in</span>
                <span>LinkedIn</span>
              </div>
              <span className="text-vs-muted text-[10px]">chandanvishwakarma007 ↗</span>
            </a>

            <a
              href="https://github.com/WildDragonDot"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2 rounded bg-vs-bg3 hover:bg-vs-border text-vs-text text-[11px] transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-vs-cyan font-bold">⌥</span>
                <span>GitHub</span>
              </div>
              <span className="text-vs-muted text-[10px]">WildDragonDot ↗</span>
            </a>

            <a
              href="https://chandandev.online/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2 rounded bg-vs-bg3 hover:bg-vs-border text-vs-text text-[11px] transition-colors"
            >
              <div className="flex items-center gap-2">
                <Globe size={12} className="text-vs-yellow" />
                <span>Personal Site</span>
              </div>
              <span className="text-vs-muted text-[10px]">chandandev.online ↗</span>
            </a>
          </div>
        </div>

        {/* Right Column: Visual Form or Interactive Terminal */}
        <div className="lg:col-span-2">
          {mode === "visual" ? (
            <div className="bg-vs-bg2 border border-vs-border rounded-lg overflow-hidden flex flex-col">
              <div className="flex items-center justify-between px-4 py-2 bg-vs-bg3 border-b border-vs-border text-[11px]">
                <div className="flex items-center gap-2 text-vs-muted">
                  <span className="text-vs-red">●</span>
                  <span className="text-vs-text font-semibold">message_form.tsx</span>
                </div>
                <span className="text-[10px] text-vs-muted">Direct Dispatch</span>
              </div>

              <form onSubmit={handleVisualSubmit} className="p-4 sm:p-5 space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-vs-muted mb-1 font-semibold">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={vName}
                      onChange={(e) => setVName(e.target.value)}
                      className="w-full bg-vs-bg border border-vs-border rounded px-3 py-2 text-[12px] text-vs-text outline-none focus:border-vs-accent font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-vs-muted mb-1 font-semibold">Your Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={vEmail}
                      onChange={(e) => setVEmail(e.target.value)}
                      className="w-full bg-vs-bg border border-vs-border rounded px-3 py-2 text-[12px] text-vs-text outline-none focus:border-vs-accent font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-vs-muted mb-1 font-semibold">Subject / Topic</label>
                  <input
                    type="text"
                    placeholder="Project Inquiry / Job Opportunity"
                    value={vSubject}
                    onChange={(e) => setVSubject(e.target.value)}
                    className="w-full bg-vs-bg border border-vs-border rounded px-3 py-2 text-[12px] text-vs-text outline-none focus:border-vs-accent font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-vs-muted mb-1 font-semibold">Message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Hi Chandan, let's discuss..."
                    value={vMessage}
                    onChange={(e) => setVMessage(e.target.value)}
                    className="w-full bg-vs-bg border border-vs-border rounded px-3 py-2 text-[12px] text-vs-text outline-none focus:border-vs-accent font-mono resize-none leading-relaxed"
                  />
                </div>

                <div className="flex items-center justify-between flex-wrap gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={vStatus === "sending"}
                    className="flex items-center gap-2 px-5 py-2.5 bg-vs-accent hover:bg-vs-accentHov text-white text-[12px] rounded transition-colors disabled:opacity-50 font-semibold shadow-glow"
                  >
                    <Send size={13} />
                    <span>{vStatus === "sending" ? "Sending..." : "Send Message"}</span>
                  </button>

                  {vStatus === "success" && (
                    <span className="text-vs-cyan text-[11px] flex items-center gap-1 font-semibold">
                      <Check size={13} /> Message sent successfully!
                    </span>
                  )}
                  {vStatus === "error" && (
                    <span className="text-vs-red text-[11px]">
                      Failed to send. Please email chandanvishwakarma.tech@gmail.com
                    </span>
                  )}
                </div>
              </form>
            </div>
          ) : (
            <div
              className="bg-vs-bg2 border border-vs-border rounded-lg overflow-hidden cursor-text flex flex-col"
              onClick={() => inputRef.current?.focus()}
            >
              <div className="flex items-center justify-between px-4 py-2 bg-vs-bg3 border-b border-vs-border">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  <span className="ml-2 text-[11px] text-vs-muted font-semibold">Terminal — contact@chandan</span>
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

              <div className="p-4 min-h-[260px] max-h-[360px] overflow-y-auto text-[12px] leading-6 select-text">
                {lines.map((line, i) => (
                  <div key={i} className={lineColor[line.type]}>{line.text || "\u00A0"}</div>
                ))}
                <div className="flex items-center pt-1">
                  <span className="text-vs-cyan text-[11px] whitespace-nowrap">{PROMPT_USER}</span>
                  <span className="text-vs-muted text-[11px] whitespace-nowrap">@{PROMPT_HOST}:~$ </span>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    disabled={sending}
                    className="flex-1 bg-transparent outline-none text-vs-text caret-vs-accent ml-1 disabled:opacity-40 font-mono text-[12px]"
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {sending && <span className="text-vs-muted text-[10px] animate-pulse">sending...</span>}
                </div>
                <div ref={bottomRef} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
