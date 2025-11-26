export type ImoviewPropertyDTO = Record<string, any>

function requiredEnv(name: string): string {
  const v = process.env[name]
  if (!v) throw new Error(`Missing env: ${name}`)
  return v
}

const BASE_URL = process.env.IMOVIEW_BASE_URL || "https://api.imoview.com.br"
const API_KEY = process.env.IMOVIEW_API_KEY || "8d5720c964c395ff128876787322e2c3"

export async function imoviewFetch<T = any>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      "chave": API_KEY,
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    next: { revalidate: 300 },
  })
  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(`IMOVIEW ${res.status}: ${text}`)
  }
  return res.json() as Promise<T>
}

export async function listImoviewProperties(params?: Record<string, string | number | boolean | undefined>) {
  const payload = {
    numeroPagina: 1,
    numeroRegistros: 20,
    ...params
  }
  return imoviewFetch<any>("/Imovel/RetornarImoveisDisponiveis", {
    method: "POST",
    body: JSON.stringify(payload)
  })
}

export async function getImoviewProperty(id: string | number) {
  // Primeiro tenta pelo endpoint de "por código" se existir na instalação
  try {
    const data = await imoviewFetch<any>("/Imovel/RetornarImovelPorCodigo", {
      method: "POST",
      body: JSON.stringify({ codigo: id })
    })
    if (data) return data
  } catch {}
  // Fallback para listagem com filtro por código (algumas instalações aceitam)
  return imoviewFetch<any>("/Imovel/RetornarImoveisDisponiveis", {
    method: "POST",
    body: JSON.stringify({
      numeroPagina: 1,
      numeroRegistros: 1,
      codigo: id
    })
  })
}















