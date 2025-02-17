// src/components/Footer.jsx
import React from "react";
import { useLocation } from "react-router";

function Footer() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <footer className={`${!isHomePage ? 'bg-dark' : '' } text-light text-center py-3 mt-2`}>
      <div className="container">
        <p className="mb-0">&copy; {new Date().getFullYear()} LockSmith | Developed by Andrew McCutchan</p>
      </div>
    </footer>
  );
}

export default Footer;
