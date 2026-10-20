/**
 * TypeScript definitions mapping the WordPress REST API v2
 * for Prefeitura de Goiânia (https://goiania.go.gov.br)
 */

export interface WPRenderedString {
  rendered: string;
  protected?: boolean;
}

export interface WPMediaDetails {
  width?: number;
  height?: number;
  file?: string;
  sizes?: {
    [key: string]: {
      file: string;
      width: number;
      height: number;
      mime_type: string;
      source_url: string;
    };
  };
}

export interface WPMedia {
  id: number;
  date: string;
  date_gmt?: string;
  guid?: WPRenderedString;
  modified?: string;
  slug: string;
  status?: string;
  type?: string;
  link?: string;
  title: WPRenderedString;
  author?: number;
  description?: WPRenderedString;
  caption?: WPRenderedString;
  alt_text?: string;
  media_type?: string;
  mime_type?: string;
  media_details?: WPMediaDetails;
  source_url: string;
}

export interface WPAuthor {
  id: number;
  name: string;
  url?: string;
  description?: string;
  link?: string;
  slug?: string;
  avatar_urls?: {
    [size: string]: string;
  };
}

export interface WPTerm {
  id: number;
  link?: string;
  name: string;
  slug: string;
  taxonomy: 'category' | 'post_tag' | string;
}

export interface WPEmbedded {
  author?: WPAuthor[];
  'wp:featuredmedia'?: WPMedia[];
  'wp:term'?: WPTerm[][];
}

export interface WPPost {
  id: number;
  date: string;
  date_gmt?: string;
  guid?: WPRenderedString;
  modified?: string;
  slug: string;
  status?: string;
  type: 'post' | string;
  link: string;
  title: WPRenderedString;
  content: WPRenderedString;
  excerpt: WPRenderedString;
  author?: number;
  featured_media?: number;
  comment_status?: string;
  ping_status?: string;
  sticky?: boolean;
  template?: string;
  format?: string;
  categories: number[];
  tags: number[];
  acf?: {
    link_video?: string;
    video_url?: string;
    youtube_id?: string;
    [key: string]: unknown;
  };
  _embedded?: WPEmbedded;
}

export interface WPPage {
  id: number;
  date: string;
  date_gmt?: string;
  guid?: WPRenderedString;
  modified?: string;
  slug: string;
  status?: string;
  type: 'page';
  link: string;
  title: WPRenderedString;
  content: WPRenderedString;
  excerpt: WPRenderedString;
  author?: number;
  featured_media?: number;
  parent?: number;
  menu_order?: number;
  comment_status?: string;
  ping_status?: string;
  template?: string;
  _embedded?: WPEmbedded;
}

export interface WPCategory {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: 'category';
  parent: number;
}

export interface WPTag {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: 'post_tag';
}

export interface WPUser {
  id: number;
  name: string;
  url: string;
  description: string;
  link: string;
  slug: string;
  avatar_urls?: Record<string, string>;
}

export interface WPSearchResult {
  id: number;
  title: string;
  url: string;
  type: 'post' | 'page' | 'attachment' | string;
  subtype: string;
  _links?: Record<string, unknown>;
}

export interface WPComment {
  id: number;
  post: number;
  parent: number;
  author: number;
  author_name: string;
  author_url: string;
  date: string;
  content: WPRenderedString;
  status: string;
  type: string;
}

/**
 * Recursive Navigation Menu Tree representation
 */
export interface MenuItem {
  id: number | string;
  title: string;
  url: string;
  target?: '_blank' | '_self' | string;
  order?: number;
  parent?: number | string | null;
  classes?: string[];
  description?: string;
  badge?: string;
  children?: MenuItem[];
  isExternal?: boolean;
}

export interface WPMenuResponse {
  id: number;
  name: string;
  slug: string;
  items?: MenuItem[];
}

export interface WPQueryParams {
  page?: number;
  per_page?: number;
  search?: string;
  categories?: number | string;
  tags?: number | string;
  slug?: string;
  _embed?: boolean;
  order?: 'asc' | 'desc';
  orderby?: 'date' | 'relevance' | 'id' | 'title' | 'slug';
}
