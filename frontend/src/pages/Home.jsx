import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BookTable from "../home/BookTable";
import BookCard from "../home/BookCard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TableRowsIcon from "@mui/icons-material/TableRows";
import ViewModuleIcon from "@mui/icons-material/ViewModule";

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(120deg, #f8f9fa 0%, #e6eaf3 100%)",
        padding: "40px 0",
      }}
    >
      <div
        className="mx-auto"
        style={{
          maxWidth: 1100,
          background: "#fff",
          borderRadius: 18,
          boxShadow:
            "0 4px 32px 0 rgba(60, 80, 180, 0.10), 0 2px 16px 0 #21212122",
          padding: "32px 28px",
        }}
      >
        <div className="flex justify-between items-center mb-8">
          <h1
            className="text-4xl font-bold"
            style={{
              color: "#222",
              letterSpacing: "1px",
              marginBottom: 0,
            }}
          >
            Books List
          </h1>
          <Link to="/books/create">
            <AddCircleIcon
              className="text-blue-700"
              style={{ fontSize: 44, cursor: "pointer" }}
              titleAccess="Add Book"
            />
          </Link>
        </div>

        <div className="flex justify-center items-center gap-x-4 mb-8">
          <button
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold shadow transition-all duration-200 ${
              showType === "card"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-blue-700 hover:bg-blue-100"
            }`}
            onClick={() => setShowType("card")}
          >
            <ViewModuleIcon />
            Card View
          </button>
          <button
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold shadow transition-all duration-200 ${
              showType === "table"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-blue-700 hover:bg-blue-100"
            }`}
            onClick={() => setShowType("table")}
          >
            <TableRowsIcon />
            Table View
          </button>
        </div>

        <div
          className="w-full"
          style={{
            background: "#f8f9fa",
            borderRadius: 12,
            boxShadow: "0 2px 8px rgba(60, 80, 180, 0.07)",
            padding: "24px 12px",
            minHeight: 400,
          }}
        >
          {loading ? (
            <Spinner />
          ) : showType === "table" ? (
            <BookTable books={books} />
          ) : (
            <BookCard books={books} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
