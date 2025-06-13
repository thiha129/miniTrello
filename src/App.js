import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage/LoginPage";
import VerificationPage from "./Pages/VerificationPage/VerificationPage";
import DashPage from "./Pages/DashPage/DashPage";
import CardDetailModal from "./Pages/CardDetailModal/CardDetailModal";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/verify" element={<VerificationPage />} />
        <Route path="/dashboard" element={<DashPage />} />
        <Route path="/card-detail" element={<CardDetailModal />} />
      </Routes>
    </Router>
  );
}

export default App;
