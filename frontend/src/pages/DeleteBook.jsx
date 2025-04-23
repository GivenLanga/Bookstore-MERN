import React, { useState } from "react";
import Backbutton from "../components/Backbutton";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSnackbar } from "notistack";

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
    <div className="p-4">
      <Backbutton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <h1 className="text-3xl my-4">
          Are you sure you want to delete this book?
        </h1>
        <button
          className="bg-red-500 text-white m-1 w-full text-center py-2 rounded-lg hover:bg-red-600 disabled:bg-gray-400"
          onClick={handleDeleteBook}
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete Book"}
        </button>
      </div>
    </div>
  );
}

export default DeleteBook;
