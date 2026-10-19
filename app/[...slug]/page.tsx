import React from 'react';
import type { Metadata } from 'next';
import { getPageBySlug, getPostBySlug, getPosts } from '@/lib/wp';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { RenderHtml } from '@/components/RenderHtml';
import { stripHtml, formatPostDate } from '@/lib/utils';
import {
  FileText,
  Calendar,
  User,
  ArrowLeft,
  Building,
  Share2,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

export const revalidate = 60;

interface CatchAllProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: CatchAllProps): Promise<Metadata> {
  const { slug } = await params;
  const leafSlug = slug[slug.length - 1];

  // Try page first
  const page = await getPageBySlug(leafSlug);
  if (page) {
    const title = stripHtml(page.title.rendered);
    const desc = stripHtml(page.content.rendered).slice(0, 160);
    return {
      title: `${title} • Prefeitura de Goiânia`,
      description: desc,
      openGraph: {
        type: 'website',
        title: `${title} • Prefeitura de Goiânia`,
        description: desc,
        url: `https://goiania.go.gov.br/${slug.join('/')}`,
        siteName: 'Prefeitura de Goiânia',
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: title }],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${title} • Prefeitura de Goiânia`,
        description: desc,
        images: ['/og-image.png'],
      },
    };
  }

  // Try post
  const post = await getPostBySlug(leafSlug);
  if (post) {
    const title = stripHtml(post.title.rendered);
    const desc = stripHtml(post.excerpt?.rendered || post.content.rendered).slice(0, 160);
    const img = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/og-image.png';
    return {
      title: `${title} • Notícias de Goiânia`,
      description: desc,
      openGraph: {
        type: 'article',
        title,
        description: desc,
        url: `https://goiania.go.gov.br/${slug.join('/')}`,
        siteName: 'Prefeitura de Goiânia',
        images: [{ url: img, width: 1200, height: 630, alt: title }],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description: desc,
        images: [img],
      },
    };
  }

  return {
    title: 'Prefeitura de Goiânia • Portal Oficial',
    description: 'Portal Oficial da Prefeitura Municipal de Goiânia.',
  };
}

export default async function CatchAllPage({ params }: CatchAllProps) {
  const { slug } = await params;
  const leafSlug = slug[slug.length - 1];

  // 1. Try finding a Page
  const page = await getPageBySlug(leafSlug);
  if (page) {
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
          <article className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-8">
            <header className="border-b border-slate-100 pb-6 space-y-2">
              <div className="flex items-center gap-2 text-[#f36e22] text-xs font-bold uppercase tracking-wider">
                <FileText className="w-4 h-4" />
                <span>Página do Portal</span>
              </div>
              <h1
                className="text-3xl sm:text-4xl font-extrabold text-[#002e47] leading-tight"
                dangerouslySetInnerHTML={{ __html: page.title.rendered }}
              />
            </header>

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

          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 space-y-4">
              <div className="flex items-center gap-2 text-[#002e47] font-bold text-sm">
                <Building className="w-4 h-4 text-[#f36e22]" />
                <span>Serviços Relacionados</span>
              </div>
              <div className="space-y-2 text-xs">
                <Link
                  href="/servicos"
                  className="block text-[#002e47] hover:text-[#f36e22] font-semibold py-1 border-b border-slate-200"
                >
                  &bull; Carta Geral de Serviços
                </Link>
                <Link
                  href="/secretarias"
                  className="block text-[#002e47] hover:text-[#f36e22] font-semibold py-1 border-b border-slate-200"
                >
                  &bull; Secretarias e Órgãos
                </Link>
                <Link
                  href="/transparencia"
                  className="block text-[#002e47] hover:text-[#f36e22] font-semibold py-1 border-b border-slate-200"
                >
                  &bull; Portal da Transparência
                </Link>
                <Link
                  href="/ouvidoria"
                  className="block text-[#002e47] hover:text-[#f36e22] font-semibold py-1"
                >
                  &bull; Ouvidoria Municipal 156
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  // 2. Try finding a Post
  const post = await getPostBySlug(leafSlug);
  if (post) {
    const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    const authorName =
      post._embedded?.['author']?.[0]?.name ||
      'Secretaria Municipal de Comunicação • Secom';

    const { posts: relatedPosts } = await getPosts(1, 4);
    const otherPosts = relatedPosts.filter((p) => p.id !== post.id).slice(0, 3);

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <nav className="text-xs text-slate-500 flex items-center gap-2">
          <Link href="/" className="hover:text-[#f36e22] transition-colors">
            Início
          </Link>
          <span>/</span>
          <Link href="/noticias" className="hover:text-[#f36e22] transition-colors">
            Notícias
          </Link>
          <span>/</span>
          <span className="text-[#002e47] font-semibold truncate max-w-xs">
            {stripHtml(post.title.rendered)}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <article className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-8">
            <header className="space-y-4">
              <h1
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#002e47] leading-tight"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 text-xs text-slate-500">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 font-medium text-slate-700">
                    <User className="w-4 h-4 text-[#f36e22]" />
                    <span>{authorName}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#f36e22]" />
                    <time>{formatPostDate(post.date, 'with-time')}</time>
                  </div>
                </div>
              </div>
            </header>

            {imageUrl && (
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-md">
                <Image
                  src={imageUrl}
                  alt={stripHtml(post.title.rendered)}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                  priority
                />
              </div>
            )}

            <RenderHtml html={post.content.rendered} />

            <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
              <Link
                href="/noticias"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#002e47] hover:text-[#f36e22] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar para todas as notícias</span>
              </Link>
            </div>
          </article>

          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-extrabold text-base text-[#002e47] border-b border-slate-100 pb-3">
                Mais Notícias da Capital
              </h3>
              <div className="space-y-4">
                {otherPosts.map((other) => (
                  <Link
                    key={other.id}
                    href={`/noticia/${other.slug}`}
                    className="block group"
                  >
                    <time className="text-[10px] font-bold text-[#f36e22] block mb-0.5">
                      {formatPostDate(other.date, 'short')}
                    </time>
                    <h4 className="font-bold text-xs text-[#002e47] group-hover:text-[#f36e22] transition-colors line-clamp-2">
                      {stripHtml(other.title.rendered)}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  // Not found in WP
  notFound();
}
