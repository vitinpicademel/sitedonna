"use client"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Bed, Bath, Car, Maximize, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Property } from "@/lib/types"
import { formatCurrency, formatArea } from "@/lib/utils/currency"

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  const router = useRouter()
  const price = property.status === "Venda" ? property.priceSale : property.priceRent
  const priceLabel = property.status === "Venda" ? "" : "/mês"

  function resolveImageSrc(input?: string): string {
    const fallback = "/placeholder.svg?height=200&width=300"
    if (!input) return fallback
    try {
      // Se for uma URL absoluta externa, usa o proxy para adicionar headers/cors
      if (/^https?:\/\//i.test(input)) {
        return `/api/imoview/image?url=${encodeURIComponent(input)}`
      }
      // Se vier relativo, mantém como está
      return input
    } catch {
      return fallback
    }
  }

  return (
    <Card className="overflow-hidden transition-all duration-300 rounded-[12px] card-elegant hover:scale-[1.02]">
      <div className="relative group overflow-hidden">
        <Image
          src={resolveImageSrc(property.media[0]?.url)}
          alt={property.media[0]?.alt || property.title}
          width={300}
          height={200}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105 rounded-t-[12px]"
        />
        <span className="absolute top-3 left-3 px-2 py-1 rounded-md chip-elegant text-xs font-medium tracking-wide">
          {property.status}
        </span>
        <Badge variant="secondary" className="absolute top-3 right-3 bg-white/70 text-[#3A3A3A] border-white/20">
          {property.code}
        </Badge>
        <button aria-label="Favoritar" className="absolute top-3 right-12 p-1.5 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors">
          <Heart className="h-4 w-4" />
        </button>
      </div>

      <CardContent className="p-5">
        <div className="space-y-3">
          <div>
            <h3 className="card-title text-lg line-clamp-2">{property.title}</h3>
            <p className="card-subtitle text-sm">
              {property.address.neighborhood}, {property.address.city}/{property.address.state}
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm text-[#666]">
            {property.bedrooms && (
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4" />
                <span>{property.bedrooms}</span>
              </div>
            )}
            {property.suites && (
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4" />
                <span>{property.suites} suítes</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                <span>{property.bathrooms}</span>
              </div>
            )}
            {property.parking && (
              <div className="flex items-center gap-1">
                <Car className="h-4 w-4" />
                <span>{property.parking}</span>
              </div>
            )}
            {(property.areaPrivativa || property.areaTotal) && (
              <div className="flex items-center gap-1">
                <Maximize className="h-4 w-4" />
                <span>{formatArea((property.areaPrivativa || property.areaTotal) as number)}</span>
              </div>
            )}
          </div>

          <div className="thin-divider" />

          <div className="flex items-center justify-between">
            <div>
              {price ? (
                <p className="text-2xl font-semibold text-chave-azul">
                  {formatCurrency(price)}
                  {priceLabel}
                </p>
              ) : (
                <p className="text-lg font-light text-[#3A3A3A]">A consultar</p>
              )}
            </div>
            <Button
              size="sm"
              className="btn-elegant font-medium"
              onMouseEnter={() => router.prefetch(`/detalhes/${property.code || property.slug}`)}
              onClick={() => router.push(`/detalhes/${property.code || property.slug}`)}
            >
              Ver detalhes
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
