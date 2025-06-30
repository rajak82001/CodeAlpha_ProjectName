const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');

// POST a new registration
router.post('/', async (req, res) => {
  const { eventId, email } = req.body;
  try {
    const alreadyRegistered = await Registration.findOne({ eventId, email });
    if (alreadyRegistered) {
      return res.status(400).json({ message: 'Already registered for this event.' });
    }
    const registration = new Registration(req.body);
    const saved = await registration.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;