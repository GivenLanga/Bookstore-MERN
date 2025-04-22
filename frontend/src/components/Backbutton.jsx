import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

function Backbutton() {
  return (
    <div className="flex">
      <Link to="/" className="bg-sky-800 text-white px-4 py-1 rounded-1g w-fit">
        <BsArrowLeft className="text-2xl" />
      </Link>
    </div>
  );
}

export default Backbutton;
