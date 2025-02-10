//PasswordForm.jsx
import React, { useState } from 'react'

function PasswordForm({ addPassword }) {
  const [formData, setFormData] = useState({
    website: '',
    username: '',
    password: ''
  });
  const [securePassword, setSecurePassword] = useState("");
  const [usingSecurePassword, setUsingSecurePassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(prev => !prev);

  const generatePassword = (length = 12) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?";
    let newPassword = "";
    for (let i = 0; i < length; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setSecurePassword(newPassword);
    setUsingSecurePassword(true);
    setFormData(prev => ({ ...prev, password: newPassword }));
  }

  const handleChange = (e) => {
    setUsingSecurePassword(false);
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.website || !formData.username || !formData.password) return;
    addPassword(formData);
    setFormData({website: '', username: '', password: ''});
    setSecurePassword("")
  }

  return (
    <div className='container rounded m-2 p-3'>
      <form onSubmit={handleSubmit}>
        <div>
          <label className='form-label' htmlFor="websitePassword">Website URL</label>
          <input className='form-control' type="text" name="website" id="websitePassword" value={formData.website} onChange={handleChange} />
        </div>
        <div>
          <label className='form-label' htmlFor="username">Username/Email</label>
          <input className='form-control' type="text" name="username" id="username" value={formData.username} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <div className='d-flex'>
            <input className='form-control' type={isVisible ? "text" : "password"} name="password" id="password" value={formData.password} onChange={handleChange} />
            {isVisible ? (
              <button className='btn border-0' onClick={toggleVisibility} type='button'><i className="fa-regular fa-eye-slash"></i></button>
            ) : (
              <button className='btn border-0' onClick={toggleVisibility} type='button'><i className="fa-regular fa-eye"></i></button>
            )}
          </div>
        </div>
        <button className='btn bg-primary text-light my-3' type='submit'>Add Password</button>   
        <button className='btn ms-2 text-decoration-underline' type='button' onClick={generatePassword}>Generate Secure Password</button>
      </form>
    </div>
  
  )
}

export default PasswordForm