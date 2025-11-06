"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

type Item = {
  title: string
  address: string
  area?: string
  price?: number
  image: string
  alt: string
  slug: string
}

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
    async function load() {
      // Dados locais que estavam funcionando
      const fallbackData = [
        {
          title: "Casa de Luxo no Jockey Park",
          address: "Jockey Park, Uberaba/MG",
          area: "350 m²",
          price: 1850000,
          image: "/uploads/launches/6931.jpg",
          alt: "Casa de luxo no Jockey Park",
          slug: "casa-luxo-jockey-park-6931",
        },
        {
          title: "Apartamento Moderno com Vista Panorâmica",
          address: "Centro, Uberaba/MG",
          area: "120 m²",
          price: 450000,
          image: "/uploads/launches/3585.jpg",
          alt: "Apartamento moderno com vista panorâmica",
          slug: "apartamento-moderno-centro-3585",
        }
      ]

      if (!cancelled && fallbackData.length > 0) {
        setItems(fallbackData)
        // Dispara evento para a intro encerrar imediatamente quando os dados chegaram
        window.dispatchEvent(new Event("launches-ready"))
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (items.length <= 1) return
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

  const current = items[index]
  const priceText = formatBRL(current?.price) ?? "—"

  return (
    <section className="py-24 bg-[#3d2f28] relative overflow-hidden">
      <div className="absolute right-0 top-20 w-64 h-64 opacity-10">
        <div className="grid grid-cols-8 gap-2">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-[#c89968]" />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
          <div className={`relative block w-full max-w-xl md:max-w-2xl ml-auto fade-swap ${isAnimating ? "is-out" : ""}`}>
              <div className="absolute -top-8 -right-8 w-32 h-32 border-4 border-[#c89968] animate-float z-10" />

              {/* Moldura externa bronze */}
              <div className="absolute -inset-4 border-4 border-[#c89968] pointer-events-none" />

              {/* Imagem mais horizontal (4:3), um pouco mais larga */}
              <div className="relative w-full bg-gray-800" style={{ aspectRatio: '4 / 3' }}>
                {/* Ordem de prioridade: LOCAL (/uploads/launches) -> PROXY -> RAW -> PLACEHOLDER */}
                {(() => {
                  const nameCandidates: string[] = []
                  if (current?.slug) nameCandidates.push(current.slug)
                  // alguns CRMs usam código como identificador
                  if (current?.slug && /\d/.test(current.slug)) nameCandidates.push(current.slug.replace(/\D/g, ''))
                  const localCandidates = nameCandidates.flatMap((base) => [
                    `/uploads/launches/${base}.webp`,
                    `/uploads/launches/${base}.jpg`,
                    `/uploads/launches/${base}.jpeg`,
                    `/uploads/launches/${base}.png`,
                  ])

                  // função que rotaciona entre as fontes no erro
                  function handleError(e: React.SyntheticEvent<HTMLImageElement, Event>) {
                    const el = e.currentTarget
                    const tried = el.getAttribute('data-tried')?.split('|') ?? []
                  const chain = [
                    ...localCandidates,
                    current?.image,
                    '/placeholder.svg?height=600&width=800',
                  ].filter(Boolean) as string[]
                    const next = chain.find((u) => !tried.includes(u))
                    if (next) {
                      el.setAttribute('data-tried', [...tried, next].join('|'))
                      el.src = next
                    }
                  }

                  const first = [
                    ...localCandidates,
                    current?.image,
                    '/placeholder.svg?height=600&width=800',
                  ].filter(Boolean)[0] as string

                  return (
                    <img
                      src={first}
                      data-tried={first}
                      alt={current?.alt || 'Imagem do lançamento'}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={handleError}
                    />
                  )
                })()}
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className={`fade-swap ${isAnimating ? "is-out" : ""}`}>
            <p className="inline-block bg-[#c89968] text-black uppercase text-sm md:text-base font-extrabold tracking-widest px-3 py-1 rounded-full mb-5">LANÇAMENTOS</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white/95 mb-4 leading-tight">
              Encante-se com nossa seleção de lançamentos
              <br />
              selecionados com carinho e cuidado pra vocês.
            </h2>
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
        </div>
      </div>
    </section>
  )
}
