import { site } from "@/content/site";

/**
 * The shared layout for every generated link preview.
 *
 * Case notes, blog posts and the site card all use it, so a change to the
 * design lands everywhere at once and the three cannot drift apart.
 *
 * None of this is ever seen on the site. It renders outside the document, in a
 * layout engine that understands a deliberately small subset of CSS: flexbox
 * only, no cascade, no custom properties, and every element that contains more
 * than one child needs an explicit `display`.
 */

export const OG_SIZE = { width: 1200, height: 630 };

/*
 * The site's dark palette as literal values.
 *
 * The pages read these from CSS custom properties in `globals.css`, which are
 * not in scope here — there is no stylesheet. Kept in the same order as the
 * source so a change there is easy to mirror.
 */
const CANVAS = "#080b10";
const LINE = "#262e3a";
const INK = "#e9edf3";
const INK_SOFT = "#b0bac7";
const INK_MUTED = "#7c8898";
const ACCENT = "#e9a317";

/** Trims to a word boundary, so a card never breaks off mid-word. */
export function clamp(text: string, max: number) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

export type OgCardProps = {
  /** Mono label above the title — "Case note 02", "Writing", and so on. */
  eyebrow: string;
  title: string;
  summary: string;
  /** Right-hand footer slot. The domain sits opposite it on the left. */
  footerRight: string;
};

export function OgCard({ eyebrow, title, summary, footerRight }: OgCardProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: CANVAS,
        padding: 64,
        // The drafting-title-block frame used across the site: one hairline,
        // no shadow, no rounded corner.
        border: `1px solid ${LINE}`,
        fontFamily: "Inter",
      }}
    >
      {/* Eyebrow — the amber mono label that opens every section on the site */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 44, height: 3, background: ACCENT }} />
        <div
          style={{
            fontFamily: "IBM Plex Mono",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: ACCENT,
          }}
        >
          {eyebrow}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div
          style={{
            fontFamily: "Fraunces",
            // Long titles wrap to three lines and overrun the card, so the
            // size steps down rather than the text being cut.
            fontSize: title.length > 34 ? 68 : 80,
            lineHeight: 1.05,
            color: INK,
            letterSpacing: -1.5,
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: 28, lineHeight: 1.45, color: INK_SOFT }}>{clamp(summary, 180)}</div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          borderTop: `1px solid ${LINE}`,
          paddingTop: 26,
          fontFamily: "IBM Plex Mono",
          fontSize: 22,
          color: INK_MUTED,
        }}
      >
        <div>{site.url.replace("https://", "")}</div>
        <div>{clamp(footerRight, 60)}</div>
      </div>
    </div>
  );
}
