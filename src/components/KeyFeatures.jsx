import React from "react";

function KeyFeatures() {
  return (
    <div className="d-flex flex-column w-100 text-dark bg-light p-3 align-items-center rounded shadow mb-3">
      <div>
        <h3 className="text-center">Key Features</h3>
        <ul className="list-unstyled">
          <li>
            <i className="fa-solid fa-check me-2 text-success"></i>
            <span className="fw-bold">Create & Save Passwords - </span>Store
            credentials for multiple websites.
          </li>
          <li>
            <i className="fa-solid fa-check me-2 text-success"></i>
            <span className="fw-bold">Edit & Update - </span>Easily update
            passwords when needed.
          </li>
          <li>
            <i className="fa-solid fa-check me-2 text-success"></i>
            <span className="fw-bold">Search & Filter - </span>Quickly find the
            login details you need.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default KeyFeatures;
