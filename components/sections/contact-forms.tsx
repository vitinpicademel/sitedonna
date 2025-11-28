"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { MessageCircle, Home, Briefcase } from "lucide-react"

export function ContactForms() {
  // Paleta de cores Dark Luxury Premium
  const primaryColor = "#423229" // Marrom Café/Expresso
  const accentColor = "#d4a574" // Dourado quente
  const accentColorLight = "#e5b890" // Dourado claro
  const textColor = "#f7f4ed" // Creme/Off-white
  const textMuted = "#d4c5b3" // Texto secundário

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    acceptPrivacy: false,
  })

  const handleSubmit = (e: React.FormEvent, formType: string) => {
    e.preventDefault()
    console.log(`${formType} form submitted:`, formData)
    // Handle form submission
  }

  return (
    <div>
      <h2 
        className="text-4xl lg:text-5xl font-serif font-bold mb-8 lg:mb-10"
        style={{
          color: accentColor,
          fontFamily: 'Playfair Display, serif',
          letterSpacing: '-0.01em',
          lineHeight: '1.2'
        }}
      >
        Como podemos ajudar?
      </h2>

      <Tabs defaultValue="message" className="w-full">
        {/* Tabs List com glassmorphism premium */}
        <TabsList 
          className="grid w-full grid-cols-3 mb-10 lg:mb-12"
          style={{
            background: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(212, 165, 116, 0.2)',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            padding: '12px',
            minHeight: '80px',
            height: 'auto'
          }}
        >
          <TabsTrigger 
            value="message" 
            className="flex items-center justify-center gap-2.5 transition-all data-[state=active]:bg-black/50 data-[state=active]:text-[#d4a574] hover:text-[#f7f4ed]"
            style={{
              color: textMuted,
              fontFamily: 'Playfair Display, serif',
              fontSize: '15px',
              fontWeight: 500,
              padding: '16px 12px',
              minHeight: '60px',
              height: 'auto',
              borderRadius: '12px',
              whiteSpace: 'normal',
              lineHeight: '1.3'
            }}
          >
            <MessageCircle className="h-5 w-5 flex-shrink-0" />
            <span className="whitespace-normal text-center">Enviar mensagem</span>
          </TabsTrigger>
          <TabsTrigger 
            value="sell" 
            className="flex items-center justify-center gap-2.5 transition-all data-[state=active]:bg-black/50 data-[state=active]:text-[#d4a574] hover:text-[#f7f4ed]"
            style={{
              color: textMuted,
              fontFamily: 'Playfair Display, serif',
              fontSize: '15px',
              fontWeight: 500,
              padding: '16px 12px',
              minHeight: '60px',
              height: 'auto',
              borderRadius: '12px',
              whiteSpace: 'normal',
              lineHeight: '1.3'
            }}
          >
            <Home className="h-5 w-5 flex-shrink-0" />
            <span className="whitespace-normal text-center">Anunciar imóvel</span>
          </TabsTrigger>
          <TabsTrigger 
            value="work" 
            className="flex items-center justify-center gap-2.5 transition-all data-[state=active]:bg-black/50 data-[state=active]:text-[#d4a574] hover:text-[#f7f4ed]"
            style={{
              color: textMuted,
              fontFamily: 'Playfair Display, serif',
              fontSize: '15px',
              fontWeight: 500,
              padding: '16px 12px',
              minHeight: '60px',
              height: 'auto',
              borderRadius: '12px',
              whiteSpace: 'normal',
              lineHeight: '1.3'
            }}
          >
            <Briefcase className="h-5 w-5 flex-shrink-0" />
            <span className="whitespace-normal text-center">Trabalhe conosco</span>
          </TabsTrigger>
        </TabsList>

        {/* Form Card com Glassmorphism Premium */}
        <TabsContent value="message">
          <div
            className="rounded-[20px]"
            style={{
              background: 'rgba(0, 0, 0, 0.35)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(212, 165, 116, 0.3)',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(212, 165, 116, 0.1) inset',
              paddingTop: '3rem',
              paddingRight: '2.5rem',
              paddingBottom: '3.5rem',
              paddingLeft: '2.5rem',
              minHeight: 'auto',
              height: 'auto',
              overflow: 'visible'
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
              Enviar mensagem
            </h3>
            <form onSubmit={(e) => handleSubmit(e, "message")} className="space-y-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                <div className="space-y-3">
                  <Label 
                    htmlFor="name"
                    className="text-base font-medium"
                    style={{ 
                      color: textColor,
                      fontFamily: 'Poppins, sans-serif'
                    }}
                  >
                    Nome completo
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Seu nome completo"
                    className="contact-form-input h-14 text-base transition-all duration-300"
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.25)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '12px',
                      color: textColor,
                      padding: '16px 20px',
                      fontFamily: 'Poppins, sans-serif'
                    }}
                  />
                </div>
                <div className="space-y-3">
                  <Label 
                    htmlFor="phone"
                    className="text-base font-medium"
                    style={{ 
                      color: textColor,
                      fontFamily: 'Poppins, sans-serif'
                    }}
                  >
                    Telefone
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    placeholder="(00) 00000-0000"
                    className="h-14 text-base transition-all duration-300"
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.25)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '12px',
                      color: textColor,
                      padding: '16px 20px',
                      fontFamily: 'Poppins, sans-serif'
                    }}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label 
                  htmlFor="email"
                  className="text-base font-medium"
                  style={{ 
                    color: textColor,
                    fontFamily: 'Poppins, sans-serif'
                  }}
                >
                  E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder="seu@email.com"
                  className="h-14 text-base transition-all duration-300"
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.25)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    color: textColor,
                    padding: '16px 20px',
                    fontFamily: 'Poppins, sans-serif'
                  }}
                />
              </div>

              <div className="space-y-3">
                <Label 
                  htmlFor="message"
                  className="text-base font-medium"
                  style={{ 
                    color: textColor,
                    fontFamily: 'Poppins, sans-serif'
                  }}
                >
                  Mensagem
                </Label>
                <Textarea
                  id="message"
                  placeholder="Como podemos ajudar você?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  required
                  className="min-h-[140px] text-base transition-all duration-300 resize-none"
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.25)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    color: textColor,
                    padding: '16px 20px',
                    fontFamily: 'Poppins, sans-serif'
                  }}
                />
              </div>

              <div className="flex items-start space-x-4 pt-2">
                <Checkbox
                  id="privacy-message"
                  checked={formData.acceptPrivacy}
                  onCheckedChange={(checked) => setFormData({ ...formData, acceptPrivacy: checked as boolean })}
                  className="mt-1"
                  style={{
                    borderColor: accentColor,
                    accentColor: accentColor,
                    width: '20px',
                    height: '20px'
                  }}
                />
                <Label 
                  htmlFor="privacy-message" 
                  className="text-sm leading-relaxed cursor-pointer flex-1"
                  style={{ 
                    color: textMuted,
                    fontFamily: 'Poppins, sans-serif'
                  }}
                >
                  Li e concordo com a Política de Privacidade
                </Label>
              </div>

              <div className="pt-4 pb-2">
                <Button
                  type="submit"
                  disabled={!formData.acceptPrivacy}
                  className="w-full font-serif font-semibold text-lg transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColorLight} 50%, #c89968 100%)`,
                    color: primaryColor,
                    border: 'none',
                    padding: '18px 32px',
                    borderRadius: '12px',
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '18px',
                    fontWeight: 600,
                    letterSpacing: '0.01em',
                    boxShadow: '0 4px 16px rgba(212, 165, 116, 0.25)',
                    height: 'auto'
                  }}
                >
                  Enviar mensagem
                </Button>
              </div>
            </form>
          </div>
        </TabsContent>

        <TabsContent value="sell">
          <div
            className="rounded-[20px]"
            style={{
              background: 'rgba(0, 0, 0, 0.35)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(212, 165, 116, 0.3)',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(212, 165, 116, 0.1) inset',
              paddingTop: '3rem',
              paddingRight: '2.5rem',
              paddingBottom: '3.5rem',
              paddingLeft: '2.5rem',
              minHeight: 'auto',
              height: 'auto',
              overflow: 'visible'
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
              Anunciar imóvel
            </h3>
            <form onSubmit={(e) => handleSubmit(e, "sell")} className="space-y-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                <div className="space-y-3">
                  <Label 
                    htmlFor="name-sell"
                    className="text-base font-medium"
                    style={{ 
                      color: textColor,
                      fontFamily: 'Poppins, sans-serif'
                    }}
                  >
                    Nome completo
                  </Label>
                  <Input
                    id="name-sell"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Seu nome completo"
                    className="h-14 text-base transition-all duration-300"
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.25)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '12px',
                      color: textColor,
                      padding: '16px 20px',
                      fontFamily: 'Poppins, sans-serif'
                    }}
                  />
                </div>
                <div className="space-y-3">
                  <Label 
                    htmlFor="phone-sell"
                    className="text-base font-medium"
                    style={{ 
                      color: textColor,
                      fontFamily: 'Poppins, sans-serif'
                    }}
                  >
                    Telefone
                  </Label>
                  <Input
                    id="phone-sell"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    placeholder="(00) 00000-0000"
                    className="h-14 text-base transition-all duration-300"
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.25)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '12px',
                      color: textColor,
                      padding: '16px 20px',
                      fontFamily: 'Poppins, sans-serif'
                    }}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label 
                  htmlFor="email-sell"
                  className="text-base font-medium"
                  style={{ 
                    color: textColor,
                    fontFamily: 'Poppins, sans-serif'
                  }}
                >
                  E-mail
                </Label>
                <Input
                  id="email-sell"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder="seu@email.com"
                  className="h-14 text-base transition-all duration-300"
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.25)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    color: textColor,
                    padding: '16px 20px',
                    fontFamily: 'Poppins, sans-serif'
                  }}
                />
              </div>

              <div className="space-y-3">
                <Label 
                  htmlFor="message-sell"
                  className="text-base font-medium"
                  style={{ 
                    color: textColor,
                    fontFamily: 'Poppins, sans-serif'
                  }}
                >
                  Detalhes do imóvel
                </Label>
                <Textarea
                  id="message-sell"
                  placeholder="Descreva seu imóvel: tipo, localização, características principais..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  required
                  className="min-h-[140px] text-base transition-all duration-300 resize-none"
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.25)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    color: textColor,
                    padding: '16px 20px',
                    fontFamily: 'Poppins, sans-serif'
                  }}
                />
              </div>

              <div className="flex items-start space-x-4 pt-2">
                <Checkbox
                  id="privacy-sell"
                  checked={formData.acceptPrivacy}
                  onCheckedChange={(checked) => setFormData({ ...formData, acceptPrivacy: checked as boolean })}
                  className="mt-1"
                  style={{
                    borderColor: accentColor,
                    accentColor: accentColor,
                    width: '20px',
                    height: '20px'
                  }}
                />
                <Label 
                  htmlFor="privacy-sell" 
                  className="text-sm leading-relaxed cursor-pointer flex-1"
                  style={{ 
                    color: textMuted,
                    fontFamily: 'Poppins, sans-serif'
                  }}
                >
                  Li e concordo com a Política de Privacidade
                </Label>
              </div>

              <div className="pt-4 pb-2">
                <Button
                  type="submit"
                  disabled={!formData.acceptPrivacy}
                  className="w-full font-serif font-semibold text-lg transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColorLight} 50%, #c89968 100%)`,
                    color: primaryColor,
                    border: 'none',
                    padding: '18px 32px',
                    borderRadius: '12px',
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '18px',
                    fontWeight: 600,
                    letterSpacing: '0.01em',
                    boxShadow: '0 4px 16px rgba(212, 165, 116, 0.25)',
                    height: 'auto'
                  }}
                >
                  Solicitar avaliação
                </Button>
              </div>
            </form>
          </div>
        </TabsContent>

        <TabsContent value="work">
          <div
            className="rounded-[20px]"
            style={{
              background: 'rgba(0, 0, 0, 0.35)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(212, 165, 116, 0.3)',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(212, 165, 116, 0.1) inset',
              paddingTop: '3rem',
              paddingRight: '2.5rem',
              paddingBottom: '3.5rem',
              paddingLeft: '2.5rem',
              minHeight: 'auto',
              height: 'auto',
              overflow: 'visible'
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
              Trabalhe conosco
            </h3>
            <form onSubmit={(e) => handleSubmit(e, "work")} className="space-y-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                <div className="space-y-3">
                  <Label 
                    htmlFor="name-work"
                    className="text-base font-medium"
                    style={{ 
                      color: textColor,
                      fontFamily: 'Poppins, sans-serif'
                    }}
                  >
                    Nome completo
                  </Label>
                  <Input
                    id="name-work"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Seu nome completo"
                    className="h-14 text-base transition-all duration-300"
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.25)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '12px',
                      color: textColor,
                      padding: '16px 20px',
                      fontFamily: 'Poppins, sans-serif'
                    }}
                  />
                </div>
                <div className="space-y-3">
                  <Label 
                    htmlFor="phone-work"
                    className="text-base font-medium"
                    style={{ 
                      color: textColor,
                      fontFamily: 'Poppins, sans-serif'
                    }}
                  >
                    Telefone
                  </Label>
                  <Input
                    id="phone-work"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    placeholder="(00) 00000-0000"
                    className="h-14 text-base transition-all duration-300"
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.25)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '12px',
                      color: textColor,
                      padding: '16px 20px',
                      fontFamily: 'Poppins, sans-serif'
                    }}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label 
                  htmlFor="email-work"
                  className="text-base font-medium"
                  style={{ 
                    color: textColor,
                    fontFamily: 'Poppins, sans-serif'
                  }}
                >
                  E-mail
                </Label>
                <Input
                  id="email-work"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder="seu@email.com"
                  className="h-14 text-base transition-all duration-300"
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.25)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    color: textColor,
                    padding: '16px 20px',
                    fontFamily: 'Poppins, sans-serif'
                  }}
                />
              </div>

              <div className="space-y-3">
                <Label 
                  htmlFor="message-work"
                  className="text-base font-medium"
                  style={{ 
                    color: textColor,
                    fontFamily: 'Poppins, sans-serif'
                  }}
                >
                  Apresentação
                </Label>
                <Textarea
                  id="message-work"
                  placeholder="Conte-nos sobre sua experiência, qualificações e por que gostaria de trabalhar conosco..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  required
                  className="min-h-[140px] text-base transition-all duration-300 resize-none"
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.25)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    color: textColor,
                    padding: '16px 20px',
                    fontFamily: 'Poppins, sans-serif'
                  }}
                />
              </div>

              <div className="flex items-start space-x-4 pt-2">
                <Checkbox
                  id="privacy-work"
                  checked={formData.acceptPrivacy}
                  onCheckedChange={(checked) => setFormData({ ...formData, acceptPrivacy: checked as boolean })}
                  className="mt-1"
                  style={{
                    borderColor: accentColor,
                    accentColor: accentColor,
                    width: '20px',
                    height: '20px'
                  }}
                />
                <Label 
                  htmlFor="privacy-work" 
                  className="text-sm leading-relaxed cursor-pointer flex-1"
                  style={{ 
                    color: textMuted,
                    fontFamily: 'Poppins, sans-serif'
                  }}
                >
                  Li e concordo com a Política de Privacidade
                </Label>
              </div>

              <div className="pt-4 pb-2">
                <Button
                  type="submit"
                  disabled={!formData.acceptPrivacy}
                  className="w-full font-serif font-semibold text-lg transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColorLight} 50%, #c89968 100%)`,
                    color: primaryColor,
                    border: 'none',
                    padding: '18px 32px',
                    borderRadius: '12px',
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '18px',
                    fontWeight: 600,
                    letterSpacing: '0.01em',
                    boxShadow: '0 4px 16px rgba(212, 165, 116, 0.25)',
                    height: 'auto'
                  }}
                >
                  Enviar candidatura
                </Button>
              </div>
            </form>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
