"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useTheme } from "next-themes";
import ActivityBar from "@/components/ActivityBar";
import Sidebar from "@/components/Sidebar";
import Tabs from "@/components/Tabs";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import StatusBar from "@/components/StatusBar";
import SplashScreen from "@/components/SplashScreen";
import CommandPalette from "@/components/CommandPalette";
import Notifications, { Toast } from "@/components/Notifications";
import Testimonials from "@/components/Testimonials";
import Blog from "@/components/Blog";
import MobileNav from "@/components/MobileNav";
import SettingsPanel from "@/components/SettingsPanel";
import TerminalPanel from "@/components/TerminalPanel";
import { Keyboard, X } from "lucide-react";

export type TabId = "home" | "about" | "experience" | "skills" | "projects" | "testimonials" | "blog" | "contact";

const MINIMAP_ROWS: { opacities: number[] }[] = [
  { opacities: [0.3,0.5,0.2,0.4,0.3,0.5] }, { opacities: [0.4,0.2,0.5,0.3] },
  { opacities: [0.2,0.4,0.3,0.5,0.2,0.4,0.3,0.5] }, { opacities: [0.5,0.3,0.4] },
  { opacities: [0.3,0.5,0.4,0.2,0.5,0.3,0.4] }, { opacities: [0.4,0.2,0.5,0.3,0.4] },
  { opacities: [0.2,0.5,0.3,0.4,0.2,0.5,0.3,0.4,0.2] }, { opacities: [0.5,0.3,0.4,0.2] },
  { opacities: [0.3,0.4,0.5,0.2,0.3,0.4] }, { opacities: [0.4,0.2,0.5] },
  { opacities: [0.5,0.3,0.2,0.4,0.5,0.3,0.2] }, { opacities: [0.2,0.4,0.3,0.5,0.2] },
  { opacities: [0.4,0.2,0.5,0.3,0.4,0.2,0.5,0.3] }, { opacities: [0.3,0.5,0.2,0.4] },
  { opacities: [0.5,0.2,0.4,0.3,0.5,0.2] }, { opacities: [0.2,0.4,0.3] },
  { opacities: [0.4,0.3,0.5,0.2,0.4,0.3,0.5,0.2,0.4] }, { opacities: [0.3,0.5,0.2,0.4,0.3] },
  { opacities: [0.2,0.4,0.5,0.3,0.2,0.4,0.5] }, { opacities: [0.5,0.2,0.3,0.4] },
  { opacities: [0.3,0.4,0.2,0.5,0.3,0.4] }, { opacities: [0.4,0.5,0.2,0.3,0.4,0.5,0.2,0.3] },
  { opacities: [0.2,0.5,0.4] }, { opacities: [0.4,0.3,0.5,0.2,0.4] },
  { opacities: [0.5,0.2,0.4,0.3,0.5,0.2,0.4] }, { opacities: [0.3,0.4,0.2,0.5] },
  { opacities: [0.2,0.5,0.3,0.4,0.2,0.5] }, { opacities: [0.4,0.2,0.5,0.3,0.4,0.2,0.5,0.3,0.4] },
  { opacities: [0.5,0.3,0.2] }, { opacities: [0.2,0.4,0.5,0.3,0.2] },
  { opacities: [0.4,0.3,0.2,0.5,0.4,0.3,0.2] }, { opacities: [0.5,0.4,0.3,0.2] },
  { opacities: [0.2,0.3,0.5,0.4,0.2,0.3] }, { opacities: [0.3,0.5,0.4,0.2,0.3,0.5,0.4,0.2] },
  { opacities: [0.4,0.2,0.3] }, { opacities: [0.5,0.3,0.4,0.2,0.5] },
  { opacities: [0.2,0.4,0.3,0.5,0.2,0.4,0.3] }, { opacities: [0.3,0.2,0.5,0.4] },
  { opacities: [0.4,0.5,0.2,0.3,0.4,0.5] }, { opacities: [0.2,0.3,0.4,0.5,0.2,0.3,0.4,0.5,0.2] },
  { opacities: [0.5,0.4,0.3] }, { opacities: [0.3,0.2,0.4,0.5,0.3] },
  { opacities: [0.4,0.5,0.3,0.2,0.4,0.5,0.3] }, { opacities: [0.2,0.3,0.4,0.5] },
  { opacities: [0.5,0.4,0.3,0.2,0.5,0.4] }, { opacities: [0.3,0.2,0.4,0.5,0.3,0.2,0.4,0.5] },
  { opacities: [0.4,0.5,0.2] }, { opacities: [0.2,0.3,0.5,0.4,0.2] },
  { opacities: [0.5,0.4,0.2,0.3,0.5,0.4,0.2] }, { opacities: [0.3,0.5,0.4,0.2] },
  { opacities: [0.4,0.2,0.3,0.5,0.4,0.2] }, { opacities: [0.2,0.4,0.5,0.3,0.2,0.4,0.5,0.3] },
  { opacities: [0.5,0.2,0.4] }, { opacities: [0.3,0.4,0.2,0.5,0.3] },
  { opacities: [0.4,0.2,0.3,0.5,0.4,0.2,0.3] }, { opacities: [0.5,0.3,0.2,0.4] },
  { opacities: [0.2,0.5,0.4,0.3,0.2,0.5] }, { opacities: [0.3,0.4,0.2,0.5,0.3,0.4,0.2,0.5,0.3] },
  { opacities: [0.4,0.3,0.5] }, { opacities: [0.5,0.2,0.3,0.4,0.5] },
  { opacities: [0.2,0.3,0.4,0.5,0.2,0.3,0.4] },
];

function Minimap() {
  return (
    <div className="w-[52px] bg-vs-bg2 border-l border-vs-border shrink-0 overflow-hidden opacity-60 hidden lg:flex flex-col gap-[2px] pt-2 px-1" data-hide-print>
      {MINIMAP_ROWS.map((row, i) => (
        <div key={i} className="flex gap-[2px]">
          {row.opacities.map((op, j) => (
            <div key={j} className="minimap-dot" style={{ opacity: op }} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab]         = useState<TabId>("home");
  const [openTabs, setOpenTabs]           = useState<TabId[]>(["home"]);
  const [sidebarOpen, setSidebarOpen]     = useState(false);
  const [terminalOpen, setTerminalOpen]   = useState(false);
  const [loaded, setLoaded]               = useState(false);
  const [cmdOpen, setCmdOpen]             = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [settingsOpen, setSettingsOpen]   = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [toasts, setToasts]               = useState<Toast[]>([]);
  const toastIdRef                        = useRef(0);

  const { setTheme } = useTheme();

  // Open sidebar by default on desktop
  useEffect(() => {
    if (window.innerWidth >= 768) setSidebarOpen(true);
  }, []);

  const addToast = useCallback((title: string, message: string, type: Toast["type"] = "success") => {
    const id = String(++toastIdRef.current);
    setToasts((p) => [...p, { id, type, title, message }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((p) => p.filter((t) => t.id !== id));
  }, []);

  // Splash Screen skip handling
  useEffect(() => {
    if (loaded) return;
    const skip = () => setLoaded(true);
    window.addEventListener("keydown", skip);
    window.addEventListener("touchstart", skip, { passive: true });
    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("touchstart", skip);
    };
  }, [loaded]);

  const handleSplashDone = useCallback(() => {
    setLoaded(true);
    setTimeout(() => addToast("Workspace Ready", "Welcome to Chandan Vishwakarma's portfolio.", "success"), 500);
  }, [addToast]);

  const openTab = (tab: TabId) => {
    if (!openTabs.includes(tab)) setOpenTabs((p) => [...p, tab]);
    setActiveTab(tab);
    setMobileNavOpen(false);
  };

  const closeTab = (tab: TabId, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = openTabs.filter((t) => t !== tab);
    if (next.length === 0) {
      setOpenTabs(["home"]);
      setActiveTab("home");
    } else {
      setOpenTabs(next);
      if (activeTab === tab) setActiveTab(next[next.length - 1]);
    }
  };

  // Keyboard Shortcuts handler
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isCmd = e.metaKey || e.ctrlKey;
      if (isCmd && e.key === "k") {
        e.preventDefault();
        setCmdOpen((p) => !p);
      } else if (isCmd && e.key === "b") {
        e.preventDefault();
        setSidebarOpen((p) => !p);
      } else if ((isCmd && e.key === "j") || (isCmd && e.key === "`")) {
        e.preventDefault();
        setTerminalOpen((p) => !p);
      } else if (isCmd && ["1","2","3","4","5","6","7","8"].includes(e.key)) {
        e.preventDefault();
        const tabOrder: TabId[] = ["home","about","experience","skills","projects","testimonials","blog","contact"];
        const idx = parseInt(e.key) - 1;
        if (tabOrder[idx]) openTab(tabOrder[idx]);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openTabs]);

  const tabComponents: Record<TabId, React.ReactNode> = {
    home:         <Hero />,
    about:        <About />,
    experience:   <Experience />,
    skills:       <Skills />,
    projects:     <Projects />,
    testimonials: <Testimonials />,
    blog:         <Blog />,
    contact:      <Contact onToast={(msg) => addToast("Message Sent", msg, "success")} />,
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-vs-bg overflow-hidden select-none">
      {!loaded && <SplashScreen onDone={handleSplashDone} />}

      <CommandPalette
        open={cmdOpen}
        onClose={() => setCmdOpen(false)}
        onNavigate={(tab) => openTab(tab as TabId)}
      />
      <Notifications toasts={toasts} onRemove={removeToast} />
      <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} />

      {/* Shortcuts Helper Modal */}
      {shortcutsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShortcutsOpen(false)}>
          <div className="bg-vs-bg2 border border-vs-border2 rounded-lg p-5 max-w-md w-full shadow-2xl font-mono text-[12px]" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-3 border-b border-vs-border mb-4">
              <div className="flex items-center gap-2">
                <Keyboard size={15} className="text-vs-accent" />
                <span className="text-vs-text font-bold">Keyboard Shortcuts</span>
              </div>
              <button onClick={() => setShortcutsOpen(false)} className="text-vs-muted hover:text-vs-text">
                <X size={14} />
              </button>
            </div>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between"><span className="text-vs-muted">Command Palette</span><kbd className="bg-vs-bg3 px-2 py-0.5 rounded border border-vs-border text-vs-cyan">⌘K / Ctrl+K</kbd></div>
              <div className="flex items-center justify-between"><span className="text-vs-muted">Toggle Terminal Panel</span><kbd className="bg-vs-bg3 px-2 py-0.5 rounded border border-vs-border text-vs-cyan">⌘J / Ctrl+`</kbd></div>
              <div className="flex items-center justify-between"><span className="text-vs-muted">Toggle Sidebar Explorer</span><kbd className="bg-vs-bg3 px-2 py-0.5 rounded border border-vs-border text-vs-cyan">⌘B / Ctrl+B</kbd></div>
              <div className="flex items-center justify-between"><span className="text-vs-muted">Quick Tab Switch</span><kbd className="bg-vs-bg3 px-2 py-0.5 rounded border border-vs-border text-vs-cyan">⌘1 – ⌘8</kbd></div>
              <div className="flex items-center justify-between"><span className="text-vs-muted">Print / PDF Export</span><kbd className="bg-vs-bg3 px-2 py-0.5 rounded border border-vs-border text-vs-cyan">⌘P / Ctrl+P</kbd></div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile nav drawer */}
      <MobileNav
        open={mobileNavOpen}
        activeTab={activeTab}
        onSelect={openTab}
        onClose={() => setMobileNavOpen(false)}
      />

      {/* ── Title Bar ── */}
      <div className="flex items-center justify-between bg-vs-bg3 px-3 py-[5px] text-[11px] text-vs-muted border-b border-vs-border shrink-0" data-hide-print>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>

        <button
          onClick={() => setCmdOpen(true)}
          className="flex items-center gap-2 px-3 py-1 bg-vs-bg2 hover:bg-vs-border rounded text-vs-muted hover:text-vs-text transition-colors text-[11px] font-mono border border-vs-border/50"
        >
          <span>🔍</span>
          <span className="hidden sm:inline">chandan-portfolio — {activeTab}.tsx</span>
          <span className="ml-1 opacity-50 text-[10px] bg-vs-bg3 px-1 rounded">⌘K</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShortcutsOpen(true)}
            className="text-vs-muted hover:text-vs-text text-[11px] hidden sm:flex items-center gap-1 transition-colors"
            title="View Keyboard Shortcuts"
          >
            <Keyboard size={13} />
          </button>
        </div>
      </div>

      {/* ── Menu Bar — hidden on mobile ── */}
      <div className="hidden md:flex items-center gap-0.5 px-2 py-0.5 bg-vs-bg2 text-[11px] text-vs-muted border-b border-vs-border shrink-0" data-hide-print>
        <span onClick={() => openTab("home")} className="px-2 py-0.5 rounded hover:bg-vs-border/40 hover:text-vs-text cursor-pointer transition-colors">File</span>
        <span onClick={() => setCmdOpen(true)} className="px-2 py-0.5 rounded hover:bg-vs-border/40 hover:text-vs-text cursor-pointer transition-colors">Edit</span>
        <span onClick={() => setSidebarOpen((p) => !p)} className="px-2 py-0.5 rounded hover:bg-vs-border/40 hover:text-vs-text cursor-pointer transition-colors">View</span>
        <span onClick={() => setCmdOpen(true)} className="px-2 py-0.5 rounded hover:bg-vs-border/40 hover:text-vs-text cursor-pointer transition-colors">Go</span>
        <span onClick={() => openTab("projects")} className="px-2 py-0.5 rounded hover:bg-vs-border/40 hover:text-vs-text cursor-pointer transition-colors">Run</span>
        <span onClick={() => setTerminalOpen((p) => !p)} className="px-2 py-0.5 rounded hover:bg-vs-border/40 hover:text-vs-text cursor-pointer transition-colors">Terminal</span>
        <span onClick={() => setShortcutsOpen(true)} className="px-2 py-0.5 rounded hover:bg-vs-border/40 hover:text-vs-text cursor-pointer transition-colors">Help</span>
        <span className="ml-auto text-[10px] opacity-60 pr-2">⌘K palette · ⌘J terminal · ⌘B sidebar</span>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-1 overflow-hidden">
        {/* ActivityBar — hidden on mobile */}
        <div className="hidden md:flex" data-hide-print>
          <ActivityBar
            activeTab={activeTab}
            onSelect={openTab}
            sidebarOpen={sidebarOpen}
            onToggleSidebar={() => setSidebarOpen((p) => !p)}
            onOpenCmd={() => setCmdOpen(true)}
            onOpenSettings={() => setSettingsOpen(true)}
            onToggleTerminal={() => setTerminalOpen((p) => !p)}
            terminalOpen={terminalOpen}
          />
        </div>

        {/* Sidebar — hidden on mobile */}
        {sidebarOpen && (
          <div className="hidden md:flex" data-hide-print>
            <Sidebar activeTab={activeTab} onSelect={openTab} />
          </div>
        )}

        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Tabs — scrollable on mobile */}
          <div data-hide-print>
            <Tabs openTabs={openTabs} activeTab={activeTab} onSelect={setActiveTab} onClose={closeTab} />
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Allow text selection in content area */}
            <div className="flex-1 overflow-y-auto select-text" key={activeTab}>
              <div className="fade-up print-content">
                {tabComponents[activeTab]}
              </div>
            </div>
            <Minimap />
          </div>

          {/* Integrated Terminal Bottom Panel */}
          <TerminalPanel
            open={terminalOpen}
            onClose={() => setTerminalOpen(false)}
            onNavigate={openTab}
            onThemeChange={(t) => setTheme(t)}
          />
        </div>
      </div>

      {/* StatusBar */}
      <div data-hide-print>
        <StatusBar
          activeTab={activeTab}
          onOpenCmd={() => setCmdOpen(true)}
          onToggleTerminal={() => setTerminalOpen((p) => !p)}
          terminalOpen={terminalOpen}
        />
      </div>

      {/* ── Mobile bottom nav ── */}
      <div className="md:hidden flex items-center justify-around bg-vs-bg2 border-t border-vs-border shrink-0 py-1" data-hide-print>
        <button
          onClick={() => setMobileNavOpen(true)}
          className="flex flex-col items-center gap-0.5 px-3 py-1 text-vs-muted hover:text-vs-text transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
          <span className="text-[9px]">Menu</span>
        </button>

        {(["home","about","experience","projects","contact"] as TabId[]).map((tab) => (
          <button
            key={tab}
            onClick={() => openTab(tab)}
            className={`flex flex-col items-center gap-0.5 px-2 py-1 transition-colors ${activeTab === tab ? "text-vs-accent font-semibold" : "text-vs-muted hover:text-vs-text"}`}
          >
            <span className="text-[14px]">
              {tab === "home" ? "🏠" : tab === "about" ? "👤" : tab === "experience" ? "💼" : tab === "projects" ? "📁" : "✉"}
            </span>
            <span className="text-[9px] capitalize">{tab}</span>
          </button>
        ))}

        <button
          onClick={() => setTerminalOpen((p) => !p)}
          className={`flex flex-col items-center gap-0.5 px-3 py-1 transition-colors ${
            terminalOpen ? "text-vs-accent font-semibold" : "text-vs-muted hover:text-vs-text"
          }`}
        >
          <span className="text-[14px]">💻</span>
          <span className="text-[9px]">Terminal</span>
        </button>
      </div>
    </div>
  );
}
