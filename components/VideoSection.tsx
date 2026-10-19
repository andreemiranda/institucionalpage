'use client';

import React, { useState } from 'react';
import { Play, ExternalLink, Video, CheckCircle2 } from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  category: string;
  description: string;
  duration: string;
  youtubeId: string;
}

const OFFICIAL_VIDEOS: VideoItem[] = [
  {
    id: '1',
    title: 'Modernização e Vistoria nas Unidades de Saúde (UPAs e Cais)',
    category: 'Saúde Municipal',
    description:
      'Ações da Secretaria Municipal de Saúde de Goiânia para ampliação dos serviços de raio-X e urgência 24 horas na capital.',
    duration: '03:45',
    youtubeId: 'kXRw_6y2W84',
  },
  {
    id: '2',
    title: 'Programa Goiânia em Ação: Obras e Asfalto Novo nos Bairros',
    category: 'Infraestrutura Urbana',
    description:
      'Frentes de trabalho da Seinfra realizam recapeamento com asfalto quente e drenagem pluvial nas principais vias.',
    duration: '04:12',
    youtubeId: '3-7iP-c4QfM',
  },
  {
    id: '3',
    title: 'Educação Conectada: Robótica e Tecnologia nos CMEIs e Escolas',
    category: 'Educação & Futuro',
    description:
      'Distribuição de kits pedagógicos inovadores e laboratórios maker para crianças da rede pública de ensino.',
    duration: '02:58',
    youtubeId: '0k5iZ4-w8mQ',
  },
];

export function VideoSection() {
  const [activeVideo, setActiveVideo] = useState<VideoItem>(OFFICIAL_VIDEOS[0]);

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
              src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?rel=0&autoplay=0`}
              title={activeVideo.title}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>

          <div className="bg-white/5 p-4 sm:p-5 rounded-2xl border border-white/10 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="bg-[#f36e22] text-white text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full">
                {activeVideo.category}
              </span>
              <span className="text-xs text-[#fff20c] font-semibold">
                Duração: {activeVideo.duration}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
              {activeVideo.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activeVideo.description}
            </p>
          </div>
        </div>

        {/* Video Playlist Selector (Right 4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1">
            Selecione para Reproduzir:
          </span>

          <div className="space-y-3">
            {OFFICIAL_VIDEOS.map((item) => {
              const isSelected = item.id === activeVideo.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveVideo(item)}
                  className={`w-full text-left p-3.5 rounded-2xl transition-all flex items-start gap-3 border ${
                    isSelected
                      ? 'bg-white/15 border-[#f36e22] shadow-lg ring-1 ring-[#f36e22]'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-[#002e47] border border-white/15 flex items-center justify-center shrink-0 mt-0.5 text-[#fff20c]">
                    {isSelected ? (
                      <CheckCircle2 className="w-5 h-5 text-[#f36e22]" />
                    ) : (
                      <Play className="w-4 h-4 fill-white ml-0.5 text-white" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-[#fff20c] uppercase tracking-wide block mb-0.5">
                      {item.category}
                    </span>
                    <h4 className="font-bold text-xs text-white line-clamp-2 leading-snug">
                      {item.title}
                    </h4>
                    <span className="text-[11px] text-slate-300 block mt-1">
                      {item.duration} &bull; YouTube Oficial
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-2">
            <a
              href="https://www.youtube.com/user/PrefeituraDeGoiania/videos"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[#fff20c] hover:underline flex items-center gap-1.5"
            >
              <span>Ver acervo completo no canal de vídeos</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
