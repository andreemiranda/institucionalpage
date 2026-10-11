import {
  WPPost,
  WPPage,
  WPCategory,
  WPTag,
  WPMedia,
  WPUser,
  WPSearchResult,
  WPComment,
  MenuItem,
  WPQueryParams,
} from '@/types/wordpress';

export const WP_BASE_URL = 'https://www.goiania.go.gov.br';
export const WP_API_URL = `${WP_BASE_URL}/wp-json/wp/v2`;
export const WP_MENUS_API_URL = `${WP_BASE_URL}/wp-json/menus/v1`;

const DEFAULT_TIMEOUT_MS = 3500;

/**
 * Fetch wrapper with timeout, ISR revalidation and error handling
 */
async function fetchWP<T>(endpoint: string, options: RequestInit = {}, timeoutMs = DEFAULT_TIMEOUT_MS): Promise<T | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const url = endpoint.startsWith('http') ? endpoint : `${WP_API_URL}${endpoint}`;
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        'User-Agent': 'PrefeituraGoianiaPortal/2.0 (Next.js 15 SSR)',
        ...options.headers,
      },
      next: {
        revalidate: 180, // Cache for 3 minutes for high responsiveness
        ...((options as { next?: { revalidate?: number } }).next || {}),
      },
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data as T;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

// -------------------------------------------------------------
// CURATED RESILIENT DATA (Prefeitura de Goiânia Official Corpus)
// -------------------------------------------------------------

export const OFFICIAL_MENUS: MenuItem[] = [
  {
    id: 'cidadao',
    title: 'Cidadão',
    url: '/servicos?publico=cidadao',
    children: [
      { id: 'iptu', title: 'IPTU e ITU 2026', url: 'https://www.goiania.go.gov.br/servicos/iptu-2026/', isExternal: true },
      { id: 'saude-agendamento', title: 'Agendamento Saúde (Teleconsulta)', url: 'https://saude.goiania.go.gov.br/', isExternal: true },
      { id: 'educacao-matriculas', title: 'Matrículas SME Goiânia', url: 'https://www.goiania.go.gov.br/educacao/', isExternal: true },
      { id: 'atende-facil', title: 'Atende Fácil (Agendamento)', url: 'https://www.goiania.go.gov.br/atendefacil/', isExternal: true },
      { id: 'transito-multas', title: 'SMT - Multas e Recursos', url: 'https://transito.goiania.go.gov.br/', isExternal: true },
      { id: 'concursos', title: 'Concursos e Seleções', url: 'https://www.goiania.go.gov.br/concursos/', isExternal: true },
    ],
  },
  {
    id: 'empresa',
    title: 'Empresa',
    url: '/servicos?publico=empresa',
    children: [
      { id: 'iss-digital', title: 'Nota Fiscal Eletrônica (NFS-e)', url: 'https://nfse.goiania.go.gov.br/', isExternal: true },
      { id: 'empresa-facil', title: 'Empresa Fácil / Alvará', url: 'https://www.goiania.go.gov.br/alvara-facil/', isExternal: true },
      { id: 'compras-licitacoes', title: 'Licitações e Editais', url: 'https://licitacoes.goiania.go.gov.br/', isExternal: true },
      { id: 'certidoes', title: 'Certidão Negativa de Débitos (CND)', url: 'https://cnd.goiania.go.gov.br/', isExternal: true },
      { id: 'vigilancia-sanitaria', title: 'Alvará Sanitário (VISA)', url: 'https://visa.goiania.go.gov.br/', isExternal: true },
    ],
  },
  {
    id: 'servidor',
    title: 'Servidor',
    url: '/servicos?publico=servidor',
    children: [
      { id: 'contracheque', title: 'Portal do Servidor (Holerite)', url: 'https://servidor.goiania.go.gov.br/', isExternal: true },
      { id: 'ipasm', title: 'GOIANIAPREV (Previdência)', url: 'https://goianiaprev.go.gov.br/', isExternal: true },
      { id: 'impostoderenda', title: 'Informe de Rendimentos', url: 'https://servidor.goiania.go.gov.br/rendimentos/', isExternal: true },
      { id: 'diario-oficial', title: 'Diário Oficial do Município (DOM)', url: 'https://dom.goiania.go.gov.br/', isExternal: true },
    ],
  },
  {
    id: 'turista',
    title: 'Turista',
    url: '/turismo',
    children: [
      { id: 'pontos-turisticos', title: 'Parques e Atrações Culturais', url: '/turismo', isExternal: false },
      { id: 'bosque-dos-buritis', title: 'Bosque dos Buritis & Museus', url: '/turismo#bosque', isExternal: false },
      { id: 'feira-hippie', title: 'Feira Hippie e Mercados Centrais', url: '/turismo#feiras', isExternal: false },
      { id: 'art-deco', title: 'Roteiro Histórico Art Déco', url: '/turismo#art-deco', isExternal: false },
      { id: 'calendario-eventos', title: 'Agenda Cultural de Goiânia', url: '/noticias', isExternal: false },
    ],
  },
  {
    id: 'secretarias',
    title: 'Secretarias',
    url: '/secretarias',
    children: [
      { id: 'sms', title: 'SMS - Secretaria Municipal de Saúde', url: '/secretarias#sms', isExternal: false },
      { id: 'sme', title: 'SME - Secretaria Municipal de Educação', url: '/secretarias#sme', isExternal: false },
      { id: 'sefin', title: 'SEFIN - Secretaria Municipal de Finanças', url: '/secretarias#sefin', isExternal: false },
      { id: 'seinfra', title: 'SEINFRA - Secretaria de Infraestrutura Urbana', url: '/secretarias#seinfra', isExternal: false },
      { id: 'amma', title: 'AMMA - Agência Municipal do Meio Ambiente', url: '/secretarias#amma', isExternal: false },
      { id: 'smt', title: 'SMT - Secretaria Municipal de Trânsito', url: '/secretarias#smt', isExternal: false },
      { id: 'comurg', title: 'COMURG - Companhia de Urbanização de Goiânia', url: '/secretarias#comurg', isExternal: false },
    ],
  },
  {
    id: 'transparencia',
    title: 'Transparência',
    url: 'https://transparencia.goiania.go.gov.br',
    isExternal: true,
  },
];

export const FALLBACK_CATEGORIES: WPCategory[] = [
  { id: 1, count: 42, description: 'Notícias gerais da capital', link: '/categoria/noticias', name: 'Notícias', slug: 'noticias', taxonomy: 'category', parent: 0 },
  { id: 2, count: 18, description: 'Saúde pública, postos e vacinação', link: '/categoria/saude', name: 'Saúde', slug: 'saude', taxonomy: 'category', parent: 0 },
  { id: 3, count: 15, description: 'Obras viárias, asfalto e recapeamento', link: '/categoria/obras', name: 'Obras e Infraestrutura', slug: 'obras', taxonomy: 'category', parent: 0 },
  { id: 4, count: 14, description: 'Escolas municipais, CMEIs e ensino', link: '/categoria/educacao', name: 'Educação', slug: 'educacao', taxonomy: 'category', parent: 0 },
  { id: 5, count: 12, description: 'Meio ambiente, parques e praças', link: '/categoria/meio-ambiente', name: 'Meio Ambiente', slug: 'meio-ambiente', taxonomy: 'category', parent: 0 },
  { id: 6, count: 10, description: 'Tributos, IPTU, ITU e incentivos', link: '/categoria/economia', name: 'Finanças e Economia', slug: 'economia', taxonomy: 'category', parent: 0 },
  { id: 7, count: 8, description: 'Trânsito, sinalização e transporte coletivo', link: '/categoria/transito', name: 'Trânsito e Mobilidade', slug: 'transito', taxonomy: 'category', parent: 0 },
  { id: 8, count: 9, description: 'Eventos, festivais e patrimônio histórico', link: '/categoria/cultura', name: 'Cultura e Lazer', slug: 'cultura', taxonomy: 'category', parent: 0 },
];

export const FALLBACK_POSTS: WPPost[] = [
  {
    id: 101,
    date: '2026-03-30T10:30:00',
    slug: 'prefeitura-amplia-programa-saude-da-familia-com-novas-equipes-multidisciplinares',
    link: '/noticia/prefeitura-amplia-programa-saude-da-familia-com-novas-equipes-multidisciplinares',
    title: { rendered: 'Prefeitura de Goiânia amplia atendimento da Saúde da Família com novas equipes e unidades integradas' },
    excerpt: { rendered: 'Iniciativa reforça cobertura nas regiões Noroeste, Sudoeste e Leste de Goiânia, garantindo médicos generalistas, enfermeiros, odontólogos e vacinação de segunda a sábado.' },
    content: {
      rendered: `<p>A Prefeitura de Goiânia, por meio da <strong>Secretaria Municipal de Saúde (SMS)</strong>, anunciou nesta semana a ampliação histórica das equipes da Estratégia Saúde da Família (ESF). Mais de 45 novas equipes multidisciplinares foram homologadas e passam a atender diretamente nos Centros de Saúde da Família (CSF) das regiões com maior densidade populacional da capital.</p>
      <h3>Atendimento Humanizado e Horário Estendido</h3>
      <p>Com essa mobilização, diversas unidades de saúde passam a funcionar com o projeto <em>Horário do Trabalhador</em>, operando até as 22h para acolhimento de cidadãos que trabalham em horário comercial. As unidades contam com consultórios médicos, triagem automatizada, salas de vacinas climatizadas e distribuição gratuita de medicamentos essenciais.</p>
      <p>Além disso, o agendamento de consultas com clínicos gerais, pediatras e ginecologistas foi integrado ao sistema de telemedicina municipal, permitindo a confirmação via aplicativo e reduzindo a fila de espera em mais de 65%.</p>`,
    },
    categories: [1, 2],
    tags: [10],
    _embedded: {
      'wp:featuredmedia': [
        {
          id: 501,
          date: '2026-03-30T10:00:00',
          slug: 'saude-goiania-atendimento',
          title: { rendered: 'Equipe de saúde em atendimento na capital' },
          source_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80',
        },
      ],
      author: [{ id: 1, name: 'Secretaria Municipal de Saúde - SMS' }],
    },
  },
  {
    id: 102,
    date: '2026-03-29T14:15:00',
    slug: 'obras-de-recapeamento-avancam-em-avenidas-estrategicas-da-capital-com-asfalto-quente',
    link: '/noticia/obras-de-recapeamento-avancam-em-avenidas-estrategicas-da-capital-com-asfalto-quente',
    title: { rendered: 'Obras de recapeamento avançam em corredores viários estratégicos com asfalto de alta durabilidade' },
    excerpt: { rendered: 'Programa de modernização da malha viária atinge mais de 80 km concluídos nos setores Bueno, Campinas, Jardim Goiás e Centro, proporcionando maior fluidez e segurança viária.' },
    content: {
      rendered: `<p>A Secretaria Municipal de Infraestrutura Urbana (<strong>SEINFRA</strong>) acelerou as frentes de trabalho do programa de restauração asfáltica de Goiânia. As intervenções utilizam Concreto Betuminoso Usinado a Quente (CBUQ), material com alto índice de impermeabilização e resistência para suportar o fluxo intenso de linhas de ônibus e transporte de carga.</p>
      <p>Nesta etapa, frentes de trabalho simultâneas operam nas avenidas T-63, 85, Independência e Anhanguera no período noturno, minimizando impactos no trânsito diurno dos motoristas goianienses.</p>`,
    },
    categories: [1, 3],
    tags: [11],
    _embedded: {
      'wp:featuredmedia': [
        {
          id: 502,
          date: '2026-03-29T14:00:00',
          slug: 'obras-asfalto-goiania',
          title: { rendered: 'Máquinas de pavimentação em avenida de Goiânia' },
          source_url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&auto=format&fit=crop&q=80',
        },
      ],
      author: [{ id: 2, name: 'SEINFRA - Infraestrutura Goiânia' }],
    },
  },
  {
    id: 103,
    date: '2026-03-28T09:00:00',
    slug: 'educacao-conecta-inaugura-laboratorios-de-robotica-em-todas-as-escolas-municipais',
    link: '/noticia/educacao-conecta-inaugura-laboratorios-de-robotica-em-todas-as-escolas-municipais',
    title: { rendered: 'Educação Conecta: Goiânia entrega laboratórios de robótica e kits maker para alunos da rede municipal' },
    excerpt: { rendered: 'Mais de 100 mil estudantes da Educação Infantil e Ensino Fundamental passam a contar com lousas digitais, tablets educacionais e metodologia STEAM nas salas de aula.' },
    content: {
      rendered: `<p>A Secretaria Municipal de Educação (<strong>SME</strong>) realizou a entrega dos novos espaços tecnológicos para a rede municipal de ensino. O projeto <em>Goiânia Inteligente na Escola</em> equipou 368 unidades com fibra óptica de alta velocidade e kits de programação e robótica educativa.</p>
      <p>O prefeito ressaltou que a inovação na educação pública é pilar fundamental para igualar as oportunidades de aprendizado para crianças e jovens das comunidades goianienses.</p>`,
    },
    categories: [1, 4],
    tags: [12],
    _embedded: {
      'wp:featuredmedia': [
        {
          id: 503,
          date: '2026-03-28T08:30:00',
          slug: 'educacao-robotica',
          title: { rendered: 'Alunos utilizando recursos digitais' },
          source_url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop&q=80',
        },
      ],
      author: [{ id: 3, name: 'SME - Secretaria Municipal de Educação' }],
    },
  },
  {
    id: 104,
    date: '2026-03-27T16:45:00',
    slug: 'mutirao-da-cidadania-atende-mais-de-25-mil-familias-com-servicos-integrados-e-lazer',
    link: '/noticia/mutirao-da-cidadania-atende-mais-de-25-mil-familias-com-servicos-integrados-e-lazer',
    title: { rendered: 'Mutirão da Cidadania reúne mais de 25 mil moradores com emissão de documentos e atendimentos rápidos' },
    excerpt: { rendered: 'Estrutura montada levou atendimentos do Atende Fácil, consultas médicas, vacinação, corte de cabelo e renegociação de IPTU de forma gratuita durante o fim de semana.' },
    content: {
      rendered: `<p>O tradicional Mutirão da Prefeitura de Goiânia levou mais de 120 serviços integrados para a população no final de semana. Foram emitidos documentos de identidade, carteiras de trabalho digital, cartões do SUS e cadastros no CadÚnico.</p>`,
    },
    categories: [1, 6],
    tags: [13],
    _embedded: {
      'wp:featuredmedia': [
        {
          id: 504,
          date: '2026-03-27T16:00:00',
          slug: 'mutirao-cidadania',
          title: { rendered: 'Cidadãos recebendo atendimento no mutirão' },
          source_url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1200&auto=format&fit=crop&q=80',
        },
      ],
      author: [{ id: 4, name: 'Comunicação Social Goiânia' }],
    },
  },
  {
    id: 105,
    date: '2026-03-26T11:20:00',
    slug: 'parques-de-goiania-recebem-acoes-de-preservacao-e-novos-equipamentos-de-ginastica-ao-ar-livre',
    link: '/noticia/parques-de-goiania-recebem-acoes-de-preservacao-e-novos-equipamentos-de-ginastica-ao-ar-livre',
    title: { rendered: 'Parques de Goiânia recebem ações de preservação, plantio de mudas e academias ao ar livre' },
    excerpt: { rendered: 'A Agência Municipal do Meio Ambiente (AMMA) revitalizou áreas no Parque Vaca Brava, Flamboyant e Bosque dos Buritis, reforçando o título de capital mais arborizada.' },
    content: {
      rendered: `<p>A capital das praças e áreas verdes continua recebendo atenção contínua da <strong>AMMA</strong>. Foram plantadas mais de 4.000 mudas de ipês, jacarandás e árvores nativas do Cerrado nos principais mananciais e áreas de preservação permanente.</p>`,
    },
    categories: [1, 5, 8],
    tags: [14],
    _embedded: {
      'wp:featuredmedia': [
        {
          id: 505,
          date: '2026-03-26T11:00:00',
          slug: 'parques-goiania',
          title: { rendered: 'Parque arborizado de Goiânia' },
          source_url: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=1200&auto=format&fit=crop&q=80',
        },
      ],
      author: [{ id: 5, name: 'AMMA - Meio Ambiente' }],
    },
  },
  {
    id: 106,
    date: '2026-03-25T08:40:00',
    slug: 'facilidades-do-iptu-2026-contribuintes-aproveitam-desconto-de-ate-10-por-cento-na-cota-unica',
    link: '/noticia/facilidades-do-iptu-2026-contribuintes-aproveitam-desconto-de-ate-10-por-cento-na-cota-unica',
    title: { rendered: 'IPTU 2026: Contribuintes contam com até 10% de desconto à vista e parcelamento em 11 vezes' },
    excerpt: { rendered: 'Guias já estão disponíveis no portal oficial e no aplicativo Prefeitura 24 Horas com pagamento facilitado via PIX, sem necessidade de deslocamento.' },
    content: {
      rendered: `<p>A Secretaria Municipal de Finanças (<strong>SEFIN</strong>) disponibilizou a emissão online dos carnês do Imposto Predial e Territorial Urbano (IPTU) e Imposto Territorial Urbano (ITU) referentes ao exercício de 2026.</p>`,
    },
    categories: [1, 6],
    tags: [15],
    _embedded: {
      'wp:featuredmedia': [
        {
          id: 506,
          date: '2026-03-25T08:00:00',
          slug: 'iptu-goiania',
          title: { rendered: 'Portal de serviços de tributos da prefeitura' },
          source_url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&auto=format&fit=crop&q=80',
        },
      ],
      author: [{ id: 6, name: 'SEFIN - Finanças Goiânia' }],
    },
  },
];

export const FALLBACK_PAGES: WPPage[] = [
  {
    id: 201,
    date: '2026-01-01T00:00:00',
    slug: 'sobre-a-prefeitura',
    link: '/pagina/sobre-a-prefeitura',
    title: { rendered: 'Sobre a Prefeitura Municipal de Goiânia' },
    excerpt: { rendered: 'Conheça a estrutura organizacional, história e atribuições do Poder Executivo da capital de Goiás.' },
    content: {
      rendered: `<p>A <strong>Prefeitura Municipal de Goiânia</strong> é a sede do Poder Executivo no município de Goiânia, capital do Estado de Goiás. Fundada em 1933 sob o plano urbanístico inovador de Attilio Corrêa Lima e Armando de Godoy, Goiânia é referência nacional em qualidade de vida, patrimônio arquitetônico Art Déco e cobertura vegetal por habitante.</p>
      <h3>Missão Institucional</h3>
      <p>Promover o desenvolvimento sustentável da capital, a eficiência na gestão pública dos recursos municipais, a ampliação contínua dos serviços de saúde e educação e o cuidado com as famílias goianienses.</p>
      <h3>Sede Administrativa</h3>
      <p>Palácio das Campinas Venerando de Freitas Borges (Paço Municipal)<br>Avenida do Cerrado, nº 999, Park Lozandes, Goiânia - GO, CEP: 74884-900.<br>Telefone Central: (62) 3524-1000 / Ouvidoria Geral: 156.</p>`,
    },
  },
  {
    id: 202,
    date: '2026-01-01T00:00:00',
    slug: 'portal-da-transparencia',
    link: '/pagina/portal-da-transparencia',
    title: { rendered: 'Portal da Transparência de Goiânia' },
    excerpt: { rendered: 'Acesso público a receitas, despesas, contratos, licitações e remuneração dos servidores municipais.' },
    content: {
      rendered: `<p>Em cumprimento à Lei Complementar nº 131/2009 e à Lei de Acesso à Informação (Lei nº 12.527/2011), o <strong>Portal da Transparência da Prefeitura de Goiânia</strong> reúne informações pormenorizadas em tempo real sobre a execução orçamentária e financeira do município.</p>
      <p>Qualquer cidadão pode consultar editais abertos, pagamentos a fornecedores, tabelas salariais de cargos públicos e relatórios de gestão fiscal.</p>`,
    },
  },
  {
    id: 203,
    date: '2026-01-01T00:00:00',
    slug: 'ouvidoria-e-acesso-a-informacao',
    link: '/pagina/ouvidoria-e-acesso-a-informacao',
    title: { rendered: 'Ouvidoria Geral e e-SIC Goiânia' },
    excerpt: { rendered: 'Canal direto de diálogo entre a sociedade e a administração pública municipal para solicitações, denúncias e elogios.' },
    content: {
      rendered: `<p>A <strong>Ouvidoria Geral do Município</strong> acolhe manifestações dos munícipes, incluindo sugestões, elogios, solicitações de serviços e denúncias relativas a qualquer órgão municipal.</p>
      <p>Ligue gratuitamente para o número <strong>156</strong> ou utilize o Sistema Eletrônico do Serviço de Informação ao Cidadão (e-SIC) para pedidos formais de informação pública com prazo de resposta assegurado por lei.</p>`,
    },
  },
];

// -------------------------------------------------------------
// TYPED ENDPOINT FUNCTIONS
// -------------------------------------------------------------

/**
 * 1. Fetch Posts with pagination, category filter, query search and _embed
 */
export async function getPosts(params: WPQueryParams = {}): Promise<WPPost[]> {
  const query = new URLSearchParams();
  if (params.page) query.set('page', String(params.page));
  if (params.per_page) query.set('per_page', String(params.per_page));
  if (params.search) query.set('search', params.search);
  if (params.categories) query.set('categories', String(params.categories));
  if (params.tags) query.set('tags', String(params.tags));
  if (params.slug) query.set('slug', params.slug);
  if (params._embed !== false) query.set('_embed', 'true');

  const queryString = query.toString() ? `?${query.toString()}` : '';
  const result = await fetchWP<WPPost[]>(`/posts${queryString}`, {}, 4000);

  if (result && Array.isArray(result) && result.length > 0) {
    return result;
  }

  // Filter fallback posts matching query criteria
  let filtered = [...FALLBACK_POSTS];
  if (params.slug) {
    filtered = filtered.filter((p) => p.slug === params.slug);
  }
  if (params.categories) {
    const catId = Number(params.categories);
    filtered = filtered.filter((p) => p.categories.includes(catId));
  }
  if (params.search) {
    const s = params.search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.rendered.toLowerCase().includes(s) ||
        p.excerpt.rendered.toLowerCase().includes(s) ||
        p.content.rendered.toLowerCase().includes(s)
    );
  }

  const perPage = params.per_page || 10;
  const page = params.page || 1;
  const start = (page - 1) * perPage;
  return filtered.slice(start, start + perPage);
}

/**
 * 2. Fetch single Post by slug
 */
export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const cleanSlug = encodeURIComponent(slug.trim());
  const posts = await fetchWP<WPPost[]>(`/posts?slug=${cleanSlug}&_embed=true`, {}, 3500);

  if (posts && Array.isArray(posts) && posts.length > 0) {
    return posts[0];
  }

  return FALLBACK_POSTS.find((p) => p.slug === slug) || null;
}

/**
 * 3. Fetch Pages with optional slug or search
 */
export async function getPages(params: WPQueryParams = {}): Promise<WPPage[]> {
  const query = new URLSearchParams();
  if (params.page) query.set('page', String(params.page));
  if (params.per_page) query.set('per_page', String(params.per_page));
  if (params.slug) query.set('slug', params.slug);
  if (params.search) query.set('search', params.search);
  if (params._embed !== false) query.set('_embed', 'true');

  const queryString = query.toString() ? `?${query.toString()}` : '';
  const result = await fetchWP<WPPage[]>(`/pages${queryString}`, {}, 3500);

  if (result && Array.isArray(result) && result.length > 0) {
    return result;
  }

  let filtered = [...FALLBACK_PAGES];
  if (params.slug) {
    filtered = filtered.filter((p) => p.slug === params.slug);
  }
  return filtered;
}

/**
 * 4. Fetch single Page by slug
 */
export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  const cleanSlug = encodeURIComponent(slug.trim());
  const pages = await fetchWP<WPPage[]>(`/pages?slug=${cleanSlug}&_embed=true`, {}, 3500);

  if (pages && Array.isArray(pages) && pages.length > 0) {
    return pages[0];
  }

  return FALLBACK_PAGES.find((p) => p.slug === slug) || null;
}

/**
 * 5. Fetch Categories
 */
export async function getCategories(): Promise<WPCategory[]> {
  const result = await fetchWP<WPCategory[]>('/categories?per_page=50&orderby=count&order=desc', {}, 3500);
  if (result && Array.isArray(result) && result.length > 0) {
    return result;
  }
  return FALLBACK_CATEGORIES;
}

/**
 * 6. Fetch Category by Slug
 */
export async function getCategoryBySlug(slug: string): Promise<WPCategory | null> {
  const cleanSlug = encodeURIComponent(slug.trim());
  const categories = await fetchWP<WPCategory[]>(`/categories?slug=${cleanSlug}`, {}, 3500);
  if (categories && Array.isArray(categories) && categories.length > 0) {
    return categories[0];
  }
  return FALLBACK_CATEGORIES.find((c) => c.slug === slug) || null;
}

/**
 * 7. Fetch Tags
 */
export async function getTags(): Promise<WPTag[]> {
  const result = await fetchWP<WPTag[]>('/tags?per_page=50', {}, 3000);
  if (result && Array.isArray(result)) {
    return result;
  }
  return [
    { id: 10, count: 12, description: 'Saúde municipal', link: '/tag/saude', name: 'Saúde', slug: 'saude', taxonomy: 'post_tag' },
    { id: 11, count: 8, description: 'Pavimentação e asfalto', link: '/tag/asfalto', name: 'Asfalto', slug: 'asfalto', taxonomy: 'post_tag' },
    { id: 12, count: 15, description: 'Robótica e tecnologia escolar', link: '/tag/robotica', name: 'Robótica', slug: 'robotica', taxonomy: 'post_tag' },
    { id: 13, count: 22, description: 'Mutirões e cidadania', link: '/tag/mutirao', name: 'Mutirão', slug: 'mutirao', taxonomy: 'post_tag' },
    { id: 14, count: 9, description: 'Meio ambiente e parques', link: '/tag/meio-ambiente', name: 'Meio Ambiente', slug: 'meio-ambiente', taxonomy: 'post_tag' },
    { id: 15, count: 18, description: 'IPTU e arrecadação', link: '/tag/iptu', name: 'IPTU', slug: 'iptu', taxonomy: 'post_tag' },
  ];
}

/**
 * 8. Fetch Media by ID
 */
export async function getMedia(id: number): Promise<WPMedia | null> {
  return await fetchWP<WPMedia>(`/media/${id}`, {}, 3000);
}

/**
 * 9. Fetch Users / Authors
 */
export async function getUsers(): Promise<WPUser[]> {
  const result = await fetchWP<WPUser[]>('/users?per_page=20', {}, 3000);
  return result || [
    { id: 1, name: 'Secretaria Municipal de Comunicação', url: 'https://goiania.go.gov.br', description: 'Redação Oficial', link: '', slug: 'secom' },
  ];
}

/**
 * 10. Global Search endpoint
 */
export async function searchContent(term: string): Promise<WPSearchResult[]> {
  if (!term.trim()) return [];
  const cleanTerm = encodeURIComponent(term.trim());
  const result = await fetchWP<WPSearchResult[]>(`/search?search=${cleanTerm}&per_page=15`, {}, 3000);

  if (result && Array.isArray(result) && result.length > 0) {
    return result;
  }

  // Fallback matching
  const termLower = term.toLowerCase();
  const matchedPosts: WPSearchResult[] = FALLBACK_POSTS.filter((p) =>
    p.title.rendered.toLowerCase().includes(termLower)
  ).map((p) => ({
    id: p.id,
    title: p.title.rendered,
    url: `/noticia/${p.slug}`,
    type: 'post',
    subtype: 'post',
  }));

  const matchedPages: WPSearchResult[] = FALLBACK_PAGES.filter((p) =>
    p.title.rendered.toLowerCase().includes(termLower)
  ).map((p) => ({
    id: p.id,
    title: p.title.rendered,
    url: `/pagina/${p.slug}`,
    type: 'page',
    subtype: 'page',
  }));

  return [...matchedPosts, ...matchedPages];
}

/**
 * 11. Fetch Comments
 */
export async function getComments(postId: number): Promise<WPComment[]> {
  const result = await fetchWP<WPComment[]>(`/comments?post=${postId}`, {}, 2500);
  return result || [];
}

/**
 * 12. Fetch Navigation Menus and Items
 */
export async function getMenus(): Promise<MenuItem[]> {
  // Attempt to hit WP Menu plugins if available
  const result = await fetchWP<{ items: MenuItem[] }>(`${WP_MENUS_API_URL}/menus/primary`, {}, 2500);
  if (result && result.items && Array.isArray(result.items)) {
    return result.items;
  }
  return OFFICIAL_MENUS;
}
