import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        vs: {
          bg:         "var(--vs-bg)",
          bg2:        "var(--vs-bg2)",
          bg3:        "var(--vs-bg3)",
          border:     "var(--vs-border)",
          border2:    "var(--vs-border2)",
          text:       "var(--vs-text)",
          muted:      "var(--vs-muted)",
          blue:       "var(--vs-blue)",
          cyan:       "var(--vs-cyan)",
          yellow:     "var(--vs-yellow)",
          orange:     "var(--vs-orange)",
          purple:     "var(--vs-purple)",
          red:        "var(--vs-red)",
          accent:     "var(--vs-accent)",
          accentHov:  "var(--vs-accentHov)",
          selection:  "var(--vs-selection)",
          lineNum:    "var(--vs-lineNum)",
          statusBar:  "var(--vs-statusBar)",
          string:     "var(--vs-string)",
          keyword:    "var(--vs-keyword)",
          func:       "var(--vs-func)",
          num:        "var(--vs-num)",
          comment:    "var(--vs-comment)",
          actbar:     "var(--vs-actbar)",
          sidebar:    "var(--vs-sidebar)",
          tab:        "var(--vs-tab)",
          tabActive:  "var(--vs-tabActive)",
        },
      },
      fontFamily: {
        mono: ["var(--font-fira-code)", "Consolas", "'Courier New'", "monospace"],
      },
      fontSize: {
        "2xs": "0.65rem",
      },
      animation: {
        blink:        "cursorBlink 1s step-end infinite",
        "fade-up":    "fadeUp 0.4s ease-out forwards",
        "slide-left": "slideInLeft 0.35s ease-out forwards",
      },
      keyframes: {
        cursorBlink: {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          from: { opacity: "0", transform: "translateX(-16px)" },
          to:   { opacity: "1", transform: "translateX(0)" },
        },
      },
      boxShadow: {
        card: "0 2px 8px rgba(0,0,0,0.4)",
        glow: "0 0 12px rgba(0,122,204,0.3)",
      },
    },
  },
  plugins: [],
};
export default config;
