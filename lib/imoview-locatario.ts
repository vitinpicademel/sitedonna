/**
 * Serviço de API para Área do Locatário (Imoview)
 * Endpoints para consulta de contratos, boletos e documentos
 * 
 * Configurações confirmadas via Swagger oficial:
 * - Header: 'chave' (obrigatório)
 * - Base URL: https://api.imoview.com.br/ (sem /api)
 * - Autenticação: Apenas via header 'chave'
 */

// Tipos para os dados retornados
export interface Contrato {
  id?: number
  endereco?: string
  numero?: string
  complemento?: string
  bairro?: string
  cidade?: string
  estado?: string
  cep?: string
  locatarioNome?: string
  locatarioCpf?: string
  valorAluguel?: number
  dataInicio?: string
  dataFim?: string
  [key: string]: any
}

export interface Boleto {
  id?: number
  numero?: string
  valor?: number
  dataVencimento?: string
  dataVencimentoFormatada?: string
  status?: string
  codigoBarras?: string
  linhaDigitavel?: string
  nossoNumero?: string
  urlBoleto?: string
  [key: string]: any
}

export interface BoletoAtivo extends Boleto {
  diasParaVencimento?: number
}

export interface BoletoQuitado extends Boleto {
  dataPagamento?: string
  valorPago?: number
}

// ⚠️ CONFIGURAÇÃO MANUAL E FIXA (Para evitar erros de .env)
// Zero Configuração de URL: Não leia process.env.IMOVIEW_BASE_URL. URL fixa no código.
const BASE_URL_SEGURA = "https://api.imoview.com.br"

// A chave continua vindo do .env (Certifique-se que ela está lá)
const API_KEY = process.env.IMOVIEW_API_KEY

/**
 * Função helper para limpar CPF e garantir apenas números
 */
function limparCpf(cpf: string): string {
  const cpfLimpo = cpf.replace(/\D/g, '')
  
  if (cpfLimpo.length !== 11) {
    throw new Error(`CPF inválido. Esperado 11 dígitos, recebido ${cpfLimpo.length}.`)
  }
  
  return cpfLimpo
}

/**
 * Função helper para fazer requisições à API
 * REESCRITO COMPLETAMENTE seguindo padrão rigoroso de HTTPS
 */
async function fazerRequisicao(path: string, cpf: string, metodo: string = 'GET', queryParams?: Record<string, string | number>): Promise<any> {
  // 1. Limpeza do CPF
  const cpfLimpo = limparCpf(cpf)

  if (!API_KEY) {
    console.error("🚨 ERRO CRÍTICO: Chave da API não encontrada no .env")
    throw new Error("Chave da API ausente")
  }

  // 2. Montagem da URL (Sem concatenação de strings para evitar erros de barra)
  const endpoint = path.startsWith('/') ? path : `/${path}`
  
  // Garantir que não há barras duplas
  const baseUrl = BASE_URL_SEGURA.endsWith('/') 
    ? BASE_URL_SEGURA.slice(0, -1) 
    : BASE_URL_SEGURA
  
  let urlFinal = `${baseUrl}${endpoint}?cpf=${cpfLimpo}`
  
  // Adiciona query params extras se houver
  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      urlFinal += `&${key}=${value}`
    })
  }
  
  // GARANTIR HTTPS (última validação antes do fetch)
  if (urlFinal.startsWith('http://')) {
    urlFinal = urlFinal.replace('http://', 'https://')
    console.warn("⚠️  AVISO: URL foi corrigida de HTTP para HTTPS automaticamente")
  }

  // 🔥 Log de "Prova Real": URL exata um milissegundo antes de chamar o fetch
  console.log(`🔥 [DISPARANDO] URL: ${urlFinal}`)
  console.log(`🔑 [HEADER] Usando chave: ${API_KEY.substring(0, 5)}...`)
  console.log(`📋 [MÉTODO] ${metodo}`)
  console.log(`👤 [CPF] ${cpfLimpo.replace(/\d(?=\d{4})/g, "*")}`)

  try {
    const res = await fetch(urlFinal, {
      method: metodo,
      headers: {
        // A chave confirmada no Swagger
        'chave': API_KEY,
        
        // Simula um navegador real (Importante para APIs .NET antigas)
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        
        // Aceita qualquer resposta
        'Accept': '*/*'
      },
      cache: 'no-store', // Desabilita cache do Next.js para evitar leitura de dados velhos
    })

    // Tratamento de Erro Específico
    if (!res.ok) {
      const errorText = await res.text()
      console.error(`❌ [ERRO API] Status: ${res.status}`)
      console.error(`❌ [MSG DO SERVIDOR]: ${errorText}`)
      console.error(`❌ [URL TENTADA]: ${urlFinal}`)
      console.error(`❌ [PROTOCOLO]: ${urlFinal.startsWith('https://') ? '✅ HTTPS' : '❌ HTTP'}`)
      
      // Se for 404 da API, pode ser que o CPF não tenha contrato ou erro de protocolo
      if (res.status === 404 && errorText.includes("No HTTP resource")) {
        throw new Error("Erro de Protocolo Imoview: A API rejeitou HTTPS. Contate o suporte.")
      }
      
      throw new Error(`Erro Imoview: ${res.status} - ${errorText}`)
    }

    const data = await res.json()
    console.log("✅ [SUCESSO] Dados recebidos:")
    console.log("   Tipo: " + (Array.isArray(data) ? "array" : typeof data))
    if (Array.isArray(data)) {
      console.log("   Tamanho: " + data.length + " itens")
    }
    
    return data

  } catch (error: any) {
    console.error("💀 [ERRO FATAL] Falha na conexão:")
    console.error("   Message: " + (error.message || "N/A"))
    console.error("   Name: " + (error.name || "N/A"))
    console.error("   URL tentada: " + urlFinal)
    if (error.stack) {
      console.error("   Stack (primeiros 500 chars):")
      console.error(error.stack.substring(0, 500))
    }
    throw error
  }
}

/**
 * Buscar contratos do locatário
 * Endpoint: GET /Locatario/RetornarContratos
 */
export async function buscarContratos(cpf: string): Promise<Contrato[]> {
  console.log("[IMOVIEW-LOCATARIO] 🔍 Buscando contratos para CPF:", cpf.replace(/\d(?=\d{4})/g, "*"))
  
  const data = await fazerRequisicao('/Locatario/RetornarContratos', cpf, 'GET')
  
  // Normaliza a resposta
  if (Array.isArray(data)) {
    return data
  }
  
  if (data?.lista && Array.isArray(data.lista)) {
    return data.lista
  }
  
  if (data?.data && Array.isArray(data.data)) {
    return data.data
  }
  
  if (data?.contratos && Array.isArray(data.contratos)) {
    return data.contratos
  }
  
  if (data && typeof data === "object" && !Array.isArray(data)) {
    return [data]
  }
  
  return []
}

/**
 * Buscar boletos ativos (não pagos)
 * Endpoint: GET /Locatario/RetornarBoletosAtivos
 */
export async function buscarBoletosAtivos(cpf: string): Promise<BoletoAtivo[]> {
  console.log("[IMOVIEW-LOCATARIO] 🔍 Buscando boletos ativos para CPF:", cpf.replace(/\d(?=\d{4})/g, "*"))
  
  const data = await fazerRequisicao('/Locatario/RetornarBoletosAtivos', cpf, 'GET')
  
  // Normaliza a resposta
  let boletos: any[] = []
  
  if (Array.isArray(data)) {
    boletos = data
  } else if (data?.lista && Array.isArray(data.lista)) {
    boletos = data.lista
  } else if (data?.data && Array.isArray(data.data)) {
    boletos = data.data
  } else if (data?.boletos && Array.isArray(data.boletos)) {
    boletos = data.boletos
  } else if (data && typeof data === "object" && !Array.isArray(data)) {
    boletos = [data]
  }
  
  // Processa os boletos para adicionar informações úteis
  return boletos.map((boleto) => {
    const vencimento = boleto.dataVencimento || boleto.dataVencimentoFormatada
    let diasParaVencimento: number | undefined
    
    if (vencimento) {
      const dataVenc = new Date(vencimento)
      const hoje = new Date()
      const diffTime = dataVenc.getTime() - hoje.getTime()
      diasParaVencimento = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    }
    
    return {
      ...boleto,
      diasParaVencimento,
      dataVencimentoFormatada: vencimento
        ? new Date(vencimento).toLocaleDateString("pt-BR")
        : undefined,
    }
  })
}

/**
 * Buscar histórico de boletos quitados
 * Endpoint: GET /Locatario/RetornarBoletosQuitados
 */
export async function buscarBoletosQuitados(cpf: string, limite: number = 12): Promise<BoletoQuitado[]> {
  console.log("[IMOVIEW-LOCATARIO] 🔍 Buscando histórico de pagamentos para CPF:", cpf.replace(/\d(?=\d{4})/g, "*"))
  
  const data = await fazerRequisicao('/Locatario/RetornarBoletosQuitados', cpf, 'GET', { limite })
  
  // Normaliza a resposta
  let boletos: any[] = []
  
  if (Array.isArray(data)) {
    boletos = data
  } else if (data?.lista && Array.isArray(data.lista)) {
    boletos = data.lista
  } else if (data?.data && Array.isArray(data.data)) {
    boletos = data.data
  } else if (data?.historico && Array.isArray(data.historico)) {
    boletos = data.historico
  } else if (data?.boletos && Array.isArray(data.boletos)) {
    boletos = data.boletos
  }
  
  // Formata as datas
  return boletos.map((boleto) => ({
    ...boleto,
    dataVencimentoFormatada: boleto.dataVencimento
      ? new Date(boleto.dataVencimento).toLocaleDateString("pt-BR")
      : undefined,
    dataPagamentoFormatada: boleto.dataPagamento
      ? new Date(boleto.dataPagamento).toLocaleDateString("pt-BR")
      : undefined,
  }))
}

/**
 * Gerar URL para download do boleto em PDF
 * Endpoint: GET /Locatario/App_BaixarBoleto
 */
export async function obterUrlBoleto(cpf: string, boletoId: number | string): Promise<string> {
  const cpfLimpo = limparCpf(cpf)

  if (!API_KEY) {
    console.error("🚨 ERRO CRÍTICO: Chave da API não encontrada no .env")
    throw new Error("Chave da API ausente")
  }

  // Montagem da URL (FORÇA HTTPS)
  const baseUrl = BASE_URL_SEGURA.endsWith('/') 
    ? BASE_URL_SEGURA.slice(0, -1) 
    : BASE_URL_SEGURA
  const endpoint = '/Locatario/App_BaixarBoleto'
  let urlFinal = `${baseUrl}${endpoint}?cpf=${cpfLimpo}&boletoId=${boletoId}`
  
  // GARANTIR HTTPS
  if (urlFinal.startsWith('http://')) {
    urlFinal = urlFinal.replace('http://', 'https://')
  }

  console.log(`🔥 [DISPARANDO] URL do Boleto: ${urlFinal}`)
  console.log(`🔑 [HEADER] Usando chave: ${API_KEY.substring(0, 5)}...`)

  try {
    const res = await fetch(urlFinal, {
      method: 'GET',
      headers: {
        // A chave confirmada no Swagger
        'chave': API_KEY,
        
        // Simula um navegador real (Importante para APIs .NET antigas)
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        
        // Aceita qualquer resposta
        'Accept': '*/*'
      },
      cache: 'no-store',
    })

    if (!res.ok) {
      const errorText = await res.text()
      console.error(`❌ [ERRO API] Status: ${res.status}`)
      console.error(`❌ [MSG DO SERVIDOR]: ${errorText}`)
      throw new Error(`Erro ao obter URL do boleto: ${res.status} - ${errorText}`)
    }

    const data = await res.json()

    // Se já vier como URL string
    if (typeof data === "string" && data.startsWith("http")) {
      return data.startsWith('http://') ? data.replace('http://', 'https://') : data
    }

    // Se vier como objeto com URL
    if (data?.url) {
      const url = String(data.url)
      return url.startsWith('http://') ? url.replace('http://', 'https://') : url
    }

    if (data?.linkBoleto) {
      const url = String(data.linkBoleto)
      return url.startsWith('http://') ? url.replace('http://', 'https://') : url
    }

    // Monta URL completa se vier apenas o caminho (força HTTPS)
    if (data?.path) {
      const path = String(data.path).startsWith('/') ? data.path : `/${data.path}`
      return `https://api.imoview.com.br${path}`
    }

    // Se não tiver URL, retorna a URL original da requisição
    return urlFinal
  } catch (error: any) {
    console.error("💀 [ERRO FATAL] Falha ao obter URL do boleto:")
    console.error("   Message: " + (error.message || "N/A"))
    console.error("   URL tentada: " + urlFinal)
    throw error
  }
}

/**
 * Copiar código de barras do boleto
 */
export function obterCodigoBarras(boleto: Boleto): string {
  if (boleto.linhaDigitavel) {
    return boleto.linhaDigitavel
  }
  
  if (boleto.codigoBarras) {
    return boleto.codigoBarras
  }
  
  return ""
}
