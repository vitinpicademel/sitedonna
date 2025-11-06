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

      <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-[#3d2f28] opacity-60 animate-float-slow" style={{ animation: 'float 8s ease-in-out infinite', willChange: 'transform' }} />
      <div className="absolute top-40 right-32 w-24 h-24 rounded-full bg-[#2a1f15] opacity-50 animate-float-2" style={{ animation: 'float-2 7s ease-in-out infinite', willChange: 'transform' }} />
      <div className="absolute bottom-32 right-20 w-40 h-40 rounded-full bg-[#3d2f28] opacity-40 animate-pulse-slow" style={{ animation: 'pulse-slow 3s ease-in-out infinite', willChange: 'transform, opacity' }} />
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[#3d2f28] opacity-60 animate-float-3" style={{ animation: 'float-3 9s ease-in-out infinite', willChange: 'transform' }} />
      <div className="absolute top-40 left-32 w-24 h-24 rounded-full bg-[#2a1f15] opacity-50 animate-float-4" style={{ animation: 'float-4 6.5s ease-in-out infinite', willChange: 'transform' }} />
      <div className="absolute bottom-32 left-20 w-40 h-40 rounded-full bg-[#3d2f28] opacity-40 animate-float-5" style={{ animation: 'float-5 7.5s ease-in-out infinite', willChange: 'transform' }} />

      {/* Ondas animadas de fundo */}
      <svg className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <path d="M 0 100 Q 200 50, 400 100 T 800 100 T 1200 100 T 1600 100" stroke="#c89968" strokeWidth="2" fill="none" className="animate-wave" style={{ animation: 'wave 10s linear infinite', willChange: 'transform' }} />
        <path d="M 0 200 Q 250 150, 500 200 T 1000 200 T 1500 200" stroke="#c89968" strokeWidth="2" fill="none" className="animate-wave-slow" style={{ animation: 'wave 15s linear infinite', willChange: 'transform' }} />
        <path d="M 0 140 Q 250 90, 500 140 T 1000 140 T 1500 140" stroke="#c89968" strokeWidth="0.9" fill="none" className="animate-wave" strokeOpacity="0.35" style={{ animation: 'wave 10s linear infinite', willChange: 'transform' }} />
        <path d="M 0 240 Q 250 190, 500 240 T 1000 240 T 1500 240" stroke="#c89968" strokeWidth="0.9" fill="none" className="animate-wave-slow" strokeOpacity="0.3" style={{ animation: 'wave 15s linear infinite', willChange: 'transform' }} />
      </svg>

      {/* Diagonais animadas no lado direito */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-35">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <g className="animate-wave" style={{ willChange: 'transform', animation: 'wave 10s linear infinite' }}>
            <path d="M 10 0 L 110 50" stroke="#c89968" strokeWidth="0.9" fill="none" strokeOpacity="0.45" strokeDasharray="6 10" />
            <path d="M 0 10 L 100 60" stroke="#c89968" strokeWidth="0.7" fill="none" strokeOpacity="0.35" strokeDasharray="6 10" />
            <path d="M -10 25 L 90 75" stroke="#c89968" strokeWidth="0.6" fill="none" strokeOpacity="0.3" strokeDasharray="6 10" />
          </g>
          <g className="animate-wave-slow" style={{ willChange: 'transform', animation: 'wave 15s linear infinite' }}>
            <path d="M -5 35 Q 20 25, 45 35 T 95 35" stroke="#c89968" strokeWidth="0.8" fill="none" strokeOpacity="0.35" />
            <path d="M -5 20 Q 20 10, 45 20 T 95 20" stroke="#c89968" strokeWidth="0.9" fill="none" strokeOpacity="0.28" />
          </g>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          <div className="relative w-full h-full justify-self-center">
            <div className="relative w-full h-full overflow-hidden shadow-2xl rounded-sm mx-auto">
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
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3 leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
              Sobre a Donna Imobiliária
            </h2>
            <div className="h-1.5 w-24 rounded-full bg-[#c89968]/80 mb-6" />
            <p className="text-[#2b1f16] px-6 py-5 mb-4 rounded-xl bg-white/35 backdrop-blur-xl ring-1 ring-white/30 shadow-[0_10px_30px_rgba(0,0,0,0.10)] leading-7">
              Fundada com o propósito de transformar o modo de negociar imóveis, a Donna une
              experiência, tecnologia e atendimento humanizado.
            </p>
            <p className="text-[#2b1f16] px-6 py-5 mb-7 rounded-xl bg-white/35 backdrop-blur-xl ring-1 ring-white/30 shadow-[0_10px_30px_rgba(0,0,0,0.10)] leading-7">
              Nosso objetivo é simplificar cada etapa da compra, venda ou locação, sempre com
              transparência e compromisso.
            </p>
            <h3 className="text-2xl font-semibold text-white mb-4">Por que escolher a Donna:</h3>

            <div className="grid sm:grid-cols-2 gap-4">
              {amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 px-5 py-4 rounded-xl bg-white/35 backdrop-blur-xl ring-1 ring-white/25 shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0_10px_28px_rgba(0,0,0,0.12)] hover:-translate-y-1 hover:bg-white/45 group"
                >
                  <div className="w-6 h-6 rounded-full bg-[#c89968] flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium text-[#2b1f16] transition-colors duration-300 group-hover:text-[#c89968]">
                    {amenity.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Garantia de keyframes globais em produção (evita renomeações do minificador) */}
      <style jsx global>{`
        @keyframes float { 0%,100% { transform: translate(0,0) rotate(0deg);} 25% { transform: translate(10px,-10px) rotate(5deg);} 50% { transform: translate(0,-20px) rotate(0deg);} 75% { transform: translate(-10px,-10px) rotate(-5deg);} }
        @keyframes float-2 { 0%,100% { transform: translate(0,0) scale(1);} 33% { transform: translate(-12px,10px) scale(1.03);} 66% { transform: translate(8px,-8px) scale(0.98);} }
        @keyframes float-3 { 0%,100% { transform: translate(0,0) scale(1);} 33% { transform: translate(15px,12px) scale(0.97);} 66% { transform: translate(-10px,-5px) scale(1.04);} }
        @keyframes float-4 { 0%,100% { transform: translate(0,0) scale(1);} 33% { transform: translate(-8px,-12px) scale(1.02);} 66% { transform: translate(12px,8px) scale(0.99);} }
        @keyframes float-5 { 0%,100% { transform: translate(0,0) scale(1);} 33% { transform: translate(10px,15px) scale(0.99);} 66% { transform: translate(-15px,-10px) scale(1.01);} }
        @keyframes pulse-slow { 0%,100% { opacity: .3; transform: scale(1);} 50% { opacity:.5; transform: scale(1.05);} }
        @keyframes wave { 0% { transform: translateX(0);} 100% { transform: translateX(-400px);} }
      `}</style>
    </section>
  )
}
