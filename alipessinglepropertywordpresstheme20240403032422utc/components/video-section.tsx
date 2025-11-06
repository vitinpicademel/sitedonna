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
      <div className="absolute inset-0 grid lg:grid-cols-2">
        <div className="bg-[#d4a574]" />
        <div className="bg-[#d4a574]" />
      </div>

      <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-[#3d2f28] opacity-60 animate-float-slow" />
      <div className="absolute top-40 right-32 w-24 h-24 rounded-full bg-[#2a1f15] opacity-50 animate-float-slower" />
      <div className="absolute bottom-32 right-20 w-40 h-40 rounded-full bg-[#3d2f28] opacity-40 animate-float" />
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[#3d2f28] opacity-60 animate-float-slow" />
      <div className="absolute top-40 left-32 w-24 h-24 rounded-full bg-[#2a1f15] opacity-50 animate-float-slower" />
      <div className="absolute bottom-32 left-20 w-40 h-40 rounded-full bg-[#3d2f28] opacity-40 animate-float" />

      {/* Ondas animadas de fundo */}
      <svg className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <path d="M 0 100 Q 200 50, 400 100 T 800 100 T 1200 100 T 1600 100" stroke="#c89968" strokeWidth="2" fill="none" className="animate-wave" />
        <path d="M 0 200 Q 250 150, 500 200 T 1000 200 T 1500 200" stroke="#c89968" strokeWidth="2" fill="none" className="animate-wave-slow" />
        <path d="M 0 140 Q 250 90, 500 140 T 1000 140 T 1500 140" stroke="#c89968" strokeWidth="0.9" fill="none" className="animate-wave" strokeOpacity="0.35" />
        <path d="M 0 240 Q 250 190, 500 240 T 1000 240 T 1500 240" stroke="#c89968" strokeWidth="0.9" fill="none" className="animate-wave-slow" strokeOpacity="0.3" />
      </svg>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative w-full justify-self-center">
            <div className="relative w-full max-w-[900px] overflow-hidden shadow-2xl rounded-sm mx-auto" style={{ aspectRatio: "16 / 9" }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/EzMZ05gp-TE?rel=0&modestbranding=1&playsinline=1"
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
            <p className="text-[#1a1410] glass-effect p-4 mb-3">
              Fundada com o propósito de transformar o modo de negociar imóveis, a Donna une
              experiência, tecnologia e atendimento humanizado.
            </p>
            <p className="text-[#1a1410] glass-effect p-4 mb-6">
              Nosso objetivo é simplificar cada etapa da compra, venda ou locação, sempre com
              transparência e compromisso.
            </p>
            <h3 className="text-2xl font-semibold text-white mb-4">Por que escolher a Donna:</h3>

            <div className="grid sm:grid-cols-2 gap-4">
              {amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 glass-effect p-4 rounded-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-white/20 group"
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
