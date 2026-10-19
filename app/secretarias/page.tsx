import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  ShieldCheck,
  HeartPulse,
  GraduationCap,
  Coins,
  HardHat,
  Leaf,
  Car,
  Trash2,
  Radio,
  FileCheck,
} from 'lucide-react';
import { SECRETARIAS_LIST } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Secretarias Municipais e Órgãos • Prefeitura de Goiânia',
  description:
    'Consulte a relação completa de secretarias, agências e órgãos da Prefeitura Municipal de Goiânia, com titulares, endereços, telefones e competências.',
  openGraph: {
    type: 'website',
    title: 'Secretarias Municipais • Prefeitura de Goiânia',
    description: 'Guia de órgãos municipais, contatos e titulares do Poder Executivo.',
    url: 'https://goiania.go.gov.br/secretarias',
    siteName: 'Prefeitura de Goiânia',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Secretarias de Goiânia' }],
  },
};

const ICONS_MAP: Record<string, React.ReactNode> = {
  SMS: <HeartPulse className="w-5 h-5 text-emerald-600" />,
  SME: <GraduationCap className="w-5 h-5 text-blue-600" />,
  SEFIN: <Coins className="w-5 h-5 text-amber-600" />,
  SEINFRA: <HardHat className="w-5 h-5 text-orange-600" />,
  AMMA: <Leaf className="w-5 h-5 text-emerald-700" />,
  SMT: <Car className="w-5 h-5 text-red-600" />,
  COMURG: <Trash2 className="w-5 h-5 text-teal-600" />,
  SECOM: <Radio className="w-5 h-5 text-purple-600" />,
  CGM: <ShieldCheck className="w-5 h-5 text-indigo-600" />,
};

export default function SecretariasPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-[#f36e22] transition-colors">
          Início
        </Link>
        <span>/</span>
        <span className="text-[#002e47] font-semibold">Estrutura de Governo</span>
        <span>/</span>
        <span className="text-[#f36e22] font-semibold">Secretarias Municipais</span>
      </nav>

      {/* Header */}
      <div className="border-b-2 border-slate-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#f36e22] text-xs font-bold uppercase tracking-wider mb-1">
            <Building2 className="w-4 h-4" />
            <span>Poder Executivo Municipal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#002e47] tracking-tight">
            Secretarias e Órgãos Municipais
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Conheça as secretarias, agências e autarquias que compõem a administração pública da Prefeitura de Goiânia, seus canais de atendimento e titulares.
          </p>
        </div>

        <Link
          href="/servicos"
          className="bg-[#002e47] hover:bg-[#003856] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm"
        >
          <span>Carta de Serviços dos Órgãos</span>
        </Link>
      </div>

      {/* Secretarias Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SECRETARIAS_LIST.map((sec) => (
          <div
            key={sec.id}
            id={sec.sigla.toLowerCase()}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-[#002e47] bg-slate-100 px-3 py-1 rounded-lg">
                  {sec.sigla}
                </span>
                <div className="p-2 bg-slate-50 rounded-xl">
                  {ICONS_MAP[sec.sigla] || <Building2 className="w-5 h-5 text-[#f36e22]" />}
                </div>
              </div>

              <h3 className="font-extrabold text-lg text-[#002e47] leading-snug">
                {sec.nome}
              </h3>

              <p className="text-xs text-slate-500 leading-relaxed">
                {sec.descricao}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#f36e22] shrink-0 mt-0.5" />
                <span className="line-clamp-2">{sec.endereco}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{sec.telefone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span className="truncate">{sec.email}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
