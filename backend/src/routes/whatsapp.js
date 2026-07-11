import { Router } from 'express';
import { getWhatsAppStatus, toggleAutoPilot, initWhatsAppClient, getWhatsAppChats } from '../whatsapp/client.js';
import { optionalAuth } from '../middleware/auth.js';

const router = Router();

// GET /api/whatsapp/status
router.get('/status', optionalAuth, (req, res) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });
  const statusInfo = getWhatsAppStatus(userId);
  res.status(200).json({ success: true, ...statusInfo });
});

// POST /api/whatsapp/toggle
router.post('/toggle', optionalAuth, (req, res) => {
  const { enabled, sessionId, waitTimeMs, allowedChats } = req.body;
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  const updatedConfig = toggleAutoPilot(userId, enabled, sessionId, waitTimeMs, allowedChats);
  if (!updatedConfig) {
    return res.status(400).json({ error: 'WhatsApp client not initialized' });
  }

  res.json({ success: true, autoPilotConfig: updatedConfig });
});

// GET /api/whatsapp/chats
router.get('/chats', optionalAuth, async (req, res) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  const chats = await getWhatsAppChats(userId);
  res.json({ success: true, chats });
});

// POST /api/whatsapp/init
router.post('/init', optionalAuth, (req, res) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });
  
  initWhatsAppClient(userId);
  res.status(200).json({ success: true, message: 'Initialization started' });
});

export default router;
