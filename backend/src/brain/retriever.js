import { embed } from './embedder.js';
import { queryVectors } from './chromaClient.js';
import { rerank } from './reranker.js';

/**
 * Keyword score: how many words from `query` appear in `document` (normalized).
 * @param {string} query
 * @param {string} document
 * @returns {number} 0–1
 */
function keywordScore(query, document) {
  const queryWords = new Set(
    query
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(Boolean)
  );
  if (queryWords.size === 0) return 0;

  const docWords = document.toLowerCase();
  let hits = 0;
  for (const word of queryWords) {
    if (docWords.includes(word)) hits++;
  }
  return hits / queryWords.size;
}

/**
 * Semantic Retriever — hybrid search (dense + keyword) + Cross-Encoder reranking.
 *
 * 1. Embed the incoming message.
 * 2. Query ChromaDB for top-k candidates (dense).
 * 3. Pre-score with a weighted hybrid score.
 * 4. Rerank the candidates using a Cross-Encoder.
 * 5. Return the top-5 (context, reply) pairs.
 *
 * @param {string} sessionId
 * @param {string} incomingMessage
 * @param {{ topK?: number, alpha?: number }} options
 *   - topK: number of final results (default 5)
 *   - alpha: weight for semantic score [0–1] (default 0.7)
 * @returns {Promise<{ incoming: string, reply: string, score: number, rerankScore: number }[]>}
 */
export async function retrieve(sessionId, incomingMessage, { topK = 15, alpha = 0.7 } = {}) {
  // Fetch more candidates than needed to allow re-ranking
  const candidateK = Math.max(topK * 3, 15);

  const queryEmbedding = await embed(incomingMessage);
  const rawResults = await queryVectors(sessionId, queryEmbedding, candidateK);

  if (rawResults.length === 0) return [];

  // Normalize distances to [0, 1] similarity scores (cosine distance → similarity)
  const maxDist = Math.max(...rawResults.map((r) => r.distance), 1e-9);

  const scored = rawResults.map((result) => {
    const semanticScore = 1 - result.distance / maxDist;
    const kwScore = keywordScore(incomingMessage, result.metadata?.incoming_text ?? result.document);
    const hybridScore = alpha * semanticScore + (1 - alpha) * kwScore;

    return {
      incoming: result.metadata?.incoming_text ?? '',
      reply: result.document,
      score: hybridScore,
      distance: result.distance,
    };
  });

  // Cross-Encoder reranking
  const reranked = await rerank(incomingMessage, scored);
  
  return reranked.slice(0, topK);
}
