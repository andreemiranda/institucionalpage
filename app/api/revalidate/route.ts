import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

/**
 * Webhook de Sincronização Instantânea (/api/revalidate)
 * Suporta requisições GET e POST para invalidar e revalidar o cache do Next.js
 * no exato instante em que um conteúdo é publicado, editado ou removido no WordPress.
 *
 * Exemplos de uso:
 * - Geral: /api/revalidate?secret=camara-paraiso-revalidate-secret-token&all=true
 * - Notícia: /api/revalidate?secret=camara-paraiso-revalidate-secret-token&slug=minha-noticia&type=post
 * - Página: /api/revalidate?secret=camara-paraiso-revalidate-secret-token&slug=sobre-a-prefeitura&type=page
 * - Caminho direto: /api/revalidate?secret=camara-paraiso-revalidate-secret-token&path=/videos
 * - Payload JSON via POST (ex: WP Webhooks plugin)
 */

const EXPECTED_SECRET =
  process.env.REVALIDATE_SECRET || 'camara-paraiso-revalidate-secret-token';

function validateSecret(req: NextRequest, bodySecret?: string): boolean {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get('secret') || bodySecret;

  if (secret === EXPECTED_SECRET || secret === 'camara-paraiso-revalidate-secret-token') {
    return true;
  }

  // Also check Bearer Authorization header if provided by external webhook plugins
  const authHeader = req.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const bearerToken = authHeader.substring(7).trim();
    if (bearerToken === EXPECTED_SECRET || bearerToken === 'camara-paraiso-revalidate-secret-token') {
      return true;
    }
  }

  return false;
}

interface RevalidationPayload {
  secret?: string;
  all?: boolean | string;
  slug?: string;
  path?: string;
  tag?: string;
  type?: string;
  post_type?: string;
  post?: {
    post_name?: string;
    post_type?: string;
    post_title?: string;
  };
}

async function handleRevalidation(
  params: RevalidationPayload
): Promise<NextResponse> {
  const revalidatedPaths: string[] = [];
  const revalidatedTags: string[] = [];

  const isAll = params.all === true || params.all === 'true';

  if (isAll) {
    // Revalidação em massa de todas as rotas e coleções principais
    const mainPaths = [
      '/',
      '/noticias',
      '/videos',
      '/servicos',
      '/secretarias',
      '/sobre-goiania',
      '/transparencia',
      '/ouvidoria',
      '/cidadao',
      '/empresa',
      '/servidor',
      '/concursos',
      '/iptu',
      '/categoria',
      '/acessibilidade',
      '/mapa-do-site',
    ];

    for (const p of mainPaths) {
      try {
        revalidatePath(p);
        revalidatedPaths.push(p);
      } catch {
        // Continue
      }
    }

    const mainTags = ['posts', 'pages', 'categories', 'tags', 'videos', 'wordpress'];
    for (const t of mainTags) {
      try {
        revalidateTag(t);
        revalidatedTags.push(t);
      } catch {
        // Continue
      }
    }

    return NextResponse.json({
      revalidated: true,
      scope: 'all',
      revalidatedPaths,
      revalidatedTags,
      message: 'Sincronização geral executada: todos os caches do portal foram revalidados.',
      timestamp: new Date().toISOString(),
    });
  }

  // 1. Revalidação por Tag direta
  if (params.tag) {
    try {
      revalidateTag(params.tag);
      revalidatedTags.push(params.tag);
    } catch {
      // Continue
    }
  }

  // 2. Revalidação por Caminho direto
  if (params.path) {
    try {
      revalidatePath(params.path);
      revalidatedPaths.push(params.path);
    } catch {
      // Continue
    }
  }

  // 3. Revalidação por Conteúdo Específico (compatível com plugins como WP Webhooks)
  const slug =
    params.slug ||
    params.post?.post_name ||
    '';
  const postType = (
    params.type ||
    params.post_type ||
    params.post?.post_type ||
    'post'
  ).toLowerCase();

  if (slug) {
    if (postType === 'post' || postType === 'noticia') {
      const pathsToClear = [
        '/',
        '/noticias',
        `/noticia/${slug}`,
        `/${slug}`,
        `/agora/${slug}`,
      ];
      pathsToClear.forEach((p) => {
        try {
          revalidatePath(p);
          revalidatedPaths.push(p);
        } catch {}
      });

      try {
        revalidateTag('posts');
        revalidatedTags.push('posts');
        revalidateTag(`post-${slug}`);
        revalidatedTags.push(`post-${slug}`);
      } catch {}
    } else if (postType === 'page' || postType === 'pagina') {
      const pathsToClear = ['/', `/pagina/${slug}`, `/${slug}`];
      pathsToClear.forEach((p) => {
        try {
          revalidatePath(p);
          revalidatedPaths.push(p);
        } catch {}
      });

      try {
        revalidateTag('pages');
        revalidatedTags.push('pages');
        revalidateTag(`page-${slug}`);
        revalidatedTags.push(`page-${slug}`);
      } catch {}
    } else if (postType === 'videos' || postType === 'video') {
      try {
        revalidatePath('/videos');
        revalidatedPaths.push('/videos');
        revalidateTag('videos');
        revalidatedTags.push('videos');
      } catch {}
    } else if (
      postType === 'vereador' ||
      postType === 'aviso' ||
      postType === 'servico' ||
      postType === 'servicos'
    ) {
      const pathsToClear = ['/', '/servicos', `/${slug}`];
      pathsToClear.forEach((p) => {
        try {
          revalidatePath(p);
          revalidatedPaths.push(p);
        } catch {}
      });
      try {
        revalidateTag('posts');
        revalidatedTags.push('posts');
      } catch {}
    } else {
      // Fallback genérico para qualquer outro tipo de conteúdo
      const pathsToClear = ['/', `/${slug}`];
      pathsToClear.forEach((p) => {
        try {
          revalidatePath(p);
          revalidatedPaths.push(p);
        } catch {}
      });
    }
  }

  // Se nenhum parâmetro específico foi acionado mas o webhook foi chamado com sucesso
  if (revalidatedPaths.length === 0 && revalidatedTags.length === 0) {
    revalidatePath('/');
    revalidatedPaths.push('/');
    revalidateTag('posts');
    revalidatedTags.push('posts');
  }

  return NextResponse.json({
    revalidated: true,
    contentType: postType,
    slug: slug || null,
    revalidatedPaths,
    revalidatedTags,
    message: 'Cache revalidado com sucesso no portal da Prefeitura de Goiânia.',
    timestamp: new Date().toISOString(),
  });
}

export async function GET(req: NextRequest) {
  if (!validateSecret(req)) {
    return NextResponse.json(
      {
        revalidated: false,
        error: 'Token de revalidação inválido ou ausente.',
        hint: 'Envie ?secret=camara-paraiso-revalidate-secret-token',
      },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);
  const payload: RevalidationPayload = {
    all: searchParams.get('all') || undefined,
    slug: searchParams.get('slug') || undefined,
    path: searchParams.get('path') || undefined,
    tag: searchParams.get('tag') || undefined,
    type: searchParams.get('type') || undefined,
    post_type: searchParams.get('post_type') || undefined,
  };

  return await handleRevalidation(payload);
}

export async function POST(req: NextRequest) {
  let body: RevalidationPayload = {};
  try {
    body = await req.json();
  } catch {
    // If not JSON body, read query params
  }

  if (!validateSecret(req, body.secret)) {
    return NextResponse.json(
      {
        revalidated: false,
        error: 'Token de revalidação inválido ou ausente.',
        hint: 'Envie ?secret=camara-paraiso-revalidate-secret-token ou campo secret no corpo JSON',
      },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);
  const combinedPayload: RevalidationPayload = {
    all: body.all ?? searchParams.get('all') ?? undefined,
    slug: body.slug ?? searchParams.get('slug') ?? undefined,
    path: body.path ?? searchParams.get('path') ?? undefined,
    tag: body.tag ?? searchParams.get('tag') ?? undefined,
    type: body.type ?? searchParams.get('type') ?? undefined,
    post_type: body.post_type ?? searchParams.get('post_type') ?? undefined,
    post: body.post,
  };

  return await handleRevalidation(combinedPayload);
}
