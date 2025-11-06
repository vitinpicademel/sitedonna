"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("Contact form submitted:", formData)

    toast({
      title: "Mensagem enviada com sucesso!",
      description: "Entraremos em contato em breve para encontrar o imóvel ideal.",
      duration: 5000,
    })

    setFormData({ name: "", email: "", phone: "", message: "" })
    setIsSubmitting(false)
  }

  return (
    <div ref={sectionRef} className={`mt-16 mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-light text-[#F5F5F5] mb-2 text-balance">
          Não encontrou o <span className="text-[#E5A93D]">imóvel que deseja?</span>
        </h2>
        <p className="text-[#B3B3B3]">
          Preencha o formulário abaixo. Em breve, entraremos em contato para entender sua necessidade e encontrarmos o
          imóvel ideal!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4 glass-effect p-8 rounded-xl">
        <Input
          placeholder="Seu nome"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="bg-[#1A1A1A] border-[#2C2C2C] text-[#F5F5F5] placeholder:text-[#B3B3B3] focus:border-[#E5A93D] transition-all"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="bg-[#1A1A1A] border-[#2C2C2C] text-[#F5F5F5] placeholder:text-[#B3B3B3] focus:border-[#E5A93D] transition-all"
          />
          <Input
            placeholder="Telefone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="bg-[#1A1A1A] border-[#2C2C2C] text-[#F5F5F5] placeholder:text-[#B3B3B3] focus:border-[#E5A93D] transition-all"
          />
        </div>
        <Textarea
          placeholder="Mensagem"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="bg-[#1A1A1A] border-[#2C2C2C] text-[#F5F5F5] placeholder:text-[#B3B3B3] min-h-32 focus:border-[#E5A93D] transition-all"
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto bg-[#E5A93D] text-[#0E0E0E] hover:bg-[#F1C75B] font-bold px-12 transition-all duration-300 hover:scale-105 disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ENVIANDO...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              ENVIAR
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
