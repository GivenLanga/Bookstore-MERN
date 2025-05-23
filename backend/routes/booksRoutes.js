import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();
router.post("/", async (request, response) => {
  try {
    const {
      title,
      author,
      publishYear,
      ISBN,
      genre,
      price,
      stock,
      onSale,
      image,
    } = request.body;

    if (
      !title ||
      !author ||
      !publishYear ||
      !ISBN ||
      !genre ||
      price === undefined ||
      stock === undefined
    ) {
      return response.status(400).send({ message: "Please fill all fields" });
    }

    const newBook = {
      title,
      author,
      publishYear,
      ISBN,
      genre,
      price,
      stock,
      onSale: !!onSale,
      image: image || "",
    };

    const book = await Book.create(newBook);
    return response.status(201).send({ message: "Book created", book });
  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: error.message });
  }
});

// Route to get a book by ID from the mongoDB database
router.get("/:id", async (request, response) => {
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
router.get("/", async (request, response) => {
  try {
    const { search } = request.query;
    const query = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { author: { $regex: search, $options: "i" } },
          ],
        }
      : {};
    const books = await Book.find(query);
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: error.message });
  }
});

// Route to update a book by ID in the mongoDB database

router.put("/:id", async (request, response) => {
  try {
    const {
      title,
      author,
      publishYear,
      ISBN,
      genre,
      price,
      stock,
      onSale,
      image,
    } = request.body;

    if (
      !title ||
      !author ||
      !publishYear ||
      !ISBN ||
      !genre ||
      price === undefined ||
      stock === undefined
    ) {
      return response.status(400).send({ message: "Please fill all fields" });
    }

    const { id } = request.params;
    const updateData = {
      title,
      author,
      publishYear,
      ISBN,
      genre,
      price,
      stock,
      onSale: !!onSale,
      image: image || "",
    };

    const result = await Book.findByIdAndUpdate(id, updateData);

    if (!result) {
      return response.status(404).send({ message: "Book not found" });
    }
    return response.status(200).send({ message: "Book updated" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to delete a book by ID in the mongoDB database
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).send({ message: "Book not found" });
    }
    return response.status(200).send({ message: "Book deleted" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
// This code defines a set of routes for managing books in a MongoDB database using Express.js.
// It includes routes for creating, retrieving, updating, and deleting books.
