"use client";
import { TabId } from "@/app/page";
import { Files, Search, GitBranch, Bug, Blocks, Settings, User, Mail } from "lucide-react";

const navItems: { icon: React.ElementType; tip: string; action: string | null; tab?: TabId; href?: string }[] = [
  { icon: Files,     tip: "Explorer",               action: "toggle" },
  { icon: Search,    tip: "Search (⌘K)",             action: "cmd" },
  { icon: GitBranch, tip: "GitHub",                  action: "href", href: "https://github.com/WildDragonDot" },
  { icon: Bug,       tip: "Projects",                action: "tab",  tab: "projects" },
  { icon: Blocks,    tip: "Skills",                  action: "tab",  tab: "skills" },
  { icon: Mail,      tip: "Contact",                 action: "tab",  tab: "contact" },
];

export default function ActivityBar({
  activeTab,
  onSelect,
  sidebarOpen,
  onToggleSidebar,
  onOpenCmd,
  onOpenSettings,
}: {
  activeTab: TabId;
  onSelect: (t: TabId) => void;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  onOpenCmd?: () => void;
  onOpenSettings?: () => void;
}) {
  const handleClick = (action: string | null, tab?: TabId, href?: string) => {
    if (action === "toggle") onToggleSidebar();
    else if (action === "cmd") onOpenCmd?.();
    else if (action === "tab" && tab) onSelect(tab);
    else if (action === "href" && href) window.open(href, "_blank");
  };

  return (
    <div className="w-12 bg-vs-actbar border-r border-vs-border flex flex-col items-center py-1 shrink-0">
      <div className="flex flex-col items-center gap-0.5 flex-1">
        {navItems.map(({ icon: Icon, tip, action, tab, href }) => {
          const isActive =
            (action === "toggle" && sidebarOpen) ||
            (action === "tab" && tab === activeTab);
          return (
            <button
              key={tip}
              title={tip}
              onClick={() => handleClick(action, tab, href)}
              className={`w-12 h-12 flex items-center justify-center transition-colors relative group ${
                isActive
                  ? "text-vs-text border-l-2 border-vs-accent"
                  : "text-vs-muted hover:text-vs-text border-l-2 border-transparent"
              }`}
            >
              <Icon size={22} strokeWidth={1.5} />
              <span className="absolute left-14 bg-vs-bg2 text-vs-text text-[11px] px-2 py-1 rounded border border-vs-border whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-card">
                {tip}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-0.5 pb-1">
        <button
          title="About Me"
          onClick={() => onSelect("about")}
          className={`w-12 h-12 flex items-center justify-center transition-colors border-l-2 ${
            activeTab === "about" ? "text-vs-text border-vs-accent" : "text-vs-muted hover:text-vs-text border-transparent"
          }`}
        >
          <User size={22} strokeWidth={1.5} />
        </button>
        <button
          title="Settings"
          onClick={onOpenSettings}
          className="w-12 h-12 flex items-center justify-center text-vs-muted hover:text-vs-text transition-colors border-l-2 border-transparent"
        >
          <Settings size={22} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
