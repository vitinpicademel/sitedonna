import { NextResponse } from "next/server"
import { mapImoviewToProperty } from "@/lib/map-imoview"

/**
 * Função auxiliar para normalizar strings: remove acentos e converte para minúsculo
 * Exemplo: "Estância" -> "estancia", "São Paulo" -> "sao paulo"
 */
function normalizeString(str: string): string {
  if (!str || typeof str !== "string") return ""
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacríticos (acentos)
    .trim()
}

/**
 * Lista hardcoded de bairros para TESTE (fallback de debug)
 * Se o banco não retornar nada, usamos esta lista para testar o frontend
 */
const FALLBACK_BAIRROS = [
  "Estância dos Ipês",
  "Centro",
  "Mercês",
  "Jardim Induberaba",
  "Jardim Europa",
  "Jardim Brasília",
  "Universitário",
  "Fabrício",
  "Jockey Park",
  "Abadia",
  "Boa Vista",
  "Cyrella",
  "Estados Unidos",
  "Nova Uberaba",
  "Parque das Américas",
  "Santa Marta",
  "São Benedito",
  "Tibery",
  "Vila Olímpica",
]

/**
 * Endpoint de API para busca de bairros (autocomplete)
 * 
 * ESTRATÉGIA: Busca bairros diretamente da tabela de Imóveis (Properties)
 * 
 * Query params:
 * - q: termo de busca (ex: "Est")
 * - limit: número máximo de resultados (padrão: 10)
 * 
 * Retorna: Array de strings com nomes de bairros que contêm o termo buscado
 */
export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const query = url.searchParams.get("q") || ""
    const limit = parseInt(url.searchParams.get("limit") || "10", 10)

    console.log("=".repeat(80))
    console.log("🔍 [BAIRROS API] Iniciando busca de bairros")
    console.log("🔍 Query recebida:", query)
    console.log("🔍 Limit:", limit)
    console.log("=".repeat(80))

    // Se a query estiver vazia, retorna array vazio
    if (!query.trim()) {
      console.log("⚠️  Query vazia, retornando array vazio")
      return NextResponse.json([], { status: 200 })
    }

    // Normaliza a query para busca case-insensitive e sem acentos
    const normalizedQuery = normalizeString(query)
    console.log("📝 Query normalizada:", normalizedQuery)

    // PASSO 1: Buscar imóveis do CRM
    const configuredBase = process.env.IMOVIEW_BASE_URL || "https://api.imoview.com.br"
    const key = process.env.IMOVIEW_API_KEY || "8d5720c964c395ff128876787322e2c3"

    // Busca muitos registros para ter boa cobertura de bairros
    const payload = {
      numeroPagina: 1,
      numeroRegistros: 1000, // Aumentado para 1000 para máxima cobertura
    }

    console.log("📡 Buscando imóveis do CRM...")
    console.log("📡 Endpoint base:", configuredBase)
    console.log("📡 Payload:", JSON.stringify(payload))

    // Endpoints candidatos (mesmos usados pela API de properties)
    const candidates = [
      "/Imovel/RetornarImoveisDisponiveis",
      "/Imovel/Retornar",
      "/Imovel/Consultar",
      "/Imovel/RetornarImoveis",
    ]

    let list: any[] = []
    let successfulEndpoint = ""

    // Tenta buscar do CRM
    for (const path of candidates) {
      try {
        const endpointUrl = `${configuredBase}${path}`
        console.log(`📡 Tentando endpoint: ${endpointUrl}`)
        
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 segundos

        const resp = await fetch(endpointUrl, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            chave: key,
          },
          body: JSON.stringify(payload),
          cache: "no-store",
          signal: controller.signal,
        })

        clearTimeout(timeoutId)

        if (!resp.ok) {
          console.log(`❌ Endpoint ${path} retornou status: ${resp.status}`)
          continue
        }

        const text = await resp.text().catch(() => "")
        let json: any
        try {
          json = JSON.parse(text)
        } catch (parseErr) {
          console.log(`❌ Endpoint ${path}: JSON inválido`)
          continue
        }

        // Extrai lista de imóveis de diferentes estruturas possíveis
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
        } else if (Array.isArray(json?.ListaImoveis)) {
          list = json.ListaImoveis
        }

        if (list.length > 0) {
          successfulEndpoint = path
          console.log(`✅ Endpoint ${path} retornou ${list.length} imóveis`)
          break
        } else {
          console.log(`⚠️  Endpoint ${path} retornou array vazio`)
        }
      } catch (e: any) {
        if (e.name === "AbortError") {
          console.log(`⏱️  Endpoint ${path}: Timeout`)
        } else {
          console.log(`❌ Endpoint ${path} erro:`, e.message)
        }
        continue
      }
    }

    // PASSO 2: Log de teste de sanidade
    console.log("=".repeat(80))
    console.log("📊 TOTAL DE IMÓVEIS NO BANCO:", list.length)
    console.log("📊 Endpoint bem-sucedido:", successfulEndpoint || "NENHUM")
    console.log("=".repeat(80))

    // PASSO 3: Extrair TODOS os bairros únicos dos imóveis
    const bairrosSet = new Set<string>()
    let bairrosExtraidosCount = 0
    let bairrosComProblemaCount = 0

    console.log("🔍 Extraindo bairros dos imóveis...")

    list.forEach((item: any, index: number) => {
      // Estratégia 1: Usar mapImoviewToProperty (mesma lógica dos cards)
      try {
        const property = mapImoviewToProperty(item)
        const bairro = property.address?.neighborhood

        if (bairro && typeof bairro === "string" && bairro.trim()) {
          const bairroLimpo = bairro.trim()
          bairrosSet.add(bairroLimpo)
          bairrosExtraidosCount++

          // Log dos primeiros 10 bairros extraídos
          if (bairrosExtraidosCount <= 10) {
            console.log(`  ✓ [${bairrosExtraidosCount}] Bairro extraído: "${bairroLimpo}"`)
          }
        }
      } catch (e) {
        bairrosComProblemaCount++
      }

      // Estratégia 2: Extração direta (fallback caso mapImoviewToProperty falhe)
      const bairroDireto = 
        item?.endereco?.bairro ?? 
        item?.bairro ?? 
        item?.Bairro ?? 
        item?.Endereco?.Bairro ??
        item?.enderecoCompleto?.bairro ??
        item?.localizacao?.bairro

      if (bairroDireto && typeof bairroDireto === "string" && bairroDireto.trim()) {
        bairrosSet.add(bairroDireto.trim())
      }
    })

    console.log("=".repeat(80))
    console.log("📊 TOTAL DE BAIRROS ÚNICOS EXTRAÍDOS:", bairrosSet.size)
    console.log("📊 Bairros extraídos com sucesso:", bairrosExtraidosCount)
    console.log("📊 Imóveis com problemas:", bairrosComProblemaCount)
    console.log("=".repeat(80))

    // Converte Set para Array
    const allBairrosArray = Array.from(bairrosSet).sort()

    // Log de todos os bairros extraídos (para debug)
    console.log("📋 Lista completa de bairros extraídos:")
    allBairrosArray.slice(0, 20).forEach((b, i) => {
      console.log(`  [${i + 1}] ${b}`)
    })
    if (allBairrosArray.length > 20) {
      console.log(`  ... e mais ${allBairrosArray.length - 20} bairros`)
    }

    // PASSO 4: Filtragem com normalização agressiva
    console.log("=".repeat(80))
    console.log("🔍 Filtrando bairros...")
    console.log("🔍 Query normalizada:", normalizedQuery)
    console.log("=".repeat(80))

    const filteredBairros = allBairrosArray.filter((bairro) => {
      const normalizedBairro = normalizeString(bairro)
      const matches = normalizedBairro.includes(normalizedQuery)
      
      // Log das primeiras 10 comparações
      if (allBairrosArray.indexOf(bairro) < 10) {
        console.log(`  "${bairro}" (normalizado: "${normalizedBairro}") → ${matches ? "✓ MATCH" : "✗"}`)
      }
      
      return matches
    })

    console.log("=".repeat(80))
    console.log("📊 TOTAL DE BAIRROS APÓS FILTRO:", filteredBairros.length)
    console.log("=".repeat(80))

    // PASSO 5: Ordenação e limitação
    const sortedBairros = filteredBairros
      .map((bairro) => {
        const normalizedBairro = normalizeString(bairro)
        const startsWith = normalizedBairro.startsWith(normalizedQuery) ? 1 : 0
        const exactMatch = normalizedBairro === normalizedQuery ? 2 : 0
        return {
          bairro,
          score: exactMatch + startsWith,
        }
      })
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score
        return a.bairro.localeCompare(b.bairro, "pt-BR")
      })
      .slice(0, limit)
      .map((item) => item.bairro)

    // PASSO 6: FALLBACK DE DEBUG - Se não encontrou nada, usa lista hardcoded
    let finalResults = sortedBairros

    if (sortedBairros.length === 0 && list.length === 0) {
      console.log("=".repeat(80))
      console.log("⚠️  MODO FALLBACK: Banco não retornou dados, usando lista hardcoded")
      console.log("=".repeat(80))
      
      finalResults = FALLBACK_BAIRROS
        .filter((bairro) => {
          const normalizedBairro = normalizeString(bairro)
          return normalizedBairro.includes(normalizedQuery)
        })
        .slice(0, limit)
    } else if (sortedBairros.length === 0 && list.length > 0) {
      console.log("=".repeat(80))
      console.log("⚠️  PROBLEMA: Banco retornou dados mas nenhum bairro passou no filtro!")
      console.log("⚠️  Todos os bairros extraídos:", allBairrosArray)
      console.log("⚠️  Query normalizada usada:", normalizedQuery)
      console.log("=".repeat(80))
    }

    console.log("=".repeat(80))
    console.log("✅ RESULTADO FINAL:")
    console.log("✅ Total de bairros retornados:", finalResults.length)
    console.log("✅ Bairros:", finalResults)
    console.log("=".repeat(80))

    return NextResponse.json(finalResults, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    })
  } catch (error: any) {
    console.error("=".repeat(80))
    console.error("❌ ERRO CRÍTICO NA API DE BAIRROS")
    console.error("❌ Erro:", error)
    console.error("❌ Stack:", error?.stack)
    console.error("=".repeat(80))
    
    // Em caso de erro, retorna array vazio
    return NextResponse.json([], { status: 200 })
  }
}
