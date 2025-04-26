import React, { useState } from "react";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const signIn = useSignIn();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Replace with your API endpoint for login
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Login error:", errorData); // Log error details
        throw new Error(errorData.message || "Invalid credentials");
      }

      const data = await response.json();
      console.log("Login response:", data); // Debugging log
      const { token, expiresIn } = data;

      if (
        signIn({
          token,
          expiresIn,
          tokenType: "Bearer",
          authState: { email },
        })
      ) {
        navigate("/userDashBoard");
      } else {
        setError("Failed to sign in");
      }
    } catch (err) {
      console.error("Network or server error:", err); // Log network/server errors
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "10%" }}>
      <h2>Login</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "inline-block", textAlign: "left" }}
      >
        <div style={{ marginBottom: "10px" }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button
          type="submit"
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
