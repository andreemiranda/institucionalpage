'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  CreditCard, 
  Calendar, 
  Building2, 
  Map, 
  Scale, 
  ShieldCheck, 
  Briefcase, 
  Car, 
  Sparkles, 
  Search, 
  FileCheck, 
  UserCheck, 
  HelpCircle, 
  Trees, 
  Compass, 
  Ticket, 
  GraduationCap, 
  ExternalLink 
} from 'lucide-react';

export function QuickAccessHub() {
  const [activeTab, setActiveTab] = useState<'cidadao' | 'empresa' | 'servidor' | 'turismo'>('cidadao');

  const CIDADAO_LINKS = [
    {
      title: 'IPTU e ITU 2026',
      desc: 'Emissão de DUAM, parcelamento e 2ª via',
      icon: CreditCard,
      href: 'https://www.goiania.go.gov.br/sing_servicos/emissao-duam-itu-iptu-issqn/',
      highlight: true
    },
    {
      title: 'Agendamento Atende Fácil',
      desc: 'Marque seu atendimento presencial',
      icon: Calendar,
      href: 'http://agendamento.goiania.go.gov.br/agendamento/#/home',
      highlight: true
    },
    {
      title: 'Nota Fiscal Eletrônica (NFS-e)',
      desc: 'Emissão e consulta de notas fiscais',
      icon: FileText,
      href: 'https://www.goiania.go.gov.br/sing_servicos/nota-fiscal-eletronica/'
    },
    {
      title: 'Portal do Contribuinte',
      desc: 'Parcelamento de dívidas e certidões',
      icon: Scale,
      href: 'https://www.goiania.go.gov.br/sing_servicos/portal-do-contribuinte/'
    },
    {
      title: 'Diário Oficial e Legislação',
      desc: 'Leis, decretos e atos municipais',
      icon: FileCheck,
      href: 'https://www.goiania.go.gov.br/casa-civil/'
    },
    {
      title: 'Consulta de Processos',
      desc: 'Acompanhamento de processos digitais',
      icon: Search,
      href: 'https://www.goiania.go.gov.br/consulta-processos/'
    },
    {
      title: 'Mapa 360° Goiânia',
      desc: 'Imagens aéreas e mapeamento urbano',
      icon: Map,
      href: 'https://portal-goiania.geo360.com.br/'
    },
    {
      title: 'Junta Militar',
      desc: 'Alistamento militar e certificados',
      icon: ShieldCheck,
      href: 'https://www.goiania.go.gov.br/sing_servicos/alistamento-militar/'
    },
    {
      title: 'Infrações de Trânsito',
      desc: 'Recursos administrativos de multas SMT',
      icon: Car,
      href: 'https://www.goiania.go.gov.br/sing_servicos/recurso-administrativo-de-multas/'
    },
    {
      title: 'CEJUSC Municipal',
      desc: 'Conciliação e mediação de conflitos',
      icon: Scale,
      href: 'https://www.goiania.go.gov.br/cejusc/'
    }
  ];

  const EMPRESA_LINKS = [
    {
      title: 'Empresa Fácil Goiânia',
      desc: 'Alvará de localização e abertura rápida',
      icon: Building2,
      href: 'https://www.goiania.go.gov.br/sing_servicos/alvara-de-localizacao-e-funcionamento-empresa-facil/',
      highlight: true
    },
    {
      title: 'Licença Ambiental Fácil',
      desc: 'Licenciamento online simplificado AMMA',
      icon: Trees,
      href: 'https://www.goiania.go.gov.br/sing_servicos/licenca-ambiental-facil/',
      highlight: true
    },
    {
      title: 'Licitações e Editais',
      desc: 'Compras públicas, pregões e contratos',
      icon: FileText,
      href: '/transparencia#licitacoes'
    },
    {
      title: 'Consulta de CAE',
      desc: 'Cadastro de Atividades Econômicas',
      icon: Search,
      href: 'https://www.goiania.go.gov.br/sistemas/sccae/asp/sccae00010r0.asp'
    },
    {
      title: 'Documento Eletrônico (eDOC)',
      desc: 'Protocolo e tramitação eletrônica',
      icon: FileCheck,
      href: 'https://www.goiania.go.gov.br/sing_servicos/edoc-acesso-ao-sistema/'
    },
    {
      title: 'Consulta Uso do Solo',
      desc: 'Viabilidade de atividade econômica no lote',
      icon: Map,
      href: 'http://simplificagoiania.com.br/simplificagoiania/portal/'
    },
    {
      title: 'Prestador de Outro Município',
      desc: 'Cadastro e autorização fazendária',
      icon: Briefcase,
      href: 'https://www.goiania.go.gov.br/sistemas/saces/asp/saces00000f0.asp?sigla=sccae'
    },
    {
      title: 'Emissão DUAM Geral',
      desc: 'Guias e taxas municipais em geral',
      icon: CreditCard,
      href: 'https://www.goiania.go.gov.br/sing_servicos/consulta-de-documento-de-emissao-duam/'
    }
  ];

  const SERVIDOR_LINKS = [
    {
      title: 'Portal do Servidor Municipal',
      desc: 'Contracheques, férias e informes',
      icon: UserCheck,
      href: 'https://www.goiania.go.gov.br/sistemas/saces/asp/saces00000f0.asp?sigla=sipsm',
      highlight: true
    },
    {
      title: 'Demonstrativo IRPF 2026',
      desc: 'Informes de rendimentos tributáveis',
      icon: FileText,
      href: 'https://imassaude.com.br/as-portalassociado-net/login?returnUrl=%2Fpages%2Fhome',
      highlight: true
    },
    {
      title: 'Prova de Vida Digital',
      desc: 'Recadastramento GoianiaPrev',
      icon: ShieldCheck,
      href: 'https://goianiaprev.go.gov.br/prova-de-vida-digital/'
    },
    {
      title: 'Sistema Eletrônico de Informações (SEI)',
      desc: 'Acesso à gestão de processos internos',
      icon: FileCheck,
      href: 'https://www.goiania.go.gov.br/sei'
    },
    {
      title: 'Portal do Beneficiário - IMAS',
      desc: 'Guia médico e assistência à saúde',
      icon: HelpCircle,
      href: 'https://www.goiania.go.gov.br/sing_servicos/portal-do-beneficiario-imas/'
    },
    {
      title: 'Convocação Concursos SME',
      desc: 'Editais e lista de chamamento da Educação',
      icon: GraduationCap,
      href: 'https://www.goiania.go.gov.br/sistemas/sicon/asp/sicon00001f0.asp?txt_tela=1&txt_cd_concur=50'
    }
  ];

  const TURISMO_LINKS = [
    {
      title: 'Goiânia, a Capital Verde',
      desc: 'Conheça nossos parques e bosques urbanos',
      icon: Trees,
      href: '/sobre-goiania',
      highlight: true
    },
    {
      title: 'Parque Zoológico de Goiânia',
      desc: 'Ingressos, horários e atrações do Zoo',
      icon: Ticket,
      href: 'https://www.goiania.go.gov.br/sing_servicos/parque-zoologico/',
      highlight: true
    },
    {
      title: 'Parque Mutirama',
      desc: 'Parque de diversões público gratuito',
      icon: Sparkles,
      href: 'https://www.goiania.go.gov.br/sing_servicos/promocao-de-lazer-parque-mutirama/'
    },
    {
      title: 'Calendário Oficial de Eventos',
      desc: 'Festivais, feiras culturais e esportes',
      icon: Calendar,
      href: 'https://www.goiania.go.gov.br/agetul/calendario-de-eventos/'
    },
    {
      title: 'Circuito Art Déco',
      desc: 'O maior acervo Art Déco do Brasil',
      icon: Compass,
      href: 'https://www.goiania.go.gov.br/agetul/turismo/roteiros-turisticos/'
    },
    {
      title: 'Centro de Atendimento ao Turista (CAT)',
      desc: 'Informações e guias turísticos da cidade',
      icon: HelpCircle,
      href: 'https://www.goiania.go.gov.br/agetul/turismo/cats/'
    }
  ];

  const getLinks = () => {
    switch (activeTab) {
      case 'cidadao': return CIDADAO_LINKS;
      case 'empresa': return EMPRESA_LINKS;
      case 'servidor': return SERVIDOR_LINKS;
      case 'turismo': return TURISMO_LINKS;
    }
  };

  return (
    <div className="template-part-most-accessed layout-2023 w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#002e47] tracking-tight">
            Acesso Rápido a Serviços
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Selecione o seu perfil e acesse os serviços municipais mais solicitados
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="bg-[#F2F4F4] p-1.5 rounded-full flex items-center space-x-1 border border-slate-200">
          {(['cidadao', 'empresa', 'servidor', 'turismo'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs md:text-sm font-bold uppercase rounded-full transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-[#f36e22] text-white shadow-md'
                  : 'text-[#2A454A] hover:text-[#f36e22]'
              }`}
            >
              {tab === 'cidadao' && 'Cidadão'}
              {tab === 'empresa' && 'Empresa'}
              {tab === 'servidor' && 'Servidor'}
              {tab === 'turismo' && 'Turismo'}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {getLinks().map((item, idx) => {
          const Icon = item.icon;
          return (
            <a
              key={idx}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : '_self'}
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`group flex items-start gap-4 p-4 rounded-xl border transition-all ${
                item.highlight
                  ? 'bg-gradient-to-br from-[#fff1ec] to-white border-[#f36e22]/30 hover:border-[#f36e22] shadow-sm hover:shadow-md'
                  : 'bg-white hover:bg-slate-50 border-slate-100 hover:border-slate-300 shadow-xs hover:shadow-sm'
              }`}
            >
              <div className={`p-2.5 rounded-xl shrink-0 transition-colors ${
                item.highlight 
                  ? 'bg-[#f36e22] text-white shadow-sm' 
                  : 'bg-[#F2F4F4] text-[#002e47] group-hover:bg-[#f36e22] group-hover:text-white'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-sm text-[#002e47] group-hover:text-[#f36e22] transition-colors truncate">
                    {item.title}
                  </h4>
                  {item.href.startsWith('http') && (
                    <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-[#f36e22] shrink-0" />
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {item.desc}
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
