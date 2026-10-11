import React from 'react';
import Link from 'next/link';
import { SERVICOS_LIST } from '@/lib/data';
import { 
  Briefcase, 
  Search, 
  ExternalLink, 
  CheckCircle, 
  Calendar
} from 'lucide-react';

export const metadata = {
  title: 'Carta de Serviços ao Cidadão • Prefeitura de Goiânia',
  description: 'Guia completo de serviços municipais, emissão de guias, agendamentos, licenças e requerimentos.',
};

export default async function ServicosPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string; search?: string }>;
}) {
  const params = await searchParams;
  const categoria = params.categoria || 'todas';
  const search = (params.search || '').toLowerCase().trim();

  let filtered = SERVICOS_LIST;
  if (categoria !== 'todas') {
    filtered = filtered.filter(s => s.categoria === categoria);
  }
  if (search) {
    filtered = filtered.filter(s => 
      s.titulo.toLowerCase().includes(search) || 
      s.descricao.toLowerCase().includes(search) ||
      s.orgao.toLowerCase().includes(search)
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-[#f36e22] transition-colors">Início</Link>
        <span>/</span>
        <span className="text-[#002e47] font-semibold">Serviços Municipais</span>
      </nav>

      {/* Header */}
      <div className="border-b-2 border-slate-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#f36e22] text-xs font-bold uppercase tracking-wider mb-1">
            <Briefcase className="w-4 h-4" />
            <span>Guia e Carta de Serviços</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#002e47] tracking-tight">
            Serviços da Prefeitura
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Acesse serviços online, emita certidões e guias de pagamento, ou agende atendimento presencial nas unidades do Atende Fácil.
          </p>
        </div>

        <a
          href="http://agendamento.goiania.go.gov.br/agendamento/#/home"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#f36e22] hover:bg-[#f27730] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm"
        >
          <Calendar className="w-4 h-4" />
          <span>Agendamento Atende Fácil</span>
        </a>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <form method="GET" action="/servicos" className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            name="search"
            defaultValue={params.search || ''}
            placeholder="Qual serviço você procura? Ex: IPTU, Alvará, Agendamento..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-[#2A454A] focus:outline-none focus:ring-2 focus:ring-[#f36e22]"
          />
          <button
            type="submit"
            className="bg-[#002e47] hover:bg-[#003856] text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>Pesquisar</span>
          </button>
        </form>

        <div className="flex items-center gap-2 overflow-x-auto pt-2 text-xs">
          <Link
            href="/servicos"
            className={`px-3.5 py-2 rounded-lg font-bold transition-all whitespace-nowrap ${
              categoria === 'todas'
                ? 'bg-[#f36e22] text-white shadow-xs'
                : 'bg-slate-100 text-[#002e47] hover:bg-slate-200'
            }`}
          >
            Todos os Serviços ({SERVICOS_LIST.length})
          </Link>
          <Link
            href="/servicos?categoria=tributos"
            className={`px-3.5 py-2 rounded-lg font-bold transition-all whitespace-nowrap ${
              categoria === 'tributos'
                ? 'bg-[#f36e22] text-white shadow-xs'
                : 'bg-slate-100 text-[#002e47] hover:bg-slate-200'
            }`}
          >
            Tributos e Finanças
          </Link>
          <Link
            href="/servicos?categoria=cidadao"
            className={`px-3.5 py-2 rounded-lg font-bold transition-all whitespace-nowrap ${
              categoria === 'cidadao'
                ? 'bg-[#f36e22] text-white shadow-xs'
                : 'bg-slate-100 text-[#002e47] hover:bg-slate-200'
            }`}
          >
            Cidadão & Documentos
          </Link>
          <Link
            href="/servicos?categoria=empresa"
            className={`px-3.5 py-2 rounded-lg font-bold transition-all whitespace-nowrap ${
              categoria === 'empresa'
                ? 'bg-[#f36e22] text-white shadow-xs'
                : 'bg-slate-100 text-[#002e47] hover:bg-slate-200'
            }`}
          >
            Empresas & Negócios
          </Link>
          <Link
            href="/servicos?categoria=servidor"
            className={`px-3.5 py-2 rounded-lg font-bold transition-all whitespace-nowrap ${
              categoria === 'servidor'
                ? 'bg-[#f36e22] text-white shadow-xs'
                : 'bg-slate-100 text-[#002e47] hover:bg-slate-200'
            }`}
          >
            Portal do Servidor
          </Link>
          <Link
            href="/servicos?categoria=urbanismo"
            className={`px-3.5 py-2 rounded-lg font-bold transition-all whitespace-nowrap ${
              categoria === 'urbanismo'
                ? 'bg-[#f36e22] text-white shadow-xs'
                : 'bg-slate-100 text-[#002e47] hover:bg-slate-200'
            }`}
          >
            Urbanismo & Solo
          </Link>
        </div>
      </div>

      {/* Services Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#f36e22] bg-[#fff1ec] px-2.5 py-1 rounded-md">
                  {item.orgao}
                </span>
                {item.online && (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <CheckCircle className="w-3 h-3" /> Online
                  </span>
                )}
              </div>

              <h3 className="font-extrabold text-lg text-[#002e47] leading-snug">
                {item.titulo}
              </h3>

              <p className="text-xs text-slate-500 leading-relaxed">
                {item.descricao}
              </p>
            </div>

            <div className="pt-6 mt-4 border-t border-slate-100">
              <a
                href={item.link}
                target={item.link.startsWith('http') ? '_blank' : '_self'}
                rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="w-full bg-[#002e47] hover:bg-[#f36e22] text-white py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <span>Acessar Serviço</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
