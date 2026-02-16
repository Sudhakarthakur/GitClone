import React from "react";

import { useState } from "react";
import axios from "axios";
import styles from "./Signup.module.css";
import { Form, Link } from "react-router-dom";
import { useAuth } from "../../authContex";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setCurrentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3000/signup", {
        email: email,
        password: password,
        username: username,
      });
      const token = res.data.token;
      const userId = res.data.userId;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      setCurrentUser(userId);
      setLoading(false);

      window.location.href = "/";
    } catch (err) {
      console.error("error during signup frontend", err.message);
      alert("Invalid Username or email");
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Create your account</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          className={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

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
          {loading ? "Loading..." : "Signup"}
        </button>

        <p className={styles.footer}>
          Already have an account? <Link to="/auth">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
