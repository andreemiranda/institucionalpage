'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppStore } from '@/store/useAppStore';
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  Clock,
  Building,
} from 'lucide-react';

export function Footer() {
  const { menus } = useAppStore();

  return (
    <footer className="bg-[#003831] text-white pt-14 pb-8 border-t-4 border-[#FAAE2B] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Institutional Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#00473E] rounded-xl flex items-center justify-center p-1.5 border border-[#FAAE2B]/30">
                <Image
                  src="/brasao.png"
                  alt="Brasão de Goiânia"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-white leading-tight tracking-tight">
                  Prefeitura de Goiânia
                </h3>
                <span className="text-xs text-[#FAAE2B] font-medium">
                  Capital de Goiás
                </span>
              </div>
            </div>

            <p className="text-xs text-white/75 leading-relaxed">
              Palácio das Campinas Venerando de Freitas Borges (Paço Municipal)
              <br />
              Avenida do Cerrado, nº 999, Park Lozandes, Goiânia - GO, CEP 74884-900.
            </p>

            <div className="space-y-2 text-xs text-white/80">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#FAAE2B]" />
                <span>Atendimento: Segunda a Sexta, das 08h às 18h</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FAAE2B]" />
                <span>Central Telefônica: (62) 3524-1000 / 156</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#FAAE2B]" />
                <span>ouvidoria@goiania.go.gov.br</span>
              </div>
            </div>
          </div>

          {/* Quick Access to Services */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#FAAE2B] mb-4 pb-1 border-b border-white/10">
              Serviços ao Cidadão
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="https://www.goiania.go.gov.br/servicos/iptu-2026/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white flex items-center justify-between group"
                >
                  <span>IPTU e ITU 2026</span>
                  <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 text-[#FAAE2B]" />
                </a>
              </li>
              <li>
                <a
                  href="https://saude.goiania.go.gov.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white flex items-center justify-between group"
                >
                  <span>Teleconsulta & Saúde</span>
                  <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 text-[#FAAE2B]" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.goiania.go.gov.br/atendefacil/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white flex items-center justify-between group"
                >
                  <span>Atende Fácil Goiânia</span>
                  <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 text-[#FAAE2B]" />
                </a>
              </li>
              <li>
                <Link
                  href="/noticias"
                  className="text-white/80 hover:text-white flex items-center justify-between"
                >
                  <span>Notícias e Comunicados</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#FAAE2B]" />
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos"
                  className="text-white/80 hover:text-white flex items-center justify-between"
                >
                  <span>Carta de Serviços Municipal</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#FAAE2B]" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Business & Administration */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#FAAE2B] mb-4 pb-1 border-b border-white/10">
              Empresas & Transparência
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="https://nfse.goiania.go.gov.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white flex items-center justify-between group"
                >
                  <span>Nota Fiscal Eletrônica (NFS-e)</span>
                  <ExternalLink className="w-3 h-3 opacity-50 text-[#FAAE2B]" />
                </a>
              </li>
              <li>
                <a
                  href="https://transparencia.goiania.go.gov.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white flex items-center justify-between group"
                >
                  <span>Portal da Transparência</span>
                  <ExternalLink className="w-3 h-3 opacity-50 text-[#FAAE2B]" />
                </a>
              </li>
              <li>
                <a
                  href="https://dom.goiania.go.gov.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white flex items-center justify-between group"
                >
                  <span>Diário Oficial do Município</span>
                  <ExternalLink className="w-3 h-3 opacity-50 text-[#FAAE2B]" />
                </a>
              </li>
              <li>
                <Link
                  href="/pagina/sobre-a-prefeitura"
                  className="text-white/80 hover:text-white flex items-center justify-between"
                >
                  <span>Sobre a Prefeitura</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#FAAE2B]" />
                </Link>
              </li>
              <li>
                <Link
                  href="/pagina/ouvidoria-e-acesso-a-informacao"
                  className="text-white/80 hover:text-white flex items-center justify-between"
                >
                  <span>e-SIC / Ouvidoria Geral</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#FAAE2B]" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Useful Links & Emergency */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#FAAE2B] mb-4 pb-1 border-b border-white/10">
              Plantão e Emergência
            </h4>
            <div className="bg-white/5 rounded-xl p-3 space-y-2 text-xs border border-white/10">
              <div className="flex justify-between items-center text-white/90">
                <span>Central de Atendimento:</span>
                <span className="font-bold text-[#FAAE2B] text-sm">156</span>
              </div>
              <div className="flex justify-between items-center text-white/90">
                <span>Guarda Civil Municipal:</span>
                <span className="font-bold text-[#FAAE2B] text-sm">153</span>
              </div>
              <div className="flex justify-between items-center text-white/90">
                <span>SAMU (Urgência Médica):</span>
                <span className="font-bold text-[#FAAE2B] text-sm">192</span>
              </div>
              <div className="flex justify-between items-center text-white/90">
                <span>Fiscalização AMMA / Meio Ambiente:</span>
                <span className="font-bold text-[#FAAE2B] text-sm">161</span>
              </div>
            </div>

            <div className="mt-4">
              <span className="text-[11px] text-white/60 block mb-1">
                Acesse o aplicativo oficial:
              </span>
              <a
                href="https://www.goiania.go.gov.br/app-prefeitura-24-horas/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAAE2B] text-[#00473E] font-bold text-xs hover:bg-[#e29d24] transition-colors"
              >
                <span>Baixar Prefeitura 24 Horas</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>
            &copy; 2026 Prefeitura de Goiânia. Todos os direitos reservados.
          </p>
          <div className="flex items-center space-x-6">
            <Link href="/pagina/sobre-a-prefeitura" className="hover:text-white transition-colors">
              Institucional
            </Link>
            <Link href="/pagina/portal-da-transparencia" className="hover:text-white transition-colors">
              Transparência
            </Link>
            <Link href="/pagina/ouvidoria-e-acesso-a-informacao" className="hover:text-white transition-colors">
              Acesso à Informação
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
