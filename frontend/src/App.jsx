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
import { auth } from "./firebase/firebase";
import ErrorBoundary from "./ErrorBoundary";

const App = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Check if the user is an admin by email only
        const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
        if (currentUser.email === adminEmail) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }

        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Authentication />;
  }

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Routes>
          {isAdmin ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/books/create" element={<CreateBooks />} />
              <Route path="/books/details/:id" element={<ShowBook />} />
              <Route path="/books/edit/:id" element={<EditBook />} />
              <Route path="/books/delete/:id" element={<DeleteBook />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route path="/userDashBoard" element={<UserDashBoard />} />
              <Route path="/userDashBoard/profile" element={<Profile />} />
              <Route path="/userDashBoard/wishlist" element={<WishList />} />
              <Route path="/userDashBoard/cart" element={<Cart />} />
              <Route path="/userDashBoard/search" element={<Search />} />
              <Route path="*" element={<Navigate to="/userDashBoard" />} />
            </>
          )}
        </Routes>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
