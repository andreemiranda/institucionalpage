'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, ExternalLink, Video, CheckCircle2, ChevronRight } from 'lucide-react';
import {
  OFFICIAL_GOIANIA_VIDEOS,
  getYoutubeEmbedUrl,
  getYoutubeThumbnailUrl,
  VideoPost,
} from '@/lib/youtube/youtube';

export function VideoSection() {
  const [activeVideo, setActiveVideo] = useState<VideoPost>(OFFICIAL_GOIANIA_VIDEOS[0]);

  const embedUrl = getYoutubeEmbedUrl(activeVideo.youtubeId || 'd9z6Cq2HD_4');

  return (
    <div className="bg-gradient-to-br from-[#002e47] to-[#003856] text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-white/10">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 border-b border-white/10 pb-6">
        <div>
          <span className="text-[#f36e22] text-xs font-extrabold uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
            <Video className="w-4 h-4 text-[#fff20c]" />
            Comunicação & Multimídia Oficial
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Goiânia em Vídeo
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Acompanhe as principais entregas, obras, mutirões e ações da Prefeitura de Goiânia em audiovisual.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/videos"
            className="text-xs font-bold text-white hover:text-[#fff20c] transition-colors flex items-center gap-1 mr-2"
          >
            <span>Ver todos os vídeos</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
          <a
            href="https://www.youtube.com/user/PrefeituraDeGoiania"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#f36e22] hover:bg-[#f27730] text-white font-bold text-xs uppercase px-4 py-2.5 rounded-full transition-all shadow-md"
          >
            <span>Canal Oficial no YouTube</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Main Interactive Video Player & Playlist Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Active Player (Left 8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black border-2 border-white/15">
            <iframe
              key={activeVideo.youtubeId}
              src={embedUrl}
              title={typeof activeVideo.title === 'string' ? activeVideo.title : activeVideo.title.rendered}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>

          <div className="bg-white/5 p-4 sm:p-5 rounded-2xl border border-white/10 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="bg-[#f36e22] text-white text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full">
                {activeVideo.category || 'Goiânia em Ação'}
              </span>
              <span className="text-xs text-[#fff20c] font-semibold">
                Duração: {activeVideo.duration || '03:45'}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
              {typeof activeVideo.title === 'string' ? activeVideo.title : activeVideo.title.rendered}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {typeof activeVideo.description === 'string' ? activeVideo.description : activeVideo.description?.rendered}
            </p>
            <div className="pt-2">
              <Link
                href={`/video/${activeVideo.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#fff20c] hover:underline"
              >
                <span>Assistir em página dedicada</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Video Playlist Selector (Right 4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1">
            Selecione para Reproduzir:
          </span>

          <div className="space-y-3">
            {OFFICIAL_GOIANIA_VIDEOS.map((item) => {
              const isSelected = item.id === activeVideo.id;
              const titleText = typeof item.title === 'string' ? item.title : item.title.rendered;
              const thumb = item.thumbnailUrl || getYoutubeThumbnailUrl(item.youtubeId || '');

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveVideo(item)}
                  className={`w-full text-left p-3 rounded-2xl transition-all flex items-center gap-3 border ${
                    isSelected
                      ? 'bg-white/15 border-[#f36e22] shadow-lg ring-1 ring-[#f36e22]'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="relative w-20 h-14 rounded-xl overflow-hidden bg-black shrink-0 border border-white/20">
                    <Image
                      src={thumb}
                      alt={titleText}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      {isSelected ? (
                        <CheckCircle2 className="w-5 h-5 text-[#f36e22]" />
                      ) : (
                        <Play className="w-4 h-4 fill-white text-white ml-0.5" />
                      )}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-[#fff20c] uppercase tracking-wide block mb-0.5">
                      {item.category}
                    </span>
                    <h4 className="font-bold text-xs text-white line-clamp-2 leading-snug">
                      {titleText}
                    </h4>
                    <span className="text-[10px] text-slate-300 block mt-1">
                      {item.duration} &bull; YouTube Oficial
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-2">
            <Link
              href="/transmissao-das-sessoes"
              className="text-xs font-semibold text-[#fff20c] hover:underline flex items-center gap-1.5"
            >
              <span>Transmissão das Sessões e Coletivas</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
