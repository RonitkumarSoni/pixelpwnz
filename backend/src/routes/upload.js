import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import upload from '../middleware/upload.js';
import { parseWhatsAppChat } from '../parser/index.js';
import { ingestPairs } from '../brain/index.js';
import { buildToneProfile } from '../brain/promptBuilder.js';
import { createSession } from '../store/sessionStore.js';

const router = Router();

router.post('/', upload.single('chatFile'), async (req, res, next) => {
  try {
    if (!req.file) {
      const err = new Error('No file uploaded');
      err.statusCode = 400;
      throw err;
    }

    const userName = req.body.user_name?.trim();
    if (!userName) {
      const err = new Error('Missing user_name field');
      err.statusCode = 400;
      throw err;
    }

    const { contactName, pairs: parsedPairs, totalMessagesParsed } = parseWhatsAppChat(
      req.file.buffer,
      userName
    );

    // Limit to 750 pairs to safely process a larger chunk of the conversation
    // We slice the last 750 pairs to preserve the most recent part of the conversation
    const pairs = parsedPairs.slice(-750);

    const sessionId = uuidv4();

    const toneProfile = buildToneProfile(pairs);

    await ingestPairs(sessionId, pairs);

    createSession(sessionId, {
      contact_name: contactName,
      pairs,
      toneProfile,
      userName,
    });

    res.status(200).json({
      success: true,
      session_id: sessionId,
      user_name: userName,
      contact_name: contactName,
      total_pairs_extracted: pairs.length,
      pair_count: pairs.length,
      total_messages_parsed: totalMessagesParsed,
      estimated_generation_time_ms: Math.round(pairs.length * 3.5),
    });
  } catch (err) {
    next(err);
  }
});

export default router;
