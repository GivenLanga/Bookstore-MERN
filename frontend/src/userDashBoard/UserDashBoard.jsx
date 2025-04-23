import React from "react";
import Navbar from "./usercomponents/Navbar";
import Footer from "./usercomponents/Footer";
import Trending from "./usercomponents/Trending";
/* import TopRated from "./usercomponents/TopRated";
import Featured from "./usercomponents/Featured"; */
/* import { Router, Route } from "react-router-dom"; */

function UserDashBoard() {
  return (
    <div>
      <Navbar />
      <Trending />
      <Footer />

      {/*  
      <TopRated />
      <Featured />
      
        <Footer/> */}
    </div>
  );
}

export default UserDashBoard;
