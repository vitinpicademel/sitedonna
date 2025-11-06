"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

export default function PropertyFilter() {
  const [filters, setFilters] = useState({
    finalidade: "",
    tipo: "",
    bairro: "",
    valorDe: "",
    valorAte: "",
    codigo: "",
  })

  const handleSearch = () => {
    console.log("Buscando com filtros:", filters)
    // Aqui você pode adicionar a lógica de busca
  }

  return (
    <div className="w-full relative">
      <div className="absolute inset-0 bg-gradient-to-r from-[#2a1f15]/95 via-[#3d2f28]/90 to-[#2a1f15]/95 backdrop-blur-md rounded-2xl border border-[#c89968]/30 shadow-2xl" />

      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c89968] to-transparent" />

      <div className="relative py-6 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4 items-end">
          {/* FINALIDADE */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[#c89968] text-xs font-semibold tracking-widest uppercase">Finalidade</label>
            <Select value={filters.finalidade} onValueChange={(value) => setFilters({ ...filters, finalidade: value })}>
              <SelectTrigger className="bg-white/5 border border-[#c89968]/30 text-white h-11 text-sm hover:border-[#c89968]/60 hover:bg-white/10 transition-all focus:ring-1 focus:ring-[#c89968]/50 focus:ring-offset-0 backdrop-blur-sm">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent className="bg-[#2a1f15] border-[#c89968]/30">
                <SelectItem value="venda" className="text-white hover:bg-[#c89968]/20">
                  Venda
                </SelectItem>
                <SelectItem value="aluguel" className="text-white hover:bg-[#c89968]/20">
                  Aluguel
                </SelectItem>
                <SelectItem value="temporada" className="text-white hover:bg-[#c89968]/20">
                  Temporada
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* TIPO */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[#c89968] text-xs font-semibold tracking-widest uppercase">Tipo</label>
            <Select value={filters.tipo} onValueChange={(value) => setFilters({ ...filters, tipo: value })}>
              <SelectTrigger className="bg-white/5 border border-[#c89968]/30 text-white h-11 text-sm hover:border-[#c89968]/60 hover:bg-white/10 transition-all focus:ring-1 focus:ring-[#c89968]/50 focus:ring-offset-0 backdrop-blur-sm">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent className="bg-[#2a1f15] border-[#c89968]/30">
                <SelectItem value="apartamento" className="text-white hover:bg-[#c89968]/20">
                  Apartamento
                </SelectItem>
                <SelectItem value="casa" className="text-white hover:bg-[#c89968]/20">
                  Casa
                </SelectItem>
                <SelectItem value="cobertura" className="text-white hover:bg-[#c89968]/20">
                  Cobertura
                </SelectItem>
                <SelectItem value="studio" className="text-white hover:bg-[#c89968]/20">
                  Studio
                </SelectItem>
                <SelectItem value="penthouse" className="text-white hover:bg-[#c89968]/20">
                  Penthouse
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* BAIRRO */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[#c89968] text-xs font-semibold tracking-widest uppercase">Bairro</label>
            <Input
              type="text"
              placeholder="Digite o Bairro"
              value={filters.bairro}
              onChange={(e) => setFilters({ ...filters, bairro: e.target.value })}
              className="bg-white/5 border border-[#c89968]/30 text-white placeholder:text-white/40 h-11 text-sm hover:border-[#c89968]/60 hover:bg-white/10 transition-all focus-visible:ring-1 focus-visible:ring-[#c89968]/50 focus-visible:ring-offset-0 backdrop-blur-sm"
            />
          </div>

          {/* VALOR DE */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[#c89968] text-xs font-semibold tracking-widest uppercase">Valor De</label>
            <Input
              type="text"
              placeholder="R$ --"
              value={filters.valorDe}
              onChange={(e) => setFilters({ ...filters, valorDe: e.target.value })}
              className="bg-white/5 border border-[#c89968]/30 text-white placeholder:text-white/40 h-11 text-sm hover:border-[#c89968]/60 hover:bg-white/10 transition-all focus-visible:ring-1 focus-visible:ring-[#c89968]/50 focus-visible:ring-offset-0 backdrop-blur-sm"
            />
          </div>

          {/* VALOR ATÉ */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[#c89968] text-xs font-semibold tracking-widest uppercase">Valor Até</label>
            <Input
              type="text"
              placeholder="R$ --"
              value={filters.valorAte}
              onChange={(e) => setFilters({ ...filters, valorAte: e.target.value })}
              className="bg-white/5 border border-[#c89968]/30 text-white placeholder:text-white/40 h-11 text-sm hover:border-[#c89968]/60 hover:bg-white/10 transition-all focus-visible:ring-1 focus-visible:ring-[#c89968]/50 focus-visible:ring-offset-0 backdrop-blur-sm"
            />
          </div>

          {/* CÓDIGO */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[#c89968] text-xs font-semibold tracking-widest uppercase">Código</label>
            <Input
              type="text"
              placeholder="Ex: 3027"
              value={filters.codigo}
              onChange={(e) => setFilters({ ...filters, codigo: e.target.value })}
              className="bg-white/5 border border-[#c89968]/30 text-white placeholder:text-white/40 h-11 text-sm hover:border-[#c89968]/60 hover:bg-white/10 transition-all focus-visible:ring-1 focus-visible:ring-[#c89968]/50 focus-visible:ring-offset-0 backdrop-blur-sm"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-transparent text-xs font-semibold tracking-widest uppercase select-none">.</label>
            <Button
              onClick={handleSearch}
              className="bg-gradient-to-r from-[#c89968] to-[#b8956a] hover:from-[#b8956a] hover:to-[#a88559] text-white font-bold h-11 text-sm tracking-widest transition-all shadow-lg hover:shadow-xl hover:shadow-[#c89968]/20 border border-[#c89968]/50"
            >
              <Search className="w-4 h-4 mr-2" />
              BUSCAR
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c89968] to-transparent" />
    </div>
  )
}
