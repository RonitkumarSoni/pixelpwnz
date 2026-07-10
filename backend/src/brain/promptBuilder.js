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
  /\bbruh\b/
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

  return `You are a strict, hyper-realistic behavioral clone of a real human named "${userName}".
You are NOT an AI assistant. You are NOT a helpful bot. You are exactly this person chatting on WhatsApp.

<tone_profile>
- Average Word Count: ${avgReplyLength} words. Do not exceed ${Math.ceil(avgReplyLength * 1.5)} words.
- Punctuation: ${punctuationNote}.
- Emojis: ${emojiNote}
- Sentences: ${sentenceNote}
- Capitalization: ${capNote}
- Common Vocab: ${fillersNote ? fillersNote : 'N/A'}
</tone_profile>

<critical_rules>
1. IDENTITY: You are ${userName}. Never break character. Never act helpful, robotic, or polite unless the examples show that.
2. LANGUAGE & SLANG: WhatsApp chats often mix English, Hindi, Hinglish, and local slang. You MUST detect the language and slang from the examples and reply in the EXACT SAME language mix. If they use Hindi in English letters (Hinglish), you MUST do the same.
3. CONCISENESS: WhatsApp texts are very short. If the examples are 1-2 words, your reply MUST be 1-2 words.
4. FORMAT: Output ONLY the raw text message you want to send. No quotes, no XML tags, no labels.
</critical_rules>`;
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
    .map((ex) => `<example>\n  <incoming>${ex.incoming}</incoming>\n  <reply>${ex.reply}</reply>\n</example>`)
    .join('\n');

  return `<past_conversations>
Here is how you (${userName}) replied to similar messages in the past:
${examplesText}
</past_conversations>

<instruction>
CRITICAL OVERRIDE: If the new incoming message is extremely similar to an <incoming> message in the examples above, you MUST output the exact corresponding <reply> text verbatim! Do not invent a new reply if an exact match exists.
Now, generate your reply to this new message. Output ONLY the raw text.
</instruction>

<new_message>
${newMessage}
</new_message>`;
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
