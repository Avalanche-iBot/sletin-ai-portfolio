"use client";

import { useEffect, useState } from "react";

/**
 * Return-to-top control, narrow screens only.
 *
 * A case note runs to roughly 30,000px on a phone. Without this the only way
 * back to the contents is a long flick, so the control appears once the reader
 * is far enough in to have lost sight of the header, and stays out of the way
 * until then.
 *
 * Hidden from assistive technology: a screen reader already has heading and
 * landmark navigation, so this would be a redundant control rather than a
 * useful one. It also respects reduced-motion, since a smooth scroll across a
 * page this tall is exactly the kind of movement that setting exists for.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 1200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  function toTop() {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  }

  return (
    <button
      type="button"
      onClick={toTop}
      aria-hidden
      tabIndex={-1}
      className="fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center border border-line bg-canvas/90 text-ink-soft shadow-sm backdrop-blur transition-colors hover:border-ink hover:text-ink lg:hidden"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 13V3M8 3L3.5 7.5M8 3l4.5 4.5" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    </button>
  );
}
