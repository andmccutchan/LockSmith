import React, { useState } from 'react'
import { motion } from 'framer-motion';

function PasswordInfo({website, username, password}) {
    const [isVisible, setIsVisible] = useState(false);
    const [userIsCopied, setUserIsCopied] = useState(false);
    const [passwordIsCopied, setPasswordIsCopied] = useState(false);
    const [viewCard, setViewCard] = useState(false);
    const faviconUrl = `${new URL(website).origin}/favicon.ico`;
    const globeIcon = "https://img.icons8.com/?size=100&id=3685&format=png&color=000000";

    const handleCloseCard = () => {
        setViewCard(false);
        setPasswordIsCopied(false);
        setUserIsCopied(false)
    }
    const handleOpenCard = () => setViewCard(true);

    const toggleVisibility = () => setIsVisible(prev => !prev);

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

    const handleFaviconError = (e) => {
        e.target.src = globeIcon;
    };
    

  return (
    <>
        {viewCard ? (
            <motion.div className="p-3 rounded my-2">
                <div className='d-flex align-item-center justify-content-between'>
                    <div className='d-flex align-items-center'>
                        <img src={faviconUrl} width="24" height="24" alt="" className='me-2' onError={handleFaviconError}  />
                        <p>{website}</p>
                    </div>
                    <div className='d-flex justify-content-end align-items-center'>
                        <button className='btn border-0'><i className="fa-solid fa-trash"></i></button>
                        <button className='btn border-0'><i className="fa-regular fa-pen-to-square"></i></button>
                        <button className='btn border-0'><i className="fa-solid fa-minus" onClick={handleCloseCard}></i></button>
                    </div>
                </div>
                <hr />
                <div>
                    <label className='form-label p-0 m-0' htmlFor="username">Username</label>
                    <div className='d-flex'>
                        <input className='form-control border-0 shadow-none p-0 bg-transparent mb-3' name='username' type="text" value={username} readOnly/>
                        {userIsCopied ? (
                            <button className='btn btn-success'>Copied</button>
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
                            <button className='btn border-0' onClick={toggleVisibility}><i className="fa-regular fa-eye-slash"></i></button>
                        ) : (
                            <button className='btn border-0' onClick={toggleVisibility}><i className="fa-regular fa-eye"></i></button>
                        )}
                        {passwordIsCopied ? (
                            <button className='btn btn-success'>Copied</button>
                        ) : (
                            <button className='btn btn-primary' onClick={handlePasswordCopy}>Copy</button>
                        )}
                        
                    </div>
                </div>
            </motion.div>
        ) : (
            <div className="d-flex justify-content-between my-1"> 
                <div className='d-flex p-0'>
                    <img className='mx-2 border-0' src={faviconUrl} width="24" height="24" onError={handleFaviconError} />
                    <div className='d-flex flex-column'>
                        <p className='m-0 p-0'>{website}</p>
                        <p className='m-0 fw-lighter user-pass-info'>{username}</p>
                    </div>
                </div>
                <div>
                    <button className='btn border-0'><i className="fa-solid fa-plus" onClick={handleOpenCard}></i></button>
                </div>
            </div>
        )}
    </>
  )
}

export default PasswordInfo