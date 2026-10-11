import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Deterministically formats an ISO date string (YYYY-MM-DD...) in Brazilian Portuguese
 * using pure string extraction, avoiding ANY client/server timezone or locale mismatches.
 */
export function formatPostDate(dateStr: string, mode: 'full' | 'short' | 'with-time' = 'full'): string {
  if (!dateStr) return '';
  const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?/);
  if (!match) return dateStr;

  const [, year, month, dayStr, hour, minute] = match;
  const day = parseInt(dayStr, 10);
  const months = [
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
  ];
  const monthName = months[parseInt(month, 10) - 1] || month;

  if (mode === 'short') {
    return `${dayStr}/${month}/${year}`;
  }
  if (mode === 'with-time' && hour && minute) {
    return `${day} de ${monthName} de ${year} às ${hour}:${minute}`;
  }
  return `${day} de ${monthName}, ${year}`;
}

/**
 * Strips HTML tags and decodes common HTML entities for card excerpts and previews.
 * Prevents invalid nested <p> or <div> HTML tags causing React hydration errors.
 */
export function stripHtml(html: string): string {
  if (!html) return '';
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8216;/g, '‘')
    .replace(/&#8217;/g, '’')
    .replace(/&#8220;/g, '“')
    .replace(/&#8221;/g, '”')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#038;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}
