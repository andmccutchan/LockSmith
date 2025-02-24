import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router";

function SignUpCard() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      if (user.password.length >= 8 && user.password.length <= 20) {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/auth/register`,
          user
        );
        console.log(res.data);
        navigate("/login");
      } else if (user.password.length < 8) {
        setError("Password must be at least 8 characters");
      } else if (user.password.length > 20) {
        setError("Password must be less than 20 characters");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-4">
          {" "}
          {/* Responsive Column Width */}
          <form
            onSubmit={handleSubmit}
            className="card p-4 mx-auto bg-body-tertiary text-dark my-5"
          >
            <div>
              <h2 className="text-center my-2">
                Create a Lock<span className="text-primary">Smith</span> account
              </h2>
            </div>

            <div className="mb-3">
              <label htmlFor="userEmail" className="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={user.email}
                className="form-control"
                id="userEmail"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="inputPassword5" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={user.password}
                id="inputPassword5"
                className="form-control"
                aria-describedby="passwordHelpBlock"
                onChange={handleChange}
                required
              />
              <p className="form-text text-center">
                Your password must be 8-20 characters long
              </p>
            </div>

            {error && (
              <span className="badge text-bg-danger text-center py-2 my-3">
                {error}
              </span>
            )}

            <button type="submit" className="btn btn-primary mt-1">
              Sign Up
            </button>

            <p className="form-text text-center mt-2">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpCard;
