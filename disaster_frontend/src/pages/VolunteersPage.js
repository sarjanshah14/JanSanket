"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Logistics from '../assets/roles/customer-service.png'
import Communication from '../assets/roles/phone-call.png'
import SearchRescue from '../assets/roles/helicopter.png'
import Medical from '../assets/roles/surgeon.png'
import Mental from '../assets/roles/brain.png'
import Transportation from '../assets/roles/school-bus.png'
import Shelter from '../assets/roles/house.png'
import Technical from '../assets/roles/chat.png'


const VolunteersPage = ({ darkMode }) => {
  /* ──────────────────────────────────────────────────────────
     1️⃣ State
  ────────────────────────────────────────────────────────── */
  const [volunteers, setVolunteers] = useState([])    // ⬅️ now starts empty
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [filterAvailability, setFilterAvailability] = useState("all")
  const navigate = useNavigate()

  /* ──────────────────────────────────────────────────────────
     2️⃣ Fetch volunteers from Django API (once, on mount)
  ────────────────────────────────────────────────────────── */
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/volunteers/")
      .then((res) => setVolunteers(res.data))
      .catch((err) => console.error("Error fetching volunteers:", err))
  }, [])

  /* ──────────────────────────────────────────────────────────
     3️⃣ Static list of roles for the filter dropdown
         (keep this unless you want to build it dynamically)
  ────────────────────────────────────────────────────────── */
  const roles = [
    "Medical Professional",
    "Search & Rescue",
    "Communications",
    "Logistics",
    "Mental Health Support",
    "Transportation",
    "Shelter Management",
    "Technical Support",
  ]
  const roleImages = {
    "Technical Support": Technical,
    "Logistics": Logistics,
    "Medical Professional": Medical,
    "Transportation": Transportation,
    "Shelter Management": Shelter,
    "Search & Rescue": SearchRescue,
    "Communications": Communication,
    "Mental Health Support": Mental,
  };


  /* ──────────────────────────────────────────────────────────
     4️⃣ Derived helpers (unchanged)
  ────────────────────────────────────────────────────────── */
  const filteredVolunteers = volunteers.filter((volunteer) => {
    const matchesSearch =
      volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === "all" || volunteer.role === filterRole
    const matchesAvailability =
      filterAvailability === "all" || volunteer.availability === filterAvailability
    return matchesSearch && matchesRole && matchesAvailability
  })

  const getAvailabilityBadge = (availability) => {
    const value = availability?.toLowerCase();

    switch (value) {
      case "available":
        return { text: "Available", class: "bg-success" };
      case "on-call":
        return { text: "On Call", class: "bg-warning text-dark" };
      case "unavailable":
        return { text: "Unavailable", class: "bg-danger" };
      default:
        return { text: "Unknown", class: "bg-secondary" };
    }
  };


  const getAvailabilityStats = () => {
    const available = volunteers.filter((v) => v.availability === "available").length;
    const onCall = volunteers.filter((v) => v.availability === "on-call").length;
    const unavailable = volunteers.filter((v) => v.availability === "unavailable").length;
    return { available, onCall, unavailable };
  };


  const handleContactVolunteer = (volunteer) => {
    if (volunteer.availability === "offline") {
      alert("This volunteer is currently offline and cannot be contacted.")
      return
    }
    const message = `Hello ${volunteer.name}, I found your profile on JanSanket and would like to connect regarding emergency response coordination.`
    window.location.href = `mailto:${volunteer.contact}?subject=JanSanket Contact Request&body=${encodeURIComponent(
      message,
    )}`
  }

  const handleCallVolunteer = (volunteer) => {
    if (volunteer.availability === "offline") {
      alert("This volunteer is currently offline and cannot be contacted.")
      return
    }
    window.location.href = `tel:${volunteer.phone}`
  }

  const handleViewProfile = (volunteer) => {
    alert(
      `Viewing detailed profile for ${volunteer.name}\n\nRole: ${volunteer.role}\nExperience: ${volunteer.experience}\nLocation: ${volunteer.location}\nSpecialization: ${volunteer.specialization}`,
    )
  }

  const stats = getAvailabilityStats()

  /* ──────────────────────────────────────────────────────────
     5️⃣ JSX (identical to your original)
  ────────────────────────────────────────────────────────── */
  return (
    <div className={`volunteers-page py-4 ${darkMode ? "bg-dark text-light" : "bg-light"}`}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5 animate-fade-in">
          <h1 className="display-5 fw-bold mb-3">👥 Emergency Volunteers</h1>
          <p className="lead text-muted">
            Connect with trained volunteers ready to help during emergencies and disasters.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="row mb-4 animate-fade-in-up">
          <div className="col-md-4 mb-3">
            <div className="card card-hover border-0 shadow-lg">
              <div className="card-body text-center p-4">
                <div className="display-4 mb-2">✅</div>
                <h3 className="text-success">{stats.available}</h3>
                <h6 className="text-muted">Available Now</h6>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card card-hover border-0 shadow-lg">
              <div className="card-body text-center p-4">
                <div className="display-4 mb-2">⏳</div>
                <h3 className="text-warning">{stats.onCall}</h3>
                <h6 className="text-muted">On Call</h6>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card card-hover border-0 shadow-lg">
              <div className="card-body text-center p-4">
                <div className="display-4 mb-2">🚫</div>
                <h3 className="text-danger">{stats.unavailable}</h3>
                <h6 className="text-muted">Unavailable</h6>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="card border-0 shadow-lg mb-4 animate-slide-in-left">
          <div className="card-body p-4">
            <div className="row">
              <div className="col-md-6 mb-3">
                <div className="input-group">
                  <span className="input-group-text">🔍</span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search volunteers by name, role, or specialization..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <select className="form-select" value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
                  <option value="all">All Roles</option>
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-3 mb-3">
                <select
                  className="form-select"
                  value={filterAvailability}
                  onChange={(e) => setFilterAvailability(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="available">Available</option>
                  <option value="on-call">On Call</option>
                  <option value="unavailable">Unavailable</option>

                </select>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-muted">
                Showing {filteredVolunteers.length} of {volunteers.length} volunteers
              </span>
              <button className="btn btn-success btn-sm" onClick={() => navigate("/volunteer-application")}>
                🚀 Become a Volunteer
              </button>
            </div>
          </div>
        </div>

        {/* Volunteers Grid */}
        <div className="row">
          {filteredVolunteers.map((volunteer, index) => (
            <div key={volunteer.id} className="col-lg-6 mb-4">
              <div
                className={`card card-hover h-100 border-0 shadow-lg animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="card-body p-4">
                  {/* Header */}
                  <div className="d-flex align-items-start mb-3">
                    <div className="me-3">
                      <div
                        className="rounded-circle overflow-hidden d-flex align-items-center justify-content-center bg-light"
                        style={{ width: "60px", height: "60px" }}
                      >
                        <img
                          src={roleImages[volunteer.role] } // fallback if role not found
                          alt={volunteer.role}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>

                    </div>
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h5 className="mb-1 fw-bold">{volunteer.name}</h5>
                          <p className="text-muted mb-1">{volunteer.role}</p>
                          <small className="text-muted">{volunteer.specialization}</small>
                        </div>
                        <span className={`badge ${getAvailabilityBadge(volunteer.availability).class}`}>
                          {getAvailabilityBadge(volunteer.availability).text}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="mb-3">
                    <div className="row text-sm">
                      <div className="col-6 mb-2">
                        <strong>📍 Location:</strong>
                        <br />
                        <small className="text-muted">{volunteer.location}</small>
                      </div>
                      <div className="col-6 mb-2">
                        <strong>⏱️ Experience:</strong>
                        <br />
                        <small className="text-muted">{volunteer.experience}</small>
                      </div>
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="mb-3">
                    <strong className="small">🏆 Certifications:</strong>
                    <div className="d-flex flex-wrap gap-1 mt-1">
                      {volunteer.certifications.map((cert, idx) => (
                        <span key={idx} className="badge bg-secondary small">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="mb-3">
                    <strong className="small">🌐 Languages:</strong>
                    <div className="d-flex flex-wrap gap-1 mt-1">
                      {volunteer.languages.map((lang, idx) => (
                        <span key={idx} className="badge bg-info small">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact Actions */}
                  <div className="d-grid gap-2 d-md-flex">
                    <button
                      className="btn btn-primary btn-sm flex-fill"
                      disabled={volunteer.availability === "unavailable"}
                      onClick={() => handleContactVolunteer(volunteer)}
                    >
                      📧 Contact
                    </button>
                    <button
                      className="btn btn-outline-primary btn-sm flex-fill"
                      disabled={volunteer.availability === "unavailable"}
                      onClick={() => handleCallVolunteer(volunteer)}
                    >
                      📞 Call
                    </button>
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => handleViewProfile(volunteer)}>
                      ℹ️ Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredVolunteers.length === 0 && (
          <div className="text-center py-5 animate-fade-in">
            <div className="display-1 mb-3">🔍</div>
            <h3>No volunteers found</h3>
            <p className="text-muted">Try adjusting your search criteria or filters.</p>
            <button
              className="btn btn-primary"
              onClick={() => {
                setSearchTerm("")
                setFilterRole("all")
                setFilterAvailability("all")
              }}
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="card border-0 shadow-lg mt-5 animate-fade-in-up">
          <div className="card-body p-5 text-center">
            <h3 className="mb-3">🚀 Join Our Volunteer Network</h3>
            <p className="lead mb-4">
              Make a difference in your community. Join thousands of volunteers helping during emergencies.
            </p>
            <div className="row justify-content-center">
              <div className="col-md-8">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="card bg-light border-0">
                      <div className="card-body p-3">
                        <h6 className="fw-bold">📋 Requirements</h6>
                        <ul className="list-unstyled small mb-0">
                          <li>• 18+ years old</li>
                          <li>• Background check</li>
                          <li>• Basic training completion</li>
                          <li>• Commitment to help</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="card bg-light border-0">
                      <div className="card-body p-3">
                        <h6 className="fw-bold">🎯 Benefits</h6>
                        <ul className="list-unstyled small mb-0">
                          <li>• Free training & certification</li>
                          <li>• Flexible scheduling</li>
                          <li>• Community impact</li>
                          <li>• Networking opportunities</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  className="btn btn-success btn-lg btn-animated px-5"
                  onClick={() => navigate("/volunteer-application")}
                >
                  🚀 Apply to Volunteer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VolunteersPage
