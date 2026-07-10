import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { parseWhatsAppChat } from '../src/parser/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const fixturesDir = join(__dirname, 'fixtures');

function readFixture(name) {
  return readFileSync(join(fixturesDir, name));
}

describe('parseWhatsAppChat', () => {
  describe('simple 2-person chat', () => {
    const buffer = readFixture('simple-chat.txt');

    it('extracts the correct contact name', () => {
      const result = parseWhatsAppChat(buffer, 'Vineet');
      expect(result.contactName).toBe('Rishab');
    });

    it('extracts the correct number of pairs', () => {
      const result = parseWhatsAppChat(buffer, 'Vineet');
      // 4 incoming messages from Rishab that Vineet replied to
      // (first msg is from Vineet, last msg from Rishab has no reply)
      expect(result.pairs.length).toBe(4);
    });

    it('counts total messages correctly', () => {
      const result = parseWhatsAppChat(buffer, 'Vineet');
      expect(result.totalMessagesParsed).toBe(10);
    });

    it('correctly pairs incoming with user replies', () => {
      const result = parseWhatsAppChat(buffer, 'Vineet');
      expect(result.pairs[0].incoming_message).toContain("I'm good! You?");
      expect(result.pairs[0].user_reply).toContain('Pretty good, just working on the project');
    });

    it('sets correct metadata on pairs', () => {
      const result = parseWhatsAppChat(buffer, 'Vineet');
      const pair = result.pairs[0];
      expect(pair.id).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
      );
      expect(pair.contact_name).toBe('Rishab');
      expect(pair.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
      expect(typeof pair.word_count_in).toBe('number');
      expect(typeof pair.word_count_out).toBe('number');
      expect(typeof pair.emoji_count).toBe('number');
      expect(pair.word_count_in).toBeGreaterThan(0);
      expect(pair.word_count_out).toBeGreaterThan(0);
    });
  });

  describe('group chat', () => {
    const buffer = readFixture('group-chat.txt');

    it('identifies the primary contact (most frequent non-user)', () => {
      const result = parseWhatsAppChat(buffer, 'Vineet');
      expect(result.contactName).toBe('Daksh');
    });

    it('extracts pairs between user and primary contact', () => {
      const result = parseWhatsAppChat(buffer, 'Vineet');
      expect(result.pairs.length).toBeGreaterThan(0);
      for (const pair of result.pairs) {
        expect(pair.contact_name).toBe('Daksh');
      }
    });
  });

  describe('media-heavy chat', () => {
    const buffer = readFixture('media-heavy.txt');

    it('skips media and deleted messages', () => {
      const result = parseWhatsAppChat(buffer, 'Vineet');
      expect(result.pairs.length).toBeGreaterThan(0);
      for (const pair of result.pairs) {
        expect(pair.incoming_message).not.toContain('Media omitted');
        expect(pair.incoming_message).not.toContain('This message was deleted');
        expect(pair.user_reply).not.toContain('Media omitted');
      }
    });

    it('counts emojis correctly', () => {
      const result = parseWhatsAppChat(buffer, 'Vineet');
      const emojiReplies = result.pairs.filter((p) => p.emoji_count > 0);
      expect(emojiReplies.length).toBeGreaterThan(0);
    });
  });

  describe('error handling', () => {
    it('throws when user name is not found', () => {
      const buffer = readFixture('simple-chat.txt');
      expect(() => parseWhatsAppChat(buffer, 'NonexistentPerson')).toThrow(
        'not found in chat'
      );
    });

    it('throws on empty buffer', () => {
      expect(() => parseWhatsAppChat(Buffer.from(''), 'Vineet')).toThrow();
    });
  });
});
