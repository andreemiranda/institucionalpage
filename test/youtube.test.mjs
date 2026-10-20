import test from 'node:test';
import assert from 'node:assert/strict';
import {
  extractYouTubeId,
  isValidYouTubeId,
  extractVideoFromWP,
  getYoutubeEmbedUrl,
  getYoutubeThumbnailUrl,
  sanitizeContentHtml,
} from '../lib/youtube/youtube.ts';

// -------------------------------------------------------------
// Bateria de 29 Testes Unitários Oficiais (node --test)
// -------------------------------------------------------------

// 1. URL padrão watch
test('1. extractYouTubeId: extrai ID de URL padrão watch (youtube.com/watch?v=...)', () => {
  const id = extractYouTubeId('https://www.youtube.com/watch?v=d9z6Cq2HD_4');
  assert.equal(id, 'd9z6Cq2HD_4');
});

// 2. URL watch com parâmetros adicionais
test('2. extractYouTubeId: extrai ID de URL watch com parâmetros adicionais (timestamp, feature)', () => {
  const id = extractYouTubeId('https://www.youtube.com/watch?v=Oj7by95HGRI&t=45s&feature=emb_title');
  assert.equal(id, 'Oj7by95HGRI');
});

// 3. URL curta youtu.be
test('3. extractYouTubeId: extrai ID de URL curta youtu.be/...', () => {
  const id = extractYouTubeId('https://youtu.be/GcSZ0KZhZVY');
  assert.equal(id, 'GcSZ0KZhZVY');
});

// 4. URL curta com query string
test('4. extractYouTubeId: extrai ID de URL curta com query param', () => {
  const id = extractYouTubeId('https://youtu.be/CYH6QxNDvPQ?t=120');
  assert.equal(id, 'CYH6QxNDvPQ');
});

// 5. URL padrão embed
test('5. extractYouTubeId: extrai ID de URL embed (youtube.com/embed/...)', () => {
  const id = extractYouTubeId('https://www.youtube.com/embed/d9z6Cq2HD_4');
  assert.equal(id, 'd9z6Cq2HD_4');
});

// 6. URL youtube-nocookie.com
test('6. extractYouTubeId: extrai ID de URL youtube-nocookie.com/embed/...', () => {
  const id = extractYouTubeId('https://www.youtube-nocookie.com/embed/Oj7by95HGRI?rel=0');
  assert.equal(id, 'Oj7by95HGRI');
});

// 7. URL de transmissão ao vivo (live)
test('7. extractYouTubeId: extrai ID de URL youtube.com/live/...', () => {
  const id = extractYouTubeId('https://www.youtube.com/live/CYH6QxNDvPQ');
  assert.equal(id, 'CYH6QxNDvPQ');
});

// 8. URL de shorts
test('8. extractYouTubeId: extrai ID de URL youtube.com/shorts/...', () => {
  const id = extractYouTubeId('https://www.youtube.com/shorts/GcSZ0KZhZVY');
  assert.equal(id, 'GcSZ0KZhZVY');
});

// 9. URL legado /v/
test('9. extractYouTubeId: extrai ID de URL legado /v/...', () => {
  const id = extractYouTubeId('https://www.youtube.com/v/d9z6Cq2HD_4');
  assert.equal(id, 'd9z6Cq2HD_4');
});

// 10. URL mobile m.youtube.com
test('10. extractYouTubeId: extrai ID de URL móvel m.youtube.com', () => {
  const id = extractYouTubeId('https://m.youtube.com/watch?v=Oj7by95HGRI');
  assert.equal(id, 'Oj7by95HGRI');
});

// 11. ID bruto válido de 11 caracteres
test('11. extractYouTubeId: aceita ID bruto direto de 11 caracteres', () => {
  const id = extractYouTubeId('CYH6QxNDvPQ');
  assert.equal(id, 'CYH6QxNDvPQ');
});

// 12. ID bruto com espaços laterais
test('12. extractYouTubeId: normaliza ID bruto com espaços laterais', () => {
  const id = extractYouTubeId('   GcSZ0KZhZVY   ');
  assert.equal(id, 'GcSZ0KZhZVY');
});

// 13. Entrada nula
test('13. extractYouTubeId: retorna null para entrada null', () => {
  const id = extractYouTubeId(null);
  assert.equal(id, null);
});

// 14. Entrada undefined
test('14. extractYouTubeId: retorna null para entrada undefined', () => {
  const id = extractYouTubeId(undefined);
  assert.equal(id, null);
});

// 15. Entrada vazia
test('15. extractYouTubeId: retorna null para string vazia', () => {
  const id = extractYouTubeId('   ');
  assert.equal(id, null);
});

// 16. URL que não é do YouTube
test('16. extractYouTubeId: retorna null para URLs de outros serviços', () => {
  const id = extractYouTubeId('https://vimeo.com/123456789');
  assert.equal(id, null);
});

// 17. Tag HTML iframe completa
test('17. extractYouTubeId: extrai ID de dentro de uma tag <iframe> HTML', () => {
  const html = '<iframe width="560" height="315" src="https://www.youtube.com/embed/d9z6Cq2HD_4" frameborder="0" allowfullscreen></iframe>';
  const id = extractYouTubeId(html);
  assert.equal(id, 'd9z6Cq2HD_4');
});

// 18. Bloco Gutenberg wp-block-embed
test('18. extractYouTubeId: extrai ID de dentro de estrutura wp-block-embed__wrapper', () => {
  const block = '<div class="wp-block-embed__wrapper">https://www.youtube.com/watch?v=Oj7by95HGRI</div>';
  const id = extractYouTubeId(block);
  assert.equal(id, 'Oj7by95HGRI');
});

// 19. extractVideoFromWP com acf.link_video (URL watch)
test('19. extractVideoFromWP: extrai vídeo a partir de post.acf.link_video (URL)', () => {
  const post = {
    id: 1,
    title: { rendered: 'Título' },
    acf: { link_video: 'https://www.youtube.com/watch?v=d9z6Cq2HD_4' },
  };
  assert.equal(extractVideoFromWP(post), 'd9z6Cq2HD_4');
});

// 20. extractVideoFromWP com acf.link_video (ID direto)
test('20. extractVideoFromWP: extrai vídeo a partir de post.acf.link_video (ID)', () => {
  const post = {
    id: 2,
    title: { rendered: 'Título' },
    acf: { link_video: 'Oj7by95HGRI' },
  };
  assert.equal(extractVideoFromWP(post), 'Oj7by95HGRI');
});

// 21. extractVideoFromWP com acf.video_url
test('21. extractVideoFromWP: extrai vídeo a partir de post.acf.video_url', () => {
  const post = {
    id: 3,
    title: { rendered: 'Título' },
    acf: { video_url: 'https://youtu.be/GcSZ0KZhZVY' },
  };
  assert.equal(extractVideoFromWP(post), 'GcSZ0KZhZVY');
});

// 22. extractVideoFromWP com acf.youtube_id
test('22. extractVideoFromWP: extrai vídeo a partir de post.acf.youtube_id', () => {
  const post = {
    id: 4,
    title: { rendered: 'Título' },
    acf: { youtube_id: 'CYH6QxNDvPQ' },
  };
  assert.equal(extractVideoFromWP(post), 'CYH6QxNDvPQ');
});

// 23. extractVideoFromWP com vídeo em content.rendered
test('23. extractVideoFromWP: extrai vídeo presente no HTML de content.rendered', () => {
  const post = {
    id: 5,
    title: { rendered: 'Matéria' },
    content: {
      rendered: '<p>Veja o vídeo abaixo:</p><p>https://www.youtube.com/watch?v=d9z6Cq2HD_4</p>',
    },
  };
  assert.equal(extractVideoFromWP(post), 'd9z6Cq2HD_4');
});

// 24. extractVideoFromWP para post sem vídeo
test('24. extractVideoFromWP: retorna null para post sem qualquer menção a vídeo', () => {
  const post = {
    id: 6,
    title: { rendered: 'Matéria comum' },
    content: { rendered: '<p>Apenas texto informativo institucional.</p>' },
  };
  assert.equal(extractVideoFromWP(post), null);
});

// 25. getYoutubeEmbedUrl padrão oficial
test('25. getYoutubeEmbedUrl: gera URL oficial no padrão embed com rel=0, modestbranding=1 e enablejsapi=1', () => {
  const url = getYoutubeEmbedUrl('d9z6Cq2HD_4');
  assert.equal(
    url,
    'https://www.youtube.com/embed/d9z6Cq2HD_4?rel=0&modestbranding=1&enablejsapi=1'
  );
});

// 26. getYoutubeEmbedUrl com opções customizadas
test('26. getYoutubeEmbedUrl: suporta opções personalizadas como autoplay e mute', () => {
  const url = getYoutubeEmbedUrl('Oj7by95HGRI', { autoplay: true, mute: true });
  assert.match(url, /rel=0/);
  assert.match(url, /autoplay=1/);
  assert.match(url, /mute=1/);
});

// 27. getYoutubeEmbedUrl com entrada inválida
test('27. getYoutubeEmbedUrl: retorna string vazia se o ID for inválido', () => {
  const url = getYoutubeEmbedUrl('url-invalida');
  assert.equal(url, '');
});

// 28. getYoutubeThumbnailUrl
test('28. getYoutubeThumbnailUrl: gera thumbnail em alta resolução hqdefault.jpg', () => {
  const thumb = getYoutubeThumbnailUrl('GcSZ0KZhZVY');
  assert.equal(thumb, 'https://img.youtube.com/vi/GcSZ0KZhZVY/hqdefault.jpg');
});

// 29. sanitizeContentHtml normaliza iframes e links de YouTube
test('29. sanitizeContentHtml: normaliza links avulsos e iframes para o formato /embed/ e remove scripts maliciosos', () => {
  const rawHtml = `
    <script>alert("xss")</script>
    <p>Assista ao comunicado:</p>
    <p>https://www.youtube.com/watch?v=CYH6QxNDvPQ</p>
  `;
  const sanitized = sanitizeContentHtml(rawHtml);
  assert.equal(sanitized.includes('<script>'), false);
  assert.equal(sanitized.includes('https://www.youtube.com/embed/CYH6QxNDvPQ?rel=0&modestbranding=1&enablejsapi=1'), true);
});
