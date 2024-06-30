import React from 'react'
import './Navbar.css'
import navlogo from '../Assets/mmart-logo.jpg'
// import navlogo from '../Assets/nav-logo.svg'
import navprofileIcon from '../Assets/nav-profile.svg'

const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={navlogo} className='nav-logo' alt="" />
      <h1 style={{
        marginLeft:"20px"
      }}>MODERN MART</h1>
    </div>
  )
}

export default Navbar
