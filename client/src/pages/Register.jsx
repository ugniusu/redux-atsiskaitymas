import React, { useState } from "react";
import styles from "./Register.module.css";
import { FaUser } from "react-icons/fa";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:5000/api/users";

function Register() {
  const [formData, setFormData] = useState({
    firstname: "",
    email: "",
    password: "",
  });

  const { firstname, email, password } = formData;

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    const response = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstname, email, password }),
    });
    console.log(response);

    navigate("/login");
    console.log(email, password);
  }

  return (
    <div className={styles.container}>
      <Header />
      <section>
        <FaUser className={styles.icon} />
        <p className={styles.registerHeading}>Please create an account</p>
      </section>

      <section>
        <form onSubmit={handleRegister}>
          <div className={styles.textbox}>
            <input
              className={styles.username}
              type="text"
              placeholder="Firstname"
              name="firstname"
              value={firstname}
              onChange={onChange}
              required
            />
          </div>
          <div className={styles.textbox}>
            <input
              className={styles.username}
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={onChange}
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
              onChange={onChange}
              required
            />
          </div>
          <button className={styles.btn}>Register</button>
        </form>

        <div className={styles.toLogin}>
          <p>Already have a account?</p>
          <button>Login</button>
        </div>
      </section>
    </div>
  );
}

export default Register;
