import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'

function SignUpCard() {
    const [user, setUser] = useState({email: "", password: ""});
    const [error, setError] = useState("");
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5001/api/auth/register", user);
            console.log(res.data);
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed")
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
                <div id="passwordHelpBlock" className="form-text text-dark">
                    Your password must be 8-20 characters long
                </div>
            </div>
            {error && <span className='badge text-bg-danger text-center py-2 my-3'>{error}</span>}
            <button type="submit" className="btn btn-primary mt-2">Sign Up</button>
        </form>
    </div>
  )
}

export default SignUpCard