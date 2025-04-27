import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Import Book model (adjust path as needed)
import { Book } from "../models/bookModel.js";

// Get MongoDB URI from environment
const mongoUri = process.env.MONGODB_URL || process.env.MONGO_URI;
if (!mongoUri) {
  console.error("MongoDB URI not set in environment variables.");
  process.exit(1);
}

async function importBooks() {
  try {
    // Path to books.json in the same directory as this script
    const booksPath = path.join(__dirname, "books.json");
    if (!fs.existsSync(booksPath)) {
      console.error(`books.json not found at ${booksPath}`);
      process.exit(1);
    }

    // Read and parse books.json
    const booksData = JSON.parse(fs.readFileSync(booksPath, "utf-8"));

    // Connect to MongoDB
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 30000,
      connectTimeoutMS: 30000,
    });
    console.log("Connected to MongoDB");

    // Optionally clear existing books
    // await Book.deleteMany({});

    // Insert books
    await Book.insertMany(booksData);

    console.log("Books imported successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error importing books:", error);
    process.exit(1);
  }
}

importBooks();
