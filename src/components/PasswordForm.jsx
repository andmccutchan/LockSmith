//PasswordForm.jsx
import React, { useState } from 'react'

function PasswordForm({ addPassword, closePassword }) {
  const [formData, setFormData] = useState({
    website: '',
    username: '',
    password: ''
  });
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(prev => !prev);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleGenerateSecurePassword = (length = 18) => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{}|;:,.<>?";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
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
  }

  const handleCloseForm = () => {
    setFormData({website: '', username: '', password: ''})
    closePassword();
  }

  return (
    <div className='w-100 rounded'>
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
        <div className='d-flex'>
          <div>
            <button className='btn bg-primary text-light my-3' type='submit'>Add Password</button>
            {/* <button className='btn btn-danger ms-2' onClick={handleCloseForm}>Cancel</button> */}
            <button
              className='btn ms-2 text-decoration-underline'
              type='button'
              onClick={() => handleGenerateSecurePassword()}
            >
              Generate Secure Password
            </button>
          </div>
        </div>
      </form>
    </div>
  
  )
}

export default PasswordForm