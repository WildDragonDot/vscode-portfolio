"use client";
import { TabId } from "@/app/page";
import { X } from "lucide-react";

const navItems: { id: TabId; label: string; icon: string; color: string }[] = [
  { id: "home",         label: "home.tsx",         icon: "🏠", color: "text-[#569cd6]" },
  { id: "about",        label: "about.tsx",        icon: "👤", color: "text-[#4ec9b0]" },
  { id: "experience",   label: "experience.tsx",   icon: "💼", color: "text-[#dcdcaa]" },
  { id: "skills",       label: "skills.tsx",       icon: "⚡", color: "text-[#c586c0]" },
  { id: "projects",     label: "projects.tsx",     icon: "📁", color: "text-[#ce9178]" },
  { id: "testimonials", label: "testimonials.tsx", icon: "⭐", color: "text-[#b5cea8]" },
  { id: "blog",         label: "blog.tsx",         icon: "📝", color: "text-[#6a9955]" },
  { id: "contact",      label: "contact.tsx",      icon: "✉",  color: "text-[#f44747]" },
];

export default function MobileNav({
  open,
  activeTab,
  onSelect,
  onClose,
}: {
  open: boolean;
  activeTab: TabId;
  onSelect: (t: TabId) => void;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="mobile-drawer md:hidden">
      {/* Overlay */}
      <div className="mobile-drawer-overlay" onClick={onClose} />

      {/* Panel */}
      <div className="mobile-drawer-panel">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-vs-border">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-vs-text text-[12px] font-mono font-semibold">CHANDAN-PORTFOLIO</span>
          </div>
          <button onClick={onClose} className="text-vs-muted hover:text-vs-text transition-colors p-1">
            <X size={16} />
          </button>
        </div>

        {/* Nav items */}
        <div className="flex-1 overflow-y-auto py-2">
          <p className="px-4 py-1 text-[10px] uppercase tracking-widest text-vs-muted">Explorer</p>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                activeTab === item.id
                  ? "bg-vs-selection text-vs-text"
                  : "text-vs-muted hover:bg-vs-border/30 hover:text-vs-text"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span className={`text-[13px] font-mono ${activeTab === item.id ? "text-vs-text" : item.color}`}>
                {item.label}
              </span>
              {activeTab === item.id && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-vs-accent shrink-0" />
              )}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-vs-border px-4 py-3 space-y-2">
          <a
            href="/Chandan_Vishwakarma_Resume.pdf"
            download
            className="flex items-center gap-2 w-full px-3 py-2 bg-green-600 hover:bg-green-500 text-white text-[12px] rounded transition-colors font-mono"
          >
            <span>⬇</span> Download Resume
          </a>
          <div className="flex gap-2">
            <a href="https://github.com/WildDragonDot" target="_blank" rel="noopener noreferrer"
              className="flex-1 text-center px-2 py-1.5 bg-vs-bg3 border border-vs-border text-vs-muted text-[11px] rounded hover:border-vs-accent hover:text-vs-accent transition-colors">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/chandanvishwakarma007" target="_blank" rel="noopener noreferrer"
              className="flex-1 text-center px-2 py-1.5 bg-vs-bg3 border border-vs-border text-vs-muted text-[11px] rounded hover:border-vs-accent hover:text-vs-accent transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
