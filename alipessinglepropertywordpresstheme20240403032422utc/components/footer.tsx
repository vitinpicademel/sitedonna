"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Paintbrush as Pinterest, Mail, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative bg-[#2a1f15] overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M-100,100 Q200,50 500,100 T1100,100"
            stroke="#c89968"
            strokeWidth="1"
            fill="none"
            className="animate-wave-slow"
          />
          <path
            d="M-100,200 Q300,150 600,200 T1200,200"
            stroke="#c89968"
            strokeWidth="1"
            fill="none"
            className="animate-wave-medium"
          />
          <path
            d="M-100,300 Q250,250 550,300 T1150,300"
            stroke="#c89968"
            strokeWidth="1"
            fill="none"
            className="animate-wave-fast"
          />
        </svg>
      </div>

      <div className="absolute left-0 bottom-0 w-1/3 h-full opacity-5 pointer-events-none">
        <svg
          viewBox="0 0 400 500"
          className="absolute bottom-0 left-0 w-full h-auto animate-float-slow"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Prédio principal */}
          <rect x="50" y="150" width="120" height="350" fill="none" stroke="#c89968" strokeWidth="0.5" />

          {/* Janelas do prédio - 5 colunas x 10 linhas */}
          {Array.from({ length: 10 }).map((_, row) =>
            Array.from({ length: 4 }).map((_, col) => (
              <rect
                key={`window-${row}-${col}`}
                x={60 + col * 28}
                y={170 + row * 30}
                width="18"
                height="20"
                fill="none"
                stroke="#c89968"
                strokeWidth="0.5"
              />
            )),
          )}

          {/* Torre lateral */}
          <rect x="180" y="100" width="80" height="400" fill="none" stroke="#c89968" strokeWidth="0.5" />

          {/* Janelas da torre - 3 colunas x 13 linhas */}
          {Array.from({ length: 13 }).map((_, row) =>
            Array.from({ length: 3 }).map((_, col) => (
              <rect
                key={`tower-window-${row}-${col}`}
                x={188 + col * 22}
                y={115 + row * 28}
                width="14"
                height="18"
                fill="none"
                stroke="#c89968"
                strokeWidth="0.5"
              />
            )),
          )}

          {/* Topo decorativo */}
          <polygon points="50,150 110,120 170,150" fill="none" stroke="#c89968" strokeWidth="0.5" />
          <polygon points="180,100 220,75 260,100" fill="none" stroke="#c89968" strokeWidth="0.5" />

          {/* Base */}
          <rect x="40" y="500" width="230" height="10" fill="none" stroke="#c89968" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 mb-12">
          {/* Logo - Ocupa menos espaço */}
          <div className="lg:w-1/6">
            <div className="mb-6">
              <img 
                src="/logoprincipal.png" 
                alt="Logo Donna Negociações" 
                className="h-32 w-auto transition-transform duration-300 hover:scale-105 drop-shadow-lg" 
              />
            </div>
          </div>

          {/* LINKS e CONTATO - Distribuídos no espaço restante */}
          <div className="lg:w-2/3 flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2">
              <h3 className="text-white font-bold text-lg tracking-wider mb-8">LINKS</h3>
              <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                <Link href="/imoveis" className="text-gray-400 hover:text-[#c89968] transition-colors text-base">
                  Imóveis para comprar
                </Link>
                <Link href="/imoveis" className="text-gray-400 hover:text-[#c89968] transition-colors text-base">
                  Imóveis para alugar
                </Link>
                <Link href="/contato" className="text-gray-400 hover:text-[#c89968] transition-colors text-base">
                  Anuncie seu imóvel
                </Link>
                <Link href="/contato" className="text-gray-400 hover:text-[#c89968] transition-colors text-base">
                  Área do cliente
                </Link>
                <Link href="/contato" className="text-gray-400 hover:text-[#c89968] transition-colors text-base">
                  Ouvidoria
                </Link>
                <Link href="/contato" className="text-gray-400 hover:text-[#c89968] transition-colors text-base">
                  Trabalhe conosco
                </Link>
              </div>
            </div>

            <div className="md:w-1/2">
              <h3 className="text-white font-bold text-lg tracking-wider mb-8">CONTATO</h3>
              <ul className="space-y-6">
                <li className="text-gray-400 text-base leading-relaxed">
                  R. Dona Rafa Cecilio, 75 - Vila Maria Helena
                  <br />
                  Uberaba - MG, 38020-080
                </li>
                <li className="flex items-center gap-3 text-gray-400 text-base">
                  <Mail className="w-5 h-5 text-[#c89968]" />
                  vendas@donnanegociacoes.com.br
                </li>
                <li className="flex items-center gap-3 text-gray-400 text-base">
                  <Phone className="w-5 h-5 text-[#c89968]" />
                  (34) 3336-1900
                </li>
              </ul>
            </div>
          </div>

          {/* NEWSLETTER - Mantém no canto direito */}
          <div className="lg:w-1/6">
            <h3 className="text-white font-bold text-lg tracking-wider mb-8">NEWSLETTER</h3>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Seu email"
                className="w-full px-4 py-4 bg-transparent border border-[#4a3a2a] text-white placeholder-gray-500 text-base focus:outline-none focus:border-[#c89968] transition-colors"
              />
              <button
                type="submit"
                className="w-full px-6 py-4 bg-[#c89968] hover:bg-[#b8956a] text-white font-bold text-base tracking-wider transition-colors"
              >
                INSCREVER-SE
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-[#3d2f1f] pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-base">© 2025 | Donna Negociações Imobiliárias | Desenvolvido por Kaká</p>

          <div className="flex gap-8">
            <a
              href="https://www.facebook.com/profile.php?id=100089334065194"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-[#4a3a2a] hover:border-[#c89968] hover:bg-[#c89968] flex items-center justify-center transition-all group"
            >
              <Facebook className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            </a>
            <a
              href="https://www.instagram.com/donnaimob/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-[#4a3a2a] hover:border-[#c89968] hover:bg-[#c89968] flex items-center justify-center transition-all group"
            >
              <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            </a>
          </div>
        </div>
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-[#c89968] hover:bg-[#b8956a] flex items-center justify-center transition-all shadow-lg z-50 group"
        aria-label="Scroll to top"
      >
        <svg
          className="w-5 h-5 text-white transform group-hover:-translate-y-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </footer>
  )
}
