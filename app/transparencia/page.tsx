import React from 'react';
import Link from 'next/link';
import { TRANSPARENCIA_LIST } from '@/lib/data';
import { 
  ShieldCheck, 
  ExternalLink, 
  CheckCircle
} from 'lucide-react';

export const metadata = {
  title: 'Portal da Transparência • Prefeitura de Goiânia',
  description: 'Acompanhe as receitas, despesas, licitações, folha de pagamento e dados orçamentários do município de Goiânia.',
};

export default function TransparenciaPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-[#f36e22] transition-colors">Início</Link>
        <span>/</span>
        <span className="text-[#002e47] font-semibold">Portal da Transparência</span>
      </nav>

      {/* Header */}
      <div className="border-b-2 border-slate-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#f36e22] text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Controle Social • Lei de Acesso à Informação</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#002e47] tracking-tight">
            Portal da Transparência de Goiânia
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl">
            Acesso público, em conformidade com a Lei de Responsabilidade Fiscal e a Lei Federal nº 12.527/2011 (LAI). Consulte os recursos e a aplicação do dinheiro público da capital.
          </p>
        </div>

        <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 self-start md:self-auto">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>Selo Ouro de Transparência Pública</span>
        </div>
      </div>

      {/* Grid of Transparency Portals */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TRANSPARENCIA_LIST.map((item) => (
          <div
            key={item.id}
            id={item.id}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#002e47] bg-[#F2F4F4] px-2.5 py-1 rounded-md inline-block">
                {item.badge}
              </span>

              <h3 className="font-extrabold text-xl text-[#002e47] leading-snug">
                {item.titulo}
              </h3>

              <p className="text-xs text-slate-500 leading-relaxed">
                {item.descricao}
              </p>
            </div>

            <div className="pt-6 mt-4 border-t border-slate-100">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#002e47] hover:bg-[#f36e22] text-white py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <span>Consultar Dados</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* SIC & Pedidos de Informação Banner */}
      <section className="bg-gradient-to-br from-[#003856] to-[#002e47] text-white rounded-2xl p-8 sm:p-10 shadow-lg">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3">
            <span className="text-[#fff20c] text-xs font-bold uppercase tracking-wider block">
              Serviço de Informação ao Cidadão (e-SIC)
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Não encontrou a informação que procurava?
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Você pode protocolar um pedido oficial de acesso à informação pública de forma simples e rápida pela internet, conforme estabelece a Lei nº 12.527/2011.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="https://www.goiania.go.gov.br/ouvidoria-e-sic/servico-informacao-cidadao/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#f36e22] hover:bg-[#f27730] text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm"
            >
              <span>Abrir Pedido e-SIC</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <Link
              href="/ouvidoria"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all"
            >
              <span>Fale com a Ouvidoria</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
