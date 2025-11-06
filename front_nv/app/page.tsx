"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { HeroSearch } from "@/components/hero-search"
import { PropertyFilters } from "@/components/property-filters"
import { PropertyCard } from "@/components/property-card"
import { Pagination } from "@/components/pagination"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Footer } from "@/components/footer"

const mockProperties = [
  {
    id: "1",
    title: "Casa à venda no condomínio Mario Franco, em Uberaba-MG",
    type: "Casa em Condomínio",
    location: "Mario Franco, Uberaba-MG",
    price: "R$ 5.400.000,00",
    bedrooms: 7,
    bathrooms: 6,
    suites: 5,
    area: 778,
    image: "/luxury-house-with-pool-and-modern-architecture.jpg",
    purpose: "venda" as const,
  },
  {
    id: "2",
    title: "Casa à Venda no Condomínio Damha 3 em Uberaba",
    type: "Casa em Condomínio",
    location: "Damha 3, Uberaba-MG",
    price: "R$ 2.950.000,00",
    bedrooms: 3,
    bathrooms: 4,
    suites: 3,
    area: 284,
    image: "/modern-house-with-glass-walls-and-contemporary-des.jpg",
    purpose: "venda" as const,
  },
  {
    id: "3",
    title: "Casa à Venda no Condomínio Damha 3 em Uberaba",
    type: "Casa em Condomínio",
    location: "Damha 3, Uberaba-MG",
    price: "R$ 2.700.000,00",
    bedrooms: 3,
    bathrooms: 4,
    suites: 3,
    area: 281,
    image: "/elegant-white-house-with-modern-staircase-and-luxu.jpg",
    purpose: "venda" as const,
  },
  {
    id: "4",
    title: "Casa à venda no condomínio Residencial Quinta do Golfe",
    type: "Casa em Condomínio",
    location: "Quinta do Golfe, Uberaba-MG",
    price: "R$ 1.850.000,00",
    bedrooms: 4,
    bathrooms: 3,
    suites: 2,
    area: 320,
    image: "/luxury-house-with-golf-course-view-and-landscaped-.jpg",
    purpose: "venda" as const,
  },
  {
    id: "5",
    title: "Casa à venda no condomínio Village Damha II",
    type: "Casa em Condomínio",
    location: "Village Damha II, Uberaba-MG",
    price: "R$ 3.200.000,00",
    bedrooms: 5,
    bathrooms: 4,
    suites: 3,
    area: 450,
    image: "/spacious-luxury-house-with-multiple-bedrooms-and-e.jpg",
    purpose: "venda" as const,
  },
  {
    id: "6",
    title: "Casa à venda no condomínio Portal do Sol",
    type: "Casa em Condomínio",
    location: "Portal do Sol, Uberaba-MG",
    price: "R$ 1.650.000,00",
    bedrooms: 4,
    bathrooms: 3,
    suites: 2,
    area: 280,
    image: "/contemporary-house-with-clean-lines-and-modern-lan.jpg",
    purpose: "venda" as const,
  },
]

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState("relevance")
  const propertiesPerPage = 6
  const totalPages = Math.ceil(mockProperties.length / propertiesPerPage)

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy)
    setCurrentPage(1) // Reset to first page when sorting changes
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to top of results
    document.getElementById("property-results")?.scrollIntoView({ behavior: "smooth" })
  }

  // Get current properties for pagination
  const startIndex = (currentPage - 1) * propertiesPerPage
  const currentProperties = mockProperties.slice(startIndex, startIndex + propertiesPerPage)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <HeroSearch />

      <main className="container mx-auto px-4 py-12" id="property-results">
        <PropertyFilters onSortChange={handleSortChange} totalResults={mockProperties.length} />

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {currentProperties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
