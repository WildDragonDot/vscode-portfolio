"use client";
import { useTheme } from "next-themes";
import { X, Sun, Moon, Monitor } from "lucide-react";

export default function SettingsPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { theme, setTheme } = useTheme();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh]" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-[480px] mx-4 bg-vs-bg2 border border-vs-border2 rounded-lg shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-vs-border bg-vs-bg3">
          <div className="flex items-center gap-2 text-[12px] font-mono">
            <span className="text-vs-accent">⚙</span>
            <span className="text-vs-text font-semibold">Settings</span>
            <span className="text-vs-muted">— Preferences</span>
          </div>
          <button onClick={onClose} className="text-vs-muted hover:text-vs-text transition-colors">
            <X size={14} />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 font-mono space-y-5">

          {/* Color Theme */}
          <div>
            <p className="text-[10px] uppercase tracking-widest text-vs-muted mb-3 font-semibold">
              // Color Theme
            </p>
            <div className="grid grid-cols-3 gap-2">
              {/* Dark */}
              <button
                onClick={() => setTheme("dark")}
                className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all ${
                  theme === "dark"
                    ? "border-vs-accent bg-vs-accent/10"
                    : "border-vs-border hover:border-vs-border2 bg-vs-bg3"
                }`}
              >
                {/* Preview */}
                <div className="w-full h-10 rounded bg-[#1e1e1e] border border-[#3c3c3c] overflow-hidden flex flex-col gap-0.5 p-1">
                  <div className="flex gap-0.5">
                    <div className="h-1 w-6 rounded-sm bg-[#569cd6]" />
                    <div className="h-1 w-4 rounded-sm bg-[#ce9178]" />
                  </div>
                  <div className="flex gap-0.5">
                    <div className="h-1 w-3 rounded-sm bg-[#6a9955]" />
                    <div className="h-1 w-8 rounded-sm bg-[#d4d4d4]/30" />
                  </div>
                  <div className="flex gap-0.5">
                    <div className="h-1 w-5 rounded-sm bg-[#4ec9b0]" />
                    <div className="h-1 w-3 rounded-sm bg-[#dcdcaa]" />
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <Moon size={11} className={theme === "dark" ? "text-vs-accent" : "text-vs-muted"} />
                  <span className={`text-[11px] ${theme === "dark" ? "text-vs-accent" : "text-vs-muted"}`}>Dark+</span>
                </div>
                {theme === "dark" && (
                  <span className="text-[9px] text-vs-accent">● Active</span>
                )}
              </button>

              {/* Light */}
              <button
                onClick={() => setTheme("light")}
                className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all ${
                  theme === "light"
                    ? "border-vs-accent bg-vs-accent/10"
                    : "border-vs-border hover:border-vs-border2 bg-vs-bg3"
                }`}
              >
                {/* Preview */}
                <div className="w-full h-10 rounded bg-[#ffffff] border border-[#d4d4d4] overflow-hidden flex flex-col gap-0.5 p-1">
                  <div className="flex gap-0.5">
                    <div className="h-1 w-6 rounded-sm bg-[#0000ff]" />
                    <div className="h-1 w-4 rounded-sm bg-[#a31515]" />
                  </div>
                  <div className="flex gap-0.5">
                    <div className="h-1 w-3 rounded-sm bg-[#008000]" />
                    <div className="h-1 w-8 rounded-sm bg-[#1e1e1e]/30" />
                  </div>
                  <div className="flex gap-0.5">
                    <div className="h-1 w-5 rounded-sm bg-[#267f99]" />
                    <div className="h-1 w-3 rounded-sm bg-[#795e26]" />
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sun size={11} className={theme === "light" ? "text-vs-accent" : "text-vs-muted"} />
                  <span className={`text-[11px] ${theme === "light" ? "text-vs-accent" : "text-vs-muted"}`}>Light+</span>
                </div>
                {theme === "light" && (
                  <span className="text-[9px] text-vs-accent">● Active</span>
                )}
              </button>

              {/* System */}
              <button
                onClick={() => setTheme("system")}
                className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all ${
                  theme === "system"
                    ? "border-vs-accent bg-vs-accent/10"
                    : "border-vs-border hover:border-vs-border2 bg-vs-bg3"
                }`}
              >
                {/* Preview */}
                <div className="w-full h-10 rounded border border-vs-border overflow-hidden flex">
                  <div className="flex-1 bg-[#1e1e1e] flex flex-col gap-0.5 p-1">
                    <div className="h-1 w-4 rounded-sm bg-[#569cd6]" />
                    <div className="h-1 w-3 rounded-sm bg-[#6a9955]" />
                    <div className="h-1 w-5 rounded-sm bg-[#4ec9b0]" />
                  </div>
                  <div className="flex-1 bg-[#ffffff] flex flex-col gap-0.5 p-1">
                    <div className="h-1 w-4 rounded-sm bg-[#0000ff]" />
                    <div className="h-1 w-3 rounded-sm bg-[#008000]" />
                    <div className="h-1 w-5 rounded-sm bg-[#267f99]" />
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <Monitor size={11} className={theme === "system" ? "text-vs-accent" : "text-vs-muted"} />
                  <span className={`text-[11px] ${theme === "system" ? "text-vs-accent" : "text-vs-muted"}`}>System</span>
                </div>
                {theme === "system" && (
                  <span className="text-[9px] text-vs-accent">● Active</span>
                )}
              </button>
            </div>
          </div>

          {/* Info row */}
          <div className="bg-vs-bg3 border border-vs-border rounded p-3 text-[11px] text-vs-muted flex items-center gap-2">
            <span className="text-vs-comment">{"// "}</span>
            <span>Current theme: </span>
            <span className="text-vs-cyan font-semibold capitalize">{theme}</span>
            <span className="ml-auto text-[10px] opacity-60">workbench.colorTheme</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-vs-border bg-vs-bg3 text-[10px] text-vs-muted">
          <span>Preferences: Color Theme</span>
          <kbd className="bg-vs-bg px-1.5 py-0.5 rounded border border-vs-border text-[9px]">Esc</kbd>
        </div>
      </div>
    </div>
  );
}
