"use client"

import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { site } from "@/lib/site.config"
import { formatPhone } from "@/lib/utils/currency"

export function ContactInfo() {
  // Paleta de cores Dark Luxury Premium
  const primaryColor = "#423229" // Marrom Café/Expresso
  const accentColor = "#d4a574" // Dourado quente
  const textColor = "#f7f4ed" // Creme/Off-white
  const textMuted = "#d4c5b3" // Texto secundário

  return (
    <div className="space-y-8">
      {/* Contact Details Card com Glassmorphism Premium */}
      <div
        className="rounded-[20px]"
        style={{
          background: 'rgba(0, 0, 0, 0.35)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(212, 165, 116, 0.3)',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(212, 165, 116, 0.1) inset',
          padding: '3rem 2.5rem'
        }}
      >
        <h3 
          className="text-3xl font-serif font-bold mb-10"
          style={{
            color: accentColor,
            fontFamily: 'Playfair Display, serif',
            letterSpacing: '-0.01em'
          }}
        >
          Informações de contato
        </h3>
        <div className="space-y-7">
          <div className="flex items-start space-x-4">
            <MapPin 
              className="h-6 w-6 mt-0.5 flex-shrink-0" 
              style={{ color: accentColor }}
            />
            <div>
              <p 
                className="text-lg font-semibold mb-2"
                style={{ 
                  color: textColor, 
                  fontFamily: 'Playfair Display, serif' 
                }}
              >
                Endereço
              </p>
              <p 
                className="text-base leading-relaxed"
                style={{ 
                  color: textMuted,
                  fontFamily: 'Poppins, sans-serif'
                }}
              >
                {site.address}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Phone 
              className="h-6 w-6 flex-shrink-0" 
              style={{ color: accentColor }}
            />
            <div>
              <p 
                className="text-lg font-semibold mb-2"
                style={{ 
                  color: textColor, 
                  fontFamily: 'Playfair Display, serif' 
                }}
              >
                Telefone
              </p>
              <p 
                className="text-base"
                style={{ 
                  color: textMuted,
                  fontFamily: 'Poppins, sans-serif'
                }}
              >
                {formatPhone(site.phone)}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Mail 
              className="h-6 w-6 flex-shrink-0" 
              style={{ color: accentColor }}
            />
            <div>
              <p 
                className="text-lg font-semibold mb-2"
                style={{ 
                  color: textColor, 
                  fontFamily: 'Playfair Display, serif' 
                }}
              >
                E-mail
              </p>
              <p 
                className="text-base"
                style={{ 
                  color: textMuted,
                  fontFamily: 'Poppins, sans-serif'
                }}
              >
                {site.email}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <Clock 
              className="h-6 w-6 mt-0.5 flex-shrink-0" 
              style={{ color: accentColor }}
            />
            <div>
              <p 
                className="text-lg font-semibold mb-2"
                style={{ 
                  color: textColor, 
                  fontFamily: 'Playfair Display, serif' 
                }}
              >
                Horário de funcionamento
              </p>
              <div 
                className="text-base space-y-1"
                style={{ 
                  color: textMuted,
                  fontFamily: 'Poppins, sans-serif'
                }}
              >
                <p>Segunda a sexta: 8h30 às 18h</p>
                <p>Sábado: 9h às 13h</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Card com Glassmorphism Premium */}
      <div
        className="rounded-[20px]"
        style={{
          background: 'rgba(0, 0, 0, 0.35)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(212, 165, 116, 0.3)',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(212, 165, 116, 0.1) inset',
          padding: '3rem 2.5rem'
        }}
      >
        <h3 
          className="text-3xl font-serif font-bold mb-10"
          style={{
            color: accentColor,
            fontFamily: 'Playfair Display, serif',
            letterSpacing: '-0.01em'
          }}
        >
          Fale conosco agora
        </h3>
        <div className="space-y-4">
          {/* Botão WhatsApp como Outline Elegante */}
          <a 
            href={site.whatsapp} 
            target="_blank" 
            rel="noopener noreferrer"
            className="contact-outline-button w-full font-serif font-semibold text-lg transition-all duration-300 flex items-center justify-center"
            style={{
              background: 'transparent',
              border: '1px solid rgba(212, 165, 116, 0.4)',
              color: accentColor,
              padding: '18px 32px',
              borderRadius: '12px',
              fontFamily: 'Playfair Display, serif',
              fontSize: '18px',
              fontWeight: 600,
              letterSpacing: '0.01em',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <MessageCircle className="mr-3 h-5 w-5" style={{ color: accentColor }} />
            WhatsApp
          </a>

          {/* Botão Mapa como Outline Elegante */}
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            className="contact-outline-button w-full font-serif font-semibold text-lg transition-all duration-300 flex items-center justify-center"
            style={{
              background: 'transparent',
              border: '1px solid rgba(212, 165, 116, 0.4)',
              color: accentColor,
              padding: '18px 32px',
              borderRadius: '12px',
              fontFamily: 'Playfair Display, serif',
              fontSize: '18px',
              fontWeight: 600,
              letterSpacing: '0.01em',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <MapPin className="mr-3 h-5 w-5" style={{ color: accentColor }} />
            Ver no Mapa
          </a>
        </div>
      </div>

      {/* Map Embed com Glassmorphism Premium */}
      <div
        className="rounded-[20px] overflow-hidden"
        style={{
          background: 'rgba(0, 0, 0, 0.35)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(212, 165, 116, 0.3)',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(212, 165, 116, 0.1) inset'
        }}
      >
        <div className="aspect-video relative">
          <iframe
            src={site.mapUrl}
            width="100%"
            height="100%"
            style={{ 
              border: 0,
              filter: 'grayscale(100%) invert(100%) brightness(0.4) contrast(1.3) hue-rotate(180deg)',
              mixBlendMode: 'multiply'
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização da Donna Imobiliária"
          />
          {/* Overlay escuro para harmonizar o mapa com o tema */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(42, 31, 26, 0.6) 0%, rgba(66, 50, 41, 0.5) 100%)',
              mixBlendMode: 'multiply'
            }}
          />
        </div>
      </div>
    </div>
  )
}
