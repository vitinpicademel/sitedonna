'use client'

import { useState } from 'react';
import { buscarContratos, buscarBoletos } from '@/app/actions/imoview'; 
import { Header } from '@/components/layout/header';
import { FileText, Download, CheckCircle, ArrowLeft, User, Building, Key, ChevronRight } from 'lucide-react';

// Formatações
const formatMoney = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
const formatDate = (dateStr: string) => dateStr ? new Date(dateStr).toLocaleDateString('pt-BR') : '-';

export default function AreaCliente() {
  const [cpf, setCpf] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState<'inquilino' | 'proprietario'>('inquilino');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [dados, setDados] = useState<any>(null);
  const [abaAtiva, setAbaAtiva] = useState<'aberto' | 'historico' | 'contratos'>('aberto');

  async function handleBuscar() {
    setLoading(true);
    setErro('');
    const cpfLimpo = cpf.replace(/\D/g, '');
    
    if (!cpfLimpo) return setErro("Por favor, preencha o documento.");

    try {
      const resContratos = await buscarContratos(cpfLimpo);
      if (!resContratos.success) {
        setErro(resContratos.error || "Cliente não encontrado.");
        return;
      }
      const resBoletos = await buscarBoletos(cpfLimpo);
      const getList = (obj: any) => (obj?.lista && Array.isArray(obj.lista)) ? obj.lista : (Array.isArray(obj) ? obj : []);

      setDados({
        cliente: resContratos.cliente,
        contratos: getList(resContratos.data),
        ativos: getList(resBoletos?.data?.ativos),
        quitados: getList(resBoletos?.data?.quitados)
      });
    } catch (err) {
      setErro("Erro de conexão.");
    } finally {
      setLoading(false);
    }
  }

  // --- TELA DE LOGIN (Mantida conforme aprovado) ---
  if (!dados) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] text-gray-200 font-sans flex flex-col items-center justify-center p-4 relative overflow-x-hidden selection:bg-[#d4a574] selection:text-black">
        <Header appearance="dark" />
        
        {/* TEXTURA DE FUNDO GLOBAL (Padrão de Cubos Sutis) */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none" 
          style={{ 
            backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')",
            opacity: 0.08,
            maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
          }}
        ></div>
        
        {/* Conteúdo do Login */}
        <div className="relative z-10 w-full max-w-[420px] pt-20">
          <div 
            className="w-full bg-[#1a1a1a] p-10 rounded-[32px] border border-[#d4a574]/10 shadow-2xl relative overflow-hidden" 
            style={{ 
              background: 'linear-gradient(180deg, #1a1a1a 0%, #141414 100%)'
            }}
          >
            <div className="text-center mb-8">
                <p className="text-[#d4a574] text-[10px] uppercase tracking-[0.2em] font-bold mb-3 opacity-80">Donna Imobiliária</p>
                <h1 className="text-4xl text-[#d4a574] font-serif tracking-tight mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Área do Cliente
                </h1>
                <p className="text-gray-500 text-xs px-4">Acesse seus contratos e faturas com segurança.</p>
            </div>

            <div className="flex bg-[#121212] p-1 rounded-xl mb-8 border border-white/5">
                <button onClick={() => setTipoUsuario('inquilino')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${tipoUsuario === 'inquilino' ? 'bg-[#d4a574] text-[#2a1f15] shadow-md' : 'text-gray-500 hover:text-gray-300'}`}>
                    <Key size={14} /> Sou Inquilino
                </button>
                <button onClick={() => setTipoUsuario('proprietario')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${tipoUsuario === 'proprietario' ? 'bg-[#d4a574] text-[#2a1f15] shadow-md' : 'text-gray-500 hover:text-gray-300'}`}>
                    <Building size={14} /> Sou Proprietário
                </button>
            </div>

            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-[#d4a574] text-[10px] uppercase font-bold tracking-widest ml-2">CPF ou CNPJ do Titular</label>
                    <input type="text" placeholder="000.000.000-00" className="w-full bg-[#121212] text-white p-4 rounded-xl border border-white/5 focus:border-[#d4a574]/50 outline-none transition-all placeholder-gray-700 text-sm font-mono shadow-inner" value={cpf} onChange={(e) => setCpf(e.target.value)} />
                </div>
                {erro && <p className="text-red-400 text-xs text-center bg-red-900/10 p-2 rounded border border-red-900/20 animate-pulse">{erro}</p>}
                <button onClick={handleBuscar} disabled={loading} className="w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-wider shadow-lg" style={{ background: 'linear-gradient(135deg, #d4a574 0%, #c89963 100%)', color: '#2a1f15', fontFamily: 'Playfair Display, serif' }}>{loading ? 'Acessando...' : 'Acessar Faturas'}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- DASHBOARD DE LUXO (NOVO DESIGN APLICADO) ---
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gray-200 font-sans pb-20 pt-4 selection:bg-[#d4a574] selection:text-black relative overflow-x-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1a1a1a] via-[#0f0f0f] to-black">
      <Header appearance="dark" />
      
      {/* TEXTURA DE FUNDO GLOBAL (Padrão de Cubos Sutis) */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none" 
        style={{ 
          backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')",
          opacity: 0.08,
          maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
        }}
      ></div>

      {/* Header com Efeito Vidro e Borda Dourada */}
      <header className="relative bg-[#0f0f0f]/80 border-b border-[#d4a574]/20 backdrop-blur-xl transition-all duration-500 supports-[backdrop-filter]:bg-[#0f0f0f]/60 z-10">
        <div className="max-w-6xl mx-auto px-6 h-24 flex justify-between items-center">
          <div className="flex items-center gap-5">
            {/* Ícone de Usuário Premium */}
            <div className="w-12 h-12 rounded-full border-2 border-[#d4a574]/50 flex items-center justify-center text-[#d4a574] bg-gradient-to-br from-[#d4a574]/20 to-transparent shadow-[0_0_15px_rgba(212,165,116,0.2)] p-0.5">
                <div className="w-full h-full rounded-full border border-[#d4a574]/20 flex items-center justify-center bg-[#0f0f0f]">
                    <User size={20} />
                </div>
            </div>
            <div>
              <p className="text-[#d4a574] text-[10px] uppercase tracking-[0.2em] font-bold mb-1 opacity-90">Bem-vindo(a)</p>
              {/* Nome em Fonte Serifada Grande */}
              <h1 className="text-xl md:text-2xl text-white font-serif tracking-wide leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>{dados.cliente}</h1>
            </div>
          </div>
          <button onClick={() => setDados(null)} className="group flex items-center gap-2 text-[10px] text-gray-400 hover:text-[#d4a574] transition uppercase tracking-widest font-bold border border-white/10 px-5 py-2.5 rounded-full hover:border-[#d4a574]/30 hover:bg-[#d4a574]/5">
            <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform duration-300" /> SAIR
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-8 animate-in fade-in slide-in-from-bottom-8 duration-700 relative z-10">
        

        {/* Navegação de Abas Premium com Barra Brilhante */}
        <div className="flex gap-12 border-b border-white/10 mb-12 overflow-x-auto no-scrollbar px-2">
          {['aberto', 'historico', 'contratos'].map((aba) => (
             <button 
                key={aba}
                onClick={() => setAbaAtiva(aba as any)}
                className={`pb-4 whitespace-nowrap text-xs font-bold transition-all duration-500 relative uppercase tracking-[0.2em] ${
                    abaAtiva === aba ? 'text-[#d4a574]' : 'text-gray-500 hover:text-gray-300'
                }`}
             >
                {aba === 'aberto' && 'Faturas Abertas'}
                {aba === 'historico' && 'Histórico Pago'}
                {aba === 'contratos' && 'Meus Contratos'}
                {/* Barra Dourada Brilhante na Aba Ativa */}
                {abaAtiva === aba && (
                    <span className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#d4a574] via-[#f0d5b5] to-[#8a6b48] shadow-[0_0_20px_rgba(212,165,116,0.6)] rounded-t-full"></span>
                )}
             </button>
          ))}
        </div>

        <div className="space-y-6">
          

          {/* FATURAS ABERTAS */}
          {abaAtiva === 'aberto' && (
            dados.ativos.length > 0 ? (
              dados.ativos.map((boleto: any, i: number) => (
                // Card de Fatura Premium
                <div key={i} className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] p-8 rounded-3xl border border-white/5 hover:border-[#d4a574]/30 transition-all duration-500 group flex flex-col md:flex-row justify-between items-center gap-8 shadow-xl hover:shadow-[0_5px_30px_rgba(0,0,0,0.5)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-[#d4a574]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  <div className="flex items-center gap-8 w-full md:w-auto relative z-10">
                    <div className="w-20 h-20 bg-[#0f0f0f] rounded-2xl border border-[#d4a574]/20 flex flex-col items-center justify-center text-center group-hover:border-[#d4a574]/50 transition-colors shadow-inner">
                        <span className="text-gray-500 text-[9px] uppercase font-bold tracking-wider mb-1">VENC</span>
                        <span className="text-3xl text-[#d4a574] font-serif leading-none">
                            {new Date(boleto.datavencimento).getDate()}
                        </span>
                        <span className="text-gray-500 text-[9px] uppercase font-bold tracking-wider mt-1">
                            {new Date(boleto.datavencimento).toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '')}
                        </span>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                            </span>
                            <p className="text-[#d4a574] text-[10px] uppercase tracking-widest font-bold">Pendente</p>
                        </div>
                        <p className="text-white text-xl font-medium tracking-tight mb-1">{boleto.descricao || 'Aluguel Mensal'}</p>
                        <p className="text-xs text-gray-500 font-mono">Ref: {formatDate(boleto.datavencimento)}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full md:w-auto gap-10 border-t md:border-t-0 border-white/5 pt-6 md:pt-0 relative z-10">
                    <div className="text-left md:text-right">
                       <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Valor Total</p>
                       <p className="text-3xl text-white font-serif tracking-tight text-shadow-sm" style={{ fontFamily: 'Playfair Display, serif' }}>{formatMoney(boleto.valor)}</p>
                    </div>
                    {boleto.linksegundavia && (
                        <a href={boleto.linksegundavia} target="_blank" className="group/btn bg-gradient-to-r from-[#d4a574] to-[#b88b5c] hover:brightness-110 text-[#0a0a0a] px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center gap-3 text-xs uppercase tracking-widest shadow-[0_5px_20px_rgba(212,165,116,0.3)] hover:shadow-[0_5px_30px_rgba(212,165,116,0.5)] transform hover:-translate-y-1">
                            <Download size={16} className="group-hover/btn:animate-bounce" /> Baixar PDF
                        </a>
                    )}
                  </div>
                </div>
              ))
            ) : (
                // ESTADO "TUDO EM DIA" LUXUOSO (Conforme a imagem gerada)
                <div className="flex flex-col items-center justify-center py-32 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a1a1a] to-[#0a0a0a] rounded-3xl border border-[#d4a574]/20 relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay pointer-events-none"></div>
                    

                    {/* Ícone de Check Dourado Brilhante */}
                    <div className="w-28 h-28 bg-gradient-to-br from-[#d4a574]/30 to-transparent rounded-full flex items-center justify-center mb-8 border-4 border-[#d4a574]/50 shadow-[0_0_60px_rgba(212,165,116,0.3)] relative z-10 p-1">
                        <div className="w-full h-full rounded-full border border-[#d4a574] flex items-center justify-center bg-gradient-to-br from-[#d4a574] to-[#b88b5c] shadow-inner">
                            <CheckCircle size={56} className="text-[#0a0a0a] drop-shadow-sm" strokeWidth={2.5} />
                        </div>
                    </div>
                    

                    <h3 className="text-white font-serif text-4xl mb-3 relative z-10 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>Tudo em dia!</h3>
                    <p className="text-gray-400 text-sm font-light tracking-wide relative z-10 max-w-md text-center">Você não possui faturas pendentes neste momento.</p>
                </div>
            )
          )}



          {/* ABA: CONTRATOS */}
          {abaAtiva === 'contratos' && (
             dados.contratos.map((c: any, i: number) => (
              <div key={i} className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] p-10 rounded-3xl border border-white/5 flex flex-col md:flex-row gap-10 items-start relative overflow-hidden group transition-all duration-500 hover:border-[#d4a574]/20 shadow-xl">
                <div className="absolute -right-8 -top-8 p-0 opacity-[0.02] text-[#d4a574] transform rotate-12 group-hover:scale-110 transition-transform duration-700 pointer-events-none"><FileText size={250} /></div>
                

                <div className="z-10 flex-1">
                    <div className="flex items-center gap-4 mb-6">
                        <span className="px-4 py-1.5 bg-[#d4a574]/10 text-[#d4a574] rounded-full text-[10px] font-bold uppercase tracking-wider border border-[#d4a574]/20 shadow-[0_0_15px_rgba(212,165,116,0.1)]">
                            Contrato #{c.codigo}
                        </span>
                        <span className="px-4 py-1.5 bg-emerald-900/20 text-emerald-400 rounded-full text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_5px_rgba(52,211,153,0.5)]"></span> {c.situacao || 'Ativo'}
                        </span>
                    </div>
                    <h3 className="text-white font-serif text-3xl mb-4 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>Imóvel Locado</h3>
                    <div className="flex items-start gap-4">
                        <Building size={20} className="text-[#d4a574] mt-1 shrink-0" />
                        <p className="text-gray-400 leading-relaxed font-light text-lg">{c.endereco || 'Endereço não informado'}</p>
                    </div>
                </div>
              </div>
             ))
          )}



           {/* ABA: HISTÓRICO */}
           {abaAtiva === 'historico' && (
            dados.quitados.length > 0 ? dados.quitados.map((boleto: any, i: number) => (
                <div key={i} className="bg-[#141414] px-8 py-6 rounded-2xl border border-white/5 flex flex-col md:flex-row justify-between items-center hover:bg-[#1a1a1a] transition duration-300 group">
                   <div className="flex items-center gap-6 w-full md:w-auto">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/5 text-emerald-500 flex items-center justify-center border border-emerald-500/10 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 transition-all duration-300">
                        <CheckCircle size={20} />
                      </div>
                      <div>
                        <p className="text-white font-serif text-lg mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>{formatDate(boleto.datavencimento)}</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest group-hover:text-emerald-400 transition-colors">Pago Confirmado</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-6 mt-4 md:mt-0 w-full md:w-auto justify-between md:justify-end">
                        <p className="text-[#d4a574] font-serif text-xl" style={{ fontFamily: 'Playfair Display, serif' }}>{formatMoney(boleto.valorpago || boleto.valor)}</p>
                        <ChevronRight size={18} className="text-gray-700 group-hover:text-[#d4a574] group-hover:translate-x-1 transition-all" />
                   </div>
                </div>
              )) : <div className="text-center py-24 text-gray-500 font-light italic bg-[#141414]/50 rounded-2xl border border-white/5">Nenhum histórico disponível no período recente.</div>
          )}

        </div>

      </main>

    </div>
  );
}
