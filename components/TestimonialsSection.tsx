"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { testimonials } from "@/content/media";
import Reveal from "./Reveal";

const AUTOPLAY_MS = 6000;

export default function TestimonialsSection() {
  const trackRef = useRef<HTMLUListElement>(null);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);
  const [index, setIndex] = useState(0);

  const goTo = (next: number) => {
    const total = testimonials.length;
    const wrapped = (next + total) % total;
    indexRef.current = wrapped;
    setIndex(wrapped);
    const track = trackRef.current;
    if (!track) return;
    gsap.to(track, {
      xPercent: -100 * wrapped,
      duration: 0.75,
      ease: "power3.inOut",
    });
  };

  const stopAutoplay = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const startAutoplay = () => {
    stopAutoplay();
    if (testimonials.length < 2) return;
    timerRef.current = setInterval(() => {
      goTo(indexRef.current + 1);
    }, AUTOPLAY_MS);
  };

  useEffect(() => {
    startAutoplay();
    return stopAutoplay;
  }, []);

  const manualGoTo = (next: number) => {
    goTo(next);
    startAutoplay();
  };

  return (
    <section
      id="depoimentos"
      className="relative overflow-hidden bg-pizza-linen px-6 py-24 sm:px-8"
      aria-labelledby="depoimentos-titulo"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 45% at 50% 100%, rgba(200,132,58,0.18), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="mb-3 flex items-center justify-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-pizza-clay">
            <span className="h-1.5 w-1.5 rounded-full bg-pizza-clay" />
            Depoimentos
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            id="depoimentos-titulo"
            className="font-serif text-3xl text-pizza-ink sm:text-4xl"
          >
            Quem já contratou, recomenda.
          </h2>
        </Reveal>
      </div>

      <div
        className="relative mx-auto mt-14 max-w-3xl"
        onMouseEnter={stopAutoplay}
        onMouseLeave={startAutoplay}
        onFocus={stopAutoplay}
        onBlur={startAutoplay}
        onTouchStart={(e) => {
          stopAutoplay();
          touchStartX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          const delta = e.changedTouches[0].clientX - touchStartX.current;
          if (Math.abs(delta) > 40) {
            manualGoTo(indexRef.current + (delta < 0 ? 1 : -1));
          } else {
            startAutoplay();
          }
        }}
      >
        <div className="overflow-hidden">
          <ul
            ref={trackRef}
            className="flex"
            style={{ willChange: "transform" }}
          >
            {testimonials.map((t) => (
              <li key={t.name} className="w-full flex-none px-1 sm:px-8">
                <figure className="m-0 text-center">
                  <blockquote>
                    <p className="mx-auto max-w-xl font-serif text-xl leading-relaxed text-pizza-ink sm:text-2xl">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </blockquote>
                  <figcaption className="mt-5">
                    <p className="font-sans text-sm font-semibold tracking-wide text-pizza-clay">
                      {t.name}
                    </p>
                    <p className="font-sans text-xs text-pizza-ink/55">
                      {t.role}
                    </p>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-9 flex items-center justify-center gap-6">
          <button
            type="button"
            aria-label="Depoimento anterior"
            onClick={() => manualGoTo(index - 1)}
            className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-pizza-ink/25 text-pizza-ink transition-colors hover:border-pizza-clay hover:text-pizza-clay"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M10 2L4 8L10 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="flex items-center gap-2.5" role="tablist" aria-label="Selecionar depoimento">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Ir para depoimento ${i + 1}`}
                onClick={() => manualGoTo(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-6 bg-pizza-clay"
                    : "w-2.5 bg-pizza-ink/20 hover:bg-pizza-ink/40"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Próximo depoimento"
            onClick={() => manualGoTo(index + 1)}
            className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-pizza-ink/25 text-pizza-ink transition-colors hover:border-pizza-clay hover:text-pizza-clay"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M6 2L12 8L6 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
