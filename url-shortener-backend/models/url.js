import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const Url = mongoose.model("Url", urlSchema);
export default Url;
// This code defines a Mongoose schema and model for storing URLs in a MongoDB database.
// The `urlSchema` includes fields for the original URL, a unique short ID, and a timestamp for when the URL was created.
// The `Url` model is then exported for use in other parts of the application, such as in route handlers for creating and retrieving shortened URLs.
// The `originalUrl` field is required, and the `shortId` field must be unique to prevent conflicts.
// The `createdAt` field is automatically set to the current date and time when a new URL is created, allowing for easy tracking of when URLs were added to the database.
// This structure is commonly used in URL shortening services to efficiently manage and retrieve shortened URLs based on their unique identifiers.
