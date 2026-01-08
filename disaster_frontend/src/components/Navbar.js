"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import NotificationBell from "../pages/NotificationBell"

const Navbar = ({ darkMode, toggleTheme, onLogout }) => {
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50
      setScrolled(isScrolled)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = () => {
    onLogout()
    navigate("/")
  }

  return (
    <nav
      className={`navbar navbar-expand-lg sticky-top ${scrolled ? "navbar-scrolled" : ""} ${darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"}`}
    >
      <div className="container">
        <Link className="navbar-brand fw-bold fs-3" to="/dashboard" style={{ color: "#DC2626" }}>
          🚨 JanSanket
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/report">
                Report
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/shelters">
                Shelters
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/volunteers">
                Volunteers
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/pricing">
                Pricing
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            <NotificationBell/>
            <button className="btn btn-outline-secondary me-2" onClick={toggleTheme} title="Toggle Theme">
              {darkMode ? "☀️" : "🌙"}
            </button>
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
