/* eslint-disable no-unused-vars */
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'


const AuthPage = ({ darkMode, setIsAuthenticated, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()


  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }


  const validateForm = () => {
    const newErrors = {}

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = "Username is required"
    } else if (formData.username.length < 6) {
      newErrors.username = "Username must be at least 6 characters"
    } else if (/\s/.test(formData.username)) {
      newErrors.username = "Username cannot contain spaces"
    }

    // Email validation (only for signup)
    if (!isLogin) {
      if (!formData.email.trim()) {
        newErrors.email = "Email is required"
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email format is invalid"
      }
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password = "Password must contain at least one uppercase letter"
    } else if (!/(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number"
    } else if (!/(?=.*[@$!%*?&])/.test(formData.password)) {
      newErrors.password = "Password must contain at least one special character (@$!%*?&)"
    }

    // Confirm Password validation (only for signup)
    if (!isLogin) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Confirm Password is required"
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }



  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      if (isLogin) {
        // LOGIN
        const res = await axios.post("http://127.0.0.1:8000/api/token/", {
          username: formData.username,
          password: formData.password,
        })

        const token = res.data.access
        localStorage.setItem("token", token)
        setIsAuthenticated(true)
        onLogin({ username: formData.username })
        navigate("/dashboard")
      } else {
        // SIGNUP
        const res = await axios.post("http://127.0.0.1:8000/api/register/", {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        })
        alert("Account created successfully. Please log in.")
        setIsLogin(true)
      }
    } catch (err) {
      alert("Authentication failed. Please try again.")
      console.error(err)
    }
  }


  const handleForgotPassword = () => {
    const email = prompt("Enter your email address:")
    if (email) alert(`Password reset link sent to ${email}`)
  }


  return (
    <div className={`min-vh-100 d-flex align-items-center ${darkMode ? "bg-dark" : "bg-light"}`}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card shadow-lg border-0 rounded-4 overflow-hidden animate-fade-in">
              <div className="row g-0">
                {/* Left Section */}
                <div
                  className="col-lg-6 d-flex align-items-center"
                  style={{ background: "linear-gradient(135deg, #DC2626 0%, #2563EB 100%)", color: "white" }}
                >
                  <div className="p-5 text-center">
                    <h1 className="display-4 fw-bold mb-4 animate-slide-in-left">Welcome to JanSanket</h1>
                    <p className="lead mb-4 animate-slide-in-left">
                      Join thousands of heroes making a difference in emergency response and community safety.
                    </p>
                    <div className="row text-center animate-fade-in-up">
                      <div className="col-4">
                        <div className="h2 fw-bold">24/7</div>
                        <small>Emergency Response</small>
                      </div>
                      <div className="col-4">
                        <div className="h2 fw-bold">5K+</div>
                        <small>Active Volunteers</small>
                      </div>
                      <div className="col-4">
                        <div className="h2 fw-bold">247</div>
                        <small>Lives Saved</small>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Section */}
                <div className={`col-lg-6 ${darkMode ? "bg-dark text-light" : "bg-white"}`}>
                  <div className="p-5">
                    <div className="d-flex mb-4">
                      <button
                        className={`btn flex-fill me-2 ${isLogin ? "btn-primary" : "btn-outline-primary"}`}
                        onClick={() => setIsLogin(true)}
                      >
                        Login
                      </button>
                      <button
                        className={`btn flex-fill ${!isLogin ? "btn-primary" : "btn-outline-primary"}`}
                        onClick={() => setIsLogin(false)}
                      >
                        Sign Up
                      </button>
                    </div>

                    <form onSubmit={handleSubmit} className="animate-fade-in">
                      <h3 className="mb-4 text-center">{isLogin ? "🔐 Welcome Back!" : "🚀 Join JanSanket"}</h3>

                      {/* Username */}
                      <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                          Username {isLogin ? "or Email" : ""}
                        </label>
                        <input
                          type="text"
                          className={`form-control ${errors.username ? "is-invalid" : ""}`}
                          id="username"
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
                          placeholder="Enter your username"
                        />
                        {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                      </div>

                      {/* Email (Signup only) */}
                      {!isLogin && (
                        <div className="mb-3">
                          <label htmlFor="email" className="form-label">Email</label>
                          <input
                            type="email"
                            className={`form-control ${errors.email ? "is-invalid" : ""}`}
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                          />
                          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>
                      )}

                      {/* Password */}
                      <div className="mb-3 position-relative">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="input-group">
                          <input
                            type={showPassword ? "text" : "password"}
                            className={`form-control ${errors.password ? "is-invalid" : ""}`}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter your password"
                          />
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? "🙈" : "👁️"}
                          </button>
                          {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
                        </div>

                        {/* Show rules only on Signup */}
                        {!isLogin && (
                          <ul className="small text-muted mt-2 mb-0">
                            <li>At least 6 characters</li>
                            <li>At least one uppercase letter</li>
                            <li>At least one number</li>
                            <li>At least one special character (@$!%*?&)</li>
                          </ul>
                        )}
                      </div>

                      {/* Confirm Password (Signup only) */}
                      {!isLogin && (
                        <div className="mb-3 position-relative">
                          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                          <div className="input-group">
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                              id="confirmPassword"
                              name="confirmPassword"
                              value={formData.confirmPassword}
                              onChange={handleInputChange}
                              placeholder="Confirm your password"
                            />
                            <button
                              type="button"
                              className="btn btn-outline-secondary"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? "🙈" : "👁️"}
                            </button>
                          </div>
                          {errors.confirmPassword && <div className="invalid-feedback d-block">{errors.confirmPassword}</div>}
                        </div>
                      )}

                      {/* Submit Button */}
                      <button type="submit" className="btn btn-primary w-100 btn-lg btn-animated mb-3">
                        {isLogin ? "🔓 Login" : "🚀 Create Account"}
                      </button>

                      {/* Forgot Password / Terms */}
                      <div className="text-center">
                        {isLogin ? (
                          <p className="mb-0">
                            <button
                              type="button"
                              className="btn btn-link text-decoration-none p-0"
                              onClick={handleForgotPassword}
                            >
                              Forgot Password?
                            </button>
                          </p>
                        ) : (
                          <p className="mb-0 small text-muted">
                            By signing up, you agree to our{" "}
                            <button
                              type="button"
                              className="btn btn-link text-decoration-none p-0 small"
                              onClick={() => navigate("/privacy")}
                            >
                              Terms of Service and Privacy Policy
                            </button>.
                          </p>
                        )}
                      </div>
                    </form>

                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
