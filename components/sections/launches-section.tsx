"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LaunchCard } from "@/components/ui/launch-card"
import type { Launch } from "@/lib/types"
import launchesData from "@/data/launches.json"

export function LaunchesSection() {
  const [launches] = useState<Launch[]>(launchesData)
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % launches.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + launches.length) % launches.length)
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 bg-chave-azul">
      <div className="container mx-auto px-4 reveal reveal-slow">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12">
          <div className="mb-6 md:mb-0">
            <h2 
              className="reveal reveal-delay-1 text-3xl md:text-4xl font-semibold text-chave-branco mb-4"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Lançamentos
            </h2>
            <p 
              className="reveal reveal-delay-2 text-chave-cinza text-lg leading-relaxed max-w-2xl"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Encante-se com nossa seleção de lançamentos selecionados com carinho e cuidado pra vocês.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <span 
              className="text-sm text-chave-cinza"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {currentIndex + 1}/{launches.length}
            </span>
            <div className="reveal reveal-delay-3 flex space-x-2">
              <button 
                onClick={prevSlide}
                className="p-2 border border-chave-cinza border-opacity-30 text-chave-cinza hover:text-chave-dourado hover:border-chave-dourado transition-colors duration-300 rounded-lg"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button 
                onClick={nextSlide}
                className="p-2 border border-chave-cinza border-opacity-30 text-chave-cinza hover:text-chave-dourado hover:border-chave-dourado transition-colors duration-300 rounded-lg"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <Link
              href="/lancamentos"
              className="px-6 py-3 bg-chave-gradient-dourado text-chave-branco font-bold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              style={{
                fontFamily: 'Poppins, sans-serif',
                background: 'linear-gradient(90deg, #f1c40f, #f39c12)'
              }}
            >
              VER TODOS
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden reveal reveal-slow reveal-delay-2">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {launches.map((launch) => (
              <div key={launch.id} className="min-w-full flex-shrink-0 px-2">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <LaunchCard launch={launch} />
                  </div>
                  <div className="space-y-4">
                    <div className="bg-chave-branco bg-opacity-10 backdrop-blur-sm p-6 rounded-lg border border-chave-cinza border-opacity-20">
                      <h3 
                        className="font-semibold text-lg mb-2 text-chave-branco"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        {launch.title}
                      </h3>
                      <p 
                        className="text-chave-cinza text-sm mb-4"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        {launch.description}
                      </p>
                      {launch.highlights && (
                        <ul className="space-y-1">
                          {launch.highlights.slice(0, 3).map((highlight, index) => (
                            <li key={index} className="text-sm text-chave-cinza flex items-center">
                              <span className="w-2 h-2 bg-chave-dourado rounded-full mr-2"></span>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
