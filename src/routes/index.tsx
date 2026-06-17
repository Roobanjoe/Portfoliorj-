import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Play, Music2, Film, Sparkles, Mail, Phone, ArrowUpRight, Instagram } from "lucide-react";
import { CursorGlow } from "@/components/portfolio/CursorGlow";
import { Reveal } from "@/components/portfolio/Reveal";
import { TiltCard } from "@/components/portfolio/TiltCard";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { CountUp } from "@/components/portfolio/CountUp";
import { CircularGallery } from "@/components/portfolio/CircularGallery";
import { ToolsOrbit } from "@/components/portfolio/ToolsOrbit";
import twentyThreeThumbnail from "@/assets/23-thumbnail.png.asset.json";
import stalinthaThumbnail from "@/assets/stalintha-thumbnail.png.asset.json";
import epsThumbnail from "@/assets/eps-video.png.asset.json";
import peninKuralThumbnail from "@/assets/oru-prnnin-kural.png.asset.json";
import aiShortFilmThumbnail from "@/assets/unrised-sun.png.asset.json";
import shinyThumbnail from "@/assets/shiny.png.asset.json";
import omliThumbnail from "@/assets/omli.png.asset.json";
import xploreThumbnail from "@/assets/xplore.png.asset.json";
import aircelThumbnail from "@/assets/aircel-interview.png.asset.json";

// Graphic design works
import gfx1 from "@/assets/graphics/villain_era.png.asset.json";
import gfx2 from "@/assets/graphics/open_mic_poster.png.asset.json";
import gfx3 from "@/assets/graphics/kd_show_poster.jpg.asset.json";
import gfx4 from "@/assets/graphics/new_poster_show_final4.jpg.asset.json";
import gfx5 from "@/assets/graphics/by_01_final2.jpg.asset.json";
import gfx6 from "@/assets/graphics/2r_running.jpg.asset.json";
import gfx7 from "@/assets/graphics/staying_in_the_lame_.jpg.asset.json";
import gfx8 from "@/assets/graphics/oru_20240805_160400_0000.jpg.asset.json";
import gfx9 from "@/assets/graphics/gold_(8).jpg.asset.json";

const graphics = [
  { src: gfx1.url, title: "Villain Era" },
  { src: gfx2.url, title: "Open Mic Poster" },
  { src: gfx3.url, title: "KD Show Poster" },
  { src: gfx4.url, title: "New Show Poster" },
  { src: gfx5.url, title: "By 01" },
  { src: gfx6.url, title: "2R Running" },
  { src: gfx7.url, title: "Staying in the Lame" },
  { src: gfx8.url, title: "Oru" },
  { src: gfx9.url, title: "Gold" },
];

export const Route = createFileRoute("/")({
  component: Index,
});

type Source = "youtube" | "drive" | "spotify" | "instagram";
type Work = {
  title: string;
  role: string;
  source: Source;
  url: string;
  id: string;
  tag: string;
  thumbnail?: string;
};

const yt = (u: string) => {
  const m = u.match(/(?:youtu\.be\/|v=)([\w-]+)/);
  return m ? m[1] : "";
};
const drive = (u: string) => {
  const m = u.match(/\/d\/([\w-]+)/);
  return m ? m[1] : "";
};
const spo = (u: string) => {
  const m = u.match(/track\/([\w]+)/);
  return m ? m[1] : "";
};
const ig = (u: string) => {
  const m = u.match(/\/reel\/([\w-]+)/);
  return m ? m[1] : "";
};

const works: Work[] = [
  { title: "23 Pulikeshi", role: "AI Visuals & Music", source: "youtube", url: "https://youtu.be/7_1w3myn7T8", id: yt("https://youtu.be/7_1w3myn7T8"), tag: "AI", thumbnail: twentyThreeThumbnail.url },
  { title: "Stalintha Vantharu", role: "AI Visuals — Troll Song", source: "youtube", url: "https://youtu.be/9L-cAhSrSI4", id: yt("https://youtu.be/9L-cAhSrSI4"), tag: "AI", thumbnail: stalinthaThumbnail.url },
  { title: "EPS Song", role: "Visuals", source: "drive", url: "https://drive.google.com/file/d/1J_EBA_nFvT_8D0XZEUUdqNRpSvQSJasi/view", id: "1J_EBA_nFvT_8D0XZEUUdqNRpSvQSJasi", tag: "AI", thumbnail: epsThumbnail.url },
  { title: "We Don't Need DMK", role: "Visuals", source: "youtube", url: "https://youtu.be/5HmYwUgEBCY", id: yt("https://youtu.be/5HmYwUgEBCY"), tag: "AI" },
  { title: "Penin Kural", role: "Music & Visuals", source: "youtube", url: "https://youtu.be/yGG_AvjzVBk", id: yt("https://youtu.be/yGG_AvjzVBk"), tag: "Original", thumbnail: peninKuralThumbnail.url },
  { title: "Seradha Kadhal", role: "Visuals", source: "youtube", url: "https://youtu.be/hnA3pQ-RdCs", id: yt("https://youtu.be/hnA3pQ-RdCs"), tag: "Music Video" },
  { title: "Maatra Poove", role: "Edit & Music", source: "youtube", url: "https://youtu.be/aWL_3CqF_aw", id: yt("https://youtu.be/aWL_3CqF_aw"), tag: "Original" },
  { title: "AI Short Film", role: "Visuals & Music Score", source: "drive", url: "https://drive.google.com/file/d/1Qevieog4ipzoyCgR_h3f68mJ49llWwTy/view", id: "1Qevieog4ipzoyCgR_h3f68mJ49llWwTy", tag: "AI", thumbnail: aiShortFilmThumbnail.url },
  { title: "Xplore 24 Promo", role: "Visuals", source: "drive", url: "https://drive.google.com/file/d/1dpcpbb6gj-pMPnY3Bx9RtH9HdcCwDQ2c/view", id: "1dpcpbb6gj-pMPnY3Bx9RtH9HdcCwDQ2c", tag: "Promo", thumbnail: xploreThumbnail.url },
  { title: "Shinyonika App Teaser", role: "Motion Graphics", source: "drive", url: "https://drive.google.com/file/d/16ri8WC0-KJMUDB55g5dwbgfM4j6lvf3c/view", id: "16ri8WC0-KJMUDB55g5dwbgfM4j6lvf3c", tag: "Motion", thumbnail: shinyThumbnail.url },
  { title: "Interview with Aircel Founder", role: "Edit & Visuals", source: "drive", url: "https://drive.google.com/file/d/11PgA_tcS-xryBfe7llOOa1cMj-fXn3QC/view", id: "11PgA_tcS-xryBfe7llOOa1cMj-fXn3QC", tag: "Interview", thumbnail: aircelThumbnail.url },
  { title: "Murugan", role: "Music Composed", source: "spotify", url: "https://open.spotify.com/track/0Vp8Fv6VxELV1hGo6oGQWP", id: "0Vp8Fv6VxELV1hGo6oGQWP", tag: "Spotify" },
  { title: "Maatra Poove", role: "Music Composed", source: "spotify", url: "https://open.spotify.com/track/3dMxMfTasD39FRuMbBeSj9", id: "3dMxMfTasD39FRuMbBeSj9", tag: "Spotify" },
  { title: "Omli shortfilm promo", role: "Short-form Visual", source: "instagram", url: "https://www.instagram.com/reel/DXzDb4PgDUN/", id: "DXzDb4PgDUN", tag: "Reel", thumbnail: omliThumbnail.url },
];

function Thumb({ work }: { work: Work }) {
  if (work.thumbnail) {
    return (
      <img
        src={work.thumbnail}
        alt={work.title}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
    );
  }
  if (work.source === "youtube") {
    return (
      <img
        src={`https://i.ytimg.com/vi/${work.id}/hqdefault.jpg`}
        alt={work.title}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
    );
  }
  if (work.source === "drive") {
    return (
      <img
        src={`https://drive.google.com/thumbnail?id=${work.id}&sz=w800`}
        alt={work.title}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
    );
  }
  if (work.source === "instagram") {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[oklch(0.35_0.18_20)] via-[oklch(0.3_0.2_330)] to-[oklch(0.25_0.15_280)]">
        <Instagram className="h-16 w-16 text-white" strokeWidth={1.4} />
      </div>
    );
  }
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[oklch(0.3_0.15_150)] to-[oklch(0.2_0.08_160)]">
      <Music2 className="h-16 w-16 text-primary" strokeWidth={1.2} />
    </div>
  );
}

function Player({ work }: { work: Work }) {
  if (work.source === "youtube") {
    return (
      <iframe
        className="h-full w-full"
        src={`https://www.youtube.com/embed/${work.id}?autoplay=1`}
        title={work.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }
  if (work.source === "drive") {
    return (
      <iframe
        className="h-full w-full"
        src={`https://drive.google.com/file/d/${work.id}/preview`}
        title={work.title}
        allow="autoplay"
        allowFullScreen
      />
    );
  }
  if (work.source === "instagram") {
    return (
      <iframe
        className="h-full w-full"
        src={`https://www.instagram.com/reel/${work.id}/embed`}
        title={work.title}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
        allowFullScreen
        scrolling="no"
      />
    );
  }
  return (
    <iframe
      className="h-full w-full"
      src={`https://open.spotify.com/embed/track/${work.id}?utm_source=generator&theme=0`}
      title={work.title}
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    />
  );
}

const sourceIcon = (s: Source) =>
  s === "youtube" ? Film : s === "spotify" ? Music2 : s === "instagram" ? Instagram : Sparkles;

function Index() {
  const [open, setOpen] = useState<Work | null>(null);
  const publicWorks = works.filter((w) => w.source !== "spotify");
  const musicWorks = works.filter((w) => w.source === "spotify");
  const categories = ["All", ...Array.from(new Set(publicWorks.map((w) => w.tag)))];
  const [filter, setFilter] = useState("All");
  const visible = filter === "All" ? publicWorks : publicWorks.filter((w) => w.tag === filter);
  const roles = ["Composer.", "Editor.", "AI Visual Artist.", "Storyteller."];
  const [roleIdx, setRoleIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIdx];
    const speed = deleting ? 45 : 90;
    const t = setTimeout(() => {
      if (!deleting && typed === current) {
        setTimeout(() => setDeleting(true), 1400);
        return;
      }
      if (deleting && typed === "") {
        setDeleting(false);
        setRoleIdx((i) => (i + 1) % roles.length);
        return;
      }
      setTyped(deleting ? current.slice(0, typed.length - 1) : current.slice(0, typed.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [typed, deleting, roleIdx]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <CursorGlow />
      <ScrollProgress />
      {/* NAV */}
      <header className="fixed top-0 z-40 w-full backdrop-blur-xl bg-background/60 border-b border-border/50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#top" className="text-sm font-semibold tracking-widest">
            ROOBAN<span className="text-primary">·</span>JOE
          </a>
          <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
            <a href="#works" className="hover:text-foreground transition-colors">Works</a>
            <a href="#music" className="hover:text-foreground transition-colors">Music</a>
            <a href="#graphics" className="hover:text-foreground transition-colors">Graphics</a>
            <a href="#tools" className="hover:text-foreground transition-colors">Tools</a>
            <a href="#about" className="hover:text-foreground transition-colors">About</a>
            <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
          </nav>
          <a
            href="#contact"
            className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-all hover:glow-ring"
          >
            Hire me
          </a>
        </div>
      </header>

      {/* HERO */}
      <section
        id="top"
        className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-primary/30 blur-[120px] float-slow" />
          <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-primary/20 blur-[100px] float-slow" style={{ animationDelay: "2s" }} />
        </div>
        <div className="mx-auto grid w-full max-w-7xl gap-12 md:grid-cols-12 md:items-center">
          <div className="md:col-span-8">
            <Reveal>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Available for new collaborations
            </p>
            </Reveal>
            <Reveal delay={120}>
            <h1 className="display text-[clamp(2.8rem,9vw,7rem)] font-bold leading-[0.95]">
              Hey<span className="inline-block animate-pulse">✨</span>, I'm <br />
              <span className="text-gradient">ROOBAN JOE</span>
            </h1>
            </Reveal>
            <Reveal delay={240}>
            <div className="mt-6 text-2xl md:text-3xl font-medium">
              I'm a <span className="text-gradient">{typed}</span>
              <span className="cursor-blink ml-1 inline-block w-[2px] bg-primary align-middle" style={{ height: "1em" }} />
            </div>
            </Reveal>
            <Reveal delay={360}>
            <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
              I craft sound and visuals — from AI-driven music videos and short films to
              motion graphics and original compositions. A selection of my work lives below.
            </p>
            </Reveal>
            <Reveal delay={500}>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#works"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:glow-ring"
              >
                Explore works
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-7 py-3.5 text-sm font-semibold backdrop-blur transition-colors hover:bg-card"
              >
                Get in touch
              </a>
            </div>
            </Reveal>
          </div>
          <div className="hidden md:col-span-4 md:block">
            <div className="space-y-4 text-right text-xs uppercase tracking-widest text-muted-foreground">
              <div>©2025</div>
              <div className="text-foreground text-2xl font-bold tracking-tight">
                <CountUp to={works.length} suffix="+" />
              </div>
              <div>Projects shipped</div>
              <div className="my-6 ml-auto h-px w-12 bg-border" />
              <div className="text-foreground text-2xl font-bold tracking-tight">
                <CountUp to={4} />
              </div>
              <div>Platforms · YT · Drive · Spotify · IG</div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          <span className="inline-block animate-bounce">↓</span> Scroll
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-y border-border bg-card/40 py-6">
        <div className="marquee-track flex w-max gap-12 whitespace-nowrap text-3xl md:text-5xl font-bold tracking-tight">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex gap-12">
              {["MUSIC", "★", "AI VISUALS", "★", "MOTION", "★", "EDITING", "★", "SCORE", "★", "PROMOS", "★"].map((t, j) => (
                <span key={`${i}-${j}`} className={j % 2 === 1 ? "text-primary" : "text-foreground/80"}>{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* WORKS */}
      <section id="works" className="px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.3em] text-primary">/ Selected Works</p>
              <h2 className="display text-4xl font-bold md:text-6xl">
                Things I've <span className="text-gradient">made</span>
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`rounded-full border px-4 py-1.5 text-xs uppercase tracking-wider transition-all ${
                    filter === c
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((w, idx) => {
              const Icon = sourceIcon(w.source);
              return (
                <Reveal key={w.url} delay={(idx % 3) * 100}>
                <TiltCard
                  onClick={() => setOpen(w)}
                  className="w-full overflow-hidden rounded-2xl border border-border bg-card text-left transition-colors hover:border-primary/60"
                >
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    <Thumb work={w} />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80" />
                    <div className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-background/80 px-3 py-1 text-[10px] uppercase tracking-wider backdrop-blur">
                      <Icon className="h-3 w-3 text-primary" />
                      {w.source}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground glow-ring">
                        <Play className="ml-1 h-6 w-6 fill-current" />
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="text-[10px] uppercase tracking-[0.25em] text-primary">{w.tag}</div>
                    <h3 className="mt-2 text-lg font-semibold">{w.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{w.role}</p>
                  </div>
                </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* MUSIC RELEASES */}
      <section id="music" className="relative overflow-hidden border-t border-border px-6 py-28">
        <div className="absolute inset-0 -z-10 opacity-25 pointer-events-none">
          <div className="absolute -top-20 right-1/4 h-[420px] w-[420px] rounded-full bg-[oklch(0.7_0.2_140)]/30 blur-[120px] float-slow" />
          <div className="absolute bottom-0 left-10 h-[320px] w-[320px] rounded-full bg-primary/30 blur-[100px] float-slow" style={{ animationDelay: "1.5s" }} />
        </div>
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="mb-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary">
                  <Music2 className="h-3 w-3" /> / Original Releases
                </p>
                <h2 className="display text-4xl font-bold md:text-6xl">
                  On <span className="text-gradient">Spotify</span>
                </h2>
                <p className="mt-3 max-w-xl text-muted-foreground">
                  Original compositions streaming worldwide. Press play.
                </p>
              </div>
              <a
                href="https://open.spotify.com/artist"
                target="_blank"
                rel="noreferrer"
                className="hidden md:inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm hover:border-primary hover:text-primary"
              >
                <Music2 className="h-4 w-4" /> Listen on Spotify
              </a>
            </div>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-2">
            {musicWorks.map((w, idx) => (
              <Reveal key={w.url} delay={idx * 120}>
                <div className="group relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card via-card to-[oklch(0.2_0.06_150)] p-6 transition-all hover:border-primary/60">
                  <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl transition-all duration-700 group-hover:bg-primary/20 group-hover:scale-110" />
                  <div className="relative flex items-center gap-6">
                    {/* Vinyl */}
                    <div className="relative shrink-0">
                      <div className="h-28 w-28 rounded-full bg-gradient-to-br from-[oklch(0.18_0.02_160)] via-black to-[oklch(0.12_0.02_160)] shadow-2xl transition-transform duration-1000 group-hover:rotate-180">
                        <div className="absolute inset-2 rounded-full border border-white/5" />
                        <div className="absolute inset-5 rounded-full border border-white/5" />
                        <div className="absolute inset-8 rounded-full border border-white/5" />
                        <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[var(--glow)]" />
                        <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background" />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] uppercase tracking-[0.3em] text-primary">{w.tag} · Single</div>
                      <h3 className="display mt-1 truncate text-2xl font-bold md:text-3xl">{w.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{w.role}</p>
                      <button
                        onClick={() => setOpen(w)}
                        className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-all hover:glow-ring"
                      >
                        <Play className="h-3.5 w-3.5 fill-current" /> Play preview
                      </button>
                    </div>
                  </div>
                  <div className="relative mt-6 overflow-hidden rounded-xl">
                    <iframe
                      className="h-[80px] w-full"
                      src={`https://open.spotify.com/embed/track/${w.id}?utm_source=generator&theme=0`}
                      title={w.title}
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GRAPHICS — parallax gallery */}
      <section id="graphics" className="relative overflow-hidden border-t border-border px-6 py-28">
        <div className="absolute inset-0 -z-10 opacity-25 pointer-events-none">
          <div className="absolute top-1/4 left-10 h-[380px] w-[380px] rounded-full bg-[oklch(0.7_0.22_30)]/30 blur-[120px] float-slow" />
          <div className="absolute bottom-10 right-10 h-[320px] w-[320px] rounded-full bg-[oklch(0.65_0.2_300)]/30 blur-[100px] float-slow" style={{ animationDelay: "1.8s" }} />
        </div>
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.3em] text-primary">/ Graphic Design</p>
                <h2 className="display text-4xl font-bold md:text-6xl">
                  Posters &amp; <span className="text-gradient">covers</span>
                </h2>
                <p className="mt-3 max-w-xl text-muted-foreground">
                  An auto-playing gallery — one piece at a time.
                </p>
              </div>
              <div className="hidden md:flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                <span className="h-px w-10 bg-border" /> {graphics.length} works
              </div>
            </div>
          </Reveal>
          <CircularGallery items={graphics} interval={3500} />
        </div>
      </section>

      {/* TOOLS */}
      <section id="tools" className="relative overflow-hidden border-t border-border px-6 py-28">
        <div className="absolute inset-0 -z-10 opacity-25 pointer-events-none">
          <div className="absolute -top-10 left-1/3 h-[400px] w-[400px] rounded-full bg-primary/30 blur-[120px] float-slow" />
        </div>
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-12 max-w-2xl">
              <p className="mb-3 text-xs uppercase tracking-[0.3em] text-primary">/ Toolkit</p>
              <h2 className="display text-4xl font-bold md:text-6xl">
                Tools I <span className="text-gradient">command</span>
              </h2>
              <p className="mt-3 text-muted-foreground">
                A blend of generative AI, motion, and classic design — the kit I use to ship.
              </p>
            </div>
          </Reveal>
          <ToolsOrbit />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="border-t border-border px-6 py-28">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">/ About</p>
            <h2 className="display mt-3 text-4xl font-bold md:text-5xl">
              Sound × Vision
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground md:col-span-8">
            <p>
              I'm Rooban Joe — a multidisciplinary creator working at the intersection of
              music, AI, and motion design. From composing original tracks released on
              Spotify to directing AI-generated music videos and promo films, I build
              worlds that feel.
            </p>
            <p>
              My toolkit spans DAWs, generative AI, After Effects and Premiere — but the
              craft is always the same: tell a story that lands.
            </p>
            <div className="flex flex-wrap gap-2 pt-4">
              {["Music Composition", "AI Visuals", "Video Editing", "Motion Graphics", "Score", "Promos"].map((s) => (
                <span key={s} className="rounded-full border border-border px-4 py-1.5 text-sm text-foreground">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-t border-border px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">/ Contact</p>
          <h2 className="display mt-3 text-5xl font-bold md:text-7xl">
            Let's make <span className="text-gradient">something</span>.
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <a
              href="mailto:rooban.joy@gmail.com"
              className="group flex items-center justify-between rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/60"
            >
              <div className="flex items-center gap-4">
                <Mail className="h-6 w-6 text-primary" />
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Email</div>
                  <div className="text-lg font-semibold">rooban.joy@gmail.com</div>
                </div>
              </div>
              <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
            </a>
            <a
              href="tel:+919976511449"
              className="group flex items-center justify-between rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/60"
            >
              <div className="flex items-center gap-4">
                <Phone className="h-6 w-6 text-primary" />
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Phone</div>
                  <div className="text-lg font-semibold">+91 99765 11449</div>
                </div>
              </div>
              <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-border px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
          <div>© 2025 Rooban Joe. All works belong to their creators.</div>
          <div className="tracking-widest">CRAFTED WITH CARE</div>
        </div>
      </footer>

      {/* MODAL VIEWER */}
      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-5xl border-border bg-card p-0 overflow-hidden">
          <DialogTitle className="sr-only">{open?.title}</DialogTitle>
          {open && (
            <>
              <div
                className={`w-full bg-black ${
                  open.source === "spotify"
                    ? "h-[380px]"
                    : open.source === "instagram"
                    ? "h-[720px] max-h-[80vh]"
                    : "aspect-video"
                }`}
              >
                <Player work={open} />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-primary">{open.tag}</div>
                  <h3 className="text-xl font-semibold">{open.title}</h3>
                  <p className="text-sm text-muted-foreground">{open.role}</p>
                </div>
                <a
                  href={open.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:border-primary hover:text-primary"
                >
                  Open original <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}
