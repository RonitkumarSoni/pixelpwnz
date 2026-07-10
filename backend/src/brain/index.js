import { embed, embedBatch } from './embedder.js';
import { addVectors, queryVectors, deleteCollection, countVectors } from './chromaClient.js';
import { retrieve } from './retriever.js';
import { buildPrompts } from './promptBuilder.js';

export { embed, embedBatch, addVectors, queryVectors, deleteCollection, countVectors, retrieve, buildPrompts };

/**
 * Full ingestion pipeline: embed all pairs and store in ChromaDB.
 * @param {string} sessionId
 * @param {import('../types.js').ConversationPair[]} pairs
 * @returns {Promise<number>} count of stored vectors
 */
export async function ingestPairs(sessionId, pairs) {
  if (!pairs.length) return 0;

  // Embed the incoming messages (what we query against)
  const texts = pairs.map((p) => p.incoming_message);
  const embeddings = await embedBatch(texts);

  const items = pairs.map((pair, i) => ({
    id: pair.id,
    embedding: embeddings[i],
    // Store the user's reply as the document; incoming is in metadata for keyword search
    document: pair.user_reply,
    metadata: {
      session_id: sessionId,
      pair_id: pair.id,
      incoming_text: pair.incoming_message,
      contact: pair.contact_name ?? '',
      reply_length: pair.word_count_out ?? pair.user_reply.split(/\s+/).length,
      emoji_count: pair.emoji_count ?? 0,
      timestamp: pair.timestamp ?? '',
    },
  }));

  return addVectors(sessionId, items);
}

/**
 * Full RAG pipeline: retrieve examples + build prompts.
 * @param {string} sessionId
 * @param {string} incomingMessage
 * @param {string} userName
 * @param {import('../types.js').ConversationPair[]} allPairs - for tone profile
 * @returns {Promise<{ systemPrompt: string, userPrompt: string, toneProfile: object, examples: object[], latencyMs: number }>}
 */
export async function buildRAGPrompt(sessionId, incomingMessage, userName, allPairs) {
  const t0 = Date.now();

  const examples = await retrieve(sessionId, incomingMessage);

  const { systemPrompt, userPrompt, toneProfile } = buildPrompts({
    userName,
    pairs: allPairs,
    examples,
    newMessage: incomingMessage,
  });

  return {
    systemPrompt,
    userPrompt,
    toneProfile,
    examples,
    latencyMs: Date.now() - t0,
  };
}
