import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Coins,
  FileText,
  Calendar,
  CheckCircle2,
  ExternalLink,
  HelpCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'IPTU e ITU 2026 • Consulta, 2ª Via e Calendário • Goiânia',
  description:
    'Consulte o IPTU e ITU 2026 de Goiânia. Emita a 2ª via do DUAM com até 10% de desconto na cota única ou parcele em até 11 vezes.',
  openGraph: {
    type: 'website',
    title: 'IPTU e ITU 2026 • Prefeitura de Goiânia',
    description: 'Emissão de 2ª via, desconto de cota única e calendário oficial de pagamentos.',
    url: 'https://goiania.go.gov.br/iptu',
    siteName: 'Prefeitura de Goiânia',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'IPTU Goiânia 2026' }],
  },
};

export default function IptuPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-[#f36e22] transition-colors">
          Início
        </Link>
        <span>/</span>
        <Link href="/servicos" className="hover:text-[#f36e22] transition-colors">
          Serviços
        </Link>
        <span>/</span>
        <span className="text-[#f36e22] font-semibold">IPTU e ITU 2026</span>
      </nav>

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-[#002e47] via-[#003856] to-[#00473E] text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-white/10 space-y-6">
        <div className="flex items-center gap-2 text-[#fff20c] text-xs font-black uppercase tracking-widest">
          <Coins className="w-4 h-4" />
          <span>Tributos Municipais • Exercício 2026</span>
        </div>

        <div className="max-w-3xl space-y-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            IPTU e ITU 2026: Facilidade, Transparência e Descontos
          </h1>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            A Prefeitura de Goiânia oferece até <strong>10% de desconto</strong> para pagamento à vista em cota única ou a opção de parcelamento em até <strong>11 vezes</strong> sem juros.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 pt-2">
          <a
            href="https://www.goiania.go.gov.br/servicos/iptu-2026/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#f36e22] hover:bg-[#f27730] text-white px-6 py-3.5 rounded-2xl font-bold text-sm uppercase tracking-wider flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
          >
            <span>Emitir 2ª Via do DUAM Online</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <a
            href="http://agendamento.goiania.go.gov.br/agendamento/#/home"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 hover:bg-white/20 text-white px-6 py-3.5 rounded-2xl font-bold text-sm uppercase tracking-wider flex items-center gap-2 transition-colors border border-white/20"
          >
            <span>Agendar Atendimento Presencial</span>
          </a>
        </div>
      </div>

      {/* Highlights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-black">
            10%
          </div>
          <h3 className="font-extrabold text-lg text-[#002e47]">
            Desconto na Cota Única
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Economize aproveitando o abatimento especial de 10% quitando o imposto até o vencimento da primeira parcela.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black">
            11x
          </div>
          <h3 className="font-extrabold text-lg text-[#002e47]">
            Parcelamento Sem Juros
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Pague em parcelas mensais e sucessivas com vencimento no dia 20 de cada mês, diretamente pelo internet banking ou PIX.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-lg text-[#002e47]">
            Pagamento Seguro via PIX
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            A guia emitida no portal conta com QR Code PIX oficial da Prefeitura de Goiânia (beneficiário: Município de Goiânia).
          </p>
        </div>
      </div>

      {/* Explanatory Guide */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-8">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-2xl font-extrabold text-[#002e47]">
            Perguntas Frequentes sobre o IPTU 2026
          </h2>
        </div>

        <div className="space-y-6 text-sm text-[#2A454A]">
          <div className="space-y-1.5">
            <h4 className="font-bold text-[#002e47]">
              1. Como consultar o número de inscrição do meu imóvel?
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              O número da inscrição cadastral imobiliária pode ser encontrado no carnê de IPTU de anos anteriores ou na escritura/registro do imóvel. Também é possível solicitar a pesquisa nas unidades do Atende Fácil munido de CPF e comprovante de endereço.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-bold text-[#002e47]">
              2. Quem tem direito à isenção do IPTU em Goiânia?
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Têm direito à isenção proprietários de único imóvel com valor venal compatível com a faixa social prevista no Código Tributário Municipal, aposentados e pensionistas de baixa renda que atendam aos requisitos da legislação em vigor.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-bold text-[#002e47]">
              3. O que acontece se eu atrasar o pagamento de uma parcela?
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Em caso de atraso, o contribuinte pode emitir um novo DUAM atualizado com os acréscimos legais de multa e juros de mora diretamente pelo portal sem necessidade de deslocamento físico.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
