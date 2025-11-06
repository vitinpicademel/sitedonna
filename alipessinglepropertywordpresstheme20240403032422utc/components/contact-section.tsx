"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect, useRef } from "react"
import { Mail, Phone, MessageCircle, MapPin, Clock, Users, Star } from "lucide-react"

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simular envio
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log("Form submitted:", formData)
    setFormData({ name: "", email: "", phone: "", message: "" })
    setIsSubmitting(false)
    
    // Aqui você pode adicionar uma notificação de sucesso
  }

  return (
    <section ref={sectionRef} className="py-8 md:py-12 bg-[#f5f5f0] relative overflow-hidden">
      {/* Background decorative elements com animações */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-8 w-24 h-24 border-2 border-[#c89968]/20 rounded-full animate-pulse-slow"></div>
        <div className="absolute top-20 right-12 w-20 h-20 border-2 border-[#c89968]/15 rounded-full animate-float-slow"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 border-2 border-[#c89968]/25 rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-12 right-1/3 w-16 h-16 border-2 border-[#c89968]/20 rounded-full animate-float-slower"></div>
        
        {/* Elementos decorativos adicionais */}
        <div className="absolute top-1/3 left-1/3 w-6 h-6 bg-[#c89968]/10 rounded-full animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-8 h-8 bg-[#c89968]/15 rounded-full animate-float-slow"></div>
        <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-[#c89968]/20 rounded-full animate-float-slower"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Side - Request Visit */}
          <div className={`relative ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            {/* Decorative border com animação */}
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-[#c89968] to-[#b8956a] animate-pulse-glow"></div>
            
            {/* Título com animação - compacto */}
            <div className="mb-4">
              <p className="text-[#c89968] text-xs font-bold mb-2 tracking-widest animate-fade-in">VISITE O IMÓVEL</p>
              <h2 className="text-2xl md:text-3xl font-bold text-black mb-2 animate-slide-in-right">
                SOLICITE UMA <span className="text-[#c89968]">VISITA</span>
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-[#c89968] to-[#b8956a] rounded-full animate-bounce-arrow"></div>
            </div>

            {/* Logo Info com efeito hover - mais compacto */}
            <div className="flex items-center gap-3 mb-4 group">
              <div className="w-24 h-24 md:w-28 md:h-28 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#c89968]/10 to-[#b8956a]/10 rounded-full animate-pulse-slow"></div>
                <img 
                  src="/uploads/logofundo.png" 
                  alt="Logo Donna" 
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 z-10 relative" 
                />
                <div className="absolute inset-0 border-2 border-[#c89968]/20 rounded-full animate-float-slow"></div>
              </div>
            </div>

            {/* Contact Info com animações - super compacto */}
            <div className="space-y-3 mb-4 relative">
              {/* Decorative divider */}
              <div className="absolute -left-2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#c89968]/30 to-transparent animate-pulse-slow"></div>
              
              {/* Email */}
              <div className="flex items-start gap-2 pl-4 group hover:translate-x-2 transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-br from-[#f5e6d3] to-[#e8d5c0] flex items-center justify-center flex-shrink-0 rounded-lg border border-[#c89968]/20 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <Mail className="text-[#c89968] text-sm group-hover:animate-bounce" />
                </div>
                <div className="group-hover:text-[#c89968] transition-colors duration-300">
                  <p className="text-xs text-gray-600 mb-1 tracking-wider font-semibold">EMAIL</p>
                  <p className="text-sm font-bold text-black group-hover:text-[#c89968] transition-colors duration-300">
                    vendas@donnanegociacoes.com.br
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Resposta em até 2 horas</p>
                </div>
              </div>

              {/* Telefone */}
              <div className="flex items-start gap-2 pl-4 group hover:translate-x-2 transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-br from-[#f5e6d3] to-[#e8d5c0] flex items-center justify-center flex-shrink-0 rounded-lg border border-[#c89968]/20 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <Phone className="text-[#c89968] text-sm group-hover:animate-bounce" />
                </div>
                <div className="group-hover:text-[#c89968] transition-colors duration-300">
                  <p className="text-xs text-gray-600 mb-1 tracking-wider font-semibold">TELEFONE</p>
                  <p className="text-sm font-bold text-black group-hover:text-[#c89968] transition-colors duration-300">
                    (34) 3336-1900
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Seg-Sex: 8h às 18h | Sáb: 8h às 12h</p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-2 pl-4 group hover:translate-x-2 transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-br from-[#f5e6d3] to-[#e8d5c0] flex items-center justify-center flex-shrink-0 rounded-lg border border-[#c89968]/20 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <MessageCircle className="text-[#c89968] text-sm group-hover:animate-bounce" />
                </div>
                <div className="group-hover:text-[#c89968] transition-colors duration-300">
                  <p className="text-xs text-gray-600 mb-1 tracking-wider font-semibold">WHATSAPP</p>
                  <p className="text-sm font-bold text-black group-hover:text-[#c89968] transition-colors duration-300">
                    (34) 98443-6877
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Atendimento 24h</p>
                </div>
              </div>

              {/* Informações adicionais - super compactas */}
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="flex items-center gap-1 p-2 bg-white/50 rounded-lg border border-[#c89968]/10 hover:bg-white/80 transition-all duration-300 group">
                  <Clock className="text-[#c89968] text-xs group-hover:animate-spin" />
                  <div>
                    <p className="text-xs font-semibold text-gray-700">Atendimento</p>
                    <p className="text-xs text-gray-500">Rápido e eficiente</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 p-2 bg-white/50 rounded-lg border border-[#c89968]/10 hover:bg-white/80 transition-all duration-300 group">
                  <Users className="text-[#c89968] text-xs group-hover:animate-bounce" />
                  <div>
                    <p className="text-xs font-semibold text-gray-700">Equipe</p>
                    <p className="text-xs text-gray-500">Especializada</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map com efeitos visuais - super compacto */}
            <div className="w-full h-48 bg-gray-300 relative overflow-hidden rounded-xl shadow-2xl group hover:shadow-3xl transition-all duration-500">
              {/* Overlay decorativo */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#c89968]/5 to-transparent z-10 pointer-events-none"></div>
              
              {/* Elementos decorativos no mapa */}
              <div className="absolute top-3 left-3 z-20">
                <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg shadow-lg">
                  <MapPin className="text-[#c89968] text-sm animate-bounce" />
                  <span className="text-xs font-semibold text-gray-700">Nossa Localização</span>
                </div>
              </div>
              
              <div className="absolute bottom-3 right-3 z-20">
                <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg shadow-lg">
                  <Star className="text-[#c89968] text-sm animate-pulse" />
                  <span className="text-xs font-semibold text-gray-700">Centro de Uberaba</span>
                </div>
              </div>
              
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3759.1234567890123!2d-47.93812345678901!3d-19.74712345678901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDQ0JzQ5LjYiUyA0N8KwNTYnMTcuMiJX!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr&q=Rua+Dona+Rafa+Cecilio+75+São+Benedito+Uberaba+MG"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização Donna Negociações - Rua Dona Rafa Cecilio 75, São Benedito, Uberaba-MG"
                className="group-hover:scale-105 transition-transform duration-500"
              ></iframe>
              
              {/* Botão de ação no mapa */}
              <div className="absolute bottom-3 left-3 z-20">
                <button className="bg-[#c89968] hover:bg-[#b8956a] text-white px-3 py-1.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-1">
                  <MapPin className="text-sm" />
                  <span className="text-xs font-semibold">Ver no Google Maps</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form - super compacto */}
          <div className={`bg-gradient-to-br from-[#2a1f15] to-[#1a1410] p-6 flex flex-col justify-center relative overflow-hidden ${isVisible ? 'animate-slide-in-right' : 'opacity-0'}`}>
            {/* Elementos decorativos de fundo */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-8 right-8 w-16 h-16 border border-[#c89968]/10 rounded-full animate-float-slow"></div>
              <div className="absolute bottom-8 left-8 w-12 h-12 border border-[#c89968]/15 rounded-full animate-float"></div>
              <div className="absolute top-1/2 right-1/4 w-6 h-6 bg-[#c89968]/5 rounded-full animate-pulse-slow"></div>
            </div>
            
            {/* Título do formulário - compacto */}
            <div className="relative z-10 mb-4">
              <p className="text-[#c89968] text-xs font-bold mb-2 tracking-widest animate-fade-in">ENTRE EM CONTATO</p>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2 animate-slide-in-right">
                ESCREVA PARA O <span className="text-[#c89968]">CORRETOR</span>
              </h3>
              <div className="w-10 h-1 bg-gradient-to-r from-[#c89968] to-[#b8956a] rounded-full animate-bounce-arrow"></div>
            </div>

            {/* Formulário */}
            <form onSubmit={handleSubmit} className="space-y-3 relative z-10">
              <div className="relative group">
                <Input
                  placeholder="Seu Nome"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-transparent border-b border-gray-600 rounded-none px-0 py-2 text-white placeholder:text-gray-500 focus:border-[#c89968] transition-all duration-300 group-hover:border-[#c89968]/50"
                  required
                />
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#c89968] to-[#b8956a] group-focus-within:w-full transition-all duration-300"></div>
              </div>
              
              <div className="relative group">
                <Input
                  type="email"
                  placeholder="Endereço de Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-transparent border-b border-gray-600 rounded-none px-0 py-2 text-white placeholder:text-gray-500 focus:border-[#c89968] transition-all duration-300 group-hover:border-[#c89968]/50"
                  required
                />
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#c89968] to-[#b8956a] group-focus-within:w-full transition-all duration-300"></div>
              </div>
              
              <div className="relative group">
                <Input
                  type="tel"
                  placeholder="Número de Telefone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-transparent border-b border-gray-600 rounded-none px-0 py-2 text-white placeholder:text-gray-500 focus:border-[#c89968] transition-all duration-300 group-hover:border-[#c89968]/50"
                  required
                />
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#c89968] to-[#b8956a] group-focus-within:w-full transition-all duration-300"></div>
              </div>
              
              <div className="relative group">
                <Textarea
                  placeholder="Escreva uma Mensagem"
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-transparent border-b border-gray-600 rounded-none px-0 py-2 text-white placeholder:text-gray-500 focus:border-[#c89968] resize-none transition-all duration-300 group-hover:border-[#c89968]/50"
                  required
                />
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#c89968] to-[#b8956a] group-focus-within:w-full transition-all duration-300"></div>
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#c89968] to-[#b8956a] hover:from-[#b8956a] hover:to-[#a07d54] text-white py-3 font-bold tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>ENVIANDO...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>ENVIAR MENSAGEM</span>
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                )}
              </Button>
            </form>
            
            {/* Informações adicionais - super compactas */}
            <div className="mt-4 space-y-1 relative z-10">
              <div className="flex items-center gap-1 text-gray-400">
                <div className="w-1 h-1 bg-[#c89968] rounded-full animate-pulse"></div>
                <span className="text-xs">Resposta garantida em até 2 horas</span>
              </div>
              <div className="flex items-center gap-1 text-gray-400">
                <div className="w-1 h-1 bg-[#c89968] rounded-full animate-pulse"></div>
                <span className="text-xs">Atendimento personalizado</span>
              </div>
              <div className="flex items-center gap-1 text-gray-400">
                <div className="w-1 h-1 bg-[#c89968] rounded-full animate-pulse"></div>
                <span className="text-xs">Sem compromisso</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
