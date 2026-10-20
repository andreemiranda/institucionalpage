import React from 'react';
import Link from 'next/link';
import { SECRETARIAS_LIST } from '@/lib/data';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  User, 
  ExternalLink, 
  Landmark
} from 'lucide-react';

export const revalidate = 60;

export const metadata = {
  title: 'Estrutura Organizacional • Prefeitura de Goiânia',
  description: 'Conheça todas as secretarias municipais, agências, fundações e órgãos da administração pública de Goiânia.',
};

export default function EstruturaPage() {
  const secretarias = SECRETARIAS_LIST.filter(s => s.tipo === 'secretaria');
  const agenciasEOrgaos = SECRETARIAS_LIST.filter(s => s.tipo !== 'secretaria');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-[#f36e22] transition-colors">Início</Link>
        <span>/</span>
        <span className="text-[#002e47] font-semibold">Estrutura Organizacional</span>
      </nav>

      {/* Header */}
      <div className="border-b-2 border-slate-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#f36e22] text-xs font-bold uppercase tracking-wider mb-1">
            <Landmark className="w-4 h-4" />
            <span>Administração Pública Municipal</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#002e47] tracking-tight">
            Estrutura Organizacional
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl">
            Informações sobre o Gabinete do Prefeito, Secretarias Municipais, Agências Reguladoras e Empresas Públicas que compõem a gestão de Goiânia.
          </p>
        </div>

        <div className="bg-[#fff1ec] text-[#f36e22] px-4 py-2 rounded-xl text-xs font-bold border border-[#f36e22]/20 self-start md:self-auto">
          {SECRETARIAS_LIST.length} Órgãos e Entidades
        </div>
      </div>

      {/* Gabinete do Prefeito Card */}
      <section className="bg-gradient-to-br from-[#002e47] to-[#003856] text-white rounded-2xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[#f36e22] text-xs font-bold uppercase tracking-wider">
              Poder Executivo Municipal
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Gabinete do Prefeito
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Órgão central de representação política, deliberação governamental e coordenação executiva de todas as políticas públicas do Município de Goiânia.
            </p>
          </div>

          <div className="bg-white/10 p-5 rounded-xl border border-white/10 space-y-2 text-xs text-slate-200 min-w-[280px]">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#f36e22] shrink-0" />
              <span>Paço Municipal - 5º Andar</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#f36e22] shrink-0" />
              <span>(62) 3524-3000</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#f36e22] shrink-0" />
              <span>Segunda a Sexta: 08h às 18h</span>
            </div>
          </div>
        </div>
      </section>

      {/* Secretarias Municipais */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
          <div className="w-2.5 h-6 bg-[#f36e22] rounded-full"></div>
          <h2 className="text-xl md:text-2xl font-extrabold text-[#002e47]">
            Secretarias Municipais
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {secretarias.map((sec) => (
            <div
              key={sec.id}
              id={sec.id}
              className="bg-white rounded-2xl p-6 shadow-xs hover:shadow-md border border-slate-200 space-y-4 flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="bg-[#002e47] text-white text-xs font-extrabold px-3 py-1 rounded-md">
                    {sec.sigla}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">Secretaria</span>
                </div>

                <h3 className="text-lg font-bold text-[#002e47] leading-snug">
                  {sec.nome}
                </h3>

                {sec.titular && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-2 font-medium">
                    <User className="w-3.5 h-3.5 text-[#f36e22]" />
                    <span>{sec.cargo}: <strong>{sec.titular}</strong></span>
                  </div>
                )}

                <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                  {sec.descricao}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#f36e22] shrink-0" />
                  <span>{sec.telefone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#f36e22] shrink-0" />
                  <span className="truncate">{sec.email}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#f36e22] shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{sec.endereco}</span>
                </div>

                {sec.siteUrl && (
                  <div className="pt-2">
                    <a
                      href={sec.siteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#f36e22] hover:underline"
                    >
                      <span>Acessar portal da {sec.sigla}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Agências e Outros Órgãos */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
          <div className="w-2.5 h-6 bg-[#f36e22] rounded-full"></div>
          <h2 className="text-xl md:text-2xl font-extrabold text-[#002e47]">
            Agências, Empresas Públicas e Autarquias
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {agenciasEOrgaos.map((org) => (
            <div
              key={org.id}
              id={org.id}
              className="bg-white rounded-2xl p-6 shadow-xs hover:shadow-md border border-slate-200 space-y-4 flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="bg-[#f36e22] text-white text-xs font-extrabold px-3 py-1 rounded-md">
                    {org.sigla}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 capitalize">{org.tipo}</span>
                </div>

                <h3 className="text-lg font-bold text-[#002e47] leading-snug">
                  {org.nome}
                </h3>

                {org.titular && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-2 font-medium">
                    <User className="w-3.5 h-3.5 text-[#f36e22]" />
                    <span>{org.cargo}: <strong>{org.titular}</strong></span>
                  </div>
                )}

                <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                  {org.descricao}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#f36e22] shrink-0" />
                  <span>{org.telefone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#f36e22] shrink-0" />
                  <span className="truncate">{org.email}</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#f36e22] shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{org.endereco}</span>
                </div>

                {org.siteUrl && (
                  <div className="pt-2">
                    <a
                      href={org.siteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#f36e22] hover:underline"
                    >
                      <span>Acessar portal da {org.sigla}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
