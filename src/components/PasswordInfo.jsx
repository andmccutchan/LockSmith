import React from 'react'

function PasswordInfo() {
  return (
    <div>
        <label className='form-label' htmlFor="username">Username</label>
        <input className='form-control' type="text" />
        <button className='btn'>Copy</button>
    </div>
  )
}

export default PasswordInfo