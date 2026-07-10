import { pipeline } from '@xenova/transformers';

let _embedder = null;

/**
 * Lazy-load the embedding pipeline (cached after first call).
 */
async function getEmbedder() {
  if (!_embedder) {
    _embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', {
      quantized: true,
    });
  }
  return _embedder;
}

/**
 * Generate a single embedding vector for a text string.
 * @param {string} text
 * @returns {Promise<number[]>}
 */
export async function embed(text) {
  const embedder = await getEmbedder();
  const output = await embedder(text, { pooling: 'mean', normalize: true });
  return Array.from(output.data);
}

/**
 * Batch-embed an array of strings.
 * Processes in chunks to avoid OOM.
 * @param {string[]} texts
 * @param {number} chunkSize
 * @returns {Promise<number[][]>}
 */
export async function embedBatch(texts, chunkSize = 32) {
  const results = [];
  for (let i = 0; i < texts.length; i += chunkSize) {
    const chunk = texts.slice(i, i + chunkSize);
    const embeddings = await Promise.all(chunk.map(embed));
    results.push(...embeddings);
  }
  return results;
}
