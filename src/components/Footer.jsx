// src/components/Footer.jsx
import React from "react";

function Footer() {
  return (
    <footer className="bg-dark text-light text-center py-3 mt-auto">
      <div className="container">
        <p className="mb-0">&copy; {new Date().getFullYear()} LockSmith | Developed by Andrew McCutchan</p>
      </div>
    </footer>
  );
}

export default Footer;
