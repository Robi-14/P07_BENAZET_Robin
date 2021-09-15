import axios from "axios";
import React, { useState } from "react";
import "./FormLogin.css";

export default function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    axios
      .post("http://localhost:5000/api/user/login", {
        email,
        password,
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
          localStorage.setItem("Token",response.data.token)
          localStorage.setItem('userId',response.data.userId)
      })
      
      }
  

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <div className="Formlogin-container">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Mot de passe"
        />
        <input type="submit" value="Se connecter" />
      </form>
    </div>
  );
}
