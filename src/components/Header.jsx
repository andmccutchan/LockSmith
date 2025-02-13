// Header.jsx
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "./AuthContext";

function Header() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to home
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-dark page-header px-3 rounded-pill my-2">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex text-light" to="/" >
            <img className="px-1" src="src/assets/lock-closed-svgrepo-com.svg" alt="Lock logo" />
            Lock<span className="text-primary">Smith</span>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
            <ul className="navbar-nav d-flex align-items-center">
              <li className="nav-item">
                <Link className="nav-link text-light" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/dashboard">Dashboard</Link>
              </li>
              
              {isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-light" to="/settings">Settings</Link>
                  </li>
                  <li className="nav-item mx-2">
                    <button className="btn btn-link nav-link text-decoration-underline text-light" onClick={handleLogout}>Log out</button>
                  </li>
                </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link text-light" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/register"><button type="button" className="btn btn-primary border-0 rounded-pill px-4">Sign Up</button></Link>
                    </li>
                  </>
                )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
