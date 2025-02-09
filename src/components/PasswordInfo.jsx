import React, { useRef, useState } from 'react'

function PasswordInfo({username, password}) {
    const [isVisible, setIsVisible] = useState(false);
    const [userIsCopied, setUserIsCopied] = useState(false);
    const [passwordIsCopied, setPasswordIsCopied] = useState(false);

    const toggleVisibilityOn = () => {
        setIsVisible(true);
    }

    const toggleVisibilityOff = () => {
        setIsVisible(false);
    }

    const handleUserCopy = async () => {
        try {
            await navigator.clipboard.writeText(username);
            setUserIsCopied(true);
            setPasswordIsCopied(false);
        } catch (err) {
            console.log("Failed to copy text: ", err);
        }
    }

    const handlePasswordCopy = async () => {
        try {
            await navigator.clipboard.writeText(password);
            setPasswordIsCopied(true);
            setUserIsCopied(false);
        } catch (err) {
            console.log("Failed to copy text: ", err);
        }
    }

  return (
    <div className='bg-secondary-subtle p-3 rounded'>
        <div>
            <label className='form-label' htmlFor="username">Username</label>
            <div className='d-flex'>
                <input className='form-control border-0 shadow-none p-0 bg-transparent' name='username' type="text" value={username} readonly/>
                {userIsCopied ? (
                    <p className='text-success'>Copied</p>
                ) : (
                    <button className='btn btn-primary' onClick={handleUserCopy}>Copy</button>
                )}
            </div>
        </div>
        <div>
            <label className='form-label' htmlFor="username">Password</label>
            <div className='d-flex'>
                <input className='form-control border-0 shadow-none p-0 bg-transparent' name='password' type={isVisible ? "text" : "password"} value={password} readOnly />
                {isVisible ? (
                    <button className='btn border-0' onClick={toggleVisibilityOff}><i className="fa-regular fa-eye-slash"></i></button>
                ) : (
                    <button className='btn border-0' onClick={toggleVisibilityOn}><i className="fa-regular fa-eye"></i></button>
                )}
                {passwordIsCopied ? (
                    <p className='text-success'>Copied</p>
                ) : (
                    <button className='btn btn-primary' onClick={handlePasswordCopy}>Copy</button>
                )}
                
            </div>
        </div>
    </div>
  )
}

export default PasswordInfo