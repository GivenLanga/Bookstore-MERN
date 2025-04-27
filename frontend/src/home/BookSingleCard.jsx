import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";
import BookModel from "./BookModel";

function BookSingleCard({ book }) {
  const [showModel, setShowModel] = useState(false);

  return (
    <div>
      <div
        className="bg-white rounded-xl shadow-lg px-6 py-5 m-4 relative flex flex-col items-center transition-transform duration-200 hover:scale-105"
        style={{
          minWidth: 240,
          maxWidth: 320,
          border: "1px solid #e0e0e0",
        }}
      >
        <div className="absolute top-3 right-3 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold shadow">
          {book.publishYear}
        </div>
        <div className="w-20 h-28 mb-3 flex items-center justify-center bg-gray-100 rounded shadow-inner">
          {book.image ? (
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-full object-cover rounded"
            />
          ) : (
            <MenuBookIcon className="text-blue-400" style={{ fontSize: 40 }} />
          )}
        </div>
        <h2 className="text-lg font-bold text-gray-800 text-center mb-1 truncate w-full">
          {book.title}
        </h2>
        <div className="flex items-center justify-center gap-x-2 mb-1">
          <PersonIcon className="text-blue-400" fontSize="small" />
          <span className="text-gray-600 text-sm">{book.author}</span>
        </div>
        {book.price && (
          <div className="text-blue-700 font-semibold mb-1">R{book.price}</div>
        )}
        {book.description && (
          <div className="mt-1 text-gray-500 text-xs text-center line-clamp-2 w-full">
            {book.description.length > 80
              ? book.description.slice(0, 80) + "..."
              : book.description}
          </div>
        )}
        <div className="flex justify-center items-center gap-x-4 mt-4">
          <VisibilityIcon
            className="text-2xl text-blue-700 hover:text-black cursor-pointer"
            onClick={() => setShowModel(true)}
            titleAccess="Quick View"
            style={{ fontSize: 24 }}
          />
          <Link to={`/books/details/${book._id}`}>
            <InfoIcon
              className="text-green-700 text-xl hover:text-black"
              titleAccess="Details"
              style={{ fontSize: 22 }}
            />
          </Link>
          <Link to={`/books/edit/${book._id}`}>
            <EditIcon
              className="text-yellow-600 text-xl hover:text-black"
              titleAccess="Edit"
              style={{ fontSize: 22 }}
            />
          </Link>
          <Link to={`/books/delete/${book._id}`}>
            <DeleteForeverIcon
              className="text-red-600 text-xl hover:text-black"
              titleAccess="Delete"
              style={{ fontSize: 22 }}
            />
          </Link>
        </div>
      </div>
      {showModel && (
        <BookModel book={book} onClose={() => setShowModel(false)} />
      )}
    </div>
  );
}

export default BookSingleCard;
