"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const QuoteRequest_1 = __importDefault(require("../models/QuoteRequest"));
const router = express_1.default.Router();
// GET all quotes
router.get('/', async (req, res) => {
    try {
        const quotes = await QuoteRequest_1.default.find().sort({ createdAt: -1 });
        res.json(quotes);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching quote requests' });
    }
});
// POST new quote
router.post('/', async (req, res) => {
    try {
        const newQuote = new QuoteRequest_1.default(req.body);
        await newQuote.save();
        res.status(201).json(newQuote);
    }
    catch (error) {
        console.error('Error creating quote:', error);
        res.status(400).json({ message: 'Error creating quote request' });
    }
});
exports.default = router;
