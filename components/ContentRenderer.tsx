import React from 'react';
import { extractYouTubeId, getYoutubeEmbedUrl } from '@/lib/youtube/youtube';

export interface ContentRendererProps {
  html: string;
  className?: string;
}

const AUTHORIZED_IFRAME_HOSTS = [
  'youtube.com',
  'www.youtube.com',
  'youtube-nocookie.com',
  'www.youtube-nocookie.com',
  'youtu.be',
  'player.vimeo.com',
  'maps.google.com',
  'google.com/maps',
  'www.google.com/maps',
];

/**
 * Sanitiza o HTML de publicações e normaliza automaticamente
 * links e iframes do YouTube para o padrão /embed/.
 */
export function sanitizeContentHtml(html: string): string {
  if (!html || typeof html !== 'string') {
    return '';
  }

  let processed = html;

  // 1. Remove scripts executáveis e event handlers inline inseguros
  processed = processed
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/\bon\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/javascript\s*:/gi, '');

  // 2. Normaliza Gutenberg wp-block-embed de YouTube
  processed = processed.replace(
    /<figure[^>]*class="[^"]*wp-block-embed[^"]*"[^>]*>[\s\S]*?<div[^>]*class="wp-block-embed__wrapper"[^>]*>[\s\S]*?(https?:\/\/[^\s<]+)[\s\S]*?<\/div>[\s\S]*?<\/figure>/gi,
    (_match, rawUrl) => {
      const videoId = extractYouTubeId(rawUrl);
      if (videoId) {
        const embedUrl = getYoutubeEmbedUrl(videoId);
        return `
          <div class="my-8">
            <div class="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-black">
              <iframe
                src="${embedUrl}"
                title="Vídeo Oficial - Prefeitura de Goiânia"
                class="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        `;
      }
      return _match;
    }
  );

  // 3. Normaliza links avulsos do YouTube dentro de parágrafos <p>
  processed = processed.replace(
    /<p>\s*(https?:\/\/(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|live\/|shorts\/)|youtu\.be\/)[^\s<]+)\s*<\/p>/gi,
    (_match, rawUrl) => {
      const videoId = extractYouTubeId(rawUrl);
      if (videoId) {
        const embedUrl = getYoutubeEmbedUrl(videoId);
        return `
          <div class="my-8">
            <div class="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-black">
              <iframe
                src="${embedUrl}"
                title="Vídeo Oficial - Prefeitura de Goiânia"
                class="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        `;
      }
      return _match;
    }
  );

  // 4. Normaliza iframes existentes do YouTube e garante padrão /embed/ oficial
  processed = processed.replace(
    /<iframe\b([^>]*\bsrc=["']([^"']+)["'][^>]*)><\/iframe>/gi,
    (_match, attrs, src) => {
      const videoId = extractYouTubeId(src);
      if (videoId) {
        const embedUrl = getYoutubeEmbedUrl(videoId);
        return `
          <div class="my-8">
            <div class="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-black">
              <iframe
                src="${embedUrl}"
                title="Vídeo Oficial - Prefeitura de Goiânia"
                class="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        `;
      }

      // Se for outro host autorizado (Vimeo, Google Maps)
      const isAuthorized = AUTHORIZED_IFRAME_HOSTS.some((host) =>
        src.toLowerCase().includes(host)
      );

      if (isAuthorized) {
        return `
          <div class="my-8">
            <div class="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-black">
              <iframe ${attrs} class="absolute inset-0 w-full h-full" allowfullscreen loading="lazy"></iframe>
            </div>
          </div>
        `;
      }

      // Remove iframes de hosts não autorizados
      return '';
    }
  );

  // 5. Wrap de tags <video> HTML5
  processed = processed.replace(
    /<video([^>]*)>([\s\S]*?)<\/video>/gi,
    (_match, attrs, inner) => {
      return `
        <div class="my-8">
          <div class="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-black flex items-center justify-center">
            <video ${attrs} class="w-full h-full object-contain" controls preload="metadata">${inner}</video>
          </div>
        </div>
      `;
    }
  );

  return processed;
}

export function ContentRenderer({ html, className = '' }: ContentRendererProps) {
  if (!html) return null;

  const content = sanitizeContentHtml(html);

  return (
    <div
      className={`prose prose-slate max-w-none text-[#2A454A] leading-relaxed
        prose-headings:text-[#002e47] prose-headings:font-extrabold prose-headings:tracking-tight
        prose-h1:text-3xl sm:prose-h1:text-4xl prose-h1:mb-6
        prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4
        prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3
        prose-p:my-4 prose-p:text-base prose-p:leading-8
        prose-a:text-[#f36e22] prose-a:font-semibold prose-a:underline hover:prose-a:text-[#d35815]
        prose-img:rounded-2xl prose-img:shadow-md prose-img:my-6 prose-img:mx-auto prose-img:border prose-img:border-slate-200
        prose-ul:list-disc prose-ul:pl-6 prose-ul:my-4
        prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-4
        prose-li:my-2
        prose-blockquote:border-l-4 prose-blockquote:border-[#f36e22] prose-blockquote:bg-slate-50 prose-blockquote:p-4 sm:prose-blockquote:p-6 prose-blockquote:rounded-r-2xl prose-blockquote:italic
        prose-table:w-full prose-table:border-collapse prose-table:my-6 prose-table:bg-white prose-table:rounded-xl prose-table:overflow-hidden prose-table:shadow-sm prose-table:border prose-table:border-slate-200
        prose-th:bg-[#002e47] prose-th:text-white prose-th:p-3 prose-th:text-left prose-th:text-xs prose-th:font-bold prose-th:uppercase prose-th:tracking-wider
        prose-td:p-3 prose-td:border-b prose-td:border-slate-100 prose-td:text-sm
        ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

// Alias para compatibilidade total com RenderHtml
export const RenderHtml = ContentRenderer;
