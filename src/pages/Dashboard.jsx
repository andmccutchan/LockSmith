// Dashboard.jsx
import React, { useState } from "react";
import PasswordForm from "../components/PasswordForm";
import PasswordInfo from "../components/PasswordInfo";

function Dashboard() {
  const [passwordInfo, setPasswordInfo] = useState([]);

  const addPassword = (newPassword) => {
    setPasswordInfo([...passwordInfo, newPassword])
  }

  const deletePassword = (website) => {
    setPasswordInfo(passwordInfo.filter((entry) => entry.website !== website));
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
