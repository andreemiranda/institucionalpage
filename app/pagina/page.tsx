import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getPages } from '@/lib/wp';
import { FileText, ChevronRight, Building, ArrowLeft } from 'lucide-react';
import { stripHtml } from '@/lib/utils';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Páginas Institucionais • Prefeitura de Goiânia',
  description:
    'Relação completa de páginas institucionais, história de Goiânia, portal da transparência, ouvidoria e programas municipais.',
  openGraph: {
    type: 'website',
    title: 'Páginas Institucionais • Prefeitura de Goiânia',
    description: 'Acesse as páginas e conteúdos informativos oficiais da Prefeitura de Goiânia.',
    url: 'https://goiania.go.gov.br/pagina',
    siteName: 'Prefeitura de Goiânia',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Páginas da Prefeitura de Goiânia' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Páginas Institucionais • Prefeitura de Goiânia',
    description: 'Informações institucionais da capital do Estado de Goiás.',
    images: ['/og-image.png'],
  },
};

export default async function PaginasArchivePage() {
  const pages = await getPages();

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Páginas Institucionais da Prefeitura de Goiânia',
    description: 'Índice de páginas e publicações institucionais da administração municipal de Goiânia.',
    url: 'https://goiania.go.gov.br/pagina',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: pages.map((p, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: stripHtml(p.title.rendered),
        url: `https://goiania.go.gov.br/pagina/${p.slug}`,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-slate-500 flex items-center gap-2">
          <Link href="/" className="hover:text-[#f36e22] transition-colors">
            Início
          </Link>
          <span>/</span>
          <span className="text-[#002e47] font-semibold">Páginas Institucionais</span>
        </nav>

        {/* Header */}
        <div className="border-b-2 border-slate-200 pb-6">
          <div className="flex items-center gap-2 text-[#f36e22] text-xs font-bold uppercase tracking-wider mb-1">
            <Building className="w-4 h-4" />
            <span>Guia Institucional do Município</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#002e47] tracking-tight">
            Páginas do Portal
          </h1>
          <p className="text-sm text-slate-600 mt-2 max-w-2xl">
            Conheça as principais diretrizes, programas, histórico e canais de relacionamento da administração municipal de Goiânia.
          </p>
        </div>

        {/* Pages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pages.map((p) => {
            const title = stripHtml(p.title.rendered);
            const excerpt = stripHtml(p.content.rendered).slice(0, 160) + '...';

            return (
              <Link
                key={p.id}
                href={`/pagina/${p.slug}`}
                className="group bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-[#f36e22]/50 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#fff1ec] text-[#f36e22] flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#002e47] group-hover:text-[#f36e22] transition-colors">
                      {title}
                    </h2>
                    <p className="text-xs text-slate-500 leading-relaxed mt-1">
                      {excerpt}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#002e47] group-hover:text-[#f36e22] transition-colors">
                  <span>Acessar conteúdo</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="pt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#002e47] hover:text-[#f36e22] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para a página inicial</span>
          </Link>
        </div>
      </div>
    </>
  );
}
