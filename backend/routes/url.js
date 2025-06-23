const express = require('express');
const crypto = require('crypto');

const router = express.Router();
const urlDatabase = {};

// Function to generate random short code
function generateShortCode() {
    return crypto.randomBytes(4).toString('hex');
}



router.get('/', (req, res) => {
  res.send('Welcome to URL Shortener API');
});

router.post('/', (req, res) => {
    const { url } = req.body;
    if (!url || !/^https?:\/\/.+/i.test(url)) {
        return res.status(400).json({ error: 'Invalid URL' });
    }
    const code = generateShortCode();
    urlDatabase[code] = url;
    res.json({ shortUrl: `http://localhost:3000/${code}` });
});

// GET /:code => Redirect to original URL
router.get('/:code', (req, res) => {
    const { code } = req.params;
    const originalUrl = urlDatabase[code];
    if (originalUrl) {
        res.redirect(originalUrl);
    } else {
        res.status(404).json({ error: 'URL not found' });
    }
});

module.exports = router;
