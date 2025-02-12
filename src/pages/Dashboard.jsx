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
        const response = await axios.get("http://localhost:5001/api/dashboard", {
          headers: {Authorization: `Bearer ${token}`}
        });
        setPasswordInfo(response.data);
      } catch (err) {
        console.error("Error fetching passwords", err);
      }
    };
  
    fetchPasswords();
  }, []);
  

  const addPassword = async (newPassword) => {
    console.log("Password being added:", newPassword)
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:5001/api/dashboard", newPassword, { 
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("Response:", response);
      setPasswordInfo((prevPasswords) => [...prevPasswords, newPassword]);
    } catch (err) {
      console.error("Error submitting form", err);
    }
  }

  const deletePassword = async (website) => {
    try {
      const token = localStorage.getItem("token");
      // Send DELETE request to backend with the website as the parameter
      await axios.delete("http://localhost:5001/api/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
        data: { website }, // Sending website in the request body
      });
  
      // Remove the password from the frontend state (UI)
      setPasswordInfo(passwordInfo.filter((entry) => entry.website !== website));
    } catch (err) {
      console.error("Error deleting password", err);
    }
  }
  
  
  return (
    <div className="container border border-3 border-dark mt-5">
      <h1 className="mt-5 mx-4">Dashboard</h1>
      <div className="container d-flex">
        <PasswordForm addPassword={addPassword} />
        <div className='container rounded m-2 p-3'>
          {passwordInfo.map((entry, index) => (
            <PasswordInfo
              key={index}
              website={entry.website}
              username={entry.username}
              password={entry.password}
              onDelete={() => deletePassword(entry.website)}
            />
          ))}
      </div>
      </div>
    </div>
  )
}

export default Dashboard;
