import React from 'react'

function PasswordForm() {
  return (
    <div className='container'>
        <form>
          <div>
            <label htmlFor="websitePassword">Website/App Name</label>
            <input type="text" name="website" id="websitePassword" />
          </div>
          <div>
            <label htmlFor="username">Username/Email</label>
            <input type="text" name="username" id="username" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
          </div>
          <button className='btn bg-primary text-light' type='submit'>Add Password</button>
        </form>
    </div>
    
  )
}

export default PasswordForm