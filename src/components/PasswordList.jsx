import React from 'react'
import PasswordInfo from './PasswordInfo'

function PasswordList() {
  return (
    <div className='container border border-3 border-dark rounded m-2 p-3'>
        <PasswordInfo website="https://www.youtube.com/" username="mccutc_a1" password="securePassword" />
        <PasswordInfo website="https://chatgpt.com/" username="andmccutchan" password="password" />
        <PasswordInfo website="https://expressjs.com/" username="andmccutchan" password="password" />
    </div>
  )
}

export default PasswordList