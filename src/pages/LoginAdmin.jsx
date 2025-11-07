import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages/LoginAdmin.css";
import logo from "../assets/logo.png";
import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

const LoginAdmin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [toastMessage, setToastMessage] = useState({ message: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [loginStatus, setLoginStatus] = useState("initial");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setToastMessage({ message: "", type: "" });
    setLoginStatus("initial");
    setIsLoading(true);

    setTimeout(() => {
      if (username === "admin" && password === "password123") {
        setToastMessage({
          message: "Login Berhasil! Mengalihkan...",
          type: "success",
        });
        setLoginStatus("success");

        setTimeout(() => {
          navigate("/admin");
        }, 2000);
      } else {
        setToastMessage({
          message: "Username atau password salah.",
          type: "error",
        });

        setTimeout(() => {
          setToastMessage({ message: "", type: "" });
        }, 3000);
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleBack = () => {
    navigate("/"); // Kembali ke halaman utama
  };

  return (
    <div className="login-container" data-aos="fade-in">
      {/* ✅ Tombol kembali di pojok kiri atas */}
      <button className="back-button" onClick={handleBack}>
        ← <span>Kembali</span>
      </button>

      {toastMessage.message && (
        <div className={`toast-notification ${toastMessage.type}`}>
          <span className="toast-icon">
            {toastMessage.type === "success" ? "✓" : "✗"}
          </span>
          {toastMessage.message}
        </div>
      )}

      <div className={`login-card status-${loginStatus}`}>
        <div className="login-header">
          <img src={logo} alt="Logo SiPekan" className="login-logo" />
          <h2>Login Admin</h2>
          <p>Masuk untuk lajut ke tampilan Admin.</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username"
              required
            />
          </div>

          <div className="form-group antd-password-group">
            <label htmlFor="password">Password</label>
            <Input.Password
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              required
              size="large"
              style={{ borderRadius: "8px" }}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? "Memproses..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;
