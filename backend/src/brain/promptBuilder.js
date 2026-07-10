// ─────────────────────────────────────────────────────────────────────────────
// Tone profile builder
// ─────────────────────────────────────────────────────────────────────────────

const EMOJI_REGEX =
  /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F000}-\u{1F02F}\u{1FA00}-\u{1FA9F}]/gu;

const SLANG_PATTERNS = [
  /\bu\b/,      // "u" as standalone word
  /\br\b/,      // "r" as standalone word
  /\bur\b/,     // "ur"
  /\blol\b/,
  /\blmao\b/,
  /\bomg\b/,
  /\bbrb\b/,
  /\bidk\b/,
  /\bngl\b/,
  /\btbh\b/,
  /\bbtw\b/,
];

/**
 * Detect slang usage ratio from a list of replies.
 * @param {string[]} replies
 * @returns {number} 0–1
 */
function slangRatio(replies) {
  let count = 0;
  for (const r of replies) {
    const lower = r.toLowerCase();
    if (SLANG_PATTERNS.some((pattern) => pattern.test(lower))) count++;
  }
  return replies.length ? count / replies.length : 0;
}

/**
 * Build a tone profile from a list of ConversationPair objects.
 * @param {{ user_reply: string, emoji_count: number, word_count_out: number }[]} pairs
 * @returns {{
 *   avgReplyLength: number,
 *   emojiFrequency: number,
 *   formalityLevel: 'Low' | 'Medium' | 'High',
 *   usesCapitalization: boolean,
 *   exampleEmojis: string[]
 * }}
 */
export function buildToneProfile(pairs) {
  if (!pairs.length) {
    return {
      avgReplyLength: 10,
      emojiFrequency: 0,
      formalityLevel: 'Medium',
      usesCapitalization: true,
      exampleEmojis: [],
    };
  }

  const avgReplyLength =
    pairs.reduce((s, p) => s + (p.word_count_out ?? p.user_reply.split(/\s+/).length), 0) /
    pairs.length;

  const emojiFrequency =
    pairs.filter((p) => (p.emoji_count ?? (p.user_reply.match(EMOJI_REGEX) || []).length) > 0)
      .length / pairs.length;

  // Capitalization: does the user usually start replies with uppercase?
  const capRatio =
    pairs.filter((p) => /^[A-Z]/.test(p.user_reply.trim())).length / pairs.length;
  const usesCapitalization = capRatio > 0.5;

  // Collect top emojis used
  const emojiSet = new Set();
  for (const p of pairs) {
    const found = p.user_reply.match(EMOJI_REGEX) || [];
    found.forEach((e) => emojiSet.add(e));
    if (emojiSet.size >= 5) break;
  }

  // Formality: inverse of slang usage + capitalization
  const slang = slangRatio(pairs.map((p) => p.user_reply));
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
 * Build the system prompt with injected tone profile.
 * @param {string} userName
 * @param {{ avgReplyLength: number, emojiFrequency: number, formalityLevel: string, usesCapitalization: boolean, exampleEmojis: string[] }} toneProfile
 * @returns {string}
 */
export function buildSystemPrompt(userName, toneProfile) {
  const { avgReplyLength, emojiFrequency, formalityLevel, usesCapitalization, exampleEmojis } =
    toneProfile;

  const emojiNote =
    emojiFrequency > 0
      ? `Uses emojis in ~${emojiFrequency}% of replies${exampleEmojis.length ? ` (e.g., ${exampleEmojis.join(' ')})` : ''}.`
      : `Rarely or never uses emojis.`;

  const capNote = usesCapitalization
    ? `Typically starts sentences with a capital letter.`
    : `Often types in lowercase, casual style.`;

  return `You are an AI that strictly mimics the WhatsApp texting style of ${userName}.

### ${userName}'s Writing Style Profile:
- Average Reply Length: ${avgReplyLength} words. Never write significantly more.
- Emoji Usage: ${emojiNote}
- Formality Level: ${formalityLevel}. ${formalityLevel === 'Low' ? 'Uses slang and casual abbreviations.' : formalityLevel === 'High' ? 'Uses proper grammar and full sentences.' : 'Mix of casual and correct grammar.'}
- Capitalization: ${capNote}

### Critical Rules:
1. Reply ONLY as ${userName}. Never generate the other person's message.
2. Match the exact tone and message length above. One or two sentences max if that's their style.
3. Mirror their punctuation habits (ellipses, exclamation marks, question marks, etc.).
4. If they use slang (e.g., "u", "r", "lol"), use it too.
5. NEVER reveal you are an AI or a bot. Always stay in character.
6. Output ONLY the reply text. No labels, no quotes, no "Reply:" prefix.`;
}

/**
 * Build the user-facing few-shot prompt.
 * @param {string} userName
 * @param {{ incoming: string, reply: string }[]} examples - Up to 5 retrieved pairs
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

  return `Here are ${shots.length} examples of how ${userName} has replied to messages in the past:

${examplesText}

Now reply to this new message exactly as ${userName} would:
Incoming: "${newMessage}"
${userName}:`;
}

/**
 * Convenience: build both prompts together.
 * @param {{
 *   userName: string,
 *   pairs: object[],
 *   examples: { incoming: string, reply: string }[],
 *   newMessage: string
 * }} params
 * @returns {{ systemPrompt: string, userPrompt: string, toneProfile: object }}
 */
export function buildPrompts({ userName, pairs, examples, newMessage }) {
  const toneProfile = buildToneProfile(pairs);
  const systemPrompt = buildSystemPrompt(userName, toneProfile);
  const userPrompt = buildUserPrompt(userName, examples, newMessage);
  return { systemPrompt, userPrompt, toneProfile };
}
