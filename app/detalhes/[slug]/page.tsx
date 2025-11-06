import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import PropertyGallery from "@detalhes/components/property-gallery"
import PropertyDetails from "@detalhes/components/property-details"
import PropertySidebar from "@detalhes/components/property-sidebar"
import ContactSection from "@detalhes/components/contact-section"
import RelatedProperties from "@detalhes/components/related-properties"
import WhatsAppButton from "@detalhes/components/whatsapp-button"
import { Toaster } from "@detalhes/components/ui/toaster"
import { mapImoviewToProperty } from "@/lib/map-imoview"
import { getImoviewProperty } from "@/lib/imoview"
import type { Property } from "@/lib/types"

interface PageProps {
  params: { slug: string }
}

// Mantemos metadados básicos; após carregar o imóvel, definimos no head dinâmico
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return { title: `Imóvel ${params.slug} - Detalhes` }
}

function extractSingle(payload: any) {
  if (!payload) return undefined
  const list = Array.isArray(payload?.lista)
    ? payload.lista
    : Array.isArray(payload?.data)
      ? payload.data
      : Array.isArray(payload?.imoveis)
        ? payload.imoveis
        : Array.isArray(payload?.items)
          ? payload.items
          : Array.isArray(payload?.result)
            ? payload.result
            : Array.isArray(payload?.listaImoveis)
              ? payload.listaImoveis
              : Array.isArray(payload?.dados)
                ? payload.dados
                : Array.isArray(payload)
                  ? payload
                  : []
  if (Array.isArray(list) && list.length) return list[0]
  if (payload && typeof payload === 'object' && (payload.codigo || payload.Codigo)) return payload
  return undefined
}

function extractListAndTotal(payload: any): { list: any[]; total?: number } {
  if (Array.isArray(payload)) return { list: payload, total: payload.length }
  const total = payload?.quantidade ?? payload?.quantidadeTotal ?? payload?.total ?? payload?.count ?? payload?.Total
  const candidates = [payload?.lista, payload?.data, payload?.items, payload?.result, payload?.imoveis, payload?.listaImoveis, payload?.ListaImoveis]
  for (const arr of candidates) {
    if (Array.isArray(arr)) return { list: arr, total }
  }
  if (payload && typeof payload === 'object') {
    for (const value of Object.values(payload)) {
      const res = extractListAndTotal(value)
      if (res.list.length) return res
    }
  }
  return { list: [], total }
}

async function fetchImoviewByCodeServer(code: string) {
  const baseApp = (process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL || "http://localhost:3000").replace(/^https?:\/\//, "http://")
  const normalize = (v: any) => String(v ?? "").toUpperCase().replace(/[^A-Z0-9]/g, "").trim()
  const target = normalize(code)
  try {
    // 1) Usa nossa rota interna (garante mesmo comportamento da listagem)
    const resp1 = await fetch(`${baseApp}/api/imoview/properties`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ codigo: code, numeroPagina: 1, numeroRegistros: 1 }),
      cache: "no-store",
    })
    if (resp1.ok) {
      const json = await resp1.json()
      const arr = Array.isArray((json as any)?.data)
        ? (json as any).data
        : Array.isArray((json as any)?.lista)
          ? (json as any).lista
          : Array.isArray(json as any)
            ? (json as any)
            : []
      if (arr.length) {
        const found = arr.find((x: any) => normalize((x as any)?.codigo) === target)
        if (found) return found
      }
      if (json && !Array.isArray(json) && normalize((json as any)?.codigo) === target) return json
    }
  } catch {}
  try {
    const json = await getImoviewProperty(code)
    const list = Array.isArray((json as any)?.data)
      ? (json as any).data
      : Array.isArray((json as any)?.lista)
        ? (json as any).lista
        : Array.isArray(json as any)
          ? (json as any)
          : Array.isArray((json as any)?.items)
            ? (json as any).items
            : Array.isArray((json as any)?.result)
              ? (json as any).result
              : Array.isArray((json as any)?.imoveis)
                ? (json as any).imoveis
                : Array.isArray((json as any)?.listaImoveis)
                  ? (json as any).listaImoveis
                  : []
    if (Array.isArray(list) && list.length) {
      const found = list.find((x: any) => normalize((x as any)?.codigo) === target)
      if (found) return found
    }
    if (json && !(Array.isArray(json)) && normalize((json as any)?.codigo) === target) return json as any
  } catch {}
  // Busca paginada como fallback robusto
  try {
    const perPage = 20
    let page = 1
    let total = Infinity as number
    while (page <= 50 && page <= Math.ceil(total / perPage)) {
      // preferir a rota interna para manter consistência
      const resp = await fetch(`${baseApp}/api/imoview/properties`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ numeroPagina: page, numeroRegistros: perPage }),
        cache: "no-store",
      })
      const res = resp.ok ? await resp.json() : {}
      const list = Array.isArray((res as any)?.data)
        ? (res as any).data
        : Array.isArray((res as any)?.lista)
          ? (res as any).lista
          : Array.isArray(res as any)
            ? (res as any)
            : []
      const found = list.find((dto: any) => normalize(dto?.codigo) === target)
      if (found) return found
      const rTotal = (res as any)?.total ?? (res as any)?.quantidade ?? (res as any)?.count
      if (typeof rTotal === 'number') total = rTotal
      if (!Array.isArray(list) || list.length < perPage) break
      page += 1
    }
  } catch {}
  return undefined
}

export default async function DetalhesPage({ params }: PageProps) {
  const dto = await fetchImoviewByCodeServer(params.slug)
  const property = dto ? (mapImoviewToProperty(dto) as unknown as Property) : null

  const images = Array.isArray(property?.media) && property!.media!.length
    ? property!.media!
    : Array.isArray((dto as any)?.fotos) && (dto as any).fotos.length
      ? (dto as any).fotos.map((f: any) => ({ url: f?.url || f?.link || f?.caminho }))
      : []
  const price = property?.status === "Venda" ? property?.priceSale : property?.priceRent

  // Sugestões (lado servidor) – busca no CRM usando a rota interna (mesma da página /imoveis)
  let suggestions: any[] = []
  try {
    const FIXED_CODES = ["6963", "6967", "9178"]
    const FALLBACK_DATA: Record<string, any> = {
      "6963": {
        id: "6963",
        slug: "6963",
        title: "Casa à venda no Cyrela Landscape I",
        image: "https://cdn.imoview.com.br/donna/Imoveis/6963/1162c-img-0726-1750267863.png?1750268190",
        neighborhood: "Cyrela Landscape",
        city: "Uberaba",
        state: "MG",
        bedrooms: 4,
        suites: 4,
        bathrooms: 4,
        area: "223.05m²",
        price: 2380000,
        code: "6963",
        type: "Casa em condomínio",
        status: "Venda",
      },
      "6967": {
        id: "6967",
        slug: "6967",
        title: "Casa à venda no Cyrela Landscape II",
        image: "https://cdn.imoview.com.br/donna/Imoveis/6967/1162c-img-0726-1750267863.png?1750268190",
        neighborhood: "Cyrela Landscape",
        city: "Uberaba",
        state: "MG",
        bedrooms: 4,
        suites: 3,
        bathrooms: 4,
        area: "225m²",
        price: 2250000,
        code: "6967",
        type: "Casa em condomínio",
        status: "Venda",
      },
      "9178": {
        id: "9178",
        slug: "9178",
        title: "Apartamento à venda no Jardim Europa",
        image: "https://cdn.imoview.com.br/donna/Imoveis/9178/d6hmr-whatsapp-image-2025-08-14-at-164703-1-1755201171.jpeg?1755201172",
        neighborhood: "São Sebastião",
        city: "Uberaba",
        state: "MG",
        bedrooms: 4,
        suites: 4,
        bathrooms: 5,
        area: "310m²",
        price: 1300000,
        code: "9178",
        type: "Apartamento",
        status: "Venda",
      },
    }

    const items = await Promise.all(
      FIXED_CODES.map(async (code) => {
        const raw = await fetchImoviewByCodeServer(code)
        return extractSingle(raw)
      })
    )
    const valid = items.filter(Boolean) as any[]
    const normalized = valid
      .map((dto: any) => mapImoviewToProperty(dto) as any)
      .filter((p: any) => p?.code && p?.title)
      .filter((p: any) => p?.code !== ((dto as any)?.codigo || property?.code))

    const unique = new Map<string, any>()
    for (const p of normalized) {
      const key = String(p.code)
      if (!unique.has(key)) unique.set(key, {
        id: p.id,
        slug: p.slug,
        title: p.title,
        image: p.media?.[0]?.url,
        neighborhood: p.address?.neighborhood,
        city: p.address?.city,
        state: p.address?.state,
        bedrooms: p.bedrooms,
        suites: p.suites,
        bathrooms: p.bathrooms,
        area: p.areaPrivativa || p.areaTotal ? `${p.areaPrivativa || p.areaTotal}m²` : undefined,
        price: p.priceSale || p.priceRent,
        code: p.code,
        type: p.type,
        status: p.status,
      })
    }

    // Garante que todos os códigos fixos apareçam (usando fallback se a API não retornar)
    for (const code of FIXED_CODES) {
      if (!unique.has(code) && FALLBACK_DATA[code]) {
        unique.set(code, FALLBACK_DATA[code])
      }
    }

    suggestions = Array.from(unique.values()).slice(0, 3)
  } catch {}

  if (!suggestions.length) {
    suggestions = [
      {
        id: "6963",
        slug: "6963",
        title: "Casa à venda no Cyrela Landscape I",
        image: "https://cdn.imoview.com.br/donna/Imoveis/6963/1162c-img-0726-1750267863.png?1750268190",
        neighborhood: "Cyrela Landscape",
        city: "Uberaba",
        state: "MG",
        bedrooms: 4,
        suites: 4,
        bathrooms: 4,
        area: "223.05m²",
        price: 2380000,
        code: "6963",
        type: "Casa em condomínio",
        status: "Venda",
      },
      {
        id: "6967",
        slug: "6967",
        title: "Casa à venda no Cyrela Landscape II",
        image: "https://cdn.imoview.com.br/donna/Imoveis/6967/1162c-img-0726-1750267863.png?1750268190",
        neighborhood: "Cyrela Landscape",
        city: "Uberaba",
        state: "MG",
        bedrooms: 4,
        suites: 3,
        bathrooms: 4,
        area: "225m²",
        price: 2250000,
        code: "6967",
        type: "Casa em condomínio",
        status: "Venda",
      },
      {
        id: "9178",
        slug: "9178",
        title: "Casa à venda no Jardim Europa",
        image: "https://cdn.imoview.com.br/donna/Imoveis/9178/1162c-img-0726-1750267863.png?1750268190",
        neighborhood: "Jardim Europa",
        city: "Uberaba",
        state: "MG",
        bedrooms: 3,
        suites: 1,
        bathrooms: 3,
        area: "180m²",
        price: 650000,
        code: "9178",
        type: "Casa",
        status: "Venda",
      },
    ]
  }

  return (
    <div className="min-h-screen detalhes-route">
      <Header appearance="dark" />
      <main className="container mx-auto px-4 py-8">
        <PropertyGallery images={images} status={property?.status} variant="multi" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <PropertyDetails property={property || {
              code: (dto as any)?.codigo,
              title: (dto as any)?.titulo || (dto as any)?.nome,
              address: {
                neighborhood: (dto as any)?.bairro,
                city: (dto as any)?.cidade,
                state: (dto as any)?.estado || (dto as any)?.uf,
              },
              bedrooms: Number((dto as any)?.quartos || 0) || undefined,
              suites: Number((dto as any)?.suites || 0) || undefined,
              bathrooms: Number((dto as any)?.banheiros || 0) || undefined,
              areaPrivativa: Number((dto as any)?.areaprivativa || (dto as any)?.areautil || 0) || undefined,
              areaTotal: Number((dto as any)?.areatotal || (dto as any)?.areaTerreno || 0) || undefined,
              parking: Number((dto as any)?.vagas || 0) || undefined,
              description: (dto as any)?.descricao || (dto as any)?.obs,
            }} />
          </div>
          <div className="lg:col-span-1">
            {/* Força o container do preço a usar o mesmo card dos detalhes */}
            <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)] p-6">
              <PropertySidebar
                price={price || Number((dto as any)?.valor?.toString().replace(/\D/g, ""))}
                iptu={property?.iptu || Number((dto as any)?.iptu?.toString().replace(/\D/g, ""))}
                condoFee={property?.condoFee || Number((dto as any)?.condominio?.toString().replace(/\D/g, ""))}
              />
            </div>
          </div>
        </div>
        <ContactSection />
        <RelatedProperties
          basePrice={price || Number((dto as any)?.valor?.toString().replace(/\D/g, ""))}
          currentCode={(dto as any)?.codigo?.toString()}
          items={suggestions}
        />
      </main>
      <WhatsAppButton />
      <Toaster />
    </div>
  )
}


