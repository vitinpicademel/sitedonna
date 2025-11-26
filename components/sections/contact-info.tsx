import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { site } from "@/lib/site.config"
import { formatPhone } from "@/lib/utils/currency"

export function ContactInfo() {
  return (
    <div className="space-y-6">
      {/* Contact Details */}
      <Card>
        <CardHeader>
          <CardTitle>Informações de contato</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 text-donna-gold mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Endereço</p>
              <p className="text-sm text-gray-600">{site.address}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-donna-gold flex-shrink-0" />
            <div>
              <p className="font-medium">Telefone</p>
              <p className="text-sm text-gray-600">{formatPhone(site.phone)}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-donna-gold flex-shrink-0" />
            <div>
              <p className="font-medium">E-mail</p>
              <p className="text-sm text-gray-600">{site.email}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Clock className="h-5 w-5 text-donna-gold mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Horário de funcionamento</p>
              <div className="text-sm text-gray-600">
                <p>Segunda a sexta: 8h30 às 18h</p>
                <p>Sábado: 9h às 13h</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Fale conosco agora</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full bg-green-500 hover:bg-green-600" asChild>
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp
            </a>
          </Button>

          <Button variant="outline" className="w-full bg-transparent" asChild>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <MapPin className="mr-2 h-4 w-4" />
              Ver no Mapa
            </a>
          </Button>
        </CardContent>
      </Card>

      {/* Map Embed */}
      <Card>
        <CardContent className="p-0">
          <div className="aspect-video rounded-lg overflow-hidden">
            <iframe
              src={site.mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização da Donna Imobiliária"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
