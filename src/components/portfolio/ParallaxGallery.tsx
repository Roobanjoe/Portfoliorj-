import { useEffect, useRef, useState } from "react";

type Item = { src: string; title: string };

export function ParallaxGallery({ items }: { items: Item[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) {
          raf = 0;
          return;
        }
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // Progress: -1 (below viewport) → 0 (centered) → 1 (above)
        const progress = (vh / 2 - (rect.top + rect.height / 2)) / (vh + rect.height) * 2;
        setOffset(progress);
        raf = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Split items into 3 columns
  const cols: Item[][] = [[], [], []];
  items.forEach((it, i) => cols[i % 3].push(it));
  // Different parallax speeds per column
  const speeds = [120, -160, 80];

  return (
    <div ref={ref} className="relative grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
      {cols.map((col, ci) => (
        <div
          key={ci}
          className="flex flex-col gap-4 md:gap-6 will-change-transform"
          style={{ transform: `translate3d(0, ${offset * speeds[ci]}px, 0)` }}
        >
          {col.map((it, idx) => (
            <figure
              key={idx}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card"
            >
              <img
                src={it.src}
                alt={it.title}
                loading="lazy"
                className="block h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
              />
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-background/90 via-background/30 to-transparent p-4 text-xs uppercase tracking-[0.2em] text-foreground opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {it.title}
              </figcaption>
            </figure>
          ))}
        </div>
      ))}
    </div>
  );
}