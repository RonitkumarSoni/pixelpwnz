import { v4 as uuidv4 } from 'uuid';
import { TIMESTAMP_HEADER, SENDER_LINE, SYSTEM_MESSAGE, EMOJI } from './regex.js';

function countWords(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function countEmojis(text) {
  const matches = text.match(EMOJI);
  return matches ? matches.length : 0;
}

function parseTimestamp(dateStr, timeStr) {
  const [day, month, year] = dateStr.split('/').map(Number);
  
  // Replace narrow no-break space (\u202F) or standard space with a normal space
  const normalizedTime = timeStr.replace(/\u202F/g, ' ').trim();
  const parts = normalizedTime.split(' ');
  const hms = parts[0];
  const meridiem = parts[1];

  const hmsParts = hms.split(':');
  let hours = parseInt(hmsParts[0], 10) || 0;
  const minutes = parseInt(hmsParts[1], 10) || 0;
  const seconds = parseInt(hmsParts[2], 10) || 0;

  if (meridiem?.toUpperCase() === 'PM' && hours !== 12) hours += 12;
  if (meridiem?.toUpperCase() === 'AM' && hours === 12) hours = 0;

  const fullYear = year < 100 ? 2000 + year : year;
  const date = new Date(fullYear, month - 1, day, hours, minutes, seconds);
  return date.toISOString();
}

function extractMessages(lines) {
  const messages = [];
  let current = null;

  for (const line of lines) {
    if (TIMESTAMP_HEADER.test(line)) {
      if (current) {
        messages.push(current);
      }

      const match = line.match(SENDER_LINE);
      if (!match) {
        current = null;
        continue;
      }

      const sender = match[1].trim();
      const messageText = match[2].trim();

      if (SYSTEM_MESSAGE.test(messageText)) {
        current = null;
        continue;
      }

      const tsMatch = line.match(TIMESTAMP_HEADER);
      const tsRaw = tsMatch[0].replace(/[\[\]]/g, '');
      const [dateStr, timeStr] = tsRaw.split(', ');

      current = {
        sender,
        message: messageText,
        timestamp: parseTimestamp(dateStr, timeStr),
      };
    } else if (current) {
      if (SYSTEM_MESSAGE.test(line.trim())) continue;
      current.message += ' ' + line.trim();
    }
  }

  if (current) {
    messages.push(current);
  }

  return messages;
}

function identifyContact(messages, userName) {
  const otherCounts = new Map();

  for (const msg of messages) {
    if (msg.sender.toLowerCase() !== userName.toLowerCase()) {
      otherCounts.set(msg.sender, (otherCounts.get(msg.sender) || 0) + 1);
    }
  }

  if (otherCounts.size === 0) return null;

  let topContact = null;
  let topCount = 0;
  for (const [contact, count] of otherCounts) {
    if (count > topCount) {
      topCount = count;
      topContact = contact;
    }
  }

  return topContact;
}

function buildPairs(messages, userName, contactName) {
  const pairs = [];
  let bufferedIncoming = null;

  for (const msg of messages) {
    const isUser = msg.sender.toLowerCase() === userName.toLowerCase();

    if (!isUser && msg.sender === contactName) {
      bufferedIncoming = msg;
    } else if (isUser && bufferedIncoming) {
      pairs.push({
        id: uuidv4(),
        incoming_message: bufferedIncoming.message,
        user_reply: msg.message,
        timestamp: msg.timestamp,
        contact_name: bufferedIncoming.sender,
        word_count_in: countWords(bufferedIncoming.message),
        word_count_out: countWords(msg.message),
        emoji_count: countEmojis(msg.message),
      });
      bufferedIncoming = null;
    }
  }

  return pairs;
}

/**
 * Parse a WhatsApp chat export buffer and return conversation pairs.
 * @param {Buffer} buffer - The file buffer containing WhatsApp export text
 * @param {string} userName - The user's name as it appears in the chat
 * @returns {{ contactName: string, pairs: ConversationPair[], totalMessagesParsed: number }}
 * @throws {Error} If the chat cannot be parsed or userName not found
 */
export function parseWhatsAppChat(buffer, userName) {
  const text = buffer.toString('utf-8').trim();
  if (!text) {
    const err = new Error('Empty file');
    err.statusCode = 422;
    throw err;
  }

  const lines = text.split('\n');

  const messages = extractMessages(lines);

  if (messages.length === 0) {
    const err = new Error('No valid WhatsApp messages found');
    err.statusCode = 422;
    throw err;
  }

  const contactName = identifyContact(messages, userName);
  if (!contactName) {
    const err = new Error(`User name "${userName}" not found in chat`);
    err.statusCode = 400;
    throw err;
  }

  const userExists = messages.some(
    (m) => m.sender.toLowerCase() === userName.toLowerCase()
  );
  if (!userExists) {
    const err = new Error(`User name "${userName}" not found in chat`);
    err.statusCode = 400;
    throw err;
  }

  const pairs = buildPairs(messages, userName, contactName);

  if (pairs.length === 0) {
    const err = new Error('No conversation pairs found between user and contact');
    err.statusCode = 422;
    throw err;
  }

  return {
    contactName,
    pairs,
    totalMessagesParsed: messages.length,
  };
}
