// routes/auth.js
const express = require('express');
const router = express.Router();

// POST /login (roută simplă mock de testare)
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Exemplu simplificat
  if (email === 'test@example.com' && password === 'password123') {
    return res.status(200).json({ message: 'Login successful', token: 'mock-token' });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
