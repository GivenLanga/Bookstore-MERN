import React from "react";
import Navbar from "./usercomponents/Navbar";
import Footer from "./usercomponents/Footer";
import Trending from "./usercomponents/Trending";

function UserDashBoard() {
  return (
    <div>
      <Navbar />
      <Trending />
      <Footer />
    </div>
  );
}

export default UserDashBoard;
