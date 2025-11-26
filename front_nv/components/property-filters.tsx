"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpDown, Filter } from "lucide-react"

interface PropertyFiltersProps {
  onSortChange: (sortBy: string) => void
  totalResults: number
}

export function PropertyFilters({ onSortChange, totalResults }: PropertyFiltersProps) {
  const [sortBy, setSortBy] = useState("relevance")

  const handleSortChange = (value: string) => {
    setSortBy(value)
    onSortChange(value)
  }

  return (
    <div className="filter-bar flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 p-6">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-white">
          <Filter className="h-6 w-6 filter-icon" />
        </div>
        <div className="text-[#3A3A3A]">
          <span className="font-medium tracking-wide text-2xl block">{totalResults}</span>
          <span className="text-base font-light text-[#666]">imóveis encontrados</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-white">
          <ArrowUpDown className="h-6 w-6 filter-icon" />
        </div>
        <Select value={sortBy} onValueChange={handleSortChange}>
          <SelectTrigger className="w-64 bg-white border-slate-200 h-12 text-base rounded-lg font-light shadow-sm hover:shadow-md transition-all">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent className="rounded-lg border-slate-200 shadow-xl">
            <SelectItem value="relevance" className="text-sm py-2">
              Mais Relevantes
            </SelectItem>
            <SelectItem value="price-asc" className="text-sm py-2">
              Preço: Menor para Maior
            </SelectItem>
            <SelectItem value="price-desc" className="text-sm py-2">
              Preço: Maior para Menor
            </SelectItem>
            <SelectItem value="area-asc" className="text-sm py-2">
              Área: Menor para Maior
            </SelectItem>
            <SelectItem value="area-desc" className="text-sm py-2">
              Área: Maior para Menor
            </SelectItem>
            <SelectItem value="newest" className="text-sm py-2">
              Mais Recentes
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
