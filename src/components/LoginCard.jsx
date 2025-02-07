import React, { use, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'

function LoginCard() {
    const [credentials, setCredentials] = useState({username: "", password: ""})
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5001/api/auth/login", credentials);
            localStorage.setItem("token", res.data.token) // Save to local storage
            navigate("/dashboard"); // Redirect to dashboard
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };


  return (
    <form onSubmit={handleSubmit} className='card p-3 mx-auto w-25 bg-dark text-light my-5 py-4'>
        <div>
            <h2 className='text-center my-2'>PassWorks Login</h2>
        </div>
        <div className="mb-3">
            <label htmlFor="userEmail" className="form-label">Username</label>
            <input type="text" className="form-control" id="userEmail" onChange={handleChange} placeholder="Username" />
        </div>
        <div>
            <label htmlFor="inputPassword5" className="form-label">Password</label>
            <input type="password" id="inputPassword5" className="form-control" onChange={handleChange} aria-describedby="passwordHelpBlock" placeholder='Password' />
            <div id="passwordHelpBlock" className="form-text text-light">
                Your password must be 8-20 characters long
            </div>
        </div>
        <button type="submit" className="btn btn-secondary mt-3">Login</button>
    </form>
  )
}

export default LoginCard