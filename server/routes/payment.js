const express = require('express');
const router = express.Router();
const { leads } = require('../store');

let stripe;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
}

// ── POST /api/payment/create-checkout ────────────────────────────────────────
router.post('/create-checkout', async (req, res) => {
  if (!stripe) {
    return res.status(503).json({ error: 'Payment processing is not configured. Contact moonravendigital@gmail.com to reserve your project.' });
  }

  const { amount, description, customerEmail, serviceName, sessionId } = req.body;

  if (!amount || amount < 50) {
    return res.status(400).json({ error: 'Invalid deposit amount' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Generated Moon — ${serviceName || 'AI Project'} Deposit`,
              description: description || 'Project deposit to reserve your slot with Claire Lindstrom',
              images: [],
            },
            unit_amount: Math.round(amount * 100), // amount in dollars → cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: customerEmail || undefined,
      success_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/?payment=cancelled`,
      metadata: {
        gmSessionId: sessionId || '',
        serviceName: serviceName || '',
      },
    });

    res.json({ url: session.url, checkoutSessionId: session.id });
  } catch (err) {
    console.error('[payment] Stripe error:', err.message);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// ── POST /api/payment/webhook ─────────────────────────────────────────────────
// Register raw body parser in server/index.js BEFORE calling this route
router.post('/webhook', async (req, res) => {
  if (!stripe) return res.sendStatus(200);

  const sig = req.headers['stripe-signature'];
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, secret);
  } catch (err) {
    console.error('[webhook] Signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const gmSessionId = session.metadata?.gmSessionId;

    // Mark lead as deposit paid
    const lead = leads.find((l) => l.sessionId === gmSessionId);
    if (lead) {
      lead.depositPaid = true;
      lead.depositAmount = session.amount_total / 100;
      lead.stripeSessionId = session.id;
      console.log(`[webhook] Deposit received for lead: ${lead.id}`);
    }
  }

  res.sendStatus(200);
});

module.exports = router;
