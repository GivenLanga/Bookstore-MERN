import { onAuthStateChanged } from "firebase/auth";

import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import CreateBooks from "./pages/CreateBooks";
import EditBook from "./pages/EditBook";
import DeleteBook from "./pages/DeleteBook";
import ShowBook from "./pages/ShowBook";
import UserDashBoard from "./userDashBoard/UserDashBoard";
import Profile from "./userDashBoard/usercomponents/userpages/Profile";
import WishList from "./userDashBoard/usercomponents/userpages/WishList";
import Cart from "./userDashBoard/usercomponents/userpages/Cart";
import Search from "./userDashBoard/usercomponents/userpages/Search";
import Authentication from "./userDashBoard/Authentication/Authentication.jsx";
const App = () => {
  /*  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsFetching(false);
        return;
      } else {
        setUser(null);
        setIsFetching(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

if (isFetching) { return <div>Loading...</div>;  
}

 */
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const savedIsAdmin = localStorage.getItem("isAdmin");
    if (savedIsAdmin !== null) {
      setIsAdmin(JSON.parse(savedIsAdmin));
    }
  }, []);

  const handleAdminResponse = (response) => {
    setIsAdmin(response);
    localStorage.setItem("isAdmin", JSON.stringify(response));
  };

  if (isAdmin === null) {
    return (
      <div style={{ textAlign: "center", marginTop: "20%" }}>
        <h2>Are you an admin?</h2>
        <button
          onClick={() => handleAdminResponse(true)}
          style={{
            margin: "10px",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Yes
        </button>
        <button
          onClick={() => handleAdminResponse(false)}
          style={{
            margin: "10px",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          No
        </button>
      </div>
    );
  }

  return (
    <Provider store={store}>
      <Routes>
        {isAdmin ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/books/create" element={<CreateBooks />} />
            <Route path="/books/details/:id" element={<ShowBook />} />
            <Route path="/books/edit/:id" element={<EditBook />} />
            <Route path="/books/delete/:id" element={<DeleteBook />} />
            <Route path="*" element={<Navigate to="/" />} />{" "}
            {/* Redirect invalid routes */}
          </>
        ) : (
          <>
            <Route path="/userDashBoard" element={<UserDashBoard />} />
            <Route path="/userDashBoard/profile" element={<Profile />} />
            <Route path="/userDashBoard/wishlist" element={<WishList />} />
            <Route path="/userDashBoard/cart" element={<Cart />} />
            <Route path="/userDashBoard/search" element={<Search />} />
            <Route path="/userDashBoard/Auth" element={<Authentication />} />
            {/*  <Route
              path="/userDashBoard/private"
              element={<protectedRoute user={user} />}
            /> */}
            <Route path="*" element={<Navigate to="/userDashBoard" />} />{" "}
            {/* Redirect invalid routes */}
          </>
        )}
      </Routes>
      <button
        onClick={() => {
          localStorage.removeItem("isAdmin");
          setIsAdmin(null);
        }}
        style={{
          position: "fixed",
          bottom: "10px",
          right: "10px",
          padding: "10px",
          backgroundColor: "red",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Reset Admin Prompt
      </button>
    </Provider>
  );
};

export default App;
