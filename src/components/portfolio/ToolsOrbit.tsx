import { Reveal } from "./Reveal";

type Tool = {
  name: string;
  category: string;
  color: string; // CSS color
  emoji?: string;
};

const tools: Tool[] = [
  { name: "Higgsfield.ai", category: "Generative AI", color: "oklch(0.7 0.2 30)", emoji: "✦" },
  { name: "Google Flow", category: "AI Video", color: "oklch(0.7 0.18 250)", emoji: "▶" },
  { name: "Google Omni", category: "AI Studio", color: "oklch(0.78 0.18 140)", emoji: "◎" },
  { name: "Premiere Pro", category: "Adobe — Edit", color: "oklch(0.55 0.22 290)", emoji: "Pr" },
  { name: "After Effects", category: "Adobe — Motion", color: "oklch(0.55 0.2 280)", emoji: "Ae" },
  { name: "Photoshop", category: "Adobe — Image", color: "oklch(0.55 0.22 240)", emoji: "Ps" },
  { name: "Illustrator", category: "Adobe — Vector", color: "oklch(0.65 0.22 50)", emoji: "Ai" },
  { name: "Figma", category: "UI / Design", color: "oklch(0.72 0.2 25)", emoji: "✷" },
  { name: "Affinity", category: "Design Suite", color: "oklch(0.6 0.18 250)", emoji: "∞" },
  { name: "Blender", category: "3D / Motion", color: "oklch(0.72 0.2 60)", emoji: "◉" },
];

export function ToolsOrbit() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 md:gap-4">
      {tools.map((t, i) => (
        <Reveal key={t.name} delay={(i % 5) * 80}>
          <div
            className="group relative aspect-square overflow-hidden rounded-2xl border border-border bg-card p-4 transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/70"
            style={
              {
                "--tc": t.color,
              } as React.CSSProperties
            }
          >
            {/* Glow blob */}
            <div
              className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-30 blur-2xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-60"
              style={{ background: "var(--tc)" }}
            />
            {/* Ring */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5 transition-all duration-500 group-hover:ring-[color:var(--tc)]/40" />

            <div className="relative flex h-full flex-col justify-between">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold text-background transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-110"
                style={{ background: "var(--tc)" }}
              >
                {t.emoji}
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {t.category}
                </div>
                <div className="mt-1 text-sm font-semibold leading-tight md:text-base">
                  {t.name}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}