"use client"
import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, ArrowDown } from "lucide-react"
import { Playfair_Display } from "next/font/google"
import PropertyFilter from "./property-filter"

const slides = [
  { id: 1, image: "/modern-luxury-apartment-building-night-exterior-da.jpg" },
  { id: 2, image: "/luxury-apartment-building-exterior-evening-modern-.jpg" },
  { id: 3, image: "/contemporary-residential-building-night-city-light.jpg" },
]

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"] })

const phrases = [
  {
    lead: "Abrindo portas para",
    highlight: "negócios extraordinários",
  },
  {
    lead: "Transformando cada chave em",
    highlight: "novas possibilidades",
  },
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [phraseIndex, setPhraseIndex] = useState(0)
  const filterRef = useRef<HTMLDivElement | null>(null)

  const changeSlide = (direction: "next" | "prev") => {
    if (isAnimating) return

    setIsAnimating(true)

    if (direction === "next") {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    } else {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    }
    setPhraseIndex((prev) => (prev + 1) % phrases.length)

    setTimeout(() => setIsAnimating(false), 800)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      changeSlide("next")
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const slide = slides[currentSlide]
  const scrollToFilter = () => {
    if (filterRef.current) {
      filterRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <section className="relative min-h-[100dvh] flex items-start lg:items-center overflow-hidden pt-20 pb-12 lg:pt-16 lg:pb-10">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${slide.image})`,
        }}
      >
        <div className="absolute inset-0 bg-[#3d2f28]/60 lg:bg-[#3d2f28]/70" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#3d2f28]/95 via-[#3d2f28]/50 to-transparent pointer-events-none" />
      </div>

      {/* Elementos decorativos - apenas desktop */}
      <div className="hidden lg:block absolute right-20 top-1/2 -translate-y-1/2 z-10">
        <div className="w-32 h-32 rounded-full border border-white/20 animate-pulse-slow" />
        <div
          className="w-24 h-24 rounded-full border border-white/20 absolute top-20 -right-10 animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-16">
        {/* Tipografia com duas linhas e maior respiro */}
        <div
          className={`flex flex-col items-center text-center gap-2 lg:gap-4 mb-10 md:mb-12 lg:mb-16 transition-all duration-700 px-4 ${
            isAnimating ? "opacity-0 translate-y-8" : "opacity-100 translate-y-0"
          }`}
        >
          <p className="text-white text-xl lg:text-[1.8rem] font-light tracking-[0.0625em]">
            {phrases[phraseIndex].lead}
          </p>
          <p
            className={`${playfair.className} text-[2rem] lg:text-[4rem] italic text-[#c89968] leading-tight`}
          >
            {phrases[phraseIndex].highlight}
          </p>
        </div>

        {/* Mobile: filtro aparece parcialmente para incentivar a rolagem */}
        <div className="flex justify-center mt-16 md:mt-20 lg:mt-48">
          <div ref={filterRef} className="w-full max-w-6xl px-2 lg:px-0">
            <PropertyFilter />
          </div>
        </div>
      </div>

      {/* Botão de orientação - apenas mobile */}
      <button
        type="button"
        onClick={scrollToFilter}
        aria-label="Ver mais filtros"
        className="lg:hidden absolute bottom-5 right-5 z-30 h-12 w-12 rounded-full bg-[#c89968] text-[#3d2f28] shadow-2xl flex items-center justify-center border border-[#86674a]/50"
      >
        <ArrowDown className="w-5 h-5" />
      </button>

      {/* Botões de navegação - apenas desktop */}
      <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col gap-4 z-20">
        <button
          onClick={() => changeSlide("prev")}
          className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center text-white hover:bg-white/10 hover:border-white transition-all disabled:opacity-50"
          disabled={isAnimating}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => changeSlide("next")}
          className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center text-white hover:bg-white/10 hover:border-white transition-all disabled:opacity-50"
          disabled={isAnimating}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true)
                setCurrentSlide(index)
                setTimeout(() => setIsAnimating(false), 800)
              }
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? "bg-[#c89968] w-8" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  )
}
