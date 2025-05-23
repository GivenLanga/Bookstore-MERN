import React, { useState } from "react";
import "./Authentication.css";
import { Navigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.js";

function Authentication({ user }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleMethodChange = () => {
    setIsLogin(!isLogin);
    setError("");
    setSuccess("");
  };

  const handleSignUp = async () => {
    setError("");
    setSuccess("");
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess("Sign up successful! Redirecting...");
      setTimeout(() => setRedirect(true), 1000);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    setError("");
    setSuccess("");
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);

      // Check if the user is an admin (by email only)
      const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
      if (email === adminEmail) {
        localStorage.setItem("isAdmin", true);
      } else {
        localStorage.setItem("isAdmin", false);
      }
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => setRedirect(true), 1000);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!email) {
      setError("Please enter your email to reset password.");
      return;
    }
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess("Password reset email sent!");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      handleSignIn();
    } else {
      handleSignUp();
    }
  };

  if (user || redirect) {
    return <Navigate to="/userDashBoard" />;
  }

  return (
    <div className="auth__container">
      <form className="form" onSubmit={handleFormSubmit}>
        {isLogin ? <p id="heading">Login</p> : <p id="heading">Sign up</p>}
        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">{success}</div>}
        <div className="field">
          <svg
            className="input-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
          </svg>
          <input
            autoComplete="off"
            placeholder="Email"
            className="input-field"
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            disabled={loading}
          />
        </div>
        <div className="field">
          <svg
            className="input-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
          </svg>
          <input
            placeholder="Password"
            className="input-field"
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            disabled={loading}
          />
        </div>
        <div className="btn">
          <button type="submit" className="button1" disabled={loading}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{isLogin ? "Login" : "Sign Up"}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </button>
          <button
            type="button"
            className="button2"
            onClick={handleMethodChange}
            disabled={loading}
          >
            {isLogin ? "Sign Up ?" : "Login ?"}
          </button>
        </div>
        <button
          className="button3"
          type="button"
          onClick={handleForgotPassword}
          disabled={loading}
        >
          Forgot Password
        </button>
      </form>
    </div>
  );
}

export default Authentication;
