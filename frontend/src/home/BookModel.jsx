import { AiOutlineClose } from "react-icons/ai";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";
function BookModel({ book, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative flex flex-col items-center"
        style={{
          minWidth: 320,
        }}
      >
        <AiOutlineClose
          className="absolute top-4 right-4 text-2xl text-red-600 cursor-pointer"
          onClick={onClose}
        />
        <h1 className="text-2xl font-bold mb-4 text-blue-800">Book Details</h1>
        <div className="w-24 h-32 mb-3 flex items-center justify-center bg-gray-100 rounded shadow-inner">
          {book.image ? (
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-full object-cover rounded"
            />
          ) : (
            <PiBookOpenTextLight className="text-blue-400 text-4xl" />
          )}
        </div>
        <div className="mb-2 text-center">
          <span className="font-semibold text-blue-700">Title: </span>
          <span className="text-gray-800">{book.title}</span>
        </div>
        <div className="mb-2 text-center flex items-center justify-center gap-x-2">
          <BiUserCircle className="text-blue-400 text-xl" />
          <span className="font-semibold text-blue-700">Author: </span>
          <span className="text-gray-800">{book.author}</span>
        </div>
        <div className="mb-2 text-center">
          <span className="font-semibold text-blue-700">Published: </span>
          <span className="text-gray-800">{book.publishYear}</span>
        </div>
        <div className="mb-2 text-center">
          <span className="font-semibold text-blue-700">Genre: </span>
          <span className="text-gray-800">{book.genre}</span>
        </div>
        <div className="mb-2 text-center">
          <span className="font-semibold text-blue-700">Price: </span>
          <span className="text-gray-800">
            {book.price !== undefined ? `R ${book.price}` : "N/A"}
          </span>
        </div>
        <div className="mb-2 text-center">
          <span className="font-semibold text-blue-700">Stock: </span>
          <span className="text-gray-800">{book.stock}</span>
        </div>
        <div className="mb-2 text-center">
          <span className="font-semibold text-blue-700">On Sale: </span>
          <span className="text-gray-800">{book.onSale ? "Yes" : "No"}</span>
        </div>
        <div className="mt-4 w-full">
          <h3 className="font-semibold text-blue-700 mb-1">Description:</h3>
          <p className="text-gray-700 text-sm">
            {book.description || "No description available."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default BookModel;
