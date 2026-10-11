'use client';

import React from 'react';
import Link from 'next/link';
import { useAppStore } from '@/store/useAppStore';
import { WPPost, WPCategory } from '@/types/wordpress';
import { formatPostDate, stripHtml } from '@/lib/utils';
import { Newspaper, ChevronRight, Tag, PhoneCall, ExternalLink, ShieldCheck } from 'lucide-react';

interface SidebarProps {
  recentPosts?: WPPost[];
  categories?: WPCategory[];
  currentSlug?: string;
}

export function Sidebar({ recentPosts = [], categories = [], currentSlug }: SidebarProps) {
  const { menus } = useAppStore();

  return (
    <aside className="w-full lg:w-80 flex-shrink-0 space-y-6">
      {/* Quick Services Context Card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#00473E] mb-3 flex items-center gap-2 border-b border-slate-100 pb-2">
          <ShieldCheck className="w-4 h-4 text-[#FAAE2B]" />
          Acesso Rápido ao Cidadão
        </h3>
        <div className="space-y-2">
          {menus
            .find((m) => m.id === 'cidadao')
            ?.children?.slice(0, 5)
            .map((item) => (
              <a
                key={item.id}
                href={item.url}
                target={item.isExternal ? '_blank' : '_self'}
                rel={item.isExternal ? 'noopener noreferrer' : undefined}
                className="flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-[#00473E] hover:bg-slate-50 p-2 rounded-lg transition-colors group"
              >
                <span>{item.title}</span>
                {item.isExternal ? (
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#FAAE2B]" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#00473E]" />
                )}
              </a>
            ))}
        </div>
      </div>

      {/* Categories Widget */}
      {categories.length > 0 && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#00473E] mb-3 flex items-center gap-2 border-b border-slate-100 pb-2">
            <Tag className="w-4 h-4 text-[#FAAE2B]" />
            Editorias & Categorias
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categoria/${cat.slug}`}
                className="text-xs bg-slate-100 hover:bg-[#00473E] hover:text-white text-[#2A454A] font-medium px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5"
              >
                <span>{cat.name}</span>
                {cat.count ? (
                  <span className="opacity-60 text-[10px] bg-black/10 px-1.5 py-0.2 rounded-full">
                    {cat.count}
                  </span>
                ) : null}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Recent Posts / Latest News */}
      {recentPosts.length > 0 && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#00473E] mb-3 flex items-center gap-2 border-b border-slate-100 pb-2">
            <Newspaper className="w-4 h-4 text-[#FAAE2B]" />
            Últimas Notícias
          </h3>
          <div className="divide-y divide-slate-100">
            {recentPosts
              .filter((p) => p.slug !== currentSlug)
              .slice(0, 4)
              .map((post) => (
                <Link
                  key={post.id}
                  href={`/noticia/${post.slug}`}
                  className="block py-3 group hover:opacity-90 transition-opacity"
                >
                  <span className="text-[11px] text-[#FAAE2B] font-bold block mb-1">
                    {formatPostDate(post.date, 'short')}
                  </span>
                  <h4 className="text-xs font-semibold text-[#2A454A] group-hover:text-[#00473E] line-clamp-2 leading-snug">
                    {stripHtml(post.title.rendered)}
                  </h4>
                </Link>
              ))}
          </div>
          <Link
            href="/noticias"
            className="mt-3 block text-center text-xs font-bold text-[#00473E] hover:underline"
          >
            Ver todas as notícias &rarr;
          </Link>
        </div>
      )}

      {/* Emergency & Municipal Contact Hotlines */}
      <div className="bg-[#00473E] text-white rounded-2xl p-5 shadow-sm">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#FAAE2B] mb-2 flex items-center gap-2">
          <PhoneCall className="w-4 h-4" />
          Telefones de Emergência
        </h3>
        <p className="text-xs text-white/80 mb-3 leading-relaxed">
          Canais municipais e de atendimento à comunidade de Goiânia:
        </p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white/10 rounded-lg p-2 text-center">
            <span className="block font-bold text-base text-[#FAAE2B]">156</span>
            <span className="text-[10px] text-white/70">Atende Fácil</span>
          </div>
          <div className="bg-white/10 rounded-lg p-2 text-center">
            <span className="block font-bold text-base text-[#FAAE2B]">153</span>
            <span className="text-[10px] text-white/70">Guarda Civil (GCM)</span>
          </div>
          <div className="bg-white/10 rounded-lg p-2 text-center">
            <span className="block font-bold text-base text-[#FAAE2B]">192</span>
            <span className="text-[10px] text-white/70">SAMU Goiânia</span>
          </div>
          <div className="bg-white/10 rounded-lg p-2 text-center">
            <span className="block font-bold text-base text-[#FAAE2B]">193</span>
            <span className="text-[10px] text-white/70">Corpo de Bombeiros</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
