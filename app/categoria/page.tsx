import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getCategories } from '@/lib/wp';
import {
  Folder,
  ChevronRight,
  Newspaper,
  HeartPulse,
  GraduationCap,
  Hammer,
  Coins,
  Trees,
  Car,
  Palette,
  Home,
  Building,
} from 'lucide-react';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Editorias e Assuntos • Notícias da Prefeitura de Goiânia',
  description:
    'Navegue pelas editorias oficiais de comunicação da Prefeitura de Goiânia: Saúde, Educação, Obras, Finanças, Meio Ambiente, Trânsito e Cultura.',
  openGraph: {
    type: 'website',
    title: 'Editorias e Assuntos • Notícias da Prefeitura de Goiânia',
    description:
      'Explore as notícias da capital divididas por áreas de atuação e secretarias municipais.',
    url: 'https://goiania.go.gov.br/categoria',
    siteName: 'Prefeitura de Goiânia',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Categorias de Notícias de Goiânia' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Editorias e Assuntos • Prefeitura de Goiânia',
    description: 'Navegue pelas matérias organizadas por áreas de atendimento ao cidadão.',
    images: ['/og-image.png'],
  },
};

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  saude: <HeartPulse className="w-5 h-5 text-red-500" />,
  educacao: <GraduationCap className="w-5 h-5 text-blue-500" />,
  infraestrutura: <Hammer className="w-5 h-5 text-amber-500" />,
  obras: <Hammer className="w-5 h-5 text-amber-500" />,
  fazenda: <Coins className="w-5 h-5 text-emerald-500" />,
  economia: <Coins className="w-5 h-5 text-emerald-500" />,
  'meio-ambiente': <Trees className="w-5 h-5 text-green-500" />,
  transito: <Car className="w-5 h-5 text-sky-500" />,
  'cultura-e-lazer': <Palette className="w-5 h-5 text-purple-500" />,
  cultura: <Palette className="w-5 h-5 text-purple-500" />,
  habitacao: <Home className="w-5 h-5 text-indigo-500" />,
  governo: <Building className="w-5 h-5 text-teal-500" />,
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  saude: 'Campanhas de vacinação, mutirões de exames, UPAs, Cais e atendimentos da rede pública municipal.',
  educacao: 'Matrículas, obras em CMEIs, kits pedagógicos, tecnologia em sala de aula e formação de professores.',
  infraestrutura: 'Recapeamento asfáltico, drenagem pluvial, contenção de encostas e manutenção urbana.',
  obras: 'Grandes intervenções estruturantes, pontes, viadutos e pavimentação de bairros da capital.',
  fazenda: 'IPTU, ITU, certidões negativas, incentivos fiscais, nota fiscal eletrônica e justiça tributária.',
  economia: 'Atração de investimentos, simplificação para abertura de empresas e geração de empregos.',
  'meio-ambiente': 'Preservação de nascentes, arborização urbana, parques municipais e licenciamento ambiental.',
  transito: 'Sinalização, corredores preferenciais de transporte coletivo, semáforos inteligentes e fiscalização.',
  'cultura-e-lazer': 'Festivais, espetáculos teatrais, exposições do patrimônio Art Déco e eventos nas praças.',
  cultura: 'Apoio à produção artística local, Lei de Incentivo à Cultura e preservação da memória da cidade.',
  habitacao: 'Regularização fundiária, entrega de títulos de posse e programas de moradia digna.',
  governo: 'Atos oficiais, gestão integrada, parcerias institucionais e zeladoria da capital.',
};

export default async function CategoriasArchivePage() {
  const categories = await getCategories();

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Editorias e Assuntos da Prefeitura de Goiânia',
    description: 'Catálogo de editorias e seções temáticas de notícias da Prefeitura Municipal de Goiânia.',
    url: 'https://goiania.go.gov.br/categoria',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: categories.map((cat, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: cat.name,
        url: `https://goiania.go.gov.br/categoria/${cat.slug}`,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-slate-500 flex items-center gap-2">
          <Link href="/" className="hover:text-[#f36e22] transition-colors">
            Início
          </Link>
          <span>/</span>
          <Link href="/noticias" className="hover:text-[#f36e22] transition-colors">
            Notícias
          </Link>
          <span>/</span>
          <span className="text-[#002e47] font-semibold">Assuntos & Editorias</span>
        </nav>

        {/* Header Section */}
        <div className="border-b-2 border-slate-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#f36e22] text-xs font-bold uppercase tracking-wider mb-1">
              <Folder className="w-4 h-4" />
              <span>Acervo de Comunicação Oficial</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#002e47] tracking-tight">
              Editorias e Assuntos
            </h1>
            <p className="text-sm text-slate-600 mt-2 max-w-2xl">
              Navegue pelas matérias, reportagens e comunicados de imprensa da Prefeitura de Goiânia organizados pelas principais áreas de atuação da administração pública.
            </p>
          </div>

          <Link
            href="/noticias"
            className="inline-flex items-center gap-2 bg-[#002e47] hover:bg-[#003d5c] text-white px-5 py-2.5 rounded-full text-xs font-bold transition-colors shadow-sm self-start md:self-auto"
          >
            <Newspaper className="w-3.5 h-3.5" />
            <span>Ver feed cronológico</span>
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const icon = CATEGORY_ICONS[cat.slug] || <Folder className="w-5 h-5 text-[#f36e22]" />;
            const description =
              CATEGORY_DESCRIPTIONS[cat.slug] ||
              `Acompanhe as últimas atualizações, comunicados oficiais e serviços da área de ${cat.name}.`;

            return (
              <Link
                key={cat.id}
                href={`/categoria/${cat.slug}`}
                className="group bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-[#f36e22]/50 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 group-hover:bg-[#fff1ec] flex items-center justify-center transition-colors">
                      {icon}
                    </div>
                    {cat.count > 0 && (
                      <span className="text-xs font-bold text-[#002e47] bg-slate-100 group-hover:bg-[#f36e22] group-hover:text-white px-3 py-1 rounded-full transition-colors">
                        {cat.count} matérias
                      </span>
                    )}
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-[#002e47] group-hover:text-[#f36e22] transition-colors">
                      {cat.name}
                    </h2>
                    <p className="text-xs text-slate-500 leading-relaxed mt-1 line-clamp-3">
                      {description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#002e47] group-hover:text-[#f36e22] transition-colors">
                  <span>Explorar publicações</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
