/**
 * Cloudflare Pages Function: /api/content
 * Handles fetching and persisting dynamic content for ARWIN RISE
 */

interface Env {
  DB?: any; // Cloudflare D1 Database binding
  CONTENT_KV?: any; // Cloudflare KV binding
}

export const onRequestGet = async (context: { env: Env }) => {
  try {
    const { env } = context;

    // 1. If Cloudflare D1 Database is bound
    if (env.DB) {
      const results = await env.DB.prepare('SELECT key, data FROM site_content').all();
      const contentMap: Record<string, any> = {};
      if (results?.results) {
        for (const row of results.results) {
          try {
            contentMap[row.key] = JSON.parse(row.data);
          } catch {
            contentMap[row.key] = row.data;
          }
        }
      }
      return new Response(JSON.stringify(contentMap), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=60'
        }
      });
    }

    // 2. If Cloudflare KV is bound
    if (env.CONTENT_KV) {
      const stored = await env.CONTENT_KV.get('arwin_site_content', 'json');
      if (stored) {
        return new Response(JSON.stringify(stored), {
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    return new Response(JSON.stringify({ status: 'ok', message: 'Ready' }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error?.message || 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  try {
    const { request, env } = context;
    const body = await request.json() as Record<string, any>;

    // 1. If Cloudflare D1 Database is bound
    if (env.DB) {
      const statements: any[] = [];
      for (const [key, val] of Object.entries(body)) {
        statements.push(
          env.DB.prepare(`
            INSERT INTO site_content (key, data, updated_at)
            VALUES (?, ?, datetime('now'))
            ON CONFLICT(key) DO UPDATE SET data=excluded.data, updated_at=datetime('now')
          `).bind(key, JSON.stringify(val))
        );
      }

      if (statements.length > 0) {
        await env.DB.batch(statements);
      }

      return new Response(JSON.stringify({ success: true, savedKeys: Object.keys(body) }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 2. If Cloudflare KV is bound
    if (env.CONTENT_KV) {
      const existing = (await env.CONTENT_KV.get('arwin_site_content', 'json')) || {};
      const updated = { ...existing, ...body };
      await env.CONTENT_KV.put('arwin_site_content', JSON.stringify(updated));

      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: true, mode: 'local_pass' }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error?.message || 'Failed to save content' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
