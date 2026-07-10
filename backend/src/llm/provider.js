import config from '../config.js';

// OpenAI implementation removed

async function generateOllama(systemPrompt, userPrompt, temperature) {
  try {
    const response = await fetch(`${config.ollama.baseUrl}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: config.ollama.model,
        system: systemPrompt,
        prompt: userPrompt,
        temperature,
        stream: false,
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      const text = await response.text();
      if (response.status === 429) {
        const err = new Error('Too many requests. Please wait a moment and try again.');
        err.statusCode = 429;
        throw err;
      }
      const err = new Error(`Ollama API error (${response.status}): ${text}`);
      err.statusCode = 503;
      throw err;
    }

    const data = await response.json();

    return {
      reply: (data.response || '').trim(),
      provider: 'ollama',
      usage: {
        prompt_tokens: data.prompt_eval_count || 0,
        completion_tokens: data.eval_count || 0,
        total_tokens: (data.prompt_eval_count || 0) + (data.eval_count || 0),
      },
    };
  } catch (err) {
    if (err.statusCode) throw err;
    if (err.name === 'TimeoutError' || err.name === 'AbortError') {
      const e = new Error('LLM request timed out. Please try again.');
      e.statusCode = 504;
      throw e;
    }
    if (err.code === 'ECONNREFUSED') {
      const e = new Error('LLM Service unavailable. Is Ollama running?');
      e.statusCode = 503;
      throw e;
    }
    const e = new Error(`LLM error: ${err.message}`);
    e.statusCode = 503;
    throw e;
  }
}

async function generateGroq(systemPrompt, userPrompt, temperature) {
  const apiKey = config.groq?.apiKey;
  if (!apiKey) throw new Error('GROQ_API_KEY not configured');

  const model = config.groq?.model || 'llama-3.1-8b-instant';

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature,
      max_tokens: 150,
    }),
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Groq API error (${response.status}): ${text}`);
  }

  const data = await response.json();

  return {
    reply: data.choices?.[0]?.message?.content?.trim() || '',
    provider: 'groq',
    usage: {
      prompt_tokens: data.usage?.prompt_tokens || 0,
      completion_tokens: data.usage?.completion_tokens || 0,
      total_tokens: data.usage?.total_tokens || 0,
    },
  };
}

/**
 * Rule-based fallback reply when LLM is completely unavailable.
 * PRD §3 Epic 3 — Fallback requirement.
 */
function fallbackReply() {
  const fallbacks = [
    "I'll get back to you soon",
    'Hey, busy right now — will reply later!',
    'Can we talk about this later?',
  ];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

/**
 * Hybrid LLM provider — tries local Ollama first, falls back to Groq.
 * On catastrophic failure, falls back to a rule-based reply.
 * Priority: Ollama (free, local) → Groq (free, ultra-fast) → Fallback Text
 * 
 * @param {string} systemPrompt
 * @param {string} userPrompt
 * @param {number} [temperature=0.7]
 * @returns {Promise<{ reply: string, provider: string, usage: object, fallback: boolean }>}
 */
export async function generateReply(systemPrompt, userPrompt, temperature = 0.7) {
  const errors = [];

  // 1. Try Groq (cloud, powerful 70B model, fast)
  if (config.groq?.apiKey) {
    try {
      return { ...(await generateGroq(systemPrompt, userPrompt, temperature)), fallback: false };
    } catch (err) {
      errors.push(`Groq: ${err.message}`);
    }
  }

  // 2. Try Ollama (local, small model fallback)
  try {
    return { ...(await generateOllama(systemPrompt, userPrompt, temperature)), fallback: false };
  } catch (err) {
    errors.push(`Ollama: ${err.message}`);
  }

  // 3. Complete failure - use Rule-based Fallback
  console.error('[LLM] All providers failed, using rule-based fallback.\nErrors:', errors.join('\n'));
  return {
    reply: fallbackReply(),
    provider: 'fallback',
    usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
    fallback: true,
  };
}
