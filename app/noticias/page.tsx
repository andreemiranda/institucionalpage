import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getPosts, getCategories } from '@/lib/wp';
import { formatPostDate, stripHtml } from '@/lib/utils';
import type { Metadata } from 'next';
import { Search, ArrowLeft, ArrowRight, ChevronRight, Newspaper } from 'lucide-react';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Notícias de Goiânia • Sala de Imprensa Oficial',
  description:
    'Acompanhe as últimas notícias, comunicados, campanhas de vacinação, obras e ações da Prefeitura Municipal de Goiânia.',
  openGraph: {
    type: 'website',
    title: 'Notícias de Goiânia • Prefeitura de Goiânia',
    description: 'Sala de imprensa e jornalismo oficial da capital de Goiás.',
    url: 'https://goiania.go.gov.br/noticias',
    siteName: 'Prefeitura de Goiânia',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Notícias de Goiânia' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Notícias de Goiânia • Sala de Imprensa Oficial',
    description: 'Notícias e avisos oficiais da Prefeitura de Goiânia.',
    images: ['/og-image.png'],
  },
};

export default async function NoticiasPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string; search?: string }>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page || '1', 10);
  const categoryId = params.category ? parseInt(params.category, 10) : undefined;
  const search = params.search || '';

  const { posts, totalPages, totalCount } = await getPosts(page, 12, categoryId, search);
  const categories = await getCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-[#f36e22] transition-colors">Início</Link>
        <span>/</span>
        <span className="text-[#002e47] font-semibold">Notícias da Prefeitura</span>
      </nav>

      {/* Header Widget */}
      <div className="border-b-2 border-slate-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#f36e22] text-xs font-bold uppercase tracking-wider mb-1">
            <Newspaper className="w-4 h-4" />
            <span>Sala de Imprensa • Comunicação Oficial</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#002e47] tracking-tight">
            Notícias de Goiânia
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Acompanhe as ações, obras, serviços públicos e eventos promovidos pelo Governo Municipal.
          </p>
        </div>

        {/* Search input */}
        <form action="/noticias" method="GET" className="relative flex items-center max-w-sm w-full">
          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="Pesquisar notícias..."
            className="w-full bg-white text-[#2A454A] placeholder:text-slate-400 border border-slate-300 rounded-full pl-4 pr-10 py-2.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#f36e22] shadow-2xs"
          />
          <button
            type="submit"
            className="absolute right-1.5 bg-[#f36e22] text-white p-1.5 rounded-full hover:bg-[#f27730] transition-colors"
            aria-label="Buscar"
          >
            <Search className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* Filter Categories Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs font-bold scrollbar-thin">
        <Link
          href="/noticias"
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
            !categoryId 
              ? 'bg-[#002e47] text-white shadow-xs' 
              : 'bg-white text-[#002e47] border border-slate-200 hover:border-[#f36e22]'
          }`}
        >
          Todas as Categorias
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/noticias?category=${cat.id}`}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              categoryId === cat.id 
                ? 'bg-[#f36e22] text-white shadow-xs' 
                : 'bg-white text-[#002e47] border border-slate-200 hover:border-[#f36e22]'
            }`}
          >
            {cat.name} ({cat.count})
          </Link>
        ))}
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200">
        <div>
          <span>Exibindo <strong>{posts.length}</strong> {posts.length === 1 ? 'matéria' : 'matérias'}</span>
          {search && <span> para a busca &ldquo;<strong>{search}</strong>&rdquo;</span>}
        </div>
        <div>
          <span>Página <strong>{page}</strong> de <strong>{totalPages}</strong></span>
        </div>
      </div>

      {/* Posts Grid */}
      {posts.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-4">
          <p className="text-slate-500 text-sm">Nenhuma notícia encontrada com os critérios selecionados.</p>
          <Link 
            href="/noticias" 
            className="inline-block bg-[#003856] text-white px-5 py-2.5 rounded-full text-xs font-bold hover:bg-[#f36e22] transition-colors"
          >
            Ver todas as matérias
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
                <div className="flex items-center justify-between text-[11px] font-bold text-[#f36e22] mb-2">
                  <span>
                    {formatPostDate(post.date, 'full')}
                  </span>
                </div>

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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 pt-6">
          {page > 1 && (
            <Link
              href={`/noticias?page=${page - 1}${categoryId ? `&category=${categoryId}` : ''}${search ? `&search=${encodeURIComponent(search)}` : ''}`}
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
              href={`/noticias?page=${page + 1}${categoryId ? `&category=${categoryId}` : ''}${search ? `&search=${encodeURIComponent(search)}` : ''}`}
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
