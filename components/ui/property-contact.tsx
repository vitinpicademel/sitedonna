"use client"

import type React from "react"

import { useState } from "react"
import { MessageCircle, Share2, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import type { Property } from "@/lib/types"
import { formatCurrency } from "@/lib/utils/currency"
import { site } from "@/lib/site.config"

interface PropertyContactProps {
  property: Property
}

export function PropertyContact({ property }: PropertyContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    acceptPrivacy: false,
  })

  const price = property.status === "Venda" ? property.priceSale : property.priceRent
  const priceLabel = property.status === "Venda" ? "" : "/mês"

  const whatsappMessage = `Olá! Tenho interesse no imóvel ${property.title} (${property.code}). Poderia me enviar mais informações?`
  const whatsappUrl = `${site.whatsapp}&text=${encodeURIComponent(whatsappMessage)}`

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: property.title,
          text: `Confira este imóvel: ${property.title}`,
          url: window.location.href,
        })
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  return (
    <div className="space-y-6">
      {/* Price & Actions */}
      <Card>
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            {price ? (
              <div>
                <p className="text-3xl font-bold text-donna-navy">
                  {formatCurrency(price)}
                  {priceLabel}
                </p>
                {property.status === "Venda" && <p className="text-sm text-gray-500">Valor de venda</p>}
              </div>
            ) : (
              <p className="text-2xl font-semibold text-donna-navy">A consultar</p>
            )}

            <div className="flex space-x-2">
              <Button className="flex-1 bg-green-500 hover:bg-green-600" asChild>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp
                </a>
              </Button>
              <Button variant="outline" size="icon" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Form */}
      <Card>
        <CardHeader>
          <CardTitle>Tenho interesse</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome completo</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Mensagem</Label>
              <Textarea
                id="message"
                placeholder="Gostaria de mais informações sobre este imóvel..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="privacy"
                checked={formData.acceptPrivacy}
                onCheckedChange={(checked) => setFormData({ ...formData, acceptPrivacy: checked as boolean })}
              />
              <Label htmlFor="privacy" className="text-sm">
                Li e concordo com a Política de Privacidade
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full bg-donna-gold hover:bg-donna-gold-dark"
              disabled={!formData.acceptPrivacy}
            >
              Enviar mensagem
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
