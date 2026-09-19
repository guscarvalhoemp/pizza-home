import HeroExperience from "@/components/HeroExperience";
import AssemblyShowcase from "@/components/AssemblyShowcase";
import MenuSection from "@/components/MenuSection";
import SplitSection from "@/components/SplitSection";
import ChefSection from "@/components/ChefSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CtaSection from "@/components/CtaSection";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { aboutMedia, aboutCorners } from "@/content/media";

export default function Home() {
  return (
    <main>
      <HeroExperience />

      <AssemblyShowcase />

      <MenuSection />

      <SplitSection
        id="sobre"
        eyebrow="Nos eventos"
        title="A criançada mete a mão na massa."
        lede="Durante o evento, o Chef Maicom chama as crianças para ajudar a abrir e montar as pizzas. Elas se divertem, os pais ficam tranquilos e a festa ganha ainda mais animação."
        bullets={[
          "Crianças ajudam na massa com todo o cuidado",
          "Pais aproveitam o evento com tranquilidade",
          "Uma atração que anima o evento inteiro",
        ]}
        media={aboutMedia}
        corners={aboutCorners}
        reverse
      />

      <ChefSection />

      <TestimonialsSection />

      <CtaSection />

      <SiteFooter />

      <WhatsAppFloat />
    </main>
  );
}
