export async function onRequestPost(context: any) {
  try {
    const { request, env } = context;
    const { message } = await request.json();

    if (!message) {
      return new Response(JSON.stringify({ error: "Message is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // If Cloudflare Workers AI is available in the environment
    if (env && env.AI) {
      const response = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
        messages: [
          {
            role: "system",
            content: "You are the AI Luxury Property Concierge for ARWIN RISE, a premier luxury real estate advisory firm in Hyderabad & Dubai. You assist High-Net-Worth Individuals, NRIs, and luxury homebuyers with discretion and elegance. Key inventory: The Skyline Towers in Kukatpally (G+46 iconic towers starting ₹1.98 Cr), The Courtyard Residences in Neopolis (₹1.65 Cr+), The Westside Triplex Villas in Shankarpally (₹3.20 Cr+), The Sovereign Palatial Mansions in Shankarpally (₹6.50 Cr+), and Dubai Private Collection (AED 2M+/₹4.5 Cr+ with 10-Yr Golden Visa & 8-10% tax-free yields). Phone/WhatsApp: +91 84649 54321."
          },
          {
            role: "user",
            content: message
          }
        ]
      });

      return new Response(JSON.stringify({ response: response.response }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response(JSON.stringify({ fallback: true }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message, fallback: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }
}
