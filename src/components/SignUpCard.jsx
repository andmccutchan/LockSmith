import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import API from '../api';

function SignUpCard() {
    const [formData, setFormData] = useState({
        username:"",
        password:""
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post("/register", formData);
            console.log("Response:", response.data);
            alert("User registered successfully");
        } catch (err) {
            console.error("Error registering user:", err.response?.data || err);
        }
    }

  return (
    <div>
        {error && <p className='text-danger'>{error}</p>}
        <form onSubmit={handleSubmit} className='card p-3 mx-auto w-25 bg-dark text-light my-5 py-4'>
            <div>
                <h2 className='text-center my-2'>Create an account</h2>
            </div>
            <div className="mb-3">
                <label htmlFor="userEmail" className="form-label">Email</label>
                <input type="email" name='email' className="form-control" id="userEmail" placeholder="name@example.com" onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" name='username' className="form-control" id="usernames" placeholder="Username" onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="inputPassword5" className="form-label">Password</label>
                <input type="password" name='password' id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock" onChange={handleChange} placeholder='Password' required />
                <div id="passwordHelpBlock" className="form-text text-light">
                    Your password must be 8-20 characters long
                </div>
            </div>
            <button type="submit" className="btn btn-secondary mt-3">Sign Up</button>
        </form>
    </div>
  )
}

export default SignUpCard