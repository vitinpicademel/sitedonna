"use client"

import type React from "react"

import { useState } from "react"
import { Share2, Phone, Loader2, CheckCircle2 } from "lucide-react"
import { Button } from "@detalhes/components/ui/button"
import { Input } from "@detalhes/components/ui/input"
import Image from "next/image"
import { useToast } from "@detalhes/hooks/use-toast"

export default function PropertySidebar({ price, iptu, condoFee }: { price?: number; iptu?: number; condoFee?: number }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { toast } = useToast()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Telefone é obrigatório"
    }

    if (!formData.email.trim()) {
      newErrors.email = "E-mail é obrigatório"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "E-mail inválido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("Form submitted:", formData)

    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contato em breve.",
      duration: 5000,
    })

    setFormData({ name: "", phone: "", email: "" })
    setIsSubmitting(false)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Casa à Venda no Condomínio Damha 3",
          text: "Confira este imóvel incrível!",
          url: window.location.href,
        })
      } catch (err) {
        console.log("Share cancelled")
      }
    } else {
      toast({
        title: "Link copiado!",
        description: "O link foi copiado para a área de transferência.",
      })
    }
  }

  return (
    <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
      <Button
        onClick={handleShare}
        variant="outline"
        className="w-full glass-effect border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] hover:border-[var(--primary)] group bg-transparent"
      >
        <Share2 className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
        COMPARTILHE ESSE IMÓVEL
      </Button>

      {/* Bloco de preço utiliza a paleta por variáveis */}
      <div className="rounded-xl p-6 shadow-xl shadow-[var(--primary)]/25 bg-[var(--primary)] text-[var(--primary-foreground)] border border-[var(--primary)]">
        <div className="mb-6">
          <div className="text-[var(--primary-foreground)]/80 text-sm mb-2">R$</div>
          <div className="text-4xl font-semibold text-[var(--primary-foreground)] mb-4">
            {Number.isFinite(price as number) ?
              (price as number).toLocaleString('pt-BR') :
              '—'}
          </div>
          <div className="flex gap-4 text-xs text-[var(--primary-foreground)]/80">
            <div>
              <span className="font-medium">IPTU:</span> R$ {Number.isFinite(iptu as number) ? (iptu as number).toLocaleString('pt-BR') : '—'}
              <div className="text-[10px]">ANUAL</div>
            </div>
            <div>
              <span className="font-medium">CONDOMÍNIO:</span> R$ {Number.isFinite(condoFee as number) ? (condoFee as number).toLocaleString('pt-BR') : '—'}
              <div className="text-[10px]">MENSAL</div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-[var(--primary-foreground)]/90 mb-2">Interessado neste imóvel?</p>
          <p className="text-[var(--primary-foreground)] font-bold text-lg">Fale conosco!</p>
        </div>

        <a
          href="https://api.whatsapp.com/send?phone=553433164600"
          className="flex items-center gap-2 text-[var(--primary-foreground)] mb-6 hover:opacity-80 transition-all duration-300 group"
        >
          <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="text-lg">+55 34 3316-4600</span>
        </a>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Seu nome"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value })
                if (errors.name) setErrors({ ...errors, name: "" })
              }}
              className={`bg-[#1A1A1A] border-[#2C2C2C] text-[#F5F5F5] placeholder:text-[#B3B3B3] focus:border-[#E5A93D] transition-all ${
                errors.name ? "border-red-500" : ""
              }`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <Input
              placeholder="Telefone"
              value={formData.phone}
              onChange={(e) => {
                setFormData({ ...formData, phone: e.target.value })
                if (errors.phone) setErrors({ ...errors, phone: "" })
              }}
              className={`bg-[#1A1A1A] border-[#2C2C2C] text-[#F5F5F5] placeholder:text-[#B3B3B3] focus:border-[#E5A93D] transition-all ${
                errors.phone ? "border-red-500" : ""
              }`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          <div>
            <Input
              type="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value })
                if (errors.email) setErrors({ ...errors, email: "" })
              }}
              className={`bg-[#1A1A1A] border-[#2C2C2C] text-[#F5F5F5] placeholder:text-[#B3B3B3] focus:border-[#E5A93D] transition-all ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#E5A93D] text-[#0E0E0E] hover:bg-[#F1C75B] font-bold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ENVIANDO...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                ESTOU INTERESSADO
              </>
            )}
          </Button>
        </form>
      </div>

      <div className="relative h-48 rounded-xl overflow-hidden cursor-pointer group shadow-xl">
        <Image
          src="/luxury-house-exterior.jpg"
          alt="Video thumbnail"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-[var(--primary)] rounded-full flex items-center justify-center group-hover:scale-125 transition-all duration-300 shadow-lg shadow-[var(--primary)]/50">
            <svg className="w-8 h-8 text-[#0E0E0E] ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-4 left-4 text-[var(--card-foreground)] text-sm font-medium">VEJA O VÍDEO DO IMÓVEL</div>
      </div>
    </div>
  )
}
