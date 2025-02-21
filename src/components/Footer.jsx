// src/components/Footer.jsx
import React from "react";
import { useLocation } from "react-router";

function Footer() {

  return (
    <footer className="text-light text-center py-3">
      <div className="container">
        <p className="mb-0">&copy; {new Date().getFullYear()} LockSmith | Developed by Andrew McCutchan</p>
      </div>
    </footer>
  );
}

export default Footer;
