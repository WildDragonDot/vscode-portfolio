"use client";
import { useEffect, useRef, useState } from "react";
import { TabId } from "@/app/page";
import { Search, ArrowRight, Home, User, Briefcase, Code2, FolderGit2, Mail, X, Star, BookOpen } from "lucide-react";

type Cmd = {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
  category: string;
};

export default function CommandPalette({
  open,
  onClose,
  onNavigate,
}: {
  open: boolean;
  onClose: () => void;
  onNavigate: (tab: TabId | "contact") => void;
}) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: Cmd[] = [
    { id: "home",         label: "Go to Home",         description: "home.tsx",         icon: <Home size={14} />,        action: () => { onNavigate("home");         onClose(); }, category: "Navigation" },
    { id: "about",        label: "Go to About",        description: "about.tsx",        icon: <User size={14} />,        action: () => { onNavigate("about");        onClose(); }, category: "Navigation" },
    { id: "experience",   label: "Go to Experience",   description: "experience.tsx",   icon: <Briefcase size={14} />,   action: () => { onNavigate("experience");   onClose(); }, category: "Navigation" },
    { id: "skills",       label: "Go to Skills",       description: "skills.tsx",       icon: <Code2 size={14} />,       action: () => { onNavigate("skills");       onClose(); }, category: "Navigation" },
    { id: "projects",     label: "Go to Projects",     description: "projects.tsx",     icon: <FolderGit2 size={14} />,  action: () => { onNavigate("projects");     onClose(); }, category: "Navigation" },
    { id: "testimonials", label: "Go to Testimonials", description: "testimonials.tsx", icon: <Star size={14} />,        action: () => { onNavigate("testimonials"); onClose(); }, category: "Navigation" },
    { id: "blog",         label: "Go to Blog",         description: "blog.tsx",         icon: <BookOpen size={14} />,    action: () => { onNavigate("blog");         onClose(); }, category: "Navigation" },
    { id: "contact",      label: "Go to Contact",      description: "contact.tsx",      icon: <Mail size={14} />,        action: () => { onNavigate("contact");      onClose(); }, category: "Navigation" },
    { id: "github",       label: "Open GitHub",        description: "github.com/WildDragonDot", icon: <ArrowRight size={14} />, action: () => { window.open("https://github.com/WildDragonDot", "_blank"); onClose(); }, category: "External" },
    { id: "linkedin",     label: "Open LinkedIn",      description: "linkedin.com/in/chandanvishwakarma007", icon: <ArrowRight size={14} />, action: () => { window.open("https://www.linkedin.com/in/chandanvishwakarma007", "_blank"); onClose(); }, category: "External" },
    { id: "website",      label: "Open Website",       description: "cpdevs.com", icon: <ArrowRight size={14} />, action: () => { window.open("https://cpdevs.com/", "_blank"); onClose(); }, category: "External" },
    { id: "resume",       label: "Download Resume",    description: "Chandan_Vishwakarma_Resume.pdf", icon: <ArrowRight size={14} />, action: () => { window.open("/Chandan_Vishwakarma_Resume.pdf", "_blank"); onClose(); }, category: "External" },
  ];

  const filtered = query.trim()
    ? commands.filter((c) =>
        c.label.toLowerCase().includes(query.toLowerCase()) ||
        c.description.toLowerCase().includes(query.toLowerCase())
      )
    : commands;

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => { setSelected(0); }, [query]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "ArrowDown") { e.preventDefault(); setSelected((p) => Math.min(p + 1, filtered.length - 1)); }
      if (e.key === "ArrowUp")   { e.preventDefault(); setSelected((p) => Math.max(p - 1, 0)); }
      if (e.key === "Enter" && filtered[selected]) { filtered[selected].action(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, filtered, selected, onClose]);

  if (!open) return null;

  const grouped = filtered.reduce<Record<string, Cmd[]>>((acc, cmd) => {
    (acc[cmd.category] = acc[cmd.category] || []).push(cmd);
    return acc;
  }, {});

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Palette */}
      <div
        className="relative w-full max-w-[560px] mx-4 bg-vs-bg2 border border-vs-border2 rounded-lg shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-vs-border">
          <Search size={15} className="text-vs-muted shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search..."
            className="flex-1 bg-transparent text-[13px] text-vs-text placeholder-vs-muted outline-none font-mono"
          />
          <button onClick={onClose} className="text-vs-muted hover:text-vs-text transition-colors">
            <X size={14} />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[360px] overflow-y-auto py-1">
          {Object.entries(grouped).map(([cat, cmds]) => (
            <div key={cat}>
              <div className="px-4 py-1 text-[10px] uppercase tracking-widest text-vs-muted font-semibold">
                {cat}
              </div>
              {cmds.map((cmd) => {
                const globalIdx = filtered.indexOf(cmd);
                return (
                  <div
                    key={cmd.id}
                    onClick={cmd.action}
                    onMouseEnter={() => setSelected(globalIdx)}
                    className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors ${
                      selected === globalIdx ? "bg-vs-accent/20 border-l-2 border-vs-accent" : "border-l-2 border-transparent hover:bg-white/5"
                    }`}
                  >
                    <span className={selected === globalIdx ? "text-vs-accent" : "text-vs-muted"}>
                      {cmd.icon}
                    </span>
                    <span className="flex-1 text-[13px] text-vs-text">{cmd.label}</span>
                    <span className="text-[11px] text-vs-muted font-mono">{cmd.description}</span>
                    {selected === globalIdx && <ArrowRight size={12} className="text-vs-accent shrink-0" />}
                  </div>
                );
              })}
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="px-4 py-6 text-center text-vs-muted text-[12px]">
              No commands found for &quot;{query}&quot;
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-4 px-4 py-2 border-t border-vs-border text-[10px] text-vs-muted">
          <span><kbd className="bg-vs-bg3 px-1 rounded">↑↓</kbd> navigate</span>
          <span><kbd className="bg-vs-bg3 px-1 rounded">↵</kbd> select</span>
          <span><kbd className="bg-vs-bg3 px-1 rounded">Esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}
