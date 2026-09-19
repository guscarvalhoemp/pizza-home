"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { assemblyClips } from "@/content/media";
import { initAutoplayVideo } from "@/lib/autoplayVideo";
import Reveal from "./Reveal";

gsap.registerPlugin(ScrollTrigger);

export default function AssemblyShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!section || cards.length === 0) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const offRight = () => window.innerWidth * 1.1;
      const offLeft = () => -window.innerWidth * 1.1;

      gsap.set(cards, { x: offRight, autoAlpha: 1 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * (cards.length * 0.85)}`,
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Card i enters (right -> center) during [i, i+1] and leaves (center -> left)
      // during [i+1, i+2], so the next card is already arriving as it exits.
      cards.forEach((card, i) => {
        tl.fromTo(
          card,
          { x: offRight },
          { x: 0, duration: 1, ease: "power1.out" },
          i
        );
        if (i < cards.length - 1) {
          tl.to(card, { x: offLeft, duration: 1, ease: "power1.in" }, i + 1);
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="montagem"
      className="relative flex h-[100svh] flex-col overflow-hidden bg-pizza-linen pt-24 sm:pt-28"
    >
      <div className="relative z-10 flex-none px-6 sm:px-8 lg:px-14">
        <Reveal>
          <p className="mb-2 flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-pizza-clay">
            <span className="h-1.5 w-1.5 rounded-full bg-pizza-clay" />
            A montagem
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="max-w-lg font-serif text-2xl text-pizza-ink sm:text-4xl">
            Da massa ao forno, em tempo real.
          </h2>
        </Reveal>
      </div>

      <div className="relative min-h-0 flex-1">
        {assemblyClips.map((clip, i) => (
          <div
            key={clip.num}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 will-change-transform"
          >
            <div className="aspect-[3/4] h-[42svh] max-h-[460px] overflow-hidden rounded-[1.75rem] shadow-2xl shadow-pizza-ink/30 sm:h-[52svh]">
              <video
                ref={initAutoplayVideo}
                src={clip.video}
                poster={clip.poster}
                autoPlay
                muted
                loop
                playsInline
                aria-label={clip.alt}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-4 flex max-w-[300px] items-baseline gap-3 sm:max-w-sm">
              <span className="flex-none font-serif text-lg italic text-pizza-clay">
                {clip.num}
              </span>
              <p className="font-sans text-sm text-pizza-ink/80">{clip.line}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
