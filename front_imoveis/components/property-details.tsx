"use client"

import { MapPin, Bed, Bath, Maximize, Car } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function PropertyDetails() {
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

  return (
    <div ref={detailsRef} className={`text-[#F5F5F5] ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
      <div className="mb-6">
        <p className="text-sm text-[#B3B3B3] mb-2">CÓDIGO: 7137</p>
        <h1 className="text-3xl font-light mb-4 text-balance">Casa à Venda no Condomínio Damha 3 em Uberaba</h1>

        <div className="flex flex-wrap gap-6 text-sm">
          <div className="flex items-center gap-2 group cursor-pointer">
            <MapPin className="w-5 h-5 text-[#E5A93D] group-hover:scale-110 transition-transform" />
            <span className="group-hover:text-[#FFD27A] transition-colors">Uberaba, MG</span>
          </div>
          <div className="flex items-center gap-2 group cursor-pointer">
            <Bed className="w-5 h-5 text-[#E5A93D] group-hover:scale-110 transition-transform" />
            <span className="group-hover:text-[#FFD27A] transition-colors">03 Suítes</span>
          </div>
          <div className="flex items-center gap-2 group cursor-pointer">
            <Bath className="w-5 h-5 text-[#E5A93D] group-hover:scale-110 transition-transform" />
            <span className="group-hover:text-[#FFD27A] transition-colors">04 Banheiros</span>
          </div>
          <div className="flex items-center gap-2 group cursor-pointer">
            <Maximize className="w-5 h-5 text-[#E5A93D] group-hover:scale-110 transition-transform" />
            <span className="group-hover:text-[#FFD27A] transition-colors">284m²</span>
          </div>
          <div className="flex items-center gap-2 group cursor-pointer">
            <Car className="w-5 h-5 text-[#E5A93D] group-hover:scale-110 transition-transform" />
            <span className="group-hover:text-[#FFD27A] transition-colors">04 Vagas</span>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-[#F5F5F5]/90 leading-relaxed">
          Descubra o seu novo lar em uma das localizações mais desejadas de Uberaba! Esta incrível casa composta por 3
          suítes closet, sendo a suíte máster com hidromassagem, todas suítes com ar condicionado, sala de Tv no andar
          superior, sala de TV privativa na parte térrea, conta ainda com um escritório, sala com pé direito duplo,
          cozinha planejada, área gourmet com churrasqueira e chopeira naja, piscina indoor automatizada, ionizada com
          sal e hidromassagem, lavabo, área de serviço e uma garagem para 4 carros, sendo 2 cobertos. Localizada na
          parte alta do condomínio, oferece tranquilidade e privacidade. Não perca a oportunidade de viver em um lugar
          que combina conforto, segurança e qualidade de vida. Agende uma visita e venha conhecer seu futuro lar!
        </p>
      </div>

      <div className="glass-effect rounded-xl p-6">
        <h2 className="text-xl font-light mb-4 text-[#E5A93D]">DETALHES DO IMÓVEL</h2>

        <div className="space-y-3">
          <div className="flex justify-between py-3 border-b border-[#2C2C2C] hover:border-[#E5A93D] transition-colors group">
            <span className="text-[#B3B3B3] group-hover:text-[#F5F5F5] transition-colors">Código do Imóvel</span>
            <span className="font-medium">7137</span>
          </div>
          <div className="flex justify-between py-3 border-b border-[#2C2C2C] hover:border-[#E5A93D] transition-colors group">
            <span className="text-[#B3B3B3] group-hover:text-[#F5F5F5] transition-colors">Bairro</span>
            <span className="font-medium">Damha Residencial Uberaba III</span>
          </div>
          <div className="flex justify-between py-3 border-b border-[#2C2C2C] hover:border-[#E5A93D] transition-colors group">
            <span className="text-[#B3B3B3] group-hover:text-[#F5F5F5] transition-colors">Área lote/terreno</span>
            <span className="font-medium">360,00m²</span>
          </div>
          <div className="flex justify-between py-3 border-b border-[#2C2C2C] hover:border-[#E5A93D] transition-colors group">
            <span className="text-[#B3B3B3] group-hover:text-[#F5F5F5] transition-colors">Área interna</span>
            <span className="font-medium">284,74m²</span>
          </div>
          <div className="flex justify-between py-3 border-b border-[#2C2C2C] hover:border-[#E5A93D] transition-colors group">
            <span className="text-[#B3B3B3] group-hover:text-[#F5F5F5] transition-colors">Salas</span>
            <span className="font-medium">01</span>
          </div>
          <div className="flex justify-between py-3 border-b border-[#2C2C2C] hover:border-[#E5A93D] transition-colors group">
            <span className="text-[#B3B3B3] group-hover:text-[#F5F5F5] transition-colors">Suítes</span>
            <span className="font-medium">03</span>
          </div>
          <div className="flex justify-between py-3 border-b border-[#2C2C2C] hover:border-[#E5A93D] transition-colors group">
            <span className="text-[#B3B3B3] group-hover:text-[#F5F5F5] transition-colors">Quartos</span>
            <span className="font-medium">03</span>
          </div>
        </div>
      </div>
    </div>
  )
}
