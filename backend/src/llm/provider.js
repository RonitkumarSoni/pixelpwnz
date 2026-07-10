import config from '../config.js';

let openaiClient = null;

async function getOpenAI() {
  if (!openaiClient) {
    if (!config.openai.apiKey) {
      throw new Error('OPENAI_API_KEY not configured');
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
  const openai = await getOpenAI();

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
}

/**
 * Generate a reply using Ollama.
 * @param {string} systemPrompt
 * @param {string} userPrompt
 * @param {number} temperature
 * @returns {Promise<{ reply: string, usage: object }>}
 */
async function generateOllama(systemPrompt, userPrompt, temperature) {
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
    throw new Error(`Ollama API error (${response.status}): ${text}`);
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
}

/**
 * Generate a reply using the configured LLM provider.
 * Auto-detects: uses OpenAI if OPENAI_API_KEY is set, otherwise Ollama.
 * @param {string} systemPrompt
 * @param {string} userPrompt
 * @param {number} [temperature=0.7]
 * @returns {Promise<{ reply: string, usage: object }>}
 */
export async function generateReply(systemPrompt, userPrompt, temperature = 0.7) {
  if (config.openai.apiKey) {
    return generateOpenAI(systemPrompt, userPrompt, temperature);
  }
  return generateOllama(systemPrompt, userPrompt, temperature);
}
