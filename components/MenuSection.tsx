"use client";

import { useState } from "react";
import { menuCategories, menuItems } from "@/content/media";
import Reveal from "./Reveal";

export default function MenuSection() {
  const [active, setActive] = useState<string>("all");
  const filtered =
    active === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === active);

  return (
    <section
      id="cardapio"
      className="relative overflow-hidden bg-pizza-sand px-6 py-24 sm:px-8"
      aria-labelledby="cardapio-titulo"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 40% at 50% 0%, rgba(200,132,58,0.16), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-3 flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-pizza-clay">
            <span className="h-1.5 w-1.5 rounded-full bg-pizza-clay" />O
            repertório
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            id="cardapio-titulo"
            className="max-w-xl font-serif text-3xl text-pizza-ink sm:text-4xl"
          >
            Sabores que já marcaram presença em eventos.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-lg font-sans text-base text-pizza-ink/75">
            Uma amostra do que o Chef Maicom Lima leva para casamentos,
            aniversários e eventos corporativos, sempre montado na hora.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div
            role="group"
            aria-label="Filtrar repertório"
            className="mt-8 flex flex-wrap gap-2.5"
          >
            {menuCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActive(cat.id)}
                className={`rounded-full border px-5 py-2 font-sans text-sm font-semibold transition-colors ${
                  active === cat.id
                    ? "border-pizza-ink bg-pizza-ink text-pizza-cream"
                    : "border-pizza-ink/25 text-pizza-ink/80 hover:border-pizza-clay hover:text-pizza-clay"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 md:grid-cols-3">
          {filtered.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.05}>
              <figure className="group m-0 flex flex-col items-center text-center">
                <span className="block w-full overflow-hidden rounded-[1.6rem] [aspect-ratio:3/4]">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </span>
                <figcaption className="relative z-10 -mt-5 max-w-[92%] rounded-full bg-pizza-ink px-4 py-1.5 font-serif text-sm font-semibold text-pizza-cream shadow-lg shadow-pizza-ink/30 sm:px-5 sm:text-base">
                  {item.title}
                </figcaption>
                <p className="mt-3 max-w-[22ch] font-sans text-xs text-pizza-ink/65 sm:text-sm">
                  {item.description}
                </p>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
