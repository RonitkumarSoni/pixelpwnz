import { describe, it, expect, vi, beforeEach } from 'vitest';
import { retrieve } from '../src/brain/retriever.js';

// Mock the embedder and ChromaDB client
vi.mock('../src/brain/embedder.js', () => ({
  embed: vi.fn(async () => Array(384).fill(0.1)),
}));

vi.mock('../src/brain/chromaClient.js', () => ({
  queryVectors: vi.fn(),
}));

import { queryVectors } from '../src/brain/chromaClient.js';

const MOCK_RESULTS = [
  {
    document: "Yeah sure, 5 works!",
    metadata: { incoming_text: "Are you free at 5?" },
    distance: 0.1,
  },
  {
    document: "Nah I'm busy today",
    metadata: { incoming_text: "Can we meet today?" },
    distance: 0.3,
  },
  {
    document: "Let me check and get back to you",
    metadata: { incoming_text: "What about tomorrow?" },
    distance: 0.5,
  },
];

describe('Retriever', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    queryVectors.mockResolvedValue(MOCK_RESULTS);
  });

  it('returns results sorted by hybrid score (descending)', async () => {
    const results = await retrieve('session-123', 'Are you free at 5?');
    expect(results.length).toBeGreaterThan(0);

    // Verify scores are sorted descending
    for (let i = 0; i < results.length - 1; i++) {
      expect(results[i].score).toBeGreaterThanOrEqual(results[i + 1].score);
    }
  });

  it('returns at most topK results', async () => {
    queryVectors.mockResolvedValue(MOCK_RESULTS);
    const results = await retrieve('session-123', 'test', { topK: 2 });
    expect(results.length).toBeLessThanOrEqual(2);
  });

  it('returns empty array when ChromaDB returns nothing', async () => {
    queryVectors.mockResolvedValue([]);
    const results = await retrieve('session-123', 'anything');
    expect(results).toEqual([]);
  });

  it('gives higher score to semantically closer results (lower distance)', async () => {
    // First mock result has lowest distance (0.1), should rank highest
    const results = await retrieve('session-123', 'Are you free?');
    expect(results[0].incoming).toBe('Are you free at 5?');
  });

  it('boosts keyword matches via hybrid scoring', async () => {
    queryVectors.mockResolvedValue([
      { document: 'Yeah, 5 works!', metadata: { incoming_text: 'completely unrelated topic' }, distance: 0.2 },
      { document: 'Absolutely free!', metadata: { incoming_text: 'Are you free at five today?' }, distance: 0.25 },
    ]);

    const results = await retrieve('session-123', 'free today five', { alpha: 0.5 });
    // Second result has more keyword overlap, should win with alpha=0.5
    expect(results[0].incoming).toBe('Are you free at five today?');
  });

  it('each result has incoming, reply, and score fields', async () => {
    const results = await retrieve('session-123', 'test');
    for (const r of results) {
      expect(r).toHaveProperty('incoming');
      expect(r).toHaveProperty('reply');
      expect(r).toHaveProperty('score');
      expect(typeof r.score).toBe('number');
    }
  });
});
