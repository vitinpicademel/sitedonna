"use client"
import { Star, ChevronLeft, ChevronRight, Play, Pause, Quote, Heart, Award, Users } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const testimonials = [
    {
      name: "MATTHEUS VITORINO",
      role: "GERENTE COMERCIAL",
      image: "/professional-man-portrait.png",
      text: "Ótimo serviço prestado, pessoas educadas e profissionais capacitados",
      rating: 5,
    },
    {
      name: "VITORIA MELYSSE",
      role: "CLIENTE",
      image: "/professional-woman-portrait.png",
      text: "Atendimento excelente desde o primeiro contato! A equipe da Donna é atenciosa, transparente e realmente se preocupa em entender as necessidades do cliente. Fui muito bem orientada em todas as etapas, com informações claras e soluções rápidas. Recomendo para quem busca profissionalismo, agilidade e confiança no mercado imobiliário!",
      rating: 5,
    },
    {
      name: "LEVI ÁVILA",
      role: "CLIENTE",
      image: "/professional-man-portrait-2.png",
      text: "Recomendo a todos, atendimento excelente, tiraram todas as minhas dúvidas, foi um atendimento personalizado, me deixaram super tranquilo e confortável, realizei meu sonho e sai do aluguel, Amei a empresa.",
      rating: 5,
    },
  ]

  // Debug: verificar se os dados estão carregando
  console.log('Testimonials data:', testimonials)
  console.log('Current slide:', currentSlide)
  console.log('Current testimonial:', testimonials[currentSlide])

  const galleryImages = [
    "/modern-apartment-living-room.png",
    "/luxury-apartment-exterior.png",
    "/modern-apartment-facade.png",
    "/luxury-bedroom.png",
    "/modern-apartment-hallway.png",
  ]

  const floatingAvatars = [
    { image: "/professional-man-portrait.png", position: "top-1/4 left-[5%]", size: "w-20 h-20" },
    { image: "/professional-woman-portrait-2.png", position: "top-[15%] right-[8%]", size: "w-24 h-24" },
    { image: "/professional-man-portrait-2.png", position: "bottom-[20%] left-[8%]", size: "w-16 h-16" },
    { image: "/professional-woman-portrait.png", position: "bottom-[25%] right-[5%]", size: "w-20 h-20" },
    { image: "/professional-man-portrait.png", position: "top-[45%] left-[3%]", size: "w-18 h-18" },
  ]

  // Intersection Observer para animações
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

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        nextSlide()
      }, 5000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAutoPlaying])

  const nextSlide = () => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev + 1) % testimonials.length)
    
    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }

  const prevSlide = () => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    
    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return
    
    setIsTransitioning(true)
    setCurrentSlide(index)
    
    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying)
  }

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-gradient-to-br from-[#c89968] to-[#b08858]">
      {/* Galeria de imagens no topo com animações */}
      <div className="grid grid-cols-2 md:grid-cols-5 h-48 md:h-56">
        {galleryImages.map((image, index) => (
          <div 
            key={index} 
            className={`relative overflow-hidden group ${isVisible ? 'animate-fade-in-up' : 'opacity-100'}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`Gallery ${index + 1}`}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/60 transition-all duration-500" />
            
            {/* Overlay de brilho no hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
          </div>
        ))}
      </div>

      {/* Seção principal de testimonials */}
      <div className="relative py-20 md:py-32">
        {/* Imagem de fundo com overlay animado */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/modern-apartment-exterior.png')] bg-cover bg-center animate-pulse-slow" />
        </div>

        {/* Padrão de pontos decorativos com animação */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute right-0 top-0 w-1/2 h-full animate-wave"
            style={{
              backgroundImage: "radial-gradient(circle, #2a1f15 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
        </div>

        {/* Círculos decorativos grandes com animações */}
        <div className="absolute left-10 top-20 w-32 h-32 rounded-full border-[30px] border-[#2a1f15]/10 animate-float-slow" />
        <div className="absolute right-20 bottom-20 w-48 h-48 rounded-full border-[40px] border-[#2a1f15]/10 animate-float" />
        
        {/* Elementos decorativos adicionais */}
        <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-white/5 rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/3 w-12 h-12 bg-white/10 rounded-full animate-float-slower"></div>
        <div className="absolute top-1/2 right-1/4 w-8 h-8 bg-white/15 rounded-full animate-pulse"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Lado esquerdo - Título e informações */}
            <div className={`text-left ${isVisible ? 'animate-fade-in-up' : 'opacity-100'}`}>
              <p className="text-[#2a1f15] text-sm font-bold mb-4 tracking-widest uppercase animate-fade-in">O que está acontecendo</p>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight animate-slide-in-right">
                O QUE ESTÃO DIZENDO
                <br />
                <span className="text-[#2a1f15]">SOBRE A DONNA</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-[#2a1f15] to-white rounded-full animate-bounce-arrow mb-8"></div>
              
              <div className="flex flex-col gap-6">
                {/* Nota de confiança com animação */}
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 animate-scale-in">
                  <div className="flex items-center gap-3 mb-3">
                    <Award className="text-[#2a1f15] text-2xl animate-bounce" />
                    <p className="text-[#2a1f15] font-bold text-lg">Nota de confiança 4,5</p>
                  </div>
                  <p className="text-white/80 text-sm">(com base em 2.500 avaliações)</p>
                </div>

                {/* Estrelas com animação */}
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div
                      key={star}
                      className="w-12 h-12 bg-black flex items-center justify-center hover:bg-[#2a1f15] transition-all duration-300 hover:scale-110 hover:rotate-12 group"
                    >
                      <Star 
                        className="w-6 h-6 fill-white text-white group-hover:animate-bounce" 
                        style={{ animationDelay: `${star * 0.1}s` }}
                      />
                    </div>
                  ))}
                </div>

                {/* Estatísticas adicionais */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="text-[#2a1f15] text-lg group-hover:animate-bounce" />
                      <span className="text-white font-bold text-sm">2.500+</span>
                    </div>
                    <p className="text-white/70 text-xs">Clientes Satisfeitos</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="text-[#2a1f15] text-lg group-hover:animate-bounce" />
                      <span className="text-white font-bold text-sm">98%</span>
                    </div>
                    <p className="text-white/70 text-xs">Taxa de Satisfação</p>
                  </div>
                </div>

                {/* Controles de navegação */}
                <div className="flex items-center gap-4">
                  <div className="flex gap-3">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                          currentSlide === index 
                            ? "bg-white w-8 animate-pulse" 
                            : "bg-white/40 hover:bg-white/60"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                  
                  {/* Botão de auto-play */}
                  <button
                    onClick={toggleAutoPlay}
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 group"
                  >
                    {isAutoPlaying ? (
                      <Pause className="w-4 h-4 text-white group-hover:animate-pulse" />
                    ) : (
                      <Play className="w-4 h-4 text-white group-hover:animate-bounce" />
                    )}
                    <span className="text-white text-sm font-medium">
                      {isAutoPlaying ? 'Pausar' : 'Reproduzir'}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Lado direito - Card de depoimento */}
            <div className={`relative ${isVisible ? 'animate-slide-in-right' : 'opacity-100'}`}>
              {/* Fotos flutuantes ao redor do card */}
              {floatingAvatars.map((avatar, index) => (
                <div
                  key={index}
                  className={`absolute ${avatar.position} ${avatar.size} rounded-full border-4 border-white overflow-hidden hidden lg:block animate-float-${index + 1} shadow-xl hover:scale-110 transition-all duration-300 group`}
                  style={{
                    animationDelay: `${index * 0.5}s`,
                  }}
                >
                  <img
                    src={avatar.image || "/placeholder.svg"}
                    alt={`Person ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.svg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#c89968]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}

              {/* Card principal com animações */}
              <div className={`bg-white p-8 md:p-12 relative shadow-2xl transition-all duration-500 hover:shadow-3xl group ${
                isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
              }`}>
                {/* Elementos decorativos de fundo */}
                <div className="absolute inset-0 overflow-hidden rounded-lg">
                  <div className="absolute top-4 right-4 w-20 h-20 border border-[#c89968]/10 rounded-full animate-pulse-slow"></div>
                  <div className="absolute bottom-4 left-4 w-16 h-16 border border-[#c89968]/15 rounded-full animate-float-slow"></div>
                </div>

                {/* Avatar principal com borda dupla e animações */}
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 group-hover:scale-105 transition-transform duration-500">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full border-8 border-white shadow-xl overflow-hidden ring-4 ring-[#c89968] animate-pulse-glow">
                      <img
                        src={testimonials[currentSlide]?.image || "/placeholder.svg"}
                        alt={testimonials[currentSlide]?.name || "Avatar"}
                        className={`w-full h-full object-cover transition-all duration-500 ${
                          isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                        }`}
                        key={currentSlide}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.svg";
                        }}
                      />
                    </div>
                    {/* Anel de brilho animado */}
                    <div className="absolute inset-0 rounded-full border-2 border-[#c89968]/30 animate-ping"></div>
                  </div>
                </div>

                <div className="mt-20 text-center">
                  {/* Rating com animação sequencial */}
                  <div className="flex justify-center gap-1 mb-6" key={`rating-${currentSlide}`}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 fill-[#c89968] text-[#c89968] hover:scale-125 transition-all duration-300 ${
                          isTransitioning ? 'opacity-0' : 'opacity-100 animate-fade-in'
                        }`}
                        style={{ 
                          animationDelay: `${star * 0.1}s`,
                          transitionDelay: `${star * 0.05}s`
                        }}
                      />
                    ))}
                  </div>

                  {/* Name com animação */}
                  <h3
                    className={`text-2xl md:text-3xl font-bold text-black mb-2 transition-all duration-500 ${
                      isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                    }`}
                    key={`name-${currentSlide}`}
                  >
                    {testimonials[currentSlide]?.name || "Nome não disponível"}
                  </h3>
                  <p
                    className={`text-[#c89968] text-sm font-bold mb-8 tracking-wider uppercase transition-all duration-500 ${
                      isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                    }`}
                    key={`role-${currentSlide}`}
                  >
                    {testimonials[currentSlide]?.role || "Cargo não disponível"}
                  </p>

                  {/* Testimonial Text com animação */}
                  <div className="relative">
                    <Quote className="absolute -top-4 -left-4 text-[#c89968]/20 text-6xl animate-pulse" />
                    <p 
                      className={`text-gray-600 leading-relaxed text-lg transition-all duration-500 ${
                        isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                      }`} 
                      key={`text-${currentSlide}`}
                    >
                      {testimonials[currentSlide]?.text || "Depoimento não disponível"}
                    </p>
                    <Quote className="absolute -bottom-4 -right-4 text-[#c89968]/20 text-6xl animate-pulse rotate-180" />
                  </div>
                </div>


                {/* Overlay de brilho no hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer rounded-lg"></div>
              </div>

              {/* Setas de navegação melhoradas */}
              <div className="flex gap-4 justify-end mt-6">
                <button
                  onClick={prevSlide}
                  disabled={isTransitioning}
                  className="w-12 h-12 rounded-full border-2 border-white/40 flex items-center justify-center text-white hover:bg-white hover:text-[#c89968] transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-6 h-6 group-hover:animate-bounce" />
                </button>
                <button
                  onClick={nextSlide}
                  disabled={isTransitioning}
                  className="w-12 h-12 rounded-full border-2 border-white/40 flex items-center justify-center text-white hover:bg-white hover:text-[#c89968] transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-6 h-6 group-hover:animate-bounce" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
