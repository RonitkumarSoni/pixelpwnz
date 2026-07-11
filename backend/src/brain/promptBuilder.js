// ─────────────────────────────────────────────────────────────────────────────
// Tone profile builder
// ─────────────────────────────────────────────────────────────────────────────

const EMOJI_REGEX =
  /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F000}-\u{1F02F}\u{1FA00}-\u{1FA9F}]/gu;

const SLANG_PATTERNS = [
  /\bu\b/,
  /\br\b/,
  /\bur\b/,
  /\blol\b/,
  /\blmao\b/,
  /\bomg\b/,
  /\bbrb\b/,
  /\bidk\b/,
  /\bngl\b/,
  /\btbh\b/,
  /\bbtw\b/,
];

// Fillers/phrases to detect presence of in replies
const FILLER_VOCAB = [
  'haha', 'lol', 'omg', 'honestly', 'literally', 'basically',
  'tbh', 'ngl', 'bruh', 'bro', 'dude', 'man', 'wait', 'ok', 'okay',
  'yeah', 'yep', 'nah', 'nope', 'sure', 'fine', 'nice', 'cool',
];

/**
 * Detect slang usage ratio from a list of replies.
 */
function slangRatio(replies) {
  let count = 0;
  for (const r of replies) {
    const lower = r.toLowerCase();
    if (SLANG_PATTERNS.some((p) => p.test(lower))) count++;
  }
  return replies.length ? count / replies.length : 0;
}

/**
 * Detect punctuation habits from replies.
 * Returns which punctuation marks the user commonly uses.
 */
function detectPunctuation(replies) {
  const total = replies.length || 1;
  return {
    usesEllipsis: replies.filter((r) => r.includes('...')).length / total > 0.15,
    usesExclamation: replies.filter((r) => r.includes('!')).length / total > 0.2,
    usesQuestion: replies.filter((r) => r.includes('?')).length / total > 0.15,
    usesAllCaps: replies.filter((r) => /\b[A-Z]{2,}\b/.test(r)).length / total > 0.1,
  };
}

/**
 * Detect average number of sentences per reply.
 */
function avgSentenceCount(replies) {
  if (!replies.length) return 1;
  const total = replies.reduce((sum, r) => {
    const sentences = r.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
    return sum + Math.max(sentences, 1);
  }, 0);
  return Math.round((total / replies.length) * 10) / 10;
}

/**
 * Find the top filler words/phrases this user commonly uses.
 */
function detectFillers(replies) {
  const freq = {};
  for (const r of replies) {
    const lower = r.toLowerCase();
    for (const filler of FILLER_VOCAB) {
      if (new RegExp(`\\b${filler}\\b`).test(lower)) {
        freq[filler] = (freq[filler] || 0) + 1;
      }
    }
  }
  // Return top 3 fillers used in >10% of replies
  const threshold = replies.length * 0.1;
  return Object.entries(freq)
    .filter(([, count]) => count >= threshold)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([word]) => word);
}

/**
 * Build a full tone profile from a list of ConversationPair objects.
 * @param {{ user_reply: string, emoji_count?: number, word_count_out?: number }[]} pairs
 */
export function buildToneProfile(pairs) {
  if (!pairs.length) {
    return {
      avgReplyLength: 10,
      emojiFrequency: 0,
      formalityLevel: 'Medium',
      usesCapitalization: true,
      exampleEmojis: [],
      punctuation: { usesEllipsis: false, usesExclamation: false, usesQuestion: false, usesAllCaps: false },
      avgSentences: 1,
      commonFillers: [],
    };
  }

  const replies = pairs.map((p) => p.user_reply);

  const avgReplyLength =
    pairs.reduce((s, p) => s + (p.word_count_out ?? p.user_reply.split(/\s+/).length), 0) /
    pairs.length;

  const emojiFrequency =
    pairs.filter((p) => (p.emoji_count ?? (p.user_reply.match(EMOJI_REGEX) || []).length) > 0)
      .length / pairs.length;

  const capRatio = replies.filter((r) => /^[A-Z]/.test(r.trim())).length / replies.length;
  const usesCapitalization = capRatio > 0.5;

  const emojiSet = new Set();
  for (const p of pairs) {
    const found = p.user_reply.match(EMOJI_REGEX) || [];
    found.forEach((e) => emojiSet.add(e));
    if (emojiSet.size >= 5) break;
  }

  const slang = slangRatio(replies);
  let formalityLevel;
  if (slang > 0.3 || !usesCapitalization) formalityLevel = 'Low';
  else if (slang < 0.1 && usesCapitalization) formalityLevel = 'High';
  else formalityLevel = 'Medium';

  return {
    avgReplyLength: Math.round(avgReplyLength * 10) / 10,
    emojiFrequency: Math.round(emojiFrequency * 100),
    formalityLevel,
    usesCapitalization,
    exampleEmojis: [...emojiSet].slice(0, 5),
    punctuation: detectPunctuation(replies),
    avgSentences: avgSentenceCount(replies),
    commonFillers: detectFillers(replies),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Prompt builder
// ─────────────────────────────────────────────────────────────────────────────

const FALLBACK_EXAMPLES = [
  { incoming: "Hey, are you free?", reply: "Sure, just let me know when!" },
  { incoming: "What's up?", reply: "Not much, you?" },
];

/**
 * Build the system prompt with fully injected tone profile.
 * @param {string} userName
 * @param {ReturnType<typeof buildToneProfile>} toneProfile
 * @returns {string}
 */
export function buildSystemPrompt(userName, toneProfile) {
  const {
    avgReplyLength,
    emojiFrequency,
    formalityLevel,
    usesCapitalization,
    exampleEmojis,
    punctuation,
    avgSentences,
    commonFillers,
  } = toneProfile;

  // Emoji line
  const emojiNote =
    emojiFrequency > 0
      ? `Uses emojis in ~${emojiFrequency}% of replies${exampleEmojis.length ? ` (commonly: ${exampleEmojis.join(' ')})` : ''}.`
      : `Rarely or never uses emojis.`;

  // Capitalization line
  const capNote = usesCapitalization
    ? `Usually starts messages with a capital letter.`
    : `Often types in all lowercase — very casual style.`;

  // Punctuation lines — only mention what's actually true
  const punctuationNotes = [];
  if (punctuation.usesEllipsis) punctuationNotes.push('uses "..." frequently');
  if (punctuation.usesExclamation) punctuationNotes.push('uses "!" often for emphasis');
  if (punctuation.usesAllCaps) punctuationNotes.push('occasionally CAPS words for emphasis');
  if (!punctuation.usesExclamation && !punctuation.usesEllipsis) {
    punctuationNotes.push('minimal punctuation — plain and short');
  }
  const punctuationNote = punctuationNotes.join(', ');

  // Sentence density
  const sentenceNote =
    avgSentences <= 1.2
      ? `Typically sends a single short sentence per message.`
      : avgSentences <= 2.5
        ? `Usually sends 1–2 sentences per message.`
        : `Often sends multiple sentences in one message.`;

  // Filler words
  const fillersNote =
    commonFillers.length > 0
      ? `Frequently uses words/phrases like: "${commonFillers.join('", "')}".`
      : '';

  const descriptionNote = toneProfile.description 
    ? `\n### Persona Description:\n${toneProfile.description}\n` 
    : '';

  return `You are ${userName}. You are chatting with someone on a messaging app. 
You MUST adopt the persona, tone, and worldview of ${userName} completely. ${descriptionNote}

### Your Writing Style Profile:
- Average Reply Length: ${avgReplyLength} words. Keep your responses around this length.
- Sentences Per Message: ${sentenceNote}
- Emoji Usage: ${emojiNote}
- Formality Level: ${formalityLevel}. ${
    formalityLevel === 'Low'
      ? 'Use casual language, slang, and abbreviations.'
      : formalityLevel === 'High'
        ? 'Use proper grammar and complete sentences.'
        : 'Mix casual style with correct grammar.'
  }
- Capitalization: ${capNote}
- Punctuation Habits: ${punctuationNote}.${fillersNote ? `\n- Common Words: ${fillersNote}` : ''}

### Critical Rules:
1. Act completely as ${userName}. Show their unique personality, attitude, and perspective in your response.
2. NEVER mention that you are an AI, a bot, a clone, or an assistant. Completely stay in character.
3. Output ONLY the raw reply text — no labels, no quotes, no "Reply:" prefix.
4. Keep the reply natural and match the average length of ~${avgReplyLength} words. Do NOT write long paragraphs unless the average length is high.
5. If the examples or incoming message use a specific language, dialect, or slang (e.g. Hinglish), you MUST reply in that exact same language and dialect.
6. Use the Examples below as deep inspiration for the character's exact vibe, but generate a completely original response.`;
}

/**
 * Build the user-facing few-shot prompt.
 * @param {string} userName
 * @param {{ incoming: string, reply: string }[]} examples
 * @param {string} newMessage
 * @returns {string}
 */
export function buildUserPrompt(userName, examples, newMessage) {
  const shots = examples.length > 0 ? examples : FALLBACK_EXAMPLES;

  const examplesText = shots
    .slice(0, 5)
    .map(
      (ex, i) =>
        `Example ${i + 1}:\nIncoming: "${ex.incoming}"\n${userName}: "${ex.reply}"`
    )
    .join('\n\n');

  return `Here are ${shots.slice(0, 5).length} examples of how ${userName} has replied to messages in the past:

${examplesText}

Now reply to this new message exactly as ${userName} would:
Incoming: "${newMessage}"
${userName}:`;
}

/**
 * Convenience: build both prompts together.
 * @param {{ userName: string, pairs: object[], examples: { incoming: string, reply: string }[], newMessage: string }} params
 * @returns {{ systemPrompt: string, userPrompt: string, toneProfile: object }}
 */
export function buildPrompts({ userName, pairs, examples, newMessage }) {
  const toneProfile = buildToneProfile(pairs);
  const systemPrompt = buildSystemPrompt(userName, toneProfile);
  const userPrompt = buildUserPrompt(userName, examples, newMessage);
  return { systemPrompt, userPrompt, toneProfile };
}
