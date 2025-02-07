import React from 'react'

function LoginCard() {
  return (
    <div className='card p-3 mx-auto w-25 bg-dark text-light my-5 py-4'>
        <div>
            <h2 className='text-center my-2'>PassWorks Login</h2>
        </div>
        <div class="mb-3">
            <label for="userEmail" className="form-label">Username</label>
            <input type="text" className="form-control" id="userEmail" placeholder="Username" />
        </div>
        <div>
            <label for="inputPassword5" className="form-label">Password</label>
            <input type="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock" placeholder='Password' />
            <div id="passwordHelpBlock" className="form-text text-light">
                Your password must be 8-20 characters long
            </div>
        </div>
        <button type="submit" className="btn btn-secondary mt-3">Login</button>
    </div>
  )
}

export default LoginCard