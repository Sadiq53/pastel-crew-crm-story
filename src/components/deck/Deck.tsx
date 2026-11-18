import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, LayoutGrid, Maximize2, Minimize2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { BRAND } from "./modules";
import { ScaledSlide } from "./ScaledSlide";
import { slides } from "./slides";
import { BrandMark, pad } from "./ui";

export function Deck({ index, onNavigate }: { index: number; onNavigate: (i: number) => void }) {
  const total = slides.length;
  const [grid, setGrid] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [idle, setIdle] = useState(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchX = useRef<number | null>(null);

  const go = useCallback(
    (i: number) => onNavigate(Math.max(0, Math.min(total - 1, i))),
    [onNavigate, total],
  );
  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void document.documentElement.requestFullscreen?.();
  }, []);

  useEffect(() => {
    const onFs = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  useEffect(() => {
    document.title = `${index + 1}/${total} — ${slides[index]?.title ?? ""} · ${BRAND}`;
  }, [index, total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      switch (e.key) {
        case "ArrowRight":
        case "PageDown":
        case " ":
          e.preventDefault();
          next();
          break;
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          prev();
          break;
        case "Home":
          go(0);
          break;
        case "End":
          go(total - 1);
          break;
        case "g":
        case "G":
          setGrid((g) => !g);
          break;
        case "f":
        case "F":
          toggleFullscreen();
          break;
        case "Escape":
          setGrid(false);
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, go, total, toggleFullscreen]);

  const wake = useCallback(() => {
    setIdle(false);
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setIdle(true), 2800);
  }, []);
  useEffect(() => {
    wake();
    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [wake]);

  const Current = (slides[index] ?? slides[0]!).Component;
  const hidden = idle && !grid;

  return (
    <div
      className={cn("fixed inset-0 select-none bg-stage", hidden && "cursor-none")}
      onMouseMove={wake}
      onTouchStart={(e) => {
        touchX.current = e.touches[0]?.clientX ?? null;
        wake();
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = (e.changedTouches[0]?.clientX ?? touchX.current) - touchX.current;
        if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
        touchX.current = null;
      }}
    >
      {/* Progress */}
      <div className="absolute left-0 right-0 top-0 z-30 h-1 bg-cream/10">
        <div
          className="h-full bg-tangerine transition-[width] duration-500 ease-out"
          style={{ width: `${((index + 1) / total) * 100}%` }}
        />
      </div>

      <div className={cn("absolute inset-0", fullscreen ? "p-0" : "p-3 pb-20 sm:p-6 sm:pb-24")}>
        <ScaledSlide>
          <div key={index} className="a-fade">
            <Current page={index + 1} total={total} />
          </div>
        </ScaledSlide>
      </div>

      {/* Controls */}
      <div
        className={cn(
          "absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1 rounded-full border border-cream/15 bg-ink/90 p-1.5 text-cream shadow-soft backdrop-blur transition-all duration-300 sm:bottom-6",
          hidden && "pointer-events-none translate-y-4 opacity-0",
        )}
      >
        <button
          onClick={prev}
          disabled={index === 0}
          aria-label="Previous slide"
          className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-cream/10 disabled:opacity-30"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="min-w-[84px] text-center font-display text-sm font-semibold tabular-nums">
          {pad(index + 1)} <span className="text-cream/40">/ {pad(total)}</span>
        </span>
        <button
          onClick={next}
          disabled={index === total - 1}
          aria-label="Next slide"
          className="grid h-10 w-10 place-items-center rounded-full bg-tangerine text-paper transition-transform hover:scale-105 disabled:opacity-30"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <span className="mx-1 h-6 w-px bg-cream/15" />
        <button
          onClick={() => setGrid(true)}
          aria-label="All slides"
          className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-cream/10"
        >
          <LayoutGrid className="h-5 w-5" />
        </button>
        <button
          onClick={toggleFullscreen}
          aria-label={fullscreen ? "Exit full screen" : "Present full screen"}
          className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-cream/10"
        >
          {fullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
        </button>
      </div>

      {/* Grid overview */}
      {grid && (
        <div className="absolute inset-0 z-40 overflow-y-auto bg-stage/95 backdrop-blur animate-in fade-in duration-300">
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-cream/10 bg-stage/80 px-6 py-4 backdrop-blur">
            <div className="flex items-center gap-3 text-cream">
              <BrandMark size={32} />
              <span className="font-display text-lg font-bold tracking-tight">{BRAND}</span>
              <span className="text-sm text-cream/50">· {total} slides</span>
            </div>
            <button
              onClick={() => setGrid(false)}
              aria-label="Close overview"
              className="grid h-10 w-10 place-items-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-cream/20"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => {
                  go(i);
                  setGrid(false);
                }}
                className="group text-left"
              >
                <div
                  className={cn(
                    "aspect-video overflow-hidden rounded-xl ring-2 ring-transparent transition-all group-hover:-translate-y-1 group-hover:ring-tangerine",
                    i === index && "ring-tangerine",
                  )}
                >
                  <ScaledSlide still>
                    <s.Component page={i + 1} total={total} />
                  </ScaledSlide>
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-cream/70">
                  <span className="font-display font-semibold text-tangerine">{pad(i + 1)}</span>
                  {s.title}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
