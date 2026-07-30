"use client";

import { useState } from "react";
import type { ArchitectureLayer } from "@/content/architecture";
import { generateArchitectureStackSvg } from "@/lib/architectureStackSvg";
import { downloadFile } from "@/lib/downloadFile";

/**
 * Downloads the layer catalogue as an SVG the reader can open in Figma.
 *
 * The file is built in the browser rather than fetched, so there is no route
 * behind this and nothing to keep in sync — the diagram is generated from the
 * same `layers` data the page is already rendering.
 */
export function DownloadSvgButton({ layers }: { layers: ArchitectureLayer[] }) {
  // Drives the brief "Downloaded" label. Without it the click has no visible
  // result — the file lands in a folder the reader may not be looking at, and
  // the button appears not to have worked.
  const [justDownloaded, setJustDownloaded] = useState(false);

  function handleDownload() {
    downloadFile(
      generateArchitectureStackSvg(layers),
      "architecture-layer-stack.svg",
      "image/svg+xml"
    );

    setJustDownloaded(true);
    window.setTimeout(() => setJustDownloaded(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="group inline-flex cursor-pointer items-center gap-2 rounded-card border border-line-strong bg-surface px-5 py-3
                 font-mono text-spec uppercase tracking-wide text-ink transition-colors duration-200
                 hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2
                 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
      aria-label="Download the layer stack as an SVG file"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        aria-hidden="true"
        className="transition-transform duration-200 group-hover:translate-y-0.5"
      >
        <path d="M12 3v12" strokeLinecap="round" />
        <path d="M7 10l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 19h16" strokeLinecap="round" />
      </svg>
      {justDownloaded ? "Downloaded" : "Download SVG"}
    </button>
  );
}
