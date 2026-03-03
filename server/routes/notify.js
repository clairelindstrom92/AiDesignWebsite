const express = require('express');
const router = express.Router();

const EMAIL_TO = process.env.EMAIL_TO || 'moonravendigital@gmail.com';
const EMAIL_FROM = process.env.EMAIL_FROM || 'noreply@generatedmoon.com';
const CALENDLY = process.env.CALENDLY_LINK || 'https://calendly.com/generatedmoon';

let resend;
if (process.env.RESEND_API_KEY) {
  const { Resend } = require('resend');
  resend = new Resend(process.env.RESEND_API_KEY);
}

function formatTranscript(messages = []) {
  return messages
    .filter((m) => !m.content.startsWith('[New consultation'))
    .map((m) => `<p style="margin:8px 0"><strong style="color:${m.role === 'user' ? '#4fa3e0' : '#c9b99a'}">${m.role === 'user' ? '👤 Client' : '🌕 AI Consultant'}:</strong><br/>${m.content.replace(/\n/g, '<br/>')}</p>`)
    .join('<hr style="border-color:#333;margin:8px 0"/>');
}

function buildLeadEmailHtml({ leadInfo, brief, transcript, type = 'assessment' }) {
  const { name = 'Unknown', email = 'N/A', business = 'N/A' } = leadInfo || {};
  const isDeposit = type === 'deposit';

  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background:#07070d;font-family:Inter,sans-serif;color:#e8e4dd">
  <div style="max-width:680px;margin:0 auto;padding:32px 24px">

    <!-- Header -->
    <div style="text-align:center;margin-bottom:32px">
      <div style="font-size:36px;margin-bottom:8px">🌕</div>
      <h1 style="font-size:22px;font-weight:300;color:#e8e4dd;margin:0">Generated Moon</h1>
      <p style="color:#8a7a60;font-size:13px;margin:4px 0 0">AI Engineering Studio — Lead Notification</p>
    </div>

    <!-- Alert Banner -->
    <div style="background:${isDeposit ? 'rgba(79,163,224,0.15)' : 'rgba(201,185,154,0.1)'};border:1px solid ${isDeposit ? '#4fa3e0' : '#c9b99a'};border-radius:8px;padding:20px;margin-bottom:24px;text-align:center">
      <h2 style="margin:0 0 6px;font-size:20px;color:${isDeposit ? '#4fa3e0' : '#c9b99a'}">${isDeposit ? '💳 New Deposit Received!' : '✨ New Lead Assessment Complete'}</h2>
      <p style="margin:0;color:#e8e4dd;font-size:15px">${name} — ${brief?.serviceName || 'AI Consultation'}</p>
    </div>

    <!-- Client Info -->
    <div style="background:#111120;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:20px;margin-bottom:20px">
      <h3 style="color:#c9b99a;margin:0 0 14px;font-size:14px;text-transform:uppercase;letter-spacing:0.08em">Client Details</h3>
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="color:#8a7a60;padding:5px 0;width:120px;font-size:14px">Name</td><td style="color:#e8e4dd;font-size:14px">${name}</td></tr>
        <tr><td style="color:#8a7a60;padding:5px 0;font-size:14px">Email</td><td><a href="mailto:${email}" style="color:#4fa3e0;font-size:14px">${email}</a></td></tr>
        <tr><td style="color:#8a7a60;padding:5px 0;font-size:14px">Business</td><td style="color:#e8e4dd;font-size:14px">${business}</td></tr>
      </table>
    </div>

    ${brief ? `
    <!-- Project Brief -->
    <div style="background:#111120;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:20px;margin-bottom:20px">
      <h3 style="color:#c9b99a;margin:0 0 14px;font-size:14px;text-transform:uppercase;letter-spacing:0.08em">AI-Generated Project Brief</h3>
      <p style="margin:0 0 8px"><strong style="color:#e8e4dd">Service:</strong> <span style="color:#4fa3e0">${brief.serviceName}</span></p>
      <p style="margin:0 0 8px;font-size:14px;color:#c0bbB5">${brief.description}</p>
      <p style="margin:0 0 8px"><strong style="color:#e8e4dd">Price Range:</strong> $${(brief.estimatedPriceRange?.low || 0).toLocaleString()} – $${(brief.estimatedPriceRange?.high || 0).toLocaleString()}</p>
      <p style="margin:0 0 8px"><strong style="color:#e8e4dd">Timeline:</strong> ${brief.timeline}</p>
      <p style="margin:0 0 4px"><strong style="color:#e8e4dd">Key Features:</strong></p>
      <ul style="margin:4px 0 8px;padding-left:20px;color:#c0bbb5;font-size:14px">
        ${(brief.keyFeatures || []).map((f) => `<li style="margin:3px 0">${f}</li>`).join('')}
      </ul>
      <p style="margin:0"><strong style="color:#e8e4dd">Complexity Score:</strong> ${brief.complexityScore}/10</p>
    </div>
    ` : ''}

    <!-- CTA -->
    <div style="text-align:center;margin:28px 0">
      <a href="${CALENDLY}" style="display:inline-block;background:#4fa3e0;color:#fff;text-decoration:none;padding:14px 32px;border-radius:6px;font-size:15px;font-weight:500">📅 Schedule a Discovery Call</a>
      <p style="margin:12px 0 0;font-size:13px;color:#8a7a60">Reply to this email to reach the client directly: <a href="mailto:${email}" style="color:#4fa3e0">${email}</a></p>
    </div>

    ${transcript && transcript.length > 0 ? `
    <!-- Transcript -->
    <div style="background:#0d0d1a;border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:20px;margin-top:20px">
      <h3 style="color:#c9b99a;margin:0 0 14px;font-size:14px;text-transform:uppercase;letter-spacing:0.08em">Full Chat Transcript</h3>
      <div style="font-size:13px;line-height:1.6">${formatTranscript(transcript)}</div>
    </div>
    ` : ''}

    <!-- Footer -->
    <div style="text-align:center;margin-top:32px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.06)">
      <p style="color:#8a7a60;font-size:12px;margin:0">Generated Moon — AI Engineering Studio<br/>
      <a href="mailto:moonravendigital@gmail.com" style="color:#8a7a60">moonravendigital@gmail.com</a></p>
    </div>

  </div>
</body>
</html>`;
}

async function sendEmail(to, subject, html) {
  if (!resend) {
    console.log('\n[notify] ⚠️  No RESEND_API_KEY — logging email instead');
    console.log(`  TO: ${to}`);
    console.log(`  SUBJECT: ${subject}`);
    console.log('  (Set RESEND_API_KEY in server/.env to enable real emails)\n');
    return { success: true, simulated: true };
  }

  const result = await resend.emails.send({ from: EMAIL_FROM, to, subject, html });
  return { success: true, id: result?.data?.id };
}

// ── POST /api/notify/lead ─────────────────────────────────────────────────────
router.post('/lead', async (req, res) => {
  const { leadInfo, transcript, brief, sessionId } = req.body;
  const name = leadInfo?.name || 'Anonymous';
  const service = brief?.serviceName || 'AI Consultation';

  try {
    const result = await sendEmail(
      EMAIL_TO,
      `🌕 New Generated Moon Lead: ${name} — ${service}`,
      buildLeadEmailHtml({ leadInfo, brief, transcript })
    );
    res.json(result);
  } catch (err) {
    console.error('[notify/lead] Email error:', err.message);
    res.status(500).json({ error: 'Failed to send notification' });
  }
});

// ── POST /api/notify/direct ───────────────────────────────────────────────────
// "Talk to Claire Directly" button
router.post('/direct', async (req, res) => {
  const { leadInfo, transcript, sessionId } = req.body;
  const name = leadInfo?.name || 'A visitor';

  try {
    const result = await sendEmail(
      EMAIL_TO,
      `🌕 Direct Contact Request: ${name} wants to talk`,
      buildLeadEmailHtml({ leadInfo, brief: null, transcript, type: 'direct' })
    );
    res.json(result);
  } catch (err) {
    console.error('[notify/direct] Email error:', err.message);
    res.status(500).json({ error: 'Failed to send notification' });
  }
});

// ── POST /api/notify/deposit ──────────────────────────────────────────────────
router.post('/deposit', async (req, res) => {
  const { leadInfo, brief, amount } = req.body;
  const name = leadInfo?.name || 'A client';
  const service = brief?.serviceName || 'AI Project';

  try {
    const result = await sendEmail(
      EMAIL_TO,
      `🌕 💳 Deposit Received: ${name} — ${service} — $${amount}`,
      buildLeadEmailHtml({ leadInfo, brief, transcript: [], type: 'deposit' })
    );
    res.json(result);
  } catch (err) {
    console.error('[notify/deposit] Email error:', err.message);
    res.status(500).json({ error: 'Failed to send notification' });
  }
});

module.exports = router;
