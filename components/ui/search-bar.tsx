"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { bairros } from "@/data/bairros"
import type { SearchFilters } from "@/lib/types"

interface SearchBarProps {
  onSearch?: (filters: SearchFilters) => void
  className?: string
}

export function SearchBar({ onSearch, className }: SearchBarProps) {
  const [filters, setFilters] = useState<SearchFilters>({})

  const handleSearch = () => {
    onSearch?.(filters)
  }

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {/* Finalidade */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Finalidade</label>
          <Select onValueChange={(value) => updateFilter("finalidade", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Comprar">Comprar</SelectItem>
              <SelectItem value="Alugar">Alugar</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tipo */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Tipo</label>
          <Select onValueChange={(value) => updateFilter("tipo", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Apartamento">Apartamento</SelectItem>
              <SelectItem value="Casa">Casa</SelectItem>
              <SelectItem value="Casa em condomínio">Casa em condomínio</SelectItem>
              <SelectItem value="Comercial">Comercial</SelectItem>
              <SelectItem value="Galpão">Galpão</SelectItem>
              <SelectItem value="Terreno">Terreno</SelectItem>
              <SelectItem value="Terreno em condomínio">Terreno em condomínio</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bairro */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Bairro</label>
          <Select onValueChange={(value) => updateFilter("bairro", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Digite o Bairro" />
            </SelectTrigger>
            <SelectContent>
              {bairros.map((bairro) => (
                <SelectItem key={bairro} value={bairro}>
                  {bairro}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Valor Mínimo */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Valor de</label>
          <Input
            type="number"
            placeholder="R$ --"
            onChange={(e) => updateFilter("valorMin", Number(e.target.value) || undefined)}
          />
        </div>

        {/* Valor Máximo */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Valor até</label>
          <Input
            type="number"
            placeholder="R$ --"
            onChange={(e) => updateFilter("valorMax", Number(e.target.value) || undefined)}
          />
        </div>

        {/* Código */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Código</label>
          <Input placeholder="Ex.: 3027" onChange={(e) => updateFilter("codigo", e.target.value || undefined)} />
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <Button onClick={handleSearch} className="bg-donna-gold hover:bg-donna-gold-dark px-8">
          <Search className="mr-2 h-4 w-4" />
          BUSCAR
        </Button>
      </div>
    </div>
  )
}
