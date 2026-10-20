import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { VideoSection } from '@/components/VideoSection';
import {
  OFFICIAL_GOIANIA_VIDEOS,
  getYoutubeEmbedUrl,
  getYoutubeThumbnailUrl,
} from '@/lib/youtube/youtube';
import { Video, ExternalLink, Play, Film, ChevronRight, Radio } from 'lucide-react';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'TV Goiânia • Vídeos Oficiais da Prefeitura de Goiânia',
  description:
    'Assista às reportagens, pronunciamentos, campanhas de saúde, obras e transmissões ao vivo da Prefeitura Municipal de Goiânia.',
  openGraph: {
    type: 'website',
    title: 'TV Goiânia • Canal de Vídeos da Prefeitura',
    description: 'Comunicação audiovisual oficial do município de Goiânia.',
    url: 'https://goiania.go.gov.br/videos',
    siteName: 'Prefeitura de Goiânia',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Vídeos Goiânia' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TV Goiânia • Canal de Vídeos da Prefeitura',
    description: 'Comunicação audiovisual oficial do município de Goiânia.',
    images: ['/og-image.png'],
  },
};

export default function VideosPage() {
  const videoGalleryJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'TV Goiânia • Acervo de Vídeos',
    itemListElement: OFFICIAL_GOIANIA_VIDEOS.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'VideoObject',
        name: typeof item.title === 'string' ? item.title : item.title.rendered,
        description: typeof item.description === 'string' ? item.description : item.description?.rendered,
        thumbnailUrl: [item.thumbnailUrl || getYoutubeThumbnailUrl(item.youtubeId || '')],
        embedUrl: getYoutubeEmbedUrl(item.youtubeId || ''),
        uploadDate: item.date,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGalleryJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        <nav className="text-xs text-slate-500 flex items-center gap-2">
          <Link href="/" className="hover:text-[#f36e22] transition-colors">
            Início
          </Link>
          <span>/</span>
          <span className="text-[#f36e22] font-semibold">TV Goiânia & Vídeos</span>
        </nav>

        {/* Featured Interactive Player Section */}
        <VideoSection />

        {/* Live Broadcast Fast Banner */}
        <div className="bg-[#fff1ec] border border-[#f36e22]/20 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-600 flex items-center justify-center shrink-0">
              <Radio className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-[#002e47]">
                Transmissão das Sessões e Coletivas Oficiais
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Acompanhe as sessões públicas, audiências e pronunciamentos ao vivo do município.
              </p>
            </div>
          </div>

          <Link
            href="/transmissao-das-sessoes"
            className="inline-flex items-center gap-2 bg-[#002e47] hover:bg-[#003d5c] text-white px-5 py-2.5 rounded-full text-xs font-bold transition-colors whitespace-nowrap shadow-sm"
          >
            <span>Acessar Transmissões</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Complete Curated Video Gallery with Real Verified YouTube Embeds */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b-2 border-slate-200 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-7 bg-[#f36e22] rounded-full"></div>
              <h2 className="text-2xl font-extrabold text-[#002e47]">
                Acervo de Vídeos Oficiais
              </h2>
            </div>
            <a
              href="https://www.youtube.com/user/PrefeituraDeGoiania"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#f36e22] hover:underline flex items-center gap-1"
            >
              <span>Canal do YouTube</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {OFFICIAL_GOIANIA_VIDEOS.map((vid) => {
              const titleText = typeof vid.title === 'string' ? vid.title : vid.title.rendered;
              const descText = typeof vid.description === 'string' ? vid.description : vid.description?.rendered;
              const embedUrl = getYoutubeEmbedUrl(vid.youtubeId || '');

              return (
                <div
                  key={vid.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div className="relative w-full aspect-video bg-black">
                    <iframe
                      src={embedUrl}
                      title={titleText}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold text-[#f36e22] uppercase tracking-wider bg-[#fff1ec] px-2.5 py-0.5 rounded-md inline-block">
                          {vid.category}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">
                          {vid.duration}
                        </span>
                      </div>
                      <h3 className="font-extrabold text-base text-[#002e47] leading-snug">
                        {titleText}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                        {descText}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                      <Link
                        href={`/video/${vid.slug}`}
                        className="text-[#002e47] hover:text-[#f36e22] flex items-center gap-1"
                      >
                        <span>Ver detalhes do vídeo</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>

                      <a
                        href={`https://www.youtube.com/watch?v=${vid.youtubeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#f36e22] hover:underline flex items-center gap-1"
                      >
                        <span>YouTube</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
