import config from '../config.js';

const sessions = new Map();
let cleanupInterval = null;

/**
 * Create a new user session.
 * @param {string} sessionId
 * @param {object} data - session data (contact_name, pairs, toneProfile, etc.)
 */
export function createSession(sessionId, data) {
  sessions.set(sessionId, {
    session_id: sessionId,
    ...data,
    created_at: Date.now(),
  });
}

/**
 * Retrieve a session if it exists and has not expired.
 * @param {string} sessionId
 * @returns {object|null}
 */
export function getSession(sessionId) {
  const session = sessions.get(sessionId);
  if (!session) return null;

  const age = (Date.now() - session.created_at) / 1000;
  if (age > config.session.ttl) {
    sessions.delete(sessionId);
    return null;
  }

  return session;
}

/**
 * Delete a session.
 * @param {string} sessionId
 * @returns {boolean} true if the session existed
 */
export function deleteSession(sessionId) {
  return sessions.delete(sessionId);
}

/**
 * Start periodic cleanup of expired sessions.
 */
export function startCleanup() {
  if (cleanupInterval) return;
  cleanupInterval = setInterval(() => {
    const now = Date.now();
    for (const [id, session] of sessions) {
      const age = (now - session.created_at) / 1000;
      if (age > config.session.ttl) {
        sessions.delete(id);
      }
    }
  }, 5 * 60 * 1000); // Every 5 minutes
  cleanupInterval.unref();
}

/**
 * Stop the cleanup interval (for tests).
 */
export function stopCleanup() {
  if (cleanupInterval) {
    clearInterval(cleanupInterval);
    cleanupInterval = null;
  }
}

/**
 * Clear all sessions (for tests).
 */
export function clearAll() {
  sessions.clear();
}
