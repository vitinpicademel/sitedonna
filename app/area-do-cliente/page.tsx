'use client'

import { useState } from 'react';
import { buscarContratos, buscarBoletos } from '@/app/actions/imoview'; 
// Ícones para deixar bonito (se der erro de ícone, remova os imports e os componentes Icon)
import { FileText, CheckCircle, Calendar, Download } from 'lucide-react';

const formatMoney = (val: number) => 
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

const formatDate = (dateStr: string) => {
  if(!dateStr) return '-';
  return new Date(dateStr).toLocaleDateString('pt-BR');
}

export default function AreaCliente() {
  const [cpf, setCpf] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [dados, setDados] = useState<any>(null);
  const [abaAtiva, setAbaAtiva] = useState<'aberto' | 'historico' | 'contratos'>('aberto');

  async function handleBuscar() {
    setLoading(true);
    setErro('');
    const cpfLimpo = cpf.replace(/\D/g, '');
    if (!cpfLimpo) { setLoading(false); return; }

    try {
      const resContratos = await buscarContratos(cpfLimpo);
      if (!resContratos.success) {
        setErro(resContratos.error || "Cliente não encontrado.");
        setLoading(false);
        return;
      }
      const resBoletos = await buscarBoletos(cpfLimpo);
      
      // Ajuste para garantir que listas vazias não quebrem a tela
      const listaContratos = resContratos.data?.lista || (Array.isArray(resContratos.data) ? resContratos.data : []);
      const listaAtivos = resBoletos?.data?.ativos?.lista || (Array.isArray(resBoletos?.data?.ativos) ? resBoletos.data.ativos : []);
      const listaQuitados = resBoletos?.data?.quitados?.lista || (Array.isArray(resBoletos?.data?.quitados) ? resBoletos.data.quitados : []);

      setDados({
        cliente: resContratos.cliente,
        contratos: listaContratos,
        ativos: listaAtivos,
        quitados: listaQuitados
      });
    } catch (err) {
      setErro("Erro de conexão.");
    } finally {
      setLoading(false);
    }
  }

  // TELA DE LOGIN
  if (!dados) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#1e1e1e] p-8 rounded-2xl border border-[#d4a574]/30 shadow-[0_0_30px_rgba(212,165,116,0.1)]">
          <div className="text-center mb-8">
            <h2 className="text-[#d4a574] text-xs tracking-[0.2em] uppercase font-bold mb-2">Donna Imobiliária</h2>
            <h1 className="text-3xl text-white font-serif">Área do Cliente</h1>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="text-gray-400 text-xs uppercase tracking-wide ml-1">CPF do Titular</label>
              <input 
                type="text" 
                placeholder="000.000.000-00"
                className="w-full mt-2 bg-[#121212] text-white p-4 rounded-lg border border-gray-800 focus:border-[#d4a574] outline-none transition-all placeholder-gray-700"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              />
            </div>
            {erro && <div className="p-3 bg-red-900/20 border border-red-900/50 rounded text-red-400 text-sm text-center">{erro}</div>}
            <button 
              onClick={handleBuscar}
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#d4a574] to-[#b88b5c] text-[#121212] font-bold p-4 rounded-lg hover:brightness-110 transition disabled:opacity-50 tracking-wide shadow-lg"
            >
              {loading ? 'ACESSANDO...' : 'ENTRAR'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // DASHBOARD
  return (
    <div className="min-h-screen bg-[#121212] text-gray-200">
      <header className="bg-[#1e1e1e] border-b border-[#d4a574]/20 p-6 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div>
            <p className="text-[#d4a574] text-xs uppercase tracking-widest">Bem-vindo(a)</p>
            <h1 className="text-xl md:text-2xl font-serif text-white mt-1">{dados.cliente}</h1>
          </div>
          <button onClick={() => setDados(null)} className="text-xs text-gray-500 hover:text-white transition">SAIR</button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6">
        <div className="flex gap-4 border-b border-gray-800 mb-8 overflow-x-auto pb-2">
          <button onClick={() => setAbaAtiva('aberto')} className={`pb-2 px-4 whitespace-nowrap transition ${abaAtiva === 'aberto' ? 'text-[#d4a574] border-b-2 border-[#d4a574]' : 'text-gray-500 hover:text-white'}`}>Faturas em Aberto ({dados.ativos.length})</button>
          <button onClick={() => setAbaAtiva('historico')} className={`pb-2 px-4 whitespace-nowrap transition ${abaAtiva === 'historico' ? 'text-[#d4a574] border-b-2 border-[#d4a574]' : 'text-gray-500 hover:text-white'}`}>Histórico</button>
          <button onClick={() => setAbaAtiva('contratos')} className={`pb-2 px-4 whitespace-nowrap transition ${abaAtiva === 'contratos' ? 'text-[#d4a574] border-b-2 border-[#d4a574]' : 'text-gray-500 hover:text-white'}`}>Meus Contratos</button>
        </div>

        <div className="space-y-4 animate-fade-in">
          {abaAtiva === 'aberto' && (
            dados.ativos.length > 0 ? (
              dados.ativos.map((boleto: any, i: number) => (
                <div key={i} className="bg-[#1e1e1e] p-6 rounded-xl border-l-4 border-l-[#d4a574] flex flex-col md:flex-row justify-between items-center gap-4">
                  <div>
                    <p className="text-gray-400 text-xs uppercase mb-1">Vencimento</p>
                    <p className="text-white text-lg font-bold flex items-center gap-2"><Calendar size={16} className="text-[#d4a574]"/> {formatDate(boleto.datavencimento)}</p>
                    <p className="text-gray-500 text-sm mt-1">{boleto.descricao || 'Aluguel'}</p>
                  </div>
                  <div className="text-right">
                     <p className="text-gray-400 text-xs uppercase mb-1">Valor</p>
                     <p className="text-2xl text-white font-serif">{formatMoney(boleto.valor)}</p>
                  </div>
                  {boleto.linksegundavia && (
                    <a href={boleto.linksegundavia} target="_blank" className="bg-[#d4a574] text-black px-6 py-2 rounded font-bold hover:bg-white transition flex items-center gap-2">
                        <Download size={18} /> Baixar PDF
                    </a>
                  )}
                </div>
              ))
            ) : <div className="text-center py-12 bg-[#1e1e1e] rounded-xl"><CheckCircle className="mx-auto text-green-500 mb-4"/><p className="text-gray-400">Nenhuma fatura em aberto.</p></div>
          )}

          {abaAtiva === 'contratos' && (
             dados.contratos.map((c: any, i: number) => (
              <div key={i} className="bg-[#1e1e1e] p-6 rounded-xl border border-gray-800">
                <div className="flex items-center gap-3 mb-4"><FileText className="text-[#d4a574]" /><h3 className="text-white font-bold text-lg">Contrato #{c.codigo}</h3></div>
                <p className="text-gray-500 text-sm">{c.endereco || 'Endereço não informado'}</p>
                <p className="text-gray-500 text-sm mt-2">Status: <span className="text-white">{c.situacao || 'Ativo'}</span></p>
              </div>
             ))
          )}

           {abaAtiva === 'historico' && (
            dados.quitados.length > 0 ? dados.quitados.map((boleto: any, i: number) => (
                <div key={i} className="bg-[#1e1e1e] p-4 rounded-lg border border-gray-800 flex justify-between items-center">
                   <div><p className="text-white font-bold">{formatDate(boleto.datavencimento)}</p><p className="text-xs text-green-400">Pago</p></div>
                   <p className="text-gray-300 font-mono">{formatMoney(boleto.valorpago || boleto.valor)}</p>
                </div>
              )) : <p className="text-gray-500 text-center py-8">Nenhum histórico disponível.</p>
          )}
        </div>
      </main>
    </div>
  );
}