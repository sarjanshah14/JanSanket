"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const LandingPage = ({ isAuthenticated }) => {
  const [stats, setStats] = useState({
    disasters: 0,
    shelters: 0,
    volunteers: 0,
  });

  useEffect(() => {
    const animateCounter = (key, finalValue) => {
      let current = 0;
      const increment = finalValue / 100;
      const timer = setInterval(() => {
        current += increment;
        if (current >= finalValue) {
          current = finalValue;
          clearInterval(timer);
        }
        setStats((prev) => ({ ...prev, [key]: Math.floor(current) }));
      }, 20);
    };

    animateCounter("disasters", 247);
    animateCounter("shelters", 1834);
    animateCounter("volunteers", 5692);
  }, []);

  return (
    <div className="landing-page bg-dark text-light">
      {/* HERO SECTION */}
      <section
        className="hero-section position-relative"
        style={{ overflow: "hidden", minHeight: "100vh" }}
      >
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.25,
            zIndex: 0,
          }}
        >
          <source src="/videos/firefighter.mp4" type="video/mp4" />
        </video>

        {/* Dark Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(31, 41, 55, 0.4)",
            zIndex: 1,
          }}
        />

        {/* Main Hero Content */}
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row align-items-center min-vh-100">
            <div className="col-lg-9 text-white mx-auto text-center">
              <h1 className="display-2 fw-bold mb-1">JanSanket</h1>
              <p className="lead mb-4 fs-4">
                Real-time disaster reporting & volunteer coordination platform.
                Connect communities, coordinate response, and save lives
                together.
              </p>
              <div className="d-flex flex-wrap justify-content-center gap-3">
                <Link
                  to={isAuthenticated ? "/dashboard" : "/auth"}
                  className="btn btn-light btn-lg px-4 py-3"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-5 bg-dark text-light">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <div className="card h-100 border-0 shadow-lg bg-dark text-light">
                <div className="card-body p-4">
                  <div className="display-4 mb-3">🚨</div>
                  <h3 className="stats-counter text-danger">
                    {stats.disasters}
                  </h3>
                  <h5>Active Disasters</h5>
                  <p className="text-muted">
                    Real-time monitoring and reporting
                  </p>
                  <Link to="/report" className="btn btn-outline-danger btn-sm">
                    Report Disaster
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card h-100 border-0 shadow-lg bg-dark text-light">
                <div className="card-body p-4">
                  <div className="display-4 mb-3">🏠</div>
                  <h3 className="stats-counter text-primary">
                    {stats.shelters}
                  </h3>
                  <h5>Verified Shelters</h5>
                  <p className="text-muted">Safe havens for those in need</p>
                  <Link
                    to="/shelters"
                    className="btn btn-outline-primary btn-sm"
                  >
                    Find Shelters
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card h-100 border-0 shadow-lg bg-dark text-light">
                <div className="card-body p-4">
                  <div className="display-4 mb-3">👥</div>
                  <h3 className="stats-counter text-success">
                    {stats.volunteers}
                  </h3>
                  <h5>Registered Volunteers</h5>
                  <p className="text-muted">Heroes ready to help</p>
                  <Link
                    to="/volunteer-application"
                    className="btn btn-outline-success btn-sm"
                  >
                    Join Volunteers
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-5 bg-dark text-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-4 fw-bold mb-3">How JanSanket Works</h2>
            <p className="lead">
              Simple, fast, and effective disaster response coordination
            </p>
          </div>

          <div className="row">
            <div className="col-lg-4 mb-4">
              <div className="card h-100 border-0 shadow-lg bg-dark text-light">
                <div className="card-body p-4">
                  <div className="display-4 mb-3">📱</div>
                  <h4>Report Disasters</h4>
                  <p>
                    Quickly report emergencies with location, photos, and
                    details. Every second counts.
                  </p>
                  <div className="badge bg-danger mb-3">URGENT</div>
                  <div className="d-grid">
                    <Link to="/report" className="btn btn-danger btn-sm">
                      Start Reporting
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 mb-4">
              <div className="card h-100 border-0 shadow-lg bg-dark text-light">
                <div className="card-body p-4">
                  <div className="display-4 mb-3">🤝</div>
                  <h4>Coordinate Volunteers</h4>
                  <p>
                    Connect with local volunteers and organizations ready to
                    provide immediate assistance.
                  </p>
                  <div className="badge bg-success mb-3">AVAILABLE</div>
                  <div className="d-grid">
                    <Link to="/volunteers" className="btn btn-success btn-sm">
                      Find Volunteers
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 mb-4">
              <div className="card h-100 border-0 shadow-lg bg-dark text-light">
                <div className="card-body p-4">
                  <div className="display-4 mb-3">🏥</div>
                  <h4>Find Safe Shelters</h4>
                  <p>
                    Locate verified emergency shelters with real-time capacity
                    and contact information.
                  </p>
                  <div className="badge bg-primary mb-3">VERIFIED</div>
                  <div className="d-grid">
                    <Link to="/shelters" className="btn btn-primary btn-sm">
                      Locate Shelters
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section
        className="py-5 text-white"
        style={{
          background: "linear-gradient(135deg, #DC2626 0%, #2563EB 100%)",
        }}
      >
        <div className="container text-center">
          <h2 className="display-4 fw-bold mb-3">
            Join the mission. Help communities recover faster.
          </h2>
          <p className="lead mb-4">
            Be part of a global network of first responders, volunteers, and
            community heroes.
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <Link to="/auth" className="btn btn-light btn-lg px-5 py-3">
              🚀 Get Started Today
            </Link>
            <Link
              to="/volunteer-application"
              className="btn btn-outline-light btn-lg px-5 py-3"
            >
              🤝 Become a Volunteer
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-5 bg-dark text-light">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h5 className="fw-bold mb-3" style={{ color: "#DC2626" }}>
                🚨 JanSanket
              </h5>
              <p>Connecting communities in times of crisis.</p>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="d-flex justify-content-md-end">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon me-2"
                >
                  📘
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon me-2"
                >
                  🐦
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon me-2"
                >
                  📷
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                >
                  💼
                </a>
              </div>
            </div>
          </div>
          <hr className="my-4" />
          <div className="text-center">
            <p className="mb-0">
              &copy; 2024 JanSanket. All rights reserved. Made with ❤️ for
              safer communities.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;