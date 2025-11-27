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
import Image from "next/image"

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
  const [bairroFilter, setBairroFilter] = useState<string>("")
  const [valorMinFilter, setValorMinFilter] = useState<number | null>(null)
  const [valorMaxFilter, setValorMaxFilter] = useState<number | null>(null)
  // Força uma nova busca mesmo quando valores não mudam
  const [searchNonce, setSearchNonce] = useState(0)

  const [cards, setCards] = useState<CardData[]>([])
  const [apiPage, setApiPage] = useState<number>(0)
  const [apiTotal, setApiTotal] = useState<number | null>(null)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [isBootLoading, setIsBootLoading] = useState(true) // Loader global (overlay)
  const [isResultsLoading, setIsResultsLoading] = useState(true) // Loader da LISTA de imóveis (UX de busca)
  const [notification, setNotification] = useState<{ message: string; type: 'error' | 'success' } | null>(null)
  const sentReadyRef = useRef(false)
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  
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
    if (bairro) setBairroFilter(bairro)
    if (valorMin) {
      const min = Number(valorMin)
      if (!isNaN(min) && min > 0) setValorMinFilter(min)
    } else {
      setValorMinFilter(null)
    }
    if (valorMax) {
      const max = Number(valorMax)
      if (!isNaN(max) && max > 0) setValorMaxFilter(max)
    } else {
      setValorMaxFilter(null)
    }
  }, [searchParams])

  // When filters are active (from URL or hero), fetch a broader slice from API, then filter locally
  useEffect(() => {
    const hasActive = Boolean(purpose || typeFilter || codeFilter || bairroFilter || valorMinFilter !== null || valorMaxFilter !== null)
    // Se houver código, deixamos o efeito específico de código cuidar
    if (codeFilter) return
    if (!hasActive) {
      // Usuário clicou em buscar sem filtros: recarrega listagem padrão
      if (searchNonce === 0) return
      let cancelled = false
      async function loadDefault() {
        try {
          // Inicia estado de carregamento de resultados
          setIsResultsLoading(true)
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
        } finally {
          // Esconde loader quando busca terminar
          if (!cancelled) {
            setIsBootLoading(false)
            setIsResultsLoading(false)
          }
        }
      }
      loadDefault()
      return () => { cancelled = true }
    }
    let cancelled = false
    async function fetchAllForFilters() {
      try {
        // Inicia estado de carregamento de resultados
        setIsResultsLoading(true)
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
        if (!cancelled) {
          if (aggregated.length > 0) {
            setCards(aggregated.map(mapPropertyToCardData))
            setApiPage(page - 1)
            setApiTotal(aggregated.length)
          } else {
            // Nenhum imóvel encontrado com os filtros
            setCards([])
            setApiPage(0)
            setApiTotal(0)
            setNotification({ message: "Nenhum imóvel encontrado com os filtros selecionados. Por favor, tente outros filtros.", type: 'error' })
            setTimeout(() => setNotification(null), 5000)
          }
        }
      } catch (e) {
        console.log('Erro ao buscar filtros:', e)
        // keep current cards
      } finally {
        // Esconde loader quando busca terminar
        if (!cancelled) {
          // Limpa timeout de segurança se busca terminou antes
          if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current)
            searchTimeoutRef.current = null
          }
          setIsBootLoading(false)
          setIsResultsLoading(false)
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
    fetchAllForFilters()
    return () => {
      cancelled = true
    }
  }, [purpose, typeFilter, codeFilter, bairroFilter, valorMinFilter, valorMaxFilter, searchNonce])

  // Busca dedicada por código: traz o imóvel direto da API e mostra imediatamente
  useEffect(() => {
    const code = (codeFilter || "").trim()
    if (!code) return
    let cancelled = false
    async function fetchByCode() {
      try {
        // Inicia estado de carregamento de resultados
        setIsResultsLoading(true)
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
            // Mostra notificação quando não encontrar imóvel
            setNotification({ message: "Imóvel não encontrado. Por favor, verifique o código e tente novamente.", type: 'error' })
            // Remove notificação após 5 segundos
            setTimeout(() => setNotification(null), 5000)
          }
        }
      } finally {
        if (!cancelled) {
          // Limpa timeout de segurança se busca terminou antes
          if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current)
            searchTimeoutRef.current = null
          }
          setIsBootLoading(false)
          setIsResultsLoading(false)
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
      // Filtro por finalidade
      if (purpose && ((purpose === "comprar" && c.purpose !== "venda") || (purpose === "alugar" && c.purpose !== "aluguel"))) {
        return false
      }
      
      // Filtro por tipo
      if (typeFilter) {
        const t = normalize(c.type)
        const f = normalize(typeFilter)
        if (!t.includes(f)) return false
      }
      
      // Filtro por código
      if (codeFilter) {
        const a = normalizeCodeStr(c.code)
        const b = normalizeCodeStr(codeFilter)
        if (a !== b) return false
      }
      
      // Filtro por bairro (busca no início da string location, antes da vírgula)
      if (bairroFilter) {
        const bairroNormalizado = normalize(bairroFilter)
        // O location está no formato "Bairro, Cidade-Estado", então pegamos a parte antes da vírgula
        const locationParts = c.location.split(",")
        const bairroCard = locationParts[0] || c.location
        const bairroCardNormalizado = normalize(bairroCard)
        if (!bairroCardNormalizado.includes(bairroNormalizado)) return false
      }
      
      // Filtro por valor mínimo e máximo
      if (valorMinFilter !== null || valorMaxFilter !== null) {
        // Extrai o valor numérico do preço (remove R$, pontos, vírgulas, etc.)
        const priceNumber = Number(c.price.replace(/\D/g, ""))
        
        if (valorMinFilter !== null && priceNumber < valorMinFilter) {
          return false
        }
        if (valorMaxFilter !== null && priceNumber > valorMaxFilter) {
          return false
        }
      }
      
      return true
    })
  }, [cards, purpose, typeFilter, codeFilter, bairroFilter, valorMinFilter, valorMaxFilter])

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
    // Limpa timeout anterior se existir
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
      searchTimeoutRef.current = null
    }
    
    // Limpa notificação anterior
    setNotification(null)
    
    // Se código estiver vazio E não houver outros filtros, limpa tudo e recarrega lista completa
    const codeTrimmed = values.searchCode?.trim() || ""
    if (!codeTrimmed && !values.purpose && !values.propertyType) {
      // Limpa todos os filtros
      setCodeFilter("")
      setPurpose("")
      setTypeFilter("")
      
      // Força recarregamento da lista padrão (vai acionar o useEffect que carrega da API)
      setSearchNonce((n) => n + 1)
      
      // Carrega lista padrão do JSON local como fallback imediato
      const fallbackCards = (propertiesData as unknown as Property[]).map(mapPropertyToCardData)
      setCards(fallbackCards)
      
      // Carrega da API em background para atualizar
      async function reloadDefault() {
        try {
          const perPage = 20
          const page = 1
          const { list, total } = await fetchImoview({ page, perPage })
          const mapped = list.map((dto) => mapImoviewToProperty(dto)) as unknown as Property[]
          if (mapped.length > 0) {
            setCards(mapped.map(mapPropertyToCardData))
            setApiPage(1)
            if (typeof total === "number") setApiTotal(total)
          }
        } catch (e) {
          console.log('Erro ao recarregar:', e)
        }
      }
      reloadDefault()
      
      return
    }
    
    // Ativa loader ao clicar em buscar
    setIsResultsLoading(true)
    setIsBootLoading(true)
    setCodeFilter(codeTrimmed)
    setPurpose(values.purpose)
    setTypeFilter(values.propertyType)
    setSearchNonce((n) => n + 1)
    
    // Timer de segurança: garante que loader suma após 5 segundos no máximo
    searchTimeoutRef.current = setTimeout(() => {
      setIsBootLoading(false)
      searchTimeoutRef.current = null
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
    }, 5000) // 5 segundos máximo para busca
  }

  return (
    <div className="min-h-screen imoveis-page" data-loading={isBootLoading ? "true" : "false"}>
      {/* Header SEMPRE visível - fora do container de blur */}
      <Header appearance="dark" />
      
      {/* PageLoader: aparece durante carregamento inicial */}
      {isBootLoading && <PageLoader label="Carregando imóveis..." />}
      
      {/* Notificação de erro/sucesso */}
      {notification && (
        <div className={`fixed top-24 left-1/2 transform -translate-x-1/2 z-[10000] px-6 py-4 rounded-lg shadow-2xl transition-all duration-300 animate-in slide-in-from-top-5 ${
          notification.type === 'error' 
            ? 'bg-red-600/95 backdrop-blur-sm text-white border-2 border-red-700' 
            : 'bg-green-600/95 backdrop-blur-sm text-white border-2 border-green-700'
        }`}>
          <div className="flex items-center gap-3 max-w-md">
            <span className="font-medium text-sm">{notification.message}</span>
            <button
              onClick={() => setNotification(null)}
              className="ml-auto text-white hover:text-gray-200 font-bold text-xl leading-none flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
              aria-label="Fechar notificação"
            >
              ×
            </button>
          </div>
        </div>
      )}
      
      <div 
        className={isBootLoading ? "opacity-0 pointer-events-none" : "opacity-100 imoveis-content-fade-in transition-opacity duration-300"}
        style={isBootLoading ? { filter: 'blur(8px)' } : { filter: 'none' }}
      >

        <HeroSearch onSearch={handleHeroSearch} variant="minimal" />

        <main className="container mx-auto px-4 py-12" id="property-results">

          {/* ESTADO 1: Carregando resultados da API */}
          {isResultsLoading && (
            <div className="flex flex-col items-center justify-center py-24">
              {/* Container do ícone girando com logo */}
              <div className="relative">
                <div className="h-24 w-24 rounded-full border-4 border-[#c89968]/40 border-t-[#c89968] animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image 
                    src="/logoprincipal.png" 
                    alt="Donna Imobiliária" 
                    width={56} 
                    height={56} 
                    className="opacity-90" 
                  />
                </div>
              </div>
              {/* Texto abaixo do ícone com espaçamento */}
              <p className="text-sm font-medium text-white/90 mt-6">Carregando imóveis...</p>
            </div>
          )}

          {/* ESTADO 2: Resultados encontrados */}
          {!isResultsLoading && sortedCards.length > 0 && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
                {sortedCards.map((p) => (
                  <NvPropertyCard key={p.id} {...p} code={p.code} />
                ))}
              </div>

              {(apiTotal === null || cards.length < apiTotal) && (
                <div className="flex justify-center">
                  <Button
                    onClick={loadMoreFromApi}
                    disabled={isLoadingMore}
                    className="h-12 px-6 btn-elegant"
                  >
                    {isLoadingMore ? "Carregando..." : "Carregar mais imóveis"}
                  </Button>
                </div>
              )}
            </>
          )}

          {/* ESTADO 3: Nenhum imóvel encontrado */}
          {!isResultsLoading && sortedCards.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
              <div className="h-16 w-16 rounded-full border border-[#c89968]/50 flex items-center justify-center">
                <span className="text-2xl">🔍</span>
              </div>
              <h2 className="text-xl font-semibold text-white">
                Nenhum imóvel encontrado
              </h2>
              <p className="max-w-md text-sm text-white/80">
                Nenhum imóvel corresponde aos filtros selecionados. Ajuste os campos de busca ou tente uma nova combinação.
              </p>
            </div>
          )}
        </main>

        <Footer />
        <WhatsAppButton />
      </div>
    </div>
  )
}
