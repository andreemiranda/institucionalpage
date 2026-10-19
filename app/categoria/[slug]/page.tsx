import React from 'react';
import { getPosts, getCategoryBySlug } from '@/lib/wp';
import Link from 'next/link';
import Image from 'next/image';
import { formatPostDate, stripHtml } from '@/lib/utils';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight, ChevronRight, Folder } from 'lucide-react';

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: 'Categoria não encontrada • Prefeitura de Goiânia',
      description: 'Categoria de notícias não encontrada no portal.',
    };
  }

  return {
    title: `${category.name} • Notícias de Goiânia`,
    description: `Notícias e comunicados oficiais da Prefeitura de Goiânia sobre ${category.name}.`,
    openGraph: {
      type: 'website',
      title: `${category.name} • Prefeitura de Goiânia`,
      description: `Todas as notícias e comunicados sobre ${category.name}.`,
      url: `https://goiania.go.gov.br/categoria/${slug}`,
      siteName: 'Prefeitura de Goiânia',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: category.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.name} • Prefeitura de Goiânia`,
      description: `Notícias oficiais sobre ${category.name}.`,
      images: ['/og-image.png'],
    },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams.page || '1', 10);
  
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const { posts, totalPages, totalCount } = await getPosts(page, 12, category.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-[#f36e22] transition-colors">Início</Link>
        <span>/</span>
        <Link href="/noticias" className="hover:text-[#f36e22] transition-colors">Notícias</Link>
        <span>/</span>
        <span className="text-[#002e47] font-semibold">{category.name}</span>
      </nav>

      {/* Header */}
      <div className="border-b-2 border-slate-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#f36e22] text-xs font-bold uppercase tracking-wider mb-1">
            <Folder className="w-4 h-4" />
            <span>Editoria de Notícias</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#002e47] tracking-tight">
            {category.name}
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Todas as postagens e informativos oficiais da categoria <strong>{category.name}</strong>.
          </p>
        </div>

        <Link
          href="/noticias"
          className="text-xs font-bold text-[#f36e22] hover:text-[#f27730] flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Ver todas as categorias</span>
        </Link>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200">
        <div>
          <span>Total de publicações: <strong>{totalCount}</strong></span>
        </div>
        <div>
          <span>Página <strong>{page}</strong> de <strong>{totalPages}</strong></span>
        </div>
      </div>

      {/* Posts */}
      {posts.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-4">
          <p className="text-slate-500 text-sm">Nenhuma notícia encontrada nesta categoria no momento.</p>
          <Link 
            href="/noticias" 
            className="inline-block bg-[#003856] text-white px-5 py-2.5 rounded-full text-xs font-bold hover:bg-[#f36e22] transition-colors"
          >
            Ver todas as notícias
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/noticia/${post.slug}`}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-lg border border-slate-200 hover:border-[#f36e22]/50 transition-all"
            >
              <div className="relative aspect-video w-full bg-slate-100 overflow-hidden">
                {post._embedded?.['wp:featuredmedia']?.[0]?.source_url ? (
                  <Image
                    src={post._embedded['wp:featuredmedia'][0].source_url}
                    alt={stripHtml(post.title.rendered)}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400 text-xs font-semibold">
                    Prefeitura de Goiânia
                  </div>
                )}
              </div>

              <div className="p-5 flex flex-col flex-1">
                <time className="text-[11px] font-bold text-[#f36e22] mb-1.5 block">
                  {formatPostDate(post.date, 'full')}
                </time>
                <h3 className="font-extrabold text-base text-[#002e47] group-hover:text-[#f36e22] transition-colors line-clamp-2 leading-snug mb-3 flex-1">
                  {stripHtml(post.title.rendered)}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-3 mb-4">
                  {stripHtml(post.excerpt.rendered)}
                </p>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#003856] group-hover:text-[#f36e22]">
                  <span>Ler matéria completa</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 pt-6">
          {page > 1 && (
            <Link 
              href={`/categoria/${slug}?page=${page - 1}`}
              className="flex items-center gap-1 px-4 py-2 bg-white border border-slate-200 text-[#002e47] hover:border-[#f36e22] hover:text-[#f36e22] rounded-xl text-xs font-bold transition-all shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Anterior</span>
            </Link>
          )}

          <div className="text-xs font-bold text-slate-600 px-3">
            {page} / {totalPages}
          </div>

          {page < totalPages && (
            <Link 
              href={`/categoria/${slug}?page=${page + 1}`}
              className="flex items-center gap-1 px-4 py-2 bg-white border border-slate-200 text-[#002e47] hover:border-[#f36e22] hover:text-[#f36e22] rounded-xl text-xs font-bold transition-all shadow-xs"
            >
              <span>Próxima</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
