"use client";
import { TabId } from "@/app/page";
import { X } from "lucide-react";

const tabMeta: Record<TabId, { label: string; color: string; dot: string }> = {
  home:         { label: "home.tsx",         color: "text-[#569cd6]", dot: "bg-[#569cd6]" },
  about:        { label: "about.tsx",        color: "text-[#4ec9b0]", dot: "bg-[#4ec9b0]" },
  experience:   { label: "experience.tsx",   color: "text-[#dcdcaa]", dot: "bg-[#dcdcaa]" },
  skills:       { label: "skills.tsx",       color: "text-[#c586c0]", dot: "bg-[#c586c0]" },
  projects:     { label: "projects.tsx",     color: "text-[#ce9178]", dot: "bg-[#ce9178]" },
  testimonials: { label: "testimonials.tsx", color: "text-[#b5cea8]", dot: "bg-[#b5cea8]" },
  blog:         { label: "blog.tsx",         color: "text-[#6a9955]", dot: "bg-[#6a9955]" },
  contact:      { label: "contact.tsx",      color: "text-[#f44747]", dot: "bg-[#f44747]" },
};

// TSX file icon inline
function TsxIcon({ color }: { color: string }) {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" className={`shrink-0 ${color}`}>
      <rect x="1" y="1" width="14" height="14" rx="2" fill="currentColor" opacity="0.15" />
      <text x="2" y="12" fontSize="8" fontFamily="monospace" fill="currentColor" fontWeight="bold">tsx</text>
    </svg>
  );
}

export default function Tabs({
  openTabs, activeTab, onSelect, onClose,
}: {
  openTabs: TabId[];
  activeTab: TabId;
  onSelect: (t: TabId) => void;
  onClose: (t: TabId, e: React.MouseEvent) => void;
}) {
  return (
    <div className="flex bg-vs-tab border-b border-vs-border overflow-x-auto shrink-0" style={{ minHeight: 35 }}>
      {openTabs.map((tab) => {
        const meta = tabMeta[tab];
        const isActive = tab === activeTab;
        return (
          <div
            key={tab}
            onClick={() => onSelect(tab)}
            className={`group flex items-center gap-1.5 px-3 text-[12px] font-mono cursor-pointer border-r border-vs-border transition-colors shrink-0 relative ${
              isActive
                ? "bg-vs-tabActive text-vs-text"
                : "text-vs-muted hover:text-vs-text hover:bg-vs-bg3"
            }`}
          >
            {/* Active top border */}
            {isActive && (
              <span className="absolute top-0 left-0 right-0 h-[2px] bg-vs-accent" />
            )}
            <TsxIcon color={meta.color} />
            <span>{meta.label}</span>
            <button
              onClick={(e) => onClose(tab, e)}
              className={`ml-0.5 rounded p-0.5 transition-all ${
                isActive
                  ? "opacity-60 hover:opacity-100 hover:bg-vs-border"
                  : "opacity-0 group-hover:opacity-60 hover:!opacity-100 hover:bg-vs-border"
              }`}
            >
              <X size={11} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
