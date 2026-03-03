/**
 * In-memory data store.
 * For production, replace with Supabase, MongoDB, or PostgreSQL.
 */

const sessions = new Map(); // sessionId -> session object
const leads = [];           // Array of captured lead objects

module.exports = { sessions, leads };
