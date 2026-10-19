'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  Eye, 
  Instagram, 
  Facebook, 
  Youtube, 
  Twitter, 
  PhoneCall, 
  ExternalLink 
} from 'lucide-react';
import { SECRETARIAS_LIST } from '@/lib/data';

export function Navbar() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [highContrast, setHighContrast] = useState(false);
  const [fontSizeLevel, setFontSizeLevel] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleContrast = () => {
    const nextVal = !highContrast;
    setHighContrast(nextVal);
    if (nextVal) {
      document.body.classList.add('alto_contraste');
    } else {
      document.body.classList.remove('alto_contraste');
    }
  };

  const changeFontSize = (delta: number) => {
    const newLevel = Math.max(-1, Math.min(2, fontSizeLevel + delta));
    setFontSizeLevel(newLevel);
    const html = document.documentElement;
    if (newLevel === -1) html.style.fontSize = '90%';
    else if (newLevel === 0) html.style.fontSize = '100%';
    else if (newLevel === 1) html.style.fontSize = '110%';
    else if (newLevel === 2) html.style.fontSize = '120%';
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/noticias?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleOutsideClick = () => setActiveDropdown(null);
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <header className="w-full z-50 shadow-md">
      {/* 4-Color Stripe */}
      <div className="template-part-header-top-bar flex h-2 w-full">
        <div className="stripe yellow flex-1 bg-[#fff20c]"></div>
        <div className="stripe orange flex-1 bg-[#f36e22]"></div>
        <div className="stripe green flex-1 bg-[#114e23]"></div>
        <div className="stripe blue flex-1 bg-[#003c5c]"></div>
      </div>

      {/* Top Accessibility & Social Bar */}
      <div className="bg-[#002e47] text-white text-xs py-2 px-4 border-b border-[#003856]">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-slate-300 hidden sm:inline">
              GOIÂNIA • PREFEITURA MUNICIPAL
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={toggleContrast}
                className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#003856] hover:bg-[#f36e22] text-white transition-colors cursor-pointer"
                title="Alternar Alto Contraste"
              >
                <Eye className="w-3.5 h-3.5 text-[#fff20c]" />
                <span>Alto Contraste</span>
              </button>

              <div className="flex items-center gap-1 bg-[#003856] rounded px-1.5 py-0.5">
                <button
                  type="button"
                  onClick={() => changeFontSize(1)}
                  className="px-1.5 py-0.5 hover:text-[#f36e22] font-bold"
                  title="Aumentar Texto"
                >
                  A+
                </button>
                <span className="text-slate-400">|</span>
                <button
                  type="button"
                  onClick={() => changeFontSize(-1)}
                  className="px-1.5 py-0.5 hover:text-[#f36e22] font-bold"
                  title="Diminuir Texto"
                >
                  A-
                </button>
              </div>

              <Link 
                href="/acessibilidade" 
                className="hidden md:inline hover:text-[#f36e22] transition-colors"
              >
                Acessibilidade
              </Link>
              <Link 
                href="/mapa-do-site" 
                className="hidden md:inline hover:text-[#f36e22] transition-colors"
              >
                Mapa do Site
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-400 hidden lg:inline">Siga a Prefeitura:</span>
            <a 
              href="https://www.instagram.com/prefeituradegoiania/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#f36e22] transition-colors"
              aria-label="Instagram da Prefeitura"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a 
              href="https://www.facebook.com/prefeituradegoiania" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#f36e22] transition-colors"
              aria-label="Facebook da Prefeitura"
            >
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a 
              href="https://www.youtube.com/user/PrefeituraDeGoiania" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#f36e22] transition-colors"
              aria-label="YouTube da Prefeitura"
            >
              <Youtube className="w-3.5 h-3.5" />
            </a>
            <a 
              href="https://twitter.com/prefeiturago" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#f36e22] transition-colors"
              aria-label="X / Twitter da Prefeitura"
            >
              <Twitter className="w-3.5 h-3.5" />
            </a>
            <a 
              href="tel:156" 
              className="ml-2 flex items-center gap-1 font-bold text-[#fff20c] hover:text-white transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Ouvidoria: 156</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Brand & Search Bar */}
      <div className="bg-[#003856] py-4 px-4 sm:px-6 lg:px-8 border-b border-[#002e47]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm group-hover:bg-white/20 transition-all flex items-center gap-3">
                <Image 
                  src="/logo-white.svg" 
                  alt="Prefeitura de Goiânia" 
                  width={220} 
                  height={60} 
                  className="h-11 w-auto" 
                  priority
                />
              </div>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2 rounded bg-[#002e47] hover:bg-[#f36e22] transition-colors"
              aria-label="Abrir menu de navegação"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Search form */}
          <form onSubmit={handleSearchSubmit} className="w-full md:max-w-md relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="O que você está procurando em Goiânia?"
              className="w-full bg-white text-[#2A454A] placeholder:text-slate-400 rounded-full pl-5 pr-12 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#f36e22] shadow-inner"
            />
            <button
              type="submit"
              className="absolute right-1.5 bg-[#f36e22] hover:bg-[#f27730] text-white p-2 rounded-full transition-colors cursor-pointer"
              aria-label="Buscar no portal"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Direct Services Action */}
          <div className="hidden lg:flex items-center gap-3 text-white">
            <a
              href="http://agendamento.goiania.go.gov.br/agendamento/#/home"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#f36e22] hover:bg-[#f27730] text-white font-bold text-xs uppercase px-4 py-2.5 rounded-full shadow-sm transition-all"
            >
              <span>Atende Fácil</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Menu Bar */}
      <nav className="bg-[#002e47] text-white border-t border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center space-x-1 lg:space-x-2 text-sm font-semibold uppercase tracking-wide">
            <li>
              <Link 
                href="/" 
                className="block py-3.5 px-3.5 hover:text-[#f36e22] hover:bg-white/5 transition-colors border-b-2 border-transparent hover:border-[#f36e22]"
              >
                Início
              </Link>
            </li>

            {/* Secretarias Dropdown */}
            <li className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'secretarias' ? null : 'secretarias')}
                className="flex items-center gap-1.5 py-3.5 px-3.5 hover:text-[#f36e22] hover:bg-white/5 transition-colors border-b-2 border-transparent hover:border-[#f36e22] cursor-pointer"
              >
                <span>Secretarias</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {activeDropdown === 'secretarias' && (
                <div className="absolute left-0 top-full mt-0 w-80 bg-white text-[#2A454A] shadow-xl rounded-b-xl border-t-2 border-[#f36e22] py-2 z-50">
                  <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    Principais Órgãos Municipais
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {SECRETARIAS_LIST.slice(0, 8).map((sec) => (
                      <Link
                        key={sec.id}
                        href="/estrutura"
                        className="block px-4 py-2.5 text-xs font-medium hover:bg-[#fff1ec] hover:text-[#f36e22] transition-colors border-b border-slate-50 last:border-none"
                      >
                        <span className="font-bold text-[#002e47] mr-1.5">{sec.sigla}:</span>
                        {sec.nome}
                      </Link>
                    ))}
                  </div>
                  <div className="p-2 bg-slate-50 border-t border-slate-100 text-center">
                    <Link
                      href="/estrutura"
                      className="text-xs font-bold text-[#f36e22] hover:underline block py-1"
                    >
                      Ver toda a Estrutura Organizacional &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </li>

            {/* Serviços Dropdown */}
            <li className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'servicos' ? null : 'servicos')}
                className="flex items-center gap-1.5 py-3.5 px-3.5 hover:text-[#f36e22] hover:bg-white/5 transition-colors border-b-2 border-transparent hover:border-[#f36e22] cursor-pointer"
              >
                <span>Serviços</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {activeDropdown === 'servicos' && (
                <div className="absolute left-0 top-full mt-0 w-80 bg-white text-[#2A454A] shadow-xl rounded-b-xl border-t-2 border-[#f36e22] py-2 z-50">
                  <Link
                    href="/servicos?categoria=tributos"
                    className="block px-4 py-2.5 text-xs font-medium hover:bg-[#fff1ec] hover:text-[#f36e22] transition-colors"
                  >
                    IPTU, ITU e Arrecadação
                  </Link>
                  <Link
                    href="/servicos?categoria=cidadao"
                    className="block px-4 py-2.5 text-xs font-medium hover:bg-[#fff1ec] hover:text-[#f36e22] transition-colors"
                  >
                    Serviços ao Cidadão
                  </Link>
                  <Link
                    href="/servicos?categoria=empresa"
                    className="block px-4 py-2.5 text-xs font-medium hover:bg-[#fff1ec] hover:text-[#f36e22] transition-colors"
                  >
                    Empresa Fácil & Alvarás
                  </Link>
                  <Link
                    href="/servicos?categoria=servidor"
                    className="block px-4 py-2.5 text-xs font-medium hover:bg-[#fff1ec] hover:text-[#f36e22] transition-colors"
                  >
                    Portal do Servidor Municipal
                  </Link>
                  <div className="p-2 bg-slate-50 border-t border-slate-100 text-center">
                    <Link
                      href="/servicos"
                      className="text-xs font-bold text-[#f36e22] hover:underline block py-1"
                    >
                      Catálogo Completo de Serviços &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </li>

            {/* Transparência Dropdown */}
            <li className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'transparencia' ? null : 'transparencia')}
                className="flex items-center gap-1.5 py-3.5 px-3.5 hover:text-[#f36e22] hover:bg-white/5 transition-colors border-b-2 border-transparent hover:border-[#f36e22] cursor-pointer"
              >
                <span>Transparência</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {activeDropdown === 'transparencia' && (
                <div className="absolute left-0 top-full mt-0 w-80 bg-white text-[#2A454A] shadow-xl rounded-b-xl border-t-2 border-[#f36e22] py-2 z-50">
                  <Link
                    href="/transparencia#receitas"
                    className="block px-4 py-2.5 text-xs font-medium hover:bg-[#fff1ec] hover:text-[#f36e22] transition-colors"
                  >
                    Receitas e Despesas Públicas
                  </Link>
                  <Link
                    href="/transparencia#licitacoes"
                    className="block px-4 py-2.5 text-xs font-medium hover:bg-[#fff1ec] hover:text-[#f36e22] transition-colors"
                  >
                    Licitações, Editais e Contratos
                  </Link>
                  <Link
                    href="/transparencia#folha"
                    className="block px-4 py-2.5 text-xs font-medium hover:bg-[#fff1ec] hover:text-[#f36e22] transition-colors"
                  >
                    Folha de Pagamento & Servidores
                  </Link>
                  <Link
                    href="/transparencia#lrf"
                    className="block px-4 py-2.5 text-xs font-medium hover:bg-[#fff1ec] hover:text-[#f36e22] transition-colors"
                  >
                    Relatórios Fiscais (LRF)
                  </Link>
                  <div className="p-2 bg-slate-50 border-t border-slate-100 text-center">
                    <Link
                      href="/transparencia"
                      className="text-xs font-bold text-[#f36e22] hover:underline block py-1"
                    >
                      Acessar Portal da Transparência &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </li>

            <li>
              <Link 
                href="/noticias" 
                className="block py-3.5 px-3.5 hover:text-[#f36e22] hover:bg-white/5 transition-colors border-b-2 border-transparent hover:border-[#f36e22]"
              >
                Notícias
              </Link>
            </li>

            <li>
              <Link 
                href="/ouvidoria" 
                className="block py-3.5 px-3.5 hover:text-[#f36e22] hover:bg-white/5 transition-colors border-b-2 border-transparent hover:border-[#f36e22]"
              >
                Ouvidoria
              </Link>
            </li>

            <li>
              <Link 
                href="/sobre-goiania" 
                className="block py-3.5 px-3.5 hover:text-[#f36e22] hover:bg-white/5 transition-colors border-b-2 border-transparent hover:border-[#f36e22]"
              >
                A Cidade
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#002e47] text-white border-t border-[#003856] px-4 py-6 space-y-4">
          <ul className="space-y-2 text-sm font-semibold uppercase tracking-wide">
            <li>
              <Link 
                href="/" 
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 px-3 rounded hover:bg-[#003856]"
              >
                Início
              </Link>
            </li>
            <li>
              <Link 
                href="/estrutura" 
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 px-3 rounded hover:bg-[#003856]"
              >
                Secretarias e Órgãos
              </Link>
            </li>
            <li>
              <Link 
                href="/servicos" 
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 px-3 rounded hover:bg-[#003856]"
              >
                Serviços Municipais
              </Link>
            </li>
            <li>
              <Link 
                href="/transparencia" 
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 px-3 rounded hover:bg-[#003856]"
              >
                Transparência
              </Link>
            </li>
            <li>
              <Link 
                href="/noticias" 
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 px-3 rounded hover:bg-[#003856]"
              >
                Notícias
              </Link>
            </li>
            <li>
              <Link 
                href="/ouvidoria" 
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 px-3 rounded hover:bg-[#003856]"
              >
                Ouvidoria
              </Link>
            </li>
            <li>
              <Link 
                href="/sobre-goiania" 
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 px-3 rounded hover:bg-[#003856]"
              >
                A Cidade
              </Link>
            </li>
            <li>
              <Link 
                href="/acessibilidade" 
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 px-3 rounded hover:bg-[#003856]"
              >
                Acessibilidade
              </Link>
            </li>
            <li>
              <Link 
                href="/mapa-do-site" 
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 px-3 rounded hover:bg-[#003856]"
              >
                Mapa do Site
              </Link>
            </li>
          </ul>

          <div className="pt-4 border-t border-slate-700">
            <a
              href="http://agendamento.goiania.go.gov.br/agendamento/#/home"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#f36e22] text-white py-3 rounded-lg font-bold text-center uppercase"
            >
              <span>Agendamento Atende Fácil</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
