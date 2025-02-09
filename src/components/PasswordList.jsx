import React from 'react'
import PasswordInfo from './PasswordInfo'

function PasswordList() {
  return (
    <div className='container border border-3 border-dark rounded m-2 p-3'>
        <PasswordInfo username="mccutc_a1" password="securePassword" />
    </div>
  )
}

export default PasswordList