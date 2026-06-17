import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

type Item = { src: string; title: string };

function calculateGap(width: number) {
  const minWidth = 640;
  const maxWidth = 1200;
  const minGap = 60;
  const maxGap = 160;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth)
    return Math.max(minGap, maxGap + 0.04 * (width - maxWidth));
  return (
    minGap +
    (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth))
  );
}

function getImageStyle(
  index: number,
  activeIndex: number,
  total: number,
  containerWidth: number
): React.CSSProperties {
  const gap = calculateGap(containerWidth);
  const maxStickUp = gap * 0.55;
  const isActive = index === activeIndex;
  const isLeft =
    (activeIndex - 1 + total) % total === index;
  const isRight = (activeIndex + 1) % total === index;

  const base: React.CSSProperties = {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: "auto",
    height: "92%",
    maxWidth: "65%",
    objectFit: "contain",
    borderRadius: "1.25rem",
    boxShadow: "0 16px 48px rgba(0,0,0,0.45)",
    transition: "all 0.8s cubic-bezier(.4,1.6,.3,1)",
    transformOrigin: "center center",
    marginLeft: "-0%",
  };

  if (isActive) {
    return {
      ...base,
      zIndex: 3,
      opacity: 1,
      pointerEvents: "auto",
      transform: `translate(-50%, -50%) scale(1) rotateY(0deg)`,
      filter: "brightness(1)",
    };
  }
  if (isLeft) {
    return {
      ...base,
      zIndex: 2,
      opacity: 1,
      pointerEvents: "auto",
      transform: `translate(calc(-50% - ${gap}px), calc(-50% - ${maxStickUp}px)) scale(0.75) rotateY(18deg)`,
      filter: "brightness(0.5)",
    };
  }
  if (isRight) {
    return {
      ...base,
      zIndex: 2,
      opacity: 1,
      pointerEvents: "auto",
      transform: `translate(calc(-50% + ${gap}px), calc(-50% - ${maxStickUp}px)) scale(0.75) rotateY(-18deg)`,
      filter: "brightness(0.5)",
    };
  }
  return {
    ...base,
    zIndex: 1,
    opacity: 0,
    pointerEvents: "none",
    transform: "translate(-50%, -50%) scale(0.6) rotateY(0deg)",
    filter: "brightness(0.3)",
  };
}

export function CircularGallery({
  items,
  interval = 6000,
}: {
  items: Item[];
  interval?: number;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [containerWidth, setContainerWidth] = useState(1000);
  const [captionKey, setCaptionKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const total = items.length;

  // Responsive width tracking
  useEffect(() => {
    function measure() {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Autoplay
  useEffect(() => {
    if (!playing) return;
    autoplayRef.current = setTimeout(() => {
      setActiveIndex((i) => (i + 1) % total);
      setCaptionKey((k) => k + 1);
    }, interval);
    return () => {
      if (autoplayRef.current) clearTimeout(autoplayRef.current);
    };
  }, [activeIndex, playing, total, interval]);

  const goTo = useCallback(
    (dir: number) => {
      setActiveIndex((i) => (i + dir + total) % total);
      setCaptionKey((k) => k + 1);
      if (autoplayRef.current) clearTimeout(autoplayRef.current);
    },
    [total]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goTo(-1);
      if (e.key === "ArrowRight") goTo(1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goTo]);

  // Click on side images to navigate
  const handleImageClick = (index: number) => {
    const isLeft = (activeIndex - 1 + total) % total === index;
    const isRight = (activeIndex + 1) % total === index;
    if (isLeft) goTo(-1);
    else if (isRight) goTo(1);
  };

  const current = items[activeIndex];

  return (
    <div className="relative">
      {/* 3D Stage */}
      <div
        ref={containerRef}
        className="relative mx-auto w-full"
        style={{
          height: "clamp(24rem, 60vw, 40rem)",
          perspective: "1200px",
        }}
      >
        {items.map((item, i) => (
          <img
            key={item.src}
            src={item.src}
            alt={item.title}
            loading={i === 0 ? "eager" : "lazy"}
            onClick={() => handleImageClick(i)}
            className={
              i !== activeIndex ? "cursor-pointer" : ""
            }
            style={getImageStyle(i, activeIndex, total, containerWidth)}
          />
        ))}
      </div>

      {/* Caption + Controls */}
      <div className="mt-8 flex flex-col items-center gap-5 md:flex-row md:items-end md:justify-between">
        {/* Caption */}
        <div
          key={captionKey}
          className="text-center md:text-left"
          style={{
            animation: "circular-caption-in 0.5s cubic-bezier(.2,.7,.2,1) forwards",
          }}
        >
          <p className="text-[10px] uppercase tracking-[0.35em] text-primary">
            Now showing ·{" "}
            <span className="text-muted-foreground">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </span>
          </p>
          <h3 className="display mt-1.5 text-xl font-semibold md:text-2xl">
            {current.title}
          </h3>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => goTo(-1)}
            aria-label="Previous"
            className="group flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/70 backdrop-blur transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
          </button>
          <button
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause" : "Play"}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/70 backdrop-blur transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
          >
            {playing ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="ml-0.5 h-4 w-4" />
            )}
          </button>
          <button
            onClick={() => goTo(1)}
            aria-label="Next"
            className="group flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/70 backdrop-blur transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="mt-5 flex justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => {
              setActiveIndex(i);
              setCaptionKey((k) => k + 1);
              if (autoplayRef.current) clearTimeout(autoplayRef.current);
            }}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === activeIndex
                ? "w-8 bg-primary"
                : "w-1.5 bg-border hover:bg-muted-foreground"
            }`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="mx-auto mt-4 h-[2px] max-w-xs overflow-hidden rounded-full bg-border/40">
        <div
          key={`p-${activeIndex}-${playing}`}
          className="h-full bg-primary"
          style={{
            width: "100%",
            transformOrigin: "left",
            animation: playing
              ? `gallery-progress ${interval}ms linear forwards`
              : "none",
          }}
        />
      </div>
    </div>
  );
}
