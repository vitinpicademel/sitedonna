import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { WhatsAppButton } from "@/components/layout/whatsapp-button"
import { LaunchCard } from "@/components/ui/launch-card"
import type { Launch } from "@/lib/types"
import launchesData from "@/data/launches.json"

export const metadata = {
  title: "Lançamentos - Donna Imobiliária",
  description: "Conheça os lançamentos exclusivos da Donna Imobiliária em Uberaba/MG",
}

export default function LaunchesPage() {
  const launches: Launch[] = launchesData

  return (
    <div className="min-h-screen">
      <Header appearance="dark" />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold font-serif mb-2" style={{ color: "#D4A574" }}>
              Lançamentos
            </h1>
            <p className="text-lg" style={{ color: "#F1E8E0" }}>
              Encante-se com nossa seleção de lançamentos selecionados com carinho e cuidado pra vocês.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {launches.map((launch) => (
              <LaunchCard key={launch.id} launch={launch} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
