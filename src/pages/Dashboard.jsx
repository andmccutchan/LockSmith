// Dashboard.jsx
import React from "react";

function Home() {
  return (
    <div className="container-xl d-flex border">
      <div className="container-lg">
        <div className="container-md">
          <h1 className="text-center border">Left</h1>
        </div>
        <div className="container-md">
          <h1 className="text-center border">Middle</h1>
        </div>
        <div className="container-md">
          <h1 className="text-center border">Right</h1>
        </div>
      </div>
    </div>
  )
}

export default Home;
