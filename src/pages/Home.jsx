// Home.jsx
import React from "react";
import HomepageInfo from "../components/HomepageInfo";
import KeyFeatures from "../components/KeyFeatures";
import MainHomeContent from "../components/MainHomeContent";

function Home() {
  return (
    <>
      <div className="container-fluid d-flex flex-column px-5 mt-5">
        <div className="d-flex row w-100 mx-auto justify-content-center">
          <div className="col-lg-6 col-md-12 d-flex flex-column align-items-center">
            <h1 className="fw-medium text-light hero-title hero-title">Forget your passwords</h1>
            <h3 className="text-light">Because LockSmith won't.</h3>
            <p className="text-light mt-4 border border-light rounded p-3">
            <span className="fw-bold">Why Choose LockSmith?</span><br />
            Say goodbye to the hassle of forgetting passwords and 
            managing multiple logins! LockSmith is designed to 
            simplify your online experience by securely storing and 
            organizing your passwords in one convenient place. 
            With our user-friendly interface, advanced security 
            features, and seamless access across devices, you can 
            focus on what matters most—your life—while we take care 
            of your passwords. Join the thousands of users who trust 
            LockSmith to keep their digital lives secure and easily 
            accessible!
            </p>
          </div>
          <div className="col-lg-6 col-md-12 d-flex flex-column">
            <HomepageInfo />
            <KeyFeatures />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
