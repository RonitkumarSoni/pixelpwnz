import process from 'node:process';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import config from './config.js';
import errorHandler from './middleware/errorHandler.js';
import uploadRoutes from './routes/upload.js';
import chatRoutes from './routes/chat.js';
import statsRoutes from './routes/stats.js';
import sessionRoutes from './routes/session.js';
import { startCleanup } from './store/sessionStore.js';
import { cleanupOrphanedCollections } from './brain/chromaClient.js';

const app = express();

app.set('trust proxy', 1);

app.use(helmet());
app.use(cors({ origin: config.cors.origin }));
app.use(express.json());

const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  keyGenerator: (req) => req.body?.session_id || req.ip,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests. Try again shortly.' },
});

app.use('/api/upload', uploadRoutes);
app.use('/api/chat', chatLimiter, chatRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/session', sessionRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use(errorHandler);

startCleanup();

const isMainModule = process.argv[1] && (
  process.argv[1].endsWith('/src/index.js') ||
  process.argv[1].endsWith('src\\index.js') ||
  process.argv[1].includes('/backend/src/index.js')
);

if (isMainModule) {
  const server = app.listen(config.port, async () => {
    console.log(`[Signet] Server running on port ${config.port}`);
    await cleanupOrphanedCollections();
  });

  function shutdown() {
    console.log('\n[Signet] Shutting down...');
    server.close(() => {
      process.exit(0);
    });
    setTimeout(() => process.exit(1), 5000);
  }

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

export default app;
