//PasswordInfo.jsx
import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';

function PasswordInfo({website, username, password, onDelete}) {
    const [isVisible, setIsVisible] = useState(false);
    const [userIsCopied, setUserIsCopied] = useState(false);
    const [passwordIsCopied, setPasswordIsCopied] = useState(false);
    const [viewCard, setViewCard] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [originalUsername, setOriginalUsername] = useState(username);
    const [originalPassword, setOriginalPassword] = useState(password);
    const [editedUsername, setEditedUsername] = useState(username);
    const [editedPassword, setEditedPassword] = useState(password);
    
    const faviconUrl = `${new URL(website).origin}/favicon.ico`;
    const globeIcon = "https://img.icons8.com/?size=100&id=3685&format=png&color=000000";

    const handleCloseCard = () => {
        setViewCard(false);
        setPasswordIsCopied(false);
        setUserIsCopied(false);
        setIsEditing(false);
        setEditedUsername(originalUsername);
        setEditedPassword(originalPassword);
    }

    const handleOpenCard = () => setViewCard(true);
    const toggleVisibility = () => setIsVisible(prev => !prev);

    const handleEditClick = () => {
        setIsEditing(true);
        setEditedUsername(originalUsername);
        setEditedPassword(originalPassword);
        setUserIsCopied(false);
        setPasswordIsCopied(false);
    };

    const handleSave = () => {
        setOriginalUsername(editedUsername);
        setOriginalPassword(editedPassword);
        setIsEditing(false);
        setUserIsCopied(false);
        setPasswordIsCopied(false);
    };

    const handleCancel = () => {
        setEditedUsername(originalUsername);
        setEditedPassword(originalPassword);
        setIsEditing(false);
        setUserIsCopied(false);
        setPasswordIsCopied(false);
    }

    const handleUserCopy = async () => {
        try {
            await navigator.clipboard.writeText(editedUsername);
            setUserIsCopied(true);
            setPasswordIsCopied(false);
        } catch (err) {
            console.log("Failed to copy text: ", err);
        }
    }

    const handlePasswordCopy = async () => {
        try {
            await navigator.clipboard.writeText(editedPassword);
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
        <div className="d-flex justify-content-between my-1"> 
            <motion.div className='d-flex p-0' whileHover={{
                scale: 1.05,
                transition: { duration: 0.1 },
            }}>
                <img className='mx-2 border-0' src={faviconUrl} width="24" height="24" onError={handleFaviconError} />
                <div className='d-flex flex-column'>
                    <p className='m-0 p-0'>{website}</p>
                    <p className='m-0 fw-lighter user-pass-info'>{username}</p>
                </div>
            </motion.div>
            <div className='d-flex align-item-center justify-content-between'>
                {!viewCard ? (
                    <button className='btn border-0'><i className="fa-solid fa-plus" onClick={handleOpenCard}></i></button>
                ) : (
                    <motion.div 
                        className='d-flex justify-content-end align-items-center'
                        key="buttons"
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 20, opacity: 0 }}  
                        transition={{ duration: 0.3, ease: "easeInOut" }}  
                    >
                            {isEditing ? (
                                <>
                                    <button className='btn mx-2 border-0' onClick={handleCancel}>Cancel</button>
                                    <button className='btn btn-primary border-0'>Save</button>
                                </>
                            ) : (
                                    <>
                                        <button className='btn border-0' onClick={onDelete}><i className="fa-solid fa-trash"></i></button>
                                        <button className='btn border-0' onClick={handleEditClick}><i className="fa-regular fa-pen-to-square"></i></button>
                                    </>
                                
                            )}
                        <button className='btn border-0'><i className="fa-solid fa-minus" onClick={handleCloseCard}></i></button>
                    </motion.div>
                )}
            </div>
        </div>
        <AnimatePresence>
            {viewCard && (
                <motion.div 
                    className="rounded my-2"
                    initial={{ opacity: 0, height: 0, y: -20 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                    <hr />
                    <div>
                        <label className='form-label p-0 m-0' htmlFor="username">Username</label>
                        <div className='d-flex'>
                            <input className='form-control border-0 shadow-none p-0 bg-transparent mb-3' name='username' type="text" value={editedUsername} readOnly={!isEditing} onChange={(e) => setEditedUsername(e.target.value)} />
                            {userIsCopied ? (
                                <button className='btn btn-success d-flex align-items-center'>Copied<i className="fa-solid fa-check ms-2"></i></button>
                            ) : (
                                <button className='btn btn-primary' onClick={handleUserCopy}>Copy</button>
                            )}
                        </div>
                    </div>
                    <div>
                        <label className='form-label p-0 m-0' htmlFor="username">Password</label>
                        <div className='d-flex'>
                            <input className='form-control border-0 shadow-none p-0 bg-transparent' name='password' type={isVisible ? "text" : "password"} value={editedPassword} readOnly={!isEditing} onChange={(e) => setEditedPassword(e.target.value)} />
                            {isVisible ? (
                                <button className='btn border-0' onClick={toggleVisibility}><i className="fa-regular fa-eye-slash"></i></button>
                            ) : (
                                <button className='btn border-0' onClick={toggleVisibility}><i className="fa-regular fa-eye"></i></button>
                            )}
                            {passwordIsCopied ? (
                                <button className='btn btn-success d-flex align-items-center'>Copied <i className="fa-solid fa-check ms-2"></i></button>
                            ) : (
                                <button className='btn btn-primary' onClick={handlePasswordCopy}>Copy</button>
                            )}
                            
                        </div>
                    </div>
                    <hr />
                </motion.div>
            )}
        </AnimatePresence>
    </>
  )
}

export default PasswordInfo