import "../../style/LogIn/loginPage.css";
import logo from '../../assets/logo.png';
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LogIn() {

  return (
    <>
      <div className="login-container">
        <div className="login-box">
          <img src={logo} alt="Logo" className="login-logo" />
          <div className="input-group">
            <h2 className="login-title">Log in using your account on:</h2>

            <Link to='cas' className="lp-option" style={{ cursor: "pointer" }}>
              <img src={logo} alt="Logo" />
              <span className="lp-option-text">Tài khoản HCMUT (HCMUT account)</span>
            </Link>

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
        </div>
      </div>
    </>
  );
}

export default LogIn;
