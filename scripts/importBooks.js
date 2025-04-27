import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get __filename and __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../backend/.env") });

import { Book } from "../backend/models/bookModel.js";

// Use the correct environment variable name as in your .env file
const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URL;
if (!mongoUri) {
  throw new Error(
    "Neither MONGO_URI nor MONGODB_URL environment variable is set."
  );
}

async function importBooks() {
  try {
    // Update the JSON file path to match your actual file, e.g., books.json in the project root
    const jsonPath = path.join(__dirname, "../books.json"); // <-- update this if your file is named differently
    if (!fs.existsSync(jsonPath)) {
      console.error(`JSON file not found at ${jsonPath}`);
      console.error(
        "Please make sure books.json exists in your project root and contains your book data."
      );
      console.error(
        "Example: /home/creepydoll/Desktop/book-store-mern/books.json"
      );
      process.exit(1);
    }

    // Read the JSON file
    const booksData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

    // Connect to MongoDB with increased timeout
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 30000,
      connectTimeoutMS: 30000,
    });
    console.log("Connected to MongoDB");

    // Wait for connection to be ready
    await mongoose.connection.db.admin().ping();

    // Optionally clear existing books:
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
