import express from 'express';
import { nanoid } from 'nanoid';
import Url from '../models/url.js';

const router = express.Router();
const BASE_URL = process.env.BASE_URL;

// POST /shorten
router.post('/shorten', async (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) return res.status(400).json({ error: "originalUrl is required" });

  const shortId = nanoid(6);
  const newUrl = new Url({ originalUrl, shortId });

  await newUrl.save();

  res.status(201).json({
    originalUrl,
    shortUrl: `${BASE_URL}/${shortId}`,
  });
});

// GET /:shortId
router.get('/:shortId', async (req, res) => {
  const { shortId } = req.params;
  const foundUrl = await Url.findOne({ shortId });

  if (foundUrl) {
    return res.redirect(foundUrl.originalUrl);
  }

  res.status(404).json({ message: 'Short URL not found' });
});

export default router;
// This code defines the URL shortening routes for the Express application.
// It includes a POST route to create a shortened URL and a GET route to redirect to the original URL based on the short ID.
// The POST route generates a unique short ID using the nanoid library, saves the original URL      and short ID to the database, and returns the shortened URL.
// The GET route retrieves the original URL from the database using the short ID and redirects the user to the original URL if found, or returns a 404 error if not found.
// The BASE_URL is used to construct the full shortened URL, which is expected to be set in the environment variables.
// The code uses Mongoose for database interactions and assumes that the Url model is defined in a separate file (`../models/Url.js`).
// The router is exported for use in the main application file, allowing the routes to be mounted in the Express app.
// The code is structured to handle URL shortening functionality in a clean and modular way, making it easy to maintain and extend in the future.
