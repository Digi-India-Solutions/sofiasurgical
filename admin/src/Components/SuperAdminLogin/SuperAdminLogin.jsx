import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SuperAdminLogin.css";
import axios from "axios";
import { toast } from "react-toastify";

const SuperAdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://api.sofiasurgicals.com/api/super-admin-sign-in",
        {
          email: email,
          password: password,
        }
      );

      if (res.status === 200) {
        localStorage.setItem("superAdminToken", res.data.token);
      window.location.href = "/dashboard";
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to login");
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
