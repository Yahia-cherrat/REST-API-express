const express = require('express');
const users = require('./routes/users');
const path = require('path');
const logger = require('./middleware/logger');
const err = require('./middleware/error');

require('dotenv').config(); // This line to load .env variables

const port = process.env.PORT || 3000;

const app = express();

// Middleware to parse JSON and URL encoded data
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Logger middleware
app.use(logger);

// Setup a static folder using a static middleware
// app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/users', users);

// Error handlers
app.use(err);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
