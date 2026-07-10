import { ChromaClient } from 'chromadb';

const chroma = new ChromaClient({
  path: `http://${process.env.CHROMA_HOST || 'localhost'}:${process.env.CHROMA_PORT || 8000}`,
});

/**
 * Get-or-create a ChromaDB collection for a session.
 * @param {string} sessionId
 */
async function getCollection(sessionId) {
  return chroma.getOrCreateCollection({
    name: `session_${sessionId}`,
    metadata: { 'hnsw:space': 'cosine' },
  });
}

/**
 * Add conversation pairs (already embedded) to ChromaDB.
 * @param {string} sessionId
 * @param {{ id: string, embedding: number[], document: string, metadata: object }[]} items
 */
export async function addVectors(sessionId, items) {
  const collection = await getCollection(sessionId);

  await collection.add({
    ids: items.map((i) => i.id),
    embeddings: items.map((i) => i.embedding),
    documents: items.map((i) => i.document),
    metadatas: items.map((i) => i.metadata),
  });

  return items.length;
}

/**
 * Query the top-k most similar vectors for a given query embedding.
 * @param {string} sessionId
 * @param {number[]} queryEmbedding
 * @param {number} k
 * @returns {Promise<{ document: string, metadata: object, distance: number }[]>}
 */
export async function queryVectors(sessionId, queryEmbedding, k = 5) {
  const collection = await getCollection(sessionId);

  const results = await collection.query({
    queryEmbeddings: [queryEmbedding],
    nResults: k,
    include: ['documents', 'metadatas', 'distances'],
  });

  const documents = results.documents[0] ?? [];
  const metadatas = results.metadatas[0] ?? [];
  const distances = results.distances[0] ?? [];

  return documents.map((doc, i) => ({
    document: doc,
    metadata: metadatas[i],
    distance: distances[i],
  }));
}

/**
 * Delete a session's entire ChromaDB collection.
 * @param {string} sessionId
 */
export async function deleteCollection(sessionId) {
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
    console.warn('[ChromaDB] Could not clean up orphaned collections:', err.message);
    return 0;
  }
}
