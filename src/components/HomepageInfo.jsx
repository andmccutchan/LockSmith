import React from 'react'

function HomepageInfo() {
  return (
    <div className='d-flex flex-column w-100 text-dark bg-light p-3 align-items-center rounded shadow mb-3'>
        <div>
            <h3 className='text-center'>Secure & Simple Password Management</h3>
            <ul className="list-unstyled">
                <li><i className="fa-solid fa-arrow-right me-2 text-primary"></i><span className='fw-bold'>Store & Organize - </span>Keep all your passwords in one secure place.</li>
                <li><i className="fa-solid fa-arrow-right me-2 text-primary"></i><span className='fw-bold'>Encrypted Security - </span>Your data is encrypted to ensure maximum protection.</li>
                <li><i className="fa-solid fa-arrow-right me-2 text-primary"></i><span className='fw-bold'>Easy Access - </span>Quickly retrieve login credentials when you need them.</li>
                <li><i className="fa-solid fa-arrow-right me-2 text-primary"></i><span className='fw-bold'>Auto-Fill Support - </span>Copy and paste your credentials with one click.</li>
            </ul>
        </div>
    </div>
  )
}

export default HomepageInfo