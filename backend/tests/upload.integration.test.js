import { describe, it, expect, afterEach, afterAll } from 'vitest';
import request from 'supertest';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import app from '../src/index.js';
import { clearAll, stopCleanup } from '../src/store/sessionStore.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const fixturesDir = join(__dirname, 'fixtures');

describe('POST /api/upload', () => {
  afterEach(() => {
    clearAll();
  });

  afterAll(() => {
    stopCleanup();
  });

  it('returns 400 when no file is attached', async () => {
    const res = await request(app)
      .post('/api/upload')
      .field('user_name', 'Vineet');

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('returns 400 when user_name is missing', async () => {
    const res = await request(app)
      .post('/api/upload')
      .attach('chatFile', Buffer.from('test'), 'test.txt');

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('returns 400 for non-txt files', async () => {
    const res = await request(app)
      .post('/api/upload')
      .field('user_name', 'Vineet')
      .attach('chatFile', Buffer.from('test'), 'test.pdf');

    expect(res.status).toBe(400);
    expect(res.body.error).toContain('.txt');
  });

  it('returns 422 for unparseable file', async () => {
    const res = await request(app)
      .post('/api/upload')
      .field('user_name', 'Vineet')
      .attach('chatFile', Buffer.from('not a valid whatsapp chat'), 'chat.txt');

    expect(res.status).toBe(422);
  });

  it('returns 400 when user name is not in the chat', async () => {
    const buffer = readFileSync(join(fixturesDir, 'simple-chat.txt'));

    const res = await request(app)
      .post('/api/upload')
      .field('user_name', 'UnknownPerson')
      .attach('chatFile', buffer, 'chat.txt');

    expect(res.status).toBe(400);
    expect(res.body.error).toContain('not found');
  });
});
