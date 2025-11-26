"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { bairros } from "@/data/bairros"
import type { SearchFilters, SortOption } from "@/lib/types"

interface PropertyFiltersProps {
  filters: SearchFilters
  onFiltersChange: (filters: SearchFilters) => void
  sortBy: SortOption
  onSortChange: (sort: SortOption) => void
}

export function PropertyFilters({ filters, onFiltersChange, sortBy, onSortChange }: PropertyFiltersProps) {
  const updateFilter = (key: keyof SearchFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const clearFilters = () => {
    onFiltersChange({})
  }

  return (
    <div className="space-y-6">
      <Card className="border border-gold card-dark">
        <CardHeader>
          <CardTitle className="text-lg text-white">Filtros</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* CÓDIGO */}
          <div className="space-y-2">
            <Label className="text-white">Código</Label>
            <Input
              className="input-dark"
              placeholder="Ex.: 3027"
              value={filters.codigo || ""}
              onChange={(e) => updateFilter("codigo", e.target.value || undefined)}
            />
          </div>

          {/* FINALIDADE (checklist) */}
          <div className="space-y-2">
            <Label className="text-white">Finalidade</Label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={filters.finalidade === "Comprar"}
                  onChange={(e) => updateFilter("finalidade", e.target.checked ? "Comprar" : undefined)}
                />
                Comprar
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={filters.finalidade === "Alugar"}
                  onChange={(e) => updateFilter("finalidade", e.target.checked ? "Alugar" : undefined)}
                />
                Alugar
              </label>
            </div>
          </div>

          {/* TIPO (múltipla seleção) */}
          <div className="space-y-2">
            <Label className="text-white">Tipo</Label>
            <div className="grid grid-cols-1 gap-2">
              {([
                "Apartamento",
                "Casa",
                "Casa em condomínio",
                "Comercial",
                "Galpão",
                "Terreno",
                "Terreno em condomínio",
                "Fazenda",
              ] as const).map((tipo) => {
                const active = filters.types?.includes(tipo) || false
                return (
                  <label key={tipo} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={active}
                      onChange={(e) => {
                        const current = new Set(filters.types || [])
                        if (e.target.checked) current.add(tipo)
                        else current.delete(tipo)
                        updateFilter("types", Array.from(current))
                      }}
                    />
                    {tipo}
                  </label>
                )
              })}
            </div>
          </div>

          {/* BAIRRO */}
          <div className="space-y-2">
            <Label className="text-white">Bairro</Label>
            <Input
              className="input-dark"
              placeholder="Digite o Bairro"
              value={filters.bairro || ""}
              onChange={(e) => updateFilter("bairro", e.target.value || undefined)}
            />
          </div>

          {/* VALOR - faixa */}
          <div className="space-y-2">
            <Label className="text-white">Valor</Label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                className="input-dark"
                placeholder="R$ 0,00"
                value={filters.valorMin || ""}
                onChange={(e) => updateFilter("valorMin", Number(e.target.value) || undefined)}
              />
              <Input
                type="number"
                className="input-dark"
                placeholder="R$ 10.000.000,00"
                value={filters.valorMax || ""}
                onChange={(e) => updateFilter("valorMax", Number(e.target.value) || undefined)}
              />
            </div>
          </div>

          {/* ÁREA */}
          <div className="space-y-2">
            <Label className="text-white">Área</Label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                className="input-dark"
                placeholder="De"
                value={filters.areaMin || ""}
                onChange={(e) => updateFilter("areaMin", Number(e.target.value) || undefined)}
              />
              <Input
                type="number"
                className="input-dark"
                placeholder="Até"
                value={filters.areaMax || ""}
                onChange={(e) => updateFilter("areaMax", Number(e.target.value) || undefined)}
              />
            </div>
          </div>

          {/* DORMITÓRIOS (atalhos) */}
          <div className="space-y-2">
            <Label className="text-white">Dormitórios</Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((q) => (
                <Button key={q} size="sm" className="bg-white/5 hover:bg-white/10 text-white border-white/20" onClick={() => updateFilter("quartos", q)}>
                  {q}+
                </Button>
              ))}
            </div>
          </div>

          {/* SUÍTES (atalhos) */}
          <div className="space-y-2">
            <Label className="text-white">Suítes</Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((q) => (
                <Button key={q} size="sm" className="bg-white/5 hover:bg-white/10 text-white border-white/20" onClick={() => updateFilter("suites", q)}>
                  {q}+
                </Button>
              ))}
            </div>
          </div>

          <Button onClick={clearFilters} className="w-full btn-gold font-semibold">
            Limpar filtros
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
