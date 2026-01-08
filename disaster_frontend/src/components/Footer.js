import { Link } from "react-router-dom"

const Footer = ({ darkMode }) => {
  return (
    <footer className={`py-5 ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>
      <div className="container">
        <hr className="my-4" />
        <div className="row">
          {/* Brand + About */}
          <div className="col-lg-4 mb-4">
            <h5 className="fw-bold" style={{ color: "#DC2626" }}>
              🚨 JanSanket
            </h5>
            <p className="mb-3">
              Real-time disaster reporting and volunteer coordination platform. Helping communities prepare, respond,
              and recover faster.
            </p>
            <div className="d-flex">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="me-3 text-decoration-none text-reset"
              >
                <i className="bi bi-facebook fs-4"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="me-3 text-decoration-none text-reset"
              >
                <i className="bi bi-twitter fs-4"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="me-3 text-decoration-none text-reset"
              >
                <i className="bi bi-instagram fs-4"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none text-reset"
              >
                <i className="bi bi-linkedin fs-4"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/dashboard" className="text-decoration-none">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/report" className="text-decoration-none">
                  Report Disaster
                </Link>
              </li>
              <li>
                <Link to="/shelters" className="text-decoration-none">
                  Find Shelters
                </Link>
              </li>
              <li>
                <Link to="/volunteers" className="text-decoration-none">
                  Volunteers
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-decoration-none">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="fw-bold mb-3">Support</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/about" className="text-decoration-none">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-decoration-none">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-decoration-none">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-decoration-none">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-4 mb-4">
            <h6 className="fw-bold mb-3">Contact Information</h6>
            <p className="mb-2">📧 support@jansanket.in</p>
            <p className="mb-2">📞 Toll-Free: 1800-123-4357 (HELP)</p>
            <p className="mb-2">📱 National Disaster Helpline: 1078</p>
            <p className="mb-2">📍 JanSanket HQ, Near Riverfront, Ashram Road, Ahmedabad - 380009</p>
            <p className="mb-0">🕒 24x7 Emergency Response</p>
          </div>
        </div>

        <hr className="my-4" />

        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="mb-0">&copy; 2024 JanSanket. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="mb-0">Made with ❤️ for safer communities</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
