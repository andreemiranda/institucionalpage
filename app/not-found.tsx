import React from 'react';
import Link from 'next/link';
import { ArrowLeft, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-16 h-16 bg-[#fff1ec] text-[#f36e22] rounded-2xl flex items-center justify-center mx-auto shadow-xs">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-extrabold text-[#002e47]">
        Página Não Encontrada (404)
      </h1>
      <p className="text-sm text-slate-600 leading-relaxed">
        O conteúdo que você tentou acessar pode ter sido movido, renomeado ou não está mais disponível no portal.
      </p>
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#f36e22] hover:bg-[#f27730] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para o Início</span>
        </Link>
      </div>
    </div>
  );
}
