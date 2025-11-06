"use client"

import { Play, Check } from "lucide-react"
import { useState } from "react"

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false)

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
        {/* Lado direito com a MESMA base do esquerdo para harmonizar */}
        <div className="bg-[#d4a574]" />
      </div>

      {/* Círculos decorativos à direita – espelhados para manter a linguagem do lado esquerdo */}
      <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-[#3d2f28] opacity-60 animate-float-slow" />
      <div className="absolute top-40 right-32 w-24 h-24 rounded-full bg-[#2a1f15] opacity-50 animate-float-slower" />
      <div className="absolute bottom-32 right-20 w-40 h-40 rounded-full bg-[#3d2f28] opacity-40 animate-float" />

      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[#3d2f28] opacity-60 animate-float-slow" />
      <div className="absolute top-40 left-32 w-24 h-24 rounded-full bg-[#2a1f15] opacity-50 animate-float-slower" />
      <div className="absolute bottom-32 left-20 w-40 h-40 rounded-full bg-[#3d2f28] opacity-40 animate-float" />

      <svg className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <path
          d="M 0 100 Q 200 50, 400 100 T 800 100 T 1200 100 T 1600 100"
          stroke="#c89968"
          strokeWidth="2"
          fill="none"
          className="animate-wave"
        />
        <path
          d="M 0 200 Q 250 150, 500 200 T 1000 200 T 1500 200"
          stroke="#c89968"
          strokeWidth="2"
          fill="none"
          className="animate-wave-slow"
        />
        {/* Traços adicionais sutis para dar destaque e profundidade */}
        <path
          d="M 0 140 Q 250 90, 500 140 T 1000 140 T 1500 140"
          stroke="#c89968"
          strokeWidth="0.9"
          fill="none"
          className="animate-wave"
          strokeOpacity="0.35"
        />
        <path
          d="M 0 240 Q 250 190, 500 240 T 1000 240 T 1500 240"
          stroke="#c89968"
          strokeWidth="0.9"
          fill="none"
          className="animate-wave-slow"
          strokeOpacity="0.3"
        />
        {/* Linhas diagonais discretas no right-pane */}
        <path
          d="M 900 0 L 1600 320"
          stroke="#c89968"
          strokeWidth="0.8"
          fill="none"
          strokeOpacity="0.22"
          strokeDasharray="6 10"
        />
        <path
          d="M 800 0 L 1500 320"
          stroke="#c89968"
          strokeWidth="0.6"
          fill="none"
          strokeOpacity="0.18"
          strokeDasharray="6 10"
        />
      </svg>

      {/* Overlay de traços dedicado ao lado direito (opacidade maior para ficar visível) */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-40">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Diagonais principais */}
          <path d="M 10 0 L 100 40" stroke="#c89968" strokeWidth="0.9" fill="none" strokeOpacity="0.5" strokeDasharray="6 10" />
          <path d="M 0 10 L 100 50" stroke="#c89968" strokeWidth="0.7" fill="none" strokeOpacity="0.4" strokeDasharray="6 10" />
          <path d="M 0 25 L 100 65" stroke="#c89968" strokeWidth="0.6" fill="none" strokeOpacity="0.35" strokeDasharray="6 10" />
          {/* Ondas extras no topo do right-pane */}
          <path d="M 0 20 Q 25 10, 50 20 T 100 20" stroke="#c89968" strokeWidth="0.9" fill="none" strokeOpacity="0.45" />
          <path d="M 0 35 Q 25 25, 50 35 T 100 35" stroke="#c89968" strokeWidth="0.7" fill="none" strokeOpacity="0.35" />
          {/* Leve vinheta linear para costura com a coluna da esquerda */}
          <linearGradient id="rg" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#c89968" stopOpacity="0.22" />
            <stop offset="30%" stopColor="#c89968" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#c89968" stopOpacity="0" />
          </linearGradient>
          <rect x="0" y="0" width="4" height="100" fill="url(#rg)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Video Side */}
          <div className="relative">
            <div className="relative p-8">
              <div className="absolute inset-0 border-4 border-[#c89968] animate-pulse-glow" />

              <div
                className="relative h-[400px] bg-cover bg-center overflow-hidden shadow-2xl"
                style={{
                  backgroundImage:
                    "url(/placeholder.svg?height=400&width=600&query=modern+apartment+interior+living+room)",
                }}
              >
                <div className="absolute inset-0 bg-black/30" />

                {/* Play Button */}
                <button
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#1a1410] hover:bg-[#c89968] transition-all duration-300 flex items-center justify-center group hover:scale-110"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  <Play className="w-8 h-8 text-white fill-white" />
                </button>
              </div>
            </div>

            <svg
              className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 text-[#c89968] animate-bounce-arrow"
              width="120"
              height="70"
              viewBox="0 0 120 70"
              aria-hidden="true"
            >
              {/* Curva suave subindo para o vídeo */}
              <path
                d="M 15 60 Q 60 25, 60 15"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
              {/* Ponta da seta apontando para cima (para o vídeo) */}
              <path
                d="M 55 22 L 60 12 L 65 22"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Content Side */}
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
                  className="flex items-center gap-3 bg-white p-4 rounded-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-[#f8f8f8] group cursor-pointer"
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
