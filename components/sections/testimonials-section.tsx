"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    id: 1,
    name: "Maria Silva",
    role: "Compradora",
    content:
      "Excelente atendimento! A equipe da Donna me ajudou a encontrar a casa dos meus sonhos. Profissionais competentes e atenciosos.",
    rating: 5,
  },
  {
    id: 2,
    name: "João Santos",
    role: "Vendedor",
    content:
      "Venderam meu apartamento em tempo recorde! Processo transparente e comunicação constante. Super recomendo!",
    rating: 5,
  },
  {
    id: 3,
    name: "Ana Costa",
    role: "Locatária",
    content:
      "Encontrei o apartamento perfeito para minha família. Atendimento personalizado e muita dedicação da equipe.",
    rating: 5,
  },
  {
    id: 4,
    name: "Carlos Oliveira",
    role: "Investidor",
    content:
      "Parceria de confiança para meus investimentos imobiliários. Sempre com as melhores oportunidades do mercado.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-donna-navy font-serif mb-4">O que nossos clientes dizem</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Histórias reais de pessoas que confiaram na Donna Imobiliária para realizar seus sonhos
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <Card className="mx-auto max-w-2xl">
                    <CardContent className="p-8 text-center">
                      <div className="flex justify-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-donna-gold text-donna-gold" />
                        ))}
                      </div>
                      <blockquote className="text-lg text-gray-700 mb-6 italic">"{testimonial.content}"</blockquote>
                      <div>
                        <p className="font-semibold text-donna-navy">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center items-center mt-8 space-x-4">
            <Button variant="outline" size="sm" onClick={prevSlide}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-donna-gold" : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
            <Button variant="outline" size="sm" onClick={nextSlide}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
