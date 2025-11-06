"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { MessageCircle, Home, Briefcase } from "lucide-react"

export function ContactForms() {
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

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      acceptPrivacy: false,
    })
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-donna-navy font-serif mb-6">Como podemos ajudar?</h2>

      <Tabs defaultValue="message" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="message" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Enviar mensagem
          </TabsTrigger>
          <TabsTrigger value="sell" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Anunciar imóvel
          </TabsTrigger>
          <TabsTrigger value="work" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Trabalhe conosco
          </TabsTrigger>
        </TabsList>

        <TabsContent value="message">
          <Card>
            <CardHeader>
              <CardTitle>Enviar mensagem</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => handleSubmit(e, "message")} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
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
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea
                    id="message"
                    placeholder="Como podemos ajudar você?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="privacy-message"
                    checked={formData.acceptPrivacy}
                    onCheckedChange={(checked) => setFormData({ ...formData, acceptPrivacy: checked as boolean })}
                  />
                  <Label htmlFor="privacy-message" className="text-sm">
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
        </TabsContent>

        <TabsContent value="sell">
          <Card>
            <CardHeader>
              <CardTitle>Anunciar imóvel</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => handleSubmit(e, "sell")} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name-sell">Nome completo</Label>
                    <Input
                      id="name-sell"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone-sell">Telefone</Label>
                    <Input
                      id="phone-sell"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email-sell">E-mail</Label>
                  <Input
                    id="email-sell"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message-sell">Detalhes do imóvel</Label>
                  <Textarea
                    id="message-sell"
                    placeholder="Descreva seu imóvel: tipo, localização, características principais..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="privacy-sell"
                    checked={formData.acceptPrivacy}
                    onCheckedChange={(checked) => setFormData({ ...formData, acceptPrivacy: checked as boolean })}
                  />
                  <Label htmlFor="privacy-sell" className="text-sm">
                    Li e concordo com a Política de Privacidade
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-donna-gold hover:bg-donna-gold-dark"
                  disabled={!formData.acceptPrivacy}
                >
                  Solicitar avaliação
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="work">
          <Card>
            <CardHeader>
              <CardTitle>Trabalhe conosco</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => handleSubmit(e, "work")} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name-work">Nome completo</Label>
                    <Input
                      id="name-work"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone-work">Telefone</Label>
                    <Input
                      id="phone-work"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email-work">E-mail</Label>
                  <Input
                    id="email-work"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message-work">Apresentação</Label>
                  <Textarea
                    id="message-work"
                    placeholder="Conte-nos sobre sua experiência, qualificações e por que gostaria de trabalhar conosco..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="privacy-work"
                    checked={formData.acceptPrivacy}
                    onCheckedChange={(checked) => setFormData({ ...formData, acceptPrivacy: checked as boolean })}
                  />
                  <Label htmlFor="privacy-work" className="text-sm">
                    Li e concordo com a Política de Privacidade
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-donna-gold hover:bg-donna-gold-dark"
                  disabled={!formData.acceptPrivacy}
                >
                  Enviar candidatura
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
