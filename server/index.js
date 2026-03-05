require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Stripe webhook needs raw body — register BEFORE json parser
app.use('/api/payment/webhook', express.raw({ type: 'application/json' }));

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json({ limit: '5mb' }));

// Routes
app.use('/api/chat',    require('./routes/chat'));
app.use('/api/payment', require('./routes/payment'));
app.use('/api/notify',  require('./routes/notify'));
app.use('/api/leads',   require('./routes/leads'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'OAI Solutions API', ts: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, _next) => {
  console.error('[error]', err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🔷 OAI Solutions server running on port ${PORT}`);
  console.log(`   Client URL: ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
});
