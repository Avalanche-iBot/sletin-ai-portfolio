"use client";

import { useEffect, useState } from "react";

/**
 * Return-to-top control with a reading-progress ring.
 *
 * The ring is not decoration for its own sake: it answers "how much of this is
 * left", which on a note that runs to 30,000px on a phone is a real question.
 * Making the same element carry both the answer and the way out is the reason
 * it earns a fixed position at all.
 *
 * The motion is deliberately small — a short rise and fade, no bounce, no
 * spring. This site's visual language is drafting film and instrument panels,
 * and a control that springs would read as borrowed from somewhere else.
 *
 * Hidden from assistive technology: heading and landmark navigation already
 * cover both jobs, so exposing this would add a redundant control rather than
 * a useful one.
 */
export function BackToTop() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    /*
     * Scrollable height is cached rather than measured per event.
     *
     * `scrollHeight` forces a layout, and a case note is long enough that
     * reading it on every scroll event is the one part of this that could
     * actually cost something. A ResizeObserver catches the cases a resize
     * listener misses — a disclosure opening, a font landing, an image
     * settling — so the scroll path only has to read `scrollY`, which is free.
     */
    let scrollable = 0;

    const measureHeight = () => {
      scrollable = document.documentElement.scrollHeight - window.innerHeight;
      update();
    };

    const update = () => {
      const y = window.scrollY;
      setProgress(scrollable > 0 ? Math.min(1, Math.max(0, y / scrollable)) : 0);
      setVisible(y > 800);
    };

    measureHeight();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", measureHeight, { passive: true });

    const observer = new ResizeObserver(measureHeight);
    observer.observe(document.documentElement);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", measureHeight);
      observer.disconnect();
    };
  }, []);

  function toTop() {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  }

  const R = 19;
  const circumference = 2 * Math.PI * R;

  return (
    <button
      type="button"
      onClick={toTop}
      aria-hidden
      tabIndex={-1}
      data-visible={visible ? "true" : "false"}
      className="group fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-full border border-line bg-canvas/85 backdrop-blur transition-[opacity,transform,border-color] duration-300 ease-precise hover:border-accent data-[visible=false]:pointer-events-none data-[visible=false]:translate-y-2 data-[visible=false]:opacity-0 data-[visible=true]:translate-y-0 data-[visible=true]:opacity-100 motion-reduce:transition-none"
    >
      <svg viewBox="0 0 44 44" className="absolute inset-0 h-full w-full -rotate-90">
        <circle cx="22" cy="22" r={R} fill="none" stroke="rgb(var(--line))" strokeWidth="1.5" />
        <circle
          cx="22"
          cy="22"
          r={R}
          fill="none"
          stroke="rgb(var(--accent))"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress)}
        />
      </svg>
      <svg
        width="14"
        height="14"
        viewBox="0 0 16 16"
        fill="none"
        className="relative text-ink-soft transition-transform duration-300 ease-precise group-hover:-translate-y-0.5 group-hover:text-accent-deep motion-reduce:transition-none"
      >
        <path d="M8 12.5V4M8 4L4 8M8 4l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </button>
  );
}
