// Dashboard.jsx
import React from "react";
import PasswordForm from "../components/PasswordForm";
import PasswordList from "../components/PasswordList";

function Dashboard() {
  return (
    <div className="container">
      <h1 className="mt-5 mx-4">Dashboard</h1>
      <div className="container d-flex">
        <PasswordList />
        <PasswordForm />
      </div>
    </div>
  )
}

export default Dashboard;
