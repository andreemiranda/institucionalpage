import React from 'react';
import { getPostBySlug, getPosts } from '@/lib/wp';
import Image from 'next/image';
import Link from 'next/link';
import { formatPostDate, stripHtml } from '@/lib/utils';
import { notFound } from 'next/navigation';
import { 
  Calendar, 
  User, 
  Facebook, 
  Twitter, 
  MessageCircle, 
  ArrowLeft, 
  Newspaper
} from 'lucide-react';

export const revalidate = 60;

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const authorName = post._embedded?.['author']?.[0]?.name || 'Secretaria Municipal de Comunicação • Secom';
  const categories = post._embedded?.['wp:term']?.[0] || [];

  // Fetch recent posts for sidebar / related
  const { posts: relatedPosts } = await getPosts(1, 4);
  const otherPosts = relatedPosts.filter(p => p.id !== post.id).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-[#f36e22] transition-colors">Início</Link>
        <span>/</span>
        <Link href="/noticias" className="hover:text-[#f36e22] transition-colors">Notícias</Link>
        <span>/</span>
        <span className="text-[#002e47] font-semibold truncate max-w-xs">{stripHtml(post.title.rendered)}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Main Article Content */}
        <article className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-8">
          <header className="space-y-4">
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <Link
                    key={cat.id}
                    href={`/categoria/${cat.slug}`}
                    className="bg-[#fff1ec] text-[#f36e22] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full hover:bg-[#f36e22] hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}

            <h1 
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#002e47] leading-tight"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />

            {/* Author and Date Meta */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 text-xs text-slate-500">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 font-medium text-slate-700">
                  <User className="w-4 h-4 text-[#f36e22]" />
                  <span>{authorName}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#f36e22]" />
                  <time>
                    {formatPostDate(post.date, 'with-time')}
                  </time>
                </div>
              </div>

              {/* Social Share links */}
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-400 mr-1">Compartilhar:</span>
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(stripHtml(post.title.rendered))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center transition-colors"
                  aria-label="Compartilhar no WhatsApp"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://www.facebook.com/sharer/sharer.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors"
                  aria-label="Compartilhar no Facebook"
                >
                  <Facebook className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://twitter.com/intent/tweet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center transition-colors"
                  aria-label="Compartilhar no Twitter"
                >
                  <Twitter className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </header>

          {/* Featured Image */}
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

          {/* Excerpt Lead */}
          {post.excerpt?.rendered && (
            <div 
              className="text-base sm:text-lg font-medium text-slate-700 bg-slate-50 p-5 rounded-2xl border-l-4 border-[#f36e22] italic leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
            />
          )}

          {/* Main Body HTML */}
          <div 
            className="prose prose-base sm:prose-lg max-w-none text-[#2A454A] leading-relaxed [&>p]:mb-5 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-[#002e47] [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-[#002e47] [&>img]:rounded-xl [&>figure]:my-6"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />

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

        {/* Sidebar with Related News and Official Portal Links */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-extrabold text-lg text-[#002e47] border-b border-slate-100 pb-3 flex items-center gap-2">
              <Newspaper className="w-4 h-4 text-[#f36e22]" />
              <span>Outras Notícias Recentes</span>
            </h3>

            <div className="space-y-4">
              {otherPosts.map((other) => (
                <Link
                  key={other.id}
                  href={`/noticia/${other.slug}`}
                  className="group flex gap-3 pb-4 border-b border-slate-100 last:border-none last:pb-0"
                >
                  <div className="relative w-20 h-16 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                    {other._embedded?.['wp:featuredmedia']?.[0]?.source_url ? (
                      <Image
                        src={other._embedded['wp:featuredmedia'][0].source_url}
                        alt={stripHtml(other.title.rendered)}
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-200" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <time className="text-[10px] font-bold text-[#f36e22] block mb-0.5">
                      {formatPostDate(other.date, 'short')}
                    </time>
                    <h4 className="font-bold text-xs text-[#002e47] group-hover:text-[#f36e22] transition-colors line-clamp-2 leading-snug">
                      {stripHtml(other.title.rendered)}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick CTA Box */}
          <div className="bg-[#002e47] text-white rounded-3xl p-6 shadow-md space-y-4">
            <span className="text-[#f36e22] text-xs font-bold uppercase tracking-wider block">
              Atendimento ao Cidadão
            </span>
            <h4 className="font-extrabold text-lg text-white">
              Precisa de serviços da Prefeitura?
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Consulte débitos de IPTU, agende atendimento presencial nas unidades do Atende Fácil ou faça manifestações na Ouvidoria 156.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <Link
                href="/servicos"
                className="w-full bg-[#f36e22] hover:bg-[#f27730] text-white py-2.5 rounded-xl font-bold text-xs text-center transition-colors block uppercase"
              >
                Carta de Serviços
              </Link>
              <Link
                href="/ouvidoria"
                className="w-full bg-white/10 hover:bg-white/20 text-white py-2.5 rounded-xl font-bold text-xs text-center transition-colors block uppercase"
              >
                Fale com a Ouvidoria
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
