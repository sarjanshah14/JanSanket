import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VolunteerApplicationPage = ({ darkMode, user }) => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    specialization: "",
    contact: user?.email || "",
    phone: "",
    availability: "",
    location: "",
    experience: "",
    certifications: [],
    languages: [],
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const certificationOptions = [
    "Ham Radio",
    "FEMA ICS",
    "Disaster Management",
    "First Aid/CPR",
    "Fire Safety",
    "Community Emergency Response",
    "Emergency Medical Technician",
    "Psychological First Aid",
  ];

  const languageOptions = [
    "English",
    "Hindi",
    "Gujarati",
    "Marathi",
    "Bengali",
    "Tamil",
    "Telugu",
    "Kannada",
    "Punjabi",
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      if (type === "checkbox") {
        const updatedArray = checked
          ? [...prev[name], value]
          : prev[name].filter((item) => item !== value);
        return { ...prev, [name]: updatedArray };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.contact.trim()) newErrors.contact = "Email is required";
    if (!formData.phone.match(/^[0-9]{10}$/))
      newErrors.phone = "Phone must be 10 digits";
    if (!formData.role) newErrors.role = "Role is required";
    if (!formData.availability) newErrors.availability = "Availability is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("❌ You must be logged in to submit the form.");
        setIsSubmitting(false);
        return;
      }

      // Join arrays to comma-separated strings (optional if your backend expects strings)
      const payload = {
        ...formData,
        certifications: formData.certifications,
        languages: formData.languages,
      };

      // eslint-disable-next-line no-unused-vars
      const response = await axios.post(
        "http://127.0.0.1:8000/api/volunteer/register/",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("✅ Application submitted successfully!");
      navigate("/volunteers");
    } catch (error) {
      console.error("🛑 Submit error:", error.response?.data || error.message);

      const errorMsg =
        error.response?.data?.detail ||
        error.response?.data?.non_field_errors?.[0] ||
        JSON.stringify(error.response?.data) ||
        "Submission failed. Please try again.";
      alert(`❌ ${errorMsg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`volunteer-application-page py-4 ${darkMode ? "bg-dark text-light" : "bg-light"}`}>
      <div className="container">
        <h1 className="text-center mb-4">🤝 Volunteer Application</h1>
        <form onSubmit={handleSubmit} className="card p-4 shadow-lg">
          <div className="mb-3">
            <label className="form-label fw-bold">Full Name *</label>
            <input
              type="text"
              name="name"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Role *</label>
            <select
              name="role"
              className={`form-select ${errors.role ? "is-invalid" : ""}`}
              value={formData.role}
              onChange={handleInputChange}
            >
              <option value="">Select role</option>
              <option value="Communications">Communications</option>
              <option value="Search & Rescue">Search & Rescue</option>
              <option value="Medical Professional">Medical Professional</option>
              <option value="Mental Health Support">Mental Health Support</option>
              <option value="Transportation">Transportation</option>
              <option value="Shelter Management">Shelter Management</option>
              <option value="Technical Support">Technical Support</option>
              <option value="Logistics">Logistics</option>
            </select>
            {errors.role && <div className="invalid-feedback">{errors.role}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Specialization</label>
            <input
              type="text"
              name="specialization"
              className="form-control"
              value={formData.specialization}
              onChange={handleInputChange}
            />
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label fw-bold">Email *</label>
              <input
                type="email"
                name="contact"
                className={`form-control ${errors.contact ? "is-invalid" : ""}`}
                value={formData.contact}
                onChange={handleInputChange}
              />
              {errors.contact && <div className="invalid-feedback">{errors.contact}</div>}
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold">Phone *</label>
              <input
                type="tel"
                name="phone"
                className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                value={formData.phone}
                onChange={handleInputChange}
              />
              {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Availability *</label>
            <select
              name="availability"
              className={`form-select ${errors.availability ? "is-invalid" : ""}`}
              value={formData.availability}
              onChange={handleInputChange}
            >
              <option value="">Select availability</option>
              <option value="available">Available</option>
              <option value="on-call">On Call</option>
              <option value="unavailable">Unavailable</option>
            </select>
            {errors.availability && <div className="invalid-feedback">{errors.availability}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Location *</label>
            <input
              type="text"
              name="location"
              className={`form-control ${errors.location ? "is-invalid" : ""}`}
              value={formData.location}
              onChange={handleInputChange}
            />
            {errors.location && <div className="invalid-feedback">{errors.location}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Experience</label>
            <input
              type="text"
              name="experience"
              className="form-control"
              value={formData.experience}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Certifications</label>
            <div className="row">
              {certificationOptions.map((cert) => (
                <div className="col-md-6" key={cert}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="certifications"
                      value={cert}
                      checked={formData.certifications.includes(cert)}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label">{cert}</label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Languages</label>
            <div className="row">
              {languageOptions.map((lang) => (
                <div className="col-md-4" key={lang}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="languages"
                      value={lang}
                      checked={formData.languages.includes(lang)}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label">{lang}</label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="d-flex justify-content-end mt-4">
            <button type="submit" className="btn btn-success" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </button>
          </div>
        </form>

        <div className="row mt-5">
          <div className="col-md-4 mb-4">
            <div className="card card-hover border-0 shadow h-100">
              <div className="card-body p-4 text-center">
                <div className="display-4 mb-3">📋</div>
                <h5 className="fw-bold">Application Process</h5>
                <p className="text-muted">Complete application → Background check → Training → Active volunteer</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card card-hover border-0 shadow h-100">
              <div className="card-body p-4 text-center">
                <div className="display-4 mb-3">🎓</div>
                <h5 className="fw-bold">Free Training</h5>
                <p className="text-muted">Comprehensive training programs and certifications provided at no cost</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card card-hover border-0 shadow h-100">
              <div className="card-body p-4 text-center">
                <div className="display-4 mb-3">🌟</div>
                <h5 className="fw-bold">Make Impact</h5>
                <p className="text-muted">Join thousands of volunteers making a real difference in communities</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerApplicationPage;
