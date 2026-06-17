import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

type Item = { src: string; title: string };

export function GallerySlideshow({ items, interval = 3500 }: { items: Item[]; interval?: number }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % items.length), interval);
    return () => clearTimeout(t);
  }, [index, playing, items.length, interval]);

  const go = (dir: number) =>
    setIndex((i) => (i + dir + items.length) % items.length);

  const current = items[index];

  return (
    <div className="relative">
      {/* Stage */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-border bg-card">
        {/* Ambient backdrop = blurred current image */}
        <img
          key={`bg-${index}`}
          src={current.src}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-2xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/30 to-background/40" />

        {/* Slides */}
        {items.map((it, i) => {
          const active = i === index;
          return (
            <figure
              key={it.src}
              className={`absolute inset-0 flex items-center justify-center transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                active
                  ? "opacity-100 scale-100 blur-0"
                  : "opacity-0 scale-[1.06] blur-md pointer-events-none"
              }`}
              aria-hidden={!active}
            >
              <img
                src={it.src}
                alt={it.title}
                loading={i === 0 ? "eager" : "lazy"}
                className="max-h-[88%] max-w-[78%] rounded-2xl object-contain shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
              />
            </figure>
          );
        })}

        {/* Top meta */}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-5 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          <span>Posters · Covers</span>
          <span>
            {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </span>
        </div>

        {/* Caption */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
          <div key={`cap-${index}`} className="reveal max-w-[60%]">
            <p className="text-[10px] uppercase tracking-[0.35em] text-primary">Now showing</p>
            <h3 className="display mt-1 text-xl font-semibold md:text-2xl">{current.title}</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => go(-1)}
              aria-label="Previous"
              className="rounded-full border border-border bg-background/70 p-2 backdrop-blur transition-colors hover:bg-background"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause" : "Play"}
              className="rounded-full border border-border bg-background/70 p-2 backdrop-blur transition-colors hover:bg-background"
            >
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next"
              className="rounded-full border border-border bg-background/70 p-2 backdrop-blur transition-colors hover:bg-background"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-border/40">
          <div
            key={`p-${index}-${playing}`}
            className="h-full bg-primary"
            style={{
              width: "100%",
              transformOrigin: "left",
              animation: playing ? `gallery-progress ${interval}ms linear forwards` : "none",
            }}
          />
        </div>
      </div>

      {/* Thumbnails */}
      <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
        {items.map((it, i) => (
          <button
            key={it.src}
            onClick={() => setIndex(i)}
            aria-label={`Show ${it.title}`}
            className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border transition-all md:h-20 md:w-20 ${
              i === index
                ? "border-primary opacity-100 ring-2 ring-primary/40"
                : "border-border opacity-60 hover:opacity-100"
            }`}
          >
            <img src={it.src} alt={it.title} loading="lazy" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}