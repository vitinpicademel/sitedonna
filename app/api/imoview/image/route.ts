import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const target = url.searchParams.get("url")
    if (!target) {
      return NextResponse.json({ error: "Missing url" }, { status: 400 })
    }

        const base = process.env.IMOVIEW_BASE_URL || "https://api.imoview.com.br"
        const key = process.env.IMOVIEW_API_KEY || "8d5720c964c395ff128876787322e2c3"

        // Resolve: absoluta (http/https) ou relativa ao BASE
        const decoded = decodeURIComponent(target)
        const resolved = /^https?:\/\//i.test(decoded)
          ? decoded
          : `${base}${decoded.startsWith("/") ? "" : "/"}${decoded}`

        const headers: Record<string, string> = { Accept: "*/*" }
        if (key) {
          headers["chave"] = key
        }

    const resp = await fetch(resolved, { headers, cache: "no-store" })
    if (!resp.ok) {
      return NextResponse.json({ error: "Upstream error" }, { status: resp.status })
    }

    const contentType = resp.headers.get("content-type") || "image/jpeg"
    const arrayBuffer = await resp.arrayBuffer()
    return new NextResponse(Buffer.from(arrayBuffer), {
      status: 200,
      headers: {
        "content-type": contentType,
        "cache-control": "public, max-age=300, s-maxage=300, stale-while-revalidate=300",
      },
    })
  } catch (e: any) {
    return NextResponse.json({ error: String(e?.message || e) }, { status: 500 })
  }
}

