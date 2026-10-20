import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FileCheck2,
  Calendar,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
} from 'lucide-react';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Concursos e Seleções Públicas • Prefeitura de Goiânia',
  description:
    'Editais de concursos públicos, processos seletivos simplificados (PSS) e convocações da Prefeitura Municipal de Goiânia.',
  openGraph: {
    type: 'website',
    title: 'Concursos Públicos • Prefeitura de Goiânia',
    description: 'Editais, convocações e processos seletivos abertos no município.',
    url: 'https://goiania.go.gov.br/concursos',
    siteName: 'Prefeitura de Goiânia',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Concursos Goiânia' }],
  },
};

const CONCURSOS_DATA = [
  {
    id: 'sme-2026',
    titulo: 'Processo Seletivo Simplificado • Secretaria de Educação (SME)',
    status: 'Inscrições Abertas',
    vagas: '1.200 vagas',
    cargos: 'Professores de Educação Infantil, Pedagogos e Apoio Educacional',
    dataLimite: '30 de Novembro de 2026',
    link: 'https://concursos.goiania.go.gov.br/',
  },
  {
    id: 'sms-saude-2026',
    titulo: 'Concurso Público da Saúde Municipal • SMS Goiânia',
    status: 'Fase de Convocação',
    vagas: '850 vagas',
    cargos: 'Médicos Clínicos, Enfermeiros, Fisioterapeutas e Técnicos em Radiologia',
    dataLimite: 'Convocação Contínua',
    link: 'https://concursos.goiania.go.gov.br/',
  },
  {
    id: 'gcm-guarda',
    titulo: 'Concurso Guarda Civil Metropolitana • AGCM Goiânia',
    status: 'Curso de Formação',
    vagas: '500 vagas',
    cargos: 'Guarda Civil Metropolitano 3ª Classe',
    dataLimite: 'Turma 2026',
    link: 'https://concursos.goiania.go.gov.br/',
  },
];

export default function ConcursosPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-[#f36e22] transition-colors">
          Início
        </Link>
        <span>/</span>
        <span className="text-[#f36e22] font-semibold">Concursos e Seleções</span>
      </nav>

      <div className="bg-gradient-to-r from-[#002e47] via-[#003856] to-[#00473E] text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-white/10 space-y-4">
        <span className="text-[#fff20c] text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2">
          <FileCheck2 className="w-4 h-4" />
          Oportunidades no Serviço Público
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Concursos e Processos Seletivos
        </h1>
        <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed">
          Acompanhe editais vigentes, cronogramas de provas, homologações e convocações oficiais para cargos da Prefeitura Municipal de Goiânia.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CONCURSOS_DATA.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full inline-block">
                {item.status}
              </span>
              <h3 className="font-extrabold text-lg text-[#002e47] leading-snug">
                {item.titulo}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Cargos:</strong> {item.cargos}
              </p>
              <div className="text-xs text-slate-500 space-y-1 pt-2">
                <div>
                  <strong>Total de Vagas:</strong> {item.vagas}
                </div>
                <div>
                  <strong>Etapa:</strong> {item.dataLimite}
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-slate-100">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#002e47] hover:bg-[#f36e22] text-white py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <span>Acessar Edital & Inscrições</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
