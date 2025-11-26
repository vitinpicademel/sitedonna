import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { WhatsAppButton } from "@/components/layout/whatsapp-button"
import { CondoCard } from "@/components/ui/condo-card"
import type { Condo } from "@/lib/types"
import condosData from "@/data/condos.json"

export const metadata = {
  title: "Condomínios - Donna Imobiliária",
  description: "Conheça os melhores condomínios disponíveis em Uberaba/MG",
}

export default function CondosPage() {
  const condos: Condo[] = condosData

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-donna-navy font-serif mb-2">Condomínios</h1>
            <p className="text-gray-600">
              Descubra os melhores condomínios com infraestrutura completa e localização privilegiada.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {condos.map((condo) => (
              <CondoCard key={condo.id} condo={condo} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
