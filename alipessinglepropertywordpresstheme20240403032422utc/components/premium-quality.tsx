"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import type { Property } from "@/lib/types"
import { mapImoviewToProperty } from "@/lib/map-imoview"

type Item = {
  title: string
  address: string
  area?: string
  price?: number
  image: string
  alt: string
  slug: string
  code?: string
}

function normalizeCodeStr(value: string | number | undefined | null): string {
  if (value == null) return ""
  return String(value).toUpperCase().replace(/[^A-Z0-9]/g, "").trim()
}

function extractListAndTotal(json: any): { list: any[]; total?: number } {
  if (Array.isArray(json)) return { list: json, total: json.length }
  const totalCandidates = (o: any) => o?.quantidade ?? o?.quantidadeTotal ?? o?.total ?? o?.count ?? o?.Total
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
  if (json && typeof json === "object") {
    for (const [, v] of Object.entries(json)) {
      if (Array.isArray(v) && v.length) {
        const first = v[0] as any
        if (first && typeof first === "object" && ("codigo" in first || "id" in first || "titulo" in first)) {
          return { list: v as any[], total: totalCandidates(json) }
        }
      }
    }
  }
  return { list: [], total: 0 }
}

async function fetchImoview({
  page,
  perPage,
  finalidade,
}: {
  page: number
  perPage: number
  finalidade?: number
}): Promise<{ list: Property[]; total?: number }> {
  try {
    const payload: Record<string, any> = { numeroPagina: page, numeroRegistros: perPage }
    if (finalidade === 1 || finalidade === 2) payload.finalidade = finalidade
    const resp = await fetch(`/api/imoview/properties`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    })
    if (resp.ok) {
      const json = await resp.json()
      const { list, total } = extractListAndTotal(json)
      const mapped = list.map((dto) => mapImoviewToProperty(dto)) as unknown as Property[]
      return { list: mapped, total }
    }
  } catch {}
  return { list: [], total: 0 }
}

async function fetchImoviewByCodeStrict(code: string): Promise<Property | undefined> {
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
      const resp = await fetch(url.toString(), { cache: "no-store" })
      if (!resp.ok) continue
      const json = await resp.json()
      const { list } = extractListAndTotal(json)
      if (list.length) {
        const prop = mapImoviewToProperty(list[0]) as unknown as Property
        return prop
      }
      if (json && !Array.isArray(json) && !Array.isArray(json?.data) && json?.codigo) {
        const prop = mapImoviewToProperty(json) as unknown as Property
        return prop
      }
    } catch {}
  }

  // Fallback: varrer páginas gerais e encontrar pelo código normalizado
  try {
    const target = normalizeCodeStr(code)
    const perPage = 20
    let page = 1
    let total = Infinity
    while (page <= 50 && page <= Math.ceil((total as number) / perPage)) {
      const { list, total: reported } = await fetchImoview({ page, perPage })
      if (typeof reported === "number") total = reported
      const match = list.find((p) => normalizeCodeStr(p.code) === target)
      if (match) return match
      if (list.length < perPage) break
      page += 1
    }
  } catch {}

  return undefined
}

function mapImageUrl(url?: string): string | undefined {
  if (!url) return undefined
  // Sempre usar o proxy para resolver caminho relativo/absoluto
  // O handler /api/imoview/image completa a URL com IMOVIEW_BASE_URL quando necessário
  return `/api/imoview/image?url=${encodeURIComponent(url)}`
}

const FEATURED = [
  {
    code: "6931",
    fallback: {
      title: "Casa de Luxo no Jockey Park",
      address: "Jockey Park, Uberaba/MG",
      area: "350 m²",
      price: 1850000,
      image: "/uploads/launches/6931.jpg",
      alt: "Casa de luxo no Jockey Park",
      slug: "casa-luxo-jockey-park-6931",
    },
  },
  {
    code: "3585",
    fallback: {
      title: "Apartamento Moderno com Vista Panorâmica",
      address: "Centro, Uberaba/MG",
      area: "120 m²",
      price: 450000,
      image: "/uploads/launches/3585.jpg",
      alt: "Apartamento moderno com vista panorâmica",
      slug: "apartamento-moderno-centro-3585",
    },
  },
]

function formatBRL(n?: number) {
  return typeof n === "number"
    ? new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n)
    : undefined
}

export default function PremiumQuality() {
  const [items, setItems] = useState<Item[]>([])
  const [index, setIndex] = useState(0)
  const timerRef = useRef<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    let cancelled = false

    const base: Item[] = FEATURED.map((entry) => ({
      ...entry.fallback,
      image: mapImageUrl(entry.fallback.image) || entry.fallback.image,
      code: entry.code,
    }))

    setItems(base)
    window.dispatchEvent(new Event("launches-ready"))

    async function loadFeatured() {
      try {
        const enriched = await Promise.all(
          FEATURED.map(async (entry) => {
            const prop = entry.code ? await fetchImoviewByCodeStrict(entry.code) : undefined
            if (!prop) {
              return { ...entry.fallback, code: entry.code }
            }
            const address = [prop.address.neighborhood, `${prop.address.city}-${prop.address.state}`]
              .filter(Boolean)
              .join(", ")
            const area = prop.areaPrivativa ?? prop.areaTotal
            const price = prop.status === "Venda" ? prop.priceSale : prop.priceRent
            const image =
              mapImageUrl(prop.media?.[0]?.url) || mapImageUrl(entry.fallback.image) || entry.fallback.image
            return {
              title: prop.title || entry.fallback.title,
              address: address || entry.fallback.address,
              area: area ? `${area} m²` : entry.fallback.area,
              price: price ?? entry.fallback.price,
              image,
              alt: prop.title || entry.fallback.alt,
              slug: prop.slug || prop.code || entry.fallback.slug,
              code: entry.code,
            }
          })
        )

        if (!cancelled) {
          setItems(enriched)
        }
      } catch {}
    }

    loadFeatured()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (items.length <= 1) {
      return
    }
    timerRef.current = window.setInterval(() => {
      setIsAnimating(true)
      window.setTimeout(() => {
        setIndex((i) => (i + 1) % items.length)
        setIsAnimating(false)
      }, 220) // metade do tempo do fade para saída
    }, 6000)
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [items.length])

  const current = items[index] || items[0]
  const priceText = formatBRL(current?.price) || "-"

  return (
    <section className="py-24 bg-[#3d2f28] relative overflow-hidden">
      <div
        className="absolute right-0 top-20 w-64 h-64 opacity-10"
        style={{ animation: 'wave 18s linear infinite', willChange: 'transform' }}
      >
        <div className="grid grid-cols-8 gap-2">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-[#c89968]" />
          ))}
        </div>
      </div>
      <div
        className="absolute left-[-80px] bottom-10 w-52 h-52 opacity-10"
        style={{ animation: 'wave 22s linear infinite reverse', willChange: 'transform' }}
      >
        <div className="grid grid-cols-6 gap-2">
          {Array.from({ length: 36 }).map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-[#c89968]" />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content before image */}
          <div className={`fade-swap ${isAnimating ? "is-out" : ""}`}>
            <p className="inline-block bg-[#c89968] text-black uppercase text-sm md:text-base font-extrabold tracking-widest px-3 py-1 rounded-full mb-5">LANÇAMENTOS</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white/95 mb-4 leading-tight">
              Encante-se com nossa seleção de lançamentos
              <br />
              selecionados com carinho e cuidado pra vocês.
            </h2>

            {/* Image card for mobile, hidden on large screens */}
            <div className={`relative block w-full max-w-lg mx-auto my-8 fade-swap lg:hidden ${isAnimating ? "is-out" : ""}`}>
                <div
                  className="absolute -top-8 -right-8 w-32 h-32 border-4 border-[#c89968] animate-float z-10"
                  style={{ animation: 'float 9s ease-in-out infinite', willChange: 'transform' }}
                />
                <div
                  className="absolute -bottom-10 -left-12 w-24 h-24 border-2 border-[#c89968]/50 rounded-full"
                  style={{ animation: 'float-3 11s ease-in-out infinite', willChange: 'transform' }}
                />

                {/* Moldura externa bronze */}
                <div
                  className="absolute -inset-2 border-2 border-[#c89968] rounded-2xl pointer-events-none"
                  style={{ animation: 'float-2 14s ease-in-out infinite', willChange: 'transform' }}
                />

                {/* Imagem mais horizontal (16:9) */}
                <div className="relative w-full bg-gray-800 rounded-2xl overflow-hidden" style={{ aspectRatio: '16 / 9' }}>
                  {(() => {
                    const src = current?.image || '/placeholder.svg?height=600&width=800'
                    function handleError(e: any) {
                      const el = e.currentTarget
                      if (el.src.endsWith('placeholder.svg?height=600&width=800')) return
                      el.src = '/placeholder.svg?height=600&width=800'
                    }
                    return (
                      <img
                        src={src}
                        alt={current?.alt || 'Imagem do lançamento'}
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={handleError}
                      />
                    )
                  })()}
                </div>
              </div>
            <p className="text-[#c89968] text-lg mb-2 font-semibold">Destaque do mês</p>
            {current ? (
              <>
                <h3 className="text-white text-2xl md:text-3xl font-extrabold mb-2">{current.title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{[current.address, current.area].filter(Boolean).join(" • ")}</p>
              </>
            ) : (
              <p className="text-gray-400 mb-8 leading-relaxed">Carregando lançamentos...</p>
            )}

            {/* Preço destacado */}
            <div className="mb-8">
              <div className="inline-flex items-baseline gap-3 bg-[#c89968]/10 border border-[#c89968]/40 rounded-lg px-4 py-3">
                <span className="text-[#c89968] uppercase tracking-widest text-xs font-semibold">A partir de</span>
                <span className="text-white text-2xl md:text-3xl font-extrabold">{priceText}</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              {current?.slug ? (
                <Link href={`/imovel/${current.slug}`}>
                  <Button className="bg-white hover:bg-gray-100 text-black px-8 py-6 font-bold tracking-wider">VER MAIS</Button>
                </Link>
              ) : (
                <Button className="bg-white hover:bg-gray-100 text-black px-8 py-6 font-bold tracking-wider">VER MAIS</Button>
              )}
            </div>

            {items.length > 1 && (
              <div className="mt-6 flex gap-2 items-center">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setIsAnimating(true)
                      window.setTimeout(() => {
                        setIndex(i)
                        setIsAnimating(false)
                      }, 220)
                    }}
                    aria-label={`Ir para slide ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${i === index ? "bg-[#c89968] w-8" : "bg-white/30 w-3"}`}
                  />)
                )}
              </div>
            )}
          </div>

          {/* Image card for desktop, hidden on small screens */}
          <div className={`relative hidden lg:block w-full max-w-lg md:max-w-2xl ml-auto fade-swap ${isAnimating ? "is-out" : ""}`}>
              <div
                className="absolute -top-8 -right-8 w-32 h-32 border-4 border-[#c89968] animate-float z-10"
                style={{ animation: 'float 9s ease-in-out infinite', willChange: 'transform' }}
              />
              <div
                className="absolute -bottom-10 -left-12 w-24 h-24 border-2 border-[#c89968]/50 rounded-full"
                style={{ animation: 'float-3 11s ease-in-out infinite', willChange: 'transform' }}
              />

              {/* Moldura externa bronze */}
              <div
                className="absolute -inset-2 border-2 border-[#c89968] rounded-2xl pointer-events-none"
                style={{ animation: 'float-2 14s ease-in-out infinite', willChange: 'transform' }}
              />

              {/* Imagem mais horizontal (16:9), um pouco mais larga */}
              <div className="relative w-full bg-gray-800 rounded-2xl overflow-hidden" style={{ aspectRatio: '16 / 9' }}>
                {(() => {
                  const src = current?.image || '/placeholder.svg?height=600&width=800'
                  function handleError(e: React.SyntheticEvent<HTMLImageElement, Event>) {
                    const el = e.currentTarget
                    if (el.src.endsWith('placeholder.svg?height=600&width=800')) return
                    el.src = '/placeholder.svg?height=600&width=800'
                  }
                  return (
                    <img
                      src={src}
                      alt={current?.alt || 'Imagem do lançamento'}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={handleError}
                    />
                  )
                })()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
