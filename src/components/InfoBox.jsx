import React from "react";

function InfoBox({ color }) {
  return (
    <div
      className={`d-flex flex-column justify-content-center align-items-center w-100 border bg-${color} rounded`}
    >
      <h3>12 Passwords</h3>
    </div>
  );
}

export default InfoBox;
