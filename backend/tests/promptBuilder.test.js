import { describe, it, expect } from 'vitest';
import { buildToneProfile, buildSystemPrompt, buildUserPrompt, buildPrompts } from '../src/brain/promptBuilder.js';

const SAMPLE_PAIRS = [
  { user_reply: 'yeah sure lol', word_count_out: 3, emoji_count: 0, incoming_message: 'Are you free?' },
  { user_reply: 'omg yes!!! 😂', word_count_out: 3, emoji_count: 1, incoming_message: 'Did you see that?' },
  { user_reply: 'idk man', word_count_out: 3, emoji_count: 0, incoming_message: 'What do you think?' },
  { user_reply: 'u coming tmrw?', word_count_out: 3, emoji_count: 0, incoming_message: 'Party tomorrow' },
  { user_reply: 'haha no way', word_count_out: 3, emoji_count: 0, incoming_message: 'Did you really?' },
  { user_reply: 'Yeah absolutely 👍', word_count_out: 2, emoji_count: 1, incoming_message: 'Sounds good?' },
];

const FORMAL_PAIRS = [
  { user_reply: 'Sure, that works for me.', word_count_out: 5, emoji_count: 0, incoming_message: 'Can we meet at 3?' },
  { user_reply: 'I will get back to you shortly.', word_count_out: 7, emoji_count: 0, incoming_message: 'When are you free?' },
  { user_reply: 'Sounds like a plan.', word_count_out: 4, emoji_count: 0, incoming_message: 'Let\'s do it.' },
];

describe('buildToneProfile', () => {
  it('returns defaults for empty pairs array', () => {
    const profile = buildToneProfile([]);
    expect(profile.avgReplyLength).toBe(10);
    expect(profile.emojiFrequency).toBe(0);
    expect(profile.formalityLevel).toBe('Medium');
  });

  it('calculates correct average reply length', () => {
    const profile = buildToneProfile(SAMPLE_PAIRS);
    // all word_count_out are 2 or 3, average is (3+3+3+3+3+2)/6 = 2.83 → rounded to 2.8
    expect(profile.avgReplyLength).toBeCloseTo(2.8, 0);
  });

  it('detects emoji frequency correctly', () => {
    const profile = buildToneProfile(SAMPLE_PAIRS);
    // 2 out of 6 have emojis → 33%
    expect(profile.emojiFrequency).toBe(33);
  });

  it('detects Low formality with slang', () => {
    const profile = buildToneProfile(SAMPLE_PAIRS);
    expect(profile.formalityLevel).toBe('Low');
  });

  it('detects High formality with proper sentences', () => {
    const profile = buildToneProfile(FORMAL_PAIRS);
    expect(profile.formalityLevel).toBe('High');
  });

  it('detects capitalization usage', () => {
    const profile = buildToneProfile(FORMAL_PAIRS);
    expect(profile.usesCapitalization).toBe(true);
  });
});

describe('buildSystemPrompt', () => {
  const toneProfile = {
    avgReplyLength: 5,
    emojiFrequency: 20,
    formalityLevel: 'Low',
    usesCapitalization: false,
    exampleEmojis: ['😂'],
    punctuation: { usesEllipsis: true, usesExclamation: false, usesQuestion: false, usesAllCaps: false },
    avgSentences: 1.1,
    commonFillers: ['lol', 'nah'],
  };

  it('includes the user name', () => {
    const prompt = buildSystemPrompt('Rishab', toneProfile);
    expect(prompt).toContain('Rishab');
  });

  it('includes avg reply length', () => {
    const prompt = buildSystemPrompt('Rishab', toneProfile);
    expect(prompt).toContain('5 words');
  });

  it('includes emoji frequency', () => {
    const prompt = buildSystemPrompt('Rishab', toneProfile);
    expect(prompt).toContain('20%');
  });

  it('includes formality level', () => {
    const prompt = buildSystemPrompt('Rishab', toneProfile);
    expect(prompt).toContain('Low');
  });

  it('includes AI rule about not revealing bot identity', () => {
    const prompt = buildSystemPrompt('Rishab', toneProfile);
    expect(prompt.toLowerCase()).toContain('never reveal');
  });

  it('includes punctuation habits in prompt', () => {
    const prompt = buildSystemPrompt('Rishab', toneProfile);
    expect(prompt).toContain('...');
  });

  it('includes common fillers in prompt', () => {
    const prompt = buildSystemPrompt('Rishab', toneProfile);
    expect(prompt).toContain('lol');
    expect(prompt).toContain('nah');
  });

  it('includes sentence density note', () => {
    const prompt = buildSystemPrompt('Rishab', toneProfile);
    expect(prompt).toContain('single short sentence');
  });

  it('includes hard word limit based on avg length', () => {
    const prompt = buildSystemPrompt('Rishab', toneProfile);
    // ceil(5 * 1.5) = 8
    expect(prompt).toContain('8 words');
  });
});

describe('buildToneProfile — new fields', () => {
  const PUNCT_PAIRS = [
    { user_reply: 'yeah... I guess so', word_count_out: 5, emoji_count: 0 },
    { user_reply: 'wait... really?', word_count_out: 3, emoji_count: 0 },
    { user_reply: 'hmm...', word_count_out: 1, emoji_count: 0 },
    { user_reply: 'ok fine', word_count_out: 2, emoji_count: 0 },
    { user_reply: 'lol yeah', word_count_out: 2, emoji_count: 0 },
    { user_reply: 'haha yeah lol', word_count_out: 3, emoji_count: 0 },
    { user_reply: 'lol ok', word_count_out: 2, emoji_count: 0 },
  ];

  it('detects ellipsis usage', () => {
    const profile = buildToneProfile(PUNCT_PAIRS);
    expect(profile.punctuation.usesEllipsis).toBe(true);
  });

  it('detects avg sentence count', () => {
    const profile = buildToneProfile(PUNCT_PAIRS);
    expect(profile.avgSentences).toBeGreaterThanOrEqual(1);
  });

  it('detects common fillers', () => {
    const profile = buildToneProfile(PUNCT_PAIRS);
    expect(profile.commonFillers).toContain('lol');
  });

  it('returns punctuation object in default profile', () => {
    const profile = buildToneProfile([]);
    expect(profile.punctuation).toHaveProperty('usesEllipsis');
    expect(profile.punctuation).toHaveProperty('usesExclamation');
  });

  it('returns avgSentences in default profile', () => {
    const profile = buildToneProfile([]);
    expect(profile.avgSentences).toBe(1);
  });

  it('returns commonFillers as empty array by default', () => {
    const profile = buildToneProfile([]);
    expect(profile.commonFillers).toEqual([]);
  });
});

describe('buildUserPrompt', () => {
  const examples = [
    { incoming: 'Hey!', reply: 'yo!' },
    { incoming: 'Free?', reply: 'nah busy' },
  ];

  it('includes the new incoming message', () => {
    const prompt = buildUserPrompt('Rishab', examples, 'Are you coming tonight?');
    expect(prompt).toContain('Are you coming tonight?');
  });

  it('includes all provided examples', () => {
    const prompt = buildUserPrompt('Rishab', examples, 'test');
    expect(prompt).toContain('Example 1');
    expect(prompt).toContain('Example 2');
    expect(prompt).toContain('yo!');
    expect(prompt).toContain('nah busy');
  });

  it('caps at 5 examples', () => {
    const manyExamples = Array.from({ length: 10 }, (_, i) => ({
      incoming: `msg ${i}`,
      reply: `reply ${i}`,
    }));
    const prompt = buildUserPrompt('Rishab', manyExamples, 'test');
    expect(prompt).not.toContain('Example 6');
    expect(prompt).toContain('Example 5');
  });

  it('uses fallback examples when none provided', () => {
    const prompt = buildUserPrompt('Rishab', [], 'test');
    expect(prompt).toContain('Example 1');
  });
});

describe('buildPrompts (integration)', () => {
  it('returns systemPrompt, userPrompt, and toneProfile', () => {
    const result = buildPrompts({
      userName: 'Rishab',
      pairs: SAMPLE_PAIRS,
      examples: [{ incoming: 'Hey?', reply: 'yo!' }],
      newMessage: 'Are you free?',
    });
    expect(result).toHaveProperty('systemPrompt');
    expect(result).toHaveProperty('userPrompt');
    expect(result).toHaveProperty('toneProfile');
    expect(result.systemPrompt.length).toBeGreaterThan(50);
    expect(result.userPrompt).toContain('Are you free?');
  });
});
