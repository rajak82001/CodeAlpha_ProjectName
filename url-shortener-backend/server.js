import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import urlRoutes from './routes/urlRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/', urlRoutes);

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
// This code sets up an Express server for a URL shortening service.
// It imports necessary modules, including Express, Mongoose for MongoDB interactions, and dotenv for environment variable management.
// The server listens for incoming requests on a specified port, defaulting to 5000 if not set in the environment variables.
// It connects to a MongoDB database using a connection string stored in an environment variable (`MONGO_URI`).
// The server uses JSON middleware to parse incoming request bodies and mounts the URL routes defined in `./routes/urlRoutes.js`.
// The connection to MongoDB is logged to the console, indicating whether the connection was successful or if there was an error.
// The server is structured to handle URL shortening functionality, allowing users to create shortened URLs and redirect to the original URLs based on short IDs.