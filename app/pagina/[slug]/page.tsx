import React from 'react';
import type { Metadata } from 'next';
import { getPageBySlug } from '@/lib/wp';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { RenderHtml } from '@/components/RenderHtml';
import { ArrowLeft, FileText, Building, ExternalLink, Calendar } from 'lucide-react';
import { stripHtml } from '@/lib/utils';

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    return {
      title: 'Página Institucional não encontrada',
      description: 'A página solicitada não foi encontrada no portal da Prefeitura de Goiânia.',
    };
  }

  const title = stripHtml(page.title.rendered);
  const description = stripHtml(page.content.rendered).slice(0, 160);

  return {
    title: `${title} • Prefeitura de Goiânia`,
    description,
    openGraph: {
      type: 'website',
      title: `${title} • Prefeitura de Goiânia`,
      description,
      url: `https://goiania.go.gov.br/pagina/${slug}`,
      siteName: 'Prefeitura de Goiânia',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} • Prefeitura de Goiânia`,
      description,
      images: ['/og-image.png'],
      site: '@prefeiturago',
      creator: '@prefeiturago',
    },
  };
}

export default async function PageDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-[#f36e22] transition-colors">
          Início
        </Link>
        <span>/</span>
        <span className="text-[#002e47] font-semibold">Institucional</span>
        <span>/</span>
        <span className="text-[#f36e22] font-semibold truncate max-w-xs">
          {stripHtml(page.title.rendered)}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Content Article */}
        <article className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-8">
          <header className="border-b border-slate-100 pb-6 space-y-2">
            <div className="flex items-center gap-2 text-[#f36e22] text-xs font-bold uppercase tracking-wider">
              <FileText className="w-4 h-4" />
              <span>Página Institucional</span>
            </div>
            <h1
              className="text-3xl sm:text-4xl font-extrabold text-[#002e47] leading-tight"
              dangerouslySetInnerHTML={{ __html: page.title.rendered }}
            />
          </header>

          {/* Render content with video embeds, tables, and typography */}
          <RenderHtml html={page.content.rendered} />

          <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#002e47] hover:text-[#f36e22] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar para a página inicial</span>
            </Link>
          </div>
        </article>

        {/* Institutional Side Panel */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 space-y-4">
            <div className="flex items-center gap-2 text-[#002e47] font-bold text-sm">
              <Building className="w-4 h-4 text-[#f36e22]" />
              <span>Prefeitura de Goiânia</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Consulte mais informações institucionais, secretarias de governo, e canais de atendimento oficial do município.
            </p>
            <div className="space-y-2 pt-2 border-t border-slate-200 text-xs">
              <Link
                href="/secretarias"
                className="block text-[#002e47] hover:text-[#f36e22] font-semibold py-1"
              >
                &bull; Estrutura de Secretarias
              </Link>
              <Link
                href="/transparencia"
                className="block text-[#002e47] hover:text-[#f36e22] font-semibold py-1"
              >
                &bull; Portal da Transparência
              </Link>
              <Link
                href="/ouvidoria"
                className="block text-[#002e47] hover:text-[#f36e22] font-semibold py-1"
              >
                &bull; Ouvidoria e Acesso à Informação
              </Link>
              <Link
                href="/servicos"
                className="block text-[#002e47] hover:text-[#f36e22] font-semibold py-1"
              >
                &bull; Carta Geral de Serviços
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
