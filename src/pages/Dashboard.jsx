// Dashboard.jsx
import React, { useState, useEffect } from "react";
import PasswordForm from "../components/PasswordForm";
import PasswordInfo from "../components/PasswordInfo";
import axios from "axios";

function Dashboard() {
  const [passwordInfo, setPasswordInfo] = useState([]);
  const [savedPasswords, setSavedPasswords] = useState([]);

  useEffect(() => {
    const fetchPasswords = async () => {
        try {
            const userId = localStorage.getItem("userId");
            if (!userId) return;

            const response = await axios.get(`http://localhost:5001/api/dashboard/${userId}`);
            setSavedPasswords(response.data);
        } catch (error) {
            console.error("Error fetching passwords:", error.response.data);
        }
    };

    fetchPasswords();
  }, []);

  const addPassword = async (newPassword) => {
    setPasswordInfo([...passwordInfo, newPassword])
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      if (!token || !userId) return;

      await axios.post("http://localhost:5001/api/dashboard", {
        ...newPassword,
        userId
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Password saved successfully");
    } catch (err) {
      console.err("Error saving password:", err.response.data);
    }
  }

  const deletePassword = async (website) => {
    setPasswordInfo(passwordInfo.filter((entry) => entry.website !== website));
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.delete(`http://localhost:5001/api/dashboard/${website}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSavedPasswords((prev) => prev.filter((entry) => entry.website !== website));
    } catch (err) {
      console.error("Error deleting password:", err.response?.data || err.message);
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
