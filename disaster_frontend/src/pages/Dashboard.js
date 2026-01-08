/* eslint-disable no-unused-vars */
"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import DisasterMapSection from './DisasterMapSection'
import axios from 'axios'
import { Card } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

const Dashboard = ({ darkMode }) => {
  const [stats, setStats] = useState({
    totalDisasters: 30,
    verifiedShelters: 100,
    registeredVolunteers: 20,
    activeReports: 23,
  })

  const [disasterReports, setDisasterReports] = useState([])

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/disasters/")
      .then((response) => {
        const sorted = response.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        setDisasterReports(sorted)
      })
      .catch((error) => {
        console.error("Error fetching disaster reports:", error)
      })
  }, [])

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case "Critical": return "bg-danger"
      case "High": return "bg-warning"
      case "Moderate": return "bg-info"
      case "Low": return "bg-secondary"
      default: return "bg-secondary"
    }
  }

  return (
    <>
      <div className={`dashboard-page py-4 ${darkMode ? "bg-dark text-light" : "bg-light"}`}>
        <div className="container">
          {/* Header */}
          <div className="row mb-4 animate-fade-in">
            <div className="col-md-8">
              <h1 className="display-5 fw-bold mb-2">📊 Emergency Dashboard</h1>
              <p className="lead text-muted">Real-time disaster monitoring and response coordination</p>
            </div>
            <div className="col-md-4 text-md-end">
              <Link
                to="/report"
                className="btn-report-fab"
              >
                🚨
              </Link>
            </div>

          </div>

          {/* Map Section */}
          <DisasterMapSection />

          {/* Disaster Reports Section (Carousel Style) */}
          <div className="row mb-4">
            <div className="col-lg-12 mb-4">
              <h4 className="mb-3 text-center">📋 Recent Disaster Reports</h4>
              <div className="disaster-carousel">
                <div className="disaster-track">
                  {disasterReports.map((report, idx) => (
                    <Card key={idx} className="disaster-card rounded-4 shadow-sm border-1">
                      <Card.Body className="d-flex flex-column">
                        {/* Reporter */}
                        <div className="d-flex align-items-center mb-2">
                          <div
                            className="rounded-circle d-flex align-items-center justify-content-center me-2"
                            style={{
                              width: 40,
                              height: 40,
                              color: "white",
                              fontWeight: "bold",
                              fontSize: "16px",
                              backgroundImage:
                                "linear-gradient(135deg, rgb(180, 0, 0) 0%, rgb(255, 80, 80) 100%)",
                            }}
                          >
                            {report.type.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h6 className="mb-0 fw-bold">{report.reported_by || "Unknown"}</h6>
                            <small className="text-muted">
                              {new Date(report.timestamp).toLocaleDateString()}
                            </small>
                          </div>
                        </div>

                        {/* ✅ Severity + Type beside each other */}
                        <div className="mb-2 d-flex align-items-center justify-content-start gap-2">
                          <span className={`badge ${getSeverityBadge(report.severity_level)} px-3 py-1`}>
                            {report.severity_level}
                          </span>
                          <span className="fw-semibold">{report.type}</span>
                        </div>

                        {/* Location */}
                        <Card.Text className="mb-1">
                          <strong>📍 Location:</strong> {report.address}
                        </Card.Text>

                        {/* Description */}
                        <Card.Text className="disaster-description mb-0">
                          {report.description.length > 120
                            ? `${report.description.substring(0, 120)}...`
                            : report.description}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  ))}

                  {/* Duplicate for infinite loop */}
                  {disasterReports.map((report, idx) => (
                    <Card key={`dup-${idx}`} className="disaster-card rounded-4 border-1">
                      <Card.Body className="d-flex flex-column">
                        <div className="d-flex align-items-center mb-2">
                          <div
                            className="rounded-circle d-flex align-items-center justify-content-center me-2"
                            style={{
                              width: 40,
                              height: 40,
                              color: "white",
                              fontWeight: "bold",
                              fontSize: "16px",
                              backgroundImage:
                                "linear-gradient(135deg, rgb(180, 0, 0) 0%, rgb(255, 80, 80) 100%)",
                            }}
                          >
                            {report.type.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h6 className="mb-0 fw-bold">{report.reported_by || "Unknown"}</h6>
                            <small className="text-muted">
                              {new Date(report.timestamp).toLocaleDateString()}
                            </small>
                          </div>
                        </div>

                        <div className="mb-2 d-flex align-items-center justify-content-start gap-2">
                          <span className={`badge ${getSeverityBadge(report.severity_level)} px-3 py-1`}>
                            {report.severity_level}
                          </span>
                          <span className="fw-semibold">{report.type}</span>
                        </div>

                        <Card.Text className="mb-1">
                          <strong>📍 Location:</strong> {report.address}
                        </Card.Text>
                        <Card.Text className="disaster-description mb-0">
                          {report.description.length > 120
                            ? `${report.description.substring(0, 120)}...`
                            : report.description}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Stats Cards */}
          <div className="row animate-fade-in-up">
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="card card-hover h-100 border-0 shadow-lg">
                <div className="card-body text-center p-4">
                  <div className="display-4 mb-3">🚨</div>
                  <h3 className="stats-counter text-danger">{stats.totalDisasters}</h3>
                  <h6 className="text-muted">Total Disasters</h6>
                  <small className="text-success">↑ 12% from last month</small>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="card card-hover h-100 border-0 shadow-lg">
                <div className="card-body text-center p-4">
                  <div className="display-4 mb-3">🏠</div>
                  <h3 className="stats-counter text-primary">{stats.verifiedShelters}</h3>
                  <h6 className="text-muted">Verified Shelters</h6>
                  <small className="text-success">↑ 8% from last month</small>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="card card-hover h-100 border-0 shadow-lg">
                <div className="card-body text-center p-4">
                  <div className="display-4 mb-3">👥</div>
                  <h3 className="stats-counter text-success">{stats.registeredVolunteers}</h3>
                  <h6 className="text-muted">Active Volunteers</h6>
                  <small className="text-success">↑ 15% from last month</small>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="card card-hover h-100 border-0 shadow-lg">
                <div className="card-body text-center p-4">
                  <div className="display-4 mb-3">📋</div>
                  <h3 className="stats-counter text-warning">{stats.activeReports}</h3>
                  <h6 className="text-muted">Active Reports</h6>
                  <small className="text-danger">↑ 23% from yesterday</small>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Dashboard
