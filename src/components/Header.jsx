import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function Header() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to home
  };

  return (
    <header className="mx-2">
      <nav className="navbar navbar-expand-lg bg-body-tertiary shadow page-header w-100 rounded mb-1 mt-2">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex text-dark align-items-center" to="/">
            <img className="px-1 header-lock-logo" src="src/assets/lock-closed-svgrepo-com.svg" alt="Lock logo" />
            Lock<span className="text-primary">Smith</span>
          </Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav" 
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/dashboard">Dashboard</Link>
              </li>
              
              {isLoggedIn ? (
                <>
                  <li className="nav-item mx-2">
                    <button className="btn btn-link nav-link text-decoration-underline text-dark" onClick={handleLogout}>Log out</button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-dark" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register">
                      <button type="button" className="btn btn-primary border-0 rounded-pill px-4">Sign Up</button>
                    </Link>
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
