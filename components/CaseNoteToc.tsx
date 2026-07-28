"use client";

import { useEffect, useState } from "react";

export type TocEntry = { id: string; label: string; group: string; number: string };

/**
 * Table of contents for a case note.
 *
 * Eighteen flat links stop being navigation and become a wall, so entries are
 * grouped and only the group containing the reader's current position is
 * expanded. The grouping does a second job: it shows the shape of the argument
 * — problem, then analysis, then design, then how sensitive the design is to
 * its own inputs — before the reader has read any of it.
 *
 * Scroll tracking uses IntersectionObserver rather than scroll offsets: it does
 * not fire on every frame, and it survives images and diagrams changing height
 * after load.
 */
export function CaseNoteToc({ entries }: { entries: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string | null>(entries[0]?.id ?? null);
  const [openOnMobile, setOpenOnMobile] = useState(false);
  /**
   * A group the reader opened by hand. Scroll position decides which group is
   * open by default, but an explicit click has to win — otherwise the panel
   * collapses again the moment the observer fires, which is what made the
   * group headers feel broken.
   */
  const [pinnedGroup, setPinnedGroup] = useState<string | null>(null);

  useEffect(() => {
    const nodes = entries
      .map((e) => document.getElementById(e.id))
      .filter((n): n is HTMLElement => Boolean(n));
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (records) => {
        const visible = records
          .filter((r) => r.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          const id = visible[0].target.id;
          setActiveId(id);
          const group = entries.find((e) => e.id === id)?.group;
          setPinnedGroup((pinned) => (pinned && pinned === group ? null : pinned));
        }
      },
      // Bias the band towards the upper third of the viewport, so the heading
      // the reader is actually looking at wins over a long section below it.
      { rootMargin: "-12% 0px -70% 0px", threshold: 0 },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [entries]);

  const groups: { name: string; items: TocEntry[] }[] = [];
  for (const e of entries) {
    const last = groups[groups.length - 1];
    if (last && last.name === e.group) last.items.push(e);
    else groups.push({ name: e.group, items: [e] });
  }

  const scrolledGroup = entries.find((e) => e.id === activeId)?.group ?? groups[0]?.name;
  const activeGroup = pinnedGroup ?? scrolledGroup;

  return (
    <>
      {/* Mobile: a disclosure above the content, closed by default. */}
      <div className="mb-10 lg:hidden">
        <button
          type="button"
          onClick={() => setOpenOnMobile((v) => !v)}
          aria-expanded={openOnMobile}
          className="flex w-full items-center justify-between border-y border-line py-3 text-left"
        >
          <span className="eyebrow">Contents · {entries.length} sections</span>
          <span aria-hidden className="font-mono text-micro text-ink-muted">
            {openOnMobile ? "—" : "+"}
          </span>
        </button>
        {openOnMobile && (
          <ol className="mt-4 space-y-2">
            {entries.map((e) => (
              <li key={e.id}>
                <a
                  href={`#${e.id}`}
                  onClick={() => setOpenOnMobile(false)}
                  className="flex gap-3 text-[0.875rem] text-ink-soft hover:text-ink"
                >
                  <span className="font-mono text-micro text-ink-muted">{e.number}</span>
                  {e.label}
                </a>
              </li>
            ))}
          </ol>
        )}
      </div>

      {/* Desktop: sticky rail, current group expanded. */}
      <nav aria-label="Contents" className="sticky top-24 hidden max-h-[calc(100vh-8rem)] overflow-y-auto lg:block">
        <p className="eyebrow mb-4">Contents</p>
        <ol className="space-y-4">
          {groups.map((g) => {
            const open = g.name === activeGroup;
            return (
              <li key={g.name}>
                <button
                  type="button"
                  onClick={() => setPinnedGroup(open ? null : g.name)}
                  aria-expanded={open}
                  className={
                    open
                      ? "w-full text-left font-mono text-micro uppercase tracking-[0.1em] text-accent-deep"
                      : "w-full text-left font-mono text-micro uppercase tracking-[0.1em] text-ink-muted transition-colors hover:text-ink-soft"
                  }
                >
                  {g.name}
                </button>

                {open ? (
                  <ol className="mt-2 space-y-1.5 border-l border-line pl-3">
                    {g.items.map((e) => {
                      const current = e.id === activeId;
                      return (
                        <li key={e.id}>
                          <a
                            href={`#${e.id}`}
                            aria-current={current ? "true" : undefined}
                            className={
                              current
                                ? "block text-[0.8125rem] leading-snug text-ink"
                                : "block text-[0.8125rem] leading-snug text-ink-muted hover:text-ink-soft"
                            }
                          >
                            {current && (
                              <span aria-hidden className="mr-1.5 text-accent">
                                ·
                              </span>
                            )}
                            {e.label}
                          </a>
                        </li>
                      );
                    })}
                  </ol>
                ) : null}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
