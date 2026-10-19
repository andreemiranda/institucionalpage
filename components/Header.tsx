'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import { MenuItem } from '@/types/wordpress';
import {
  Search,
  Menu,
  X,
  ChevronDown,
  ExternalLink,
  Phone,
  HelpCircle,
  FileText,
  Building,
  UserCheck,
  MapPin,
  ShieldCheck,
  Calendar,
} from 'lucide-react';

export function Header() {
  const router = useRouter();
  const {
    menus,
    isMenuLoading,
    fetchAndHydrateMenus,
    searchQuery,
    setSearchQuery,
    executeSearch,
    searchResults,
    isSearching,
    clearSearch,
    mobileMenuOpen,
    toggleMobileMenu,
  } = useAppStore();

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchAndHydrateMenus();
  }, [fetchAndHydrateMenus]);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleMouseEnter = (id: string) => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    setActiveDropdown(id);
  };

  const handleMouseLeave = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/noticias?busca=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md border-b border-slate-200">
      {/* Top Gov Bar */}
      <div className="bg-[#003831] text-xs text-white/90 py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-4">
            <span className="font-semibold tracking-wide flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FAAE2B]"></span>
              Portal Oficial do Município de Goiânia
            </span>
            <span className="hidden md:inline text-white/40">|</span>
            <span className="hidden md:flex items-center gap-1 text-white/80">
              <Phone className="w-3 h-3 text-[#FAAE2B]" /> Central 156 / Atende Fácil
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="https://transparencia.goiania.go.gov.br"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FAAE2B] transition-colors flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#FAAE2B]" />
              Transparência Pública
              <ExternalLink className="w-2.5 h-2.5 opacity-60" />
            </a>
            <a
              href="https://dom.goiania.go.gov.br"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FAAE2B] transition-colors flex items-center gap-1"
            >
              <FileText className="w-3.5 h-3.5 text-[#FAAE2B]" />
              Diário Oficial
              <ExternalLink className="w-2.5 h-2.5 opacity-60" />
            </a>
            <Link
              href="/pagina/ouvidoria-e-acesso-a-informacao"
              className="hover:text-[#FAAE2B] transition-colors flex items-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#FAAE2B]" />
              Ouvidoria
            </Link>
          </div>
        </div>
      </div>

      {/* Main Brand & Actions Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo & Typography */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="relative w-12 h-12 flex-shrink-0 bg-[#00473E] rounded-xl flex items-center justify-center p-2 shadow-inner group-hover:scale-105 transition-transform">
            <Image
              src="/brasao.svg"
              alt="Brasão Oficial de Goiânia"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
            <Building className="w-6 h-6 text-[#FAAE2B] absolute inset-0 m-auto opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div>
            <span className="block text-xl sm:text-2xl font-black tracking-tight text-[#00473E] leading-none">
              GOIÂNIA
            </span>
            <span className="block text-xs uppercase tracking-wider font-semibold text-[#475d5b] mt-0.5">
              Prefeitura Municipal
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links & Dropdowns */}
        <nav className="hidden lg:flex items-center space-x-1">
          {menus.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const itemIdStr = String(item.id);

            return (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => hasChildren && handleMouseEnter(itemIdStr)}
                onMouseLeave={handleMouseLeave}
              >
                {hasChildren ? (
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === itemIdStr ? null : itemIdStr)}
                    className={`flex items-center gap-1 px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
                      activeDropdown === itemIdStr
                        ? 'bg-[#00473E] text-white'
                        : 'text-[#2A454A] hover:bg-slate-100 hover:text-[#00473E]'
                    }`}
                  >
                    {item.title}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === itemIdStr ? 'rotate-180 text-[#FAAE2B]' : 'text-slate-400'
                      }`}
                    />
                  </button>
                ) : item.isExternal || item.url.startsWith('http') ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-[#2A454A] hover:bg-slate-100 hover:text-[#00473E] rounded-lg transition-colors"
                  >
                    {item.title}
                    <ExternalLink className="w-3 h-3 opacity-60 text-slate-400" />
                  </a>
                ) : (
                  <Link
                    href={item.url}
                    className="px-3.5 py-2 text-sm font-semibold text-[#2A454A] hover:bg-slate-100 hover:text-[#00473E] rounded-lg transition-colors"
                  >
                    {item.title}
                  </Link>
                )}

                {/* Dropdown Menu Tree */}
                {hasChildren && activeDropdown === itemIdStr && (
                  <div className="absolute top-full left-0 mt-1.5 w-72 bg-white rounded-xl shadow-2xl border border-slate-100 py-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3.5 py-1.5 mb-1 border-b border-slate-100">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Serviços para {item.title}
                      </span>
                    </div>
                    {item.children?.map((sub) => {
                      const isSubExternal = sub.isExternal || sub.url.startsWith('http');
                      return isSubExternal ? (
                        <a
                          key={sub.id}
                          href={sub.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between px-3.5 py-2 text-sm font-medium text-slate-700 hover:bg-[#00473E]/5 hover:text-[#00473E] transition-colors rounded-lg mx-1"
                        >
                          <span>{sub.title}</span>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                        </a>
                      ) : (
                        <Link
                          key={sub.id}
                          href={sub.url}
                          onClick={() => setActiveDropdown(null)}
                          className="block px-3.5 py-2 text-sm font-medium text-slate-700 hover:bg-[#00473E]/5 hover:text-[#00473E] transition-colors rounded-lg mx-1"
                        >
                          {sub.title}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Global Search Bar & Mobile Burger */}
        <div className="flex items-center space-x-2">
          {/* Search Trigger */}
          <div className="relative">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 rounded-xl bg-slate-100 text-[#00473E] hover:bg-[#00473E] hover:text-white transition-colors flex items-center gap-2"
              title="Pesquisar no portal"
              aria-label="Pesquisar no portal"
            >
              <Search className="w-5 h-5" />
              <span className="hidden sm:inline text-xs font-semibold pr-1">Buscar</span>
            </button>

            {/* Quick Search Overlay Dropdown */}
            {searchOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 z-50">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      executeSearch(e.target.value);
                    }}
                    placeholder="O que você procura em Goiânia? (ex: IPTU, Saúde, Escolas)..."
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00473E] focus:bg-white"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => clearSearch()}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </form>

                {/* Instant search preview results */}
                {isSearching && (
                  <div className="mt-3 text-xs text-slate-500 py-2 text-center animate-pulse">
                    Buscando na API da Prefeitura...
                  </div>
                )}

                {searchResults.length > 0 && (
                  <div className="mt-3 max-h-60 overflow-y-auto divide-y divide-slate-100">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Resultados encontrados:
                    </span>
                    {searchResults.slice(0, 5).map((item) => (
                      <Link
                        key={item.id}
                        href={item.url.startsWith('/') ? item.url : `/noticias?busca=${encodeURIComponent(item.title)}`}
                        onClick={() => setSearchOpen(false)}
                        className="block py-2 px-2 hover:bg-slate-50 rounded text-sm text-[#00473E] font-medium transition-colors"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => toggleMobileMenu()}
            className="lg:hidden p-2.5 rounded-xl bg-slate-100 text-[#00473E] hover:bg-slate-200 transition-colors"
            aria-label="Abrir menu de navegação"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 py-4 max-h-[80vh] overflow-y-auto space-y-3 shadow-inner">
          {menus.map((item) => (
            <div key={item.id} className="border-b border-slate-100 pb-2">
              <div className="font-bold text-[#00473E] text-base mb-1.5 flex items-center justify-between">
                <span>{item.title}</span>
              </div>
              {item.children && item.children.length > 0 ? (
                <div className="pl-3 space-y-1.5 border-l-2 border-[#FAAE2B]">
                  {item.children.map((sub) => {
                    const isSubExternal = sub.isExternal || sub.url.startsWith('http');
                    return isSubExternal ? (
                      <a
                        key={sub.id}
                        href={sub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between text-sm text-slate-600 hover:text-[#00473E] py-1"
                      >
                        <span>{sub.title}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                      </a>
                    ) : (
                      <Link
                        key={sub.id}
                        href={sub.url}
                        onClick={() => toggleMobileMenu(false)}
                        className="block text-sm text-slate-600 hover:text-[#00473E] py-1"
                      >
                        {sub.title}
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <Link
                  href={item.url}
                  onClick={() => toggleMobileMenu(false)}
                  className="block text-sm text-slate-600 hover:text-[#00473E] py-1"
                >
                  Acessar {item.title}
                </Link>
              )}
            </div>
          ))}

          <div className="pt-2 flex flex-col gap-2">
            <Link
              href="/noticias"
              onClick={() => toggleMobileMenu(false)}
              className="w-full text-center py-2.5 rounded-xl bg-[#00473E] text-white font-bold text-sm"
            >
              Portal de Notícias
            </Link>
            <Link
              href="/servicos"
              onClick={() => toggleMobileMenu(false)}
              className="w-full text-center py-2.5 rounded-xl bg-[#FAAE2B] text-[#00473E] font-bold text-sm"
            >
              Carta de Serviços
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
