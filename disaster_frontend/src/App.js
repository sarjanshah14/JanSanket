"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "./App.css"

// Import components
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import LandingPage from "./pages/LandingPage"
import AuthPage from "./pages/AuthPage"
import Dashboard from "./pages/Dashboard"
import ReportPage from "./pages/ReportPage"
import SheltersPage from "./pages/SheltersPage"
import VolunteersPage from "./pages/VolunteersPage"
import VolunteerApplicationPage from "./pages/VolunteerApplicationPage"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import PricingPage from "./pages/PricingPage"
import HelpCenterPage from "./pages/HelpCenterPage"
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage"
import PartnershipsPage from "./pages/PartnershipsPage"
import SuccessPage from "./pages/SuccessPage"

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setDarkMode(savedTheme === "dark")
    }

    // Check for saved user session
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      setIsAuthenticated(true)
    }
  }, [])

  useEffect(() => {
    // Apply theme to document
    document.body.setAttribute("data-bs-theme", darkMode ? "dark" : "light")
    document.body.className = darkMode ? "bg-dark text-light" : "bg-light text-dark"
    localStorage.setItem("theme", darkMode ? "dark" : "light")
  }, [darkMode])

  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  const handleLogin = (userData) => {
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem("user", JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("user")
  }

  return (
    <Router>
      <div className={`App ${darkMode ? "dark-theme" : "light-theme"}`}>
        <Routes>
          <Route
            path="/"
            element={<LandingPage darkMode={darkMode} toggleTheme={toggleTheme} isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/auth"
            element={<AuthPage darkMode={darkMode} setIsAuthenticated={setIsAuthenticated} onLogin={handleLogin} />}
          />
          <Route
            path="/pricing"
            element={
              <>
                <Navbar darkMode={darkMode} toggleTheme={toggleTheme} onLogout={handleLogout} />
                <PricingPage darkMode={darkMode} />
                <Footer darkMode={darkMode} />
              </>
            }
          />
          <Route
            path="/dashboard"
            element={
              <>
                <Navbar darkMode={darkMode} toggleTheme={toggleTheme} onLogout={handleLogout} />
                <Dashboard darkMode={darkMode} user={user} />
                <Footer darkMode={darkMode} />
              </>
            }
          />
          <Route
            path="/report"
            element={
              <>
                <Navbar darkMode={darkMode} toggleTheme={toggleTheme} onLogout={handleLogout} />
                <ReportPage darkMode={darkMode} user={user} />
                <Footer darkMode={darkMode} />
              </>
            }
          />
          <Route
            path="/shelters"
            element={
              <>
                <Navbar darkMode={darkMode} toggleTheme={toggleTheme} onLogout={handleLogout} />
                <SheltersPage darkMode={darkMode} />
                <Footer darkMode={darkMode} />
              </>
            }
          />
          <Route
            path="/volunteers"
            element={
              <>
                <Navbar darkMode={darkMode} toggleTheme={toggleTheme} onLogout={handleLogout} />
                <VolunteersPage darkMode={darkMode} />
                <Footer darkMode={darkMode} />
              </>
            }
          />
          <Route
            path="/volunteer-application"
            element={
              <>
                <Navbar darkMode={darkMode} toggleTheme={toggleTheme} onLogout={handleLogout} />
                <VolunteerApplicationPage darkMode={darkMode} user={user} />
                <Footer darkMode={darkMode} />
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <Navbar darkMode={darkMode} toggleTheme={toggleTheme} onLogout={handleLogout} />
                <AboutPage darkMode={darkMode} />
                <Footer darkMode={darkMode} />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <Navbar darkMode={darkMode} toggleTheme={toggleTheme} onLogout={handleLogout} />
                <ContactPage darkMode={darkMode} />
                <Footer darkMode={darkMode} />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <Navbar darkMode={darkMode} toggleTheme={toggleTheme} onLogout={handleLogout} />
                <ContactPage darkMode={darkMode} />
                <Footer darkMode={darkMode} />
              </>
            }
          />
          <Route
            path="/success"
            element={
              <>
                <Navbar darkMode={darkMode} toggleTheme={toggleTheme} onLogout={handleLogout} />
                <SuccessPage darkMode={darkMode} />
                <Footer darkMode={darkMode} />
              </>
            }
          />
          <Route
            path="/help"
            element={
              <>
                <Navbar darkMode={darkMode} toggleTheme={toggleTheme} onLogout={handleLogout} />
                <HelpCenterPage darkMode={darkMode} />
                <Footer darkMode={darkMode} />
              </>
            }
          />
          <Route
            path="/privacy"
            element={
              <>
                <Navbar darkMode={darkMode} toggleTheme={toggleTheme} onLogout={handleLogout} />
                <PrivacyPolicyPage darkMode={darkMode} />
                <Footer darkMode={darkMode} />
              </>
            }
          />
          <Route
            path="/partnerships"
            element={
              <>
                <Navbar darkMode={darkMode} toggleTheme={toggleTheme} onLogout={handleLogout} />
                <PartnershipsPage darkMode={darkMode} />
                <Footer darkMode={darkMode} />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
