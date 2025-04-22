import React, { useState } from "react";
import Backbutton from "../components/Backbutton";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function DeleteBook() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:3000/books/${id}`)
      .then((/* response */) => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        alert("Error deleting book,check console");
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div className="p-4">
      <Backbutton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w[ 600px ] p-4 mx-auto">
        <h1 className="text-3xl my-4">
          Are you sure you want to delete this book?
        </h1>
        <button
          className="bg-red-500 text-white m-1 w-full text-center py-2 rounded-lg hover:bg-red-600"
          onClick={handleDeleteBook}
        >
          Delete Book
        </button>
      </div>
    </div>
  );
}

export default DeleteBook;
