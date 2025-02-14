// Dashboard.jsx
import React, { useState, useEffect } from "react";
import PasswordForm from "../components/PasswordForm";
import PasswordInfo from "../components/PasswordInfo";
import axios from "axios";

function Dashboard() {
  const [passwordInfo, setPasswordInfo] = useState([]);

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
          <div className='container rounded m-2 p-3 overflow-auto border passwords-list flex-grow-1 shadow'>
            <h3>Accounts</h3>
            <hr />
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
          <div className="container-fluid d-flex m-2 border rounded shadow p-3">
            <h3>Dashboard</h3>
            <hr />
            {/* <PasswordForm addPassword={addPassword} /> */}
          </div>
        </div>
      </>
  )
}

export default Dashboard;
