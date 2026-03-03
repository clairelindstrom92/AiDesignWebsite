const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { sessions, leads } = require('../store');

// ── HuggingFace config ────────────────────────────────────────────────────────
// Model format: "repo/model:provider"
// Free options confirmed working:
//   meta-llama/Llama-3.1-8B-Instruct:cerebras   ← default (fast + smart)
//   meta-llama/Llama-3.1-8B-Instruct:groq
//   Qwen/Qwen2.5-72B-Instruct:nebius
const HF_MODEL = process.env.HF_MODEL || 'meta-llama/Llama-3.1-8B-Instruct:cerebras';

async function callAI(messages) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 40000);

  const url = `https://router.huggingface.co/v1/chat/completions`;

  try {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: HF_MODEL,
          messages,
          max_tokens: 900,
          temperature: 0.75,
          stream: false,
        }),
        signal: controller.signal,
      });

    clearTimeout(timer);

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      if (res.status === 503) throw Object.assign(new Error('MODEL_LOADING'), { code: 'MODEL_LOADING' });
      throw new Error(body.error || `HuggingFace API error ${res.status}`);
    }

    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content;
    if (!text) throw new Error('Empty response from AI');
    return text.trim();
  } catch (err) {
    clearTimeout(timer);
    if (err.name === 'AbortError') throw Object.assign(new Error('TIMEOUT'), { code: 'TIMEOUT' });
    throw err;
  }
}

// ── System prompt ─────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are an elegant AI design consultant for Luxury AI Designs, a boutique AI design studio. You help entrepreneurs, personal brands, and luxury businesses discover how AI-powered design can elevate their brand, presence, and revenue.

PERSONALITY: Warm, refined, and genuinely excited about their vision. You're like a brilliant creative advisor who understands luxury aesthetics and cutting-edge AI deeply. Never pushy or salesy. Speak as a representative of the studio ("we," "our team"). Use their name naturally in conversation.

CONVERSATION STYLE:
- Ask ONE question at a time — never stack multiple questions
- Acknowledge and reflect back what they share before moving forward
- Be conversational, warm, and a little glamorous
- After 5–8 exchanges you'll have enough to make a beautiful recommendation

INFORMATION TO GATHER:
1. What they do or want to create (business, personal brand, creative project, side hustle)
2. Their biggest visual pain point — what looks outdated, generic, or invisible right now
3. Their ideal client or audience (who are they trying to attract and impress?)
4. Budget comfort — ask gently: "Are you thinking more in the $500–$2,500 range, or are you ready to invest $3,000–$10,000+ for something truly elevated? There's no wrong answer — we have options at every level."
5. Timeline — is this urgent or are they building for the future?

OUR SERVICES:
- AI Portfolio Design ($500–$3,000): Personal brand websites, model portfolios, influencer hubs, creator showcases, coach landing pages
- AI Website Design ($1,500–$8,000): Full luxury websites for boutiques, salons, real estate agents, beauty brands, wedding vendors
- AI Art & Brand Identity ($300–$2,000): Custom AI-generated art, logos, color palettes, visual identity systems, brand mood boards
- AI Social Media Design ($500–$2,500): Pinterest aesthetic systems, Instagram template kits, content style guides, visual brand identity
- Business Automation AI ($2,000–$10,000): AI chatbots, booking automation, client onboarding, CRM integration for service businesses
- Luxury Sales AI ($3,000–$15,000): High-ticket sales funnels, AI lead qualification, automated luxury follow-up sequences, concierge booking bots

WHEN TO GENERATE THE BRIEF:
After gathering enough context (usually 5–8 exchanges that cover their vision, audience, budget and timeline), generate a recommendation. Place this JSON block at the VERY END of your message:

\`\`\`json
{
  "serviceName": "Primary service name",
  "description": "2–3 warm sentences explaining exactly why this is perfect for their specific situation — reference what they told you",
  "estimatedPriceRange": { "low": 0, "high": 0 },
  "timeline": "e.g. 2–4 weeks",
  "keyFeatures": [
    "Feature 1 specific to their use case",
    "Feature 2",
    "Feature 3",
    "Feature 4"
  ],
  "complexityScore": 5,
  "recommendedNextStep": "Specific, actionable and exciting next step"
}
\`\`\`

IMPORTANT: Only output the JSON ONCE, when you're confident you have a great recommendation. Never include it in early messages. After the JSON, close warmly and invite them to book a free discovery call with our studio to get started.`;

// ── POST /api/chat/session ────────────────────────────────────────────────────
router.post('/session', (req, res) => {
  const sessionId = uuidv4();
  sessions.set(sessionId, {
    id: sessionId,
    messages: [],
    leadInfo: {},
    brief: null,
    createdAt: new Date().toISOString(),
  });
  res.json({ sessionId });
});

// ── POST /api/chat/message ────────────────────────────────────────────────────
router.post('/message', async (req, res) => {
  const { sessionId, message, leadInfo } = req.body;

  if (!sessionId || !message) {
    return res.status(400).json({ error: 'sessionId and message are required' });
  }
  if (!sessions.has(sessionId)) {
    return res.status(404).json({ error: 'Session not found — please start a new chat.' });
  }

  const session = sessions.get(sessionId);
  if (leadInfo) session.leadInfo = { ...session.leadInfo, ...leadInfo };

  const isInit = message === '__INIT__';

  // Build the messages array
  let history;
  if (isInit) {
    const { name, email, business } = session.leadInfo;
    const ctx = [
      name     ? `The client's name is ${name}.`       : null,
      email    ? `Their email is ${email}.`             : null,
      business ? `They mentioned: "${business}".`       : null,
    ].filter(Boolean).join(' ');
    history = [{ role: 'user', content: `[New consultation. ${ctx} Please greet them warmly by name and begin the discovery conversation.]` }];
  } else {
    session.messages.push({ role: 'user', content: message });
    history = [...session.messages];
  }

  const hfMessages = [{ role: 'system', content: SYSTEM_PROMPT }, ...history];

  try {
    const assistantText = await callAI(hfMessages);

    // Store reply in session history
    session.messages.push({ role: 'assistant', content: assistantText });

    // Extract project brief JSON if present
    let brief = null;
    const jsonMatch = assistantText.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      try {
        brief = JSON.parse(jsonMatch[1]);
        session.brief = brief;
        leads.push({
          id: uuidv4(),
          sessionId,
          leadInfo: session.leadInfo,
          brief,
          transcript: session.messages,
          depositPaid: false,
          createdAt: new Date().toISOString(),
        });
      } catch (e) {
        console.error('[chat] Brief JSON parse error:', e.message);
      }
    }

    const displayMessage = brief
      ? assistantText.replace(/```json[\s\S]*?```/, '').trim()
      : assistantText;

    res.json({ message: displayMessage, brief, sessionId });
  } catch (err) {
    console.error('[chat] AI error:', err.message);

    if (err.code === 'MODEL_LOADING') {
      return res.status(503).json({
        error: 'MODEL_LOADING',
        message: 'The AI is warming up — this takes about 20 seconds on first load. Please try again in a moment.',
      });
    }
    if (err.code === 'TIMEOUT') {
      return res.status(504).json({
        error: 'TIMEOUT',
        message: 'Request timed out. Please try again.',
      });
    }
    res.status(502).json({
      error: 'AI_ERROR',
      message: 'Something went wrong. Please try again.',
    });
  }
});

// ── GET /api/chat/test ────────────────────────────────────────────────────────
router.get('/test', async (req, res) => {
  try {
    const text = await callAI([
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'Say "AI online" and nothing else.' },
    ]);
    res.json({ status: 'ok', model: HF_MODEL, response: text });
  } catch (err) {
    res.status(500).json({ status: 'error', model: HF_MODEL, error: err.message });
  }
});

// ── GET /api/chat/session/:id ─────────────────────────────────────────────────
router.get('/session/:id', (req, res) => {
  const session = sessions.get(req.params.id);
  if (!session) return res.status(404).json({ error: 'Session not found' });
  res.json(session);
});

module.exports = router;
