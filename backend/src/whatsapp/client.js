import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import { getSession } from '../store/sessionStore.js';
import { buildRAGPrompt } from '../brain/index.js';
import { generateReply } from '../llm/provider.js';

const userClients = new Map(); // userId -> { client, status, qrCodeStr, autoPilotConfig, waitTimers }

export const initWhatsAppClient = (userId) => {
  if (!userId) return;
  if (userClients.has(userId)) return;

  const state = {
    client: null,
    status: 'loading',
    qrCodeStr: null,
    autoPilotConfig: {
      enabled: false,
      sessionId: null,
      waitTimeMs: 30000,
      allowedChats: [],
    },
    waitTimers: new Map()
  };
  
  userClients.set(userId, state);
  console.log(`[WhatsApp] Initializing client for user ${userId}...`);

  const client = new Client({
    authStrategy: new LocalAuth({ clientId: userId }),
    puppeteer: {
      executablePath: 'C:\\Users\\ADMIN\\.cache\\puppeteer\\chrome\\win64-150.0.7871.24\\chrome-win64\\chrome.exe',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
  });
  state.client = client;

  client.on('qr', (qr) => {
    console.log(`[WhatsApp] QR code received for user ${userId}`);
    state.qrCodeStr = qr;
    state.status = 'qr';
  });

  client.on('authenticated', () => {
    console.log(`[WhatsApp] User ${userId} authenticated. Syncing chats...`);
    state.qrCodeStr = null;
    state.status = 'authenticating'; // immediate feedback
  });

  client.on('ready', () => {
    console.log(`[WhatsApp] Client is ready for user ${userId}!`);
    state.qrCodeStr = null;
    state.status = 'connected';
  });

  client.on('disconnected', (reason) => {
    console.log(`[WhatsApp] Client disconnected for user ${userId}:`, reason);
    state.status = 'disconnected';
    state.qrCodeStr = null;
    client.destroy().then(() => {
      userClients.delete(userId);
      initWhatsAppClient(userId);
    });
  });

  client.on('message', async (msg) => {
    if (msg.from.endsWith('@g.us')) {
      // It's a group message, ignore it completely (and quietly)
      return;
    }

    console.log(`[WhatsApp] Incoming message from: ${msg.from}, body: "${msg.body}" (User: ${userId})`);
    
    if (!state.autoPilotConfig.enabled) return;
    if (!state.autoPilotConfig.sessionId) return;
    if (msg.isStatus) return;
    if (!msg.from.endsWith('@c.us') && !msg.from.endsWith('@lid')) {
      console.log(`[WhatsApp] Ignoring non-direct message from ${msg.from}`);
      return; // Ignore any other non-direct messages
    }

    let isAllowed = false;
    if (state.autoPilotConfig.allowedChats && state.autoPilotConfig.allowedChats.includes(msg.from)) {
      isAllowed = true;
    } else {
      // Fallback: try to resolve the actual contact and check its number/@c.us ID
      try {
        const contact = await msg.getContact();
        const contactId = contact.id?._serialized;
        const numberId = contact.number ? `${contact.number}@c.us` : null;
        
        if ((contactId && state.autoPilotConfig.allowedChats.includes(contactId)) ||
            (numberId && state.autoPilotConfig.allowedChats.includes(numberId))) {
          isAllowed = true;
        }
      } catch (err) {
        console.error('[WhatsApp] Error resolving contact for lid check:', err.message);
      }
    }

    if (!isAllowed) {
      console.log(`[WhatsApp] Ignoring message from ${msg.from} (Not in allowedChats)`);
      return;
    }
    
    try {
      const chat = await msg.getChat();
      if (chat.isGroup) return;
    } catch (err) {
      console.error('[WhatsApp] Error fetching chat:', err.message);
      return; // Safe fallback: don't reply if we can't verify chat type
    }

    const contactId = msg.from;
    if (state.waitTimers.has(contactId)) {
      clearTimeout(state.waitTimers.get(contactId));
    }

    const timerId = setTimeout(() => {
      handleAutoPilotTimeout(userId, contactId, msg.body);
    }, state.autoPilotConfig.waitTimeMs);

    state.waitTimers.set(contactId, timerId);
    console.log(`[WhatsApp] Auto-Pilot timer started for ${contactId}. Waiting ${state.autoPilotConfig.waitTimeMs}ms...`);
  });

  client.on('message_create', async (msg) => {
    if (msg.fromMe) {
      const contactId = msg.to;
      if (state.waitTimers.has(contactId)) {
        clearTimeout(state.waitTimers.get(contactId));
        state.waitTimers.delete(contactId);
        console.log(`[WhatsApp] User manually replied to ${contactId}. Auto-Pilot timer cancelled.`);
      }
    }
  });

  client.initialize();
};

const handleAutoPilotTimeout = async (userId, contactId, incomingMessage) => {
  const state = userClients.get(userId);
  if (!state) return;
  
  try {
    state.waitTimers.delete(contactId);
    console.log(`[WhatsApp] Auto-Pilot taking over for ${contactId}! Generating reply...`);

    const sessionId = state.autoPilotConfig.sessionId;
    const session = await getSession(sessionId);

    if (!session) {
      console.warn('[WhatsApp] Auto-Pilot session not found!');
      return;
    }

    const { systemPrompt, userPrompt } = await buildRAGPrompt(
      sessionId,
      incomingMessage,
      session.userName,
      session.toneProfile ? { toneProfile: session.toneProfile } : { allPairs: session.pairs }
    );

    const { reply } = await generateReply(systemPrompt, userPrompt, 0.7);

    console.log(`[WhatsApp] Sending auto-reply to ${contactId}: ${reply}`);
    await state.client.sendMessage(contactId, reply);
    
  } catch (err) {
    console.error('[WhatsApp] Auto-Pilot generation failed:', err);
  }
};

export const getWhatsAppStatus = (userId) => {
  if (!userId) return { status: 'disconnected', qrCodeStr: null, autoPilotConfig: {} };
  const state = userClients.get(userId);
  if (!state) return { status: 'disconnected', qrCodeStr: null, autoPilotConfig: {} };
  
  return {
    status: state.status,
    qrCodeStr: state.qrCodeStr,
    autoPilotConfig: state.autoPilotConfig
  };
};

export const toggleAutoPilot = (userId, enabled, sessionId, waitTimeMs, allowedChats) => {
  const state = userClients.get(userId);
  if (!state) return null;
  
  state.autoPilotConfig = {
    enabled,
    sessionId: sessionId || state.autoPilotConfig.sessionId,
    waitTimeMs: waitTimeMs !== undefined ? waitTimeMs : state.autoPilotConfig.waitTimeMs,
    allowedChats: allowedChats || state.autoPilotConfig.allowedChats || []
  };
  return state.autoPilotConfig;
};

export const getWhatsAppChats = async (userId) => {
  const state = userClients.get(userId);
  if (!state || !state.client) return [];

  try {
    const [chats, contacts] = await Promise.all([
      state.client.getChats(),
      state.client.getContacts()
    ]);

    console.log(`[WhatsApp] Fetched ${chats.length} chats and ${contacts.length} contacts for user ${userId}`);

    const chatMap = new Map();

    // First add active chats (they have unread counts)
    chats
      .filter(c => !c.isGroup && (c.id._serialized.endsWith('@c.us') || c.id._serialized.endsWith('@lid')))
      .forEach(c => {
        chatMap.set(c.id._serialized, {
          id: c.id._serialized,
          name: c.name || c.id.user,
          unreadCount: c.unreadCount || 0
        });
      });

    // Debug some contacts
    console.log('[WhatsApp] Sample of 3 contacts:', contacts.slice(0, 3).map(c => ({ id: c.id._serialized, isMyContact: c.isMyContact, name: c.name, pushname: c.pushname })));

    // Then add all saved contacts that aren't already in the list
    contacts
      .filter(c => c.isMyContact && !c.isGroup && (c.id._serialized.endsWith('@c.us') || c.id._serialized.endsWith('@lid')))
      .forEach(c => {
        if (!chatMap.has(c.id._serialized)) {
          chatMap.set(c.id._serialized, {
            id: c.id._serialized,
            name: c.name || c.pushname || c.id.user,
            unreadCount: 0
          });
        }
      });

    // Deduplicate by name to prevent @lid and @c.us showing twice for the same person
    const uniqueNames = new Set();
    const deduplicatedChats = [];

    for (const chat of chatMap.values()) {
      if (!uniqueNames.has(chat.name)) {
        uniqueNames.add(chat.name);
        deduplicatedChats.push(chat);
      }
    }

    return deduplicatedChats
      .sort((a, b) => {
        if (b.unreadCount !== a.unreadCount) return b.unreadCount - a.unreadCount;
        const nameA = a.name || a.id || '';
        const nameB = b.name || b.id || '';
        return nameA.localeCompare(nameB);
      });
  } catch (err) {
    console.error(`[WhatsApp] Error getting chats for ${userId}:`, err.message);
    return [];
  }
};

// Graceful shutdown to prevent Chromium orphans
const cleanupClients = async () => {
  console.log('[WhatsApp] Shutting down all clients...');
  for (const [userId, state] of userClients.entries()) {
    if (state.client) {
      try {
        await state.client.destroy();
        console.log(`[WhatsApp] Destroyed client for ${userId}`);
      } catch (err) {
        console.error(`[WhatsApp] Error destroying client for ${userId}:`, err.message);
      }
    }
  }
  process.exit(0);
};

process.on('SIGINT', cleanupClients);
process.on('SIGTERM', cleanupClients);
process.on('SIGUSR2', cleanupClients);
