const express = require('express');
const cors = require('cors');
const calculatorController = require('./controllers/calculatorController');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/calculator', calculatorController);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});