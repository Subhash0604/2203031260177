const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors()); // Optional: Needed if using a separate frontend like React
app.use(express.json());

// Routes
const urlRoutes = require('./routes/url');
app.use('/', urlRoutes);

// Serve static frontend (optional if you're using React separately)
app.use(express.static(path.join(__dirname, '../frontend')));

// Start server
app.listen(PORT, () => {
    console.log(`URL Shortener running at http://localhost:${PORT}`);
});
