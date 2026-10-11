'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App error:', error);
  }, [error]);

  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-extrabold text-[#002e47]">
        Ocorreu um Erro no Carregamento
      </h1>
      <p className="text-sm text-slate-600 leading-relaxed">
        Não foi possível carregar as informações no momento. Verifique sua conexão ou tente novamente em alguns instantes.
      </p>
      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center gap-2 bg-[#002e47] hover:bg-[#003856] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Tentar Novamente</span>
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-slate-200 hover:bg-slate-300 text-[#002e47] px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Página Inicial</span>
        </Link>
      </div>
    </div>
  );
}
