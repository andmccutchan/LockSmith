// Dashboard.jsx
import React, { useState, useEffect } from "react";
import PasswordForm from "../components/PasswordForm";
import PasswordInfo from "../components/PasswordInfo";
import { AnimatePresence, motion } from 'framer-motion';
import axios from "axios";

function Dashboard() {
  const [passwordInfo, setPasswordInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addingPassword, setAddingPassword] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const token = localStorage.getItem("token");
        
        if (!token)  throw new Error("No token found in local storage");
              
        const response = await axios.get("http://localhost:5001/api/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        setPasswordInfo(response.data); // Set the password data
      } catch (err) {
        console.error("Error fetching passwords:", err.response ? err.response.data : err);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchPasswords();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);  // Step 2: Update the search term
  };

  const filteredPasswords = passwordInfo.filter(entry => 
    entry.website.toLowerCase().includes(searchTerm.toLowerCase()) || 
    entry.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  const addPassword = async (newPassword) => {
    try {
      const token = localStorage.getItem("token");

      if (!token)  throw new Error("No token found in local storage");

      const res = await axios.post("http://localhost:5001/api/dashboard", newPassword, { 
        headers: { Authorization: `Bearer ${token}` }
      });    

      console.log("Added password response:", res.data);
      
      setPasswordInfo((prevPasswords) => [...prevPasswords, res.data]);
    } catch (err) {
      console.error("Error submitting form", err);
    }
  }

  const deletePassword = async (id) => {
    try {
      const token = localStorage.getItem("token");
      // Send DELETE request to backend with the website as the parameter
      await axios.delete(`http://localhost:5001/api/dashboard/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      // Remove the password from the frontend state (UI)
      setPasswordInfo((prevPasswords) => prevPasswords.filter((entry) => entry._id !== id));
    } catch (err) {
      console.error("Error deleting password", err);
    }
  }

  const handleAddingPassoword = () => setAddingPassword(true);
  const closePassword = () => setAddingPassword(false);
  
  return (
    isLoading ? (
      <div className="d-flex w-100 align-items-center justify-content-center">
        <div className="spinner-border d-flex justify-content-center text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      ) : (
      <>
        <div className="d-flex flex-grow-1 w-100">
          <div className='d-flex rounded w-50 p-3 my-2 ms-2 mb-1 border passwords-list flex-grow-1 shadow bg-body mh-100'>
            <div className="d-flex flex-column mh-100 w-100">
              <h3 className="mb-3">Accounts</h3>
              <input
                className="form-control mb-3"
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}  
                placeholder="Search by website or username"
              /> 
              {filteredPasswords.length > 0 ? (
                filteredPasswords.map((entry) => (
                  <PasswordInfo
                    key={entry._id}
                    website={entry.website}
                    username={entry.username}
                    password={entry.password}
                    onDelete={() => deletePassword(entry._id)}
                  />
                ))
              ) : (
                <p className="text-center fw-light">App passwords to see them here...</p>
              )}
            </div>
          </div>
          <div className="d-flex w-50 rounded shadow p-3 m-2 mb-1 bg-body">
            <div className="d-flex flex-column w-100 align-items-start">
              <div className="d-flex w-100 justify-content-between">
                <h3>Dashboard</h3>
                <button className='btn btn-primary ms-1' onClick={handleAddingPassoword}>
                  <i className="fa-solid fa-plus me-2"></i>New Item
                </button>
              </div>
              <div className="d-flex w-100">
                <AnimatePresence>
                  {addingPassword ? (
                    
                      <motion.div
                        className="w-100"
                        initial={{ y: -5, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -5, opacity: 0 }}
                        transition={{ duration: 0.15, ease: "easeInOut" }}
                      >
                        <PasswordForm addPassword={addPassword} closePassword={closePassword} />
                      </motion.div>
                  ) : (
                    null
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  )
}

export default Dashboard;
