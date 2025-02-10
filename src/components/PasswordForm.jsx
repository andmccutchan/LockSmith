import React, { useState } from 'react'

function PasswordForm({ addPassword }) {
  const [formData, setFormData] = useState({
    website: '',
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.website || !formData.username || !formData.password) return;
    addPassword(formData);
    setFormData({website: '', username: '', password: ''});
    console.log(formData);
  }

  return (
    <div className='container border border-3 border-dark rounded m-2 p-3'>
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
          <input className='form-control' type="password" name="password" id="password" value={formData.password} onChange={handleChange} />
        </div>
        <button className='btn bg-primary text-light my-3' type='submit'>Add Password</button>
      </form>
    </div>
  
  )
}

export default PasswordForm