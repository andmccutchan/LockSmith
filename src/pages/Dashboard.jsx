// Dashboard.jsx
import React, { useState, useEffect } from "react";
import PasswordForm from "../components/PasswordForm";
import PasswordInfo from "../components/PasswordInfo";
import axios from "axios";
import InfoBox from "../components/InfoBox";
import { div, p } from "framer-motion/m";

function Dashboard() {
  const [passwordInfo, setPasswordInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
  

  const addPassword = async (newPassword) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:5001/api/dashboard", newPassword, { 
        headers: { Authorization: `Bearer ${token}` }
      });    

      console.log("Added password response:", res.data);
      
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
    isLoading ? (
        <div className="d-flex justify-content-center mt-5 text-light vh-100 w-100"><h1>LOADING</h1></div>
      ) : (
      <>
        <div className="d-flex flex-grow-1 w-100">
          <div className='container rounded p-3 my-2 ms-2 mb-1 overflow-auto border passwords-list flex-grow-1 shadow bg-body'>
            <div className="d-flex flex-column h-100">
              <h3 className="mb-3">Accounts</h3>
                {passwordInfo.map((entry, index) => (
                  <PasswordInfo
                    key={entry._id}
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
                <button className='btn btn-primary ms-1'><i className="fa-solid fa-plus me-2"></i>New Item</button>
              </div>
            </div>
              <PasswordForm addPassword={addPassword} />
          </div>
        </div>
      </>
    )
  )
}

export default Dashboard;
