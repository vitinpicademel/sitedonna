"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, ChevronDown } from "lucide-react"

type HeroSearchValues = {
  searchCode: string
  purpose: "comprar" | "alugar"
  propertyType: string
}

export function HeroSearch({
  onSearch,
  backgroundImage = "/real-estate-agent-work-showing-house-doing-business.jpg",
  variant = "full",
}: {
  onSearch?: (values: HeroSearchValues) => void
  backgroundImage?: string
  variant?: "full" | "minimal"
}) {
  const [searchCode, setSearchCode] = useState("")
  const [purpose, setPurpose] = useState("comprar")
  const [propertyType, setPropertyType] = useState("")
  const [showPropertyTypes, setShowPropertyTypes] = useState(false)

  const propertyTypeOptions = [
    "Apartamento",
    "Casa",
    "Casa em Condomínio",
    "Comercial",
    "Galpão",
    "Terreno",
    "Terreno em Condomínio",
  ]

  const handleSearch = () => {
    onSearch?.({ searchCode, purpose: purpose as "comprar" | "alugar", propertyType })
  }

  if (variant === "minimal") {
    return (
      <section className="relative">
        <div className="container mx-auto px-4 pt-4 pb-0">
          <div className="rounded-3xl p-6 md:p-7 max-w-5xl mx-auto elegant-shadow overflow-visible relative z-10 glass-warm">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end overflow-visible">
              {/* Search Code */}
              <div className="space-y-3">
                <Label htmlFor="search-code" className="text-[#3A3A3A] font-medium text-sm block text-left">
                  Código do Imóvel
                </Label>
                <Input
                  id="search-code"
                  placeholder="Ex: 3027"
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSearch()
                  }}
                  className="bg-white/70 border border-white/40 h-12 text-base rounded-xl focus:ring-1 focus:ring-[#938666] focus:border-[#938666] transition-all duration-200 placeholder:text-slate-500 text-slate-900"
                />
              </div>

              {/* Purpose */}
              <div className="space-y-3">
                <Label className="text-[#3A3A3A] font-medium text-sm block text-left">Finalidade</Label>
                <div className="flex rounded-xl border border-[#938666]/30 bg-white/40 p-1 backdrop-blur-md">
                  <Button
                    type="button"
                    onClick={() => {
                      setPurpose("comprar")
                      onSearch?.({ searchCode, purpose: "comprar", propertyType })
                    }}
                    className={`flex-1 h-10 text-sm rounded-lg font-medium transition-all duration-200 ${
                      purpose === "comprar"
                        ? "bg-[#938666] text-white shadow-sm"
                        : "bg-transparent text-[#3A3A3A] hover:bg-white/60"
                    }`}
                  >
                    Comprar
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      setPurpose("alugar")
                      onSearch?.({ searchCode, purpose: "alugar", propertyType })
                    }}
                    className={`flex-1 h-10 text-sm rounded-lg font-medium transition-all duration-200 ${
                      purpose === "alugar"
                        ? "bg-[#938666] text-white shadow-sm"
                        : "bg-transparent text-[#3A3A3A] hover:bg-white/60"
                    }`}
                  >
                    Alugar
                  </Button>
                </div>
              </div>

              {/* Property Type Dropdown */}
              <div className="space-y-3 relative overflow-visible z-50">
                <Label className="text-[#3A3A3A] font-medium text-sm block text-left">Tipo de Imóvel</Label>
                <div className="relative">
                  <Button
                    type="button"
                    onClick={() => setShowPropertyTypes(!showPropertyTypes)}
                    className="w-full h-12 bg-white/60 border border-white/40 text-[#3A3A3A] hover:bg-white/70 rounded-xl justify-between font-normal text-base backdrop-blur-md"
                  >
                    {propertyType || "Selecione o tipo"}
                    <ChevronDown className={`h-4 w-4 transition-transform ${showPropertyTypes ? "rotate-180" : ""}`} />
                  </Button>

                  {showPropertyTypes && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white/80 border border-white/40 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto backdrop-blur-xl">
                      {propertyTypeOptions.map((type) => (
                        <button
                          key={type}
                          onClick={() => {
                            setPropertyType(type)
                            setShowPropertyTypes(false)
                            onSearch?.({ searchCode, purpose: purpose as "comprar" | "alugar", propertyType: type })
                          }}
                          className="w-full px-4 py-3 text-left text-sm text-[#3A3A3A] hover:bg-white/70 first:rounded-t-xl last:rounded-b-xl transition-colors"
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Search Button */}
              <div>
                <Button
                  onClick={handleSearch}
                  className="w-full h-12 rounded-xl font-semibold text-base transition-all duration-200 backdrop-blur-md text-white shadow-[0_8px_20px_rgba(147,134,102,0.25)]"
                  style={{
                    background: "linear-gradient(135deg, #938666 0%, #a99777 100%)",
                  }}
                >
                  <Search className="mr-2 h-4 w-4" />
                  BUSCAR
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      className="text-primary-foreground py-24 px-4 relative overflow-visible bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(7,23,38,0.85) 0%, rgba(7,23,38,0.72) 35%, rgba(7,23,38,0.55) 60%, rgba(7,23,38,0.40) 100%), url(${backgroundImage})`,
      }}
    >
      <div className="absolute inset-0 pointer-events-none" />

      <div className="container mx-auto text-center relative z-10">
        <div className="mb-16">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold gradient-text text-balance leading-tight mb-8">
            pelo seu novo lar
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-4xl mx-auto leading-relaxed font-light">
            Descubra imóveis exclusivos com a qualidade e confiança que você merece
          </p>
        </div>

        <div className="glass-effect rounded-3xl p-8 max-w-5xl mx-auto elegant-shadow overflow-visible relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end overflow-visible">
            {/* Search Code */}
            <div className="space-y-3">
              <Label htmlFor="search-code" className="text-slate-700 font-medium text-sm block text-left">
                Código do Imóvel
              </Label>
              <Input
                id="search-code"
                placeholder="Ex: 3027"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                className="bg-white border border-slate-200 h-12 text-base rounded-xl focus:ring-1 focus:ring-accent focus:border-accent transition-all duration-200 placeholder:text-slate-400 text-slate-700"
              />
            </div>

            {/* Purpose */}
            <div className="space-y-3">
              <Label className="text-slate-700 font-medium text-sm block text-left">Finalidade</Label>
              <div className="flex rounded-xl border border-slate-200 bg-white p-1">
                <Button
                  type="button"
                  onClick={() => setPurpose("comprar")}
                  className={`flex-1 h-10 text-sm rounded-lg font-medium transition-all duration-200 ${
                    purpose === "comprar"
                      ? "bg-slate-900 text-white shadow-sm"
                      : "bg-transparent text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Comprar
                </Button>
                <Button
                  type="button"
                  onClick={() => setPurpose("alugar")}
                  className={`flex-1 h-10 text-sm rounded-lg font-medium transition-all duration-200 ${
                    purpose === "alugar"
                      ? "bg-slate-900 text-white shadow-sm"
                      : "bg-transparent text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Alugar
                </Button>
              </div>
            </div>

            {/* Property Type Dropdown */}
            <div className="space-y-3 relative overflow-visible z-50">
              <Label className="text-slate-700 font-medium text-sm block text-left">Tipo de Imóvel</Label>
              <div className="relative">
                <Button
                  type="button"
                  onClick={() => setShowPropertyTypes(!showPropertyTypes)}
                  className="w-full h-12 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl justify-between font-normal text-base"
                >
                  {propertyType || "Selecione o tipo"}
                  <ChevronDown className={`h-4 w-4 transition-transform ${showPropertyTypes ? "rotate-180" : ""}`} />
                </Button>

                {showPropertyTypes && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                    {propertyTypeOptions.map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          setPropertyType(type)
                          setShowPropertyTypes(false)
                        }}
                        className="w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-50 first:rounded-t-xl last:rounded-b-xl transition-colors"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Search Button */}
            <div>
              <Button
                onClick={handleSearch}
                className="w-full h-12 accent-gradient hover:shadow-lg transition-all duration-200 rounded-xl font-semibold text-base"
              >
                <Search className="mr-2 h-4 w-4" />
                BUSCAR
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
