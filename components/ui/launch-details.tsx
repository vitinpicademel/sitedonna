"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { MapPin, Share2, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import type { Launch } from "@/lib/types"
import { formatCurrency, formatArea } from "@/lib/utils/currency"
import { site } from "@/lib/site.config"

interface LaunchDetailsProps {
  launch: Launch
}

export function LaunchDetails({ launch }: LaunchDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    acceptPrivacy: false,
  })

  const whatsappMessage = `Olá! Tenho interesse no lançamento ${launch.title}. Poderia me enviar mais informações?`
  const whatsappUrl = `${site.whatsapp}&text=${encodeURIComponent(whatsappMessage)}`

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: launch.title,
          text: `Confira este lançamento: ${launch.title}`,
          url: window.location.href,
        })
      } catch (error) {
        navigator.clipboard.writeText(window.location.href)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Interest form submitted:", formData)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % launch.media.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + launch.media.length) % launch.media.length)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src={launch.media[currentImageIndex]?.url || "/placeholder.svg?height=400&width=600"}
                alt={launch.media[currentImageIndex]?.alt || launch.title}
                fill
                className="object-cover"
              />

              {launch.media.length > 1 && (
                <>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute left-4 top-1/2 -translate-y-1/2"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>

            {launch.media.length > 1 && (
              <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                {launch.media.map((image, index) => (
                  <button
                    key={index}
                    className={`aspect-video rounded overflow-hidden border-2 ${
                      index === currentImageIndex ? "border-donna-gold" : "border-transparent"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <Image
                      src={image.url || "/placeholder.svg"}
                      alt={image.alt}
                      width={100}
                      height={75}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-donna-navy font-serif mb-2">{launch.title}</h1>
              {launch.address && (
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{launch.address}</span>
                </div>
              )}
            </div>

            {launch.areaRange && (
              <div className="flex items-center space-x-4">
                <div>
                  <p className="text-sm text-gray-500">Metragem</p>
                  <p className="font-semibold">
                    De {formatArea(launch.areaRange.min)} a {formatArea(launch.areaRange.max)}
                  </p>
                </div>
                {launch.priceFrom && (
                  <div>
                    <p className="text-sm text-gray-500">Preço</p>
                    <p className="text-xl font-bold text-donna-navy">A partir de {formatCurrency(launch.priceFrom)}</p>
                  </div>
                )}
              </div>
            )}

            {launch.description && (
              <Card>
                <CardHeader>
                  <CardTitle>Sobre o empreendimento</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{launch.description}</p>
                </CardContent>
              </Card>
            )}

            {launch.highlights && launch.highlights.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Diferenciais</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {launch.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-donna-gold rounded-full"></div>
                        <span className="text-sm">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <div className="flex space-x-4">
              <Button className="bg-green-500 hover:bg-green-600" asChild>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp
                </a>
              </Button>
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Compartilhar
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
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
                    placeholder="Gostaria de mais informações sobre este lançamento..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={3}
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
                  Enviar interesse
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
