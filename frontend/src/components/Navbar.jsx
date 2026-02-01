// src/components/Navbar.jsx
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex gap-4">
      <Link to="/" className="hover:text-yellow-400">Menu Management</Link>
      <Link to="/dashboard" className="hover:text-yellow-400">Orders Dashboard</Link>
    </nav>
  )
}

export default Navbar
