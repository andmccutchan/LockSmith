// Dashboard.jsx
import React from "react";
import PasswordForm from "../components/PasswordForm";
import PasswordList from "../components/PasswordList";

function Dashboard() {
  return (
    <div>
      <h1 className="text-center mt-5">Dashboard</h1>
      <PasswordForm />
      <PasswordList />
    </div>
  )
}

export default Dashboard;
