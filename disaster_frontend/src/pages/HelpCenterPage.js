"use client"

import { useState } from "react"

const HelpCenterPage = ({ darkMode }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "All Topics", icon: "📚" },
    { id: "getting-started", name: "Getting Started", icon: "🚀" },
    { id: "reporting", name: "Disaster Reporting", icon: "🚨" },
    { id: "volunteers", name: "Volunteering", icon: "🤝" },
    { id: "shelters", name: "Shelters", icon: "🏠" },
    { id: "account", name: "Account & Billing", icon: "👤" },
    { id: "technical", name: "Technical Issues", icon: "🔧" },
  ]

  const faqs = [
    {
      id: 1,
      category: "getting-started",
      question: "How do I create an account on JanSanket?",
      answer:
        "To create an account, click the 'Sign Up' button on the homepage, fill in your details, and verify your email address. It's completely free to get started.",
    },
    {
      id: 2,
      category: "reporting",
      question: "How quickly are disaster reports processed?",
      answer:
        "Emergency reports are processed immediately and forwarded to relevant authorities within 2-5 minutes. Our system operates 24/7 to ensure rapid response.",
    },
    {
      id: 3,
      category: "reporting",
      question: "What information should I include in a disaster report?",
      answer:
        "Include the disaster type, exact location (coordinates if possible), severity level, description of the situation, number of people affected, and any photos if safe to take.",
    },
    {
      id: 4,
      category: "volunteers",
      question: "How do I become a volunteer?",
      answer:
        "Complete our volunteer application form, pass a background check, attend required training sessions, and you'll be added to our active volunteer network.",
    },
    {
      id: 5,
      category: "volunteers",
      question: "What training is required for volunteers?",
      answer:
        "Training varies by role but typically includes basic emergency response, communication protocols, safety procedures, and role-specific skills. All training is provided free of charge.",
    },
    {
      id: 6,
      category: "shelters",
      question: "How do I find emergency shelters near me?",
      answer:
        "Use our shelter directory to search by location, filter by amenities, and view real-time availability. You can also call our 24/7 hotline for assistance.",
    },
    {
      id: 7,
      category: "account",
      question: "How much does JanSanket cost?",
      answer:
        "Basic features are free forever. Professional plans start at $29/month for organizations needing advanced features. Check our pricing page for details.",
    },
    {
      id: 8,
      category: "technical",
      question: "The app isn't working properly. What should I do?",
      answer:
        "Try refreshing the page, clearing your browser cache, or using a different browser. If issues persist, contact our technical support team.",
    },
    {
      id: 9,
      category: "getting-started",
      question: "Is my personal information secure?",
      answer:
        "Yes, we use enterprise-grade encryption and follow strict privacy policies. Your data is never shared without your consent, except in emergency situations to save lives.",
    },
    {
      id: 10,
      category: "reporting",
      question: "Can I report disasters anonymously?",
      answer:
        "Yes, you can submit anonymous reports, though providing contact information helps us verify details and provide updates on the situation.",
    },
  ]

  const guides = [
    {
      title: "Quick Start Guide",
      description: "Get up and running with JanSanket in 5 minutes",
      icon: "⚡",
      steps: [
        "Create your free account",
        "Complete your profile",
        "Explore the dashboard",
        "Submit your first report or find volunteers",
      ],
    },
    {
      title: "Disaster Reporting Best Practices",
      description: "Learn how to submit effective emergency reports",
      icon: "📋",
      steps: [
        "Ensure your safety first",
        "Gather accurate location data",
        "Document with photos if safe",
        "Provide clear, detailed descriptions",
      ],
    },
    {
      title: "Volunteer Coordination",
      description: "How to effectively manage volunteer resources",
      icon: "👥",
      steps: [
        "Define clear roles and responsibilities",
        "Set up communication channels",
        "Coordinate schedules and availability",
        "Provide necessary training and resources",
      ],
    },
  ]

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className={`help-center-page py-4 ${darkMode ? "bg-dark text-light" : "bg-light"}`}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5 animate-fade-in">
          <h1 className="display-5 fw-bold mb-3">🆘 Help Center</h1>
          <p className="lead text-muted">
            Find answers to common questions and get the help you need to use JanSanket effectively.
          </p>
        </div>

        {/* Search Bar */}
        <div className="row justify-content-center mb-3">
          <div className="col-lg-6">
            <div className="input-group input-group-lg animate-fade-in-up">
              <span className="input-group-text">🔍</span>
              <input
                type="text"
                className="form-control"
                placeholder="Search for help articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        

        {/* Categories */}
        <div className="mb-4 animate-slide-in-left">
          <div className="d-flex flex-wrap justify-content-center gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`btn ${selectedCategory === category.id ? "btn-primary" : "btn-outline-primary"} btn-sm`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-5">
                <div className="display-1 mb-3">🔍</div>
                <h4>No results found</h4>
                <p className="text-muted">Try adjusting your search terms or browse different categories.</p>
              </div>
            ) : (
              <div className="accordion" id="faqAccordion">
                {filteredFaqs.map((faq, index) => (
                  <div
                    key={faq.id}
                    className="accordion-item border-0 shadow-sm mb-3 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed fw-bold"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#faq${faq.id}`}
                      >
                        {faq.question}
                      </button>
                    </h2>
                    <div id={`faq${faq.id}`} className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                      <div className="accordion-body">{faq.answer}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="mb-5 animate-fade-in-up">
          <div className="row">
            {guides.map((guide, index) => (
              <div key={index} className="col-lg-4 mb-4">
                <div className="card card-hover h-100 border-0 shadow-lg">
                  <div className="card-body p-4">
                    <div className="text-center mb-3">
                      <div className="display-4">{guide.icon}</div>
                      <h5 className="fw-bold">{guide.title}</h5>
                      <p className="text-muted">{guide.description}</p>
                    </div>
                    <ol className="list-group list-group-flush">
                      {guide.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="list-group-item border-0 px-0">
                          <small>{step}</small>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="text-center mt-5 animate-fade-in-up">
          <div className="card border-0 shadow-lg">
            <div className="card-body p-5">
              <h3 className="mb-3">Still need help?</h3>
              <p className="lead mb-4">Can't find what you're looking for? Our support team is here to help 24/7.</p>
              <div className="d-flex flex-wrap justify-content-center gap-3">
                <a href="mailto:support@JanSanket.org" className="btn btn-primary btn-lg">
                  📧 Email Support
                </a>
                <a href="tel:+15551234567" className="btn btn-outline-primary btn-lg">
                  📞 Call Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpCenterPage
