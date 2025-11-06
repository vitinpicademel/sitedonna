"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PropertyCard } from "@/components/ui/property-card"
import type { Property } from "@/lib/types"
import propertiesData from "@/data/properties.json"

export function FeaturedPropertiesSection() {
  const [properties] = useState<Property[]>(propertiesData.filter((property) => property.isFeatured))

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="reveal reveal-delay-1 text-3xl font-bold text-donna-navy font-serif mb-2">
              Imóveis em <span className="text-donna-gold">destaque</span>
            </h2>
            <p className="reveal reveal-delay-2 text-gray-600">Seleção especial de imóveis com as melhores oportunidades do mercado</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/imoveis">VER TODOS</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div key={property.id} className="reveal">
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
