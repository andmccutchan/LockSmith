import React, { useState } from 'react'
import PasswordInfo from './PasswordInfo'

function PasswordList() {
  const [passwords, setPasswords] = useState([]);

  const addPassword = (newEntry) => {
    setPasswords([...passwords, newEntry]);
  }
  return (
    <div className='container rounded m-2 p-3'>
        <PasswordInfo website="https://www.youtube.com/" username="mccutc_a1" password="securePassword" />
        <PasswordInfo website="https://www.google.com/" username="mccutc_a1" password="securePassword" />
        <PasswordInfo website="https://fontawesome.com/" username="mccutc_a1" password="securePassword" />
        <PasswordInfo website="https://x.com/" username="mccutc_a1" password="securePassword" />
    </div>
  )
}

export default PasswordList