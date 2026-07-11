import { pipeline, env } from '@huggingface/transformers';

// Limit ONNX to 1 thread to avoid OOM on low-RAM machines
env.backends.onnx.wasm.numThreads = 1;

let _embedder = null;

let _initPromise = null;

/**
 * Lazy-load the embedding pipeline (cached after first call).
 */
async function getEmbedder() {
  if (_embedder) return _embedder;
  if (!_initPromise) {
    _initPromise = (async () => {
      // dtype: 'q8' downloads model_quantized.onnx (~23 MB vs 86 MB for fp32)
      _embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', {
        dtype: 'q8',
      });
      return _embedder;
    })();
  }
  return await _initPromise;
}

/**
 * Generate a single embedding vector for a text string.
 * @param {string} text
 * @returns {Promise<number[]>}
 */
export async function embed(text) {
  const embedder = await getEmbedder();
  // Ensure we do not pass more than 1000 characters to the local embedder to prevent WebGL/WASM memory crashes
  const safeText = text && text.length > 1000 ? text.substring(0, 1000) : text;
  const output = await embedder(safeText, { pooling: 'mean', normalize: true });
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
