//PasswordForm.jsx
import React, { useState } from 'react'
import CryptoJS from 'crypto-js';

function PasswordForm({ addPassword }) {
  const [formData, setFormData] = useState({
    website: '',
    username: '',
    password: ''
  });
  const [isVisible, setIsVisible] = useState(false);
  const [inAddView, setInAddView] = useState(false);

  const toggleVisibility = () => setIsVisible(prev => !prev);
  const handleInAddView = () => {
    setInAddView(prev => !prev);
    setFormData({website: '', username: '', password: ''});
  }

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleGenerateSecurePassword = (length = 24) => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{}|;:,.<>?";
    const randomBytes = CryptoJS.lib.WordArray.random(length).toString(CryptoJS.enc.Hex);

    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = parseInt(randomBytes.substr(i * 2, 2), 16) % charset.length;
        password += charset[randomIndex];
    }
    setFormData(prevFormData => ({ ...prevFormData, password }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.website || !formData.username || !formData.password) {
      return;
    };
    addPassword(formData);
    setFormData({website: '', username: '', password: ''});
    setInAddView(false);
  }

  return (
    <div className='container-fluid rounded m-2 p-3'>
      {inAddView ? (
        <form 
          onSubmit={handleSubmit} 
          autoComplete="new-password"
          autoCorrect="off"
          spellCheck="false"
        >
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
          <div className='d-flex justify-content-between'>
            <div className='d-flex align-items-center'>
              <button className='btn btn-danger' onClick={handleInAddView}>Cancel</button>
            </div>
            <div>
              <button
                className='btn ms-2 text-decoration-underline'
                type='button'
                onClick={() => handleGenerateSecurePassword(24)}
              >
                Generate Secure Password
              </button>
              <button className='btn bg-primary text-light my-3' type='submit'>Add Password</button>
            </div>
          </div>
        </form>
      ) : (
        <div>
          <button className='btn btn-success' onClick={handleInAddView}><i className="fa-solid fa-plus me-2"></i>New Item</button>
        </div>
      )}
    </div>
  
  )
}

export default PasswordForm