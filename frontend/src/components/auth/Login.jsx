import React, { useEffect } from "react";

import { useState } from "react";
import styles from "./Signup.module.css";
import { AuthProvider, useAuth } from "../../authContex";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  // useEffect(() => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("userId");
  //   setCurrentUser(null);
  // });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser, setCurrentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3000/login", {
        email: email,
        password: password,
      });
      const token = res.data.token;
      const userId = res.data.userId;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      setCurrentUser(userId);
      setLoading(false);

      window.location.href = "/";
    } catch (err) {
      console.error("error during login frontend", err.message);
      alert("login failed");
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Create your account</h2>

        <input
          type="email"
          name="email"
          placeholder="Email address"
          required
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className={styles.button}
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? "Loading..." : "Login"}
        </button>

        <p className={styles.footer}>
          i don't have account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
