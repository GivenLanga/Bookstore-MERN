import { AiOutlineClose } from "react-icons/ai";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";
function BookModel({ book, onClose }) {
  return (
    <div
      className="flex bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[600-x] max-w-full h- [400px] bg-white rounded-xl p-4 flex-col relative"
      >
        <AiOutlineClose
          className="absolute top-6 right-6 text-3xl text-red-600 cursor-pointer"
          onClick={onClose}
        />
        <h1 className="text-3xl my-4">Book Details</h1>
        <div className="w-full px-4 py-1 bg-red-300 rounded-lg">
          <h2 className="my-1">Published Year: {book.publishYear}</h2>
        </div>
        <div className="flex justify-start items-center gap-x-2">
          <PiBookOpenTextLight className="text-red-300 text-2xl" />
          <h2 className="my-1">{book.title}</h2>
        </div>
        <div className="flex justify-start items-center gap-x-2">
          <BiUserCircle className="text-red-300 text-2xl" />
          <h2 className="my-1">{book.author}</h2>
        </div>

        <p className="mt-4"> To be added</p>
        <p className="my-2">
          {" "}
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam odio
          corporis incidunt. Ad tempora quia quae soluta, sapiente voluptatibus
          dolorum ut optio necessitatibus quos, modi consectetur quisquam
          mollitia nam quis.
        </p>
      </div>
    </div>
  );
}

export default BookModel;
