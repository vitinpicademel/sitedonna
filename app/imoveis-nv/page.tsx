"use client"

import { useMemo, useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { WhatsAppButton } from "@/components/layout/whatsapp-button"
import { PropertyFilters as NvPropertyFilters } from "@nv/components/property-filters"
import { PropertyCard as NvPropertyCard } from "@nv/components/property-card"
import { HeroSearch } from "@nv/components/hero-search"
import propertiesData from "@/data/properties.json"
import type { Property } from "@/lib/types"
import { formatCurrency, formatArea } from "@/lib/utils/currency"

type CardData = {
  id: string
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

function mapPropertyToCardData(property: Property): CardData {
  const image = property.media?.[0]?.url || "/placeholder.jpg"
  const location = `${property.address.neighborhood}, ${property.address.city}-${property.address.state}`
  const priceNumber = property.status === "Venda" ? property.priceSale ?? 0 : property.priceRent ?? 0
  const price = formatCurrency(priceNumber)

  return {
    id: property.id,
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

export default function ImoveisPreviewPage() {
  const [sortBy, setSortBy] = useState("relevance")
  const [purpose, setPurpose] = useState<"comprar" | "alugar" | "">("")
  const [typeFilter, setTypeFilter] = useState<string>("")
  const [codeFilter, setCodeFilter] = useState<string>("")

  const cards = useMemo(() => propertiesData.map(mapPropertyToCardData), [])

  const filtered = useMemo(() => {
    return cards.filter((c) => {
      if (purpose && ((purpose === "comprar" && c.purpose !== "venda") || (purpose === "alugar" && c.purpose !== "aluguel"))) {
        return false
      }
      if (typeFilter && c.type !== typeFilter) return false
      if (codeFilter && !c.id.includes(codeFilter)) return false
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

  const handleHeroSearch = (values: { searchCode: string; purpose: "comprar" | "alugar"; propertyType: string }) => {
    setCodeFilter(values.searchCode)
    setPurpose(values.purpose)
    setTypeFilter(values.propertyType)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />

      <HeroSearch onSearch={handleHeroSearch} backgroundImage="/professional-real-estate-agent-in-modern-office.jpg" />

      <main className="container mx-auto px-4 py-12" id="property-results">
        <NvPropertyFilters onSortChange={setSortBy} totalResults={sortedCards.length} />

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {sortedCards.map((p) => (
            <NvPropertyCard key={p.id} {...p} />
          ))}
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}


