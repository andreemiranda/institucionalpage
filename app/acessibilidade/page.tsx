import React from 'react';
import Link from 'next/link';
import { Eye, Keyboard, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Acessibilidade e Teclas de Atalho • Prefeitura de Goiânia',
  description: 'Conheça os recursos de acessibilidade digital, atalhos de navegação pelo teclado e padrões de conformidade do portal da Prefeitura de Goiânia.',
};

export default function AcessibilidadePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-[#f36e22] transition-colors">Início</Link>
        <span>/</span>
        <span className="text-[#002e47] font-semibold">Acessibilidade</span>
      </nav>

      {/* Header */}
      <div className="border-b-2 border-slate-200 pb-6 space-y-2">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#002e47] tracking-tight">
          Acessibilidade do Portal
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Este portal foi desenvolvido para garantir o acesso amplo a todos os cidadãos, incluindo pessoas com deficiência visual, auditiva, motora ou cognitiva, em conformidade com o Modelo de Acessibilidade em Governo Eletrônico (e-MAG) e as diretrizes do WCAG 2.1.
        </p>
      </div>

      {/* Atalhos de Teclado */}
      <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#002e47] text-white flex items-center justify-center">
            <Keyboard className="w-5 h-5 text-[#f36e22]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#002e47]">Teclas de Atalho por Teclado</h2>
            <p className="text-xs text-slate-500">Navegue rapidamente entre as seções usando atalhos do teclado</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <span className="font-medium text-slate-700">Ir para o conteúdo principal</span>
            <kbd className="px-2.5 py-1 bg-white border border-slate-300 rounded-md font-mono text-xs font-bold shadow-2xs">
              Alt + 1
            </kbd>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <span className="font-medium text-slate-700">Ir para o menu de navegação</span>
            <kbd className="px-2.5 py-1 bg-white border border-slate-300 rounded-md font-mono text-xs font-bold shadow-2xs">
              Alt + 2
            </kbd>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <span className="font-medium text-slate-700">Ir para o campo de busca</span>
            <kbd className="px-2.5 py-1 bg-white border border-slate-300 rounded-md font-mono text-xs font-bold shadow-2xs">
              Alt + 3
            </kbd>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <span className="font-medium text-slate-700">Ir para o rodapé do portal</span>
            <kbd className="px-2.5 py-1 bg-white border border-slate-300 rounded-md font-mono text-xs font-bold shadow-2xs">
              Alt + 4
            </kbd>
          </div>
        </div>

        <p className="text-xs text-slate-500">
          * Em navegadores no Mac, substitua <kbd className="font-mono font-bold">Alt</kbd> por <kbd className="font-mono font-bold">Ctrl + Option</kbd>.
        </p>
      </section>

      {/* Recursos de Contraste e Texto */}
      <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#002e47] text-white flex items-center justify-center">
            <Eye className="w-5 h-5 text-[#f36e22]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#002e47]">Recursos Visuais e de Texto</h2>
            <p className="text-xs text-slate-500">Ajustes diretos na barra superior de acessibilidade</p>
          </div>
        </div>

        <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-[#002e47]">Alto Contraste:</strong>
              O botão localizado na barra superior inverte as cores do portal para fundo preto e tipografia de alto contraste amarela/branca, facilitando a leitura para pessoas com baixa visão.
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-[#002e47]">Redimensionamento de Fonte (A+ / A-):</strong>
              Permite ampliar ou reduzir o tamanho padrão dos textos em todo o site sem quebrar o layout das páginas.
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-[#002e47]">Suporte a Leitores de Tela:</strong>
              Estrutura semântica HTML5 com atributos ARIA para leitura natural por softwares como NVDA, JAWS e VoiceOver.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
