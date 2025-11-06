"use client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import type { SearchFilters } from "@/lib/types"

export function HeroSection() {
  const router = useRouter()
  // Reveal on scroll
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show')
          }
        })
      },
      { threshold: 0.2 }
    )
    elements.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const [finalidade, setFinalidade] = useState("")
  const [tipo, setTipo] = useState("")
  const [bairro, setBairro] = useState("")
  const [valorDe, setValorDe] = useState("")
  const [valorAte, setValorAte] = useState("")
  const [codigo, setCodigo] = useState("")

  const query = useMemo(() => {
    const params = new URLSearchParams()
    if (finalidade) params.set("finalidade", finalidade.toLowerCase() === "locacao" ? "Alugar" : "Comprar")
    if (tipo) params.set("tipo", tipo)
    if (bairro) params.set("bairro", bairro)
    const toNumber = (s: string) => Number(s.replace(/\./g, "").replace(",", ".").replace(/[^0-9.]/g, ""))
    if (valorDe) params.set("valorMin", String(Math.round(toNumber(valorDe))))
    if (valorAte) params.set("valorMax", String(Math.round(toNumber(valorAte))))
    if (codigo) params.set("codigo", codigo)
    return params.toString()
  }, [finalidade, tipo, bairro, valorDe, valorAte, codigo])

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const finalidade = String(form.get("finalidade") || "")
    const tipo = String(form.get("tipo") || "")
    const bairro = String(form.get("bairro") || "")
    const valorDe = String(form.get("valor_de") || "")
    const valorAte = String(form.get("valor_ate") || "")
    const codigo = String(form.get("codigo") || "")

    const params = new URLSearchParams()
    // normaliza para o que a página de imóveis entende
    if (finalidade) params.set("finalidade", finalidade.toLowerCase() === "locacao" ? "Alugar" : "Comprar")
    if (tipo) params.set("tipo", tipo)
    if (bairro) params.set("bairro", bairro)

    const toNumber = (s: string) => Number(s.replace(/\./g, "").replace(",", ".").replace(/[^0-9.]/g, ""))
    if (valorDe) params.set("valorMin", String(Math.round(toNumber(valorDe))))
    if (valorAte) params.set("valorMax", String(Math.round(toNumber(valorAte))))
    if (codigo) params.set("codigo", codigo)

    const url = `/imoveis?${params.toString()}`
    try {
      router.push(url)
    } catch (_) {
      if (typeof window !== "undefined") window.location.href = url
    }
  }

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    // Redundancy: ensure navigation even if onSubmit doesn't fire
    const formEl = (e.currentTarget.closest('form') as HTMLFormElement) || undefined
    if (!formEl) return
    const fd = new FormData(formEl)
    const finalidade = String(fd.get("finalidade") || "")
    const tipo = String(fd.get("tipo") || "")
    const bairro = String(fd.get("bairro") || "")
    const valorDe = String(fd.get("valor_de") || "")
    const valorAte = String(fd.get("valor_ate") || "")
    const codigo = String(fd.get("codigo") || "")
    const params = new URLSearchParams()
    if (finalidade) params.set("finalidade", finalidade.toLowerCase() === "locacao" ? "Alugar" : "Comprar")
    if (tipo) params.set("tipo", tipo)
    if (bairro) params.set("bairro", bairro)
    const toNumber = (s: string) => Number(s.replace(/\./g, "").replace(",", ".").replace(/[^0-9.]/g, ""))
    if (valorDe) params.set("valorMin", String(Math.round(toNumber(valorDe))))
    if (valorAte) params.set("valorMax", String(Math.round(toNumber(valorAte))))
    if (codigo) params.set("codigo", codigo)
    const url = `/imoveis?${params.toString()}`
    if (typeof window !== "undefined") window.location.assign(url)
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image com overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/backgroud.png')",
        }}
      />
      
      {/* Overlay com gradiente mais claro no topo */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.4))'
        }}
      />

      {/* Conteúdo centralizado */}
      <div className="relative z-10 container mx-auto px-4 text-center flex flex-col justify-end h-full py-24">
        <div className="max-w-6xl mx-auto mb-8">
          {/* Textos principais */}
          <div className="space-y-6">
            <h1 
              className="reveal reveal-delay-1 text-3xl md:text-4xl lg:text-5xl font-medium text-chave-branco leading-tight tracking-wider"
              style={{ 
                fontFamily: 'Poppins, sans-serif',
                fontWeight: '500',
                letterSpacing: '0.8px',
                textShadow: '0 2px 12px rgba(0,0,0,0.35)'
              }}
            >
              Transformamos cada chave em <span className="font-semibold" style={{color: '#e3d49c', textShadow: '0 1px 8px rgba(0,0,0,0.4)'}}>novas possibilidades.</span>
            </h1>
            <p 
              className="reveal reveal-delay-3 text-chave-branco font-normal leading-relaxed max-w-2xl mx-auto tracking-wider opacity-95"
              style={{ 
                fontFamily: 'Poppins, sans-serif',
                fontSize: '16px',
                lineHeight: '1.7em',
                letterSpacing: '0.6px',
                textShadow: '0 1px 6px rgba(0,0,0,0.25)'
              }}
            >
              Com a Donna Imobiliária, o seu próximo capítulo começa aqui
            </p>
          </div>
        </div>

        {/* Caixa de busca moderna - posicionada mais para baixo */}
        <div className="w-full mt-2 reveal show">
          <section className="search-box">
            <form className="search-form" action="/imoveis" method="get">
              {/* Campo Finalidade */}
              <div className="search-field-container">
                <label className="search-label">FINALIDADE</label>
                <select 
                  name="finalidade"
                  className="search-field"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                  value={finalidade}
                  onChange={(e) => setFinalidade(e.target.value)}
                >
                  <option value="" style={{ color: '#999' }}>Selecione</option>
                  <option value="Comprar" style={{ color: '#0a1a2f' }}>Venda</option>
                  <option value="Alugar" style={{ color: '#0a1a2f' }}>Locação</option>
                </select>
              </div>

              {/* Campo Tipo */}
              <div className="search-field-container">
                <label className="search-label">TIPO</label>
                <select 
                  name="tipo"
                  className="search-field"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                >
                  <option value="" style={{ color: '#999' }}>Selecione</option>
                  <option value="casa" style={{ color: '#0a1a2f' }}>Casa</option>
                  <option value="apartamento" style={{ color: '#0a1a2f' }}>Apartamento</option>
                  <option value="terreno" style={{ color: '#0a1a2f' }}>Terreno</option>
                  <option value="comercial" style={{ color: '#0a1a2f' }}>Comercial</option>
                </select>
              </div>

              {/* Campo Bairro */}
              <div className="search-field-container">
                <label className="search-label">BAIRRO</label>
                <input 
                  type="text" 
                  name="bairro"
                  placeholder="Digite o Bairro"
                  className="search-field"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                />
              </div>

              {/* Campo Valor de */}
              <div className="search-field-container">
                <label className="search-label">VALOR DE</label>
                <input 
                  type="text" 
                  name="valorMin"
                  placeholder="R$ --"
                  className="search-field"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                  value={valorDe}
                  onChange={(e) => setValorDe(e.target.value)}
                />
              </div>

              {/* Campo Valor até */}
              <div className="search-field-container">
                <label className="search-label">VALOR ATÉ</label>
                <input 
                  type="text" 
                  name="valorMax"
                  placeholder="R$ --"
                  className="search-field"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                  value={valorAte}
                  onChange={(e) => setValorAte(e.target.value)}
                />
              </div>

              {/* Campo Código */}
              <div className="search-field-container">
                <label className="search-label">CÓDIGO</label>
                <input 
                  type="text" 
                  name="codigo"
                  placeholder="Ex.: 3027"
                  className="search-field"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                />
              </div>

              {/* Botão BUSCAR */}
              <div className="search-field-container">
                <div className="search-label" style={{ visibility: 'hidden', height: '20px' }}>BUSCAR</div>
                <button type="submit" className="search-button" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  BUSCAR
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </section>
  )
}