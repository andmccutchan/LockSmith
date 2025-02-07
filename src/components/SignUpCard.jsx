import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'

function SignUpCard() {
    const [user, setUser] = useState({ username: "", email: "", password: "", firstName:"", lastName: ""})
    const [error, setError] = useState("");
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("https://localhost:5001/api/auth/register", user);
            console.log(res.data);
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed")
        }
    }

  return (
        <form onSubmit={handleSubmit} className='card p-3 mx-auto w-25 bg-dark text-light my-5 py-4'>
            <div>
                <h2 className='text-center my-2'>Create an account</h2>
            </div>
            <div className="mb-3">
                <label htmlFor="userEmail" classNameName="form-label">Email</label>
                <input type="email" classNameName="form-control" id="userEmail" placeholder="name@example.com" onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="firstName" classNameName="form-label">First name</label>
                <input type="text" classNameName="form-control" id="firstName" placeholder="First name" onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="lastName" classNameName="form-label">Last name (optional)</label>
                <input type="text" classNameName="form-control" id="lastName" placeholder="Last name" onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="user" className="form-label">Username</label>
                <input type="text" className="form-control" id="user" placeholder="Username" onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="inputPassword5" className="form-label">Password</label>
                <input type="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock" onChange={handleChange} placeholder='Password' required />
                <div id="passwordHelpBlock" className="form-text text-light">
                    Your password must be 8-20 characters long
                </div>
            </div>
            <button type="submit" className="btn btn-secondary mt-3">Sign Up</button>
        </form>
  )
}

export default SignUpCard