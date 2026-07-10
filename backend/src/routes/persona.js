import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { ingestPairs } from '../brain/index.js';
import { buildToneProfile } from '../brain/promptBuilder.js';
import { createSession } from '../store/sessionStore.js';
import { PREDEFINED_PERSONAS } from '../brain/personas.js';

const router = Router();

// GET /api/persona -> List available personas
router.get('/', (req, res) => {
  const personas = Object.keys(PREDEFINED_PERSONAS).map((key) => ({
    id: key,
    name: PREDEFINED_PERSONAS[key].name,
  }));
  res.status(200).json({ success: true, personas });
});

// POST /api/persona/:id -> Load a predefined persona session
router.post('/:id', async (req, res, next) => {
  try {
    const personaId = req.params.id;
    const persona = PREDEFINED_PERSONAS[personaId];

    if (!persona) {
      const err = new Error('Persona not found');
      err.statusCode = 404;
      throw err;
    }

    const sessionId = uuidv4();
    const pairs = persona.pairs.map(p => ({ ...p, id: uuidv4() }));
    
    // Process exactly like a WhatsApp upload
    const toneProfile = buildToneProfile(pairs);
    await ingestPairs(sessionId, pairs);
    
    createSession(sessionId, {
      contact_name: persona.name,
      pairs,
      toneProfile,
      userName: persona.name,
    });

    res.status(200).json({
      success: true,
      session_id: sessionId,
      persona: persona.name,
      total_pairs_extracted: pairs.length,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
