"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

const ReportPage = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    disasterType: "",
    description: "",
    address: "",
    severity: "",
    contactInfo: "",
    image: null,
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const disasterTypes = [
    "Earthquake", "Flood", "Fire", "Storm/Hurricane",
    "Tornado", "Landslide", "Tsunami", "Volcanic Eruption",
    "Drought", "Other"
  ]

  const severityLevels = [
    { value: "low", label: "Low - Minor damage, no immediate danger" },
    { value: "medium", label: "Medium - Moderate damage, some risk" },
    { value: "high", label: "High - Significant damage, immediate attention needed" },
    { value: "critical", label: "Critical - Life-threatening, emergency response required" },
  ]

  const handleInputChange = (e) => {
    const { name, value, files } = e.target
    if (name === "image") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }


  const validateForm = () => {
    const newErrors = {}

    if (!formData.disasterType) newErrors.disasterType = "Please select a disaster type"
    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters"
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required"
    }
    if (!formData.severity) newErrors.severity = "Please select severity level"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsSubmitting(true)

    const data = new FormData()
    data.append("type", formData.disasterType)
    data.append("severity_level", formData.severity)
    data.append("description", formData.description)
    data.append("address", formData.address)
    if (formData.image) data.append("image", formData.image)

    try {
      const response = await fetch("http://localhost:8000/api/disasters/report/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: data,
      })

      const result = await response.json()

      if (!response.ok) {
        console.error(result)
        alert("❌ Submission failed. Please fix errors and try again.")
        return
      }

      alert("✅ Disaster report submitted successfully.")
      navigate("/dashboard")
    } catch (err) {
      console.error(err)
      alert("⚠️ Something went wrong. Try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`report-page py-4 ${darkMode ? "bg-dark text-light" : "bg-light"}`}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="text-center mb-5 animate-fade-in">
              <h1 className="display-5 fw-bold mb-3">🚨 Report Emergency</h1>
              <p className="lead text-muted">
                Provide detailed information to help emergency responders act quickly and effectively.
              </p>
              <div className="alert alert-warning" role="alert">
                <strong>⚠️ Emergency?</strong> If this is a life-threatening emergency, call 911 immediately!
              </div>
            </div>

            <div className="card border-0 shadow-lg animate-fade-in-up">
              <div className="card-header bg-danger text-white p-4">
                <h4 className="mb-0">📋 Disaster Report Form</h4>
              </div>
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="disasterType" className="form-label fw-bold">
                        🏷️ Disaster Type *
                      </label>
                      <select
                        className={`form-select ${errors.disasterType ? "is-invalid" : ""}`}
                        id="disasterType"
                        name="disasterType"
                        value={formData.disasterType}
                        onChange={handleInputChange}
                      >
                        <option value="">Select disaster type...</option>
                        {disasterTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      {errors.disasterType && <div className="invalid-feedback">{errors.disasterType}</div>}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="severity" className="form-label fw-bold">
                        ⚠️ Severity Level *
                      </label>
                      <select
                        className={`form-select ${errors.severity ? "is-invalid" : ""}`}
                        id="severity"
                        name="severity"
                        value={formData.severity}
                        onChange={handleInputChange}
                      >
                        <option value="">Select severity...</option>
                        {severityLevels.map((level) => (
                          <option key={level.value} value={level.value}>{level.label}</option>
                        ))}
                      </select>
                      {errors.severity && <div className="invalid-feedback">{errors.severity}</div>}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="description" className="form-label fw-bold">
                      📝 Description *
                    </label>
                    <textarea
                      className={`form-control ${errors.description ? "is-invalid" : ""}`}
                      id="description"
                      name="description"
                      rows="4"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="What happened, who’s affected, how bad is it?"
                    ></textarea>
                    <div className="form-text">{formData.description.length}/500 characters</div>
                    {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="address" className="form-label fw-bold">
                      🗺️ Disaster Location (Address) *
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.address ? "is-invalid" : ""}`}
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="e.g., Near City Hospital, Ahmedabad"
                    />
                    <button value='Fetch location'>Fetch</button>
                    {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                  </div>


                  <div className="mb-3">
                    <label htmlFor="contactInfo" className="form-label fw-bold">
                      📞 Contact Information (Optional)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="contactInfo"
                      name="contactInfo"
                      value={formData.contactInfo}
                      onChange={handleInputChange}
                      placeholder="Phone or email (if follow-up needed)"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="image" className="form-label fw-bold">
                      📷 Upload Image (Optional)
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="image"
                      name="image"
                      accept="image/*"
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-danger btn-lg btn-animated" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Submitting Report...
                        </>
                      ) : (
                        "🚨 Submit Emergency Report"
                      )}
                    </button>
                    <button type="button" className="btn btn-outline-secondary" onClick={() => navigate("/dashboard")}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="card border-0 shadow-lg mt-4 animate-fade-in-up">
              <div className="card-header bg-warning text-dark p-3">
                <h5 className="mb-0">📞 Emergency Contacts</h5>
              </div>
              <div className="card-body p-3">
                <div className="row text-center">
                  <div className="col-md-3 mb-2">
                    <div className="d-flex align-items-center justify-content-center">
                      <span className="me-2">🚑</span>
                      <div><strong>Emergency</strong><br /><span className="text-danger">112</span></div>
                    </div>
                  </div>
                  <div className="col-md-3 mb-2">
                    <div className="d-flex align-items-center justify-content-center">
                      <span className="me-2">🚒</span>
                      <div><strong>Fire Dept</strong><br /><span className="text-danger">101</span></div>
                    </div>
                  </div>
                  <div className="col-md-3 mb-2">
                    <div className="d-flex align-items-center justify-content-center">
                      <span className="me-2">👮</span>
                      <div><strong>Police</strong><br /><span className="text-primary">100</span></div>
                    </div>
                  </div>
                  <div className="col-md-3 mb-2">
                    <div className="d-flex align-items-center justify-content-center">
                      <span className="me-2">🏥</span>
                      <div><strong>Hospital</strong><br /><span className="text-success">102</span></div>
                    </div>
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

export default ReportPage
