import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../ConnetFirebase/firebase";
import { sendSignInLinkToEmail } from "firebase/auth";
import "./LoginPage.css";
import logo from "../../assets/image 9.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const actionCodeSettings = {
      url: window.location.origin + "/verify",
      handleCodeInApp: true,
    };
    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      alert("Verification link sent! Please check your email.");
      navigate("/verify");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-root">
      <img src={require("../../assets/Image 40.png")} className="side-img left" alt="left" />
      <img src={require("../../assets/Image 39.png")} className="side-img right" alt="right" />
      <div className="login-box mx-auto">
        <img src={logo} className="login-logo" alt="logo" />
        <div className="mb-2">Log in to continue</div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Continue
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