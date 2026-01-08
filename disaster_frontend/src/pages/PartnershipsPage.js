"use client"

import { useState } from "react"

const PartnershipsPage = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    organizationName: "",
    contactName: "",
    email: "",
    phone: "",
    organizationType: "",
    partnershipType: "",
    description: "",
    website: "",
    size: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const partners = [
    {
      name: "American Red Cross",
      logo: "🏥",
      description: "National disaster relief and emergency assistance",
      partnership: "Official Relief Partner",
    },
    {
      name: "FEMA",
      logo: "🏛️",
      description: "Federal Emergency Management Agency",
      partnership: "Government Technology Partner",
    },
    {
      name: "United Nations OCHA",
      logo: "🌍",
      description: "UN Office for Coordination of Humanitarian Affairs",
      partnership: "International Coordination Partner",
    },
    {
      name: "Salvation Army",
      logo: "⛪",
      description: "Emergency disaster services and relief",
      partnership: "Community Response Partner",
    },
    {
      name: "Google.org",
      logo: "🔍",
      description: "Technology for social good initiatives",
      partnership: "Technology Innovation Partner",
    },
    {
      name: "Microsoft AI for Good",
      logo: "💻",
      description: "AI solutions for humanitarian challenges",
      partnership: "AI Technology Partner",
    },
  ]

  const partnershipTypes = [
    {
      type: "Technology Integration",
      description: "Integrate your systems with JanSanket APIs",
      benefits: ["Real-time data sharing", "Custom integrations", "Technical support"],
      icon: "🔧",
    },
    {
      type: "Relief Organization",
      description: "Partner with us to coordinate disaster response",
      benefits: ["Volunteer coordination", "Resource sharing", "Joint operations"],
      icon: "🤝",
    },
    {
      type: "Government Agency",
      description: "Official partnerships with government entities",
      benefits: ["Policy alignment", "Regulatory compliance", "Public sector integration"],
      icon: "🏛️",
    },
    {
      type: "Corporate Sponsor",
      description: "Support our mission through corporate partnerships",
      benefits: ["Brand visibility", "CSR alignment", "Employee engagement"],
      icon: "🏢",
    },
  ]

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

    if (!formData.organizationName.trim()) newErrors.organizationName = "Organization name is required"
    if (!formData.contactName.trim()) newErrors.contactName = "Contact name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    if (!formData.organizationType) newErrors.organizationType = "Organization type is required"
    if (!formData.partnershipType) newErrors.partnershipType = "Partnership type is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      alert("Partnership inquiry submitted successfully! We'll contact you within 48 hours.")
      setFormData({
        organizationName: "",
        contactName: "",
        email: "",
        phone: "",
        organizationType: "",
        partnershipType: "",
        description: "",
        website: "",
        size: "",
      })
    } catch (error) {
      alert("Error submitting inquiry. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`partnerships-page py-4 ${darkMode ? "bg-dark text-light" : "bg-light"}`}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5 animate-fade-in">
          <h1 className="display-5 fw-bold mb-3">🤝 Partnerships</h1>
          <p className="lead text-muted">
            Join forces with JanSanket to create a more resilient world. Together, we can save more lives and build
            stronger communities.
          </p>
        </div>

        {/* Current Partners */}
        <div className="mb-5 animate-fade-in-up">
          <h2 className="text-center mb-4">🌟 Our Trusted Partners</h2>
          <div className="row">
            {partners.map((partner, index) => (
              <div key={index} className="col-lg-4 col-md-6 mb-4">
                <div className="card card-hover h-100 border-0 shadow">
                  <div className="card-body p-4 text-center">
                    <div className="display-4 mb-3">{partner.logo}</div>
                    <h5 className="fw-bold">{partner.name}</h5>
                    <p className="text-muted mb-3">{partner.description}</p>
                    <span className="badge bg-primary">{partner.partnership}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partnership Types */}
        <div className="mb-5 animate-slide-in-left">
          <h2 className="text-center mb-4">🎯 Partnership Opportunities</h2>
          <div className="row">
            {partnershipTypes.map((partnership, index) => (
              <div key={index} className="col-lg-6 mb-4">
                <div className="card card-hover h-100 border-0 shadow-lg">
                  <div className="card-body p-4">
                    <div className="d-flex align-items-start mb-3">
                      <div className="display-4 me-3">{partnership.icon}</div>
                      <div>
                        <h5 className="fw-bold">{partnership.type}</h5>
                        <p className="text-muted">{partnership.description}</p>
                      </div>
                    </div>
                    <h6 className="fw-bold mb-2">Benefits:</h6>
                    <ul className="list-unstyled">
                      {partnership.benefits.map((benefit, idx) => (
                        <li key={idx} className="mb-1">
                          <span className="text-success me-2">✓</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partnership Form */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8">
            <div className="card border-0 shadow-lg animate-slide-in-right">
              <div className="card-header bg-primary text-white p-4">
                <h4 className="mb-0">📝 Partnership Inquiry</h4>
              </div>
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Organization Name *</label>
                      <input
                        type="text"
                        className={`form-control ${errors.organizationName ? "is-invalid" : ""}`}
                        name="organizationName"
                        value={formData.organizationName}
                        onChange={handleInputChange}
                        placeholder="Your organization name"
                      />
                      {errors.organizationName && <div className="invalid-feedback">{errors.organizationName}</div>}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Contact Name *</label>
                      <input
                        type="text"
                        className={`form-control ${errors.contactName ? "is-invalid" : ""}`}
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                      />
                      {errors.contactName && <div className="invalid-feedback">{errors.contactName}</div>}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Email Address *</label>
                      <input
                        type="email"
                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="contact@organization.com"
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Phone Number *</label>
                      <input
                        type="tel"
                        className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(555) 123-4567"
                      />
                      {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Organization Type *</label>
                      <select
                        className={`form-select ${errors.organizationType ? "is-invalid" : ""}`}
                        name="organizationType"
                        value={formData.organizationType}
                        onChange={handleInputChange}
                      >
                        <option value="">Select type...</option>
                        <option value="non-profit">Non-Profit Organization</option>
                        <option value="government">Government Agency</option>
                        <option value="corporate">Corporation</option>
                        <option value="educational">Educational Institution</option>
                        <option value="healthcare">Healthcare Organization</option>
                        <option value="technology">Technology Company</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.organizationType && <div className="invalid-feedback">{errors.organizationType}</div>}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Partnership Interest *</label>
                      <select
                        className={`form-select ${errors.partnershipType ? "is-invalid" : ""}`}
                        name="partnershipType"
                        value={formData.partnershipType}
                        onChange={handleInputChange}
                      >
                        <option value="">Select partnership...</option>
                        <option value="technology">Technology Integration</option>
                        <option value="relief">Relief Organization</option>
                        <option value="government">Government Agency</option>
                        <option value="corporate">Corporate Sponsor</option>
                        <option value="data">Data Sharing</option>
                        <option value="training">Training & Education</option>
                      </select>
                      {errors.partnershipType && <div className="invalid-feedback">{errors.partnershipType}</div>}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Website</label>
                      <input
                        type="url"
                        className="form-control"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        placeholder="https://www.organization.com"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">Organization Size</label>
                      <select className="form-select" name="size" value={formData.size} onChange={handleInputChange}>
                        <option value="">Select size...</option>
                        <option value="small">Small (1-50 employees)</option>
                        <option value="medium">Medium (51-500 employees)</option>
                        <option value="large">Large (501-5000 employees)</option>
                        <option value="enterprise">Enterprise (5000+ employees)</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-bold">Partnership Description *</label>
                    <textarea
                      className={`form-control ${errors.description ? "is-invalid" : ""}`}
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="4"
                      placeholder="Describe your organization, your interest in partnering with JanSanket, and how you envision the partnership working..."
                    ></textarea>
                    {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                  </div>

                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Submitting Inquiry...
                        </>
                      ) : (
                        "🚀 Submit Partnership Inquiry"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-5 animate-fade-in-up">
          <h2 className="text-center mb-4">💡 Why Partner with JanSanket?</h2>
          <div className="row">
            <div className="col-lg-4 mb-4">
              <div className="card card-hover h-100 border-0 shadow text-center">
                <div className="card-body p-4">
                  <div className="display-4 mb-3">🌍</div>
                  <h5 className="fw-bold">Global Impact</h5>
                  <p className="text-muted">
                    Reach millions of users worldwide and make a difference in disaster response and community
                    resilience.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="card card-hover h-100 border-0 shadow text-center">
                <div className="card-body p-4">
                  <div className="display-4 mb-3">🚀</div>
                  <h5 className="fw-bold">Innovation</h5>
                  <p className="text-muted">
                    Access cutting-edge technology and collaborate on innovative solutions for emergency response.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="card card-hover h-100 border-0 shadow text-center">
                <div className="card-body p-4">
                  <div className="display-4 mb-3">🤝</div>
                  <h5 className="fw-bold">Collaboration</h5>
                  <p className="text-muted">
                    Join a network of leading organizations committed to building safer, more resilient communities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center animate-fade-in-up">
          <div className="card border-0 shadow-lg">
            <div className="card-body p-5">
              <h3 className="mb-3">Ready to Make a Difference?</h3>
              <p className="lead mb-4">
                Let's work together to build a more resilient world. Contact our partnerships team to explore
                opportunities.
              </p>
              <div className="d-flex flex-wrap justify-content-center gap-3">
                <a href="mailto:partnerships@JanSanket.org" className="btn btn-primary btn-lg">
                  📧 Email Partnerships Team
                </a>
                <a href="tel:+15551234567" className="btn btn-outline-primary btn-lg">
                  📞 Schedule a Call
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PartnershipsPage
