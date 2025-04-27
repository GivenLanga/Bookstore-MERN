import React, { useState } from "react";
import Backbutton from "../components/Backbutton";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function DeleteBook() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    setError(""); // Clear any previous errors
    axios
      .delete(`http://localhost:3000/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book deleted successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error deleting book", { variant: "error" });
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
        className="w-full max-w-lg mx-auto"
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
          Delete Book
        </h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="flex flex-col border-2 border-sky-400 rounded-xl p-4 mx-auto bg-blue-50">
          <h1 className="text-2xl my-4 text-blue-800 font-semibold text-center">
            Are you sure you want to delete this book?
          </h1>
          <button
            className="flex items-center gap-2 bg-red-500 text-white m-1 w-full text-center py-2 rounded-lg hover:bg-red-600 disabled:bg-gray-400 font-semibold shadow transition-all duration-200"
            onClick={handleDeleteBook}
            disabled={loading}
          >
            <DeleteForeverIcon />
            {loading ? "Deleting..." : "Delete Book"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteBook;
