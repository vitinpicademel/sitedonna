import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { WhatsAppButton } from "@/components/layout/whatsapp-button"
import { LaunchCard } from "@/components/ui/launch-card"
import { PropertyCard } from "@/components/ui/property-card"
import type { Launch, Property } from "@/lib/types"
import launchesData from "@/data/launches.json"
import propertiesData from "@/data/properties.json"
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

  // Códigos vindos por querystring (?codigos=123,456)
  let selectedCodes = (codesParam ? String(codesParam) : "")
    .split(",")
    .map((s) => s.trim().toUpperCase())
    .filter(Boolean)

  // Se nenhum código foi passado na URL, usa os padrões da aplicação.
  // Você pode sobrescrever via .env.local: NEXT_PUBLIC_DEFAULT_LAUNCH_CODES=3622,1234
  if (!selectedCodes.length) {
    const defaultsRaw = process.env.NEXT_PUBLIC_DEFAULT_LAUNCH_CODES ?? "3622"
    const defaults = String(defaultsRaw)
      .split(",")
      .map((s) => s.trim().toUpperCase())
      .filter(Boolean)
    selectedCodes = defaults
  }

  const selectedSet = new Set(selectedCodes)
  let selectedProperties: Property[] = []
  if (selectedCodes.length) {
    // tenta primeiro no catálogo local
    const local = allProperties.filter((p) => p.code && selectedSet.has(String(p.code).toUpperCase()))
    selectedProperties.push(...local)
    const missing = selectedCodes.filter((c) => !local.some((p) => String(p.code).toUpperCase() === c))
    // busca faltantes via IMOVIEW e mapeia, garantindo aderência AO CÓDIGO EXATO
    for (const code of missing) {
      try {
        // Consulta nossa API interna, que tenta múltiplos endpoints do Imoview
        const base =
          process.env.NEXT_PUBLIC_SITE_URL ||
          process.env.SITE_URL ||
          (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
        const resp = await fetch(`${base}/api/imoview/properties`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          cache: "no-store",
          body: JSON.stringify({ codigo: code, numeroPagina: 1, numeroRegistros: 10 }),
        })
        if (!resp.ok) throw new Error(`IMOVIEW ${resp.status}`)
        const raw = await resp.json().catch(() => ({} as any))
        const arr = Array.isArray(raw)
          ? raw
          : (raw?.data ?? raw?.lista ?? raw?.items ?? raw?.result ?? raw?.imoveis ?? raw?.listaImoveis ?? (raw ? [raw] : []))

        // mapeia todos e procura somente o código exato solicitado
        const upperCode = String(code).toUpperCase()
        let exact: Property | undefined
        if (Array.isArray(arr)) {
          for (const dto of arr) {
            const p = mapImoviewToProperty(dto) as Property
            if (p?.code && String(p.code).toUpperCase() === upperCode) {
              exact = p
              break
            }
          }
        } else if (raw) {
          const p = mapImoviewToProperty(raw) as Property
          if (p?.code && String(p.code).toUpperCase() === upperCode) {
            exact = p
          }
        }

        if (exact) {
          selectedProperties.push(exact)
        } // se não achou o código exato, não adiciona nada para evitar mostrar imóvel incorreto
      } catch (e) {
        // silencia falhas individuais para não quebrar a página
        console.error("Erro ao buscar código", code, e)
        // Fallback opcional (desativado para garantir apenas código exato):
        // Se preferir ver um placeholder quando a API falhar, descomente abaixo.
        // selectedProperties.push({ ... })
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
