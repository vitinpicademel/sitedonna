"use client"

import { Bed, Bath, Maximize } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"
import { mapImoviewToProperty } from "@/lib/map-imoview"
import { formatCurrency } from "@/lib/utils/currency"
import type { Property } from "@/lib/types"
import { PropertyCard as NvPropertyCard } from "@nv/components/property-card"

type Card = {
  id: string
  title: string
  image: string
  neighborhood?: string
  bedrooms?: number
  suites?: number
  bathrooms?: number
  area?: string | number
  price?: number
  slug?: string
  code?: string
}

// Mesma função da página /imoveis
function extractListAndTotal(json: any): { list: any[]; total?: number } {
  if (Array.isArray(json)) return { list: json, total: json.length }
  const totalCandidates = (o: any) => o?.quantidade ?? o?.quantidadeTotal ?? o?.total ?? o?.count ?? o?.Total
  
  // Prioriza lista (formato Imoview)
  if (Array.isArray(json?.lista)) return { list: json.lista, total: totalCandidates(json) }
  if (Array.isArray(json?.data)) return { list: json.data, total: totalCandidates(json) }
  if (Array.isArray(json?.data?.lista)) return { list: json.data.lista, total: totalCandidates(json?.data) }
  if (Array.isArray(json?.items)) return { list: json.items, total: totalCandidates(json) }
  if (Array.isArray(json?.result)) return { list: json.result, total: totalCandidates(json) }
  if (Array.isArray((json as any)?.imoveis)) return { list: (json as any).imoveis, total: totalCandidates(json) }
  if (Array.isArray((json as any)?.Imoveis)) return { list: (json as any).Imoveis, total: totalCandidates(json) }
  if (Array.isArray((json as any)?.listaImoveis)) return { list: (json as any).listaImoveis, total: totalCandidates(json) }
  if (Array.isArray((json as any)?.ListaImoveis)) return { list: (json as any).ListaImoveis, total: totalCandidates(json) }
  if (Array.isArray((json as any)?.Dados)) return { list: (json as any).Dados, total: totalCandidates(json) }
  
  if (json && typeof json === 'object') {
    for (const [k, v] of Object.entries(json)) {
      if (Array.isArray(v) && v.length && typeof v[0] === 'object') {
        const first = v[0] as any
        if ('codigo' in first || 'id' in first || 'titulo' in first || 'nome' in first) {
          return { list: v as any[], total: totalCandidates(json) }
        }
      }
      if (v && typeof v === 'object') {
        const res = extractListAndTotal(v)
        if (res.list.length) return res
      }
    }
  }
  return { list: [], total: 0 }
}

export default function RelatedProperties({ basePrice, currentCode, items: initialItems }: { basePrice?: number; currentCode?: string; items?: Card[] }) {
  const [isVisible, setIsVisible] = useState(false)
  const [cards, setCards] = useState<Card[]>(initialItems ?? [])
  const sectionRef = useRef<HTMLDivElement>(null)

  // animação ao entrar na tela
  useEffect(() => {
    if (initialItems && initialItems.length) {
      setCards(initialItems)
      setIsVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Códigos fixos do CRM para forçar sugestões reais
  const FIXED_CODES: string[] = ["8671", "9178", "6967"]

  async function fetchByCodeFromApi(code: string, signal?: AbortSignal): Promise<any | undefined> {
    try {
      const resp = await fetch(`/api/imoview/properties`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codigo: code, numeroPagina: 1, numeroRegistros: 1 }),
        cache: "no-store",
        signal,
      })
      const json = await resp.json().catch(() => ({}))
      const { list } = extractListAndTotal(json)
      if (Array.isArray(list) && list.length) return list[0]
      // Algumas instalações retornam um único objeto
      if (json && !Array.isArray(json) && (json as any)?.codigo) return json
    } catch {}
    return undefined
  }

  useEffect(() => {
    if (initialItems && initialItems.length > 0) {
      setCards(initialItems)
      return
    }
    // Sempre tenta buscar do CRM via API primeiro (ignora initialItems local)
    const controller = new AbortController()
    let mounted = true

    async function load() {
      try {
        // 1) Tenta buscar especificamente pelos códigos fixos do CRM
        const fixedResults = await Promise.all(
          FIXED_CODES.map((c) => fetchByCodeFromApi(c, controller.signal))
        )
        const fixedValid = fixedResults.filter(Boolean)
        if (fixedValid.length) {
          const normalized = fixedValid
            .map((dto: any) => mapImoviewToProperty(dto) as unknown as Property)
            .filter((p: Property) => p?.code && p?.title)

          const mapped: Card[] = normalized.map((p: Property) => ({
            id: p.id,
            slug: p.slug,
            title: p.title,
            image: p.media?.[0]?.url || "/placeholder.jpg",
            neighborhood: p.address?.neighborhood,
            bedrooms: p.bedrooms,
            suites: p.suites,
            bathrooms: p.bathrooms,
            area: p.areaPrivativa || p.areaTotal || 0,
            price: p.status === "Venda" ? p.priceSale : p.priceRent,
            code: p.code,
          }))

          // Respeita a ordem FIXED_CODES
          const ordered = FIXED_CODES
            .map((code) => mapped.find((m) => (m.code || "").toString() === code))
            .filter(Boolean)
            .slice(0, 3) as Card[]

          if (ordered.length) {
            setCards(ordered)
            return
          }
        }

        // 2) Fallback: fluxo atual (busca ampla)
        const resp = await fetch(`/api/imoview/properties`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ numeroPagina: 1, numeroRegistros: 60 }),
          signal: controller.signal,
          cache: "no-store",
        })
        
        if (controller.signal.aborted || !mounted) return
        
        const json = await resp.json().catch(() => ({}))
        const { list: apiList } = extractListAndTotal(json)
        if (!apiList || apiList.length === 0) return

        console.log("API retornou:", apiList.length, "imóveis reais do CRM (status:", resp.status, ")")

        const normalized = apiList
          .map((dto: any) => mapImoviewToProperty(dto) as unknown as Property)
          .filter((p: Property) => p?.code && p?.title)
          .filter((p: Property) => p?.code !== currentCode)

        if (normalized.length === 0) {
          console.log("Nenhum imóvel normalizado após filtro")
          return
        }

        console.log("Normalizados:", normalized.length)

        const mapped: Card[] = normalized
          .map((p: Property) => ({
            id: p.id,
            slug: p.slug,
            title: p.title,
            image: p.media?.[0]?.url || "/placeholder.jpg",
            neighborhood: p.address?.neighborhood,
            bedrooms: p.bedrooms,
            suites: p.suites,
            bathrooms: p.bathrooms,
            area: p.areaPrivativa || p.areaTotal || 0,
            price: p.status === "Venda" ? p.priceSale : p.priceRent,
            code: p.code,
          }))

        let filtered: Card[] = mapped
        if (basePrice) {
          const min = basePrice * 0.8
          const max = basePrice * 1.2
          const similar = mapped
            .filter((c: Card) => c.price && c.price > 0 && c.price >= min && c.price <= max)
            .sort((a: Card, b: Card) => Math.abs((a.price || 0) - basePrice) - Math.abs((b.price || 0) - basePrice))
          
          if (similar.length > 0) {
            filtered = similar
          } else {
            filtered = mapped
              .filter((c: Card) => !c.price || c.price > 0)
              .sort((a: Card, b: Card) => {
                if (!a.price && !b.price) return 0
                if (!a.price) return 1
                if (!b.price) return -1
                return Math.abs(a.price - basePrice) - Math.abs(b.price - basePrice)
              })
          }
        } else {
          filtered = mapped
        }

        // Embaralha e pega 3 aleatórios
        const shuffled = [...filtered].sort(() => Math.random() - 0.5)
        const selected = shuffled.slice(0, 3)
        const final = selected.length > 0 ? selected : filtered.slice(0, 3)

        console.log("Cards finais DO CRM:", final.length, final.map(c => c.code))

        if (mounted && !controller.signal.aborted && final.length > 0) {
          setCards(final)
        }
      } catch (e: any) {
        if (e?.name === "AbortError" || controller.signal.aborted || !mounted) {
          return
        }
        console.error("Erro ao buscar imóveis sugeridos:", e?.message)
      }
    }
    
    // Sempre busca, independentemente do que veio do servidor
    load()
    
    return () => {
      mounted = false
      controller.abort()
    }
  }, [basePrice, currentCode, initialItems])

  const items = useMemo(() => cards, [cards])

  const cardData = useMemo(() => {
    return items.map((p) => {
      const priceNumber = typeof p.price === "number" ? p.price : undefined
      const areaNumber = typeof p.area === "string"
        ? Number(p.area.replace(/[^0-9.,]/g, "").replace(",", ".")) || 0
        : typeof p.area === "number"
          ? p.area
          : 0
      const locationParts = [p.neighborhood, p.city, p.state].filter(Boolean)
      const location = locationParts.length ? locationParts.join(", ") : ""
      const purpose: "venda" | "aluguel" = (p.status === "Aluguel" ? "aluguel" : "venda")
      return {
        id: p.code || p.id || Math.random().toString(36).slice(2),
        code: p.code || "",
        title: p.title,
        type: p.type || "Imóvel",
        location,
        price: priceNumber ? formatCurrency(priceNumber) : "A consultar",
        bedrooms: p.bedrooms ?? 0,
        bathrooms: p.bathrooms ?? 0,
        suites: p.suites ?? 0,
        area: areaNumber,
        image: p.image || "/placeholder.svg",
        purpose,
      }
    })
  }, [items])

  if (cardData.length === 0) return null

  return (
    <div ref={sectionRef} className={`mt-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)] p-6 md:p-8">
        <h2 className="text-2xl font-light mb-6 text-balance">
          <span className="text-[var(--primary)]">Imóveis</span> que podem <span className="text-[var(--primary)]">te interessar</span>
        </h2>

        {items.length === 0 ? (
          <p className="text-[var(--muted-foreground)] text-sm">Nenhum imóvel sugerido no momento.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {cardData.map((card) => (
              <NvPropertyCard key={card.id} {...card} code={card.code} />
          ))}
        </div>
        )}
      </section>
    </div>
  )
}
