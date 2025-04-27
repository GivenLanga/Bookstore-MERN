import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Backbutton from "../components/Backbutton";
import Spinner from "../components/Spinner";

function ShowBook() {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

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
        <h1
          className="text-3xl font-bold mb-8"
          style={{ color: "#222", letterSpacing: "1px" }}
        >
          Book Details
        </h1>
        {loading ? (
          <Spinner />
        ) : !book ? (
          <p className="text-center text-gray-500">Book not found.</p>
        ) : (
          <div className="flex flex-col gap-4">
            <div>
              <span className="text-lg font-semibold text-blue-700 mr-4">
                Id
              </span>
              <span>{book.id || book._id || "N/A"}</span>
            </div>
            <div>
              <span className="text-lg font-semibold text-blue-700 mr-4">
                Title
              </span>
              <span>{book.title || "N/A"}</span>
            </div>
            <div>
              <span className="text-lg font-semibold text-blue-700 mr-4">
                Author
              </span>
              <span>{book.author || "N/A"}</span>
            </div>
            <div>
              <span className="text-lg font-semibold text-blue-700 mr-4">
                Publish Year
              </span>
              <span>{book.publishYear || "N/A"}</span>
            </div>
            <div>
              <span className="text-lg font-semibold text-blue-700 mr-4">
                ISBN
              </span>
              <span>{book.ISBN || "N/A"}</span>
            </div>
            <div>
              <span className="text-lg font-semibold text-blue-700 mr-4">
                Genre
              </span>
              <span>{book.genre || "N/A"}</span>
            </div>
            <div>
              <span className="text-lg font-semibold text-blue-700 mr-4">
                Price
              </span>
              <span>{book.price !== undefined ? `R${book.price}` : "N/A"}</span>
            </div>
            <div>
              <span className="text-lg font-semibold text-blue-700 mr-4">
                Stock
              </span>
              <span>{book.stock !== undefined ? book.stock : "N/A"}</span>
            </div>
            <div>
              <span className="text-lg font-semibold text-blue-700 mr-4">
                On Sale
              </span>
              <span>{book.onSale ? "Yes" : "No"}</span>
            </div>
            <div>
              <span className="text-lg font-semibold text-blue-700 mr-4">
                Image
              </span>
              {book.image ? (
                <img
                  src={book.image}
                  alt={book.title}
                  style={{
                    maxWidth: 120,
                    borderRadius: 8,
                    boxShadow: "0 2px 8px rgba(60, 80, 180, 0.07)",
                  }}
                />
              ) : (
                "N/A"
              )}
            </div>
            <div>
              <span className="text-lg font-semibold text-blue-700 mr-4">
                Description
              </span>
              <span>{book.description || "N/A"}</span>
            </div>
            <div>
              <span className="text-lg font-semibold text-blue-700 mr-4">
                Created Time
              </span>
              <span>
                {book.createAt ? new Date(book.createAt).toString() : "N/A"}
              </span>
            </div>
            <div>
              <span className="text-lg font-semibold text-blue-700 mr-4">
                Last Updated
              </span>
              <span>
                {book.updatedAt ? new Date(book.updatedAt).toString() : "N/A"}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShowBook;
