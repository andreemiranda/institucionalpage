import React from 'react';
import Link from 'next/link';
import { Trees, Landmark, Building } from 'lucide-react';

export const revalidate = 60;

export const metadata = {
  title: 'Sobre Goiânia • A Capital Verde do Brasil',
  description: 'Conheça a história, o patrimônio Art Déco, os parques urbanos e os dados gerais de Goiânia, capital de Goiás.',
  openGraph: {
    type: 'website',
    title: 'Sobre Goiânia • A Capital Verde do Brasil',
    description: 'História, arquitetura Art Déco, parques urbanos e dados da capital de Goiás.',
    url: 'https://goiania.go.gov.br/sobre-goiania',
    siteName: 'Prefeitura de Goiânia',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Sobre Goiânia' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sobre Goiânia • Capital de Goiás',
    description: 'História e dados gerais da capital verde do Brasil.',
    images: ['/og-image.png'],
  },
};

export default function SobreGoianiaPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-[#f36e22] transition-colors">Início</Link>
        <span>/</span>
        <span className="text-[#002e47] font-semibold">Sobre Goiânia</span>
      </nav>

      {/* Hero Header */}
      <div className="bg-gradient-to-br from-[#002e47] to-[#003856] text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <span className="bg-[#f36e22] text-white text-xs font-black uppercase px-3 py-1 rounded-full inline-block">
            Capital do Estado de Goiás
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Goiânia: A Capital Verde e o Coração do Brasil
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Fundada em 24 de outubro de 1933 por Pedro Ludovico Teixeira e projetada por Attilio Corrêa Lima, Goiânia é uma das capitais mais arborizadas do mundo, centro econômico dinâmico do Centro-Oeste e referência nacional em qualidade de vida.
          </p>
        </div>
      </div>

      {/* Key Metric Facts */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-3xl font-extrabold text-[#f36e22] block mb-1">1933</span>
          <span className="text-xs font-bold text-[#002e47] uppercase">Fundação da Capital</span>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-3xl font-extrabold text-[#f36e22] block mb-1">+40</span>
          <span className="text-xs font-bold text-[#002e47] uppercase">Parques e Bosques</span>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-3xl font-extrabold text-[#f36e22] block mb-1">Art Déco</span>
          <span className="text-xs font-bold text-[#002e47] uppercase">Patrimônio Nacional IPHAN</span>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-3xl font-extrabold text-[#f36e22] block mb-1">1,4 Mi</span>
          <span className="text-xs font-bold text-[#002e47] uppercase">Habitantes</span>
        </div>
      </div>

      {/* Destaques Temáticos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#fff1ec] text-[#f36e22] flex items-center justify-center">
            <Trees className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-xl text-[#002e47]">Capital Mais Arborizada</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Com índice de área verde de mais de 90 m² por habitante, Goiânia é considerada a cidade mais arborizada do Brasil e a segunda no mundo, com parques icônicos como o Parque Vaca Brava, Bosque dos Buritis, Flamboyant e Areião.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#fff1ec] text-[#f36e22] flex items-center justify-center">
            <Landmark className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-xl text-[#002e47]">Acervo Art Déco Histórico</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            A Praça Cívica, a Estação Ferroviária, o Grande Hotel e o Teatro Goiânia formam um dos maiores conjuntos arquitetônicos Art Déco preservados do planeta, tombados pelo Instituto do Patrimônio Histórico e Artístico Nacional (IPHAN).
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#fff1ec] text-[#f36e22] flex items-center justify-center">
            <Building className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-xl text-[#002e47]">Polo de Saúde e Comércio</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Referência médica de excelência em todo o país e um dos maiores polos da indústria da moda e confecções da América Latina, com a emblemática Feira Hippie e a Região da 44 recebendo milhares de turistas semanalmente.
          </p>
        </div>
      </div>
    </div>
  );
}
