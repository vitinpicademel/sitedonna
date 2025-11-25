"use client"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Home, Maximize2, Eye, ArrowRight, Star, CheckCircle } from "lucide-react"

export default function ApartmentsPlans() {
  // Opções vinculadas aos cards acima - ATUALIZADO
  const planOptions = [
    {
      key: "cobertura",
      name: "Caminhos do Lago",
      image: "/uploads/planta01.png",
      details: [
        { label: "ÁREA TOTAL", value: "47,40m²", icon: Maximize2 },
        { label: "Nº DO ANDAR", value: "2", icon: Home },
        { label: "STATUS ATUAL", value: "DISPONÍVEL", icon: CheckCircle },
        { label: "Nº DE QUARTOS", value: "02", icon: Star },
      ],
      description: "Apartamento com 2 quartos e suíte, sacada ampla e vista encantadora para o piscinão.",
      features: ["Vista para o piscinão", "Área gourmet", "Playground", "Piscina adulta e infantil"]
    },
    {
      key: "studio",
      name: "Parque Veredas",
      image: "/uploads/planta02.png",
      details: [
        { label: "ÁREA TOTAL", value: "36,83m²", icon: Maximize2 },
        { label: "Nº DO ANDAR", value: "2", icon: Home },
        { label: "STATUS ATUAL", value: "DISPONÍVEL", icon: CheckCircle },
        { label: "Nº DE QUARTOS", value: "2", icon: Star },
      ],
      description: "Apartamento moderno com integração perfeita entre ambientes, ideal para jovens profissionais.",
      features: ["Ambientes integrados", "Design moderno", "Localização privilegiada", "Facilidade de manutenção"]
    },
    {
      key: "duplex",
      name: "Parque Andino",
      image: "/uploads/planta03.png",
      details: [
        { label: "ÁREA TOTAL", value: "39,3m²", icon: Maximize2 },
        { label: "Nº DO ANDAR", value: "2", icon: Home },
        { label: "STATUS ATUAL", value: "DISPONÍVEL", icon: CheckCircle },
        { label: "Nº DE QUARTOS", value: "2", icon: Star },
      ],
      description: "Apartamento espaçoso com layout funcional, perfeito para famílias em busca de conforto e praticidade.",
      features: ["Layout funcional", "Espaços generosos", "Ideal para famílias", "Praticidade"]
    },
  ]

  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const active = planOptions[activeIndex]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handlePlanChange = (index: number) => {
    setIsImageLoading(true)
    setActiveIndex(index)
    
    // Simular carregamento da imagem
    setTimeout(() => {
      setIsImageLoading(false)
    }, 300)
  }

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-[#2a1f15] to-[#1a1410] relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-20 left-10 w-32 h-32 border border-[#b8956a]/10 rounded-full animate-float-slow"
          style={{ animation: 'float 9s ease-in-out infinite', willChange: 'transform' }}
        ></div>
        <div
          className="absolute top-40 right-20 w-24 h-24 border border-[#b8956a]/15 rounded-full animate-float"
          style={{ animation: 'float-2 8s ease-in-out infinite', willChange: 'transform' }}
        ></div>
        <div
          className="absolute bottom-32 left-1/4 w-16 h-16 border border-[#b8956a]/20 rounded-full animate-float-slower"
          style={{ animation: 'float-3 10s ease-in-out infinite', willChange: 'transform' }}
        ></div>
        <div
          className="absolute bottom-20 right-1/3 w-20 h-20 border border-[#b8956a]/10 rounded-full animate-pulse-slow"
          style={{ animation: 'pulse-slow 4s ease-in-out infinite', willChange: 'transform, opacity' }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Content */}
          <div className={`${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            {/* Título com animação */}
            <div className="mb-8">
              <p className="text-[#b8956a] text-sm font-bold mb-4 tracking-wider animate-fade-in">CONFIRA A PLANTA</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight animate-slide-in-right">
                PLANTAS DOS <span className="text-[#b8956a]">APARTAMENTOS</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-[#b8956a] to-[#a07d54] rounded-full animate-bounce-arrow"></div>
            </div>

            {/* Descrição com animação */}
            <p className="text-gray-400 mb-8 leading-relaxed animate-slide-up-fade">
              Apartamentos projetados para unir espaço, conforto e estética, criando ambientes harmônicos que transformam o dia a dia em uma experiência de bem-estar.
            </p>

            {/* Botões de seleção de planta com animações */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {planOptions.map((option, index) => (
                <Button
                  key={option.key}
                  onClick={() => handlePlanChange(index)}
                  className={`relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                    index === activeIndex
                      ? "bg-gradient-to-r from-[#b8956a] to-[#a07d54] hover:from-[#a07d54] hover:to-[#8b6f47] text-white px-8 py-3 shadow-lg"
                      : "bg-[#3d2f1f] hover:bg-[#4d3f2f] text-white px-8 py-3 hover:shadow-lg"
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {option.name}
                    {index === activeIndex && <ArrowRight className="w-4 h-4 animate-bounce" />}
                  </span>
                  {index === activeIndex && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                  )}
                </Button>
              ))}
            </div>

            {/* Grade de detalhes com animações */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {active.details.map((detail, index) => {
                const IconComponent = detail.icon
                return (
                  <div 
                    key={index} 
                    className="group border-l-2 border-[#b8956a] pl-4 hover:border-[#a07d54] transition-all duration-300 hover:translate-x-2"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <IconComponent className="text-[#b8956a] text-sm group-hover:animate-bounce" />
                      <p className="text-gray-400 text-sm font-semibold">{detail.label}</p>
                    </div>
                    <p className="text-white font-bold text-lg group-hover:text-[#b8956a] transition-colors duration-300">
                      {detail.value}
                    </p>
                  </div>
                )
              })}
            </div>

            {/* Descrição do apartamento ativo */}
            <div className="bg-[#1a1410]/50 backdrop-blur-sm p-6 rounded-lg border border-[#b8956a]/20 mb-6 animate-scale-in">
              <h3 className="text-[#b8956a] font-bold text-lg mb-3 flex items-center gap-2">
                <Eye className="w-5 h-5" />
                {active.name}
              </h3>
              <p className="text-gray-300 mb-4 leading-relaxed">{active.description}</p>
              
              {/* Features */}
              <div className="space-y-2">
                <h4 className="text-white font-semibold text-sm mb-2">CARACTERÍSTICAS:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {active.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-400">
                      <div className="w-1.5 h-1.5 bg-[#b8956a] rounded-full animate-pulse"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Floor Plan */}
          <div className={`${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
            <div className="bg-gradient-to-br from-[#1a1410] to-[#0a0806] p-8 border border-[#3d2f1f] rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-500 group relative overflow-hidden">
              {/* Elementos decorativos */}
              <div className="absolute top-4 right-4 z-10">
                <div className="flex items-center gap-2 bg-[#b8956a]/10 backdrop-blur-sm px-3 py-2 rounded-lg">
                  <Eye className="text-[#b8956a] text-lg animate-pulse" />
                  <span className="text-sm font-semibold text-white">Planta {activeIndex + 1}/3</span>
                </div>
              </div>
              

              {/* Overlay de loading */}
              {isImageLoading && (
                <div className="absolute inset-0 bg-[#0a0806]/80 flex items-center justify-center z-20">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#b8956a]/30 border-t-[#b8956a] rounded-full animate-spin"></div>
                    <p className="text-[#b8956a] font-semibold">Carregando planta...</p>
                  </div>
                </div>
              )}

              {/* Container da imagem - altura ajustada para alinhar exatamente com o container da esquerda */}
              <div className="relative h-[580px] bg-[#0a0806] rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-500">
                <Image 
                  src={active.image} 
                  alt={`Planta - ${active.name}`} 
                  fill 
                  className={`object-cover transition-all duration-500 ${
                    isImageLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                  }`}
                  onLoad={() => setIsImageLoading(false)}
                />
                
                {/* Overlay decorativo */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#b8956a]/5 pointer-events-none"></div>
                
                {/* Efeito de brilho no hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
              </div>

              {/* Botões de navegação */}
              <div className="mt-6">
                {/* Linha com nome do apartamento, pontos e botão próximo */}
                <div className="flex flex-col gap-4 lg:flex-row justify-between items-center">
                  <div className="flex items-center gap-2 bg-[#b8956a]/10 backdrop-blur-sm px-3 py-2 rounded-lg w-full lg:w-auto justify-center">
                    <Star className="text-[#b8956a] text-lg animate-bounce" />
                    <span className="text-sm font-semibold text-white">{active.name}</span>
                  </div>
                  
                  {/* Pontos de navegação centralizados */}
                  <div className="flex gap-3 justify-center">
                    {planOptions.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handlePlanChange(index)}
                        className={`w-4 h-4 rounded-full transition-all duration-300 ${
                          index === activeIndex 
                            ? 'bg-[#b8956a] scale-110' 
                            : 'bg-[#3d2f1f] hover:bg-[#4d3f2f]'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <Button
                    onClick={() => handlePlanChange(activeIndex < planOptions.length - 1 ? activeIndex + 1 : 0)}
                    className="bg-[#3d2f1f] hover:bg-[#4d3f2f] text-white px-4 py-2 transition-all duration-300 hover:scale-105 w-full lg:w-auto"
                  >
                    Próximo →
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
