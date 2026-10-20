import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  getYoutubeEmbedUrl,
  getYoutubeThumbnailUrl,
  OFFICIAL_GOIANIA_VIDEOS,
} from '@/lib/youtube/youtube';
import {
  Radio,
  Calendar,
  Clock,
  ExternalLink,
  Play,
  Film,
  Building,
  CheckCircle,
  FileText,
} from 'lucide-react';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Transmissão das Sessões e Audiências Públicas • Prefeitura de Goiânia',
  description:
    'Acompanhe ao vivo ou reveja as transmissões oficiais das audiências públicas, coletivas de imprensa e sessões institucionais da Prefeitura de Goiânia.',
  openGraph: {
    type: 'video.other',
    title: 'Transmissão Oficial das Sessões • Prefeitura de Goiânia',
    description: 'Transmissão ao vivo e arquivo de sessões públicas da capital de Goiás.',
    url: 'https://goiania.go.gov.br/transmissao-das-sessoes',
    siteName: 'Prefeitura de Goiânia',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Transmissão das Sessões' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Transmissão das Sessões • Prefeitura de Goiânia',
    description: 'Acompanhe as sessões e coletivas de imprensa oficiais de Goiânia.',
    images: ['/og-image.png'],
  },
};

const LIVE_VIDEO_ID = 'CYH6QxNDvPQ';

const UPCOMING_SESSIONS = [
  {
    id: 1,
    titulo: 'Audiência Pública: Prestação de Contas do 2º Quadrimestre',
    orgao: 'Secretaria Municipal de Finanças • Sefin',
    data: 'Quinta-feira, 22 de Outubro',
    horario: '14h30',
    local: 'Plenário do Paço Municipal',
  },
  {
    id: 2,
    titulo: 'Apresentação do Plano de Drenagem e Infraestrutura Urbana',
    orgao: 'Secretaria Municipal de Infraestrutura Urbana • Seinfra',
    data: 'Segunda-feira, 26 de Outubro',
    horario: '09h00',
    local: 'Auditório Jaime Câmara',
  },
  {
    id: 3,
    titulo: 'Conferência Municipal de Saúde: Expansão da Atenção Primária',
    orgao: 'Secretaria Municipal de Saúde • SMS',
    data: 'Quarta-feira, 28 de Outubro',
    horario: '10h00',
    local: 'Transmissão Ao Vivo pelo Canal Oficial',
  },
];

export default function TransmissaoDasSessoesPage() {
  const embedUrl = getYoutubeEmbedUrl(LIVE_VIDEO_ID, { enablejsapi: 1, modestbranding: 1, rel: 0 });
  const thumbUrl = getYoutubeThumbnailUrl(LIVE_VIDEO_ID);

  const videoJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: 'Transmissão Oficial das Sessões e Coletivas da Prefeitura de Goiânia',
    description: 'Canal oficial de transmissão ao vivo e acervo das audiências públicas e sessões da capital.',
    thumbnailUrl: [thumbUrl],
    embedUrl: embedUrl,
    uploadDate: '2026-10-20T10:00:00Z',
    publisher: {
      '@type': 'GovernmentOrganization',
      name: 'Prefeitura Municipal de Goiânia',
      logo: {
        '@type': 'ImageObject',
        url: 'https://goiania.go.gov.br/brasao.png',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Breadcrumb */}
        <nav className="text-xs text-slate-500 flex items-center gap-2">
          <Link href="/" className="hover:text-[#f36e22] transition-colors">
            Início
          </Link>
          <span>/</span>
          <Link href="/videos" className="hover:text-[#f36e22] transition-colors">
            Vídeos
          </Link>
          <span>/</span>
          <span className="text-[#002e47] font-semibold">Transmissão das Sessões</span>
        </nav>

        {/* Header Banner */}
        <div className="border-b-2 border-slate-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#f36e22] text-xs font-bold uppercase tracking-wider mb-1">
              <Radio className="w-4 h-4 text-red-500 animate-pulse" />
              <span>Transmissões Institucionais & Sessões Ao Vivo</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#002e47] tracking-tight">
              Transmissão das Sessões
            </h1>
            <p className="text-sm text-slate-600 mt-2 max-w-2xl">
              Acompanhe com total transparência as audiências públicas, coletivas da administração e sessões deliberativas da Prefeitura Municipal de Goiânia.
            </p>
          </div>

          <a
            href="https://www.youtube.com/user/PrefeituraDeGoiania"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#f36e22] hover:bg-[#d95b16] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors shadow-sm self-start md:self-auto"
          >
            <span>Canal do YouTube</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Main Live Stream Player */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 border border-red-200 text-xs font-extrabold uppercase px-3 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block"></span>
                  Transmissão Oficial
                </span>
                <span className="text-xs text-slate-500">
                  Canal Institucional da Prefeitura de Goiânia
                </span>
              </div>

              {/* YouTube Player */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black border-2 border-slate-200">
                <iframe
                  src={embedUrl}
                  title="Transmissão Oficial das Sessões"
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>

              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#002e47]">
                  Sessão Oficial e Pronunciamentos da Administração
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  As transmissões em tempo real garantem o pleno cumprimento dos princípios constitucionais de publicidade e transparência ativa da gestão pública. Todo o material permanece arquivado para consulta posterior dos cidadãos e dos órgãos de controle social.
                </p>
              </div>
            </div>
          </div>

          {/* Agenda & Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
              <div className="flex items-center gap-2 text-[#002e47] font-extrabold text-base border-b border-slate-100 pb-3">
                <Calendar className="w-4 h-4 text-[#f36e22]" />
                <span>Próximas Sessões Agendadas</span>
              </div>

              <div className="space-y-4">
                {UPCOMING_SESSIONS.map((sessao) => (
                  <div
                    key={sessao.id}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2"
                  >
                    <span className="text-[10px] font-bold text-[#f36e22] uppercase tracking-wide block">
                      {sessao.orgao}
                    </span>
                    <h3 className="font-bold text-xs text-[#002e47] leading-snug">
                      {sessao.titulo}
                    </h3>
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-1">
                      <div className="flex items-center gap-1 font-semibold text-slate-700">
                        <Calendar className="w-3 h-3 text-[#f36e22]" />
                        <span>{sessao.data}</span>
                      </div>
                      <div className="flex items-center gap-1 font-semibold text-slate-700">
                        <Clock className="w-3 h-3 text-[#f36e22]" />
                        <span>{sessao.horario}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Video Highlights */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-[#002e47] font-extrabold text-base border-b border-slate-100 pb-3">
                <Film className="w-4 h-4 text-[#f36e22]" />
                <span>Últimos Vídeos Publicados</span>
              </div>

              <div className="space-y-3">
                {OFFICIAL_GOIANIA_VIDEOS.slice(0, 3).map((item) => {
                  const itemTitle = typeof item.title === 'string' ? item.title : item.title.rendered;
                  return (
                    <Link
                      key={item.id}
                      href={`/video/${item.slug}`}
                      className="block group text-xs text-[#002e47] hover:text-[#f36e22] font-semibold py-1 border-b border-slate-100 last:border-0"
                    >
                      &bull; {itemTitle}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
