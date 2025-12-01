// src/pages/Login.js
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const API = import.meta.env.VITE_API_BASE_URL; 
  // Ví dụ: http://localhost:8000/api

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "LOGIN_FAILED");
        return;
      }

      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      setError("NETWORK_ERROR");
    }
  };

  return (
    <div style={{ width: 300, margin: "50px auto", fontFamily: "sans-serif" }}>
      <form onSubmit={handleLogin}>

        <div style={{ fontWeight: "bold", marginBottom: 10 }}>Login</div>

        <div style={{ marginBottom: 10 }}>
          <label>Email</label>
          <input
            type="email"
            style={{ width: "100%", padding: 8, marginTop: 4 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label>Password</label>
          <input
            type="password"
            style={{ width: "100%", padding: 8, marginTop: 4 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && (
          <div style={{ color: "red", marginBottom: 10, fontSize: 14 }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: 10,
            background: "black",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
