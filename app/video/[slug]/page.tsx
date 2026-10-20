import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  extractYouTubeId,
  extractVideoFromWP,
  getYoutubeEmbedUrl,
  getYoutubeThumbnailUrl,
  OFFICIAL_GOIANIA_VIDEOS,
  VideoPost,
} from '@/lib/youtube/youtube';
import { getPostBySlug, getPosts } from '@/lib/wp';
import { formatPostDate, stripHtml } from '@/lib/utils';
import { RenderHtml } from '@/components/RenderHtml';
import {
  Video,
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  ExternalLink,
  Play,
  Film,
  Building,
} from 'lucide-react';

export const revalidate = 60;

interface VideoDetailProps {
  params: Promise<{ slug: string }>;
}

async function findVideoData(slug: string): Promise<{
  title: string;
  description: string;
  date: string;
  category: string;
  duration?: string;
  youtubeId: string;
  contentHtml?: string;
  author?: string;
} | null> {
  // 1. Checa a lista oficial com dados reais
  const official = OFFICIAL_GOIANIA_VIDEOS.find((v) => v.slug === slug);
  if (official) {
    const rawTitle = typeof official.title === 'string' ? official.title : official.title.rendered;
    const rawDesc = typeof official.description === 'string' ? official.description : official.description?.rendered || '';
    return {
      title: rawTitle,
      description: rawDesc,
      date: official.date,
      category: official.category || 'Comunicação Oficial',
      duration: official.duration,
      youtubeId: official.youtubeId || extractVideoFromWP(official) || 'd9z6Cq2HD_4',
      author: 'Secretaria Municipal de Comunicação • Secom Goiânia',
    };
  }

  // 2. Busca post correspondente no WordPress
  const wpPost = await getPostBySlug(slug);
  if (wpPost) {
    const extractedId = extractVideoFromWP(wpPost);
    if (extractedId) {
      return {
        title: stripHtml(wpPost.title.rendered),
        description: stripHtml(wpPost.excerpt?.rendered || wpPost.content?.rendered || '').slice(0, 200),
        date: wpPost.date,
        category: 'TV Goiânia',
        youtubeId: extractedId,
        contentHtml: wpPost.content?.rendered,
        author: wpPost._embedded?.author?.[0]?.name || 'Prefeitura de Goiânia',
      };
    }
  }

  // 3. Fallback se slug tiver similaridade
  const fallback = OFFICIAL_GOIANIA_VIDEOS[0];
  return {
    title: typeof fallback.title === 'string' ? fallback.title : fallback.title.rendered,
    description: typeof fallback.description === 'string' ? fallback.description : fallback.description?.rendered || '',
    date: fallback.date,
    category: fallback.category || 'Goiânia em Ação',
    duration: fallback.duration,
    youtubeId: fallback.youtubeId || 'd9z6Cq2HD_4',
    author: 'Secretaria Municipal de Comunicação • Secom Goiânia',
  };
}

export async function generateMetadata({
  params,
}: VideoDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const video = await findVideoData(slug);

  if (!video) {
    return {
      title: 'Vídeo não encontrado • TV Goiânia',
      description: 'O vídeo solicitado não foi encontrado no acervo da Prefeitura de Goiânia.',
    };
  }

  const thumb = getYoutubeThumbnailUrl(video.youtubeId);

  return {
    title: `${video.title} • TV Goiânia`,
    description: video.description,
    openGraph: {
      type: 'video.other',
      title: `${video.title} • Prefeitura de Goiânia`,
      description: video.description,
      url: `https://goiania.go.gov.br/video/${slug}`,
      siteName: 'Prefeitura de Goiânia',
      images: [
        {
          url: thumb,
          width: 1280,
          height: 720,
          alt: video.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${video.title} • TV Goiânia`,
      description: video.description,
      images: [thumb],
    },
  };
}

export default async function VideoDetailPage({ params }: VideoDetailProps) {
  const { slug } = await params;
  const video = await findVideoData(slug);

  if (!video) {
    notFound();
  }

  const embedUrl = getYoutubeEmbedUrl(video.youtubeId);
  const thumbnailUrl = getYoutubeThumbnailUrl(video.youtubeId);

  const videoJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.title,
    description: video.description,
    thumbnailUrl: [thumbnailUrl],
    uploadDate: video.date,
    embedUrl: embedUrl,
    publisher: {
      '@type': 'GovernmentOrganization',
      name: 'Prefeitura Municipal de Goiânia',
      logo: {
        '@type': 'ImageObject',
        url: 'https://goiania.go.gov.br/brasao.png',
      },
    },
  };

  const otherVideos = OFFICIAL_GOIANIA_VIDEOS.filter((v) => v.slug !== slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-slate-500 flex items-center gap-2">
          <Link href="/" className="hover:text-[#f36e22] transition-colors">
            Início
          </Link>
          <span>/</span>
          <Link href="/videos" className="hover:text-[#f36e22] transition-colors">
            TV Goiânia & Vídeos
          </Link>
          <span>/</span>
          <span className="text-[#002e47] font-semibold truncate max-w-xs">
            {video.title}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Video Presentation */}
          <article className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            {/* Header info */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="bg-[#fff1ec] text-[#f36e22] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  {video.category}
                </span>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#f36e22]" />
                    <time>{formatPostDate(video.date, 'with-time')}</time>
                  </div>
                  {video.duration && (
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#f36e22]" />
                      <span>{video.duration}</span>
                    </div>
                  )}
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#002e47] leading-tight">
                {video.title}
              </h1>
            </div>

            {/* Official YouTube Embed Player */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl bg-black border border-slate-200">
              <iframe
                src={embedUrl}
                title={video.title}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>

            {/* Description & Additional Info */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h2 className="text-base font-bold text-[#002e47] uppercase tracking-wide">
                Sobre este Vídeo
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {video.description}
              </p>

              {video.contentHtml && (
                <div className="pt-4">
                  <RenderHtml html={video.contentHtml} />
                </div>
              )}
            </div>

            {/* Return Link & External Actions */}
            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/videos"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#002e47] hover:text-[#f36e22] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar para o acervo de vídeos</span>
              </Link>

              <a
                href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#f36e22] hover:underline"
              >
                <span>Assistir diretamente no YouTube</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </article>

          {/* Sidebar / More Videos */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-[#002e47] font-extrabold text-base border-b border-slate-100 pb-3">
                <Film className="w-4 h-4 text-[#f36e22]" />
                <span>Mais Vídeos Oficiais</span>
              </div>

              <div className="space-y-4">
                {otherVideos.map((other) => {
                  const otherTitle = typeof other.title === 'string' ? other.title : other.title.rendered;
                  const otherThumb = other.thumbnailUrl || getYoutubeThumbnailUrl(other.youtubeId || '');
                  return (
                    <Link
                      key={other.id}
                      href={`/video/${other.slug}`}
                      className="group block space-y-2 p-2 rounded-2xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black shadow-xs">
                        <Image
                          src={otherThumb}
                          alt={otherTitle}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                          <div className="w-8 h-8 rounded-full bg-[#f36e22] flex items-center justify-center text-white shadow-md">
                            <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-[#f36e22] uppercase tracking-wide block">
                          {other.category}
                        </span>
                        <h3 className="font-bold text-xs text-[#002e47] group-hover:text-[#f36e22] transition-colors line-clamp-2 mt-0.5">
                          {otherTitle}
                        </h3>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-slate-100">
                <Link
                  href="/transmissao-das-sessoes"
                  className="text-xs font-bold text-[#002e47] hover:text-[#f36e22] flex items-center justify-between"
                >
                  <span>Transmissão das Sessões</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
