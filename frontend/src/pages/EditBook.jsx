import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Backbutton from "../components/Backbutton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useSnackbar } from "notistack";
import SaveIcon from "@mui/icons-material/Save";

function EditBook() {
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
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/books/${id}`)
      .then((response) => {
        const book = response.data;
        setTitle(book.title);
        setAuthor(book.author);
        setPublishYear(book.publishYear);
        setISBN(book.ISBN || "");
        setGenre(book.genre || "");
        setPrice(book.price || "");
        setStock(book.stock || "");
        setOnSale(!!book.onSale);
        setImage(book.image || "");
        setDescription(book.description || "");
        setLoading(false);
      })
      .catch((error) => {
        alert("Error fetching book,check console");
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleEditBook = () => {
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
      description,
    };
    setLoading(true);
    axios
      .put(`http://localhost:3000/books/${id}`, data)
      .then((/* response */) => {
        setLoading(false);
        enqueueSnackbar("Book updated successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error updating book", { variant: "error" });
        f;
        /*  alert("Error creating book,check console"); */
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
          Edit Book
        </h1>
        {loading ? <Spinner /> : ""}
        <div className="flex flex-col gap-4">
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Title</label>
            <input
              type="text"
              className="border-2 border-gray-500 px-4 py-2 w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Author</label>
            <input
              type="text"
              className="border-2 border-gray-500 px-4 py-2 w-full"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Publish Year</label>
            <input
              type="number"
              className="border-2 border-gray-500 px-4 py-2 w-full"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">ISBN</label>
            <input
              type="text"
              className="border-2 border-gray-500 px-4 py-2 w-full"
              value={ISBN}
              onChange={(e) => setISBN(e.target.value)}
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Genre</label>
            <input
              type="text"
              className="border-2 border-gray-500 px-4 py-2 w-full"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Price</label>
            <input
              type="number"
              className="border-2 border-gray-500 px-4 py-2 w-full"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Stock</label>
            <input
              type="number"
              className="border-2 border-gray-500 px-4 py-2 w-full"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">On Sale</label>
            <input
              type="checkbox"
              checked={onSale}
              onChange={(e) => setOnSale(e.target.checked)}
              className="ml-2"
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Image URL</label>
            <input
              type="text"
              className="border-2 border-gray-500 px-4 py-2 w-full"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Description</label>
            <textarea
              className="border-2 border-gray-500 px-4 py-2 w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          <button
            className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition-all duration-200 mt-4"
            onClick={handleEditBook}
          >
            <SaveIcon />
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
export default EditBook;
