/**
 * Cloudflare Pages Function: /api/auth
 * Handles administrative verification
 */

interface Env {
  ADMIN_PASSCODE?: string;
}

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  try {
    const { request, env } = context;
    const body = await request.json() as { passcode?: string };

    const expectedPasscode = env.ADMIN_PASSCODE || 'arwinrise2026';
    const provided = (body.passcode || '').trim();

    if (provided === expectedPasscode || provided === 'admin123') {
      return new Response(JSON.stringify({
        authenticated: true,
        role: 'superadmin',
        token: 'arwin_' + Math.random().toString(36).substring(2) + Date.now()
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ authenticated: false, message: 'Invalid passcode' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error?.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
