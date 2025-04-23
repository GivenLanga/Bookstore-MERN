import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import CreateBooks from "./pages/CreateBooks";
import EditBook from "./pages/EditBook";
import DeleteBook from "./pages/DeleteBook";
import ShowBook from "./pages/ShowBook";
import UserDashBoard from "./userDashBoard/UserDashBoard";

const App = () => {
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
    <Routes>
      {isAdmin ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/books/create" element={<CreateBooks />} />
          <Route path="/books/details/:id" element={<ShowBook />} />
          <Route path="/books/edit/:id" element={<EditBook />} />
          <Route path="/books/delete/:id" element={<DeleteBook />} />
        </>
      ) : (
        <>
          <Route path="/userDashBoard" element={<UserDashBoard />} />
          <Route path="*" element={<Navigate to="/userDashBoard" />} />
        </>
      )}
    </Routes>
  );
};

export default App;
