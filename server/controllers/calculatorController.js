const express = require('express');
const math = require('mathjs');
const router = express.Router();

router.post('/calculate', (req, res) => {
  try {
    const { expression } = req.body;
    
    if (!expression || typeof expression !== 'string') {
      return res.status(400).json({ error: 'Invalid expression provided' });
    }

    const result = math.evaluate(expression);
    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: 'Error in calculation', details: error.message });
  }
});

module.exports = router;