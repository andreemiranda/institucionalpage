import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getPosts, getCategories } from '@/lib/wp';
import { formatPostDate, stripHtml } from '@/lib/utils';
import { QuickAccessHub } from '@/components/QuickAccessHub';
import { VideoSection } from '@/components/VideoSection';
import { 
  ArrowRight, 
  Play, 
  ExternalLink, 
  MapPin, 
  ChevronRight,
  TrendingUp,
  Newspaper
} from 'lucide-react';

export const revalidate = 60;

export default async function Home() {
  const { posts } = await getPosts(1, 13);
  const categories = await getCategories();

  const featuredPost = posts[0] || null;
  const secondaryPosts = posts.slice(1, 4);
  const feedPosts = posts.slice(4, 12);

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Notice Banner */}
      <section className="bg-[#fff1ec] border-b border-[#f36e22]/20 py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs md:text-sm font-semibold text-[#002e47]">
          <div className="flex items-center gap-2">
            <span className="bg-[#f36e22] text-white text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full">
              Destaque
            </span>
            <span>Campanha de Atualização Cadastral e Serviços Municipais 2026</span>
          </div>
          <Link 
            href="/servicos" 
            className="text-[#f36e22] hover:underline font-bold flex items-center gap-1"
          >
            Acessar todos os serviços <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Quick Access Hub (Cidadão, Empresa, Servidor, Turismo) */}
        <section>
          <QuickAccessHub />
        </section>

        {/* Mural de Notícias & Destaques Principais */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b-2 border-slate-200 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-7 bg-[#f36e22] rounded-full"></div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#002e47]">
                Mural de Notícias
              </h2>
            </div>
            <Link 
              href="/noticias" 
              className="text-sm font-bold text-[#f36e22] hover:text-[#f27730] flex items-center gap-1.5 transition-colors"
            >
              <span>Ver todas as notícias</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Featured Grid (1 Big Hero + 3 Side Highlights) */}
          {featuredPost && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Primary Main Feature Card */}
              <div className="lg:col-span-7 flex">
                <Link 
                  href={`/noticia/${featuredPost.slug}`}
                  className="group relative flex flex-col justify-end w-full min-h-[420px] lg:min-h-[480px] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-slate-200 bg-slate-900"
                >
                  {featuredPost._embedded?.['wp:featuredmedia']?.[0]?.source_url ? (
                    <Image
                      src={featuredPost._embedded['wp:featuredmedia'][0].source_url}
                      alt={stripHtml(featuredPost.title.rendered)}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                      referrerPolicy="no-referrer"
                      priority
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[#003856]" />
                  )}

                  {/* Gradient Overlay for high legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />

                  <div className="relative p-6 sm:p-8 z-10 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="bg-[#f36e22] text-white text-xs font-bold uppercase px-3 py-1 rounded-full shadow-sm">
                        Manchete Principal
                      </span>
                      <time className="text-xs font-semibold text-slate-300">
                        {formatPostDate(featuredPost.date, 'full')}
                      </time>
                    </div>

                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight group-hover:text-[#fff20c] transition-colors">
                      {stripHtml(featuredPost.title.rendered)}
                    </h3>

                    <p className="text-slate-200 text-sm line-clamp-2 max-w-2xl">
                      {stripHtml(featuredPost.excerpt.rendered)}
                    </p>
                  </div>
                </Link>
              </div>

              {/* 3 Secondary Highlights */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-4">
                {secondaryPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/noticia/${post.slug}`}
                    className="group flex gap-4 p-4 bg-white rounded-xl shadow-xs hover:shadow-md border border-slate-100 hover:border-[#f36e22]/40 transition-all flex-1"
                  >
                    <div className="relative w-28 sm:w-32 h-24 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                      {post._embedded?.['wp:featuredmedia']?.[0]?.source_url ? (
                        <Image
                          src={post._embedded['wp:featuredmedia'][0].source_url}
                          alt={stripHtml(post.title.rendered)}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400 text-xs">
                          Goiânia
                        </div>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col justify-center min-w-0">
                      <time className="text-[11px] font-bold text-[#f36e22] block mb-1">
                        {formatPostDate(post.date, 'short')}
                      </time>
                      <h4 className="font-bold text-sm text-[#002e47] group-hover:text-[#f36e22] transition-colors line-clamp-2 leading-snug">
                        {stripHtml(post.title.rendered)}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-1">
                        {stripHtml(post.excerpt.rendered)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Category Quick Tags */}
          <div className="bg-slate-100 p-3 rounded-xl flex items-center gap-2 overflow-x-auto text-xs font-bold text-[#002e47]">
            <span className="text-slate-400 uppercase tracking-wider shrink-0 mr-2 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> Assuntos:
            </span>
            {categories.slice(0, 10).map((cat) => (
              <Link
                key={cat.id}
                href={`/categoria/${cat.slug}`}
                className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-white hover:bg-[#f36e22] hover:text-white transition-colors shadow-2xs shrink-0"
              >
                {cat.name} ({cat.count})
              </Link>
            ))}
          </div>
        </section>

        {/* Últimas Matérias em Grade */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="text-xl font-bold text-[#002e47] flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-[#f36e22]" />
              <span>Notícias Recentes da Capital</span>
            </h3>
            <span className="text-xs text-slate-500">Atualizado via API WordPress</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {feedPosts.map((post) => (
              <Link
                key={post.id}
                href={`/noticia/${post.slug}`}
                className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-xs hover:shadow-lg border border-slate-100 hover:border-slate-300 transition-all"
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
                    <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400 text-xs">
                      Prefeitura de Goiânia
                    </div>
                  )}
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <time className="text-[11px] font-bold text-[#f36e22] mb-1.5 block">
                    {formatPostDate(post.date, 'full')}
                  </time>
                  <h4 className="font-bold text-sm text-[#002e47] group-hover:text-[#f36e22] transition-colors line-clamp-2 leading-snug mb-2 flex-1">
                    {stripHtml(post.title.rendered)}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {stripHtml(post.excerpt.rendered)}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              href="/noticias"
              className="inline-flex items-center gap-2 bg-[#003856] hover:bg-[#002e47] text-white font-bold text-sm px-6 py-3 rounded-full transition-colors shadow-sm"
            >
              <span>Explorar Arquivo Completo de Notícias</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Goiânia Conectada / Seção de Vídeos Oficiais */}
        <section>
          <VideoSection />
        </section>

        {/* Atendimento Presencial - Unidades Atende Fácil */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#f36e22] text-xs font-bold uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>Atendimento Presencial Descentralizado</span>
              </div>
              <h3 className="text-2xl font-extrabold text-[#002e47]">
                Unidades do Atende Fácil em Toda a Cidade
              </h3>
              <p className="text-slate-600 text-sm max-w-2xl">
                Resolva serviços de IPTU, parcelamentos, alvarás, recursos de trânsito e documentação com comodidade nas 5 unidades: Paço Municipal, Shopping Cidade Jardim, Praça da Bíblia, Mangalô e Estação Ferroviária.
              </p>
            </div>

            <a
              href="http://agendamento.goiania.go.gov.br/agendamento/#/home"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#f36e22] hover:bg-[#f27730] text-white px-6 py-3 rounded-full font-bold text-sm whitespace-nowrap shadow-sm transition-all flex items-center gap-2"
            >
              <span>Agendar Atendimento</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
