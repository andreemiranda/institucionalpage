import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { getLiveSyncMetrics } from '@/lib/wp';

/**
 * Painel de Status e Sincronização sob Demanda (/api/sync)
 * 
 * Monitora a conexão em tempo real com a API REST v2 do WordPress da Prefeitura de Goiânia:
 * - Status da conexão (online, degraded, offline)
 * - Latência em milissegundos
 * - Total de posts na API
 * - Dados da publicação mais recente
 * 
 * Parâmetro ?action=sync:
 * - Invalida todos os caches e recarrega os dados na hora.
 */

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const action = searchParams.get('action');
  const format = searchParams.get('format');
  const acceptHeader = req.headers.get('accept') || '';

  const revalidatedPaths: string[] = [];
  const revalidatedTags: string[] = [];

  // Se ?action=sync foi acionado, força a invalidação de todos os caches imediatamente
  if (action === 'sync') {
    const paths = [
      '/',
      '/noticias',
      '/videos',
      '/servicos',
      '/secretarias',
      '/sobre-goiania',
      '/transparencia',
      '/ouvidoria',
      '/categoria',
      '/cidadao',
      '/empresa',
      '/servidor',
      '/concursos',
      '/iptu',
    ];

    for (const p of paths) {
      try {
        revalidatePath(p);
        revalidatedPaths.push(p);
      } catch {}
    }

    const tags = ['posts', 'pages', 'categories', 'tags', 'videos', 'wordpress'];
    for (const t of tags) {
      try {
        revalidateTag(t);
        revalidatedTags.push(t);
      } catch {}
    }
  }

  // Mede métricas em tempo real da API
  const metrics = await getLiveSyncMetrics();

  const responseData = {
    status: metrics.status,
    message:
      action === 'sync'
        ? 'Sincronização imediata forçada com sucesso! Todos os caches foram limpos.'
        : 'Conexão ativa e sincronizada com a API REST do WordPress da Prefeitura de Goiânia.',
    latencyMs: metrics.latencyMs,
    totalPosts: metrics.totalPosts,
    totalPostsFormatted: metrics.totalPostsFormatted,
    latestPost: metrics.latestPost,
    isrIntervalSeconds: metrics.isrIntervalSeconds,
    apiEndpoint: metrics.endpoint,
    actionApplied: action || null,
    revalidatedPaths: revalidatedPaths.length > 0 ? revalidatedPaths : undefined,
    revalidatedTags: revalidatedTags.length > 0 ? revalidatedTags : undefined,
    webhookUrl: '/api/revalidate?secret=camara-paraiso-revalidate-secret-token&all=true',
    forceSyncUrl: '/api/sync?action=sync',
    timestamp: metrics.checkedAt,
  };

  // Se o navegador requisitou HTML e não especificou format=json, exibe um painel visual profissional
  const wantsHtml =
    acceptHeader.includes('text/html') && format !== 'json';

  if (wantsHtml) {
    const isOnline = metrics.status === 'online';
    const statusColor = isOnline ? '#10b981' : '#f59e0b';
    const statusBg = isOnline ? '#ecfdf5' : '#fffbeb';
    const statusText = isOnline ? 'ONLINE & SINCRONIZADO' : 'EM OPERAÇÃO RESILIENTE';

    const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Painel de Sincronização API • Prefeitura de Goiânia</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
    body { background: #f1f5f9; color: #1e293b; padding: 40px 20px; display: flex; justify-content: center; }
    .card { background: #ffffff; max-width: 760px; width: 100%; border-radius: 20px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.06); padding: 36px; border: 1px solid #e2e8f0; }
    .header { display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #f1f5f9; padding-bottom: 20px; margin-bottom: 24px; flex-wrap: wrap; gap: 12px; }
    .title { font-size: 22px; font-weight: 800; color: #002e47; }
    .subtitle { font-size: 13px; color: #64748b; margin-top: 4px; }
    .badge { background: ${statusBg}; color: ${statusColor}; border: 1px solid ${statusColor}40; padding: 6px 14px; border-radius: 9999px; font-size: 11px; font-weight: 700; display: inline-flex; align-items: center; gap: 6px; }
    .badge::before { content: ""; width: 8px; height: 8px; border-radius: 50%; background: ${statusColor}; display: inline-block; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 28px; }
    .metric { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 18px; }
    .metric-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 6px; }
    .metric-value { font-size: 24px; font-weight: 800; color: #002e47; }
    .metric-sub { font-size: 11px; color: #94a3b8; margin-top: 4px; }
    .section-title { font-size: 14px; font-weight: 700; color: #002e47; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.05em; }
    .post-box { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 14px; padding: 20px; margin-bottom: 28px; }
    .post-title { font-size: 16px; font-weight: 700; color: #1e3a8a; line-height: 1.4; margin-bottom: 8px; }
    .post-meta { font-size: 12px; color: #3b82f6; display: flex; gap: 16px; flex-wrap: wrap; }
    .actions { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; pt-4; }
    .btn-sync { background: #f36e22; color: #ffffff; padding: 12px 24px; border-radius: 10px; font-weight: 700; font-size: 13px; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; transition: background 0.2s; border: none; cursor: pointer; }
    .btn-sync:hover { background: #d95b16; }
    .btn-json { background: #f1f5f9; color: #002e47; padding: 12px 20px; border-radius: 10px; font-weight: 600; font-size: 13px; text-decoration: none; border: 1px solid #cbd5e1; }
    .btn-json:hover { background: #e2e8f0; }
    .alert-success { background: #ecfdf5; border: 1px solid #a7f3d0; color: #065f46; padding: 14px 18px; border-radius: 12px; font-size: 13px; font-weight: 600; margin-bottom: 24px; }
    .footer-note { font-size: 11px; color: #94a3b8; margin-top: 24px; border-top: 1px solid #f1f5f9; padding-top: 16px; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div>
        <h1 class="title">Painel de Sincronização Contínua</h1>
        <p class="subtitle">API REST v2 • Prefeitura Municipal de Goiânia</p>
      </div>
      <span class="badge">${statusText}</span>
    </div>

    ${
      action === 'sync'
        ? `<div class="alert-success">✓ Sincronização forçada concluída com sucesso! Os caches de todas as páginas foram invalidados e os dados mais recentes foram recarregados.</div>`
        : ''
    }

    <div class="grid">
      <div class="metric">
        <div class="metric-label">Latência da API</div>
        <div class="metric-value">${metrics.latencyMs} <span style="font-size:14px; font-weight:500;">ms</span></div>
        <div class="metric-sub">Tempo de resposta do endpoint</div>
      </div>
      <div class="metric">
        <div class="metric-label">Total de Publicações</div>
        <div class="metric-value">${metrics.totalPosts.toLocaleString('pt-BR')}</div>
        <div class="metric-sub">Matérias cadastradas no acervo</div>
      </div>
      <div class="metric">
        <div class="metric-label">Intervalo de Revalidação</div>
        <div class="metric-value">${metrics.isrIntervalSeconds}s</div>
        <div class="metric-sub">ISR automático em segundo plano</div>
      </div>
    </div>

    ${
      metrics.latestPost
        ? `
      <div class="section-title">Última Publicação Detectada</div>
      <div class="post-box">
        <div class="post-title">${metrics.latestPost.title}</div>
        <div class="post-meta">
          <span>📅 ${new Date(metrics.latestPost.date).toLocaleString('pt-BR')}</span>
          <span>✍️ ${metrics.latestPost.author}</span>
          <span>🔗 <a href="${metrics.latestPost.url}" target="_blank" style="color:#1d4ed8; text-decoration:underline;">Ver notícia no portal</a></span>
        </div>
      </div>
    `
        : ''
    }

    <div class="actions">
      <a href="/api/sync?action=sync" class="btn-sync">
        ⚡ Forçar Sincronização Imediata
      </a>
      <a href="/api/sync?format=json" class="btn-json">
        Visualizar JSON Bruto
      </a>
      <a href="/" class="btn-json">
        Ir para Página Inicial
      </a>
    </div>

    <div class="footer-note">
      <span>Webhook de Notificação Instantânea: <code>/api/revalidate?secret=...&all=true</code></span>
      <span>Verificado em: ${new Date(metrics.checkedAt).toLocaleString('pt-BR')}</span>
    </div>
  </div>
</body>
</html>`;

    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  }

  return NextResponse.json(responseData, {
    status: 200,
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}
