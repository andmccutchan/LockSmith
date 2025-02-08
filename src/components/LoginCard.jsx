import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'

function LoginCard() {
    const [credentials, setCredentials] = useState({email: "", password: ""})
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5001/api/auth/login", credentials);
            console.log("Login successful:", res.data);

            localStorage.setItem("token", res.data.token) // Save to local storage
            navigate("/dashboard"); // Redirect to dashboard
        } catch (err) {
            setError(err.response?.data?.error || "Login failed");
        }
    };


  return (
    <div>
        <form onSubmit={handleSubmit} className='card p-3 mx-auto w-25 bg-body-tertiary text-dark my-5 py-4'>
            <div>
                <h2 className='text-center my-2'>PassWorks Login</h2>
            </div>
            <div className="mb-3">
                <label htmlFor="userEmail" className="form-label">Username</label>
                <input type="text" className="form-control" name='email' value={credentials.email} id="userEmail" onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="inputPassword5" className="form-label">Password</label>
                <input type="password" id="inputPassword5" className="form-control" name='password' value={credentials.password} onChange={handleChange} aria-describedby="passwordHelpBlock" />
            </div>
            {error && <span className="badge text-bg-danger text-center py-2 my-3">{error}</span>}
            <button type="submit" className="btn btn-primary mt-3">Login</button>
        </form>
    </div>
    
  )
}

export default LoginCard