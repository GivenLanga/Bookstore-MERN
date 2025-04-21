import express from "express";
import config from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send("Hello World");
});

app.post("/books", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({ message: "Please fill all fields" });
    }

    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await Book.create(newBook);
    return response.status(201).send({ message: "Book created", book });
  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: error.message });
  }
});

// Route to get a book by ID from the mongoDB database
app.get("/books/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);

    return response.status(200).json(book);
  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: error.message });
  }
});

// Route to get all books from the mongoDB database
app.get("/books", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: error.message });
  }
});

mongoose
  .connect(config.mongoDBURL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(config.PORT, () => {
      console.log(`Server is running on port ${config.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });
