import type { Property } from "@/lib/types"

function normalize(str?: string): string {
  return (str || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim()
}

function classifyType(raw?: string, title?: string): Property["type"] {
  const t = normalize(raw)
  const ti = normalize(title)

  // Regras por palavras-chave robustas
  const hasCondo = t.includes("condomin") || ti.includes("condomin")
  const isHouseWord = t.includes("casa") || ti.includes("casa") || ti.includes("sobrado")
  const isApartmentWord =
    /\b(apart|apto|apt|cobertura|kitnet|studio|studios|loft)\b/.test(t) ||
    /\b(apart|apto|apt|cobertura|kitnet|studio|studios|loft)\b/.test(ti)

  if (t.includes("fazenda") || ti.includes("fazenda") || ti.includes("s\u00edtio") || ti.includes("sitio") || ti.includes("ch\u00e1cara") || ti.includes("chacara")) return "Fazenda"
  if (isHouseWord && hasCondo) return "Casa em condomínio"
  if (isHouseWord) return "Casa"
  if (isApartmentWord) return "Apartamento"

  if (t.includes("galp") || ti.includes("galp")) return "Galpão"
  if (t.includes("comerc") || ti.includes("comerc")) return "Comercial"
  if ((t.includes("terreno") || ti.includes("terreno") || ti.includes("lote")) && hasCondo) return "Terreno em condomínio"
  if (t.includes("terreno") || ti.includes("terreno") || ti.includes("lote")) return "Terreno"

  // Fallback conservador: NÃO classificar como Apartamento por padrão
  return "Casa"
}

// Ajustar campos conforme documentação oficial do IMOVIEW
export function mapImoviewToProperty(dto: any): Property {
  function pickFirst<T = any>(obj: any, keys: string[]): T | undefined {
    for (const k of keys) {
      if (k in (obj || {})) return (obj as any)[k] as T
    }
    return undefined
  }
  function getCode(dtoAny: any): string {
    const raw =
      pickFirst<any>(dtoAny, [
        // variações comuns
        "codigo",
        "codigoImovel",
        "codigo_imovel",
        "codigodoimovel",
        "codImovel",
        "CodImovel",
        "Codigo",
        "CodigoImovel",
        "cod",
        "id_imovel",
        "idImovel",
        "id",
      ])
    return String(raw ?? "")
  }
  function normalizeUrl(u?: string): string | undefined {
    if (!u) return undefined
    const s = String(u).trim()
    if (!s) return undefined
    // Se vier caminho relativo, prefixa com BASE_URL (preferindo NEXT_PUBLIC no client)
    const baseEnv = (typeof window !== 'undefined'
      ? (process.env.NEXT_PUBLIC_IMOVIEW_BASE_URL || process.env.IMOVIEW_BASE_URL)
      : (process.env.IMOVIEW_BASE_URL || process.env.NEXT_PUBLIC_IMOVIEW_BASE_URL)) || ""
    if (s.startsWith("/")) {
      if (baseEnv) return `${baseEnv}${s}`
    }
    // Se vier sem esquema e sem barra inicial (ex.: images/foo.jpg), trata como relativo ao base
    if (!/^https?:\/\//i.test(s) && !s.startsWith("data:")) {
      if (baseEnv) {
        const sep = baseEnv.endsWith('/') || s.startsWith('/') ? '' : '/'
        return `${baseEnv}${sep}${s}`
      }
    }
    // Tenta atualizar para https para evitar mixed-content
    if (s.startsWith("http://")) {
      return s.replace(/^http:\/\//i, "https://")
    }
    return s
  }

  function extractFirstImageUrl(source: any): string | undefined {
    if (!source) return undefined
    // candidatos diretos (strings)
    const directKeys = [
      "urlfotoprincipal", "urlFotoPrincipal", "url_foto_principal",
      "fotoprincipal", "fotoPrincipal", "foto_destaque", "fotoDestaque",
      "imagemPrincipal", "imagem_principal", "imagemDestaque", "imagem",
      "foto", "thumbnail", "thumb",
      // chaves adicionais comuns no Imoview
      "foto1", "foto2", "foto3", "principal", "urlImagem", "url_imagem",
    ]
    for (const k of directKeys) {
      if (k in source) {
        const v = normalizeUrl((source as any)[k])
        if (v) return v
      }
    }
    // arrays de imagens conhecidos
    const arrayKeys = [
      "fotos", "imagens", "images", "galeria", "imagensDoImovel", "fotosImovel", "midias", "media",
      // variações vistas em alguns CRMs
      "Fotos", "Imagens", "Galeria",
    ]
    const urlKeys = ["url", "link", "caminho", "arquivo", "urlArquivo", "arquivoUrl", "src", "Url", "Link"]
    for (const arrK of arrayKeys) {
      const arr = (source as any)[arrK]
      if (Array.isArray(arr) && arr.length) {
        for (const item of arr) {
          for (const uk of urlKeys) {
            const v = normalizeUrl((item || {})[uk])
            if (v) return v
          }
        }
      }
    }
    // Procura aninhado por strings com extensões de imagem (fallback robusto)
    const seen = new Set<any>()
    const stack: any[] = [source]
    const re = /(https?:)?\/\/|\.(png|jpe?g|webp|gif)(\?.*)?$/i
    let depth = 0
    while (stack.length && depth < 3) {
      const obj = stack.pop()
      if (!obj || typeof obj !== 'object' || seen.has(obj)) continue
      seen.add(obj)
      for (const val of Object.values(obj)) {
        if (typeof val === 'string' && re.test(val)) {
          const v = normalizeUrl(val)
          if (v) return v
        } else if (val && typeof val === 'object') {
          stack.push(val)
        }
      }
      depth++
    }
    return undefined
  }
  function parseMoney(raw: any): number | undefined {
    if (raw === null || raw === undefined) return undefined
    if (typeof raw === "number") return Math.round(raw)
    const s = String(raw).trim()
    if (!s) return undefined
    // If it looks like pt-BR (has comma), remove thousand dots and use comma as decimal
    if (s.includes(",")) {
      const normalized = s.replace(/\./g, "").replace(",", ".")
      const n = Number(normalized.replace(/[^0-9.]/g, ""))
      if (Number.isFinite(n)) return Math.round(n)
      // Fallback: keep only digits and divide by 100 to remove cents
      const digits = Number(s.replace(/\D/g, ""))
      return Number.isFinite(digits) ? Math.round(digits / 100) : undefined
    }
    // Otherwise keep digits (already dot-decimal or integer)
    const n = Number(String(s).replace(/[^0-9.]/g, ""))
    if (Number.isFinite(n)) return Math.round(n)
    const digits = Number(String(s).replace(/\D/g, ""))
    return Number.isFinite(digits) ? digits : undefined
  }
  function parseArea(raw: any): number | undefined {
    if (raw === null || raw === undefined) return undefined
    if (typeof raw === "number") return raw
    const s = String(raw)
      .replace(/m2|m²|metros|metro|quadrados|quadrado/gi, "")
      .trim()
    if (!s) return undefined
    if (s.includes(",")) {
      const normalized = s.replace(/\./g, "").replace(",", ".")
      const n = Number(normalized.replace(/[^0-9.]/g, ""))
      return Number.isFinite(n) ? n : undefined
    }
    const n = Number(s.replace(/[^0-9.]/g, ""))
    return Number.isFinite(n) ? n : undefined
  }
  function parseDimensionsToArea(raw: any): number | undefined {
    if (!raw) return undefined
    const s = String(raw).toLowerCase().replace(/\s+/g, "")
    // patterns like 10x20, 12.5x25, 12,5x25,00
    const match = s.match(/(\d+[\.,]?\d*)x(\d+[\.,]?\d*)/)
    if (match) {
      const a = Number(match[1].replace(',', '.'))
      const b = Number(match[2].replace(',', '.'))
      // Use only plausible dimensions (in metros) to evitar erros de escala
      if (Number.isFinite(a) && Number.isFinite(b) && a > 1 && b > 1 && a < 300 && b < 300) {
        return Math.round(a * b)
      }
    }
    return undefined
  }
  function parseAreaFromText(raw: any): number | undefined {
    if (!raw) return undefined
    const s = String(raw)
    const rg = /(\d+[\.,]?\d*)\s*(m²|m2)/i
    const m = s.match(rg)
    if (m) {
      const n = Number(m[1].replace(',', '.'))
      if (Number.isFinite(n)) return Math.round(n)
    }
    return undefined
  }
  function pickAreaFromKeys(dtoAny: any): { priv?: number; total?: number } {
    const pri: number[] = []
    const tot: number[] = []
    const gen: number[] = []
    if (!dtoAny || typeof dtoAny !== 'object') return {}

    const walk = (obj: any, path: string[] = [], depth = 0) => {
      if (!obj || typeof obj !== 'object' || depth > 3) return
      for (const [k, v] of Object.entries(obj)) {
        const key = [...path, k].join('.').toLowerCase()
        if (v == null) continue
        let n: number | undefined
        if (typeof v === 'number') n = v
        else if (typeof v === 'string') {
          // campos de medidas/dimensões
          if (/medid|dimens|frente|largur|compriment|fundo/.test(key)) {
            n = parseDimensionsToArea(v)
          } else {
            // áreas genéricas: só aceite com unidade explícita m²/m2 para evitar confusão com "valor m²"
            if (!/valor|preco|preço/.test(key)) {
              n = parseAreaFromText(v) ?? parseArea(v)
            }
          }
        } else if (typeof v === 'object') {
          walk(v as any, [...path, k], depth + 1)
          continue
        }

        if (!n || !Number.isFinite(n) || n <= 0) continue

        if (/terren|lote/.test(key)) {
          tot.push(n)
        } else if (/priv|util|útil|constru|intern/.test(key)) {
          pri.push(n)
        } else if (/area|m2|m²|metragem|metro/.test(key) && !/valor/.test(key)) {
          gen.push(n)
        }
      }
    }

    walk(dtoAny)

    const priv = pri.find((x) => x > 0) ?? gen.find((x) => x > 0)
    const total = tot.find((x) => x > 0)
    return { priv, total }
  }
  let areaPriv = parseArea(
      dto.areaprivativa ??
        dto.area_privativa ??
        dto.areaPrivada ??
        dto.area_privada ??
        dto.areautil ??
        dto.area_util ??
        dto.area_util_total ??
        dto.areaUtil ??
        dto.areaConstruida ??
        dto.area_construida ??
        dto.area_constr ??
        dto.metragem ??
        dto.metragem_privativa ??
        dto.m2 ??
        dto.metros_quadrados ??
        dto.metros_quadrado
    )
  if (!areaPriv) areaPriv = parseAreaFromText(dto.descricao ?? dto.obs)
  let areaTot = parseArea(
      dto.areatotal ??
        dto.area_total ??
        dto.area_total_terreno ??
        dto.areaTerreno ??
        dto.area_terreno ??
        dto.metragem_total ??
        dto.m2_total
    )
  if (!areaPriv || !areaTot) {
    const picked = pickAreaFromKeys(dto)
    areaPriv = areaPriv ?? picked.priv
    areaTot = areaTot ?? picked.total
  }
  // derive from dimensions if still missing
  const width = parseArea(dto.largura ?? dto.frente ?? dto.frenteterreano ?? dto.frente_terreno)
  const depth = parseArea(dto.comprimento ?? dto.fundos ?? dto.fundo ?? dto.comprimento_terreno)
  const areaFromDims = (!areaTot && width && depth) ? Math.round(width * depth) : parseDimensionsToArea(dto.dimensoes ?? dto.dimensao ?? dto.medidas)

  return {
    id: String(dto.id ?? (getCode(dto) || crypto.randomUUID())),
    slug: String(dto.slug ?? (getCode(dto) || dto.id) ?? "imovel"),
    status:
      dto.finalidade === 1 || dto.finalidade === "Aluguel" || dto.finalidade === "ALUGUEL"
        ? "Aluguel"
        : "Venda",
    type: classifyType(dto.tipo ?? dto.destinacao ?? "", dto.titulo ?? dto.nome ?? ""),
    title: dto.titulo ?? dto.nome ?? "Imóvel",
    code: getCode(dto),
    address: {
      street: dto.endereco?.logradouro ?? dto.endereco ?? dto.logradouro ?? "",
      number: dto.endereco?.numero ?? dto.numero ?? "",
      neighborhood: dto.endereco?.bairro ?? dto.bairro ?? "",
      city: dto.endereco?.cidade ?? dto.cidade ?? "",
      state: dto.endereco?.uf ?? dto.estado ?? dto.uf ?? "",
      lat: dto.endereco?.lat ? Number(dto.endereco.lat) : undefined,
      lng: dto.endereco?.lng ? Number(dto.endereco.lng) : undefined,
    },
    areaPrivativa: areaPriv,
    areaTotal: areaTot ?? areaFromDims,
    bedrooms: Number(dto.numeroquartos ?? dto.quartos ?? dto.dormitorios ?? dto.dorms ?? 0) || undefined,
    suites: Number(dto.numerosuites ?? dto.suites ?? 0) || undefined,
    bathrooms: Number(dto.numerobanhos ?? dto.banheiros ?? 0) || undefined,
    parking: Number(dto.numerovagas ?? dto.vagas ?? 0) || undefined,
    priceSale:
      dto.finalidade === "Venda" || dto.finalidade === 2
        ? (() => {
            const raw = dto.valor ?? dto.valorminimo ?? dto.valorVenda ?? dto.valor_venda
            const n = parseMoney(raw)
            return n && n > 0 ? n : undefined
          })()
        : undefined,
    priceRent:
      dto.finalidade === "Aluguel" || dto.finalidade === 1
        ? (() => {
            const raw = dto.valor ?? dto.valorminimo ?? dto.valorAluguel ?? dto.valor_aluguel
            const n = parseMoney(raw)
            return n && n > 0 ? n : undefined
          })()
        : undefined,
    condoFee: dto.condominio ? Number(dto.condominio) : undefined,
    iptu: dto.iptu ? Number(dto.iptu) : undefined,
    description: dto.descricao ?? dto.obs,
    amenities: undefined,
    media: (() => {
      // Coleciona TODAS as imagens possíveis, sem duplicar
      const list: { url: string; alt: string }[] = []
      const seen = new Set<string>()
      const add = (u?: string) => {
        const v = normalizeUrl(u)
        if (v && !seen.has(v)) {
          list.push({ url: v, alt: dto.titulo ?? "" })
          seen.add(v)
        }
      }

      // Arrays mais comuns de imagens
      const arrayKeys = [
        "fotos",
        "imagens",
        "images",
        "galeria",
        "imagensDoImovel",
        "fotosImovel",
        "midias",
        "media",
      ]
      const urlKeys = [
        "url",
        "link",
        "caminho",
        "arquivo",
        "urlArquivo",
        "arquivoUrl",
        "src",
        "Url",
        "Link",
      ]
      for (const arrK of arrayKeys) {
        const arr = (dto as any)?.[arrK]
        if (Array.isArray(arr)) {
          for (const item of arr) {
            for (const uk of urlKeys) add((item || {})[uk])
          }
        }
      }

      // Alguns CRMs colocam campos individuais como foto1, foto2...
      for (let i = 1; i <= 30; i++) add((dto as any)?.[`foto${i}`])

      // Garante que a foto principal também esteja incluída
      const first = extractFirstImageUrl(dto)
      add(first)

      return list
    })(),
    isFeatured: Boolean(dto.destaque),
  }
}


