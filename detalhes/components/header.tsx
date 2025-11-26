"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-effect shadow-lg shadow-[#E5A93D]/10" : "bg-[#1A1A1A]"
      } border-b border-[#2C2C2C]`}
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className="text-[#F5F5F5] text-sm font-medium hover:text-[#FFD27A] transition-all duration-300 hover:scale-105"
            >
              IMÓVEIS
            </Link>
            <Link
              href="/"
              className="text-[#F5F5F5] text-sm font-medium hover:text-[#FFD27A] transition-all duration-300 hover:scale-105"
            >
              A IMOBILIÁRIA
            </Link>
            <Link
              href="/"
              className="text-[#F5F5F5] text-sm font-medium hover:text-[#FFD27A] transition-all duration-300 hover:scale-105"
            >
              LANÇAMENTOS
            </Link>
          </div>

          <div className="flex items-center">
            <div className="text-center group cursor-pointer">
              <div className="w-16 h-16 bg-[#E5A93D] rounded-sm flex items-center justify-center transition-all duration-300 group-hover:bg-[#F1C75B] group-hover:scale-110 group-hover:rotate-3">
                <svg className="w-10 h-10 text-[#0E0E0E]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 2.18l8 4v8.82c0 4.52-3.07 8.75-8 9.82-4.93-1.07-8-5.3-8-9.82V8.18l8-4z" />
                  <path d="M10 17l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                </svg>
              </div>
              <div className="text-[#F5F5F5] text-xs font-bold mt-1">CHAVE DE OURO</div>
              <div className="text-[#B3B3B3] text-[10px]">imobiliária</div>
            </div>
          </div>

          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className="text-[#F5F5F5] text-sm font-medium hover:text-[#FFD27A] transition-all duration-300 hover:scale-105"
            >
              CONTATO
            </Link>
            <Link
              href="/"
              className="text-[#F5F5F5] text-sm font-medium hover:text-[#FFD27A] transition-all duration-300 hover:scale-105"
            >
              CONDOMÍNIOS
            </Link>
            <Link
              href="/"
              className="text-[#F5F5F5] text-sm font-medium hover:text-[#FFD27A] transition-all duration-300 hover:scale-105"
            >
              ÁREA DO CLIENTE
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
