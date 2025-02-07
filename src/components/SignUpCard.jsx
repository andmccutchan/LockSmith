import React from 'react'

function SignUpCard() {
  return (
    <div className='card p-3 mx-auto w-25 bg-dark text-light my-5 py-4'>
        <div>
            <h2 className='text-center my-2'>Create an account</h2>
        </div>
        <div class="mb-3">
            <label for="userEmail" className="form-label">Email</label>
            <input type="email" className="form-control" id="userEmail" placeholder="name@example.com" required />
        </div>
        <div class="mb-3">
            <label for="firstName" className="form-label">First name</label>
            <input type="text" className="form-control" id="firstName" placeholder="First name" required />
        </div>
        <div class="mb-3">
            <label for="lastName" className="form-label">Last name (optional)</label>
            <input type="text" className="form-control" id="lastName" placeholder="Last name" />
        </div>
        <div class="mb-3">
            <label for="user" className="form-label">Username</label>
            <input type="text" className="form-control" id="user" placeholder="Username" required />
        </div>
        <div>
            <label for="inputPassword5" className="form-label">Password</label>
            <input type="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock" placeholder='Password' required />
            <div id="passwordHelpBlock" className="form-text text-light">
                Your password must be 8-20 characters long
            </div>
        </div>
        <button type="submit" className="btn btn-secondary mt-3">Login</button>
    </div>
  )
}

export default SignUpCard