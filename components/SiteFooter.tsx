export default function SiteFooter() {
  return (
    <footer className="bg-pizza-ink px-6 py-14 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 border-t border-pizza-cream/10 pt-10 sm:flex-row sm:justify-between">
        <div className="max-w-xs">
          <a
            href="#hero"
            className="flex items-baseline gap-2 text-pizza-cream"
          >
            <span className="font-serif text-xl tracking-wide">PH</span>
            <span className="font-sans text-[11px] font-medium tracking-[0.3em] text-pizza-cream/60">
              PIZZA HOME
            </span>
          </a>
          <p className="mt-3 font-sans text-sm text-pizza-cream/50">
            A pizzaria artesanal do Chef Maicom Lima, montada dentro do seu
            evento.
          </p>
        </div>

        <div className="flex flex-wrap gap-10 sm:gap-16">
          <div>
            <h3 className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-pizza-cream/40">
              Explorar
            </h3>
            <ul className="flex flex-col gap-2 font-sans text-sm text-pizza-cream/70">
              <li>
                <a href="#cardapio" className="hover:text-pizza-amber">
                  Repertório
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-pizza-amber">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#chef" className="hover:text-pizza-amber">
                  O Chef
                </a>
              </li>
              <li>
                <a href="#depoimentos" className="hover:text-pizza-amber">
                  Depoimentos
                </a>
              </li>
              <li>
                <a href="#contato" className="hover:text-pizza-amber">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-pizza-cream/40">
              Contato
            </h3>
            <ul className="flex flex-col gap-2 font-sans text-sm text-pizza-cream/70">
              <li>Eventos particulares e corporativos</li>
              <li>Resposta em até 24 horas úteis</li>
              <li className="overflow-wrap-anywhere">
                contato@pizzahome.com.br
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-wrap justify-between gap-2 font-sans text-xs text-pizza-cream/40">
        <p>&copy; {new Date().getFullYear()} Pizza Home. Todos os direitos reservados.</p>
        <p className="font-serif text-sm text-pizza-amber/80">
          feita à mão, levada ao seu evento
        </p>
      </div>
    </footer>
  );
}
