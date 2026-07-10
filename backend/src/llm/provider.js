import config from '../config.js';

let openaiClient = null;

async function getOpenAI() {
  if (!openaiClient) {
    if (!config.openai.apiKey) {
      const err = new Error('LLM Service unavailable: OPENAI_API_KEY not configured');
      err.statusCode = 503;
      throw err;
    }
    const { default: OpenAI } = await import('openai');
    openaiClient = new OpenAI({ apiKey: config.openai.apiKey });
  }
  return openaiClient;
}

/**
 * Generate a reply using OpenAI.
 * @param {string} systemPrompt
 * @param {string} userPrompt
 * @param {number} temperature
 * @returns {Promise<{ reply: string, usage: object }>}
 */
async function generateOpenAI(systemPrompt, userPrompt, temperature) {
  let openai;
  try {
    openai = await getOpenAI();
  } catch (err) {
    err.statusCode = err.statusCode || 503;
    throw err;
  }

  try {
    const response = await openai.chat.completions.create({
      model: config.openai.model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature,
      max_tokens: 150,
    });

    return {
      reply: response.choices[0]?.message?.content?.trim() || '',
      usage: {
        prompt_tokens: response.usage?.prompt_tokens || 0,
        completion_tokens: response.usage?.completion_tokens || 0,
        total_tokens: response.usage?.total_tokens || 0,
      },
    };
  } catch (err) {
    throw classifyOpenAIError(err);
  }
}

/**
 * Classify OpenAI errors into proper HTTP status codes.
 */
function classifyOpenAIError(err) {
  if (err.status === 429) {
    const e = new Error('Too many requests. Please wait a moment and try again.');
    e.statusCode = 429;
    return e;
  }
  if (err.status === 401 || err.status === 403) {
    const e = new Error('LLM Service authentication failed');
    e.statusCode = 503;
    return e;
  }
  if (err.name === 'AbortError' || err.code === 'ETIMEDOUT' || err.code === 'ECONNRESET') {
    const e = new Error('LLM request timed out. Please try again.');
    e.statusCode = 504;
    return e;
  }
  const e = new Error('LLM Service unavailable. Please try again later.');
  e.statusCode = 503;
  return e;
}

/**
 * Generate a reply using Ollama.
 * @param {string} systemPrompt
 * @param {string} userPrompt
 * @param {number} temperature
 * @returns {Promise<{ reply: string, usage: object }>}
 */
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
 * Generate a reply using the configured LLM provider.
 * Auto-detects: uses OpenAI if OPENAI_API_KEY is set, otherwise Ollama.
 * On catastrophic failure, falls back to a rule-based reply.
 *
 * @param {string} systemPrompt
 * @param {string} userPrompt
 * @param {number} [temperature=0.7]
 * @returns {Promise<{ reply: string, usage: object, fallback: boolean }>}
 */
export async function generateReply(systemPrompt, userPrompt, temperature = 0.7) {
  try {
    if (config.openai.apiKey) {
      return { ...(await generateOpenAI(systemPrompt, userPrompt, temperature)), fallback: false };
    }
    return { ...(await generateOllama(systemPrompt, userPrompt, temperature)), fallback: false };
  } catch (err) {
    if (err.statusCode === 429 || err.statusCode === 504 || err.statusCode === 503) {
      throw err;
    }
    console.error('[LLM] Unexpected error, using fallback:', err.message);
    return {
      reply: fallbackReply(),
      usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
      fallback: true,
    };
  }
}
