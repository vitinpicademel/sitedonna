"use client"

import { useMemo, useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { WhatsAppButton } from "@/components/layout/whatsapp-button"
import { PropertyCard as NvPropertyCard } from "@nv/components/property-card"
import { HeroSearch } from "@nv/components/hero-search"
import propertiesData from "@/data/properties.json"
import type { Property } from "@/lib/types"
import { mapImoviewToProperty } from "@/lib/map-imoview"
import { Button } from "@nv/components/ui/button"
import { formatCurrency } from "@/lib/utils/currency"
import { PageLoader } from "@/components/ui/page-loader"
import { useRef } from "react"

type CardData = {
  id: string
  code: string
  title: string
  type: string
  location: string
  price: string
  bedrooms: number
  bathrooms: number
  suites?: number
  area: number
  image: string
  purpose: "venda" | "aluguel"
}

function normalizeCodeStr(value: string | number | undefined | null): string {
  if (value == null) return ""
  return String(value).toUpperCase().replace(/[^A-Z0-9]/g, "").trim()
}

function extractListAndTotal(json: any): { list: any[]; total?: number } {
  if (Array.isArray(json)) return { list: json, total: json.length }
  const totalCandidates = (o: any) => o?.quantidade ?? o?.quantidadeTotal ?? o?.total ?? o?.count ?? o?.Total
  // chaves comuns
  if (Array.isArray(json?.lista)) return { list: json.lista, total: totalCandidates(json) }
  if (Array.isArray(json?.data)) return { list: json.data, total: totalCandidates(json) }
  if (Array.isArray(json?.data?.lista)) return { list: json.data.lista, total: totalCandidates(json?.data) }
  if (Array.isArray(json?.items)) return { list: json.items, total: totalCandidates(json) }
  if (Array.isArray(json?.result)) return { list: json.result, total: totalCandidates(json) }
  // Imoview: estruturas vistas
  if (Array.isArray((json as any)?.imoveis)) return { list: (json as any).imoveis, total: totalCandidates(json) }
  if (Array.isArray((json as any)?.Imoveis)) return { list: (json as any).Imoveis, total: totalCandidates(json) }
  if (Array.isArray((json as any)?.listaImoveis)) return { list: (json as any).listaImoveis, total: totalCandidates(json) }
  if (Array.isArray((json as any)?.ListaImoveis)) return { list: (json as any).ListaImoveis, total: totalCandidates(json) }
  if (Array.isArray((json as any)?.Dados)) return { list: (json as any).Dados, total: totalCandidates(json) }
  // Busca rasa por qualquer array de objetos com campo id/codigo
  if (json && typeof json === 'object') {
    for (const [k, v] of Object.entries(json)) {
      if (Array.isArray(v) && v.length && typeof v[0] === 'object') {
        const first = v[0] as any
        if ('codigo' in first || 'id' in first || 'titulo' in first || 'nome' in first) {
          return { list: v as any[], total: totalCandidates(json) }
        }
      }
      if (v && typeof v === 'object') {
        // nível 2
        const res = extractListAndTotal(v)
        if (res.list.length) return res
      }
    }
  }
  return { list: [], total: 0 }
}

function mapPropertyToCardData(property: Property): CardData {
  const image = property.media?.[0]?.url || "/placeholder.jpg"
  const location = `${property.address.neighborhood}, ${property.address.city}-${property.address.state}`
  const priceNumber = property.status === "Venda" ? property.priceSale ?? 0 : property.priceRent ?? 0
  const price = formatCurrency(priceNumber)

  return {
    id: property.id,
    code: property.code,
    title: property.title,
    type: property.type,
    location,
    price,
    bedrooms: property.bedrooms ?? 0,
    bathrooms: property.bathrooms ?? 0,
    suites: property.suites ?? undefined,
    area: property.areaPrivativa ?? property.areaTotal ?? 0,
    image,
    purpose: property.status === "Venda" ? "venda" : "aluguel",
  }
}

// Helper: fetch com timeout de 3 segundos
async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = 3000) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    })
    clearTimeout(timeoutId)
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout')
    }
    throw error
  }
}

async function fetchImoview({ page, perPage, finalidade }: { page: number; perPage: number; finalidade?: number }) {
  // Try POST primary endpoint com timeout
  try {
    const payload: Record<string, any> = { numeroPagina: page, numeroRegistros: perPage }
    // Não enviar finalidade quando não for 1 (Aluguel) ou 2 (Venda).
    if (finalidade === 1 || finalidade === 2) payload.finalidade = finalidade
    const resp = await fetchWithTimeout(`/api/imoview/properties`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    }, 3000) // Timeout de 3 segundos
    if (resp.ok) {
      const json = await resp.json()
      const { list, total } = extractListAndTotal(json)
      return { list, total }
    }
  } catch (e) {
    console.log('POST endpoint falhou ou timeout:', e)
  }

  // Fallback to GET-compatible endpoints via route GET handler (com timeout)
  const candidates = [
    "/Imovel/RetornarImovelPorCodigo",
    "/Imovel/Retornar",
    "/Imovel/Consultar",
  ] // Reduzido para apenas 3 endpoints principais para não demorar
  for (const path of candidates) {
    try {
      const url = new URL(`/api/imoview/properties`, window.location.origin)
      url.searchParams.set("path", path)
      url.searchParams.set("numeroPagina", String(page))
      url.searchParams.set("numeroRegistros", String(perPage))
      if (finalidade === 1 || finalidade === 2) {
        url.searchParams.set("finalidade", String(finalidade))
      }
      const resp = await fetchWithTimeout(url.toString(), { cache: "no-store" }, 2000) // Timeout de 2s por endpoint
      if (!resp.ok) continue
      const json = await resp.json()
      const { list, total } = extractListAndTotal(json)
      if (Array.isArray(list) && list.length > 0) return { list, total }
    } catch (e) {
      // Timeout ou erro - continua para próximo endpoint
      continue
    }
  }
  return { list: [], total: 0 }
}

async function fetchImoviewByCode(code: string) {
  // Usa fetchWithTimeout para evitar travamento
  // Principais endpoints conhecidos para busca por código
  const candidates = [
    "/Imovel/RetornarImovelPorCodigo",
    "/Imovel/RetornarImovel",
    "/Imovel/Detalhes",
    "/imovel/retornarimovelporcodigo",
    "/imovel/retornarimovel",
    "/imovel/detalhes",
    "/imoveis/listar",
    "/imoveis/paginado",
    "/imoveis/v2",
    "/imoveis/consulta",
  ]
  for (const path of candidates) {
    try {
      const url = new URL(`/api/imoview/properties`, window.location.origin)
      url.searchParams.set("path", path)
      url.searchParams.set("codigo", code)
      url.searchParams.set("numeroPagina", "1")
      url.searchParams.set("numeroRegistros", "1")
      const resp = await fetchWithTimeout(url.toString(), { cache: "no-store" }, 2000) // Timeout de 2s
      if (!resp.ok) continue
      const json = await resp.json()
      const { list } = extractListAndTotal(json)
      if (Array.isArray(list) && list.length > 0) return list[0]
      // Algumas instalações retornam um único objeto
      if (json && !Array.isArray(json) && !Array.isArray(json?.data) && json?.codigo) return json
    } catch (e) {
      // Timeout ou erro - continua para próximo endpoint
      continue
    }
  }
  return undefined
}

export default function PropertiesPage() {
  const searchParams = useSearchParams()
  // Ordenação fixa (mantemos estado para compatibilidade futura, mas sem UI de filtros)
  const [sortBy] = useState("relevance")
  const [purpose, setPurpose] = useState<"comprar" | "alugar" | "">("")
  const [typeFilter, setTypeFilter] = useState<string>("")
  const [codeFilter, setCodeFilter] = useState<string>("")
  // Força uma nova busca mesmo quando valores não mudam
  const [searchNonce, setSearchNonce] = useState(0)

  const [cards, setCards] = useState<CardData[]>([])
  const [apiPage, setApiPage] = useState<number>(0)
  const [apiTotal, setApiTotal] = useState<number | null>(null)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [isBootLoading, setIsBootLoading] = useState(true) // Ativa loader ao carregar a página
  const sentReadyRef = useRef(false)
  
  // Controla o loader: aparece no início e some após máximo 3 segundos OU quando dados carregarem
  useEffect(() => {
    const maxLoadTime = 3000 // Máximo 3 segundos
    
    // Timer de segurança: garante que loader suma após 3 segundos
    const timeoutId = setTimeout(() => {
      setIsBootLoading(false)
      
      // Remove blur quando loader sumir
      requestAnimationFrame(() => {
        const allElements = document.querySelectorAll('.imoveis-page *')
        allElements.forEach((el) => {
          try {
            const htmlEl = el as HTMLElement
            if (htmlEl && htmlEl.style) {
              htmlEl.style.filter = 'none'
              htmlEl.style.webkitFilter = 'none'
            }
          } catch (e) {
            // Ignora erros
          }
        })
        if (document.body && document.body.style) {
          document.body.style.filter = 'none'
          document.body.style.webkitFilter = 'none'
        }
      })
    }, maxLoadTime)
    
    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  // Try to load first page from IMOVIEW API; keep local JSON as fallback
  useEffect(() => {
    let cancelled = false
    const maxLoadTime = 3000 // Máximo 3 segundos para loader
    
    // Carrega dados locais IMEDIATAMENTE (fallback rápido)
    const fallbackCards = (propertiesData as unknown as Property[]).map(mapPropertyToCardData)
    setCards(fallbackCards)
    
    // Tenta carregar da API em background
    async function loadFromApi() {
      try {
        const perPage = 20
        const page = 1
        const { list, total } = await fetchImoview({ page, perPage })
        const mapped = list.map((dto) => mapImoviewToProperty(dto)) as unknown as Property[]
        if (!cancelled && mapped.length > 0) {
          setCards(mapped.map(mapPropertyToCardData))
          setApiPage(1)
          if (typeof total === "number") setApiTotal(total)
        }
      } catch (e) {
        console.log('API falhou, usando dados locais')
      } finally {
        // Esconde loader quando dados carregarem
        if (!cancelled) {
          setIsBootLoading(false)
          // Remove blur quando loader sumir
          requestAnimationFrame(() => {
            const allElements = document.querySelectorAll('.imoveis-page *')
            allElements.forEach((el) => {
              try {
                const htmlEl = el as HTMLElement
                if (htmlEl && htmlEl.style) {
                  htmlEl.style.filter = 'none'
                  htmlEl.style.webkitFilter = 'none'
                }
              } catch (e) {}
            })
            if (document.body && document.body.style) {
              document.body.style.filter = 'none'
              document.body.style.webkitFilter = 'none'
            }
          })
        }
      }
    }
    
    // Timer de segurança: garante que loader suma após 3 segundos no máximo
    const timeoutId = setTimeout(() => {
      if (!cancelled) {
        setIsBootLoading(false)
        // Remove blur
        requestAnimationFrame(() => {
          const allElements = document.querySelectorAll('.imoveis-page *')
          allElements.forEach((el) => {
            try {
              const htmlEl = el as HTMLElement
              if (htmlEl && htmlEl.style) {
                htmlEl.style.filter = 'none'
                htmlEl.style.webkitFilter = 'none'
              }
            } catch (e) {}
          })
          if (document.body && document.body.style) {
            document.body.style.filter = 'none'
            document.body.style.webkitFilter = 'none'
          }
        })
      }
    }, maxLoadTime)
    
    // Carrega API em background
    loadFromApi()
    
    return () => {
      cancelled = true
      clearTimeout(timeoutId)
    }
  }, [])

  // Emite eventos globais quando loader terminar
  useEffect(() => {
    if (!isBootLoading && !sentReadyRef.current) {
      sentReadyRef.current = true
      
      // Dispara eventos que podem remover loaders globais
      try {
        window.dispatchEvent(new Event("app-ready"))
        window.dispatchEvent(new Event("launches-ready"))
      } catch (e) {
        // Ignora erros de eventos
      }
    }
  }, [isBootLoading])


  // Initialize filters from URL query string (coming from home search)
  useEffect(() => {
    if (!searchParams) return
    const finalidade = searchParams.get("finalidade") || ""
    const tipo = searchParams.get("tipo") || ""
    const bairro = searchParams.get("bairro") || ""
    const valorMin = searchParams.get("valorMin") || ""
    const valorMax = searchParams.get("valorMax") || ""
    const codigo = searchParams.get("codigo") || ""

    if (finalidade) setPurpose(finalidade.toLowerCase() === "alugar" ? "alugar" : "comprar")
    if (tipo) setTypeFilter(tipo)
    if (codigo) setCodeFilter(codigo)
    // Nota: bairro e valores são aplicados apenas quando conectarmos o filtro lateral; por ora filtramos por tipo/finalidade/código
  }, [searchParams])

  // When filters are active (from URL or hero), fetch a broader slice from API, then filter locally
  useEffect(() => {
    const hasActive = Boolean(purpose || typeFilter || codeFilter)
    // Se houver código, deixamos o efeito específico de código cuidar
    if (codeFilter) return
    if (!hasActive) {
      // Usuário clicou em buscar sem filtros: recarrega listagem padrão
      if (searchNonce === 0) return
      let cancelled = false
      async function loadDefault() {
        try {
          // Loader DESATIVADO - não ativa blur
          const perPage = 20
          const page = 1
          const { list, total } = await fetchImoview({ page, perPage })
          const mapped = list.map((dto) => mapImoviewToProperty(dto)) as unknown as Property[]
          if (!cancelled) {
            setCards(mapped.map(mapPropertyToCardData))
            setApiPage(1)
            if (typeof total === "number") setApiTotal(total)
          }
        } catch (e) {
          console.log('Erro ao carregar:', e)
        }
        // Garante que loader está desativado
        if (!cancelled) setIsBootLoading(false)
      }
      loadDefault()
      return () => { cancelled = true }
    }
    let cancelled = false
    async function fetchAllForFilters() {
      try {
        // Loader DESATIVADO - não ativa blur durante busca
        const perPage = 20
        let page = 1
        let total = Infinity
        const aggregated: Property[] = []
        const payloadBase: any = {
          numeroPagina: 1,
            numeroRegistros: perPage,
        }
        if (purpose) payloadBase.finalidade = purpose === "comprar" ? 2 : 1
        // Não enviar tipo para API; filtraremos localmente por maior precisão
        while (aggregated.length < total && page <= 5) {
          const payload = { ...payloadBase, numeroPagina: page }
          const { list, total: reportedTotal } = await fetchImoview({ page, perPage, finalidade: payloadBase.finalidade })
          const mapped = list.map((dto) => mapImoviewToProperty(dto)) as unknown as Property[]
          aggregated.push(...mapped)
          if (typeof reportedTotal === "number") total = reportedTotal
          if (list.length < perPage) break
          page += 1
        }
        if (!cancelled && aggregated.length > 0) {
          setCards(aggregated.map(mapPropertyToCardData))
        setApiPage(page - 1)
        setApiTotal(aggregated.length)
        }
      } catch (e) {
        console.log('Erro ao buscar filtros:', e)
        // keep current cards
      } finally {
        // GARANTE que o blur sempre seja removido, mesmo se der erro ou timeout
        if (!cancelled) {
          setIsBootLoading(false)
        }
      }
    }
    fetchAllForFilters()
    return () => {
      cancelled = true
    }
  }, [purpose, typeFilter, codeFilter, searchNonce])

  // Busca dedicada por código: traz o imóvel direto da API e mostra imediatamente
  useEffect(() => {
    const code = (codeFilter || "").trim()
    if (!code) return
    let cancelled = false
    async function fetchByCode() {
      try {
        // Loader DESATIVADO - não ativa blur
        const dto = await fetchImoviewByCode(code)
        if (cancelled) return
        if (dto) {
          const prop = mapImoviewToProperty(dto) as unknown as Property
          const card = mapPropertyToCardData(prop)
          setCards([card])
          setApiPage(1)
          setApiTotal(1)
        } else {
          // Se não achamos via path, tenta buscar entre as primeiras páginas e filtrar por código
          let found: Property | null = null
          const target = normalizeCodeStr(code)
          let page = 1
          const perPage = 20
          let total = Infinity
          while (!found && page <= 50 && page <= Math.ceil((total as number) / perPage)) {
            const { list, total: reported } = await fetchImoview({ page, perPage })
            if (typeof reported === 'number') total = reported
            const mapped = list.map((dto) => mapImoviewToProperty(dto)) as unknown as Property[]
            const match = mapped.find((p) => {
              const a = normalizeCodeStr(p.code)
              return a === target
            })
            if (match) found = match
            if (!list || list.length < perPage) break
            page += 1
          }
          if (found) {
            const card = mapPropertyToCardData(found)
            setCards([card])
            setApiPage(1)
            setApiTotal(1)
          } else {
            setCards([])
            setApiPage(0)
            setApiTotal(0)
          }
        }
      } finally {
        if (!cancelled) setIsBootLoading(false)
      }
    }
    fetchByCode()
    return () => { cancelled = true }
  }, [codeFilter, searchNonce])

  async function loadMoreFromApi() {
    if (isLoadingMore) return
    const nextPage = apiPage + 1
    // If we don't know total, we still try. If we do, stop when reached
    if (apiTotal !== null && cards.length >= apiTotal) return
    setIsLoadingMore(true)
    try {
      const perPage = 20
      const { list, total } = await fetchImoview({ page: nextPage, perPage })
      const mapped = list.map((dto) => mapImoviewToProperty(dto)) as unknown as Property[]
      if (mapped.length > 0) {
        setCards((prev) => [...prev, ...mapped.map(mapPropertyToCardData)])
        setApiPage(nextPage)
        if (typeof total === "number") setApiTotal(total)
      }
    } finally {
      setIsLoadingMore(false)
    }
  }

  const filtered = useMemo(() => {
    const normalize = (s: string) =>
      s
          .toLowerCase()
          .normalize("NFD")
          .replace(/\p{Diacritic}/gu, "")

    return cards.filter((c) => {
      if (purpose && ((purpose === "comprar" && c.purpose !== "venda") || (purpose === "alugar" && c.purpose !== "aluguel"))) {
        return false
      }
      if (typeFilter) {
        const t = normalize(c.type)
        const f = normalize(typeFilter)
        if (!t.includes(f)) return false
      }
      if (codeFilter) {
        const a = normalizeCodeStr(c.code)
        const b = normalizeCodeStr(codeFilter)
        if (a !== b) return false
      }
      return true
    })
  }, [cards, purpose, typeFilter, codeFilter])

  const sortedCards = useMemo(() => {
    const list = [...filtered]
    switch (sortBy) {
      case "price-asc":
        return list.sort((a, b) => Number(a.price.replace(/\D/g, "")) - Number(b.price.replace(/\D/g, "")))
      case "price-desc":
        return list.sort((a, b) => Number(b.price.replace(/\D/g, "")) - Number(a.price.replace(/\D/g, "")))
      case "area-asc":
        return list.sort((a, b) => a.area - b.area)
      case "area-desc":
        return list.sort((a, b) => b.area - a.area)
      default:
        return list
    }
  }, [filtered, sortBy])

  // Enriquecimento: se o card não tiver área ou imagem, busca pelo código e preenche
  useEffect(() => {
    const missing = cards.filter((c) => ((!
      c.area || c.area <= 0) || (typeof c.image === 'string' && c.image.includes('placeholder'))
    ) && c.code)
    if (missing.length === 0) return
    let cancelled = false
    async function enrich() {
      const updated = await Promise.all(
        missing.slice(0, 6).map(async (c) => {
          const dto = await fetchImoviewByCode(c.code)
          if (!dto) return c
          const prop = mapImoviewToProperty(dto) as unknown as Property
          const betterArea = prop.areaPrivativa ?? prop.areaTotal ?? c.area
          const betterImage = prop.media?.[0]?.url
          const next: any = { ...c }
          if (betterArea && betterArea > 0) next.area = betterArea
          if (betterImage && typeof betterImage === 'string') next.image = betterImage
          return next
        })
      )
      if (!cancelled && updated.some((u, i) => u.area !== missing[i].area)) {
        setCards((prev) => prev.map((p) => updated.find((u) => u.id === p.id) ?? p))
      }
    }
    enrich()
    return () => { cancelled = true }
  }, [cards])

  const handleHeroSearch = (values: { searchCode: string; purpose: "comprar" | "alugar"; propertyType: string }) => {
    setCodeFilter(values.searchCode?.trim())
    setPurpose(values.purpose)
    setTypeFilter(values.propertyType)
    setSearchNonce((n) => n + 1)
  }

  return (
    <div className="min-h-screen imoveis-page" data-loading={isBootLoading ? "true" : "false"}>
      {/* PageLoader: aparece durante carregamento inicial */}
      {isBootLoading && <PageLoader label="Carregando imóveis..." />}
      
      <div 
        className={isBootLoading ? "opacity-0 pointer-events-none" : "opacity-100 imoveis-content-fade-in transition-opacity duration-300"}
        style={isBootLoading ? { filter: 'blur(8px)' } : { filter: 'none' }}
      >
        <Header appearance="dark" />

        <HeroSearch onSearch={handleHeroSearch} variant="minimal" />

        <main className="container mx-auto px-4 py-12" id="property-results">

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {sortedCards.map((p) => (
            <NvPropertyCard key={p.id} {...p} code={p.code} />
                    ))}
                  </div>

        {(apiTotal === null || cards.length < apiTotal) && (
          <div className="flex justify-center">
            <Button onClick={loadMoreFromApi} disabled={isLoadingMore} className="h-12 px-6 btn-elegant">
              {isLoadingMore ? "Carregando..." : "Carregar mais imóveis"}
                </Button>
              </div>
            )}
      </main>

        <Footer />
        <WhatsAppButton />
      </div>
    </div>
  )
}
