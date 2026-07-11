import { ChromaClient, CloudClient } from 'chromadb';

const isCloud = !!process.env.CHROMA_API_KEY;

let chroma;
try {
  if (isCloud) {
    chroma = new CloudClient({
      apiKey: process.env.CHROMA_API_KEY,
      database: process.env.CHROMA_DATABASE,
      tenant: process.env.CHROMA_TENANT,
    });
  } else {
    chroma = new ChromaClient({
      path: `http://${process.env.CHROMA_HOST || 'localhost'}:${process.env.CHROMA_PORT || 8000}`,
    });
  }
} catch (err) {
  console.warn('[ChromaDB] Failed to initialize client:', err);
  chroma = null;
}

/**
 * Get or create a ChromaDB collection for a session.
 * @param {string} sessionId
 */
async function getCollection(sessionId) {
  if (!chroma) throw new Error('ChromaDB client not available');
  return chroma.getOrCreateCollection({
    name: `session_${sessionId}`,
    metadata: { 'hnsw:space': 'cosine' },
  });
}

/**
 * Add conversation pairs (already embedded) to ChromaDB.
 * @param {string} sessionId
 * @param {{ id: string; embedding: number[]; document: string; metadata: object }[]} items
 */
export async function addVectors(sessionId, items) {
  if (!chroma) {
    console.warn('[ChromaDB] Skipping vector addition (client not available)');
    return 0;
  }
  try {
    const collection = await getCollection(sessionId);
    
    // Batch insert to avoid ChromaDB payload size and max batch limits
    const BATCH_SIZE = 100;
    for (let i = 0; i < items.length; i += BATCH_SIZE) {
      const batch = items.slice(i, i + BATCH_SIZE);
      await collection.add({
        ids: batch.map((i) => i.id),
        embeddings: batch.map((i) => i.embedding),
        documents: batch.map((i) => i.document),
        metadatas: batch.map((i) => i.metadata),
      });
    }

    console.log(`[ChromaDB] Successfully added ${items.length} vectors`);
    return items.length;
  } catch (err) {
    console.warn('[ChromaDB] Failed to add vectors:', err);
    return 0;
  }
}

/**
 * Query the top-k most similar vectors for a given query embedding.
 * @param {string} sessionId
 * @param {number[]} queryEmbedding
 * @param {number} k
 * @returns {Promise<{ document: string; metadata: object; distance: number }[]>}
 */
export async function queryVectors(sessionId, queryEmbedding, k = 5) {
  if (!chroma) {
    console.warn('[ChromaDB] Skipping vector query (client not available)');
    return [];
  }
  try {
    const collection = await getCollection(sessionId);
    const results = await collection.query({
      queryEmbeddings: [queryEmbedding],
      nResults: k,
      include: ['documents', 'metadatas', 'distances'],
    });
    const documents = results.documents[0] || [];
    const metadatas = results.metadatas[0] || [];
    const distances = results.distances[0] || [];
    return documents.map((doc, i) => ({
      document: doc,
      metadata: metadatas[i],
      distance: distances[i],
    }));
  } catch (err) {
    console.warn('[ChromaDB] Failed to query vectors:', err);
    return [];
  }
}

/**
 * Delete a session's entire ChromaDB collection.
 * @param {string} sessionId
 */
export async function deleteCollection(sessionId) {
  if (!chroma) return;
  try {
    await chroma.deleteCollection({ name: `session_${sessionId}` });
  } catch {
    // Collection may not exist — safe to ignore
  }
}

/**
 * Count vectors stored for a session.
 * @param {string} sessionId
 * @returns {Promise<number>}
 */
export async function countVectors(sessionId) {
  if (!chroma) return 0;
  try {
    const collection = await getCollection(sessionId);
    return await collection.count();
  } catch {
    return 0;
  }
}

/**
 * On server startup, delete all orphaned session_* collections.
 * Since sessions are in-memory, any existing collections after a
 * restart are orphans from a previous run.
 * @returns {Promise<number>} number of collections deleted
 */
export async function cleanupOrphanedCollections() {
  if (!chroma) return 0;
  try {
    const collections = await chroma.listCollections();
    const sessionPattern = /^session_/;

    let deleted = 0;
    for (const col of collections) {
      if (sessionPattern.test(col.name)) {
        try {
          await chroma.deleteCollection({ name: col.name });
          deleted++;
        } catch {
          // Collection may already be gone — safe to skip
        }
      }
    }

    if (deleted > 0) {
      console.log(`[ChromaDB] Cleaned up ${deleted} orphaned session collection(s)`);
    }
    return deleted;
  } catch (err) {
    console.warn('[ChromaDB] Could not clean up orphaned collections:', err);
    return 0;
  }
}
