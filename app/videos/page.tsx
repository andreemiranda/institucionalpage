import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { VideoSection } from '@/components/VideoSection';
import { Video, ExternalLink, Play, Film } from 'lucide-react';

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
};

const EXTRA_VIDEOS = [
  {
    id: 'mutirao-cidade',
    titulo: 'Mutirões da Prefeitura: Atendimento Integrado nos Bairros',
    categoria: 'Ação Social',
    youtubeId: '0k5iZ4-w8mQ',
    descricao: 'Mais de 50 serviços municipais levados aos fins de semana para perto da população.',
  },
  {
    id: 'parques-meioambiente',
    titulo: 'Goiânia Mais Verde: Preservação de Nascentes e Parques',
    categoria: 'Meio Ambiente',
    youtubeId: 'kXRw_6y2W84',
    descricao: 'Amma realiza o plantio de milhares de mudas nativas em áreas de conservação.',
  },
  {
    id: 'modernizacao-transito',
    titulo: 'Mobilidade Urbana e Novos Semáforos Inteligentes',
    categoria: 'Trânsito',
    youtubeId: '3-7iP-c4QfM',
    descricao: 'Tecnologia em tempo real sincroniza sinais e reduz tempo de espera nos corredores.',
  },
];

export default function VideosPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-[#f36e22] transition-colors">
          Início
        </Link>
        <span>/</span>
        <span className="text-[#f36e22] font-semibold">TV Goiânia & Vídeos</span>
      </nav>

      {/* Featured Video Section */}
      <VideoSection />

      {/* Additional Curated Video Gallery */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b-2 border-slate-200 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-7 bg-[#f36e22] rounded-full"></div>
            <h2 className="text-2xl font-extrabold text-[#002e47]">
              Mais Destaques em Vídeo
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EXTRA_VIDEOS.map((vid) => (
            <div
              key={vid.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-lg transition-all flex flex-col"
            >
              <div className="relative w-full aspect-video bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${vid.youtubeId}?rel=0`}
                  title={vid.titulo}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-[#f36e22] uppercase tracking-wider bg-[#fff1ec] px-2.5 py-0.5 rounded-md inline-block">
                    {vid.categoria}
                  </span>
                  <h3 className="font-extrabold text-base text-[#002e47] leading-snug">
                    {vid.titulo}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {vid.descricao}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
