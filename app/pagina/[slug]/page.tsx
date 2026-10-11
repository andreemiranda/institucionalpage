import React from 'react';
import { getPageBySlug } from '@/lib/wp';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, FileText } from 'lucide-react';

export const revalidate = 60;

export default async function PageDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-500 flex items-center gap-2">
        <Link href="/" className="hover:text-[#f36e22] transition-colors">Início</Link>
        <span>/</span>
        <span className="text-[#002e47] font-semibold">{page.title.rendered}</span>
      </nav>

      <article className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-8">
        <header className="border-b border-slate-100 pb-6 space-y-2">
          <div className="flex items-center gap-2 text-[#f36e22] text-xs font-bold uppercase tracking-wider">
            <FileText className="w-4 h-4" />
            <span>Página Institucional</span>
          </div>
          <h1 
            className="text-3xl sm:text-4xl font-extrabold text-[#002e47] leading-tight"
            dangerouslySetInnerHTML={{ __html: page.title.rendered }}
          />
        </header>

        <div 
          className="prose prose-base sm:prose-lg max-w-none text-[#2A454A] leading-relaxed [&>p]:mb-5 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-[#002e47] [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-[#002e47] [&>a]:text-[#f36e22] [&>a]:underline"
          dangerouslySetInnerHTML={{ __html: page.content.rendered }}
        />

        <div className="pt-8 border-t border-slate-100">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#002e47] hover:text-[#f36e22] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para a página inicial</span>
          </Link>
        </div>
      </article>
    </div>
  );
}
