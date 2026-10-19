import React from 'react';

interface RenderHtmlProps {
  html: string;
  className?: string;
}

/**
 * Transforms WordPress content HTML to properly embed all videos (YouTube, Vimeo, HTML5)
 * and sanitizes harmful scripts while preserving rich embeds, tables, and images.
 */
function processAndEmbedMedia(html: string): string {
  if (!html) return '';

  let processed = html;

  // 1. Remove dangerous executable script tags and inline handlers
  processed = processed
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/javascript:/gi, '');

  // 2. Transform Gutenberg wp-block-embed YouTube blocks
  // e.g.: <figure class="wp-block-embed is-type-video..."><div class="wp-block-embed__wrapper">https://www.youtube.com/watch?v=XYZ</div></figure>
  processed = processed.replace(
    /<figure[^>]*class="[^"]*wp-block-embed[^"]*"[^>]*>[\s\S]*?<div[^>]*class="wp-block-embed__wrapper"[^>]*>[\s\S]*?(https?:\/\/(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]+)[^\s<]*)[\s\S]*?<\/div>[\s\S]*?<\/figure>/gi,
    (_match, _url, videoId) => {
      return `
        <div class="my-8">
          <div class="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-black">
            <iframe
              src="https://www.youtube-nocookie.com/embed/${videoId}?rel=0"
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
  );

  // 3. Transform standalone YouTube URLs in <p> tags
  // e.g.: <p>https://www.youtube.com/watch?v=XYZ</p> or <p>https://youtu.be/XYZ</p>
  processed = processed.replace(
    /<p>\s*(https?:\/\/(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]+)[^\s<]*)\s*<\/p>/gi,
    (_match, _url, videoId) => {
      return `
        <div class="my-8">
          <div class="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-black">
            <iframe
              src="https://www.youtube-nocookie.com/embed/${videoId}?rel=0"
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
  );

  // 4. Wrap existing YouTube or Google Maps iframes into responsive aspect-ratio containers
  processed = processed.replace(
    /<iframe([^>]*src=["'](?:https?:)?\/\/(?:www\.)?(?:youtube\.com|youtube-nocookie\.com|youtu\.be|player\.vimeo\.com|maps\.google\.com|google\.com\/maps)[^"']*["'][^>]*)><\/iframe>/gi,
    (_match, attrs) => {
      return `
        <div class="my-8">
          <div class="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-black">
            <iframe ${attrs} class="absolute inset-0 w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy"></iframe>
          </div>
        </div>
      `;
    }
  );

  // 5. Wrap HTML5 <video> tags into responsive styled containers
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

  // 6. Strip any untrusted iframes (not youtube, vimeo, or google maps)
  processed = processed.replace(
    /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
    (match) => {
      if (
        match.includes('youtube.com') ||
        match.includes('youtube-nocookie.com') ||
        match.includes('youtu.be') ||
        match.includes('vimeo.com') ||
        match.includes('google.com/maps')
      ) {
        return match;
      }
      return '';
    }
  );

  return processed;
}

export function RenderHtml({ html, className = '' }: RenderHtmlProps) {
  if (!html) return null;

  const content = processAndEmbedMedia(html);

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
