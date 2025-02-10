import React, { useState } from 'react'
import PasswordInfo from './PasswordInfo'
import PasswordForm from './PasswordForm'

function PasswordList() {
  const [passwords, setPasswords] = useState([]);

  const addPassword = (newEntry) => {
    setPasswords([...passwords, newEntry]);
  }
  return (
    <div className='container border border-3 border-dark rounded m-2 p-3'>
      {passwords.map((entry, index) => (
        <PasswordInfo 
          key={index} 
          website={entry.website} 
          username={entry.username} 
          password={entry.password} 
        />
      ))}
    </div>
  )
}

export default PasswordList