const express = require('express');
const router = express.Router();
const { leads } = require('../store');

// GET /api/leads — Returns all captured leads (admin view)
// In production, protect this with an API key or auth middleware
router.get('/', (req, res) => {
  // Return in reverse-chronological order
  res.json([...leads].reverse());
});

// GET /api/leads/:id — Single lead detail
router.get('/:id', (req, res) => {
  const lead = leads.find((l) => l.id === req.params.id);
  if (!lead) return res.status(404).json({ error: 'Lead not found' });
  res.json(lead);
});

module.exports = router;
