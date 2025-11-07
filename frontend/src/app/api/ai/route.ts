import { NextRequest } from 'next/server';

// Remove edge runtime to prevent build issues
// export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    const apiKey = process.env.OPENAI_API_KEY;

    // Simple fallback if no key configured
    if (!apiKey) {
      const reply = ruleBasedReply(String(message || ''));
      return new Response(JSON.stringify({ reply }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    // Optional: Call OpenAI if configured
    const completion = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are RYSE Assistant for a fashion e-commerce. Be concise and helpful.' },
          { role: 'user', content: String(message || '') },
        ],
        temperature: 0.5,
      }),
    });
    const data = await completion.json();
    const reply = data?.choices?.[0]?.message?.content || 'How can I assist you?';
    return new Response(JSON.stringify({ reply }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e: unknown) {
    return new Response(JSON.stringify({ reply: 'Sorry, something went wrong.' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }
}

function ruleBasedReply(input: string): string {
  const q = input.toLowerCase();
  if (q.includes('order') || q.includes('track')) return 'You can track your order from your dashboard Orders page. Need help with an order ID?';
  if (q.includes('size')) return 'Our sizes follow standard Indian sizing. For fitted styles, consider one size up.';
  if (q.includes('return') || q.includes('refund')) return 'We offer easy 7-day returns on all items in original condition.';
  if (q.includes('recommend') || q.includes('suggest')) return 'Tell me your preferred category (Men/Women, Tops/Jeans/Dresses), and budget.';
  return 'I can help with products, sizing, orders, and recommendations. What are you looking for?';
}


