"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initAutoplayVideo } from "@/lib/autoplayVideo";
import type { CornerPhoto } from "@/content/media";
import Reveal from "./Reveal";

gsap.registerPlugin(ScrollTrigger);

type Media =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster: string; alt: string };

function CornerCard({
  photo,
  className,
  tall,
  drift,
}: {
  photo: CornerPhoto;
  className: string;
  tall?: boolean;
  drift: number;
}) {
  return (
    <div
      data-corner
      data-drift={drift}
      className={`absolute z-20 w-[7.25rem] sm:w-36 md:w-40 lg:w-48 ${className}`}
    >
      <div
        data-corner-in
        className="rounded-[1.5rem] bg-white/40 p-1.5 shadow-[0_24px_50px_-18px_rgba(44,24,16,0.45)] ring-1 ring-white/70 backdrop-blur-md sm:rounded-[1.9rem] sm:p-2"
      >
        <div
          className={`relative overflow-hidden rounded-[1.1rem] sm:rounded-[1.4rem] ${
            tall ? "aspect-[3/4]" : "aspect-square"
          }`}
        >
          <img
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <span className="absolute inset-x-2 bottom-2 rounded-full border border-white/70 bg-white/50 py-1 text-center font-serif text-xs italic text-pizza-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-md sm:inset-x-3 sm:bottom-3 sm:py-1.5 sm:text-base">
            {photo.name}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function SplitSection({
  id,
  eyebrow,
  title,
  lede,
  bullets,
  media,
  reverse = false,
  corners,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lede: string;
  bullets: string[];
  media: Media;
  reverse?: boolean;
  corners?: { left: CornerPhoto; right: CornerPhoto };
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mediaRef.current;
    const section = sectionRef.current;
    if (!el || !section) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>("[data-corner]", section).forEach((card) => {
        const drift = Number(card.dataset.drift ?? 12);
        gsap.fromTo(
          card,
          { yPercent: -drift },
          {
            yPercent: drift,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          }
        );
        const inner = card.querySelector("[data-corner-in]");
        if (inner) {
          gsap.from(inner, {
            opacity: 0,
            scale: 0.8,
            y: 30,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 75%", once: true },
          });
        }
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`flex flex-col bg-pizza-linen md:min-h-[85vh] md:flex-row ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="relative md:w-1/2">
        <div className="relative h-[46vh] overflow-hidden md:absolute md:inset-0 md:h-auto">
          <div
            ref={mediaRef}
            className="absolute -top-[10%] inset-x-0 h-[120%] will-change-transform"
          >
            {media.type === "video" ? (
              <video
                ref={initAutoplayVideo}
                className="h-full w-full object-cover"
                src={media.src}
                poster={media.poster}
                autoPlay
                muted
                loop
                playsInline
                aria-label={media.alt}
              />
            ) : (
              <img
                className="h-full w-full object-cover"
                src={media.src}
                alt={media.alt}
                loading="lazy"
              />
            )}
          </div>
        </div>

        {corners && (
          <>
            <CornerCard
              photo={corners.left}
              tall
              drift={28}
              className="-top-6 left-3 md:-left-10 md:-top-10"
            />
            <CornerCard
              photo={corners.right}
              drift={-32}
              className="-bottom-8 right-3 md:-bottom-12 md:right-5"
            />
          </>
        )}
      </div>

      <div className="flex flex-col justify-center px-6 py-16 sm:px-10 md:w-1/2 md:px-14">
        <Reveal>
          <p className="mb-3 flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-pizza-clay">
            <span className="h-1.5 w-1.5 rounded-full bg-pizza-clay" />
            {eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="max-w-md font-serif text-3xl text-pizza-ink sm:text-4xl">
            {title}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-md font-sans text-base text-pizza-ink/75">
            {lede}
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <ul className="mt-6 flex max-w-md flex-col gap-2.5">
            {bullets.map((b) => (
              <li
                key={b}
                className="relative pl-5 font-sans text-sm text-pizza-ink/75"
              >
                <span className="absolute left-0 top-[0.6em] h-1.5 w-1.5 rounded-full bg-pizza-clay" />
                {b}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
