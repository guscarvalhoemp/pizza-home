import Reveal from "./Reveal";

const WHATSAPP_NUMBER = "5511999999999"; // TODO: troque pelo número real do WhatsApp
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Olá! Quero levar a Pizza Home para o meu evento. Pode me passar mais detalhes?"
);

const infos = [
  { label: "Atendimento", value: "Eventos particulares e corporativos" },
  { label: "Resposta", value: "Em até 24 horas úteis" },
  { label: "E-mail", value: "contato@pizzahome.com.br" },
];

export default function CtaSection() {
  return (
    <section
      id="contato"
      className="bg-pizza-sand px-4 pb-16 pt-6 sm:px-8 sm:pb-24"
      aria-labelledby="contato-titulo"
    >
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-pizza-ink sm:rounded-[2.75rem]">
        <img
          src="/media/assembly-3-poster.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-pizza-ink via-pizza-ink/80 to-pizza-ink/40 md:bg-gradient-to-r md:from-pizza-ink md:via-pizza-ink/85 md:to-pizza-ink/30"
        />
        <div
          aria-hidden="true"
          className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-pizza-amber/25 blur-3xl"
        />

        <div className="relative flex flex-col items-center px-6 py-16 text-center sm:px-12 md:items-start md:px-16 md:py-24 md:text-left">
          <Reveal>
            <p className="mb-4 flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-pizza-amber">
              <span className="h-1.5 w-1.5 rounded-full bg-pizza-amber" />
              Solicitar orçamento
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              id="contato-titulo"
              className="max-w-xl font-serif text-4xl leading-[1.08] text-pizza-cream sm:text-5xl"
            >
              Conte a data do seu evento.{" "}
              <em className="italic text-pizza-amber">O resto é com o chef.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-md font-sans text-base text-pizza-cream/75">
              Fale agora no WhatsApp e receba uma proposta sob medida para
              casamentos, aniversários e eventos corporativos.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-3 rounded-full bg-pizza-amber px-7 py-4 font-sans text-base font-semibold text-pizza-ink transition-transform hover:scale-105"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.05-1.36A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3 .8.8-2.93-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.13c-.24-.12-1.44-.71-1.67-.79-.22-.08-.38-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.35-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.42-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.03 0 1.2.87 2.35 1 2.51.12.16 1.7 2.6 4.13 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
                </svg>
                Chamar no WhatsApp
              </a>
              <a
                href="#cardapio"
                className="rounded-full border border-pizza-cream/35 px-7 py-4 font-sans text-base font-semibold text-pizza-cream transition-colors hover:border-pizza-amber hover:text-pizza-amber"
              >
                Ver repertório
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="mt-12 w-full">
            <dl className="grid gap-3 text-left sm:grid-cols-3">
              {infos.map((info) => (
                <div
                  key={info.label}
                  className="rounded-2xl border border-pizza-cream/15 bg-pizza-cream/5 px-5 py-4 backdrop-blur-sm"
                >
                  <dt className="mb-1 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-pizza-amber">
                    {info.label}
                  </dt>
                  <dd className="break-words font-sans text-sm text-pizza-cream/85">
                    {info.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
