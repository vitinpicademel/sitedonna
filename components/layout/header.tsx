"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { site } from "@/lib/site.config"

// Navegação dividida como no site de referência
const leftNavigation = [
  { name: "IMÓVEIS", href: "/imoveis" },
  { name: "A IMOBILIÁRIA", href: "/a-imobiliaria" },
  { name: "LANÇAMENTOS", href: "/lancamentos" },
]

const rightNavigation = [
  { name: "CONDOMÍNIOS", href: "/condominios" },
  { name: "CONTATO", href: "/contato" },
  { name: "ÁREA DO CLIENTE", href: site.areaDoClienteUrl, external: true },
]

type HeaderProps = {
  appearance?: "light" | "dark"
}

export function Header({ appearance = "light" }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const isDark = appearance === "dark"

  return (
    <>
      {/* Header transparente com blur; variação clara/escura */}
      <div className={`fixed top-0 left-0 right-0 z-[1000] ${
        // Desktop: mantém blur
        'lg:backdrop-blur-md' 
      } ${
        // Mobile: sem blur, apenas background sólido
        isDark 
          ? 'bg-[#3d2f28] lg:bg-[#3d2f28]/85 lg:supports-[backdrop-filter]:bg-[#3d2f28]/70 border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,.35)]' 
          : 'bg-white lg:bg-white/70 lg:supports-[backdrop-filter]:bg-white/50 border-b border-black/5 shadow-[0_8px_16px_rgba(0,0,0,.08)]'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex h-16 lg:h-24 items-center justify-between lg:justify-center">
            {/* Logo Mobile - à esquerda */}
            <div className="lg:hidden">
              <Link href="/" className="flex items-center">
                <Image
                  src="/logoprincipal.png"
                  alt="Donna Imobiliária"
                  width={120}
                  height={42}
                  className="h-auto max-h-10 w-auto"
                  priority
                />
              </Link>
            </div>

            {/* Navegação com simetria perfeita: esquerda | logo | direita - Desktop */}
            <nav className="hidden lg:flex items-center w-full">
              {/* Grupo esquerdo */}
              <ul className="flex items-center justify-end gap-10 flex-1">
                {leftNavigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      prefetch={false}
                      className={`text-base xl:text-lg font-medium transition-colors duration-300 tracking-wide ${
                        isDark ? 'text-white hover:text-chave-dourado' : 'text-chave-azul hover:text-chave-dourado'
                      }`}
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Logo central absoluto no fluxo - Desktop */}
              <div className="px-10">
                <Link href="/" className="flex items-center">
                  <Image
                    src="/logoprincipal.png"
                    alt="Donna Imobiliária"
                    width={170}
                    height={60}
                    className="h-auto max-h-14 w-auto"
                    priority
                  />
                </Link>
              </div>

              {/* Grupo direito */}
              <ul className="flex items-center justify-start gap-10 flex-1">
                {rightNavigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      prefetch={false}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className={`text-base xl:text-lg font-medium transition-colors duration-300 tracking-wide ${
                        isDark ? 'text-white hover:text-chave-dourado' : 'text-chave-azul hover:text-chave-dourado'
                      }`}
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Botão Menu Mobile - à direita */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-chave-azul hover:text-chave-dourado transition-colors duration-300"
              aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      <div 
        className={`fixed inset-0 z-40 bg-chave-azul transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        } lg:hidden`}
        style={{ paddingTop: '80px' }}
      >
        <div className="container mx-auto px-4">
          <nav className="flex flex-col space-y-8">
            {[...leftNavigation, ...rightNavigation].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                prefetch={false}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="text-2xl font-light text-chave-branco hover:text-chave-dourado transition-colors duration-300 tracking-wide"
                style={{ fontFamily: 'Poppins, sans-serif' }}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Espaçamento para o header fixo */}
      <div className="h-16 lg:h-24"></div>
    </>
  )
}