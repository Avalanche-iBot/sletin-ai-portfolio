import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BackToTop } from "@/components/BackToTop";
import { site, siteUrl } from "@/content/site";

// Display face: Fraunces — a serif with real editorial weight, used for
// headlines only. Body copy and UI both stay on Inter / mono so the display
// face reads as a deliberate accent rather than the whole page's voice.
const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const prose = Inter({
  subsets: ["latin"],
  variable: "--font-prose",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

/**
 * Default metadata for every page, merged with whatever a page exports itself.
 *
 * `metadataBase` lets pages give relative URLs for images and canonical links
 * and have Next.js expand them to absolute ones, which social-media previews
 * require.
 *
 * The `template` is the useful part of `title`: a page exporting the title
 * "About" ends up as "About — Aleksandr Sletin", so no page has to repeat the
 * site name. `default` covers the homepage, which sets no title of its own.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.brandShort}`,
  },
  description: site.tagline,
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
    url: siteUrl,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
  },
};

/**
 * The shell every page is rendered inside.
 *
 * Next.js requires this file to emit the `<html>` and `<body>` elements — no
 * page does so itself, and `children` is whichever page matched the URL.
 * Because the header and footer live here rather than in each page, they are
 * not re-mounted when navigating, so the sticky header never flickers.
 *
 * The three font loaders above each expose a CSS custom property. Attaching
 * their `.variable` class names to `<html>` puts those properties in scope for
 * the whole document, which is how `font-display`, `font-prose` and `font-mono`
 * resolve in Tailwind. `next/font` self-hosts the files at build time, so
 * there is no request to Google's servers when someone opens the page.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${prose.variable} ${mono.variable}`}>
      <body>
        {/* Skip link: invisible until focused, then the first thing a keyboard
            user reaches. It jumps past the navigation to #main below, which
            otherwise has to be tabbed through on every single page. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-spec focus:text-on-accent"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <BackToTop />
      </body>
    </html>
  );
}
