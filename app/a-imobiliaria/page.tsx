import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { WhatsAppButton } from "@/components/layout/whatsapp-button"
import { AboutHero } from "@/components/sections/about-hero"
import { RevealProvider } from "@/components/reveal-provider"
import { MissionSection } from "@/components/sections/mission-section"
import { TeamSection } from "@/components/sections/team-section"
import { CompanyTestimonialsSection } from "@/components/sections/company-testimonials-section"

export const metadata = {
  title: "A Imobiliária - Donna Imobiliária",
  description:
    "Conheça a história, missão e equipe da Donna Imobiliária. Mais de 10 anos conectando pessoas aos seus sonhos.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <RevealProvider />
      <Header appearance="dark" />
      <main>
        <div className="reveal">
          <AboutHero />
        </div>
        <div className="reveal">
          <MissionSection />
        </div>
        <div className="reveal">
          <TeamSection />
        </div>
        <div className="reveal">
          <CompanyTestimonialsSection />
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
