"use client"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import PropertyFilter from "./property-filter"

const slides = [
  { id: 1, image: "/modern-luxury-apartment-building-night-exterior-da.jpg" },
  { id: 2, image: "/luxury-apartment-building-exterior-evening-modern-.jpg" },
  { id: 3, image: "/contemporary-residential-building-night-city-light.jpg" },
]

const phrases = [
  "Transformando cada chave em novas possibilidades",
  "Com a Donna, o seu próximo capítulo começa aqui",
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [phraseIndex, setPhraseIndex] = useState(0)

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

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${slide.image})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="absolute right-20 top-1/2 -translate-y-1/2 z-10">
        <div className="w-32 h-32 rounded-full border border-white/20 animate-pulse-slow" />
        <div
          className="w-24 h-24 rounded-full border border-white/20 absolute top-20 -right-10 animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-16">
        <div className="flex justify-center mb-16">
          <h1
            className={`text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-wider leading-tight text-center transition-all duration-800 ${
              isAnimating ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"
            }`}
          >
            {phrases[phraseIndex]}
          </h1>
        </div>

        <div className="flex justify-center mt-24 md:mt-36 lg:mt-48">
          <div className="w-full max-w-6xl">
            <PropertyFilter />
          </div>
        </div>
      </div>

      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
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
