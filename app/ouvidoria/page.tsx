import React from 'react';
import Link from 'next/link';
import { 
  PhoneCall, 
  MessageSquare, 
  AlertCircle, 
  ThumbsUp, 
  HelpCircle, 
  ShieldAlert, 
  Search, 
  MapPin, 
  Mail
} from 'lucide-react';

export const metadata = {
  title: 'Ouvidoria Geral do Município • Prefeitura de Goiânia',
  description: 'Canal de diálogo direto entre o cidadão e a Prefeitura de Goiânia. Registre reclamações, denúncias, solicitações ou elogios.',
};

export default function OuvidoriaPage() {
  const tiposManifestacao = [
    {
      tipo: 'Reclamação',
      desc: 'Manifestação de insatisfação sobre um serviço público ou conduta.',
      icon: AlertCircle,
      cor: 'bg-amber-500'
    },
    {
      tipo: 'Denúncia',
      desc: 'Comunicação de irregularidade ou ato ilegal na administração.',
      icon: ShieldAlert,
      cor: 'bg-red-500'
    },
    {
      tipo: 'Solicitação',
      desc: 'Pedido de adoção de providências ou realização de serviços.',
      icon: MessageSquare,
      cor: 'bg-blue-500'
    },
    {
      tipo: 'Elogio',
      desc: 'Demonstração de apreço ou satisfação com o atendimento prestado.',
      icon: ThumbsUp,
      cor: 'bg-emerald-500'
    },
    {
      tipo: 'Sugestão',
      desc: 'Ideia ou proposta de melhoria nos serviços públicos municipais.',
      icon: HelpCircle,
      cor: 'bg-purple-500'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-[#f36e22] transition-colors">Início</Link>
        <span>/</span>
        <span className="text-[#002e47] font-semibold">Ouvidoria Geral</span>
      </nav>

      {/* Header */}
      <div className="border-b-2 border-slate-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#f36e22] text-xs font-bold uppercase tracking-wider mb-1">
            <PhoneCall className="w-4 h-4" />
            <span>Participação Popular • Central 156</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#002e47] tracking-tight">
            Ouvidoria Geral do Município
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl">
            A Ouvidoria é o canal oficial de escuta e acolhimento do cidadão goianiense. Encaminhe suas dúvidas, reclamações, denúncias e sugestões com sigilo e rapidez.
          </p>
        </div>

        <a
          href="tel:156"
          className="bg-[#f36e22] hover:bg-[#f27730] text-white px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md self-start md:self-auto"
        >
          <PhoneCall className="w-4 h-4" />
          <span>Disque 156</span>
        </a>
      </div>

      {/* Tipos de Manifestação */}
      <section className="space-y-6">
        <h2 className="text-xl md:text-2xl font-extrabold text-[#002e47]">
          Como você deseja se manifestar?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {tiposManifestacao.map((item, idx) => {
            const Icon = item.icon;
            return (
              <a
                key={idx}
                href="https://www.goiania.go.gov.br/ouvidoria-e-sic/ouvidoria-e-atendimento/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-[#f36e22] transition-all flex flex-col items-center text-center group"
              >
                <div className={`w-12 h-12 rounded-xl ${item.cor} text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-xs`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-base text-[#002e47] group-hover:text-[#f36e22] transition-colors mb-1">
                  {item.tipo}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </a>
            );
          })}
        </div>
      </section>

      {/* Canais de Atendimento */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#002e47] text-white flex items-center justify-center">
            <PhoneCall className="w-5 h-5 text-[#f36e22]" />
          </div>
          <h3 className="font-bold text-lg text-[#002e47]">Central Telefônica 156</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Ligação gratuita de segunda a sexta das 07h às 19h para solicitações de serviços como tapa-buraco, iluminação, poda de árvore e limpeza.
          </p>
          <a href="tel:156" className="text-xs font-bold text-[#f36e22] hover:underline block pt-2">
            Disque 156 (ou 62 3524-1000) &rarr;
          </a>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#002e47] text-white flex items-center justify-center">
            <Mail className="w-5 h-5 text-[#f36e22]" />
          </div>
          <h3 className="font-bold text-lg text-[#002e47]">Atendimento por E-mail</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Encaminhe sua manifestação por mensagem eletrônica com relatórios, fotos e comprovantes para análise da ouvidoria.
          </p>
          <a href="mailto:ouvidoria@goiania.go.gov.br" className="text-xs font-bold text-[#f36e22] hover:underline block pt-2">
            ouvidoria@goiania.go.gov.br &rarr;
          </a>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#002e47] text-white flex items-center justify-center">
            <MapPin className="w-5 h-5 text-[#f36e22]" />
          </div>
          <h3 className="font-bold text-lg text-[#002e47]">Atendimento Presencial</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Sede da Ouvidoria Geral no Paço Municipal ou balcões de atendimento nas unidades do Atende Fácil em Goiânia.
          </p>
          <span className="text-xs font-bold text-slate-600 block pt-2">
            Segunda a Sexta: 08h às 18h
          </span>
        </div>
      </section>

      {/* Consulta de Protocolo Banner */}
      <section className="bg-slate-100 rounded-2xl p-6 sm:p-8 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="font-extrabold text-xl text-[#002e47]">Já possui um protocolo de manifestação?</h3>
          <p className="text-xs text-slate-600">
            Acompanhe o andamento da sua manifestação ou resposta dos órgãos municipais com o número de protocolo.
          </p>
        </div>

        <a
          href="https://www.goiania.go.gov.br/ouvidoria-e-sic/ouvidoria-e-atendimento/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#002e47] hover:bg-[#003856] text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase flex items-center gap-2 transition-colors shrink-0"
        >
          <Search className="w-4 h-4" />
          <span>Consultar Andamento</span>
        </a>
      </section>
    </div>
  );
}
