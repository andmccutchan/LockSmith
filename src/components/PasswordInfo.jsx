import React, { useRef, useState } from 'react'

function PasswordInfo({website, username, password}) {
    const [isVisible, setIsVisible] = useState(false);
    const [userIsCopied, setUserIsCopied] = useState(false);
    const [passwordIsCopied, setPasswordIsCopied] = useState(false);
    const [viewCard, setViewCard] = useState(false);
    const [validUrl, setValidUrl] = useState("")
    const faviconUrl = `${new URL(website).origin}/favicon.ico`;
    const globeIcon = "https://img.icons8.com/?size=100&id=3685&format=png&color=000000"

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
    <>
        {viewCard ? (
            <div className='bg-secondary-subtle p-3 rounded my-2'>
                <div className='d-flex align-item-center'>
                    <div className='d-flex align-items-center border border-primary'>
                        <img src={faviconUrl} width="32" height="32" alt="" className='me-2' />
                        <h2>{website}</h2>
                    </div>
                    <div className='d-flex justify-content-end align-items-center border border-danger'>
                        <i className="fa-regular fa-pen-to-square"></i>
                    </div>
                </div>
                <hr />
                <div>
                    <label className='form-label p-0 m-0' htmlFor="username">Username</label>
                    <div className='d-flex'>
                        <input className='form-control border-0 shadow-none p-0 bg-transparent mb-3' name='username' type="text" value={username} readonly/>
                        {userIsCopied ? (
                            <p className='text-success'>Copied</p>
                        ) : (
                            <button className='btn btn-primary' onClick={handleUserCopy}>Copy</button>
                        )}
                    </div>
                </div>
                <div>
                    <label className='form-label p-0 m-0' htmlFor="username">Password</label>
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
        ) : (
            <div className='d-flex p-2 my-1' onClick={() => setViewCard(true)}> 
                <img className='mx-2 border-0' src={faviconUrl} width="24" height="24" onError={(e) => e.target.src = globeIcon} />
                <div className='d-flex flex-column'>
                    <p className='m-0 p-0'>{website}</p>
                    <p className='m-0 fw-lighter user-pass-info'>{username}</p>
                </div>
            </div>
        )}
    </>
  )
}

export default PasswordInfo