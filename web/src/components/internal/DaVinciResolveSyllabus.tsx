"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  DAVINCI_PAGES,
  NAV_ITEMS,
  type PageId,
  type SyllabusPageBase,
} from "./davinciResolveSyllabusData";
import styles from "./DaVinciResolveSyllabus.module.css";

const TODO_PREFIX = "resolve19-todo-";

function isShortcutPage(
  p: (typeof DAVINCI_PAGES)[PageId],
): p is import("./davinciResolveSyllabusData").ShortcutPage {
  return "isShortcutPage" in p && p.isShortcutPage === true;
}

function isResourcePage(
  p: (typeof DAVINCI_PAGES)[PageId],
): p is import("./davinciResolveSyllabusData").ResourcePage {
  return "isResourcePage" in p && p.isResourcePage === true;
}

function isBasePage(
  p: (typeof DAVINCI_PAGES)[PageId],
): p is SyllabusPageBase {
  return !isShortcutPage(p) && !isResourcePage(p);
}

export function DaVinciResolveSyllabus() {
  const [active, setActive] = useState<PageId>("overview");
  const [checks, setChecks] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const next: Record<string, boolean> = {};
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (!k?.startsWith(TODO_PREFIX)) continue;
        const id = k.slice(TODO_PREFIX.length);
        next[id] = localStorage.getItem(k) === "true";
      }
    } catch {
      /* ignore */
    }
    setChecks(next);
  }, []);

  const setTodo = useCallback((id: string, checked: boolean) => {
    try {
      localStorage.setItem(TODO_PREFIX + id, String(checked));
    } catch {
      /* ignore */
    }
    setChecks((prev) => ({ ...prev, [id]: checked }));
  }, []);

  const page = DAVINCI_PAGES[active];

  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [active]);

  return (
    <div
      className={`${styles.root} flex min-h-[calc(100dvh-6.5rem)] flex-col overflow-hidden rounded-xl border border-black/10 bg-[#0a0a0b] text-[#e5e5e5] shadow-2xl md:flex-row md:rounded-lg`}
      style={
        {
          fontFamily: "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
          perspective: "1000px",
          backgroundImage:
            "radial-gradient(circle at 50% 0%, #1a1a2e 0%, #0a0a0b 55%, #0a0a0b 100%)",
        } as CSSProperties
      }
    >
      <aside className="flex w-full shrink-0 flex-col border-b border-black/5 bg-[#0d0d0f]/80 shadow-2xl backdrop-blur-xl md:w-72 md:border-r md:border-b-0">
        <div className="border-b border-black/5 p-6 sm:p-8">
          <div className={`flex items-center gap-3 ${styles.floatAnim}`}>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-600 to-purple-600 shadow-lg">
              <span className="text-xs text-zinc-900" aria-hidden>
                ▶
              </span>
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter text-zinc-900">RESOLVE MASTER</h1>
              <div className="mt-1 h-1 w-full rounded-full bg-blue-500 opacity-50" />
            </div>
          </div>
        </div>

        <nav className="flex max-h-[40vh] flex-1 flex-col gap-1 overflow-y-auto py-4 md:max-h-none">
          <p className="mx-8 mt-2 px-0 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 opacity-50">
            The Pages
          </p>
          {NAV_ITEMS.slice(0, 8).map((item) => (
            <button
              key={item.id}
              type="button"
              data-page={item.id}
              onClick={() => setActive(item.id)}
              className={`mx-3 my-0.5 flex w-[calc(100%-1.5rem)] items-center gap-3 rounded-lg px-5 py-3 text-left text-sm transition-all ${
                active === item.id
                  ? "bg-gradient-to-br from-blue-600 to-blue-800 text-zinc-900 shadow-[0_4px_15px_rgba(0,123,255,0.35)]"
                  : "text-zinc-600 hover:translate-x-1 hover:bg-white/[0.05]"
              }`}
            >
              <span className="w-5 shrink-0 text-center opacity-70" aria-hidden>
                {navGlyph(item.id)}
              </span>
              {item.label}
            </button>
          ))}
          <p className="mx-8 mt-4 px-0 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 opacity-50">
            Reference
          </p>
          {NAV_ITEMS.slice(8).map((item) => (
            <button
              key={item.id}
              type="button"
              data-page={item.id}
              onClick={() => setActive(item.id)}
              className={`mx-3 my-0.5 flex w-[calc(100%-1.5rem)] items-center gap-3 rounded-lg px-5 py-3 text-left text-sm transition-all ${
                active === item.id
                  ? "bg-gradient-to-br from-blue-600 to-blue-800 text-zinc-900 shadow-[0_4px_15px_rgba(0,123,255,0.35)]"
                  : "text-zinc-600 hover:translate-x-1 hover:bg-white/[0.05]"
              }`}
            >
              <span className="w-5 shrink-0 text-center opacity-70" aria-hidden>
                {navGlyph(item.id)}
              </span>
              {item.label}
            </button>
          ))}
          <div className="mt-auto border-t border-black/5 p-4">
            <Link
              href="/internal"
              className="block rounded-md border border-black/10 px-3 py-2 text-center text-xs text-zinc-600 transition-colors hover:border-black/20 hover:text-black"
            >
              ← Team resources
            </Link>
          </div>
        </nav>
      </aside>

      <main
        ref={mainRef}
        className={`${styles.scrollMain} relative max-h-[60vh] flex-1 overflow-y-auto md:max-h-none`}
      >
        <div
          className="pointer-events-none absolute top-[-10%] left-[20%] -z-10 h-[40%] w-[40%] rounded-full bg-blue-600/10 blur-[120px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute right-[10%] bottom-[10%] -z-10 h-[30%] w-[30%] rounded-full bg-purple-600/10 blur-[120px]"
          aria-hidden
        />

        <div className="mx-auto max-w-5xl px-6 py-12 sm:px-10 sm:py-16">
          <header className="mb-12 sm:mb-16">
            <h2 className="mb-4 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-5xl">
              {page.title}
            </h2>
            {"description" in page && page.description ? (
              <p className="max-w-3xl text-base font-light leading-relaxed text-gray-400 sm:text-xl">
                {page.description}
              </p>
            ) : null}
          </header>

          {isShortcutPage(page) ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {page.shortcuts.map((category) => (
                <div
                  key={category.cat}
                  className="rounded-2xl border border-black/[0.08] bg-white/[0.03] p-8 shadow-[0_15px_35px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05)] backdrop-blur-xl transition-[transform,box-shadow] duration-300 [transform:translateZ(0)] hover:-translate-y-1 hover:shadow-[0_25px_50px_rgba(0,0,0,0.55),0_0_15px_rgba(0,123,255,0.25)]"
                >
                  <h3 className="mb-6 text-xs font-black uppercase tracking-[0.3em] text-blue-400">
                    {category.cat}
                  </h3>
                  <div className="space-y-4">
                    {category.keys.map((item) => (
                      <div
                        key={item.k + item.d}
                        className="group flex items-center justify-between gap-3"
                      >
                        <span className="text-sm text-gray-400 transition-colors group-hover:text-gray-200">
                          {item.d}
                        </span>
                        <span className={styles.badge}>{item.k}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : isResourcePage(page) ? (
            <div className="grid grid-cols-1 gap-6">
              {page.links.map((res) => {
                const isHash = res.url === "#";
                const inner = (
                  <>
                    <div className="flex flex-1 flex-wrap items-center gap-4 sm:gap-6">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5 text-blue-400 transition-all group-hover:bg-blue-600 group-hover:text-black">
                        <span className="inline-block -rotate-45 transition-transform group-hover:rotate-0">
                          →
                        </span>
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500">
                          {res.type}
                        </span>
                        <h3 className="mt-1 text-xl font-bold text-zinc-900 sm:text-2xl">{res.title}</h3>
                        <p className="mt-2 text-sm text-gray-500">{res.desc}</p>
                      </div>
                    </div>
                  </>
                );
                if (isHash) {
                  return (
                    <div
                      key={res.title}
                      title="In DaVinci Resolve: Help → Reference Manual"
                      className="group flex cursor-default items-center justify-between rounded-2xl border border-black/[0.08] bg-white/[0.03] p-6 opacity-90 shadow-[0_15px_35px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-8"
                    >
                      {inner}
                    </div>
                  );
                }
                return (
                  <a
                    key={res.title}
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-2xl border border-black/[0.08] bg-white/[0.03] p-6 shadow-[0_15px_35px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_25px_50px_rgba(0,0,0,0.55),0_0_15px_rgba(0,123,255,0.2)] sm:p-8"
                  >
                    {inner}
                  </a>
                );
              })}
            </div>
          ) : isBasePage(page) && page.sections ? (
            <>
              {page.sections.map((section, sIdx) => (
                <section key={section.name} className="mb-10 sm:mb-12">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
                    <h3 className="px-4 text-xs font-black uppercase tracking-[0.4em] text-gray-500">
                      {section.name}
                    </h3>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
                  </div>
                  <div className="overflow-hidden rounded-2xl border border-black/[0.08] bg-white/[0.03] shadow-[0_15px_35px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05)] backdrop-blur-xl">
                    {section.todos.map((todo, tIdx) => {
                      const todoId = `${active}-${sIdx}-${tIdx}`;
                      const checked = checks[todoId] ?? false;
                      return (
                        <div
                          key={todoId}
                          className="flex items-center border-b border-black/[0.03] px-3 py-3.5 transition-colors last:border-b-0 hover:bg-white/[0.02] sm:px-4 sm:py-3.5"
                        >
                          <input
                            id={todoId}
                            type="checkbox"
                            className={styles.checkbox}
                            checked={checked}
                            onChange={(e) => setTodo(todoId, e.target.checked)}
                          />
                          <label
                            htmlFor={todoId}
                            className={`flex-1 cursor-pointer text-sm font-medium text-gray-300 transition-colors hover:text-black ${checked ? styles.completed : ""}`}
                          >
                            {todo}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </section>
              ))}
              {page.resources?.length ? (
                <div className="mt-12 rounded-2xl border border-blue-500/10 bg-blue-600/5 p-6 sm:p-8">
                  <h3 className="mb-4 text-[10px] font-black uppercase tracking-widest text-blue-400">
                    Recommended Material
                  </h3>
                  <div className="flex flex-wrap gap-6">
                    {page.resources.map((r) => (
                      <a
                        key={r.url + r.name}
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 text-sm text-zinc-900/60 transition-colors hover:text-blue-400"
                      >
                        <span className="text-[6px] transition-transform group-hover:scale-150" aria-hidden>
                          ●
                        </span>
                        {r.name}
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
            </>
          ) : null}
        </div>
      </main>
    </div>
  );
}

function navGlyph(id: PageId): string {
  const g: Record<PageId, string> = {
    overview: "▣",
    media: "◎",
    cut: "⚡",
    edit: "▤",
    fusion: "◈",
    color: "◐",
    fairlight: "〰",
    deliver: "↗",
    shortcuts: "⌨",
    resources: "↗",
  };
  return g[id] ?? "•";
}
