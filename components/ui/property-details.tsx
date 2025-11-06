import { MapPin, Bed, Bath, Car, Maximize, Home } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Property } from "@/lib/types"
import { formatCurrency, formatArea } from "@/lib/utils/currency"

interface PropertyDetailsProps {
  property: Property
}

export function PropertyDetails({ property }: PropertyDetailsProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge className="bg-donna-gold text-white">{property.status}</Badge>
          <Badge variant="secondary">{property.code}</Badge>
        </div>
        <h1 className="text-3xl font-bold text-donna-navy font-serif mb-2">{property.title}</h1>
        <div className="flex items-center text-gray-600">
          <MapPin className="h-4 w-4 mr-1" />
          <span>
            {property.address.street} {property.address.number}, {property.address.neighborhood},{" "}
            {property.address.city}/{property.address.state}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {property.bedrooms && (
          <div className="flex items-center space-x-2 text-gray-600">
            <Bed className="h-5 w-5" />
            <div>
              <p className="text-sm text-gray-500">Quartos</p>
              <p className="font-semibold">{property.bedrooms}</p>
            </div>
          </div>
        )}
        {property.suites && (
          <div className="flex items-center space-x-2 text-gray-600">
            <Bed className="h-5 w-5" />
            <div>
              <p className="text-sm text-gray-500">Suítes</p>
              <p className="font-semibold">{property.suites}</p>
            </div>
          </div>
        )}
        {property.bathrooms && (
          <div className="flex items-center space-x-2 text-gray-600">
            <Bath className="h-5 w-5" />
            <div>
              <p className="text-sm text-gray-500">Banheiros</p>
              <p className="font-semibold">{property.bathrooms}</p>
            </div>
          </div>
        )}
        {property.parking && (
          <div className="flex items-center space-x-2 text-gray-600">
            <Car className="h-5 w-5" />
            <div>
              <p className="text-sm text-gray-500">Vagas</p>
              <p className="font-semibold">{property.parking}</p>
            </div>
          </div>
        )}
        {property.areaPrivativa && (
          <div className="flex items-center space-x-2 text-gray-600">
            <Maximize className="h-5 w-5" />
            <div>
              <p className="text-sm text-gray-500">Área</p>
              <p className="font-semibold">{formatArea(property.areaPrivativa)}</p>
            </div>
          </div>
        )}
      </div>

      {/* Description */}
      {property.description && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Home className="h-5 w-5 mr-2" />
              Descrição
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">{property.description}</p>
          </CardContent>
        </Card>
      )}

      {/* Amenities */}
      {property.amenities && property.amenities.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Características</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {property.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-donna-gold rounded-full"></div>
                  <span className="text-sm">{amenity}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Additional Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(property.condoFee || property.iptu) && (
          <Card>
            <CardHeader>
              <CardTitle>Custos Adicionais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {property.condoFee && (
                <div className="flex justify-between">
                  <span>Condomínio:</span>
                  <span className="font-semibold">{formatCurrency(property.condoFee)}/mês</span>
                </div>
              )}
              {property.iptu && (
                <div className="flex justify-between">
                  <span>IPTU:</span>
                  <span className="font-semibold">{formatCurrency(property.iptu)}/mês</span>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {property.areaTotal && property.areaPrivativa && (
          <Card>
            <CardHeader>
              <CardTitle>Áreas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span>Área privativa:</span>
                <span className="font-semibold">{formatArea(property.areaPrivativa)}</span>
              </div>
              <div className="flex justify-between">
                <span>Área total:</span>
                <span className="font-semibold">{formatArea(property.areaTotal)}</span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
