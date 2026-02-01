// src/App.js
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import MenuManagement from './pages/MenuManagement'
import Dashboard from './pages/Dashboard'
import { MenuProvider } from './context/MenuContext'

function App() {
  return (
    <MenuProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<MenuManagement />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </MenuProvider>
  )
}

export default App

