const express = require('express');
const Book = require('../models/Book');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 10, sort = 'title', order = 'asc' } = req.query;
        const books = await Book.find()
            .sort({ [sort]: order === 'asc' ? 1 : -1 })
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit));
        const totalBooks = await Book.countDocuments();
        res.json({ totalBooks, books });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const book = new Book(req.body);
    try {
        const savedBook = await book.save();
        res.status(201).json(savedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Additional routes for update and delete can be added here

module.exports = router;
