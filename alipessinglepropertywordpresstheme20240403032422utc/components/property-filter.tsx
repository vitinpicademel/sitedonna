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
    <div className="relative w-full">
      {/* Fundo desktop clássico */}
      <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-[#2a1f15]/95 via-[#3d2f28]/90 to-[#2a1f15]/95 rounded-2xl border border-[#c89968]/30 shadow-2xl" />
      <div className="hidden lg:block absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c89968] to-transparent" />
      <div className="hidden lg:block absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c89968] to-transparent" />

      <div
        className="relative w-[95%] max-w-xl mx-auto rounded-xl border border-[#86674a] shadow-[0_25px_55px_rgba(9,4,2,0.65)] lg:w-full lg:max-w-none lg:bg-transparent lg:border-none lg:shadow-none lg:rounded-2xl"
        style={{ backgroundColor: "#3d2f28" }}
      >
        <div className="relative rounded-xl p-6 pb-20 lg:rounded-2xl lg:p-6 lg:pb-6">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-7 lg:gap-4 lg:items-end">
            {[
              { label: "Finalidade", type: "select", key: "finalidade" },
              { label: "Tipo", type: "select", key: "tipo" },
              { label: "Bairro", type: "input", key: "bairro", placeholder: "Digite o Bairro" },
              { label: "Valor De", type: "input", key: "valorDe", placeholder: "R$ --" },
              { label: "Valor Até", type: "input", key: "valorAte", placeholder: "R$ --" },
              { label: "Código", type: "input", key: "codigo", placeholder: "Ex: 3027" },
            ].map((field) => (
              <div key={field.key} className="flex flex-col gap-2">
                <label className="text-white text-[11px] uppercase tracking-[0.12em] font-semibold">
                  {field.label}
                </label>
                {field.type === "select" ? (
                  <Select
                    value={filters[field.key as keyof typeof filters]}
                    onValueChange={(value) => setFilters({ ...filters, [field.key]: value })}
                  >
                    <SelectTrigger className="w-full h-[60px] rounded-[6px] border border-[#86674a] bg-transparent text-white text-base font-medium px-4 data-[placeholder]:text-white [&_svg]:text-[#86674a] hover:bg-white/5 transition-all focus:ring-2 focus:ring-[#c89968]/40 focus:ring-offset-0 lg:border-[#c89968]/30 lg:text-sm lg:h-11 lg:rounded-lg">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#3d2f28] border-[#86674a] text-white lg:bg-[#2a1f15] lg:border-[#c89968]/30">
                      {field.key === "finalidade" && (
                        <>
                          <SelectItem value="venda">Venda</SelectItem>
                          <SelectItem value="aluguel">Aluguel</SelectItem>
                          <SelectItem value="temporada">Temporada</SelectItem>
                        </>
                      )}
                      {field.key === "tipo" && (
                        <>
                          <SelectItem value="apartamento">Apartamento</SelectItem>
                          <SelectItem value="casa">Casa</SelectItem>
                          <SelectItem value="cobertura">Cobertura</SelectItem>
                          <SelectItem value="studio">Studio</SelectItem>
                          <SelectItem value="penthouse">Penthouse</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    type="text"
                    placeholder={field.placeholder}
                    value={filters[field.key as keyof typeof filters]}
                    onChange={(e) => setFilters({ ...filters, [field.key]: e.target.value })}
                    className="w-full h-[60px] rounded-[6px] border border-[#86674a] bg-transparent text-white placeholder:text-white text-base px-4 hover:bg-white/5 transition-all focus-visible:ring-2 focus-visible:ring-[#c89968]/40 focus-visible:ring-offset-0 lg:border-[#c89968]/30 lg:text-sm lg:h-11 lg:rounded-lg"
                  />
                )}
              </div>
            ))}

            <div className="flex flex-col gap-2 lg:mt-0">
              <label className="text-transparent text-[11px] uppercase select-none">.</label>
              <Button
                onClick={handleSearch}
                className="h-[60px] rounded-[6px] bg-[#c89968] text-[#3d2f28] font-semibold text-base tracking-normal border border-[#c89968]/60 shadow-[0_15px_35px_rgba(15,6,2,0.35)] hover:bg-[#d7a880] transition-all w-full lg:w-auto lg:h-11 lg:rounded-lg"
              >
                <Search className="w-4 h-4 mr-2" />
                Buscar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
