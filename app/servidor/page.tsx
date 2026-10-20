import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  UserCheck,
  FileText,
  DollarSign,
  ShieldCheck,
  ExternalLink,
  GraduationCap,
  Calendar,
  Lock,
} from 'lucide-react';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Portal do Servidor Municipal • Holerite e Benefícios • Goiânia',
  description:
    'Área exclusiva para servidores públicos municipais de Goiânia: Contracheque online, GOIANIAPREV, Informe de Rendimentos e Diário Oficial.',
  openGraph: {
    type: 'website',
    title: 'Portal do Servidor • Prefeitura de Goiânia',
    description: 'Acesse contracheques, informe de rendimentos e serviços funcionais.',
    url: 'https://goiania.go.gov.br/servidor',
    siteName: 'Prefeitura de Goiânia',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Portal do Servidor Goiânia' }],
  },
};

const SERVIDOR_SERVICES = [
  {
    id: 'holerite',
    titulo: 'Contracheque Online (Holerite)',
    descricao:
      'Emissão do comprovante de pagamento mensal e folha suplementar com validação por código digital.',
    link: 'https://servidor.goiania.go.gov.br/',
    destaque: true,
  },
  {
    id: 'rendimentos',
    titulo: 'Comprovante de Rendimentos (IRPF)',
    descricao:
      'Informe anual de rendimentos pagos e de retenções na fonte para declaração do Imposto de Renda.',
    link: 'https://servidor.goiania.go.gov.br/rendimentos/',
    destaque: false,
  },
  {
    id: 'goianiaprev',
    titulo: 'GOIANIAPREV • Previdência Municipal',
    descricao:
      'Acompanhamento de aposentadorias, certidão de tempo de contribuição (CTC) e benefícios previdenciários.',
    link: 'https://goianiaprev.go.gov.br/',
    destaque: false,
  },
  {
    id: 'dom',
    titulo: 'Diário Oficial do Município (DOM)',
    descricao:
      'Publicações de atos de nomeação, progressão funcional, licenças-prêmio e decretos do Poder Executivo.',
    link: 'https://dom.goiania.go.gov.br/',
    destaque: false,
  },
  {
    id: 'escola-governo',
    titulo: 'Escola de Governo de Goiânia',
    descricao:
      'Cursos de capacitação profissional, treinamentos corporativos e aperfeiçoamento da gestão pública municipal.',
    link: 'https://www.goiania.go.gov.br/administracao/',
    destaque: false,
  },
  {
    id: 'recesso-ferias',
    titulo: 'Escalas de Férias e Licenças',
    descricao:
      'Consulta de períodos aquisitivos de férias regulamentares e requerimentos funcionais junto à Semad.',
    link: 'https://servidor.goiania.go.gov.br/',
    destaque: false,
  },
];

export default function ServidorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-[#f36e22] transition-colors">
          Início
        </Link>
        <span>/</span>
        <span className="text-[#f36e22] font-semibold">Portal do Servidor</span>
      </nav>

      <div className="bg-gradient-to-r from-[#002e47] via-[#003856] to-[#00473E] text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-white/10 space-y-4">
        <span className="text-[#fff20c] text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2">
          <UserCheck className="w-4 h-4" />
          Servidor Público Municipal
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Portal do Servidor de Goiânia
        </h1>
        <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed">
          Canal exclusivo para servidores ativos, aposentados e pensionistas da Prefeitura de Goiânia consultarem contracheques, informe de rendimentos e atos funcionais com segurança.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVIDOR_SERVICES.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-2xl p-6 border shadow-xs hover:shadow-md transition-all flex flex-col justify-between ${
              item.destaque ? 'border-[#f36e22] ring-1 ring-[#f36e22]/20' : 'border-slate-200'
            }`}
          >
            <div className="space-y-3">
              {item.destaque && (
                <span className="text-[10px] font-black uppercase tracking-wider text-white bg-[#f36e22] px-2.5 py-0.5 rounded-full inline-block">
                  Mais Acessado
                </span>
              )}
              <h3 className="font-extrabold text-lg text-[#002e47] leading-snug">
                {item.titulo}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {item.descricao}
              </p>
            </div>

            <div className="pt-6 mt-4 border-t border-slate-100">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#002e47] hover:bg-[#f36e22] text-white py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <span>Acessar Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
