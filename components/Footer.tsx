'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  Clock,
  Building,
  FileText,
  HelpCircle,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#002e47] text-white pt-14 pb-8 border-t-4 border-[#f36e22] mt-auto">
      {/* 4-Color Accent Stripe above footer */}
      <div className="flex h-1.5 w-full -mt-14 mb-10">
        <div className="stripe yellow flex-1 bg-[#fff20c]"></div>
        <div className="stripe orange flex-1 bg-[#f36e22]"></div>
        <div className="stripe green flex-1 bg-[#114e23]"></div>
        <div className="stripe blue flex-1 bg-[#003c5c]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Brand Banner & Badges */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-10 border-b border-white/10">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center p-2 border border-[#f36e22]/40 shadow-inner group-hover:scale-105 transition-transform">
              <Image
                src="/brasao.svg"
                alt="Brasão Oficial de Goiânia"
                width={48}
                height={48}
                className="object-contain"
                priority
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  PREFEITURA DE <span className="text-[#f36e22]">GOIÂNIA</span>
                </span>
              </div>
              <p className="text-xs text-[#fff20c] font-semibold tracking-wider uppercase mt-0.5">
                Capital de Goiás • Portal Oficial do Município
              </p>
            </div>
          </Link>

          {/* Institutional Seals & Badges */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <a
              href="https://transparencia.goiania.go.gov.br"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#003856] hover:bg-[#00476e] text-white/90 hover:text-white px-3.5 py-2 rounded-xl border border-white/10 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-[#fff20c]" />
              <div className="text-left">
                <span className="block text-[10px] text-slate-300 uppercase leading-none">Portal</span>
                <span className="font-bold">Transparência</span>
              </div>
            </a>

            <a
              href="https://dom.goiania.go.gov.br"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#003856] hover:bg-[#00476e] text-white/90 hover:text-white px-3.5 py-2 rounded-xl border border-white/10 transition-colors"
            >
              <FileText className="w-4 h-4 text-[#f36e22]" />
              <div className="text-left">
                <span className="block text-[10px] text-slate-300 uppercase leading-none">Diário Oficial</span>
                <span className="font-bold">D.O.M. Goiânia</span>
              </div>
            </a>

            <Link
              href="/ouvidoria"
              className="flex items-center gap-2 bg-[#003856] hover:bg-[#00476e] text-white/90 hover:text-white px-3.5 py-2 rounded-xl border border-white/10 transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-emerald-400" />
              <div className="text-left">
                <span className="block text-[10px] text-slate-300 uppercase leading-none">Ouvidoria Geral</span>
                <span className="font-bold">Central 156</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-10 border-b border-white/10">
          {/* Column 1: Institutional Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#f36e22] pb-1 border-b border-white/10 flex items-center gap-2">
              <Building className="w-4 h-4" />
              <span>Sede Administrativa</span>
            </h4>

            <p className="text-xs text-white/80 leading-relaxed">
              <strong className="text-white block mb-1">Palácio das Campinas Venerando de Freitas Borges</strong>
              Paço Municipal: Av. do Cerrado, nº 999, Park Lozandes, Goiânia - GO, CEP: 74884-900.
            </p>

            <div className="space-y-2.5 text-xs text-white/85">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#fff20c] shrink-0 mt-0.5" />
                <span>Atendimento: Segunda a Sexta, das 08h às 18h</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#fff20c] shrink-0" />
                <span>Central Telefônica: (62) 3524-1000 / 156</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#fff20c] shrink-0" />
                <span>ouvidoria@goiania.go.gov.br</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#fff20c] shrink-0" />
                <span>Goiânia, Goiás - Brasil</span>
              </div>
            </div>
          </div>

          {/* Column 2: Citizen Services */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#f36e22] mb-4 pb-1 border-b border-white/10">
              Serviços ao Cidadão
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href="/iptu"
                  className="text-white/80 hover:text-white flex items-center justify-between group py-0.5"
                >
                  <span>IPTU e ITU 2026 (Consulta & Guias)</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#fff20c] group-hover:translate-x-1 transition-transform" />
                </Link>
              </li>
              <li>
                <a
                  href="https://saude.goiania.go.gov.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white flex items-center justify-between group py-0.5"
                >
                  <span>Teleconsulta & Vacinação SMS</span>
                  <ExternalLink className="w-3 h-3 text-[#f36e22]" />
                </a>
              </li>
              <li>
                <a
                  href="http://agendamento.goiania.go.gov.br/agendamento/#/home"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white flex items-center justify-between group py-0.5"
                >
                  <span>Agendamento Atende Fácil</span>
                  <ExternalLink className="w-3 h-3 text-[#f36e22]" />
                </a>
              </li>
              <li>
                <Link
                  href="/servicos?categoria=cidadao"
                  className="text-white/80 hover:text-white flex items-center justify-between group py-0.5"
                >
                  <span>Carta de Serviços Municipal</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#fff20c] group-hover:translate-x-1 transition-transform" />
                </Link>
              </li>
              <li>
                <Link
                  href="/concursos"
                  className="text-white/80 hover:text-white flex items-center justify-between group py-0.5"
                >
                  <span>Concursos Públicos & Vagas</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#fff20c] group-hover:translate-x-1 transition-transform" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Empresas & Gestão */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#f36e22] mb-4 pb-1 border-b border-white/10">
              Empresas & Transparência
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="https://nfse.goiania.go.gov.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white flex items-center justify-between group py-0.5"
                >
                  <span>Nota Fiscal Eletrônica (NFS-e)</span>
                  <ExternalLink className="w-3 h-3 text-[#f36e22]" />
                </a>
              </li>
              <li>
                <Link
                  href="/empresa"
                  className="text-white/80 hover:text-white flex items-center justify-between group py-0.5"
                >
                  <span>Empresa Fácil & Alvará Online</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#fff20c] group-hover:translate-x-1 transition-transform" />
                </Link>
              </li>
              <li>
                <Link
                  href="/transparencia"
                  className="text-white/80 hover:text-white flex items-center justify-between group py-0.5"
                >
                  <span>Portal da Transparência</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#fff20c] group-hover:translate-x-1 transition-transform" />
                </Link>
              </li>
              <li>
                <Link
                  href="/secretarias"
                  className="text-white/80 hover:text-white flex items-center justify-between group py-0.5"
                >
                  <span>Secretarias & Estrutura de Governo</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#fff20c] group-hover:translate-x-1 transition-transform" />
                </Link>
              </li>
              <li>
                <Link
                  href="/pagina/sobre-a-prefeitura"
                  className="text-white/80 hover:text-white flex items-center justify-between group py-0.5"
                >
                  <span>História e Dados da Cidade</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#fff20c] group-hover:translate-x-1 transition-transform" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Emergency Contacts & App */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#f36e22] mb-4 pb-1 border-b border-white/10">
              Plantão e Emergência
            </h4>
            <div className="bg-[#003856]/80 rounded-2xl p-4 space-y-2.5 text-xs border border-white/10">
              <div className="flex justify-between items-center text-white/90">
                <span>Central de Atendimento:</span>
                <span className="font-extrabold text-[#fff20c] text-sm">156</span>
              </div>
              <div className="flex justify-between items-center text-white/90">
                <span>Guarda Civil Metropolitana:</span>
                <span className="font-extrabold text-[#fff20c] text-sm">153</span>
              </div>
              <div className="flex justify-between items-center text-white/90">
                <span>SAMU (Urgência Médica):</span>
                <span className="font-extrabold text-[#fff20c] text-sm">192</span>
              </div>
              <div className="flex justify-between items-center text-white/90">
                <span>Fiscalização Ambiental (AMMA):</span>
                <span className="font-extrabold text-[#fff20c] text-sm">161</span>
              </div>
            </div>

            <div className="mt-4 pt-2">
              <a
                href="https://www.goiania.go.gov.br/app-prefeitura-24-horas/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#f36e22] hover:bg-[#f27730] text-white font-bold text-xs transition-colors shadow-sm"
              >
                <span>Baixar Prefeitura 24 Horas</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Legal, Security & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/70">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>&copy; 2026 Prefeitura de Goiânia. CNPJ: 01.612.092/0001-23. Todos os direitos reservados.</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs">
            <Link href="/pagina/sobre-a-prefeitura" className="hover:text-white transition-colors">
              Institucional
            </Link>
            <Link href="/transparencia" className="hover:text-white transition-colors">
              Transparência
            </Link>
            <Link href="/pagina/ouvidoria-e-acesso-a-informacao" className="hover:text-white transition-colors">
              e-SIC Acesso à Informação
            </Link>
            <Link href="/acessibilidade" className="hover:text-white transition-colors">
              Acessibilidade
            </Link>
            <Link href="/mapa-do-site" className="hover:text-white transition-colors">
              Mapa do Site
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
