"use client"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

// Tipo para opções de filtro do CRM
type FilterOptions = {
  bairros: string[]
  tipos: string[]
  finalidades: string[]
  codigos: string[]
}

// Função para buscar TODAS as opções disponíveis do CRM
async function fetchFilterOptionsFromAPI(): Promise<FilterOptions> {
  try {
    // Busca muitos registros para ter todas as opções disponíveis
    const resp = await fetch("/api/imoview/properties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ numeroPagina: 1, numeroRegistros: 500 }), // Busca até 500 registros
      cache: "no-store",
    })
    if (!resp.ok) return { bairros: [], tipos: [], finalidades: [], codigos: [] }
    const json = await resp.json()
    
    // Extrai lista de imóveis
    let list: any[] = []
    if (Array.isArray(json)) {
      list = json
    } else if (Array.isArray(json?.lista)) {
      list = json.lista
    } else if (Array.isArray(json?.data)) {
      list = json.data
    } else if (Array.isArray(json?.imoveis)) {
      list = json.imoveis
    } else if (Array.isArray(json?.listaImoveis)) {
      list = json.listaImoveis
    }
    
    // Extrai valores únicos de cada campo
    const bairrosSet = new Set<string>()
    const tiposSet = new Set<string>()
    const finalidadesSet = new Set<string>()
    const codigosSet = new Set<string>()
    
    list.forEach((item: any) => {
      // Bairros
      const bairro = item?.endereco?.bairro ?? item?.bairro ?? item?.Bairro ?? item?.Endereco?.Bairro
      if (bairro && typeof bairro === "string" && bairro.trim()) {
        bairrosSet.add(bairro.trim())
      }
      
      // Tipos (usa mesma lógica do mapImoviewToProperty para classificar)
      const tipoRaw = item?.tipo ?? item?.Tipo ?? item?.destinacao ?? item?.Destinacao
      const titulo = item?.titulo ?? item?.Titulo ?? item?.nome ?? item?.Nome ?? ""
      
      if (tipoRaw && typeof tipoRaw === "string" && tipoRaw.trim()) {
        // Classifica o tipo usando a mesma lógica do mapImoviewToProperty
        const t = tipoRaw.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").trim()
        const ti = String(titulo).toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").trim()
        
        const hasCondo = t.includes("condomin") || ti.includes("condomin")
        const isHouseWord = t.includes("casa") || ti.includes("casa") || ti.includes("sobrado")
        const isApartmentWord = /\b(apart|apto|apt|cobertura|kitnet|studio|studios|loft)\b/.test(t) || /\b(apart|apto|apt|cobertura|kitnet|studio|studios|loft)\b/.test(ti)
        
        let tipoClassificado = tipoRaw.trim() // Mantém original como fallback
        
        if (t.includes("fazenda") || ti.includes("fazenda") || ti.includes("sitio") || ti.includes("chacara")) {
          tipoClassificado = "Fazenda"
        } else if (isHouseWord && hasCondo) {
          tipoClassificado = "Casa em condomínio"
        } else if (isHouseWord) {
          tipoClassificado = "Casa"
        } else if (isApartmentWord) {
          tipoClassificado = "Apartamento"
        } else if (t.includes("galp") || ti.includes("galp")) {
          tipoClassificado = "Galpão"
        } else if (t.includes("comerc") || ti.includes("comerc")) {
          tipoClassificado = "Comercial"
        } else if ((t.includes("terreno") || ti.includes("terreno") || ti.includes("lote")) && hasCondo) {
          tipoClassificado = "Terreno em condomínio"
        } else if (t.includes("terreno") || ti.includes("terreno") || ti.includes("lote")) {
          tipoClassificado = "Terreno"
        }
        
        tiposSet.add(tipoClassificado)
      }
      
      // Finalidades
      const finalidade = item?.finalidade ?? item?.Finalidade
      if (finalidade !== null && finalidade !== undefined) {
        if (finalidade === 1 || finalidade === "1" || finalidade === "Aluguel" || finalidade === "ALUGUEL") {
          finalidadesSet.add("Aluguel")
        } else if (finalidade === 2 || finalidade === "2" || finalidade === "Venda" || finalidade === "VENDA") {
          finalidadesSet.add("Venda")
        }
      }
      
      // Códigos
      const codigo = item?.codigo ?? item?.Codigo ?? item?.id ?? item?.Id
      if (codigo && String(codigo).trim()) {
        codigosSet.add(String(codigo).trim())
      }
    })
    
    return {
      bairros: Array.from(bairrosSet).sort(),
      tipos: Array.from(tiposSet).sort(),
      finalidades: Array.from(finalidadesSet).sort(),
      codigos: Array.from(codigosSet).sort(),
    }
  } catch (e) {
    console.log("Erro ao buscar opções do CRM:", e)
    return { bairros: [], tipos: [], finalidades: [], codigos: [] }
  }
}

// Função para formatar valor monetário (retorna apenas números formatados, sem R$)
function formatCurrency(value: string): string {
  // Remove tudo que não é número
  const numbers = value.replace(/\D/g, "")
  if (!numbers) return ""
  
  // Converte para número e formata
  const num = Number(numbers) / 100 // Divide por 100 para ter centavos
  const formatted = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num)
  
  return formatted // Retorna formato: "1.000,00"
}

// Função para remover formatação e retornar apenas números
function unformatCurrency(value: string): string {
  return value.replace(/\D/g, "")
}

export default function PropertyFilter() {
  const router = useRouter()
  const [filters, setFilters] = useState({
    finalidade: "",
    tipo: "",
    bairro: "",
    valorDe: "",
    valorAte: "",
    codigo: "",
  })
  
  // Estados para todas as opções do CRM
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    bairros: [],
    tipos: [],
    finalidades: [],
    codigos: [],
  })
  
  // Estados para autocomplete de cada campo
  const [bairroSuggestions, setBairroSuggestions] = useState<string[]>([])
  const [showBairroSuggestions, setShowBairroSuggestions] = useState(false)
  const [codigoSuggestions, setCodigoSuggestions] = useState<string[]>([])
  const [showCodigoSuggestions, setShowCodigoSuggestions] = useState(false)
  
  const bairroInputRef = useRef<HTMLInputElement>(null)
  const codigoInputRef = useRef<HTMLInputElement>(null)
  const bairroSuggestionsRef = useRef<HTMLDivElement>(null)
  const codigoSuggestionsRef = useRef<HTMLDivElement>(null)
  
  // Carrega TODAS as opções do CRM ao montar
  useEffect(() => {
    fetchFilterOptionsFromAPI().then(setFilterOptions)
  }, [])
  
  // Filtra sugestões de bairros conforme o usuário digita
  useEffect(() => {
    if (!filters.bairro) {
      setBairroSuggestions([])
      setShowBairroSuggestions(false)
      return
    }
    
    const normalized = filters.bairro.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")
    const filtered = filterOptions.bairros.filter((b) =>
      b.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(normalized)
    )
    setBairroSuggestions(filtered.slice(0, 10)) // Máximo 10 sugestões
    setShowBairroSuggestions(filtered.length > 0)
  }, [filters.bairro, filterOptions.bairros])
  
  // Filtra sugestões de códigos conforme o usuário digita
  useEffect(() => {
    if (!filters.codigo) {
      setCodigoSuggestions([])
      setShowCodigoSuggestions(false)
      return
    }
    
    const normalized = filters.codigo.toLowerCase().trim()
    const filtered = filterOptions.codigos.filter((c) =>
      c.toLowerCase().includes(normalized)
    )
    setCodigoSuggestions(filtered.slice(0, 10)) // Máximo 10 sugestões
    setShowCodigoSuggestions(filtered.length > 0)
  }, [filters.codigo, filterOptions.codigos])
  
  // Fecha sugestões ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Bairro
      if (
        bairroSuggestionsRef.current &&
        !bairroSuggestionsRef.current.contains(event.target as Node) &&
        bairroInputRef.current &&
        !bairroInputRef.current.contains(event.target as Node)
      ) {
        setShowBairroSuggestions(false)
      }
      // Código
      if (
        codigoSuggestionsRef.current &&
        !codigoSuggestionsRef.current.contains(event.target as Node) &&
        codigoInputRef.current &&
        !codigoInputRef.current.contains(event.target as Node)
      ) {
        setShowCodigoSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = () => {
    // Constrói os parâmetros de busca
    const params = new URLSearchParams()
    
    // Normaliza finalidade para o formato que a página de imóveis entende
    if (filters.finalidade) {
      if (filters.finalidade === "venda") {
        params.set("finalidade", "comprar")
      } else if (filters.finalidade === "aluguel") {
        params.set("finalidade", "alugar")
      }
    }
    
    // Tipo de imóvel (a página de imóveis normaliza automaticamente)
    if (filters.tipo) {
      params.set("tipo", filters.tipo)
    }
    
    // Bairro
    if (filters.bairro) {
      params.set("bairro", filters.bairro)
    }
    
    // Valores (remove formatação e converte para número)
    if (filters.valorDe) {
      const valorMin = unformatCurrency(filters.valorDe)
      if (valorMin) params.set("valorMin", valorMin)
    }
    if (filters.valorAte) {
      const valorMax = unformatCurrency(filters.valorAte)
      if (valorMax) params.set("valorMax", valorMax)
    }
    
    // Código
    if (filters.codigo) {
      params.set("codigo", filters.codigo.trim())
    }
    
    // Navega para a página de imóveis com os filtros
    const url = `/imoveis?${params.toString()}`
    try {
      router.push(url)
    } catch (_) {
      if (typeof window !== "undefined") {
        window.location.href = url
      }
    }
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
                    <SelectContent className="bg-[#3d2f28] border-[#86674a] text-white lg:bg-[#2a1f15] lg:border-[#c89968]/30 max-h-[300px] overflow-y-auto">
                      {field.key === "finalidade" && (
                        <>
                          {/* Opções vindas do CRM */}
                          {filterOptions.finalidades.length > 0 ? (
                            filterOptions.finalidades.map((f) => (
                              <SelectItem key={f} value={f.toLowerCase() === "aluguel" ? "aluguel" : "venda"}>
                                {f}
                              </SelectItem>
                            ))
                          ) : (
                            // Fallback caso não carregue do CRM
                            <>
                              <SelectItem value="venda">Venda</SelectItem>
                              <SelectItem value="aluguel">Aluguel</SelectItem>
                            </>
                          )}
                        </>
                      )}
                      {field.key === "tipo" && (
                        <>
                          {/* Opções vindas do CRM */}
                          {filterOptions.tipos.length > 0 ? (
                            filterOptions.tipos.map((t) => (
                              <SelectItem key={t} value={t}>
                                {t}
                              </SelectItem>
                            ))
                          ) : (
                            // Fallback caso não carregue do CRM
                            <>
                              <SelectItem value="Apartamento">Apartamento</SelectItem>
                              <SelectItem value="Casa">Casa</SelectItem>
                              <SelectItem value="Casa em condomínio">Casa em condomínio</SelectItem>
                              <SelectItem value="Cobertura">Cobertura</SelectItem>
                              <SelectItem value="Studio">Studio</SelectItem>
                              <SelectItem value="Penthouse">Penthouse</SelectItem>
                              <SelectItem value="Comercial">Comercial</SelectItem>
                              <SelectItem value="Galpão">Galpão</SelectItem>
                              <SelectItem value="Terreno">Terreno</SelectItem>
                              <SelectItem value="Terreno em condomínio">Terreno em condomínio</SelectItem>
                            </>
                          )}
                        </>
                      )}
                    </SelectContent>
                  </Select>
                ) : field.key === "bairro" ? (
                  <div className="relative w-full">
                    <Input
                      ref={bairroInputRef}
                      type="text"
                      placeholder={field.placeholder}
                      value={filters.bairro}
                      onChange={(e) => setFilters({ ...filters, bairro: e.target.value })}
                      onFocus={() => {
                        if (bairroSuggestions.length > 0) setShowBairroSuggestions(true)
                      }}
                      className="w-full h-[60px] rounded-[6px] border border-[#86674a] bg-transparent text-white placeholder:text-white text-base px-4 hover:bg-white/5 transition-all focus-visible:ring-2 focus-visible:ring-[#c89968]/40 focus-visible:ring-offset-0 lg:border-[#c89968]/30 lg:text-sm lg:h-11 lg:rounded-lg"
                    />
                    {showBairroSuggestions && bairroSuggestions.length > 0 && (
                      <div
                        ref={bairroSuggestionsRef}
                        className="absolute z-50 w-full mt-1 bg-[#3d2f28] border border-[#c89968]/30 rounded-lg shadow-lg max-h-48 overflow-y-auto"
                      >
                        {bairroSuggestions.map((bairro) => (
                          <button
                            key={bairro}
                            type="button"
                            onClick={() => {
                              setFilters({ ...filters, bairro })
                              setShowBairroSuggestions(false)
                            }}
                            className="w-full text-left px-4 py-2 text-white hover:bg-[#c89968]/20 transition-colors text-sm"
                          >
                            {bairro}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : field.key === "codigo" ? (
                  <div className="relative w-full">
                    <Input
                      ref={codigoInputRef}
                      type="text"
                      placeholder={field.placeholder}
                      value={filters.codigo}
                      onChange={(e) => setFilters({ ...filters, codigo: e.target.value })}
                      onFocus={() => {
                        if (codigoSuggestions.length > 0) setShowCodigoSuggestions(true)
                      }}
                      className="w-full h-[60px] rounded-[6px] border border-[#86674a] bg-transparent text-white placeholder:text-white text-base px-4 hover:bg-white/5 transition-all focus-visible:ring-2 focus-visible:ring-[#c89968]/40 focus-visible:ring-offset-0 lg:border-[#c89968]/30 lg:text-sm lg:h-11 lg:rounded-lg"
                    />
                    {showCodigoSuggestions && codigoSuggestions.length > 0 && (
                      <div
                        ref={codigoSuggestionsRef}
                        className="absolute z-50 w-full mt-1 bg-[#3d2f28] border border-[#c89968]/30 rounded-lg shadow-lg max-h-48 overflow-y-auto"
                      >
                        {codigoSuggestions.map((codigo) => (
                          <button
                            key={codigo}
                            type="button"
                            onClick={() => {
                              setFilters({ ...filters, codigo })
                              setShowCodigoSuggestions(false)
                            }}
                            className="w-full text-left px-4 py-2 text-white hover:bg-[#c89968]/20 transition-colors text-sm"
                          >
                            {codigo}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : field.key === "valorDe" || field.key === "valorAte" ? (
                  <Input
                    type="text"
                    placeholder={field.placeholder}
                    value={filters[field.key as keyof typeof filters] ? `R$ ${filters[field.key as keyof typeof filters]}` : ""}
                    onChange={(e) => {
                      const inputValue = e.target.value
                      const currentValue = filters[field.key as keyof typeof filters] || ""
                      
                      // Se o usuário está apagando, permite apagar completamente
                      if (inputValue.length < currentValue.length) {
                        const numbers = inputValue.replace(/\D/g, "")
                        if (!numbers) {
                          setFilters({ ...filters, [field.key]: "" })
                          return
                        }
                      }
                      
                      // Formata o valor digitado
                      const formatted = formatCurrency(inputValue)
                      setFilters({ ...filters, [field.key]: formatted })
                    }}
                    onBlur={(e) => {
                      // Garante formatação completa ao sair do campo
                      const value = filters[field.key as keyof typeof filters]
                      if (value) {
                        const numbers = unformatCurrency(value)
                        if (numbers) {
                          const formatted = formatCurrency(numbers)
                          setFilters({ ...filters, [field.key]: formatted })
                        }
                      }
                    }}
                    className="w-full h-[60px] rounded-[6px] border border-[#86674a] bg-transparent text-white placeholder:text-white text-base px-4 hover:bg-white/5 transition-all focus-visible:ring-2 focus-visible:ring-[#c89968]/40 focus-visible:ring-offset-0 lg:border-[#c89968]/30 lg:text-sm lg:h-11 lg:rounded-lg"
                  />
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
