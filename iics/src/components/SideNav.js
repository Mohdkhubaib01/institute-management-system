import React from 'react'
import '../components/style.css'
import { Link, useLocation } from 'react-router-dom'

export const SideNav = () => {
  const location = useLocation();
  return (
    <div className='nav-container'>
      <div className='brand-container'>
        <img className='profile-logo' src={require('../assets/profile.png')} alt="brand-logo" />
        <div>
          <h3 className='brand-name'> IICS Management App</h3>
          <p className='brand-slogan'>Manage your App in easy way</p>
        </div>
      </div>
      <div className='menu-container'>
        <Link to='/dashboard/home' className={location.pathname === '/dashboard/home' ? 'menu-active-link' : 'menu-link'}><i className="fa-solid fa-house"></i>Home</Link>
        <Link to='/dashboard/course' className={location.pathname === '/dashboard/course' ? 'menu-active-link' : 'menu-link'}><i class="fa-solid fa-book"></i>All Courses</Link>
        <Link to='/dashboard/add-course' className={location.pathname === '/dashboard/add-course' ? 'menu-active-link' : 'menu-link'}><i class="fa-solid fa-plus"></i>Add Courses</Link>
        <Link to='/dashboard/students' className={location.pathname === '/dashboard/students' ? 'menu-active-link' : 'menu-link'}><i class="fa-solid fa-user-group"></i>All Student</Link>
        <Link to='/dashboard/add-student' className={location.pathname === '/dashboard/add-student' ? 'menu-active-link' : 'menu-link'}><i class="fa-solid fa-plus"></i>Addd Student</Link>
        <Link to='/dashboard/collect-fee' className={location.pathname === '/dashboard/collect-fee' ? 'menu-active-link' : 'menu-link'}><i class="fa-solid fa-money-bill"></i>Collect Fee</Link>
        <Link to='/dashboard/payment-history' className={location.pathname === '/dashboard/payment-history' ? 'menu-active-link' : 'menu-link'}><i class="fa-solid fa-list"></i>Payemnt History</Link>
      </div>
      <div className='contact-us'>
        <p><i class="fa-solid fa-address-card"></i>Contact Developer</p>
        <p><i class="fa-solid fa-phone"></i>8467870411</p>
      </div>
    </div>
  )
}

export default SideNav;