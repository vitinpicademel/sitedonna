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

  const fields = [
    { label: "Finalidade", type: "select", key: "finalidade", placeholder: "Selecione", options: ["Venda", "Aluguel", "Temporada"] },
    { label: "Tipo", type: "select", key: "tipo", placeholder: "Selecione", options: ["Apartamento", "Casa", "Cobertura", "Studio", "Penthouse"] },
    { label: "Bairro", type: "input", key: "bairro", placeholder: "Digite o Bairro" },
    { label: "Valor De", type: "input", key: "valorDe", placeholder: "R$ --" },
    { label: "Valor Até", type: "input", key: "valorAte", placeholder: "R$ --" },
    { label: "Código", type: "input", key: "codigo", placeholder: "Ex: 3027" },
  ]

  return (
    <div className="relative w-full">
      {/* Fundo desktop clássico */}
      <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-[#2a1f15]/95 via-[#3d2f28]/90 to-[#2a1f15]/95 rounded-2xl border border-[#c89968]/30 shadow-2xl" />
      <div className="hidden lg:block absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c89968] to-transparent" />
      <div className="hidden lg:block absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c89968] to-transparent" />

      <div className="relative w-[95%] max-w-xl mx-auto rounded-xl border border-[#86674a] shadow-[0_25px_65px_rgba(3,13,27,0.65)] lg:w-full lg:max-w-none lg:bg-transparent lg:border-none lg:shadow-none lg:rounded-2xl" style={{ backgroundColor: "#3d2f28" }}>
        <div className="relative rounded-xl p-6 pb-20 lg:rounded-2xl lg:p-6 lg:pb-6">
          <div className="grid grid-cols-1 gap-5 items-end lg:grid-cols-7 lg:gap-4">
            {fields.map((field) => (
              <div key={field.key} className="flex flex-col gap-2">
                <label className="text-white text-[11px] uppercase tracking-[0.1em] font-semibold lg:text-[#c89968] lg:text-[11px] lg:tracking-wide">
                  {field.label}
                </label>
                {field.type === "select" ? (
                  <Select
                    value={(filters as any)[field.key]}
                    onValueChange={(value) => setFilters({ ...filters, [field.key]: value })}
                  >
                    <SelectTrigger className="w-full h-[60px] rounded-[6px] border border-[#86674a] bg-transparent text-white text-[16px] font-medium px-4 data-[placeholder]:text-[#cccccc] hover:bg-white/5 hover:border-white/40 transition-all focus:ring-2 focus:ring-white/20 focus:ring-offset-0 lg:border-[#c89968]/30 lg:text-sm lg:h-11 lg:rounded-lg [&_svg]:text-[#86674a]">
                      <SelectValue placeholder={field.placeholder} />
                    </SelectTrigger>
                    <SelectContent className="bg-[#3d2f28] border-[#86674a] text-white">
                      {field.options?.map((option) => (
                        <SelectItem
                          key={option}
                          value={option.toLowerCase()}
                          className="data-[highlighted]:bg-[#86674a]/20 data-[state=checked]:bg-[#86674a]/20 text-white"
                        >
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    type="text"
                    placeholder={field.placeholder}
                    value={(filters as any)[field.key]}
                    onChange={(e) => setFilters({ ...filters, [field.key]: e.target.value })}
                    className="w-full h-[60px] rounded-[6px] border border-[#86674a] bg-transparent text-white placeholder:text-[#cccccc] text-[16px] px-4 hover:bg-white/5 hover:border-white/40 transition-all focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-0 lg:border-[#c89968]/30 lg:text-sm lg:h-11 lg:rounded-lg"
                  />
                )}
              </div>
            ))}

            <div className="flex flex-col gap-2 lg:mt-0">
              <label className="text-transparent text-[11px] uppercase select-none">.</label>
              <Button
                onClick={handleSearch}
                className="h-[60px] rounded-[6px] bg-[#c89968] text-[#3d2f28] font-semibold text-[16px] tracking-normal border border-[#c89968]/60 shadow-[0_15px_35px_rgba(0,0,0,0.35)] hover:bg-[#d4af37] transition-all w-full lg:w-auto lg:h-11 lg:rounded-lg"
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
