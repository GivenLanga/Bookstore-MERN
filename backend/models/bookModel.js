import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishYear: { type: Number, required: true },
    ISBN: { type: String, required: true },
    genre: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    onSale: { type: Boolean, default: false },
    image: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

export const Book = mongoose.model("Book", bookSchema);
