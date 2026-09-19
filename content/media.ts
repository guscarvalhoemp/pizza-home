// Central "spot" registry: every real photo/video on the site is listed
// here. To swap media later, either replace the file at the given path
// (keeping the same name) or point `src`/`poster` at a new file you add
// under /public/media.

export type MenuItem = {
  id: string;
  category: "salgadas" | "doces";
  title: string;
  description: string;
  image: string;
};

export const menuCategories = [
  { id: "all", label: "Tudo" },
  { id: "salgadas", label: "Salgadas" },
  { id: "doces", label: "Doces" },
] as const;

export const menuItems: MenuItem[] = [
  {
    id: "carne-desfiada",
    category: "salgadas",
    title: "Carne Desfiada",
    description: "Muçarela, tomate cereja, cebola roxa e molho da casa.",
    image: "/media/menu-carne-desfiada.jpg",
  },
  {
    id: "especial-frango",
    category: "salgadas",
    title: "Especial da Casa",
    description: "Frango grelhado em cubos com dupla de queijos.",
    image: "/media/menu-especial-frango.jpg",
  },
  {
    id: "chocolate-morango",
    category: "doces",
    title: "Chocolate com Morango",
    description: "Chocolate meio amargo, morangos frescos e leite condensado.",
    image: "/media/menu-chocolate-morango.jpg",
  },
  {
    id: "quatro-queijos",
    category: "salgadas",
    title: "Quatro Queijos",
    description: "Blend generoso de queijos, gratinado até dourar.",
    image: "/media/menu-quatro-queijos.jpg",
  },
  {
    id: "gorgonzola",
    category: "salgadas",
    title: "Gorgonzola",
    description: "Muçarela e gorgonzola em ponto de derreter, direto do forno.",
    image: "/media/menu-gorgonzola.jpg",
  },
  {
    id: "file",
    category: "salgadas",
    title: "Filé ao Molho da Casa",
    description: "Tiras de filé grelhado sobre muçarela e molho da casa.",
    image: "/media/menu-file.jpg",
  },
];

export type AssemblyClip = {
  num: string;
  word: string;
  line: string;
  video: string;
  poster: string;
  alt: string;
};

export const assemblyClips: AssemblyClip[] = [
  {
    num: "01",
    word: "a massa",
    line: "A massa ganha forma na mão, sem pressa.",
    video: "/media/assembly-1.mp4",
    poster: "/media/assembly-1-poster.jpg",
    alt: "Chef abrindo a massa de pizza à mão",
  },
  {
    num: "02",
    word: "o molho",
    line: "O molho entra na medida certa, espiral por espiral.",
    video: "/media/assembly-2.mp4",
    poster: "/media/assembly-2-poster.jpg",
    alt: "Molho sendo espalhado à mão sobre a massa fresca",
  },
  {
    num: "03",
    word: "a cobertura",
    line: "E o queijo cobre cada canto antes do forno.",
    video: "/media/assembly-3.mp4",
    poster: "/media/assembly-3-poster.jpg",
    alt: "Queijo sendo adicionado à mão sobre a pizza",
  },
];

export type CornerPhoto = { src: string; alt: string; name: string };

export const aboutCorners: { left: CornerPhoto; right: CornerPhoto } = {
  left: {
    src: "/media/corner-familia-1.jpg",
    alt: "Chef Maicom com crianças segurando mini pizzas",
    name: "Mãos na massa",
  },
  right: {
    src: "/media/corner-convidados-2.jpg",
    alt: "Grupo de convidados reunidos à mesa",
    name: "Convidados",
  },
};

export const aboutMedia = {
  type: "video" as const,
  src: "/media/sobre-familia.mp4",
  poster: "/media/sobre-familia-poster.jpg",
  alt: "Chef e uma criança cortando uma pizza margherita juntos",
};

export const heroMedia = {
  h1: {
    src: "/media/hero-h1.mp4",
    poster: "/media/hero-h1-poster.jpg",
    alt: "Chef esticando a massa de pizza à mão",
  },
  h2: {
    src: "/media/hero-h2.mp4",
    poster: "/media/hero-h2-poster.jpg",
    alt: "Pizza saindo do forno a lenha",
  },
  h3: {
    src: "/media/hero-h3.mp4",
    poster: "/media/hero-h3-poster.jpg",
    alt: "Pizza pronta sendo servida",
  },
};

export const chefMedia = {
  image: "/media/chef-maicom.jpg",
  alt: "Chef Maicom Lima, especialista em massas napolitanas",
};

export const chefHighlights: string[] = [
  "Massa napolitana de fermentação lenta",
  "Estrutura completa levada até o seu evento",
  "Atende casamentos, aniversários e eventos corporativos",
];

export const testimonials = [
  {
    quote:
      "Contratamos para os 150 convidados do nosso casamento e foi a atração da noite. O Maicom cuidou de tudo, do forno ao último corte.",
    name: "Ana Beatriz e Rodrigo",
    role: "Casamento em outubro",
  },
  {
    quote:
      "Chamamos para o aniversário de 40 anos da empresa. A massa napolitana surpreendeu até os convidados mais exigentes.",
    name: "Rodrigo Alves",
    role: "Evento corporativo",
  },
  {
    quote:
      "A pizza de chocolate com morango fechou a festa com chave de ouro. Já reservamos o Maicom para o próximo evento da família.",
    name: "Camila Nogueira",
    role: "Aniversário de 15 anos",
  },
];
