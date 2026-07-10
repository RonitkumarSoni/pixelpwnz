import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import request from 'supertest';
import app from '../src/index.js';
import { createSession, getSession, clearAll, stopCleanup } from '../src/store/sessionStore.js';

describe('POST /api/chat', () => {
  beforeEach(() => {
    clearAll();
    createSession('test-session-1', {
      contact_name: 'Rishab',
      userName: 'Vineet',
      toneProfile: { avgReplyLength: 5, emojiFrequency: 0.1, formalityLevel: 'Medium' },
      pairs: [{ word_count_out: 5, user_reply: 'Hello', emoji_count: 0 }],
    });
  });

  afterAll(() => {
    stopCleanup();
  });

  it('returns 400 when session_id is missing', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send({ incoming_message: 'Hello' });

    expect(res.status).toBe(400);
    expect(res.body.error).toContain('session_id');
  });

  it('returns 400 when incoming_message is missing', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send({ session_id: 'test-session-1' });

    expect(res.status).toBe(400);
    expect(res.body.error).toContain('incoming_message');
  });

  it('returns 404 for invalid session', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send({ session_id: 'nonexistent', incoming_message: 'Hello' });

    expect(res.status).toBe(404);
    expect(res.body.error).toContain('not found');
  });
});

describe('DELETE /api/session/:sessionId', () => {
  beforeEach(() => {
    clearAll();
    createSession('del-test', {
      contact_name: 'Test',
      userName: 'User',
      toneProfile: { avgReplyLength: 3, emojiFrequency: 0, formalityLevel: 'Medium' },
      pairs: [],
    });
  });

  afterAll(() => {
    stopCleanup();
  });

  it('returns 204 on successful deletion', async () => {
    const res = await request(app).delete('/api/session/del-test');
    expect(res.status).toBe(204);
    expect(getSession('del-test')).toBeNull();
  });

  it('returns 204 even for non-existent sessions', async () => {
    const res = await request(app).delete('/api/session/nonexistent');
    expect(res.status).toBe(204);
  });
});

describe('GET /api/stats/:sessionId', () => {
  beforeEach(() => {
    clearAll();
  });

  afterAll(() => {
    stopCleanup();
  });

  it('returns session_exists: false for invalid session', async () => {
    const res = await request(app).get('/api/stats/nonexistent');
    expect(res.status).toBe(200);
    expect(res.body.session_exists).toBe(false);
  });

  it('returns stats for valid session', async () => {
    createSession('stats-test', {
      contact_name: 'Rishab',
      userName: 'Vineet',
      toneProfile: { avgReplyLength: 4, emojiFrequency: 0.2, formalityLevel: 'Medium' },
      pairs: [
        { word_count_out: 5, user_reply: 'Hello', emoji_count: 1 },
        { word_count_out: 3, user_reply: 'Ok', emoji_count: 0 },
      ],
    });

    const res = await request(app).get('/api/stats/stats-test');
    expect(res.status).toBe(200);
    expect(res.body.session_exists).toBe(true);
    expect(res.body.total_pairs).toBe(2);
    expect(res.body.contact_name).toBe('Rishab');
    expect(res.body.avg_reply_length).toBe(4.0);
    expect(res.body.emoji_frequency).toBe(0.5);
  });
});
