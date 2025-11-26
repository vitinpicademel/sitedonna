"use client"

import Image from "next/image"
import { Bed, Bath, Maximize } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const properties = [
  {
    id: 1,
    image: "/luxury-house-pool.jpg",
    title: "Casa à Venda no Condomínio Damha 3 em Uberaba",
    bedrooms: 3,
    suites: 3,
    bathrooms: 4,
    area: "284m²",
    price: "R$ 2.950.000,00",
  },
  {
    id: 2,
    image: "/modern-house-exterior.png",
    title: "Casa à Venda no Condomínio Damha 3 em Uberaba",
    bedrooms: 3,
    suites: 3,
    bathrooms: 4,
    area: "281m²",
    price: "R$ 2.700.000,00",
  },
  {
    id: 3,
    image: "/luxury-villa.png",
    title: "Casa em condomínio à venda, 4 quartos, 3 suítes, 4 vagas",
    bedrooms: 4,
    suites: 3,
    bathrooms: 4,
    area: "263m²",
    price: "R$ 2.800.000,00",
  },
]

export default function RelatedProperties() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={sectionRef} className={`mt-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
      <h2 className="text-2xl font-light text-[#F5F5F5] mb-8 text-balance">
        <span className="text-[#E5A93D]">Imóveis</span> que podem <span className="text-[#E5A93D]">te interessar</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property, idx) => (
          <div
            key={property.id}
            className="glass-effect rounded-xl overflow-hidden hover:border-[#E5A93D] border border-[#2C2C2C] transition-all duration-300 cursor-pointer group hover:scale-105 hover:shadow-2xl hover:shadow-[#E5A93D]/20 animate-scale-in"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={property.image || "/placeholder.svg"}
                alt={property.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute top-4 left-4 bg-[#E5A93D] text-[#0E0E0E] px-3 py-1 text-xs font-bold rounded-md">
                VENDA
              </span>
            </div>

            <div className="p-4">
              <h3 className="text-[#F5F5F5] text-sm mb-4 line-clamp-2 min-h-[40px] group-hover:text-[#FFD27A] transition-colors">
                {property.title}
              </h3>

              <div className="flex flex-wrap gap-3 text-xs text-[#B3B3B3] mb-4">
                <div className="flex items-center gap-1 group/icon">
                  <Bed className="w-4 h-4 text-[#E5A93D] group-hover/icon:scale-110 transition-transform" />
                  <span>{property.bedrooms} Quartos</span>
                </div>
                <div className="flex items-center gap-1 group/icon">
                  <Bed className="w-4 h-4 text-[#E5A93D] group-hover/icon:scale-110 transition-transform" />
                  <span>{property.suites} Suítes</span>
                </div>
                <div className="flex items-center gap-1 group/icon">
                  <Bath className="w-4 h-4 text-[#E5A93D] group-hover/icon:scale-110 transition-transform" />
                  <span>{property.bathrooms} Banheiros</span>
                </div>
                <div className="flex items-center gap-1 group/icon">
                  <Maximize className="w-4 h-4 text-[#E5A93D] group-hover/icon:scale-110 transition-transform" />
                  <span>{property.area}</span>
                </div>
              </div>

              <div className="text-[#E5A93D] text-xl font-bold group-hover:text-[#F1C75B] transition-colors">
                {property.price}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
