"use client"

import { MessageCircle } from "lucide-react"

export function WhatsAppButton() {
  const phoneNumber = "+5511999999999"
  const message = "Olá! Gostaria de mais informações sobre os imóveis disponíveis."

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-8 right-8 bg-green-500 hover:bg-green-600 text-white p-4 rounded-2xl elegant-shadow transition-all duration-300 hover:scale-110 hover:-translate-y-1 z-50 group"
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle className="h-7 w-7 group-hover:animate-bounce" />
      <div className="absolute -top-12 right-0 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        Fale conosco!
      </div>
    </button>
  )
}
