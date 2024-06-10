const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const bookRoutes = require('./routes/books');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5500;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch(err => console.error(err));

app.use('/api/books', bookRoutes);
