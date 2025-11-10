import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Bed, Bath, Square, MapPin, Heart, Eye } from "lucide-react"

interface PropertyCardProps {
  id: string
  code?: string
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

export function PropertyCard({
  id,
  code,
  title,
  type,
  location,
  price,
  bedrooms,
  bathrooms,
  suites,
  area,
  image,
  purpose,
}: PropertyCardProps) {
  const router = useRouter()
  return (
    <Card className="overflow-hidden card-noble group relative flex flex-col h-full">
      <div className="relative overflow-hidden">
        <img
          src={image || "/placeholder.svg?height=280&width=400&query=luxury house exterior"}
          alt={title}
          className="w-full h-72 md:h-80 object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

        <div className="property-badge absolute top-4 left-4">{purpose === "venda" ? "VENDA" : "ALUGUEL"}</div>

        {code && (
          <div className="absolute top-4 right-4 bg-white/90 text-[#3A3A3A] text-xs font-medium px-2 py-1 rounded-md shadow">
            {code}
          </div>
        )}

        <button className="view-more-button opacity-0 group-hover:opacity-100 transition-all duration-300">
          Ver mais
        </button>

        <div className="absolute top-14 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-white/90 hover:bg-white shadow-lg">
            <Heart className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-white/90 hover:bg-white shadow-lg">
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <CardContent className="p-6 flex flex-col flex-1">
        <h3 className="property-title text-balance text-slate-900">{title}</h3>

        <div className="property-location">
          <MapPin className="h-4 w-4 mr-2 text-amber-500 flex-shrink-0" />
          <span className="text-pretty">{location}</span>
        </div>

        <div className="property-details-grid">
          <div className="property-detail-item">
            <Bed className="property-detail-icon" />
            <span className="property-detail-value">{bedrooms}</span>
            <span className="property-detail-label">Quartos</span>
          </div>

          {suites && (
            <div className="property-detail-item">
              <Bed className="property-detail-icon" />
              <span className="property-detail-value">{suites}</span>
              <span className="property-detail-label">Suítes</span>
            </div>
          )}

          <div className="property-detail-item">
            <Bath className="property-detail-icon" />
            <span className="property-detail-value">{bathrooms}</span>
            <span className="property-detail-label">Banheiros</span>
          </div>

          <div className="property-detail-item">
            <Square className="property-detail-icon" />
            <span className="property-detail-value">{area}m²</span>
            <span className="property-detail-label">Área</span>
          </div>
        </div>

        <div className="mt-auto">
          <div className="property-price text-balance uppercase">{price}</div>
          <Button
            className="w-full btn-elegant font-semibold text-base h-12 transition-all duration-300"
            onMouseEnter={() => router.prefetch(`/detalhes/${id}`)}
            onClick={() => router.push(`/detalhes/${id}`)}
          >
            VER DETALHES
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
