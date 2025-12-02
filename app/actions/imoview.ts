'use server'

const BASE_URL = "https://api.imoview.com.br";
const API_KEY = "8d5720c964c395ff128876787322e2c3"; 

// --- FUNÇÃO AUXILIAR DE CONEXÃO ---
async function fetchImoview(endpoint: string) {
  const url = `${BASE_URL}${endpoint}`;
  console.log(`🚀 [API] Request: ${url}`);

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'chave': API_KEY,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      },
      cache: 'no-store'
    });

    if (!res.ok) {
      const txt = await res.text();
      console.error(`❌ Erro API [${res.status}]: ${txt}`);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("💀 Erro de conexão:", error);
    return null;
  }
}

// --- FUNÇÃO 1: BUSCAR CONTRATOS ---
export async function buscarContratos(cpfInput: string) {
  try {
    const cpfLimpo = cpfInput.replace(/\D/g, ''); 
    
    // 1. Identificar Cliente (CPF -> ID)
    const usuario = await fetchImoview(`/Usuario/RetornarTipo1?cpfOuCnpj=${cpfLimpo}`);

    if (!usuario || !usuario.codigo) {
      return { success: false, error: "Cliente não localizado. Verifique o CPF." };
    }

    const id = usuario.codigo; 
    const nome = usuario.nome;
    
    // 2. Buscar Contratos (COM PAGINAÇÃO)
    const contratos = await fetchImoview(`/Locatario/RetornarContratos?codigoCliente=${id}&numeroPagina=1&numeroRegistros=20`);

    return { 
      success: true, 
      data: contratos,
      cliente: nome 
    };

  } catch (error: any) {
    return { success: false, error: error.message || "Erro desconhecido" };
  }
}

// --- FUNÇÃO 2: BUSCAR BOLETOS ---
export async function buscarBoletos(cpfInput: string) {
  try {
    const cpfLimpo = cpfInput.replace(/\D/g, '');
    
    // 1. Identificar ID
    const usuario = await fetchImoview(`/Usuario/RetornarTipo1?cpfOuCnpj=${cpfLimpo}`);
    if (!usuario?.codigo) return { success: false, error: "Cliente não localizado" };
    
    const id = usuario.codigo;

    // 2. Buscar Boletos (COM PAGINAÇÃO)
    const [ativos, quitados] = await Promise.all([
      fetchImoview(`/Locatario/RetornarBoletosAtivos?codigoCliente=${id}&numeroPagina=1&numeroRegistros=20`).catch(() => []),
      fetchImoview(`/Locatario/RetornarBoletosQuitados?codigoCliente=${id}&numeroPagina=1&numeroRegistros=20`).catch(() => [])
    ]);

    return { 
      success: true, 
      data: { 
        ativos: ativos || [], 
        quitados: quitados || [] 
      } 
    };

  } catch (error: any) {
    return { success: false, error: error.message };
  }
}