/**
 * Cloudflare Pages Function: /api/leads
 * Handles lead ingestion and admin lead retrieval
 */

interface Env {
  DB?: any;
}

export const onRequestGet = async (context: { env: Env }) => {
  try {
    const { env } = context;

    if (env.DB) {
      const results = await env.DB.prepare(`
        SELECT id, timestamp, form_type as formType, client_name as clientName,
               phone, email, status, notes, project, collection, tier, budget,
               preferred_date as date, preferred_time as timeSlot, message, payload
        FROM leads
        ORDER BY created_at DESC
        LIMIT 200
      `).all();

      return new Response(JSON.stringify(results?.results || []), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify([]), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error?.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  try {
    const { request, env } = context;
    const lead = await request.json() as any;

    if (env.DB) {
      await env.DB.prepare(`
        INSERT INTO leads (
          id, timestamp, form_type, client_name, phone, email,
          status, notes, project, collection, tier, budget,
          preferred_date, preferred_time, message, payload, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
      `).bind(
        lead.id || `LEAD-${Date.now()}`,
        lead.timestamp || new Date().toISOString(),
        lead.formType || 'General Inquiry',
        lead.clientName || 'Client',
        lead.phone || '',
        lead.email || '',
        lead.status || 'new',
        lead.notes || '',
        lead.project || '',
        lead.collection || '',
        lead.tier || '',
        lead.budget || '',
        lead.date || '',
        lead.timeSlot || '',
        lead.message || '',
        JSON.stringify(lead.additionalData || lead)
      ).run();
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error?.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
