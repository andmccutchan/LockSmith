import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "./AuthContext";

function LoginCard() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        credentials
      );
      // console.log("Login successful:", res.data);

      const { token } = res.data;
      const expiresIn = 3600;

      login(token, expiresIn); // Save to local storage
      navigate("/dashboard"); // Redirect to dashboard
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-4">
          <form
            onSubmit={handleSubmit}
            className="card p-4 bg-body-tertiary text-dark mx-auto mt-5"
          >
            <div className="d-flex justify-content-center align-items-center">
              <img
                className="px-1"
                src="/lock-closed-svgrepo-com.svg"
                alt="Lock logo"
              />
              <h2 className="text-center my-2">
                Lock<span className="text-primary">Smith</span> Login
              </h2>
            </div>

            <div className="mb-3">
              <label htmlFor="userEmail" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                name="email"
                value={credentials.email}
                id="userEmail"
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="inputPassword5" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="inputPassword5"
                className="form-control"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                aria-describedby="passwordHelpBlock"
              />
            </div>

            {error && (
              <span className=" badge text-danger text-center mt-2 text-decoration-underline">
                {error}
              </span>
            )}

            <button type="submit" className="btn btn-primary mt-3">
              Login
            </button>

            <p className="form-text text-center mt-3">
              New to LockSmith? <Link to="/register">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginCard;
