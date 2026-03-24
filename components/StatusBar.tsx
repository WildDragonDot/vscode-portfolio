"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { TabId } from "@/app/page";
import { GitBranch, AlertCircle, Bell, Zap, Sun, Moon } from "lucide-react";

const info: Record<TabId, { lang: string }> = {
  home:         { lang: "TypeScript JSX" },
  about:        { lang: "TypeScript JSX" },
  experience:   { lang: "TypeScript JSX" },
  skills:       { lang: "TypeScript JSX" },
  projects:     { lang: "TypeScript JSX" },
  contact:      { lang: "Terminal" },
  testimonials: { lang: "TypeScript JSX" },
  blog:         { lang: "Markdown" },
};

export default function StatusBar({
  activeTab,
  onOpenCmd,
}: {
  activeTab: TabId;
  onOpenCmd?: () => void;
}) {
  const [time, setTime] = useState("");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="flex items-center justify-between bg-vs-statusBar text-white text-[11px] px-0 shrink-0 font-mono overflow-hidden"
      style={{ height: 22 }}
    >
      {/* Left — hide most items on mobile */}
      <div className="flex items-center h-full min-w-0">
        <div className="flex items-center gap-1.5 px-2 h-full hover:bg-white/10 cursor-pointer transition-colors border-r border-white/10 shrink-0">
          <GitBranch size={12} />
          <span>main</span>
        </div>
        <div className="hidden sm:flex items-center gap-1 px-2 h-full hover:bg-white/10 cursor-pointer transition-colors shrink-0">
          <AlertCircle size={11} />
          <span>0</span>
          <span className="opacity-50 mx-1">⚠</span>
          <span>0</span>
        </div>
        <div className="hidden sm:flex items-center gap-1 px-2 h-full hover:bg-white/10 cursor-pointer transition-colors shrink-0">
          <Zap size={11} className="text-yellow-300" />
          <span className="text-yellow-300">Prettier</span>
        </div>
        {/* Open to Work */}
        <div className="flex items-center gap-1.5 px-2 h-full bg-green-700/40 border-l border-white/10 cursor-default shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shrink-0" />
          <span className="text-green-300 text-[10px] hidden xs:inline">Open to Work</span>
          <span className="text-green-300 text-[10px] xs:hidden">OtW</span>
        </div>
      </div>

      {/* Right — hide verbose items on mobile */}
      <div className="flex items-center h-full min-w-0">
        <span className="px-2 h-full flex items-center hover:bg-white/10 cursor-pointer transition-colors border-l border-white/10 shrink-0 text-[10px]">
          {info[activeTab].lang}
        </span>
        <span className="hidden md:flex px-2 h-full items-center hover:bg-white/10 cursor-pointer transition-colors border-l border-white/10 shrink-0">
          UTF-8
        </span>
        <span className="hidden md:flex px-2 h-full items-center hover:bg-white/10 cursor-pointer transition-colors border-l border-white/10 shrink-0">
          LF
        </span>
        <span className="hidden lg:flex px-2 h-full items-center hover:bg-white/10 cursor-pointer transition-colors border-l border-white/10 shrink-0">
          Spaces: 2
        </span>
        {time && (
          <span className="hidden sm:flex px-2 h-full items-center bg-white/5 border-l border-white/10 tabular-nums shrink-0">
            🕐 {time}
          </span>
        )}
        <button
          onClick={onOpenCmd}
          className="px-2 h-full flex items-center hover:bg-white/10 cursor-pointer transition-colors border-l border-white/10 shrink-0"
          title="Open Command Palette (⌘K)"
        >
          <Bell size={11} />
        </button>
        {/* Theme toggle */}
        <button
          onClick={() => mounted && setTheme(theme === "dark" ? "light" : "dark")}
          className="px-2 h-full flex items-center gap-1 hover:bg-white/10 cursor-pointer transition-colors border-l border-white/10 shrink-0"
          title="Toggle Light/Dark theme"
        >
          {mounted && (theme === "dark" ? <Sun size={11} /> : <Moon size={11} />)}
          <span className="hidden sm:inline text-[10px]">{mounted ? (theme === "dark" ? "Light" : "Dark") : ""}</span>
        </button>
      </div>
    </div>
  );
}
