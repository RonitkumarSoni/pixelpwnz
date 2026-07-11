import { Router } from 'express';
import { deleteSession, getSession } from '../store/sessionStore.js';
import { deleteCollection } from '../brain/chromaClient.js';
import ChatMessage from '../models/ChatMessage.js';

const router = Router();

router.get('/:sessionId', async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    
    const session = await getSession(sessionId);
    if (!session) {
      return res.status(404).json({ success: false, error: 'Session not found' });
    }

    // Fetch chat history
    const messages = await ChatMessage.find({ session_id: sessionId })
      .sort({ createdAt: 1 })
      .lean();

    res.status(200).json({
      success: true,
      session: {
        session_id: session.session_id,
        contact_name: session.contact_name,
        userName: session.userName,
        pair_count: session.pairs ? session.pairs.length : 0,
        temperature: session.temperature
      },
      messages: messages.map(m => ({
        id: m._id,
        type: m.role,
        text: m.content,
        timestamp: new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }))
    });
  } catch (err) {
    next(err);
  }
});

router.delete('/:sessionId', async (req, res, next) => {
  try {
    const { sessionId } = req.params;

    await deleteSession(sessionId);

    try {
      await deleteCollection(sessionId);
    } catch {
      // Collection may not exist — safe to ignore
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;
