const BASE = import.meta.env.VITE_API_URL || '/api';

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `Request failed: ${res.status}`);
  return data;
}

// Chat
export const createSession = () => request('/chat/session', { method: 'POST' });

export const sendMessage = (sessionId, message, leadInfo) =>
  request('/chat/message', {
    method: 'POST',
    body: { sessionId, message, leadInfo },
  });

// Payment
export const createCheckout = ({ amount, description, customerEmail, serviceName, sessionId }) =>
  request('/payment/create-checkout', {
    method: 'POST',
    body: { amount, description, customerEmail, serviceName, sessionId },
  });

// Notify
export const notifyLead = ({ leadInfo, transcript, brief, sessionId }) =>
  request('/notify/lead', {
    method: 'POST',
    body: { leadInfo, transcript, brief, sessionId },
  });

export const notifyDirect = ({ leadInfo, transcript, sessionId }) =>
  request('/notify/direct', {
    method: 'POST',
    body: { leadInfo, transcript, sessionId },
  });
