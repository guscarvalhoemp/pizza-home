"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./Reveal";
import { chefHighlights, chefMedia } from "@/content/media";

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP_NUMBER = "5511999999999"; // TODO: troque pelo número real do WhatsApp
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Olá! Quero saber mais sobre levar o Chef Maicom para o meu evento."
);

export default function ChefSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const overlay = overlayRef.current;
    const image = imageRef.current;
    if (!section || !overlay || !image) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      gsap.set(overlay, { scaleY: 0 });
      return;
    }

    gsap.set(overlay, { transformOrigin: "bottom", scaleY: 1 });
    gsap.set(image, { scale: 1.15 });

    const ctx = gsap.context(() => {
      const trigger = {
        trigger: section,
        start: "top 85%",
        end: "top 25%",
        scrub: true,
      };
      gsap.to(overlay, { scaleY: 0, ease: "none", scrollTrigger: trigger });
      gsap.to(image, { scale: 1, ease: "none", scrollTrigger: trigger });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="chef"
      className="flex flex-col bg-pizza-sand md:min-h-[90vh] md:flex-row"
    >
      <div className="relative h-[62vh] overflow-hidden md:h-auto md:w-[45%]">
        <div ref={imageRef} className="absolute inset-0 will-change-transform">
          <img
            src={chefMedia.image}
            alt={chefMedia.alt}
            className="h-full w-full object-cover"
          />
        </div>
        <div
          ref={overlayRef}
          aria-hidden="true"
          className="absolute inset-0 bg-pizza-sand will-change-transform"
        />
      </div>

      <div className="flex flex-col justify-center px-6 py-16 sm:px-10 md:w-[55%] md:px-16">
        <Reveal>
          <p className="mb-3 flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-pizza-clay">
            <span className="h-1.5 w-1.5 rounded-full bg-pizza-clay" />O
            chef
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-serif text-3xl text-pizza-ink sm:text-4xl">
            Maicom Lima
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-1 font-sans text-sm font-medium uppercase tracking-[0.15em] text-pizza-ink/55">
            Chef especializado em massas napolitanas
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-5 max-w-md font-sans text-base text-pizza-ink/75">
            Maicom assina a cozinha da Pizza Home. Sua massa napolitana de
            fermentação lenta e o cuidado com cada etapa do preparo viraram a
            marca registrada dos eventos que ele atende, do forno à mesa,
            sempre com ele por perto.
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <ul className="mt-8 flex max-w-md flex-col gap-3">
            {chefHighlights.map((h) => (
              <li
                key={h}
                className="group flex items-center gap-3 rounded-xl border border-pizza-ink/15 px-4 py-3 font-sans text-sm text-pizza-ink/85 transition-colors hover:border-pizza-clay/60 hover:text-pizza-ink"
              >
                <span className="h-1.5 w-1.5 flex-none rounded-full bg-pizza-clay transition-transform group-hover:scale-125" />
                {h}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.2}>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
            target="_blank"
            rel="noopener"
            className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-pizza-clay px-6 py-3 font-sans text-sm font-semibold text-pizza-clay transition-colors hover:bg-pizza-clay hover:text-pizza-sand"
          >
            Levar o chef para o meu evento
            <span aria-hidden="true">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
