import { Router } from 'express';
import config from '../config.js';

const router = Router();

/**
 * GET /api/config
 * Return public (non-sensitive) configuration info for the client.
 * Never exposes API keys or secrets.
 */
router.get('/', (_req, res) => {
  const hasGroq = Boolean(config.groq?.apiKey);

  res.status(200).json({
    success: true,
    config: {
      llm_provider: 'ollama',
      llm_model: config.ollama.model,
      llm_fallback_provider: hasGroq ? 'groq' : null,
      llm_fallback_model: hasGroq ? config.groq.model : null,
      max_file_size_bytes: config.maxFileSize,
      max_file_size_mb: Math.round(config.maxFileSize / (1024 * 1024)),
      session_ttl_seconds: config.session.ttl,
      allowed_file_types: ['.txt'],
    },
  });
});

export default router;
