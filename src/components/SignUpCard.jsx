import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router'
import { set } from 'mongoose';

function SignUpCard() {
    const [user, setUser] = useState({email: "", password: ""});
    const [error, setError] = useState("");
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user)
        try {
            if (user.password.length >= 8 && user.password.length <= 20) {
                const res = await axios.post("http://localhost:5001/api/auth/register", user);
                console.log(res.data);
                navigate("/login");
            } else if (user.password.length < 8) {
                setError("Password must be at least 8 characters");
            } else if (user.password.length > 20) {
                setError("Password must be less than 20 characters");
            }
        } catch (err) {
            setError(err.response?.data?.error || "Registration failed")
        }
    }

  return (
    <div>
        <form onSubmit={handleSubmit} className='card p-3 mx-auto w-25 bg-body-tertiary text-dark my-5 py-4'>
            <div>
                <h2 className='text-center my-2'>Create an account</h2>
            </div>
            <div className="mb-3">
                <label htmlFor="userEmail" className="form-label">Email</label>
                <input type="email" name='email' value={user.email} className="form-control" id="userEmail" placeholder="your-email@example.com" onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="inputPassword5" className="form-label">Password</label>
                <input type="password" name='password' value={user.password} id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock" onChange={handleChange} placeholder='Password' required />
                <div id="passwordHelpBlock" className="form-text text-dark my-3">
                    Your password must be 8-20 characters long
                </div>
            </div>
            {error && <span className='badge text-bg-danger text-center py-2 my-3'>{error}</span>}
            <button type="submit" className="btn btn-primary mt-1">Sign Up</button>
        </form>
        <p className='form-text text-center'>Already have an account? <span><Link to="/login">Log in</Link></span></p>
    </div>
  )
}

export default SignUpCard