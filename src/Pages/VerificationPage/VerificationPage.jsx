import React from "react";
import "./VerificationPage.css";
import { useNavigate } from "react-router-dom";

export default function VerificationPage() {
      const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };
  return (
    <div className="login-root">
      <img src={require("../../assets/Image 40.png")} className="side-img left" alt="left" />
      <img src={require("../../assets/Image 39.png")} className="side-img right" alt="right" />
      <div className="login-box mx-auto">
        <h2 className="mb-2">Email Verification</h2>
        <div className="mb-3" style={{fontSize: '15px', color: '#444'}}>Please enter your code that sent to your email address</div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control"
            placeholder="Enter code verification"
          />
          <button type="submit" className="btn btn-primary" style={{marginTop: '10px'}}>
            Submit
          </button>
        </form>
        <div className="privacy">
          Privacy Policy
          <br />
          <span style={{ fontSize: "12px" }}>
            This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
          </span>
        </div>
      </div>
    </div>
  );
}