import type { Config } from "tailwindcss";

/**
 * Design tokens.
 *
 * Direction: "engineering title block". The visual language is borrowed from
 * technical drawings — hairline rules, drafting corner ticks, mono data labels,
 * a fine background grid — rather than from generic SaaS marketing pages.
 * One accent only (hi-vis amber, from industrial field signage), used with restraint.
 *
 * Colour is driven by CSS variables declared in app/globals.css so that light
 * and dark mode share a single set of semantic names.
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "rgb(var(--canvas) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        raised: "rgb(var(--raised) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        "line-strong": "rgb(var(--line-strong) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        "ink-soft": "rgb(var(--ink-soft) / <alpha-value>)",
        "ink-muted": "rgb(var(--ink-muted) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-deep": "rgb(var(--accent-deep) / <alpha-value>)",
        "on-accent": "rgb(var(--on-accent) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        prose: ["var(--font-prose)", "ui-serif", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        // Utility scale for labels and data, tuned tighter than Tailwind defaults.
        micro: ["0.6875rem", { lineHeight: "1rem", letterSpacing: "0.08em" }],
        spec: ["0.8125rem", { lineHeight: "1.25rem", letterSpacing: "0.01em" }],
        "display-sm": ["clamp(1.75rem, 1.2rem + 1.8vw, 2.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(2.25rem, 1.4rem + 3vw, 3.75rem)", { lineHeight: "1.04", letterSpacing: "-0.025em" }],
        "display-lg": ["clamp(2.75rem, 1.5rem + 4.6vw, 5.25rem)", { lineHeight: "0.98", letterSpacing: "-0.03em" }],
      },
      maxWidth: {
        shell: "80rem",
        reading: "44rem",
      },
      spacing: {
        gutter: "clamp(1.25rem, 4vw, 3.5rem)",
      },
      borderRadius: {
        // Deliberately restrained: technical drawings do not have soft corners.
        card: "4px",
      },
      backgroundImage: {
        "grid-fine":
          "linear-gradient(to right, rgb(var(--line) / 0.55) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--line) / 0.55) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-fine": "64px 64px",
      },
      transitionTimingFunction: {
        precise: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "rise-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "rule-draw": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
      animation: {
        "rise-in": "rise-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        "rule-draw": "rule-draw 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
