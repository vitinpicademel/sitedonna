export const dynamic = "force-dynamic"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const target = searchParams.get("url")
    if (!target) {
      return new Response("Missing url", { status: 400 })
    }
    if (!/^https?:\/\//i.test(target)) {
      return new Response("Invalid url", { status: 400 })
    }
    const upstream = await fetch(target, { cache: "no-store" })
    if (!upstream.ok) {
      const buf = await upstream.arrayBuffer().catch(() => undefined)
      return new Response(buf, {
        status: upstream.status,
        headers: { "Content-Type": upstream.headers.get("Content-Type") || "application/octet-stream" },
      })
    }
    return new Response(upstream.body, {
      status: 200,
      headers: {
        "Content-Type": upstream.headers.get("Content-Type") || "application/octet-stream",
        "Cache-Control": "public, max-age=3600",
      },
    })
  } catch (e: any) {
    return new Response(`Proxy error: ${e?.message || e}`, { status: 500 })
  }
}

