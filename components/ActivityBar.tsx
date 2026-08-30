"use client";
import { TabId } from "@/app/page";
import { Files, Search, GitBranch, Bug, Blocks, Settings, User, Mail, Terminal } from "lucide-react";

export default function ActivityBar({
  activeTab,
  onSelect,
  sidebarOpen,
  onToggleSidebar,
  onOpenCmd,
  onOpenSettings,
  onToggleTerminal,
  terminalOpen,
}: {
  activeTab: TabId;
  onSelect: (t: TabId) => void;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  onOpenCmd?: () => void;
  onOpenSettings?: () => void;
  onToggleTerminal?: () => void;
  terminalOpen?: boolean;
}) {
  return (
    <div className="w-12 bg-vs-actbar border-r border-vs-border flex flex-col items-center py-1 shrink-0 select-none">
      {/* Top Icons */}
      <div className="flex flex-col items-center gap-0.5 flex-1">
        {/* Explorer */}
        <button
          title="Explorer (⌘B)"
          onClick={onToggleSidebar}
          className={`w-12 h-12 flex items-center justify-center transition-colors relative group border-l-2 ${
            sidebarOpen ? "text-vs-text border-vs-accent" : "text-vs-muted hover:text-vs-text border-transparent"
          }`}
        >
          <Files size={22} strokeWidth={1.5} />
          <span className="absolute left-14 bg-vs-bg2 text-vs-text text-[11px] px-2 py-1 rounded border border-vs-border whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-card">
            Explorer (⌘B)
          </span>
        </button>

        {/* Search */}
        <button
          title="Search & Command Palette (⌘K)"
          onClick={onOpenCmd}
          className="w-12 h-12 flex items-center justify-center text-vs-muted hover:text-vs-text transition-colors relative group border-l-2 border-transparent"
        >
          <Search size={22} strokeWidth={1.5} />
          <span className="absolute left-14 bg-vs-bg2 text-vs-text text-[11px] px-2 py-1 rounded border border-vs-border whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-card">
            Search (⌘K)
          </span>
        </button>

        {/* Git */}
        <a
          href="https://github.com/WildDragonDot"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub Repositories"
          className="w-12 h-12 flex items-center justify-center text-vs-muted hover:text-vs-text transition-colors relative group border-l-2 border-transparent"
        >
          <GitBranch size={22} strokeWidth={1.5} />
          <span className="absolute left-14 bg-vs-bg2 text-vs-text text-[11px] px-2 py-1 rounded border border-vs-border whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-card">
            Source Control (GitHub)
          </span>
        </a>

        {/* Projects */}
        <button
          title="Projects (58 total)"
          onClick={() => onSelect("projects")}
          className={`w-12 h-12 flex items-center justify-center transition-colors relative group border-l-2 ${
            activeTab === "projects" ? "text-vs-text border-vs-accent" : "text-vs-muted hover:text-vs-text border-transparent"
          }`}
        >
          <Bug size={22} strokeWidth={1.5} />
          <span className="absolute left-14 bg-vs-bg2 text-vs-text text-[11px] px-2 py-1 rounded border border-vs-border whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-card">
            Projects (58 Delivered)
          </span>
        </button>

        {/* Skills */}
        <button
          title="Skills & Tech Stack"
          onClick={() => onSelect("skills")}
          className={`w-12 h-12 flex items-center justify-center transition-colors relative group border-l-2 ${
            activeTab === "skills" ? "text-vs-text border-vs-accent" : "text-vs-muted hover:text-vs-text border-transparent"
          }`}
        >
          <Blocks size={22} strokeWidth={1.5} />
          <span className="absolute left-14 bg-vs-bg2 text-vs-text text-[11px] px-2 py-1 rounded border border-vs-border whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-card">
            Technical Skills
          </span>
        </button>

        {/* Terminal Panel Toggle */}
        <button
          title="Integrated Terminal (⌘J)"
          onClick={onToggleTerminal}
          className={`w-12 h-12 flex items-center justify-center transition-colors relative group border-l-2 ${
            terminalOpen ? "text-vs-text border-vs-accent" : "text-vs-muted hover:text-vs-text border-transparent"
          }`}
        >
          <Terminal size={22} strokeWidth={1.5} />
          <span className="absolute left-14 bg-vs-bg2 text-vs-text text-[11px] px-2 py-1 rounded border border-vs-border whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-card">
            Terminal Panel (⌘J)
          </span>
        </button>

        {/* Contact */}
        <button
          title="Contact Chandan"
          onClick={() => onSelect("contact")}
          className={`w-12 h-12 flex items-center justify-center transition-colors relative group border-l-2 ${
            activeTab === "contact" ? "text-vs-text border-vs-accent" : "text-vs-muted hover:text-vs-text border-transparent"
          }`}
        >
          <Mail size={22} strokeWidth={1.5} />
          <span className="absolute left-14 bg-vs-bg2 text-vs-text text-[11px] px-2 py-1 rounded border border-vs-border whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-card">
            Contact & Hire
          </span>
        </button>
      </div>

      {/* Bottom Icons */}
      <div className="flex flex-col items-center gap-0.5 pb-1">
        <button
          title="About Chandan"
          onClick={() => onSelect("about")}
          className={`w-12 h-12 flex items-center justify-center transition-colors border-l-2 ${
            activeTab === "about" ? "text-vs-text border-vs-accent" : "text-vs-muted hover:text-vs-text border-transparent"
          }`}
        >
          <User size={22} strokeWidth={1.5} />
        </button>

        <button
          title="Preferences & Settings"
          onClick={onOpenSettings}
          className="w-12 h-12 flex items-center justify-center text-vs-muted hover:text-vs-text transition-colors border-l-2 border-transparent"
        >
          <Settings size={22} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
