"use client"

import { Check } from "lucide-react"

export default function VideoSection() {
  const amenities = [
    { name: "Atendimento personalizado", checked: true },
    { name: "Equipe especialista no mercado local", checked: true },
    { name: "Soluções digitais que facilitam sua jornada", checked: true },
    { name: "Parcerias sólidas com construtoras e investidores", checked: true },
  ]

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative overflow-hidden shadow-2xl rounded-sm" style={{ aspectRatio: "16 / 9" }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/4pw19pRht0I?rel=0&modestbranding=1&playsinline=1"
                title="Donna Imobiliária - Vídeo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>

          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Sobre a Donna Imobiliária
            </h2>
            <p className="text-[#1a1410]/90 bg-white/80 p-4 mb-3">
              Fundada com o propósito de transformar o modo de negociar imóveis, a Donna une
              experiência, tecnologia e atendimento humanizado.
            </p>
            <p className="text-[#1a1410]/90 bg-white/80 p-4 mb-6">
              Nosso objetivo é simplificar cada etapa da compra, venda ou locação, sempre com
              transparência e compromisso.
            </p>
            <h3 className="text-2xl font-semibold text-white mb-4">Por que escolher a Donna:</h3>

            <div className="grid sm:grid-cols-2 gap-4">
              {amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-white p-4 rounded-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-[#f8f8f8] group"
                >
                  <div className="w-6 h-6 rounded-full bg-[#c89968] flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium text-[#1a1410] transition-colors duration-300 group-hover:text-[#c89968]">
                    {amenity.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
