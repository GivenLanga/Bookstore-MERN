import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Backbutton from "../components/Backbutton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useSnackbar } from "notistack";

function CreateBooks() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [ISBN, setISBN] = useState("");
  const [genre, setGenre] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [onSale, setOnSale] = useState(false);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear: Number(publishYear),
      ISBN,
      genre,
      price: Number(price),
      stock: Number(stock),
      onSale,
      image,
      description, // add description
    };
    setLoading(true);
    axios
      .post("http://localhost:3000/books", data)
      .then((/* response */) => {
        setLoading(false);
        enqueueSnackbar("Book created successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        /* alert("Error creating book,check console"); */
        enqueueSnackbar("Error creating book", { variant: "error" });

        console.log(error);
      });
  };
  return (
    <div
      className="min-h-screen flex justify-center items-center"
      style={{
        background: "linear-gradient(120deg, #f8f9fa 0%, #e6eaf3 100%)",
        padding: "40px 0",
      }}
    >
      <div
        className="w-full max-w-2xl mx-auto"
        style={{
          background: "#fff",
          borderRadius: 18,
          boxShadow:
            "0 4px 32px 0 rgba(60, 80, 180, 0.10), 0 2px 16px 0 #21212122",
          padding: "32px 28px",
        }}
      >
        <Backbutton />
        <h1 className="text-3xl font-bold mb-8" style={{ color: "#222" }}>
          Create Book
        </h1>
        {loading ? <Spinner /> : ""}
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-lg font-semibold text-blue-700 mr-4">
              Title
            </label>
            <input
              type="text"
              className="border-2 border-gray-300 px-4 py-2 w-full rounded-lg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="text-lg font-semibold text-blue-700 mr-4">
              Author
            </label>
            <input
              type="text"
              className="border-2 border-gray-300 px-4 py-2 w-full rounded-lg"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div>
            <label className="text-lg font-semibold text-blue-700 mr-4">
              Publish Year
            </label>
            <input
              type="number"
              className="border-2 border-gray-300 px-4 py-2 w-full rounded-lg"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
            />
          </div>
          <div>
            <label className="text-lg font-semibold text-blue-700 mr-4">
              ISBN
            </label>
            <input
              type="text"
              className="border-2 border-gray-300 px-4 py-2 w-full rounded-lg"
              value={ISBN}
              onChange={(e) => setISBN(e.target.value)}
            />
          </div>
          <div>
            <label className="text-lg font-semibold text-blue-700 mr-4">
              Genre
            </label>
            <input
              type="text"
              className="border-2 border-gray-300 px-4 py-2 w-full rounded-lg"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </div>
          <div>
            <label className="text-lg font-semibold text-blue-700 mr-4">
              Price
            </label>
            <input
              type="number"
              className="border-2 border-gray-300 px-4 py-2 w-full rounded-lg"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <label className="text-lg font-semibold text-blue-700 mr-4">
              Stock
            </label>
            <input
              type="number"
              className="border-2 border-gray-300 px-4 py-2 w-full rounded-lg"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
          <div>
            <label className="text-lg font-semibold text-blue-700 mr-4">
              On Sale
            </label>
            <input
              type="checkbox"
              checked={onSale}
              onChange={(e) => setOnSale(e.target.checked)}
              className="ml-2"
            />
          </div>
          <div>
            <label className="text-lg font-semibold text-blue-700 mr-4">
              Image URL
            </label>
            <input
              type="text"
              className="border-2 border-gray-300 px-4 py-2 w-full rounded-lg"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <div>
            <label className="text-lg font-semibold text-blue-700 mr-4">
              Description
            </label>
            <textarea
              className="border-2 border-gray-300 px-4 py-2 w-full rounded-lg"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          <button
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition-all duration-200 mt-4"
            onClick={handleSaveBook}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
export default CreateBooks;
