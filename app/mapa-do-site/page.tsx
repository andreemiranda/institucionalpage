import React from 'react';
import Link from 'next/link';
import { getCategories } from '@/lib/wp';
import { Map } from 'lucide-react';

export const revalidate = 60;

export const metadata = {
  title: 'Mapa do Site • Prefeitura de Goiânia',
  description: 'Estrutura completa de navegação de todas as seções e serviços do portal da Prefeitura de Goiânia.',
};

export default async function MapaDoSitePage() {
  const categories = await getCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-[#f36e22] transition-colors">Início</Link>
        <span>/</span>
        <span className="text-[#002e47] font-semibold">Mapa do Site</span>
      </nav>

      {/* Header */}
      <div className="border-b-2 border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-[#f36e22] text-xs font-bold uppercase tracking-wider mb-1">
          <Map className="w-4 h-4" />
          <span>Índice Geral de Conteúdo</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#002e47] tracking-tight">
          Mapa do Site
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Encontre rapidamente páginas, secretarias, serviços municipais e arquivos de notícias.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Seção 1: Institucional */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="font-extrabold text-base text-[#002e47] border-b border-slate-100 pb-2">
            Institucional
          </h2>
          <ul className="space-y-2 text-xs font-semibold text-slate-600">
            <li><Link href="/" className="hover:text-[#f36e22] block py-1">Página Inicial</Link></li>
            <li><Link href="/sobre-goiania" className="hover:text-[#f36e22] block py-1">A Cidade de Goiânia</Link></li>
            <li><Link href="/estrutura" className="hover:text-[#f36e22] block py-1">Gabinete do Prefeito</Link></li>
            <li><Link href="/estrutura" className="hover:text-[#f36e22] block py-1">Secretarias Municipais</Link></li>
            <li><Link href="/estrutura" className="hover:text-[#f36e22] block py-1">Agências e Autarquias</Link></li>
            <li><Link href="/acessibilidade" className="hover:text-[#f36e22] block py-1">Acessibilidade & Atalhos</Link></li>
            <li><Link href="/ouvidoria" className="hover:text-[#f36e22] block py-1">Ouvidoria Geral (156)</Link></li>
          </ul>
        </div>

        {/* Seção 2: Serviços ao Cidadão */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="font-extrabold text-base text-[#002e47] border-b border-slate-100 pb-2">
            Serviços Municipais
          </h2>
          <ul className="space-y-2 text-xs font-semibold text-slate-600">
            <li><Link href="/servicos" className="hover:text-[#f36e22] block py-1 font-bold text-[#f36e22]">Catálogo Completo de Serviços</Link></li>
            <li><Link href="/servicos?categoria=tributos" className="hover:text-[#f36e22] block py-1">IPTU e ITU 2026</Link></li>
            <li><Link href="/servicos?categoria=empresa" className="hover:text-[#f36e22] block py-1">Nota Fiscal de Serviços (NFS-e)</Link></li>
            <li><Link href="/servicos?categoria=cidadao" className="hover:text-[#f36e22] block py-1">Agendamento Atende Fácil</Link></li>
            <li><Link href="/servicos?categoria=tributos" className="hover:text-[#f36e22] block py-1">Portal do Contribuinte</Link></li>
            <li><Link href="/servicos?categoria=cidadao" className="hover:text-[#f36e22] block py-1">Diário Oficial e Decretos</Link></li>
            <li><Link href="/servicos?categoria=cidadao" className="hover:text-[#f36e22] block py-1">Consulta de Processos</Link></li>
            <li><Link href="/servicos?categoria=servidor" className="hover:text-[#f36e22] block py-1">Portal do Servidor (Contracheque)</Link></li>
          </ul>
        </div>

        {/* Seção 3: Transparência */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="font-extrabold text-base text-[#002e47] border-b border-slate-100 pb-2">
            Transparência Pública
          </h2>
          <ul className="space-y-2 text-xs font-semibold text-slate-600">
            <li><Link href="/transparencia" className="hover:text-[#f36e22] block py-1 font-bold text-[#f36e22]">Portal da Transparência</Link></li>
            <li><Link href="/transparencia#receitas" className="hover:text-[#f36e22] block py-1">Receitas e Despesas Públicas</Link></li>
            <li><Link href="/transparencia#licitacoes" className="hover:text-[#f36e22] block py-1">Licitações, Editais e Contratos</Link></li>
            <li><Link href="/transparencia#folha" className="hover:text-[#f36e22] block py-1">Quadro de Pessoal e Remunerações</Link></li>
            <li><Link href="/transparencia#lrf" className="hover:text-[#f36e22] block py-1">Relatórios Fiscais (LRF)</Link></li>
            <li><Link href="/transparencia#sic" className="hover:text-[#f36e22] block py-1">Serviço de Informação (e-SIC)</Link></li>
            <li><Link href="/transparencia#obras" className="hover:text-[#f36e22] block py-1">Painel de Obras Públicas</Link></li>
          </ul>
        </div>

        {/* Seção 4: Categorias de Notícias WP */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="font-extrabold text-base text-[#002e47] border-b border-slate-100 pb-2">
            Editorias de Notícias
          </h2>
          <ul className="space-y-1.5 text-xs text-slate-600 max-h-80 overflow-y-auto">
            <li><Link href="/noticias" className="hover:text-[#f36e22] block py-1 font-bold text-[#f36e22]">Todas as Notícias Recentes</Link></li>
            {categories.slice(0, 20).map((cat) => (
              <li key={cat.id}>
                <Link href={`/categoria/${cat.slug}`} className="hover:text-[#f36e22] block py-1">
                  {cat.name} ({cat.count})
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
