import { Router } from 'express';
import { getSession } from '../store/sessionStore.js';
import { buildRAGPrompt } from '../brain/index.js';
import { generateReply } from '../llm/provider.js';

const router = Router();

router.post('/', async (req, res, next) => {
  const startTime = Date.now();

  try {
    const { session_id, incoming_message, temperature } = req.body;

    if (!session_id) {
      const err = new Error('Missing session_id');
      err.statusCode = 400;
      throw err;
    }

    if (!incoming_message || !incoming_message.trim()) {
      const err = new Error('Missing incoming_message');
      err.statusCode = 400;
      throw err;
    }

    const session = getSession(session_id);
    if (!session) {
      const err = new Error('Session not found or expired');
      err.statusCode = 404;
      throw err;
    }

    const {
      systemPrompt,
      userPrompt,
      examples,
    } = await buildRAGPrompt(
      session_id,
      incoming_message,
      session.userName,
      session.pairs
    );

    const { reply, usage, fallback } = await generateReply(
      systemPrompt,
      userPrompt,
      temperature ?? 0.7
    );

    const latencyMs = Date.now() - startTime;

    res.status(200).json({
      success: true,
      reply,
      used_examples: examples.length,
      latency_ms: latencyMs,
      token_usage: usage,
      ...(fallback ? { fallback: true } : {}),
    });
  } catch (err) {
    next(err);
  }
});

export default router;
