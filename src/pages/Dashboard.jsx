// Dashboard.jsx
import React, { useState, useEffect } from "react";
import PasswordForm from "../components/PasswordForm";
import PasswordInfo from "../components/PasswordInfo";
import axios from "axios";
import InfoBox from "../components/InfoBox";

function Dashboard() {
  const [passwordInfo, setPasswordInfo] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const token = localStorage.getItem("token");
        
        if (!token) {
          console.error("No token found in local storage");
        }

        // console.log("Token found:", token)
        
        const response = await axios.get("http://localhost:5001/api/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        setPasswordInfo(response.data); // Set the password data
      } catch (err) {
        console.error("Error fetching passwords:", err.response ? err.response.data : err);
      }
    };
  
    fetchPasswords();
  }, []);
  

  const addPassword = async (newPassword) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5001/api/dashboard", newPassword, { 
        headers: { Authorization: `Bearer ${token}` }
      });
      // console.log("Password being added:", newPassword);
      
      setPasswordInfo((prevPasswords) => [...prevPasswords, newPassword]);
      setModalOpen(false)
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
      setPasswordInfo(passwordInfo.filter((entry) => entry._id !== id));
    } catch (err) {
      console.error("Error deleting password", err);
    }
  }
  
  return (
    <>
      <div className="d-flex flex-grow-1 w-100">
        <div className='container rounded p-3 my-2 ms-2 mb-1 overflow-auto border passwords-list flex-grow-1 shadow bg-body'>
          <div className="d-flex flex-column h-100">
            <h3 className="mb-3">Accounts</h3>
              {passwordInfo.map((entry, index) => (
                <PasswordInfo
                  key={index}
                  website={entry.website}
                  username={entry.username}
                  password={entry.password}
                  onDelete={() => deletePassword(entry._id)}
                />
              ))}
          </div>
        </div>
        <div className="container-fluid d-flex flex-column border rounded shadow p-3 m-2 mb-1 bg-body">
          <div className="d-flex align-items center">
            <h3>Dashboard</h3>
            <div className="d-flex w-100 justify-content-end">
              <button className="btn btn-primary mx-1">Add Tag</button>
              <button className="btn btn-primary mx-1">Create Group</button>
              <button className='btn btn-primary ms-1' onClick={() => setModalOpen(true)}><i className="fa-solid fa-plus me-2"></i>New Item</button>
            </div>
            <PasswordForm addPassword={addPassword} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard;
