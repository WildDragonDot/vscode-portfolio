"use client";
import { useState } from "react";
import { TabId } from "@/app/page";
import { ChevronDown, ChevronRight, FileCode2, FileJson2, FolderOpen, Folder } from "lucide-react";

const fileMap: { id: TabId; label: string; color: string; dot: string }[] = [
  { id: "home",         label: "home.tsx",         color: "text-[#569cd6]", dot: "bg-[#569cd6]" },
  { id: "about",        label: "about.tsx",        color: "text-[#4ec9b0]", dot: "bg-[#4ec9b0]" },
  { id: "experience",   label: "experience.tsx",   color: "text-[#dcdcaa]", dot: "bg-[#dcdcaa]" },
  { id: "skills",       label: "skills.tsx",       color: "text-[#c586c0]", dot: "bg-[#c586c0]" },
  { id: "projects",     label: "projects.tsx",     color: "text-[#ce9178]", dot: "bg-[#ce9178]" },
  { id: "testimonials", label: "testimonials.tsx", color: "text-[#b5cea8]", dot: "bg-[#b5cea8]" },
  { id: "blog",         label: "blog.tsx",         color: "text-[#6a9955]", dot: "bg-[#6a9955]" },
  { id: "contact",      label: "contact.tsx",      color: "text-[#f44747]", dot: "bg-[#f44747]" },
];

function FileIcon({ color }: { color: string }) {
  return <FileCode2 size={14} className={color} />;
}

export default function Sidebar({ activeTab, onSelect }: { activeTab: TabId; onSelect: (t: TabId) => void }) {
  const [rootOpen, setRootOpen] = useState(true);
  const [appOpen,  setAppOpen]  = useState(true);

  return (
    <div className="w-[220px] bg-vs-sidebar border-r border-vs-border flex flex-col text-[12px] font-mono shrink-0 overflow-hidden">

      {/* Header */}
      <div className="px-4 py-2 text-[10px] uppercase tracking-[0.12em] text-vs-muted font-semibold border-b border-vs-border">
        Explorer
      </div>

      {/* Tree */}
      <div className="flex-1 overflow-y-auto py-1">

        {/* Root folder */}
        <div
          className="flex items-center gap-1 px-2 py-[3px] hover:bg-vs-border/30 cursor-pointer text-vs-text"
          onClick={() => setRootOpen((p) => !p)}
        >
          {rootOpen ? <ChevronDown size={13} className="text-vs-muted shrink-0" /> : <ChevronRight size={13} className="text-vs-muted shrink-0" />}
          {rootOpen
            ? <FolderOpen size={14} className="text-[#dcb67a] shrink-0" />
            : <Folder     size={14} className="text-[#dcb67a] shrink-0" />}
          <span className="ml-1 text-vs-text font-semibold">CHANDAN-PORTFOLIO</span>
        </div>

        {rootOpen && (
          <div>
            {/* package.json */}
            <div className="flex items-center gap-1 pl-6 pr-2 py-[3px] hover:bg-vs-border/30 cursor-default text-vs-muted">
              <FileJson2 size={13} className="text-yellow-400 shrink-0" />
              <span className="ml-1">package.json</span>
            </div>

            {/* app folder */}
            <div
              className="flex items-center gap-1 pl-6 pr-2 py-[3px] hover:bg-vs-border/30 cursor-pointer text-vs-text"
              onClick={() => setAppOpen((p) => !p)}
            >
              {appOpen ? <ChevronDown size={13} className="text-vs-muted shrink-0" /> : <ChevronRight size={13} className="text-vs-muted shrink-0" />}
              {appOpen
                ? <FolderOpen size={14} className="text-[#dcb67a] shrink-0" />
                : <Folder     size={14} className="text-[#dcb67a] shrink-0" />}
              <span className="ml-1">app</span>
            </div>

            {appOpen && fileMap.map((f) => (
              <div
                key={f.id}
                onClick={() => onSelect(f.id)}
                className={`flex items-center gap-1 pl-12 pr-2 py-[3px] cursor-pointer transition-colors ${
                  activeTab === f.id
                    ? "bg-vs-selection text-vs-text"
                    : "text-vs-muted hover:bg-vs-border/30 hover:text-vs-text"
                }`}
              >
                <FileIcon color={f.color} />
                <span className="ml-1">{f.label}</span>
                {activeTab === f.id && (
                  <span className={`ml-auto w-1.5 h-1.5 rounded-full ${f.dot} shrink-0`} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-vs-border px-3 py-2 flex items-center gap-2 text-[10px] text-vs-muted">
        <span className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
        <span>chandanvishwakarma</span>
      </div>
    </div>
  );
}
