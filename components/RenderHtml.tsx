import React from 'react';

interface RenderHtmlProps {
  html: string;
  className?: string;
}

/**
 * Sanitizes and securely renders WordPress HTML output
 * Strips dangerous executable script tags and handles links safely
 */
export function RenderHtml({ html, className = '' }: RenderHtmlProps) {
  if (!html) return null;

  // Sanitize potentially unsafe tags while preserving formatting and media
  const sanitized = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, (match) => {
      // Only keep trusted iframes like YouTube or Google Maps
      if (match.includes('youtube.com') || match.includes('youtu.be') || match.includes('google.com/maps')) {
        return match;
      }
      return '';
    })
    .replace(/on\w+="[^"]*"/g, '') // remove inline JS events like onload, onclick
    .replace(/javascript:/gi, '');

  return (
    <div
      className={`prose prose-slate max-w-none text-[#2A454A] leading-relaxed
        prose-headings:text-[#00473E] prose-headings:font-bold prose-headings:tracking-tight
        prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
        prose-p:my-4 prose-p:text-base prose-p:leading-7
        prose-a:text-[#00473E] prose-a:font-semibold prose-a:underline hover:prose-a:text-[#FAAE2B]
        prose-img:rounded-xl prose-img:shadow-md prose-img:my-6 prose-img:mx-auto
        prose-ul:list-disc prose-ul:pl-6 prose-ul:my-4
        prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-4
        prose-li:my-1.5
        prose-blockquote:border-l-4 prose-blockquote:border-[#FAAE2B] prose-blockquote:bg-white/60 prose-blockquote:p-4 prose-blockquote:rounded-r-lg prose-blockquote:italic
        prose-table:w-full prose-table:border-collapse prose-table:my-6 prose-table:bg-white prose-table:rounded-lg prose-table:overflow-hidden prose-table:shadow-sm
        prose-th:bg-[#00473E] prose-th:text-white prose-th:p-3 prose-th:text-left prose-th:text-sm prose-th:font-semibold
        prose-td:p-3 prose-td:border-b prose-td:border-slate-200 prose-td:text-sm
        ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}
