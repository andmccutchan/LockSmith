// Home.jsx
import React from "react";
import HomepageInfo from "../components/HomepageInfo";
import KeyFeatures from "../components/KeyFeatures";

function Home() {
  return (
    <>
      <div className="d-flex w-100 mx-auto p-5">
        <div className="d-flex flex-column w-50">
          <h1 className="fw-medium text-light hero-title">Forget your passwords</h1>
          <h2 className="text-light mt-3">Because LockSmith won't.</h2>
        </div>
        <div className="d-flex flex-column">
          <HomepageInfo />
          <KeyFeatures />
        </div>
      </div>
    </>
  )
}

export default Home;
