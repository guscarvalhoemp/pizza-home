"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heroMedia } from "@/content/media";
import { initAutoplayVideo } from "@/lib/autoplayVideo";

gsap.registerPlugin(ScrollTrigger);

const VIDEO_PLAYBACK_RATE = 0.7;

function setSlowRate(el: HTMLVideoElement | null) {
  if (!el) return;
  el.playbackRate = VIDEO_PLAYBACK_RATE;
  initAutoplayVideo(el);
}

export default function HeroExperience() {
  const heroRef = useRef<HTMLElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const panelH1Ref = useRef<HTMLDivElement>(null);
  const panelH2Ref = useRef<HTMLDivElement>(null);
  const panelH3Ref = useRef<HTMLDivElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (isDesktop === null) return;
    const heroEl = heroRef.current;
    const cover = coverRef.current;
    if (!heroEl || !cover) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const panels = [panelH1Ref.current, panelH2Ref.current, panelH3Ref.current];

    if (reduceMotion) {
      gsap.set(cover, { opacity: 0 });
      gsap.set(panels, { xPercent: 0, yPercent: 0, opacity: 1 });
      gsap.set([navRef.current, textRef.current], { opacity: 1, y: 0 });
      gsap.set(scrollHintRef.current, { opacity: 1 });
    } else {
      gsap.set(panelH1Ref.current, { yPercent: -130 });
      gsap.set(panelH2Ref.current, { yPercent: 130 });
      gsap.set(panelH3Ref.current, { xPercent: 130 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(cover, { opacity: 0, duration: 1.1 })
        // Hold: the medallion + name sit alone for a beat before media arrives.
        .to(panelH1Ref.current, { yPercent: 0, duration: 1.1 }, "+=0.55")
        .to(panelH2Ref.current, { yPercent: 0, duration: 1.1 }, "<+=0.12")
        .to(panelH3Ref.current, { xPercent: 0, duration: 1.1 }, "<+=0.12")
        .to(navRef.current, { opacity: 1, y: 0, duration: 0.9 }, "-=0.4")
        .to(textRef.current, { opacity: 1, y: 0, duration: 0.9 }, "<+=0.1")
        .to(scrollHintRef.current, { opacity: 1, duration: 0.7 }, "-=0.3");
    }

    const exitTl = gsap.timeline({
      paused: true,
      defaults: { ease: "power2.in" },
    });
    exitTl
      .to(panelH1Ref.current, { yPercent: -130, opacity: 0, duration: 0.7 }, 0)
      .to(panelH2Ref.current, { yPercent: 130, opacity: 0, duration: 0.7 }, 0)
      .to(panelH3Ref.current, { xPercent: 130, opacity: 0, duration: 0.7 }, 0)
      .to(textRef.current, { opacity: 0, y: -16, duration: 0.5 }, 0)
      .to(scrollHintRef.current, { opacity: 0, duration: 0.3 }, 0);

    const st = ScrollTrigger.create({
      trigger: heroEl,
      start: "top top-=1",
      onEnter: () => exitTl.play(),
      onLeaveBack: () => exitTl.reverse(),
    });

    return () => {
      st.kill();
    };
  }, [isDesktop]);

  return (
    <>
      <header
        ref={navRef}
        className={`fixed inset-x-0 top-0 z-40 flex -translate-y-4 items-center justify-between px-5 py-4 opacity-0 transition-colors duration-300 sm:px-8 ${
          scrolled
            ? "bg-pizza-black/80 backdrop-blur-md shadow-[0_1px_0_rgba(240,230,211,0.08)]"
            : "bg-transparent"
        }`}
      >
        <a href="#hero" className="flex items-baseline gap-2 text-pizza-cream">
          <span className="font-serif text-xl tracking-wide">PH</span>
          <span className="hidden font-sans text-[11px] font-medium tracking-[0.3em] text-pizza-cream/70 sm:inline">
            PIZZA HOME
          </span>
        </a>

        <nav className="hidden items-center gap-8 font-sans text-sm font-medium tracking-wide text-pizza-cream/90 md:flex">
          <a href="#cardapio" className="transition-colors hover:text-pizza-amber">
            Repertório
          </a>
          <a href="#sobre" className="transition-colors hover:text-pizza-amber">
            Sobre
          </a>
          <a href="#chef" className="transition-colors hover:text-pizza-amber">
            O Chef
          </a>
          <a href="#contato" className="transition-colors hover:text-pizza-amber">
            Contato
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contato"
            className="hidden rounded-full bg-pizza-amber px-5 py-2.5 font-sans text-sm font-semibold text-pizza-black transition-transform hover:scale-105 md:inline-block"
          >
            Solicitar Orçamento
          </a>
          <button
            type="button"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-pizza-cream/30 text-pizza-cream md:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              {menuOpen ? (
                <path
                  d="M2 2L16 16M16 2L2 16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M1 4H17M1 9H17M1 14H17"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-30 flex flex-col items-center justify-center gap-8 bg-pizza-black/98 font-serif text-2xl text-pizza-cream backdrop-blur md:hidden">
          <a href="#cardapio" onClick={() => setMenuOpen(false)}>
            Repertório
          </a>
          <a href="#sobre" onClick={() => setMenuOpen(false)}>
            Sobre
          </a>
          <a href="#chef" onClick={() => setMenuOpen(false)}>
            O Chef
          </a>
          <a href="#contato" onClick={() => setMenuOpen(false)}>
            Contato
          </a>
          <a
            href="#contato"
            onClick={() => setMenuOpen(false)}
            className="mt-2 rounded-full bg-pizza-amber px-8 py-3 font-sans text-base font-semibold text-pizza-black"
          >
            Solicitar Orçamento
          </a>
        </div>
      )}

      <section
        ref={heroRef}
        id="hero"
        className="relative h-[100dvh] w-full overflow-hidden bg-pizza-black"
      >
        {/* Brand backdrop: the medallion, visible behind the whole hero */}
        <div className="absolute inset-0">
          <img
            src="/sequence/desktop/053.jpg"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover opacity-[0.42]"
          />
          <div className="absolute inset-0 bg-pizza-black/30" />
          <div className="absolute inset-0 hidden bg-gradient-to-r from-pizza-black via-pizza-black/55 to-transparent lg:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-pizza-black via-pizza-black/45 to-transparent lg:hidden" />
        </div>

        {/* Collage of h1 (from top), h2 (from bottom), h3 (from the right) */}
        <div className="pointer-events-none absolute inset-0 flex items-start justify-between gap-4 px-7 pt-[13dvh] lg:block lg:gap-0 lg:p-0">
          <div
            ref={panelH1Ref}
            className="relative order-3 aspect-[3/4] h-[min(21dvh,170px)] flex-none overflow-hidden rounded-[1.1rem] shadow-2xl shadow-black/60 lg:absolute lg:right-[3%] lg:top-[4%] lg:h-auto lg:w-[28%] lg:max-w-[340px] lg:rounded-[2rem]"
            style={{ willChange: "transform, opacity" }}
          >
            <video
              ref={setSlowRate}
              src={heroMedia.h1.src}
              poster={heroMedia.h1.poster}
              autoPlay
              muted
              loop
              playsInline
              aria-label={heroMedia.h1.alt}
              className="h-full w-full object-cover"
            />
          </div>
          <div
            ref={panelH2Ref}
            className="relative order-1 mt-3 aspect-[3/4] h-[min(18dvh,145px)] flex-none -rotate-3 overflow-hidden rounded-[1.1rem] shadow-2xl shadow-black/60 lg:absolute lg:left-auto lg:right-[21%] lg:top-auto lg:bottom-[4%] lg:mt-0 lg:h-auto lg:w-[19%] lg:max-w-[230px] lg:rounded-[2rem]"
            style={{ willChange: "transform, opacity" }}
          >
            <video
              ref={setSlowRate}
              src={heroMedia.h2.src}
              poster={heroMedia.h2.poster}
              autoPlay
              muted
              loop
              playsInline
              aria-label={heroMedia.h2.alt}
              className="h-full w-full object-cover"
            />
          </div>
          <div
            ref={panelH3Ref}
            className="relative order-2 mt-8 aspect-[9/16] h-[min(16dvh,130px)] flex-none rotate-2 overflow-hidden rounded-[1.1rem] shadow-2xl shadow-black/60 lg:absolute lg:right-[1%] lg:top-[30%] lg:mt-0 lg:h-auto lg:w-[21%] lg:max-w-[260px] lg:rounded-[2rem]"
            style={{ willChange: "transform, opacity" }}
          >
            <video
              ref={setSlowRate}
              src={heroMedia.h3.src}
              poster={heroMedia.h3.poster}
              autoPlay
              muted
              loop
              playsInline
              aria-label={heroMedia.h3.alt}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div ref={coverRef} className="pointer-events-none absolute inset-0 z-30 bg-pizza-black" />

        {/* Text content: same style/fonts on every breakpoint, only layout position differs */}
        <div
          ref={textRef}
          className="absolute inset-x-0 bottom-0 z-20 flex translate-y-4 flex-col items-center gap-3 px-6 pb-9 text-center opacity-0 sm:gap-4 sm:pb-11 lg:relative lg:inset-auto lg:h-full lg:max-w-md lg:flex-col lg:items-start lg:justify-center lg:gap-5 lg:px-10 lg:pb-0 lg:text-left xl:max-w-lg xl:px-20"
        >
          <p className="flex items-center gap-3 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-pizza-amber sm:text-xs sm:tracking-[0.25em] lg:justify-start">
            <span className="h-1.5 w-1.5 rounded-full bg-pizza-amber" aria-hidden="true" />
            Pizza napolitana para eventos
          </p>

          <h1 className="font-serif text-[1.7rem] leading-[1.12] text-pizza-cream sm:text-4xl lg:text-4xl xl:text-5xl">
            Uma pizzaria completa,{" "}
            <em className="italic text-pizza-amber">
              dentro do seu evento.
            </em>
          </h1>

          <p className="max-w-md font-sans text-[13px] text-pizza-cream/70 sm:text-base">
            Massa napolitana, forno próprio e o Chef Maicom Lima à frente de
            cada detalhe, do primeiro corte ao último brinde.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <a
              href="#contato"
              className="rounded-full bg-pizza-amber px-6 py-3 font-sans text-sm font-semibold uppercase tracking-wide text-pizza-black transition-transform hover:scale-105 sm:px-7 sm:py-3.5"
            >
              Solicitar Orçamento
            </a>
            <a
              href="#cardapio"
              className="rounded-full border border-pizza-cream/40 px-6 py-3 font-sans text-sm font-semibold uppercase tracking-wide text-pizza-cream transition-colors hover:border-pizza-amber hover:text-pizza-amber sm:px-7 sm:py-3.5"
            >
              Ver Repertório
            </a>
          </div>
        </div>

        {/* Scroll cue: rotated label bottom-left on desktop, centered on mobile */}
        <div
          ref={scrollHintRef}
          className={
            isDesktop
              ? "absolute bottom-10 left-10 z-20 flex flex-col items-center gap-3 opacity-0 lg:left-16"
              : "absolute inset-x-0 bottom-[4%] z-20 flex flex-col items-center gap-2 opacity-0"
          }
        >
          <span className="scrollcue-line relative block h-9 w-px overflow-hidden bg-pizza-cream/25 text-pizza-amber" />
          <span
            className="font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-pizza-cream/60"
            style={isDesktop ? { writingMode: "vertical-rl" } : undefined}
          >
            Deslize
          </span>
        </div>
      </section>
    </>
  );
}
