import { describe, it, expect, vi } from 'vitest';
import { buildRAGPrompt } from '../src/brain/index.js';

// Mock the retriever so we don't actually hit ChromaDB
vi.mock('../src/brain/retriever.js', () => ({
  retrieve: vi.fn(async () => [
    { incoming: 'Hello', reply: 'Hey!' },
    { incoming: 'How are you?', reply: 'Good' }
  ]),
}));

describe('Latency Optimization: buildRAGPrompt', () => {
  const mockAllPairs = Array.from({ length: 5000 }, (_, i) => ({
    user_reply: 'Yeah lol this is a test message to see how fast it computes.',
    word_count_out: 12,
    emoji_count: 0
  }));

  const mockPrecomputedToneProfile = {
    avgReplyLength: 12,
    emojiFrequency: 0,
    formalityLevel: 'Low',
    usesCapitalization: true,
    exampleEmojis: [],
    punctuation: { usesEllipsis: false, usesExclamation: false, usesQuestion: false, usesAllCaps: false },
    avgSentences: 1,
    commonFillers: ['yeah', 'lol']
  };

  it('computes on the fly when allPairs is provided (slower)', async () => {
    const t0 = performance.now();
    const result = await buildRAGPrompt('session-1', 'test message', 'Vineet', { allPairs: mockAllPairs });
    const t1 = performance.now();
    
    expect(result.systemPrompt).toContain('Vineet');
    // Generating tone profile from 5000 pairs takes non-zero time, though vitest runs fast.
    console.log(`On-the-fly latency: ${t1 - t0}ms`);
  });

  it('skips computation when precomputed toneProfile is provided (faster)', async () => {
    const t0 = performance.now();
    const result = await buildRAGPrompt('session-1', 'test message', 'Vineet', { toneProfile: mockPrecomputedToneProfile });
    const t1 = performance.now();
    
    expect(result.systemPrompt).toContain('Vineet');
    console.log(`Precomputed latency: ${t1 - t0}ms`);
    
    // The total time should be virtually instant (just prompt string interpolation)
    // because retrieve() is mocked. Real latency mostly comes from embed/query.
    expect(result.latencyMs).toBeLessThan(100);
  });
});
