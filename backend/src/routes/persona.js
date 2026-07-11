import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { ingestPairs } from '../brain/index.js';
import { buildToneProfile } from '../brain/promptBuilder.js';
import { createSession } from '../store/sessionStore.js';
import { PREDEFINED_PERSONAS } from '../brain/personas.js';
import Persona from '../models/Persona.js';
import { requireAuth, optionalAuth } from '../middleware/auth.js';

const router = Router();

// GET /api/persona -> List available personas with DB stats
router.get('/', optionalAuth, async (req, res, next) => {
  try {
    // Only fetch predefined personas (exclude custom ones starting with @custom-)
    const personas = await Persona.find({ persona_id: { $not: /^@custom-/ } }).lean();
    
    // Map to response format
    const formatted = personas.map(p => {
      let isLiked = false;
      if (req.user) {
        isLiked = p.liked_by.some(userId => userId.toString() === req.user.id);
      }
      
      return {
        id: p.persona_id,
        name: p.name,
        category: p.category,
        description: p.description,
        avatar: p.avatar,
        chat_count: p.chat_count,
        likes_count: p.likes_count,
        is_liked: isLiked,
      };
    });

    res.status(200).json({ success: true, personas: formatted });
  } catch (err) {
    next(err);
  }
});

// GET /api/persona/bookmarks -> List bookmarked personas for the user
router.get('/bookmarks', requireAuth, async (req, res, next) => {
  try {
    const personas = await Persona.find({ liked_by: req.user.id }).lean();
    
    const formatted = personas.map(p => ({
      id: p.persona_id,
      name: p.name,
      description: p.description,
      avatar: p.avatar,
      chat_count: p.chat_count,
      likes_count: p.likes_count,
      is_liked: true,
    }));

    res.status(200).json({ success: true, personas: formatted });
  } catch (err) {
    next(err);
  }
});

// POST /api/persona/:id/bookmark -> Toggle bookmark for a persona
router.post('/:id/bookmark', requireAuth, async (req, res, next) => {
  try {
    const personaId = req.params.id;
    const persona = await Persona.findOne({ persona_id: personaId });

    if (!persona) {
      return res.status(404).json({ success: false, error: 'Persona not found' });
    }

    const userId = req.user.id;
    const hasLiked = persona.liked_by.some(id => id.toString() === userId);

    if (hasLiked) {
      persona.liked_by = persona.liked_by.filter(id => id.toString() !== userId);
      persona.likes_count = Math.max(0, persona.likes_count - 1);
    } else {
      persona.liked_by.push(userId);
      persona.likes_count += 1;
    }

    await persona.save();

    res.status(200).json({
      success: true,
      is_liked: !hasLiked,
      likes_count: persona.likes_count
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/persona/:id -> Load a predefined persona session
router.post('/:id', optionalAuth, async (req, res, next) => {
  try {
    const personaId = req.params.id;
    const staticPersona = PREDEFINED_PERSONAS[personaId];

    if (!staticPersona) {
      const err = new Error('Persona not found');
      err.statusCode = 404;
      throw err;
    }

    // Increment global chat count in DB
    await Persona.updateOne({ persona_id: personaId }, { $inc: { chat_count: 1 } });

    // Prevent duplicate sessions for predefined personas
    if (req.user && req.user.id) {
      const SessionModel = (await import('../store/Session.js')).default;
      const existing = await SessionModel.findOne({ 
        user_id: req.user.id, 
        userName: staticPersona.name 
      }).lean();

      if (existing) {
        return res.status(200).json({
          success: true,
          session_id: existing.session_id,
          persona: staticPersona.name,
          total_pairs_extracted: existing.pairs ? existing.pairs.length : 0,
        });
      }
    }

    const sessionId = uuidv4();
    const pairs = staticPersona.pairs.map(p => ({ ...p, id: uuidv4() }));
    
    // Process exactly like a WhatsApp upload
    const toneProfile = buildToneProfile(pairs);
    toneProfile.description = staticPersona.description;
    
    await ingestPairs(sessionId, pairs);
    
    await createSession(sessionId, {
      contact_name: staticPersona.name,
      pairs,
      toneProfile,
      userName: staticPersona.name,
    }, req.user?.id); // Associate with user if logged in

    res.status(200).json({
      success: true,
      session_id: sessionId,
      persona: staticPersona.name,
      total_pairs_extracted: pairs.length,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
