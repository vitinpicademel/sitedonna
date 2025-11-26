"use client"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function ApartmentsGallery() {
  const router = useRouter()
  const apartments = [
    {
      title: "Caminhos do Lago",
      subtitle: "Apartamento",
      price: "R$ 1.200,00",
      image: "/uploads/1ap.png",
      slug: "casa-luxo-jockey-park",
    },
    {
      title: "Parque Veredas",
      subtitle: "Apartamento",
      price: "R$ 2.500,00",
      image: "/uploads/2ap.png",
      slug: "apartamento-centro-uberaba",
    },
    {
      title: "Parque Andino",
      subtitle: "Apartamento",
      price: "R$ 3.200,00",
      image: "/uploads/3ap.png",
      slug: "casa-jardim-europa",
    },
    {
      title: "Villas do Parque",
      subtitle: "Casas",
      price: "R$ 1.800,00",
      image: "/uploads/4ap.png",
      slug: "terreno-residencial-2000",
    },
  ]

  return (
    <section className="py-20 bg-[#1a1410]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-[#b8956a] text-sm font-medium mb-4 tracking-wider">APARTAMENTOS & CASAS</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">ENCONTRE SEU LAR</h2>
        </div>

        {/* Apartments Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {apartments.map((apartment, index) => (
            <div
              key={index}
              className="group relative overflow-hidden bg-[#2a1f15] transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Image */}
              <div className="relative h-[400px] overflow-hidden">
                <Image
                  src={apartment.image || "/placeholder.svg"}
                  alt={`${apartment.title} ${apartment.subtitle}`}
                  fill
                  className={`object-cover object-center transition-transform duration-500 ${
                    apartment.title === "Parque Veredas" || apartment.title === "Villas do Parque"
                      ? "scale-[0.98] group-hover:scale-[1.02]"
                      : "group-hover:scale-[1.02]"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1410] via-transparent to-transparent" />

                {/* Price Badge removido temporariamente */}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-1">{apartment.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{apartment.subtitle}</p>
                <Button
                  variant="outline"
                  className="w-full border-[#b8956a] text-[#b8956a] hover:bg-[#b8956a] hover:text-white bg-transparent"
                  onMouseEnter={() => router.prefetch(`/detalhes/${apartment.slug}`)}
                  onClick={() => router.push(`/detalhes/${apartment.slug}`)}
                >
                  VER DETALHES
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
