import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SuperAdminLogin.css";

const SuperAdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "super@sofiasurgicals.com" && password === "Sofia@@1234") {
      localStorage.setItem(
        "93e4c022f3abd59b1354b07b61c933fdb1b92a94395e53378190cfaacad485caa656e3853d874f418265e5eaca3ccfe623f68f3b478f7d4be822336a8e0803ab",
        "superadmin-token"
      );
      navigate("/dashboard");
    } else {
      alert("Invalid super admin credentials!");
    }
  };

  return (
    <div className="superadmin-login-container">
      <form className="superadmin-login-form" onSubmit={handleSubmit}>
        <h2>Super Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default SuperAdminLogin;
