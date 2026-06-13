import express from 'express';
import QuoteRequest from '../models/QuoteRequest';

const router = express.Router();

// GET all quotes
router.get('/', async (req, res) => {
  try {
    const quotes = await QuoteRequest.find().sort({ createdAt: -1 });
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quote requests' });
  }
});

// POST new quote
router.post('/', async (req, res) => {
  try {
    const newQuote = new QuoteRequest(req.body);
    await newQuote.save();
    res.status(201).json(newQuote);
  } catch (error) {
    console.error('Error creating quote:', error);
    res.status(400).json({ message: 'Error creating quote request' });
  }
});

export default router;
