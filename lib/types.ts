export type Amenity =
  | "Piscina"
  | "Churrasqueira"
  | "Varanda gourmet"
  | "Academia"
  | "Portaria 24h"
  | "Elevador"
  | "Playground"
  | "Coworking"
  | "Pet friendly"
  | "Salão de festas"
  | "Quadra esportiva"
  | "Sauna"
  | "Jardim"
  | "Área verde"

export type Property = {
  id: string
  slug: string
  status: "Venda" | "Aluguel"
  type: "Apartamento" | "Casa" | "Casa em condomínio" | "Comercial" | "Galpão" | "Terreno" | "Terreno em condomínio" | "Fazenda"
  title: string
  code: string
  address: {
    street: string
    number?: string
    neighborhood: string
    city: string
    state: string
    lat?: number
    lng?: number
  }
  areaPrivativa?: number
  areaTotal?: number
  bedrooms?: number
  suites?: number
  bathrooms?: number
  parking?: number
  priceSale?: number
  priceRent?: number
  condoFee?: number
  iptu?: number
  description?: string
  amenities?: Amenity[]
  media: { url: string; alt: string }[]
  isFeatured?: boolean
}

export type Launch = {
  id: string
  slug: string
  title: string
  address?: string
  areaRange?: { min: number; max: number }
  priceFrom?: number
  description?: string
  highlights?: string[]
  media: { url: string; alt: string }[]
}

export type Condo = {
  id: string
  slug: string
  title: string
  areaRange?: { min: number; max: number }
  priceFrom?: number
  media: { url: string; alt: string }[]
}

export type SearchFilters = {
  finalidade?: "Comprar" | "Alugar"
  tipo?: Property["type"]
  // Suporte a múltiplos tipos (checkboxes)
  types?: Property["type"][]
  bairro?: string
  valorMin?: number
  valorMax?: number
  codigo?: string
  quartos?: number
  suites?: number
  vagas?: number
  areaMin?: number
  areaMax?: number
}

export type SortOption = "maior-preco" | "menor-preco"
