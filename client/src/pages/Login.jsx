import React, { useState } from "react";
import styles from "./Register.module.css";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";

const BASE_URL = "http://localhost:5000/api/users";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        dispatch(login(data.token));
        navigate("/");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      alert("Error logging in:", error.message);
    }
  }

  return (
    <div className={styles.container}>
      <section>
        <FaUser className={styles.icon} />
        <p className={styles.registerHeading}>Please login</p>
      </section>

      <section>
        <form onSubmit={handleLogin}>
          <div className={styles.textbox}>
            <input
              className={styles.username}
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.textbox}>
            <input
              className={styles.password}
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className={styles.btn}>Login</button>
        </form>
      </section>
    </div>
  );
}

export default Login;
