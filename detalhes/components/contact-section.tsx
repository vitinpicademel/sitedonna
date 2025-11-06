"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@detalhes/components/ui/button"
import { Input } from "@detalhes/components/ui/input"
import { Textarea } from "@detalhes/components/ui/textarea"
import { Send, Loader2 } from "lucide-react"
import { useToast } from "@detalhes/hooks/use-toast"

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
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)] p-6 md:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-light mb-2 text-balance">
            Não encontrou o <span className="text-[var(--primary)]">imóvel que deseja?</span>
          </h2>
          <p className="text-[color:var(--muted-foreground)] max-w-3xl mx-auto">
            Preencha o formulário abaixo. Em breve entraremos em contato para entender sua necessidade e encontrar o
            imóvel ideal.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Seu nome"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-[#1A1A1A] border-[#2C2C2C] text-[#F5F5F5] placeholder:text-[#B3B3B3] focus:border-[var(--primary)] transition-all"
          />
          <Input
            type="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="bg-[#1A1A1A] border-[#2C2C2C] text-[#F5F5F5] placeholder:text-[#B3B3B3] focus:border-[var(--primary)] transition-all"
          />
          <Input
            placeholder="Telefone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="bg-[#1A1A1A] border-[#2C2C2C] text-[#F5F5F5] placeholder:text-[#B3B3B3] focus:border-[var(--primary)] transition-all"
          />

          <div className="md:col-span-3">
            <Textarea
              placeholder="Mensagem"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="bg-[#1A1A1A] border-[#2C2C2C] text-[#F5F5F5] placeholder:text-[#B3B3B3] min-h-32 focus:border-[var(--primary)] transition-all"
            />
          </div>

          <div className="md:col-span-3 flex justify-center pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="min-w-48 bg-[var(--primary)] text-[var(--primary-foreground)] hover:brightness-110 font-bold px-12 transition-all duration-300 hover:scale-105 disabled:opacity-50"
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
          </div>
        </form>
      </section>
    </div>
  )
}
