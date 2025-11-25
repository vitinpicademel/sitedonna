import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const configuredBase = process.env.IMOVIEW_BASE_URL || "https://api.imoview.com.br"
  const defaultBase = "https://api.imoview.com.br"
  const key = process.env.IMOVIEW_API_KEY || "8d5720c964c395ff128876787322e2c3"
  const url = new URL(req.url)
  const qs = url.search

  // Allow overriding path for debugging: /api/imoview/properties?path=/imoveis/listar&...
  const manualPath = url.searchParams.get("path")
  const candidates = manualPath
    ? [manualPath]
    : [
        "/properties",
        "/imoveis",
        "/imovel",
        "/imoveis/listar",
        "/imoveis/paginado",
        "/imoveis/v2",
        "/imoveis/consulta",
      ]

  let lastStatus = 500
  let lastBody: any = {}
  const attempts: Array<{ url: string; status: number; snippet?: string }> = []
  const bases = [configuredBase, ...(configuredBase !== defaultBase ? [defaultBase] : [])]
  for (const base of bases) {
    for (const path of candidates) {
      const finalUrl = `${base}${path}${qs ? qs.replace(/\?path=[^&]*&?/, "?").replace(/^\?$/, "") : ""}`
      try {
        const resp = await fetch(finalUrl, {
          headers: {
            chave: key,
            Accept: "application/json",
          },
          next: { revalidate: 300 },
        })
        lastStatus = resp.status
        const text = await resp.text().catch(() => "")
        attempts.push({ url: finalUrl, status: resp.status, snippet: text?.slice(0, 160) })
        try {
          lastBody = JSON.parse(text)
        } catch {
          lastBody = { raw: text }
        }
        const body: any = lastBody
        if (
          resp.ok && (
            Array.isArray(body) ||
            Array.isArray(body?.data) ||
            Array.isArray(body?.lista) ||
            Array.isArray(body?.items) ||
            Array.isArray(body?.result) ||
            Array.isArray(body?.imoveis) ||
            Array.isArray(body?.listaImoveis)
          )
        ) {
          if (url.searchParams.get('debug')) {
            return NextResponse.json({ attempts, chosen: finalUrl, response: body }, { status: 200 })
          }
          return NextResponse.json(body, { status: 200 })
        }
      } catch (e: any) {
        lastStatus = 500
        lastBody = { error: e?.message || String(e) }
        attempts.push({ url: finalUrl, status: 500, snippet: lastBody.error })
      }
    }
  }

  if (url.searchParams.get('debug')) {
    return NextResponse.json({ attempts, lastStatus, last: lastBody }, { status: lastStatus })
  }
  return NextResponse.json(lastBody, { status: lastStatus })
}

export async function POST(req: Request) {
  const configuredBase = process.env.IMOVIEW_BASE_URL || "https://api.imoview.com.br"
  const defaultBase = "https://api.imoview.com.br"
  const key = process.env.IMOVIEW_API_KEY || "8d5720c964c395ff128876787322e2c3"

  // body esperado pelo IMOVIEW, ex.: { finalidade: 2, numeroPagina: 1, numeroRegistros: 24 }
  const payload = await req.json().catch(() => ({}))

  // endpoints candidatos (variantes vistas em instalações Imoview)
  const candidates = [
    "/Imovel/RetornarImoveisDisponiveis",
    "/Imovel/Retornar",
    "/Imovel/Consultar",
    "/Imovel/RetornarImoveis",
    "/Imovel/RetornarImovel",
    // variações minúsculas ou legacy
    "/imovel/retornarimoveisdisponiveis",
    "/imovel/retornar",
    "/imovel/consultar",
    "/imovel/retornarimoveis",
  ]

  const attempts: Array<{ url: string; status: number; snippet?: string }> = []
  let lastStatus = 500
  let lastText = ""
  let lastJson: any = null

  const bases = [configuredBase, ...(configuredBase !== defaultBase ? [defaultBase] : [])]

  // Se veio um código específico, use o endpoint dedicado primeiro
  if (payload?.codigo) {
    for (const base of bases) {
      try {
        const resp = await fetch(`${base}/Imovel/RetornarImovelPorCodigo`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            chave: key,
          },
          body: JSON.stringify({ codigo: payload.codigo }),
          cache: "no-store",
        })
        const text = await resp.text().catch(() => "")
        try {
          const json = JSON.parse(text)
          attempts.push({ url: `${base}/Imovel/RetornarImovelPorCodigo`, status: resp.status, snippet: text.slice(0, 160) })
          if (resp.ok) return NextResponse.json(json, { status: 200 })
        } catch {
          attempts.push({ url: `${base}/Imovel/RetornarImovelPorCodigo`, status: resp.status, snippet: text.slice(0, 160) })
        }
      } catch (e: any) {
        attempts.push({ url: `${base}/Imovel/RetornarImovelPorCodigo`, status: 500, snippet: String(e?.message || e) })
      }
      // Tenta outras variantes conhecidas que aceitam código
      const byCodeCandidates = [
        "/Imovel/Detalhes",
        "/Imovel/RetornarImovel",
        "/Imovel/BuscarPorCodigo",
      ]
      for (const path of byCodeCandidates) {
        try {
          const resp = await fetch(`${base}${path}`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              chave: key,
            },
            body: JSON.stringify({ codigo: payload.codigo, numeroPagina: 1, numeroRegistros: 1 }),
            cache: "no-store",
          })
          const text = await resp.text().catch(() => "")
          attempts.push({ url: `${base}${path}`, status: resp.status, snippet: text.slice(0, 160) })
          try {
            const json = JSON.parse(text)
            if (resp.ok) return NextResponse.json(json, { status: 200 })
          } catch {}
        } catch (e: any) {
          attempts.push({ url: `${base}${path}`, status: 500, snippet: String(e?.message || e) })
        }
      }
    }
  }
  for (const base of bases) {
    for (const path of candidates) {
      try {
        const resp = await fetch(`${base}${path}`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            chave: key,
          },
          body: JSON.stringify(payload),
          cache: "no-store",
        })
        lastStatus = resp.status
        const text = await resp.text().catch(() => "")
        lastText = text
        try {
          lastJson = JSON.parse(text)
        } catch {
          lastJson = { raw: text }
        }
        attempts.push({ url: `${base}${path}`, status: resp.status, snippet: text?.slice(0, 160) })

        const body: any = lastJson
        if (
          resp.ok && (
            Array.isArray(body) ||
            Array.isArray(body?.data) ||
            Array.isArray(body?.lista) ||
            Array.isArray(body?.items) ||
            Array.isArray(body?.result) ||
            Array.isArray(body?.imoveis) ||
            Array.isArray(body?.listaImoveis)
          )
        ) {
          const debug = new URL(req.url).searchParams.get('debug')
          if (debug) {
            return NextResponse.json({ attempts, chosen: `${base}${path}`, response: body }, { status: 200 })
          }
          return NextResponse.json(body, { status: 200 })
        }
        // continua tentando próximos paths/bases
      } catch (e: any) {
        lastStatus = 500
        lastJson = { error: e?.message || String(e) }
        attempts.push({ url: `${base}${path}`, status: 500, snippet: lastJson.error })
      }
    }
  }

  const debug = new URL(req.url).searchParams.get('debug')
  if (debug) {
    return NextResponse.json({ attempts, lastStatus, last: lastJson ?? { raw: lastText } }, { status: lastStatus })
  }
  return NextResponse.json(lastJson ?? { raw: lastText }, { status: lastStatus })
}


