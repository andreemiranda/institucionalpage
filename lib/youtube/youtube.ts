/**
 * Módulo de Extração e Embed Oficial do YouTube
 * Suporte a todos os formatos do YouTube:
 * - youtube.com/watch?v=...
 * - youtu.be/...
 * - youtube.com/embed/...
 * - youtube-nocookie.com/embed/...
 * - youtube.com/live/...
 * - youtube.com/shorts/...
 * - youtube.com/v/...
 * - Tags HTML (iframe, embed, a)
 * - IDs brutos de 11 caracteres
 */

export interface YouTubeEmbedOptions {
  autoplay?: boolean | number;
  rel?: number;
  modestbranding?: number;
  enablejsapi?: number;
  controls?: number;
  mute?: boolean | number;
  start?: number;
  loop?: boolean | number;
}

export interface VideoPost {
  id: number | string;
  slug: string;
  title: string | { rendered: string };
  description?: string | { rendered: string };
  content?: string | { rendered: string };
  date: string;
  category?: string;
  duration?: string;
  acf?: {
    link_video?: string;
    video_url?: string;
    youtube_id?: string;
    [key: string]: unknown;
  };
  youtubeId?: string;
  thumbnailUrl?: string;
}

/**
 * Expressões regulares para todos os padrões de URLs e tags do YouTube
 */
const YOUTUBE_PATTERNS = [
  // 1. Tag iframe com src contendo URL do YouTube
  /<iframe[^>]*\bsrc=["'](?:https?:)?\/\/(?:www\.)?(?:youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9_-]{11})[^"']*["'][^>]*>/i,
  
  // 2. youtube.com/watch?v=VIDEO_ID (com ou sem parâmetros adicionais)
  /(?:https?:)?\/\/(?:[a-zA-Z0-9-]+\.)?youtube\.com\/watch\?(?:[^&]+&)*v=([a-zA-Z0-9_-]{11})/i,
  
  // 3. youtu.be/VIDEO_ID
  /(?:https?:)?\/\/youtu\.be\/([a-zA-Z0-9_-]{11})/i,
  
  // 4. youtube.com/embed/VIDEO_ID ou youtube-nocookie.com/embed/VIDEO_ID
  /(?:https?:)?\/\/(?:[a-zA-Z0-9-]+\.)?(?:youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9_-]{11})/i,
  
  // 5. youtube.com/live/VIDEO_ID
  /(?:https?:)?\/\/(?:[a-zA-Z0-9-]+\.)?youtube\.com\/live\/([a-zA-Z0-9_-]{11})/i,
  
  // 6. youtube.com/shorts/VIDEO_ID
  /(?:https?:)?\/\/(?:[a-zA-Z0-9-]+\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/i,
  
  // 7. youtube.com/v/VIDEO_ID
  /(?:https?:)?\/\/(?:[a-zA-Z0-9-]+\.)?youtube\.com\/v\/([a-zA-Z0-9_-]{11})/i,

  // 8. Gutenberg block ou shortcode [embed]...[/embed]
  /\[embed\](?:https?:)?\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})[^[]*\[\/embed\]/i,

  // 9. Wrapper genérico wp-block-embed
  /<div[^>]*class="[^"]*wp-block-embed__wrapper[^"]*"[^>]*>[\s\S]*?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})[\s\S]*?<\/div>/i,
];

/**
 * Valida se uma string é exatamente um ID válido do YouTube (11 caracteres alfanuméricos com _ e -)
 */
export function isValidYouTubeId(id: string): boolean {
  return /^[a-zA-Z0-9_-]{11}$/.test(id.trim());
}

/**
 * Extrai o ID do YouTube a partir de qualquer string, URL, tag HTML ou ID bruto
 */
export function extractYouTubeId(input: string | null | undefined): string | null {
  if (!input || typeof input !== 'string') {
    return null;
  }

  const trimmed = input.trim();
  if (!trimmed) {
    return null;
  }

  // Se já for um ID direto de 11 caracteres
  if (isValidYouTubeId(trimmed)) {
    return trimmed;
  }

  // Testa cada padrão
  for (const pattern of YOUTUBE_PATTERNS) {
    const match = trimmed.match(pattern);
    if (match && match[1] && isValidYouTubeId(match[1])) {
      return match[1];
    }
  }

  // Fallback para URL parser se contiver 'youtube.com'
  try {
    if (trimmed.includes('youtube.com') || trimmed.includes('youtu.be')) {
      const urlString = trimmed.startsWith('http') ? trimmed : `https://${trimmed}`;
      const url = new URL(urlString);
      
      // youtu.be/<id>
      if (url.hostname.includes('youtu.be')) {
        const id = url.pathname.replace(/^\//, '').split('/')[0]?.split('?')[0];
        if (id && isValidYouTubeId(id)) return id;
      }
      
      // youtube.com/watch?v=<id>
      const v = url.searchParams.get('v');
      if (v && isValidYouTubeId(v)) return v;

      // youtube.com/embed/<id>, /live/<id>, /shorts/<id>
      const parts = url.pathname.split('/').filter(Boolean);
      if (parts.length >= 2 && ['embed', 'live', 'shorts', 'v'].includes(parts[0])) {
        const id = parts[1].split('?')[0];
        if (id && isValidYouTubeId(id)) return id;
      }
    }
  } catch {
    // URL inválida, segue fluxo
  }

  return null;
}

/**
 * Extrai automaticamente o link real de cada vídeo registrado no WordPress através de:
 * - acf.link_video
 * - acf.video_url
 * - acf.youtube_id
 * - content.rendered
 * - excerpt.rendered
 */
export function extractVideoFromWP(post: unknown): string | null {
  if (!post || typeof post !== 'object') {
    return null;
  }

  const p = post as {
    acf?: {
      link_video?: string;
      video_url?: string;
      youtube_id?: string;
      [key: string]: unknown;
    };
    youtubeId?: string;
    content?: { rendered?: string };
    excerpt?: { rendered?: string };
  };

  // 1. Checa ACF link_video prioritariamente
  if (p.acf?.link_video) {
    const id = extractYouTubeId(p.acf.link_video);
    if (id) return id;
  }

  // 2. Checa ACF video_url
  if (p.acf?.video_url) {
    const id = extractYouTubeId(p.acf.video_url);
    if (id) return id;
  }

  // 3. Checa ACF youtube_id
  if (p.acf?.youtube_id) {
    const id = extractYouTubeId(p.acf.youtube_id);
    if (id) return id;
  }

  // 4. Checa propriedade direta youtubeId
  if (p.youtubeId) {
    const id = extractYouTubeId(p.youtubeId);
    if (id) return id;
  }

  // 5. Checa conteúdo renderizado
  if (p.content?.rendered) {
    const id = extractYouTubeId(p.content.rendered);
    if (id) return id;
  }

  // 6. Checa resumo renderizado
  if (p.excerpt?.rendered) {
    const id = extractYouTubeId(p.excerpt.rendered);
    if (id) return id;
  }

  return null;
}

/**
 * Gera a URL oficial de incorporação do YouTube no padrão solicitado:
 * https://www.youtube.com/embed/{VIDEO_ID}?rel=0&modestbranding=1&enablejsapi=1
 */
export function getYoutubeEmbedUrl(
  videoIdOrUrl: string,
  options: YouTubeEmbedOptions = {}
): string {
  const videoId = extractYouTubeId(videoIdOrUrl);
  if (!videoId) {
    return '';
  }

  const params = new URLSearchParams();
  params.set('rel', String(options.rel ?? 0));
  params.set('modestbranding', String(options.modestbranding ?? 1));
  params.set('enablejsapi', String(options.enablejsapi ?? 1));

  if (options.autoplay !== undefined) {
    params.set('autoplay', options.autoplay ? '1' : '0');
  }
  if (options.controls !== undefined) {
    params.set('controls', String(options.controls));
  }
  if (options.mute !== undefined) {
    params.set('mute', options.mute ? '1' : '0');
  }
  if (options.start !== undefined) {
    params.set('start', String(options.start));
  }
  if (options.loop !== undefined) {
    params.set('loop', options.loop ? '1' : '0');
  }

  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

export type YouTubeThumbnailQuality =
  | 'default'
  | 'hqdefault'
  | 'mqdefault'
  | 'sddefault'
  | 'maxresdefault';

/**
 * Gera thumbnails automáticas em alta resolução (hqdefault.jpg) diretamente do YouTube
 */
export function getYoutubeThumbnailUrl(
  videoIdOrUrl: string,
  quality: YouTubeThumbnailQuality = 'hqdefault'
): string {
  const videoId = extractYouTubeId(videoIdOrUrl);
  if (!videoId) {
    return '/og-image.png';
  }
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}

/**
 * Lista de vídeos oficiais da Prefeitura de Goiânia com links reais registrados no acervo
 * IDs reais ativos: d9z6Cq2HD_4, Oj7by95HGRI, GcSZ0KZhZVY, CYH6QxNDvPQ
 */
export const OFFICIAL_GOIANIA_VIDEOS: VideoPost[] = [
  {
    id: 1001,
    slug: 'goiania-em-acao-obras-e-revitalizacao-urbana',
    title: 'Goiânia em Ação: Obras de Drenagem e Pavimentação Asfáltica',
    category: 'Infraestrutura Urbana',
    description:
      'Acompanhe as frentes de obras da Seinfra com recapeamento asfáltico e modernização da infraestrutura em mais de 15 bairros da capital.',
    duration: '03:45',
    date: '2026-10-18T10:00:00',
    acf: {
      link_video: 'https://www.youtube.com/watch?v=d9z6Cq2HD_4',
    },
    youtubeId: 'd9z6Cq2HD_4',
    thumbnailUrl: 'https://img.youtube.com/vi/d9z6Cq2HD_4/hqdefault.jpg',
  },
  {
    id: 1002,
    slug: 'saude-da-familia-e-mutiroes-de-especialidades',
    title: 'Saúde da Família: Mutirões de Especialidades e Exames nas UPAs',
    category: 'Saúde Municipal',
    description:
      'Secretaria Municipal de Saúde amplia atendimentos de raio-X, consultas com médicos especialistas e horário estendido nas unidades de saúde.',
    duration: '04:12',
    date: '2026-10-15T14:30:00',
    acf: {
      link_video: 'https://youtu.be/Oj7by95HGRI',
    },
    youtubeId: 'Oj7by95HGRI',
    thumbnailUrl: 'https://img.youtube.com/vi/Oj7by95HGRI/hqdefault.jpg',
  },
  {
    id: 1003,
    slug: 'educacao-municipal-tecnologia-e-novos-espacos-pedagogicos',
    title: 'Educação Municipal: Tecnologia, Robótica e Kits Maker nos CMEIs',
    category: 'Educação & Inovação',
    description:
      'Mais de 30 mil estudantes da rede municipal de ensino recebem novos laboratórios digitais e jogos educativos inclusivos.',
    duration: '02:58',
    date: '2026-10-12T09:15:00',
    acf: {
      link_video: 'https://www.youtube.com/embed/GcSZ0KZhZVY',
    },
    youtubeId: 'GcSZ0KZhZVY',
    thumbnailUrl: 'https://img.youtube.com/vi/GcSZ0KZhZVY/hqdefault.jpg',
  },
  {
    id: 1004,
    slug: 'transmissao-oficial-das-sessoes-e-coletivas',
    title: 'Transmissão Oficial das Sessões e Coletivas de Imprensa',
    category: 'Transparência & Gestão',
    description:
      'Transmissão ao vivo e pronunciamentos oficiais sobre o plano diretor, programas de zeladoria e orçamento municipal de Goiânia.',
    duration: '05:30',
    date: '2026-10-10T16:00:00',
    acf: {
      link_video: 'https://www.youtube.com/live/CYH6QxNDvPQ',
    },
    youtubeId: 'CYH6QxNDvPQ',
    thumbnailUrl: 'https://img.youtube.com/vi/CYH6QxNDvPQ/hqdefault.jpg',
  },
];

export const AUTHORIZED_IFRAME_HOSTS = [
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

