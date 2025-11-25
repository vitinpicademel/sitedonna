"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#1a1410]/90 lg:backdrop-blur-xl border-b border-[#3d2f1f] shadow-2xl"
          : "bg-[#1a1410] lg:bg-black/30 lg:backdrop-blur-lg border-b border-white/30"
      }`}
    >
      {/* Moldura com blur - overlay decorativo bem próximo das letras - apenas desktop */}
      <div className="hidden lg:block absolute inset-x-48 inset-y-0 bg-gradient-to-r from-[#c89968]/5 via-transparent to-[#c89968]/5 pointer-events-none"></div>
      
      {/* Borda superior com gradiente bem próxima das letras - apenas desktop */}
      <div className="hidden lg:block absolute top-0 left-64 right-64 h-px bg-gradient-to-r from-transparent via-[#c89968]/50 to-transparent"></div>
      
      {/* Borda inferior com gradiente bem próxima das letras - apenas desktop */}
      <div className="hidden lg:block absolute bottom-0 left-64 right-64 h-px bg-gradient-to-r from-transparent via-[#c89968]/30 to-transparent"></div>
      {/* Top Bar removido por solicitação */}

      {/* Main Navigation - dividida com logo central */}
      <div className="container mx-auto px-5">
        <div className="relative">
          {/* Moldura interna com blur bem próxima das letras - apenas desktop */}
          <div className="hidden lg:block absolute inset-x-20 inset-y-0 bg-gradient-to-r from-[#c89968]/10 via-transparent to-[#c89968]/10 rounded-2xl backdrop-blur-sm border border-[#c89968]/20 shadow-inner"></div>
          
          {/* Conteúdo principal */}
          <div className="relative flex items-center justify-between lg:justify-center py-3 lg:py-4 px-0 lg:px-6">
            {/* Logo Mobile - à esquerda */}
            <div className="lg:hidden">
              <Link href="/" className="flex items-center group">
                <img 
                  src="/logoprincipal.png" 
                  alt="Logo" 
                  className="h-10 w-auto transition-transform duration-300 group-hover:scale-105 drop-shadow-lg" 
                />
              </Link>
            </div>

          <nav className="hidden lg:flex items-center w-full">
            {/* Grupo esquerdo */}
            <ul className="flex items-center justify-end gap-8 flex-1">
              <li>
                <Link 
                  href="/home-novo" 
                  className="text-white hover:text-[#c89968] transition-all duration-300 font-bold text-sm tracking-wider px-3 py-2 rounded-lg hover:bg-white/10 hover:shadow-lg relative group"
                  style={{ 
                    textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                    WebkitTextStroke: '0.5px rgba(0,0,0,0.3)'
                  }}
                >
                  HOME
                  <div className="absolute inset-0 bg-gradient-to-r from-[#c89968]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                </Link>
              </li>
              <li>
                <Link 
                  href="/a-imobiliaria" 
                  className="text-white hover:text-[#c89968] transition-all duration-300 font-bold text-sm tracking-wider px-3 py-2 rounded-lg hover:bg-white/10 hover:shadow-lg relative group"
                  style={{ 
                    textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                    WebkitTextStroke: '0.5px rgba(0,0,0,0.3)'
                  }}
                >
                  A IMOBILIÁRIA
                  <div className="absolute inset-0 bg-gradient-to-r from-[#c89968]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                </Link>
              </li>
              <li>
                <Link 
                  href="/lancamentos" 
                  className="text-white hover:text-[#c89968] transition-all duration-300 font-bold text-sm tracking-wider px-3 py-2 rounded-lg hover:bg-white/10 hover:shadow-lg relative group"
                  style={{ 
                    textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                    WebkitTextStroke: '0.5px rgba(0,0,0,0.3)'
                  }}
                >
                  LANÇAMENTOS
                  <div className="absolute inset-0 bg-gradient-to-r from-[#c89968]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                </Link>
              </li>
            </ul>

            {/* Logo central */}
            <div className="px-6">
              <Link href="/" className="flex items-center group">
                <img 
                  src="/logoprincipal.png" 
                  alt="Logo" 
                  className="h-12 md:h-14 w-auto transition-transform duration-300 group-hover:scale-105 drop-shadow-lg" 
                />
              </Link>
            </div>

            {/* Grupo direito */}
            <ul className="flex items-center justify-start gap-8 flex-1">
              <li>
                <Link 
                  href="/imoveis" 
                  className="text-white hover:text-[#c89968] transition-all duration-300 font-bold text-sm tracking-wider px-3 py-2 rounded-lg hover:bg-white/10 hover:shadow-lg relative group"
                  style={{ 
                    textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                    WebkitTextStroke: '0.5px rgba(0,0,0,0.3)'
                  }}
                >
                  IMÓVEIS
                  <div className="absolute inset-0 bg-gradient-to-r from-[#c89968]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                </Link>
              </li>
              <li>
                <Link 
                  href="/condominios" 
                  className="text-white hover:text-[#c89968] transition-all duration-300 font-bold text-sm tracking-wider px-3 py-2 rounded-lg hover:bg-white/10 hover:shadow-lg relative group"
                  style={{ 
                    textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                    WebkitTextStroke: '0.5px rgba(0,0,0,0.3)'
                  }}
                >
                  CONDOMÍNIOS
                  <div className="absolute inset-0 bg-gradient-to-r from-[#c89968]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                </Link>
              </li>
              <li>
                <Link 
                  href="/contato" 
                  className="text-white hover:text-[#c89968] transition-all duration-300 font-bold text-sm tracking-wider px-3 py-2 rounded-lg hover:bg-white/10 hover:shadow-lg relative group"
                  style={{ 
                    textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                    WebkitTextStroke: '0.5px rgba(0,0,0,0.3)'
                  }}
                >
                  CONTATO
                  <div className="absolute inset-0 bg-gradient-to-r from-[#c89968]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Botão Mobile - à direita */}
          <button 
            className="lg:hidden flex items-center gap-2 text-white px-3 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            style={{ 
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              WebkitTextStroke: '0.5px rgba(0,0,0,0.3)'
            }}
          >
            {mobileMenuOpen ? (
              <>
                <X className="w-5 h-5" />
                <span className="text-sm font-medium uppercase tracking-wide">Fechar</span>
              </>
            ) : (
              <>
                <Menu className="w-5 h-5" />
                <span className="text-sm font-medium uppercase tracking-wide">Menu</span>
              </>
            )}
          </button>
          </div>
          
          {/* Elementos decorativos da moldura bem próximos das letras - apenas desktop */}
          <div className="hidden lg:block absolute top-2 left-16 w-2 h-2 bg-[#c89968]/30 rounded-full animate-pulse"></div>
          <div className="hidden lg:block absolute top-2 right-16 w-2 h-2 bg-[#c89968]/30 rounded-full animate-pulse"></div>
          <div className="hidden lg:block absolute bottom-2 left-16 w-2 h-2 bg-[#c89968]/30 rounded-full animate-pulse"></div>
          <div className="hidden lg:block absolute bottom-2 right-16 w-2 h-2 bg-[#c89968]/30 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#2a2420] bg-[#1a1410]/95 backdrop-blur-xl shadow-2xl relative">
          {/* Moldura do menu mobile */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#c89968]/10 via-transparent to-[#c89968]/10 pointer-events-none"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c89968]/50 to-transparent"></div>
          
          <nav className="container mx-auto px-4 py-6 flex flex-col gap-4 relative">
            <Link 
              href="/home-novo" 
              className="text-white hover:text-[#c89968] transition-all duration-300 font-bold text-sm tracking-wider px-4 py-3 rounded-lg hover:bg-white/10 hover:shadow-lg relative group"
              style={{ 
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                WebkitTextStroke: '0.5px rgba(0,0,0,0.3)'
              }}
            >
              HOME
              <div className="absolute inset-0 bg-gradient-to-r from-[#c89968]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            </Link>
            <Link 
              href="/a-imobiliaria" 
              className="text-white hover:text-[#c89968] transition-all duration-300 font-bold text-sm tracking-wider px-4 py-3 rounded-lg hover:bg-white/10 hover:shadow-lg relative group"
              style={{ 
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                WebkitTextStroke: '0.5px rgba(0,0,0,0.3)'
              }}
            >
              A IMOBILIÁRIA
              <div className="absolute inset-0 bg-gradient-to-r from-[#c89968]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            </Link>
            <Link 
              href="/lancamentos" 
              className="text-white hover:text-[#c89968] transition-all duration-300 font-bold text-sm tracking-wider px-4 py-3 rounded-lg hover:bg-white/10 hover:shadow-lg relative group"
              style={{ 
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                WebkitTextStroke: '0.5px rgba(0,0,0,0.3)'
              }}
            >
              LANÇAMENTOS
              <div className="absolute inset-0 bg-gradient-to-r from-[#c89968]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            </Link>
            <Link 
              href="/imoveis" 
              className="text-white hover:text-[#c89968] transition-all duration-300 font-bold text-sm tracking-wider px-4 py-3 rounded-lg hover:bg-white/10 hover:shadow-lg relative group"
              style={{ 
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                WebkitTextStroke: '0.5px rgba(0,0,0,0.3)'
              }}
            >
              IMÓVEIS
              <div className="absolute inset-0 bg-gradient-to-r from-[#c89968]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            </Link>
            <Link 
              href="/condominios" 
              className="text-white hover:text-[#c89968] transition-all duration-300 font-bold text-sm tracking-wider px-4 py-3 rounded-lg hover:bg-white/10 hover:shadow-lg relative group"
              style={{ 
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                WebkitTextStroke: '0.5px rgba(0,0,0,0.3)'
              }}
            >
              CONDOMÍNIOS
              <div className="absolute inset-0 bg-gradient-to-r from-[#c89968]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            </Link>
            <Link 
              href="/contato" 
              className="text-white hover:text-[#c89968] transition-all duration-300 font-bold text-sm tracking-wider px-4 py-3 rounded-lg hover:bg-white/10 hover:shadow-lg relative group"
              style={{ 
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                WebkitTextStroke: '0.5px rgba(0,0,0,0.3)'
              }}
            >
              CONTATO
              <div className="absolute inset-0 bg-gradient-to-r from-[#c89968]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
