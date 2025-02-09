import React from 'react'

function PasswordForm() {
  return (
    <div className='container border border-primary rounded m-2 p-3'>
        <form>
          <div>
            <label className='form-label' htmlFor="websitePassword">Website/App Name</label>
            <input className='form-control' type="text" name="website" id="websitePassword" />
          </div>
          <div>
            <label className='form-label' htmlFor="username">Username/Email</label>
            <input className='form-control' type="text" name="username" id="username" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input className='form-control' type="password" name="password" id="password" />
          </div>
          <button className='btn bg-primary text-light my-3' type='submit'>Add Password</button>
        </form>
    </div>
    
  )
}

export default PasswordForm