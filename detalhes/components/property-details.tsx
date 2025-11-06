"use client"

import { MapPin, Bed, Bath, Maximize, Car } from "lucide-react"
import { useEffect, useRef, useState, useMemo } from "react"

type Address = { neighborhood?: string; city?: string; state?: string }
type Property = {
  code?: string
  title?: string
  address?: Address
  bedrooms?: number
  suites?: number
  bathrooms?: number
  areaPrivativa?: number
  areaTotal?: number
  parking?: number
  description?: string
}

export default function PropertyDetails({ property }: { property?: Property }) {
  const [isVisible, setIsVisible] = useState(false)
  const detailsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (detailsRef.current) {
      observer.observe(detailsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const area = useMemo(() => property?.areaPrivativa ?? property?.areaTotal, [property])

  return (
    <div ref={detailsRef} className={`text-[var(--foreground)] ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
      <div className="mb-6">
        <p className="text-sm text-[var(--muted-foreground)] mb-2">CÓDIGO: {property?.code || "-"}</p>
        <h1 className="text-3xl font-light mb-4 text-balance">{property?.title || "Imóvel"}</h1>

        <div className="flex flex-wrap gap-6 text-sm">
          <div className="flex items-center gap-2 group cursor-pointer">
            <MapPin className="w-5 h-5 text-[var(--primary)] group-hover:scale-110 transition-transform" />
            <span className="group-hover:text-[var(--primary)] transition-colors">
              {property?.address?.neighborhood}, {property?.address?.city}-{property?.address?.state}
            </span>
          </div>
          <div className="flex items-center gap-2 group cursor-pointer">
            <Bed className="w-5 h-5 text-[var(--primary)] group-hover:scale-110 transition-transform" />
            <span className="group-hover:text-[var(--primary)] transition-colors">{property?.suites ?? 0} Suítes</span>
          </div>
          <div className="flex items-center gap-2 group cursor-pointer">
            <Bath className="w-5 h-5 text-[var(--primary)] group-hover:scale-110 transition-transform" />
            <span className="group-hover:text-[var(--primary)] transition-colors">{property?.bathrooms ?? 0} Banheiros</span>
          </div>
          <div className="flex items-center gap-2 group cursor-pointer">
            <Maximize className="w-5 h-5 text-[var(--primary)] group-hover:scale-110 transition-transform" />
            <span className="group-hover:text-[var(--primary)] transition-colors">{area ? `${area}m²` : "-"}</span>
          </div>
          <div className="flex items-center gap-2 group cursor-pointer">
            <Car className="w-5 h-5 text-[var(--primary)] group-hover:scale-110 transition-transform" />
            <span className="group-hover:text-[var(--primary)] transition-colors">{property?.parking ?? 0} Vagas</span>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-[var(--foreground)]/90 leading-relaxed">{property?.description}</p>
      </div>

      {/* Card de detalhes usa variáveis da paleta da rota de detalhes */}
      <div className="rounded-xl p-6 bg-[var(--card)] border border-[var(--border)] text-[var(--card-foreground)]">
        <h2 className="text-xl font-light mb-4 text-[var(--primary)]">DETALHES DO IMÓVEL</h2>

        <div className="space-y-3">
          <div className="flex justify-between py-3 border-b border-[var(--border)] hover:border-[var(--primary)] transition-colors group">
            <span className="text-[var(--muted-foreground)] group-hover:text-[var(--card-foreground)] transition-colors">Código do Imóvel</span>
            <span className="font-medium">{property?.code || "-"}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-[var(--border)] hover:border-[var(--primary)] transition-colors group">
            <span className="text-[var(--muted-foreground)] group-hover:text-[var(--card-foreground)] transition-colors">Bairro</span>
            <span className="font-medium">{property?.address?.neighborhood || "-"}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-[var(--border)] hover:border-[var(--primary)] transition-colors group">
            <span className="text-[var(--muted-foreground)] group-hover:text-[var(--card-foreground)] transition-colors">Área lote/terreno</span>
            <span className="font-medium">{property?.areaTotal ? `${property.areaTotal}m²` : "-"}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-[var(--border)] hover:border-[var(--primary)] transition-colors group">
            <span className="text-[var(--muted-foreground)] group-hover:text-[var(--card-foreground)] transition-colors">Área interna</span>
            <span className="font-medium">{property?.areaPrivativa ? `${property.areaPrivativa}m²` : "-"}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-[var(--border)] hover:border-[var(--primary)] transition-colors group">
            <span className="text-[var(--muted-foreground)] group-hover:text-[var(--card-foreground)] transition-colors">Salas</span>
            <span className="font-medium">01</span>
          </div>
          <div className="flex justify-between py-3 border-b border-[var(--border)] hover:border-[var(--primary)] transition-colors group">
            <span className="text-[var(--muted-foreground)] group-hover:text-[var(--card-foreground)] transition-colors">Suítes</span>
            <span className="font-medium">{property?.suites ?? 0}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-[var(--border)] hover:border-[var(--primary)] transition-colors group">
            <span className="text-[var(--muted-foreground)] group-hover:text-[var(--card-foreground)] transition-colors">Quartos</span>
            <span className="font-medium">{property?.bedrooms ?? 0}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
