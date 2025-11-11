import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { WhatsAppButton } from "@/components/layout/whatsapp-button"
import { LaunchCard } from "@/components/ui/launch-card"
import { PropertyCard } from "@/components/ui/property-card"
import type { Launch, Property } from "@/lib/types"
import launchesData from "@/data/launches.json"
import propertiesData from "@/data/properties.json"
import { getImoviewProperty } from "@/lib/imoview"
import { mapImoviewToProperty } from "@/lib/map-imoview"

export const metadata = {
  title: "Lançamentos - Donna Imobiliária",
  description: "Conheça os lançamentos exclusivos da Donna Imobiliária em Uberaba/MG",
}

type PageProps = {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function LaunchesPage({ searchParams }: PageProps) {
  const launches: Launch[] = launchesData
  const allProperties = propertiesData as unknown as Property[]

  // Permite selecionar imóveis por código via query string: /lancamentos?codigos=DON001,DON003
  const codesParam =
    (typeof searchParams?.codigos === "string" ? searchParams?.codigos : Array.isArray(searchParams?.codigos) ? searchParams?.codigos[0] : undefined) ??
    (typeof searchParams?.codes === "string" ? searchParams?.codes : Array.isArray(searchParams?.codes) ? searchParams?.codes[0] : undefined)

  const selectedCodes = (codesParam ? String(codesParam) : "")
    .split(",")
    .map((s) => s.trim().toUpperCase())
    .filter(Boolean)

  const selectedSet = new Set(selectedCodes)
  let selectedProperties: Property[] = []
  if (selectedCodes.length) {
    // tenta primeiro no catálogo local
    const local = allProperties.filter((p) => p.code && selectedSet.has(String(p.code).toUpperCase()))
    selectedProperties.push(...local)
    const missing = selectedCodes.filter((c) => !local.some((p) => String(p.code).toUpperCase() === c))
    // busca faltantes via IMOVIEW e mapeia
    for (const code of missing) {
      try {
        const raw = await getImoviewProperty(code)
        const arr =
          Array.isArray(raw)
            ? raw
            : (raw?.data ?? raw?.lista ?? raw?.items ?? raw?.result ?? raw?.imoveis ?? raw?.listaImoveis ?? (raw ? [raw] : []))
        const first = Array.isArray(arr) && arr.length ? arr[0] : raw
        if (first) {
          const mapped = mapImoviewToProperty(first)
          if (mapped?.code) {
            selectedProperties.push(mapped as Property)
          }
        }
      } catch (e) {
        // silencia falhas individuais para não quebrar a página
        console.error("Erro ao buscar código", code, e)
      }
    }
  }

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

          {selectedProperties.length > 0 ? (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-serif" style={{ color: "#D4A574" }}>
                  Destaques selecionados
                </h2>
                <p className="text-sm" style={{ color: "#F1E8E0" }}>
                  Exibindo somente os imóveis de código: {selectedCodes.join(", ")}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedProperties.map((prop) => (
                  <PropertyCard key={prop.id} property={prop as Property} />
                ))}
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {launches.map((launch) => (
                <LaunchCard key={launch.id} launch={launch} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
