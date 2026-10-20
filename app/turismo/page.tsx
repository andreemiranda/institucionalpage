import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Compass,
  MapPin,
  Camera,
  Trees,
  Utensils,
  ShoppingBag,
  ExternalLink,
  Calendar,
  Building,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { RenderHtml } from '@/components/RenderHtml';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Turismo em Goiânia • Roteiros, Parques e Patrimônio Art Déco',
  description:
    'Descubra os principais pontos turísticos, a maior coleção Art Déco do Brasil, parques verdes, a Feira Hippie e a gastronomia típica de Goiânia.',
  openGraph: {
    type: 'website',
    title: 'Turismo em Goiânia • Conheça a Capital mais Verde do Brasil',
    description:
      'Guia oficial de turismo da Prefeitura de Goiânia: Bosque dos Buritis, Parque Flamboyant, Feiras e circuito arquitetônico.',
    url: 'https://goiania.go.gov.br/turismo',
    siteName: 'Prefeitura de Goiânia',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Turismo em Goiânia' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Turismo em Goiânia • Capital de Goiás',
    description: 'Guia turístico oficial da Prefeitura de Goiânia.',
    images: ['/og-image.png'],
  },
};

const ATRACOES = [
  {
    id: 'bosque-buritis',
    nome: 'Bosque dos Buritis & Museu de Arte (MAG)',
    categoria: 'Natureza & Cultura',
    descricao:
      'Mais antigo patrimônio paisagístico de Goiânia, com 140 mil m², lagos com chafarizes, pistas de caminhada e a sede do Museu de Arte de Goiânia.',
    endereco: 'Setor Oeste • Entre Av. Assis Chateaubriand e Alameda dos Buritis',
    horario: 'Diariamente das 06h às 20h • Entrada Gratuita',
  },
  {
    id: 'feira-hippie',
    nome: 'Feira Hippie de Goiânia',
    categoria: 'Compras & Tradição',
    descricao:
      'A maior feira ao ar livre da América Latina, reunindo milhares de expositores de confecções, artesanato, moda e culinária goiana na revitalizada Praça do Trabalhador.',
    endereco: 'Praça do Trabalhador • Setor Norte Ferroviário',
    horario: 'Sexta-feira a Domingo',
  },
  {
    id: 'art-deco',
    nome: 'Circuito Histórico Art Déco',
    categoria: 'Patrimônio Nacional',
    descricao:
      'Conjunto urbano tombado pelo IPHAN com mais de 20 prédios e monumentos erguidos nas décadas de 30 e 40, incluindo o Teatro Goiânia, Palácio das Esmeraldas, Estação Ferroviária e Torre do Relógio.',
    endereco: 'Avenida Goiás e Praça Cívica • Centro',
    horario: 'Visitação Livre',
  },
  {
    id: 'parque-vaca-brava',
    nome: 'Parque Vaca Brava (Sulivan Silvestre)',
    categoria: 'Parques Urbanos',
    descricao:
      'Um dos cartões-postais mais famosos de Goiânia, com lago central, pista de cooper arborizada e cercado por opções gastronômicas renomadas.',
    endereco: 'Setor Bueno • Entre Av. T-10 e T-5',
    horario: 'Aberto 24 horas • Gratuito',
  },
  {
    id: 'parque-flamboyant',
    nome: 'Parque Flamboyant (Lourival Louza)',
    categoria: 'Lazer e Família',
    descricao:
      'Espaço verde com 125 mil m², dois lagos com fonte luminosa, pista para corrida, ciclovia, playground infantil e mirantes para o pôr do sol.',
    endereco: 'Jardim Goiás • Rua 15',
    horario: 'Aberto 24 horas • Gratuito',
  },
  {
    id: 'mercado-central',
    nome: 'Mercado Central de Goiânia',
    categoria: 'Gastronomia & Tradição',
    descricao:
      'Ponto de encontro da autêntica comida goiana: empadas tradicionais, doces caseiros, queijos, pimentas, ervas medicinais e peças de artesanato regional.',
    endereco: 'Rua 3, nº 322 • Centro',
    horario: 'Segunda a Sábado das 07h às 18h • Domingo das 07h às 12h',
  },
];

export default function TurismoPage() {
  return (
    <div className="space-y-12 pb-16">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-[#002e47] via-[#003856] to-[#00473E] text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <nav className="text-xs text-white/70 flex items-center gap-2">
            <Link href="/" className="hover:text-[#fff20c] transition-colors">
              Início
            </Link>
            <span>/</span>
            <span className="text-[#fff20c] font-semibold">Turismo & Cultura</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <span className="bg-[#f36e22] text-white text-xs font-black uppercase px-3 py-1 rounded-full shadow-sm inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Capital Verde do Brasil
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Descubra Goiânia: Natureza, Arquitetura e Tradição
            </h1>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              Com mais de 90 m² de área verde por habitante, Goiânia une a beleza dos seus parques urbanos à riqueza histórica do acervo Art Déco e à hospitalidade acolhedora do povo goiano.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Official Tourism Video Feature */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold text-[#f36e22] uppercase tracking-wider block">
                Vídeo Oficial do Município
              </span>
              <h2 className="text-2xl font-black text-[#002e47]">
                Viva Goiânia • Cidade de Parques e Encontros
              </h2>
            </div>
            <a
              href="https://www.youtube.com/user/PrefeituraDeGoiania"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#f36e22] hover:underline flex items-center gap-1"
            >
              <span>Ver mais vídeos no canal oficial</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-md bg-black">
            <iframe
              src="https://www.youtube-nocookie.com/embed/0k5iZ4-w8mQ?rel=0"
              title="Turismo e Parques de Goiânia"
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </section>

        {/* Top Tourist Attractions Grid */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 border-b-2 border-slate-200 pb-3">
            <div className="w-2.5 h-7 bg-[#f36e22] rounded-full"></div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002e47]">
              Principais Roteiros e Pontos Turísticos
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ATRACOES.map((att) => (
              <div
                key={att.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <span className="text-[11px] font-bold text-[#f36e22] bg-[#fff1ec] px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                    {att.categoria}
                  </span>
                  <h3 className="font-extrabold text-lg text-[#002e47] leading-snug">
                    {att.nome}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {att.descricao}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-500">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#f36e22] shrink-0 mt-0.5" />
                    <span>{att.endereco}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{att.horario}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Gastronomy & Culture Callout */}
        <section className="bg-gradient-to-br from-[#003856] to-[#002e47] text-white rounded-3xl p-8 sm:p-12 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-[#fff20c] text-xs font-bold uppercase tracking-widest block">
                Gastronomia Goiana
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Sabores Únicos do Coração do Brasil
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Experimente o arroz com pequi, a galinhada caipira, o autêntico empadão goiano, a pamonha doce e salgada e os sucos com frutos nativos do Cerrado nos tradicionais mercados municipais e restaurantes da capital.
              </p>
              <div className="pt-2">
                <Link
                  href="/noticias"
                  className="inline-flex items-center gap-2 bg-[#f36e22] hover:bg-[#f27730] text-white font-bold text-xs uppercase px-5 py-3 rounded-full transition-colors"
                >
                  <span>Agenda Cultural da Cidade</span>
                </Link>
              </div>
            </div>

            <div className="bg-white/10 p-6 rounded-2xl border border-white/15 space-y-3">
              <h4 className="font-extrabold text-base text-[#fff20c]">
                Informações ao Turista:
              </h4>
              <ul className="space-y-2.5 text-xs text-white/90">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Aeroporto Internacional Santa Genoveva (GYN)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Terminal Rodoviário Central de Goiânia</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Agetul • Agência Municipal de Turismo e Lazer</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Central de Atendimento ao Visitante: 156</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
