import "../../style/loginPage.css";
import logo from '../../assets/logo.png';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LogIn() {

  return (
    <>
      <header className="header">
        <img src={logo} className="logoImg" alt="logo" />
        <div className="logo">
          <p>ĐẠI HỌC QUỐC GIA THÀNH PHỐ HỒ CHÍ MINH</p>
          <h2>TRƯỜNG ĐẠI HỌC BÁCH KHOA</h2>
        </div>
        <nav className="nav">
          <a href="#">Trang chủ</a>
          <a href="#about">Giới thiệu</a>
          <a href="#features">Thư viện</a>
          <a href="#contact">Liên hệ</a>
        </nav>
      </header>

      <div className="login-container">
        <div className="login-box">
          <img src={logo} alt="Logo" className="login-logo" />
          <div className="input-group">
            <h2 className="login-title">Log in using your account on:</h2>

            <div className="lp-option" style={{ cursor: "pointer" }}>
              <img src={logo} alt="Logo" />
              <span className="lp-option-text">Tài khoản HCMUT (HCMUT account)</span>
            </div>

            <div className="lp-option">
              <span className="lp-option-text">Admin</span>
            </div>
          </div>

          <div className="cook-lang">
            <div className="language-select">
              <span>English (en)</span>
              <span className="arrow">▼</span>
            </div>
            <button className="cookie-btn">Cookies notice</button>
          </div>

          {/* ✅ Hiển thị kết quả trả về để test */}
          {loading && <p style={{ marginTop: 20 }}>⏳ Đang đăng nhập...</p>}
          {result && (
            <pre
              style={{
                marginTop: 20,
                padding: 10,
                background: "#f4f4f4",
                textAlign: "left",
                maxHeight: 300,
                overflow: "auto",
              }}
            >
              {JSON.stringify(result, null, 2)}
            </pre>
          )}
        </div>
      </div>
    </>
  );
}

export default LogIn;
