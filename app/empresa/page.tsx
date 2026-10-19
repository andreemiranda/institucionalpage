import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Building,
  FileText,
  Briefcase,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';
import { SERVICOS_LIST } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Portal da Empresa • Empreendedorismo & NFS-e • Goiânia',
  description:
    'Portal de serviços para empresas e empreendedores em Goiânia: Nota Fiscal Eletrônica (NFS-e), Empresa Fácil, Alvará de Funcionamento e Licitações.',
  openGraph: {
    type: 'website',
    title: 'Portal da Empresa • Prefeitura de Goiânia',
    description: 'Serviços empresariais, abertura de empresas, alvarás e emissão de notas fiscais.',
    url: 'https://goiania.go.gov.br/empresa',
    siteName: 'Prefeitura de Goiânia',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Portal da Empresa Goiânia' }],
  },
};

export default function EmpresaPage() {
  const empresaServices = SERVICOS_LIST.filter(
    (s) => s.categoria === 'empresa' || s.categoria === 'tributos'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-[#f36e22] transition-colors">
          Início
        </Link>
        <span>/</span>
        <span className="text-[#f36e22] font-semibold">Portal da Empresa</span>
      </nav>

      <div className="bg-gradient-to-r from-[#002e47] via-[#003856] to-[#00473E] text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-white/10 space-y-4">
        <span className="text-[#fff20c] text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2">
          <Briefcase className="w-4 h-4" />
          Desenvolvimento Econômico
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Ambiente de Negócios & Empresa Fácil
        </h1>
        <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed">
          Agilize a rotina do seu negócio na capital de Goiás: emissão de Nota Fiscal de Serviços Eletrônica (NFS-e), abertura simplificada, alvarás e certidões municipais.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {empresaServices.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <span className="text-[11px] font-bold text-[#f36e22] bg-[#fff1ec] px-3 py-1 rounded-md uppercase tracking-wider inline-block">
                {item.orgao}
              </span>
              <h3 className="font-extrabold text-lg text-[#002e47] leading-snug">
                {item.titulo}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
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
